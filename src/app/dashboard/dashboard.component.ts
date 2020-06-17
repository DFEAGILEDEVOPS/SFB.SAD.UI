import { SaScenariosService } from './../core/network/services/sascenarios.service';
import { AAModalModels } from './../Models/AAModalModels';
import { SaScenarioModel } from '../Models/SaScenarioModel';
import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { DashboardAaModalComponent } from './dashboard-aa-modal/dashboard-aa-modal.component';
import { SaData } from 'app/Models/SaData';
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

  constructor(
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private saScenariosService: SaScenariosService) {
      this.route.params.subscribe(params => {
        this.urn = +params.urn;
      });
      this.aaModalModels = new AAModalModels();
      this.activeScenario = new SaScenarioModel(new SaData());
    }

    ngOnInit() {
      this.saScenariosService.getFirstScenario(this.urn).
        subscribe(result => {
          this.activeScenario = result;
          this.saScenariosService.setFirstScenario(result, false);
        });
    }

    openModalWithComponent(assessmentArea: string) {
      const modalContent = this.aaModalModels.models.find(aa => aa.assessmentArea === assessmentArea);
      const assessmentAreas = this.activeScenario.sadAssesmentAreas.find(sad => sad.assessmentAreaName === assessmentArea);
      const initialState = {
        assessmentArea : modalContent.assessmentArea,
        title: modalContent.title,
        textContent: modalContent.textContent,
        tresholds: assessmentAreas.allTresholds,
        matchingTreshold: assessmentAreas.matchingTreshold,
        tresholdFormat: getAADataFormat(modalContent.assessmentArea)// TODO: create a pipe for this
      };

      this.modalRef = this.modalService.show(DashboardAaModalComponent, {initialState});
    }
}
