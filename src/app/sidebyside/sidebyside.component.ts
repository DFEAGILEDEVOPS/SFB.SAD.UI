import { AAModalModels } from './../Models/AAModalModels';
import { Component, OnInit, HostListener } from '@angular/core';
import { SaScenarioModel } from 'app/Models/SaScenarioModel';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SaScenariosService } from '@core/network/services/sascenarios.service';
import { Router } from '@angular/router';
import { AAModalModel } from 'app/Models/AAModalModel';
import { AssessmentAreaModel } from 'app/Models/AssessmentAreaModel';
import { DashboardAaModalComponent } from 'app/dashboard/dashboard-aa-modal/dashboard-aa-modal.component';
import { getAADataFormat } from '@core/network/services/getAADataFormat';


@Component({
  selector: 'app-sidebyside',
  templateUrl: './sidebyside.component.html',
  styleUrls: ['./sidebyside.component.scss']
})
export class SidebysideComponent implements OnInit {
  firstScenario: SaScenarioModel;
  secondScenario: SaScenarioModel;
  modalRef: BsModalRef;
  aaModalModels: AAModalModels;
  firstScenarioLoaded: boolean;
  secondScenarioLoaded: boolean;
  isMobileScreen: boolean;
  tabletBreakPoint = 641;

  constructor(
    private router: Router,
    private modalService: BsModalService,
    private saScenariosService: SaScenariosService) {
      this.aaModalModels = new AAModalModels();
      this.isMobileScreen = window.innerWidth < this.tabletBreakPoint;
    }

    ngOnInit() {
      this.saScenariosService.getFirstScenario(null).
        subscribe(result => {
          this.firstScenario = result;
          this.firstScenarioLoaded = true;
          this.secondScenario = this.saScenariosService.getSecondScenario(this.firstScenario.urn);
          this.secondScenarioLoaded = true;
        });
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
      this.isMobileScreen = window.innerWidth < this.tabletBreakPoint;
    }

    removeScenario(scenarioNo: number) {
      if (scenarioNo === 0) {
        this.saScenariosService.deleteFirstScenarioAndReplaceItWithSecond();
        this.router.navigate(['self-assessment/', this.secondScenario.urn]);
      }
      if (scenarioNo === 1) {
        this.saScenariosService.deleteSecondScenario();
        this.router.navigate(['self-assessment/', this.firstScenario.urn]);
      }
    }

    openModalWithComponent(assessmentArea: string, activeScenario: SaScenarioModel) {
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
          assessmentAreas = activeScenario.sadAssessmentAreas.find(sad => sad.assessmentAreaName === assessmentArea);
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
      const urn = this.secondScenario.urn;
      this.saScenariosService.deleteFirstScenario();
      this.saScenariosService.deleteSecondScenario();
      this.router.navigate(['self-assessment/', urn]);
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

}
