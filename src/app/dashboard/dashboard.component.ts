import { PdfService } from './../services/pdf.service';
import { throwError } from 'rxjs';
import { AssessmentAreaModel } from './../Models/AssessmentAreaModel';
import { SaScenariosService } from './../core/network/services/sascenarios.service';
import { AAModalModels } from './../Models/AAModalModels';
import { SaScenarioModel } from '../Models/SaScenarioModel';
import { Component, OnInit, HostListener } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardAaModalComponent } from './dashboard-aa-modal/dashboard-aa-modal.component';
import { getAADataFormat } from '@core/network/services/getAADataFormat';
import { AAModalModel } from 'app/Models/AAModalModel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  urn: number;
  activeScenario: SaScenarioModel;
  modalRef: BsModalRef;
  aaModalModels: AAModalModels;
  scenarioLoaded: boolean;
  isMobileScreen: boolean;
  tabletBreakPoint = 641;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private saScenariosService: SaScenariosService,
    private pdfService: PdfService) {
    this.route.paramMap.subscribe(pmap => {
      this.urn = +pmap.get('urn');
    });
    this.aaModalModels = new AAModalModels();
    this.scenarioLoaded = false;
    this.isMobileScreen = window.innerWidth < this.tabletBreakPoint;
  }

  ngOnInit() {
    this.saScenariosService.getFirstScenario(this.urn).
      subscribe(result => {
        if (this.saScenariosService.isSecondScenarioEditedAndStored(this.urn)) {
          this.router.navigate(['self-assessment/side-by-side']);
        }
        this.activeScenario = result;
        this.scenarioLoaded = true;
      });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobileScreen = window.innerWidth < this.tabletBreakPoint;
  }

  openModalWithComponent(assessmentArea: string) {
    let modalContent: AAModalModel;
    let initialState: any;
    let assessmentAreas: AssessmentAreaModel;

    switch (assessmentArea) {
      case 'Ofsted':
      case 'KS2':
      case 'P8':
        modalContent = this.aaModalModels.models.find(aa => aa.assessmentArea === assessmentArea);
        initialState = {
          assessmentArea: assessmentArea,
          title: modalContent.title,
          textContent: modalContent.textContent,
        };

        this.modalRef = this.modalService.show(DashboardAaModalComponent, { initialState });
        break;

      default:
        modalContent = this.aaModalModels.models.find(aa => aa.assessmentArea === assessmentArea);
        assessmentAreas = this.activeScenario.sadAssessmentAreas.find(sad => sad.assessmentAreaName === assessmentArea);
        initialState = {
          assessmentArea: modalContent.assessmentArea,
          title: modalContent.title,
          textContent: modalContent.textContent,
          tresholds: assessmentAreas.allTresholds,
          matchingTreshold: assessmentAreas.matchingTreshold,
          tresholdFormat: getAADataFormat(modalContent.assessmentArea)
        };

        this.modalRef = this.modalService.show(DashboardAaModalComponent, { initialState });
        break;
    }
  }

  onReset() {
    this.saScenariosService.deleteFirstScenario();
    this.ngOnInit();
  }

  onPrintPage() {
    var detailses = document.getElementsByTagName("details");
    var details;
    var i = -1;

    while (details = detailses[++i]) {
      //DOM API
      details["open"] = true;
    }

    window.print();
  }

  onDownload() {
    //throwError("test error"); // returns observable!
    //throw new Error("Download feature is not implemented yet!");
    this.pdfService.generatePdfForDashboard();
  }

}
