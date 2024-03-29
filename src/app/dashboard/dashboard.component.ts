import { PptService } from './../services/ppt.service';
import { DashboardInfoModalComponent } from './dashboard-info-modal/dashboard-info-modal.component';
import { PdfService } from './../services/pdf.service';
import { AssessmentAreaModel } from './../Models/AssessmentAreaModel';
import { SaScenariosService } from './../core/network/services/sascenarios.service';
import { AAModalModels } from './../Models/AAModalModels';
import { SaScenarioModel } from '../Models/SaScenarioModel';
import { Component, OnInit, HostListener, TemplateRef, Inject } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardAaModalComponent } from './dashboard-aa-modal/dashboard-aa-modal.component';
import { getAADataFormat } from '@core/network/services/getAADataFormat';
import { AAModalModel } from 'app/Models/AAModalModel';
import { TitleService } from 'app/services/title.service';
import { ViewModeService } from 'app/services/viewMode.service';
import { AppSettings } from '../core/config/settings/app-settings';
import { appSettings } from '@core/config/settings/app-settings';
import * as $ from 'jquery';
declare let dataLayer: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  urn: number;
  activeScenario: SaScenarioModel;
  downloadModalRef: BsModalRef;
  resetModalRef: BsModalRef;
  aaModalModels: AAModalModels = new AAModalModels();
  scenarioLoaded: boolean = false;
  isMobileScreen: boolean;
  tabletBreakPoint = 641;
  downloadFormat = "pdf";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private saScenariosService: SaScenariosService,
    private pdfService: PdfService,
    private pptService: PptService,
    titleService: TitleService,
    viewModeService: ViewModeService,
    @Inject(appSettings) public settings: AppSettings) {
    viewModeService.setDashboardMode();
    titleService.setWithPrefix("Self-assessment dashboard");
    this.route.paramMap.subscribe(pmap => {
      this.urn = +pmap.get('urn');
    });
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
      case 'add-dashboard':
        initialState = {
          title: "Add a custom dashboard",
          textContent: "<p>The custom dashboard allows schools to plan for hypothetical or projected changes to their financial situation and see a red, amber or green (RAG) rating against it.</p>" +
            "<p>Custom dashboards are for personal use and <span class='govuk-!-font-weight-bold'>only visible to you</span>. Any changes you make will be viewable on subsequent visits to this school’s dashboard unless you choose to reset them.</p>",
          referrer: "help-add-dashboard"
        };

        this.downloadModalRef = this.modalService.show(DashboardInfoModalComponent, { initialState });
        break;
      case 'dashboard-year':
        initialState = {
          title: "Dashboard year",
          textContent: "<p>By choosing a different year banding figures are aligned to that year for published finance, Future years use the most recent bands and can have uplifts applied to specific expenditure areas where there is an expectation of significant expenditure changes such pending salary awards.</p>",
          referrer: "help-dashboard-year"
        };

        this.downloadModalRef = this.modalService.show(DashboardInfoModalComponent, { initialState });
        break;
      case 'Ofsted':
      case 'KS2':
      case 'P8':
      case 'P8Part':
        modalContent = this.aaModalModels.models.find(aa => aa.assessmentArea === assessmentArea);
        initialState = {
          assessmentArea: assessmentArea,
          title: modalContent.title,
          textContent: modalContent.textContent,
          referrer: "help-" + assessmentArea
        };

        this.downloadModalRef = this.modalService.show(DashboardAaModalComponent, { initialState });
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
          tresholdFormat: getAADataFormat(modalContent.assessmentArea),
          referrer: "help-" + assessmentArea
        };

        this.downloadModalRef = this.modalService.show(DashboardAaModalComponent, { initialState });
        break;
    }

    var $externalLinks = $(".aa-modal-left-section .govuk-link[target='_blank']");
    $externalLinks.on("click", (event) => {
      dataLayer.push({ 'event': 'sad_out_link', 'link': event.target.innerText });
    });

  }

  onReset() {
    this.onResetClose();
    this.saScenariosService.deleteFirstScenarioFromEverywhere();
    this.ngOnInit();

    if (!this.activeScenario.doReturnsExist) {
      this.router.navigate([`self-assessment/edit-data/${this.urn}/add-new`]);
    }
  }

  onPrintPage() {
    var detailses = document.getElementsByTagName("details");
    var details;
    var i = -1;

    while (details = detailses[++i]) {
      details["open"] = true;
    }

    window.print();
  }

  onDownload() {
    this.onDownloadClose();

    switch (this.downloadFormat) {
      case "pdf":
        if (this.isMobileScreen) {
          this.pdfService.generatePdfForMobile();
        } else {
          this.pdfService.generatePdfForDesktop();
        }
        break;

      case "ppt":
        if (this.isMobileScreen) {
          this.pptService.generatePptForMobile();
        } else {
          this.pptService.generatePptForDesktop();
        }
        break;
      default:
        break;
    }
  }

  onDownloadPopup(template: TemplateRef<any>) {
    this.downloadModalRef = this.modalService.show(template, { ariaDescribedby: 'title', ariaLabelledBy: 'legend' });
  }

  onResetPopup(template: TemplateRef<any>) {
    this.resetModalRef = this.modalService.show(template, { ariaDescribedby: 'title', ariaLabelledBy: 'legend' });
  }

  onDownloadClose() {
    this.downloadModalRef.hide();
    document.getElementById("downloadPageLink").focus();
  }

  onResetClose() {
    this.resetModalRef.hide();
    document.getElementById("reset-button")?.focus();
  }

}
