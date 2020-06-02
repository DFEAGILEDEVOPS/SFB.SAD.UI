import { AAModalModels } from './../Models/AAModalModels';
import { SAModel } from './../Models/SAModel';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { SaDataService as SaDataService } from '@core/network/services/sadata.service';
import { SizeLookupModel } from 'app/Models/SizeLookupModel';
import { FSMLookupModel } from 'app/Models/FSMLookupModel';
import { AssessmentAreaModel } from 'app/Models/AssessmentAreaModel';
import { DashboardAaModalComponent } from './dashboard-aa-modal/dashboard-aa-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  urn: number;
  model: SAModel;
  modalRef: BsModalRef;
  aaModalModels: AAModalModels;

  constructor(
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private saDataService: SaDataService) {
      this.route.params.subscribe(params => {
        this.urn = +params.urn;
      });
      this.model = new SAModel();
      this.model.name = 'Your school';
      this.model.sadSizeLookup = new SizeLookupModel();
      this.model.sadFSMLookup = new FSMLookupModel();
      this.model.sadAssesmentAreas = [];
      this.aaModalModels = new AAModalModels();
    }

    ngOnInit() {
      this.saDataService.getSaData(this.urn).
      subscribe(result => {
        this.model = result;
        this.model.sadAssesmentAreas.forEach(element => {
          element.matchingTreshold =
            element.allTresholds.find(t => element.percentageSchoolData >= t.scoreLow && element.percentageSchoolData <= t.scoreHigh);
        });
        this.model.spendingAAs = this.model.sadAssesmentAreas.filter(aa => aa.assessmentAreaType === 'Spending');
        this.model.reserveAAs = this.model.sadAssesmentAreas.filter(aa => aa.assessmentAreaType === 'Reserve and balance');
        this.model.characteristicAAs = this.model.sadAssesmentAreas.filter(aa => aa.assessmentAreaType === 'School characteristics');
        this.model.outcomeAAs = this.model.sadAssesmentAreas.filter(aa => aa.assessmentAreaType === 'Outcomes');
      });
    }

    openModalWithComponent(assessmentArea: string) {
      const modalContent = this.aaModalModels.models.find(aa => aa.assessmentArea === assessmentArea);
      const initialState = {
        title: modalContent.title,
        textContent: modalContent.textContent,
        tresholds: this.model.sadAssesmentAreas.find(sad => sad.assessmentAreaName === assessmentArea).allTresholds,
        matchingTreshold: this.model.sadAssesmentAreas.find(sad => sad.assessmentAreaName === assessmentArea).matchingTreshold
      };

      this.modalRef = this.modalService.show(DashboardAaModalComponent, {initialState});
    }
}
