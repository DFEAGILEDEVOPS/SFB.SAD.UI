import { AAModalModels } from './../Models/AAModalModels';
import { SAModel } from './../Models/SAModel';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { SaDataService as SaDataService } from '@core/network/services/sadata.service';
import { SizeLookupModel } from 'app/Models/SizeLookupModel';
import { FSMLookupModel } from 'app/Models/FSMLookupModel';
import { DashboardAaModalComponent } from './dashboard-aa-modal/dashboard-aa-modal.component';
import { AssessmentAreaModel } from 'app/Models/AssessmentAreaModel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  urn: number;
  activeScenario: SAModel;
  modalRef: BsModalRef;
  aaModalModels: AAModalModels;
  viewMode: string;

  constructor(
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private saDataService: SaDataService) {
      this.route.params.subscribe(params => {
        this.urn = +params.urn;
      });
      this.viewMode = 'Display';
      this.activeScenario = new SAModel();
      this.activeScenario.name = 'Your school';
      this.activeScenario.sadSizeLookup = new SizeLookupModel();
      this.activeScenario.sadFSMLookup = new FSMLookupModel();
      this.activeScenario.sadAssesmentAreas = [];
      this.aaModalModels = new AAModalModels();
    }

    ngOnInit() {
      this.saDataService.getSaData(this.urn).
      subscribe(result => {
        this.activeScenario = result;
        this.activeScenario.sadAssesmentAreas.forEach(aa => {

          if (!aa.schoolData) {
            aa.schoolData = aa.schoolDataLatestTerm;
          }

          if (!aa.percentageSchoolData) {// TODO: calculate this in angular instead of in server side?
            aa.percentageSchoolData = aa.percentageSchoolDataLatestTerm;
          }

          aa.matchingTreshold = aa.allTresholds
            .find(t => aa.percentageSchoolData >= t.scoreLow && aa.percentageSchoolData <= t.scoreHigh);

          aa.schoolDataFormat = this.getDataFormat(aa.assessmentAreaName);
        });

        this.copyEditableFieldsFromLatestTermData();

        this.activeScenario.spendingAAs = this.activeScenario.sadAssesmentAreas
          .filter(aa => aa.assessmentAreaType === 'Spending');
        this.activeScenario.reserveAAs = this.activeScenario.sadAssesmentAreas
          .filter(aa => aa.assessmentAreaType === 'Reserve and balance');
        this.activeScenario.characteristicAAs = this.activeScenario.sadAssesmentAreas
          .filter(aa => aa.assessmentAreaType === 'School characteristics');
        this.activeScenario.characteristicAAs
          .push(new AssessmentAreaModel('School characteristics', 'Teacher contact ratio (less than 1.0)'));
        this.activeScenario.characteristicAAs
          .push(new AssessmentAreaModel('School characteristics', 'Predicted percentage pupil number change in 3-5 years'));
        this.activeScenario.characteristicAAs
          .push(new AssessmentAreaModel('School characteristics', 'Average class size'));
        this.activeScenario.outcomeAAs = this.activeScenario.sadAssesmentAreas
          .filter(aa => aa.assessmentAreaType === 'Outcomes');
      });
    }

    openModalWithComponent(assessmentArea: string) {
      const modalContent = this.aaModalModels.models.find(aa => aa.assessmentArea === assessmentArea);
      const initialState = {
        assessmentArea : modalContent.assessmentArea,
        title: modalContent.title,
        textContent: modalContent.textContent,
        tresholds: this.activeScenario.sadAssesmentAreas.find(sad => sad.assessmentAreaName === assessmentArea).allTresholds,
        matchingTreshold: this.activeScenario.sadAssesmentAreas.find(sad => sad.assessmentAreaName === assessmentArea).matchingTreshold,
        tresholdFormat: this.getDataFormat(modalContent.assessmentArea)
      };

      this.modalRef = this.modalService.show(DashboardAaModalComponent, {initialState});
    }

    private getDataFormat(assessmentArea): string {
      switch (assessmentArea) {
        case 'Pupil to teacher ratio':
        case 'Pupil to adult ratio':
          return 'number';
        case 'Average teacher cost':
          return 'currency';
        case 'Senior leaders as a percentage of workforce':
            return 'percentageOfWf';
        case 'In-year balance':
        case 'Revenue reserve':
              return 'percentageOfInc';
        default:
          return 'percentageOfExp';
      }
    }

    private copyEditableFieldsFromLatestTermData() {
      if (!this.activeScenario.overallPhase) {
        this.activeScenario.overallPhase = this.activeScenario.overallPhaseLatestTerm;
      }
      if (!this.activeScenario.overallPhaseWSixthForm) {
        this.activeScenario.overallPhaseWSixthForm = this.activeScenario.overallPhaseWSixthFormLatestTerm;
      }
      if (!this.activeScenario.totalIncome) {
        this.activeScenario.totalIncome = this.activeScenario.totalIncomeLatestTerm;
      }
      if (!this.activeScenario.totalExpenditure) {
        this.activeScenario.totalExpenditure = this.activeScenario.totalExpenditureLatestTerm;
      }
      if (!this.activeScenario.londonWeighting) {
        this.activeScenario.londonWeighting = this.activeScenario.londonWeightingLatestTerm;
      }
      if (!this.activeScenario.numberOfPupils) {
        this.activeScenario.numberOfPupils = this.activeScenario.numberOfPupilsLatestTerm;
      }
      if (!this.activeScenario.fsm) {
        this.activeScenario.fsm = this.activeScenario.fsmLatestTerm;
      }
    }
}
