import { SaScenariosService } from './../core/network/services/sascenarios.service';
import { AAModalModels } from './../Models/AAModalModels';
import { SaScenarioModel } from '../Models/SaScenarioModel';
import { Component, OnInit, DebugElement } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardAaModalComponent } from './dashboard-aa-modal/dashboard-aa-modal.component';
import { getAADataFormat } from '@core/network/services/getAADataFormat';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private saScenariosService: SaScenariosService) {
      this.route.paramMap.subscribe(pmap => {
        this.urn = +pmap.get('urn');
      });
      this.aaModalModels = new AAModalModels();
      this.scenarioLoaded = false;
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

    openModalWithComponent(assessmentArea: string) {
      const modalContent = this.aaModalModels.models.find(aa => aa.assessmentArea === assessmentArea);
      const assessmentAreas = this.activeScenario.sadAssessmentAreas.find(sad => sad.assessmentAreaName === assessmentArea);
      const initialState = {
        assessmentArea : modalContent.assessmentArea,
        title: modalContent.title,
        textContent: modalContent.textContent,
        tresholds: assessmentAreas.allTresholds,
        matchingTreshold: assessmentAreas.matchingTreshold,
        tresholdFormat: getAADataFormat(modalContent.assessmentArea)
      };

      this.modalRef = this.modalService.show(DashboardAaModalComponent, {initialState});
    }

    onReset() {
      this.saScenariosService.deleteFirstScenario();
      this.ngOnInit();
    }
}
