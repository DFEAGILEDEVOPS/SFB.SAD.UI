import { EditDataInfoModalComponent } from './edit-data-info-modal/edit-data-info-modal.component';
import { mustBeLowerThanTotalSpendingValidator } from './../core/directives/mustBeLowerThanTotalSpendingValidator.directive';
import { Location, CurrencyPipe } from '@angular/common';
import { SaFsmLookupService } from './../core/network/services/safsmlookup.service';
import { SaSizeLookupService } from './../core/network/services/sasizelookup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SaScenarioModel } from '../Models/SaScenarioModel';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SaScenariosService } from '@core/network/services/sascenarios.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { isNumber } from 'util';
import { Title } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditModalModels } from 'app/Models/EditModalModels';

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.css']
})
export class EditDataComponent implements OnInit, AfterViewInit {
  scenarioInEdit: SaScenarioModel;
  urn: number;
  editDataForm: FormGroup;
  viewType: string;
  scenarioNo: number;
  scenarioLoaded: boolean;
  missingField: string;
  formSubmitted: boolean;
  modalRef: BsModalRef;
  editDataModels: EditModalModels;

  @ViewChild('averageClassSizeElement') averageClassSizeElement: ElementRef;
  @ViewChild('predictedPupilElement') predictedPupilElement: ElementRef;
  @ViewChild('teacherContactRatioElement') teacherContactRatioElement: ElementRef;
  @ViewChild('teachingStaffInput') teachingStaffInput: ElementRef;
  @ViewChild('supplyStaffInput') supplyStaffInput: ElementRef;
  @ViewChild('educationSupportStaffInput') educationSupportStaffInput: ElementRef;
  @ViewChild('adminStaffInput') adminStaffInput: ElementRef;
  @ViewChild('otherStaffInput') otherStaffInput: ElementRef;
  @ViewChild('premisesInput') premisesInput: ElementRef;
  @ViewChild('teachingResourcesInput') teachingResourcesInput: ElementRef;
  @ViewChild('energyInput') energyInput: ElementRef;
  @ViewChild('revenueReserveInput') revenueReserveInput: ElementRef;
  @ViewChild('seniorLeadershipInput') seniorLeadersInput: ElementRef;
  @ViewChild('numberOfTeachersInput') numberOfTeachersInput: ElementRef;
  @ViewChild('schoolWorkforceInput') schoolWorkforceInput: ElementRef;

  @ViewChild('errorSummaryElement') errorSummaryElement: ElementRef;

  get scenarioName() {
    return this.editDataForm.get('scenarioDetails').get('scenarioName');
  }

  get scenarioTerm() {
    return this.editDataForm.get('scenarioDetails').get('scenarioTerm');
  }

  get totalExpenditure() {
    return this.editDataForm.get('reserveBalance').get('totalExpenditure');
  }

  get totalIncome() {
    return this.editDataForm.get('reserveBalance').get('totalIncome');
  }

  get numberOfPupils() {
    return this.editDataForm.get('schoolDetails').get('numberOfPupils');
  }

  get schoolWorkforce() {
    return this.editDataForm.get('schoolDetails').get('schoolWorkforce');
  }

  get numberOfTeachers() {
    return this.editDataForm.get('schoolDetails').get('numberOfTeachers');
  }

  get seniorLeadership() {
    return this.editDataForm.get('schoolDetails').get('seniorLeadership');
  }

  get fsm() {
    return this.editDataForm.get('schoolDetails').get('fsm');
  }

  get teacherContactRatio() {
    return this.editDataForm.get('schoolDetails').get('teacherContactRatio');
  }

  get predictedPupil() {
    return this.editDataForm.get('schoolDetails').get('predictedPupil');
  }

  get averageClassSize() {
    return this.editDataForm.get('schoolDetails').get('averageClassSize');
  }

  get teachingStaff() {
    return this.editDataForm.get('spending').get('teachingStaff');
  }

  get supplyStaff() {
    return this.editDataForm.get('spending').get('supplyStaff');
  }

  get educationSupportStaff() {
    return this.editDataForm.get('spending').get('educationSupportStaff');
  }

  get adminStaff() {
    return this.editDataForm.get('spending').get('adminStaff');
  }

  get otherStaff() {
    return this.editDataForm.get('spending').get('otherStaff');
  }

  get premises() {
    return this.editDataForm.get('spending').get('premises');
  }

  get teachingResources() {
    return this.editDataForm.get('spending').get('teachingResources');
  }

  get energy() {
    return this.editDataForm.get('spending').get('energy');
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private scenariosService: SaScenariosService,
    private sizeLookupService: SaSizeLookupService,
    private fsmLookupService: SaFsmLookupService,
    private currencyPipe: CurrencyPipe,
    private location: Location,
    private titleService: Title,
    private modalService: BsModalService, ) {
    this.route.paramMap.subscribe(pmap => {
      this.urn = +pmap.get('urn');
      this.viewType = pmap.get('viewType') ?? 'edit';
      this.missingField = pmap.get('field');
      this.scenarioNo = pmap.get('scenarioNo') ? Number(pmap.get('scenarioNo')) : null;
    });
    this.scenarioLoaded = false;
    this.editDataModels = new EditModalModels();
  }

  ngOnInit() {
    if (this.viewType === 'edit' && (this.scenarioNo === null || this.scenarioNo === 0)) {
      this.scenariosService.getFirstScenario(this.urn)
        .subscribe(result => {
          this.scenarioInEdit = result;
          this.scenarioLoaded = true;
          this.buildForm();
        });
    } else {
      this.scenarioInEdit = this.scenariosService.getSecondScenario(this.urn);
      this.scenarioLoaded = true;
      this.buildForm();
    }
  }

  ngAfterViewInit() {
    this.focusOnAddField();
  }

  onSubmit() {

    this.formSubmitted = true;
    if (this.editDataForm.valid) {

      const editedScenario: SaScenarioModel = this.scenarioInEdit;
      editedScenario.scenarioName = this.editDataForm.value.scenarioDetails.scenarioName;
      editedScenario.termOfScenario = this.editDataForm.value.scenarioDetails.scenarioTerm;
      editedScenario.numberOfPupils = this.editDataForm.value.schoolDetails.numberOfPupils;
      editedScenario.workforceTotal = this.editDataForm.value.schoolDetails.schoolWorkforce;
      editedScenario.teachersTotal = this.editDataForm.value.schoolDetails.numberOfTeachers;
      editedScenario.teachersLeader = this.editDataForm.value.schoolDetails.seniorLeadership;
      editedScenario.fsm = this.editDataForm.value.schoolDetails.fsm;
      editedScenario.setAAValue('Teacher contact ratio (less than 1)', this.editDataForm.value.schoolDetails.teacherContactRatio);
      editedScenario.setAAValue('Predicted percentage pupil number change in 3-5 years',
        isNumber(this.editDataForm.value.schoolDetails.predictedPupil) ?
          this.editDataForm.value.schoolDetails.predictedPupil / 100 : null);
      editedScenario.setAAValue('Average Class size', this.editDataForm.value.schoolDetails.averageClassSize);

      editedScenario.setAAValue('Teaching staff', this.currencyToNumber(this.editDataForm.value.spending.teachingStaff));
      editedScenario.setAAValue('Supply staff', this.currencyToNumber(this.editDataForm.value.spending.supplyStaff));
      editedScenario.setAAValue('Education support staff', this.currencyToNumber(this.editDataForm.value.spending.educationSupportStaff));
      editedScenario.setAAValue('Administrative and clerical staff', this.currencyToNumber(this.editDataForm.value.spending.adminStaff));
      editedScenario.setAAValue('Other staff costs', this.currencyToNumber(this.editDataForm.value.spending.otherStaff));
      editedScenario.setAAValue('Premises costs', this.currencyToNumber(this.editDataForm.value.spending.premises));
      editedScenario.setAAValue('Teaching resources', this.currencyToNumber(this.editDataForm.value.spending.teachingResources));
      editedScenario.setAAValue('Energy', this.currencyToNumber(this.editDataForm.value.spending.energy));

      editedScenario.totalIncome = this.currencyToNumber(this.editDataForm.value.reserveBalance.totalIncome);
      editedScenario.totalExpenditure = this.currencyToNumber(this.editDataForm.value.reserveBalance.totalExpenditure);
      editedScenario.setAAValue('In-year balance', this.currencyToNumber(this.editDataForm.value.reserveBalance.totalIncome)
        - this.currencyToNumber(this.editDataForm.value.reserveBalance.totalExpenditure));
      editedScenario.setAAValue('Revenue reserve', this.currencyToNumber(this.editDataForm.value.reserveBalance.rr));

      editedScenario.isEdited = true;
      editedScenario.lastEditTimeStamp = new Date();

      if (this.viewType === 'edit' && this.scenarioNo === null) {
        if (this.fsm.dirty || this.numberOfPupils.dirty || this.scenarioTerm.dirty) {

          this.sizeLookupService.getSizeLookup(
            editedScenario.overallPhase,
            editedScenario.hasSixthForm,
            editedScenario.termOfScenario,
            editedScenario.numberOfPupils).subscribe(result => {
              editedScenario.sadSizeLookup = result;

              this.fsmLookupService.getFSMLookup(
                editedScenario.overallPhase,
                editedScenario.hasSixthForm,
                editedScenario.termOfScenario,
                editedScenario.fsm).subscribe(response => {
                  editedScenario.sadFSMLookup = response;

                  this.scenariosService.setFirstScenarioWithRefresh(editedScenario)
                    .subscribe(() => {
                      this.router.navigate(['self-assessment/', this.urn]);
                    });
                });
            });
        } else {
          this.scenariosService.setFirstScenario(editedScenario);
          this.router.navigate(['self-assessment/', this.urn]);
        }
      } else {
        if (this.scenarioNo === 0) {
          if (this.fsm.dirty || this.numberOfPupils.dirty || this.scenarioTerm.dirty) {

            this.sizeLookupService.getSizeLookup(
              editedScenario.overallPhase,
              editedScenario.hasSixthForm,
              editedScenario.termOfScenario,
              editedScenario.numberOfPupils).subscribe(result => {
                editedScenario.sadSizeLookup = result;

                this.fsmLookupService.getFSMLookup(
                  editedScenario.overallPhase,
                  editedScenario.hasSixthForm,
                  editedScenario.termOfScenario,
                  editedScenario.fsm).subscribe(response => {
                    editedScenario.sadFSMLookup = response;

                    this.scenariosService.setFirstScenarioWithRefresh(editedScenario)
                      .subscribe(() => {
                        this.router.navigate(['self-assessment/side-by-side']);
                      });
                  });
              });

          } else {
            this.scenariosService.setFirstScenario(editedScenario);
            this.router.navigate(['self-assessment/side-by-side']);
          }
        } else {
          if (this.fsm.dirty || this.numberOfPupils.dirty || this.scenarioTerm.dirty) {

            this.sizeLookupService.getSizeLookup(
              editedScenario.overallPhase,
              editedScenario.hasSixthForm,
              editedScenario.termOfScenario,
              editedScenario.numberOfPupils).subscribe(result => {
                editedScenario.sadSizeLookup = result;

                this.fsmLookupService.getFSMLookup(
                  editedScenario.overallPhase,
                  editedScenario.hasSixthForm,
                  editedScenario.termOfScenario,
                  editedScenario.fsm).subscribe(response => {
                    editedScenario.sadFSMLookup = response;

                    this.scenariosService.setSecondScenarioWithRefresh(editedScenario)
                      .subscribe(() => {
                        this.router.navigate(['self-assessment/side-by-side']);
                      });
                  });
              });
         } else {
            this.scenariosService.setSecondScenario(editedScenario);
            this.router.navigate(['self-assessment/side-by-side']);
          }
        }
      }
    }
    else {
      setTimeout(() => {
        this.errorSummaryElement.nativeElement.focus();
        this.titleService.setTitle("Error: " + this.titleService.getTitle().replace("Error: ", ""));
      });
    }
  }

  onBack() {
    this.location.back();
  }

  transformAmount(element, formControl) {
    element.target.value = this.numberToCurrency(this.currencyToNumber(formControl));
  }

  transformDecimal(element, formControl) {
    element.target.value = this.numberToDecimal(formControl);
  }

  setFocus(input){
    input.focus();
  }

  openModalWithComponent(formControlName: string) {
    let modalContent = this.editDataModels.models.find(aa => aa.formControlName === formControlName);
    let initialState = {
      title: modalContent.title,
      textContent: modalContent.textContent,
    };

    this.modalRef = this.modalService.show(EditDataInfoModalComponent, { initialState });
  }

  private numberToDecimal(val: number): number {
    if (val === null) {
      return null;
    }
    return Number(val.toFixed(2));
  }

  private numberToCurrency(val: number): string {
    return this.currencyPipe.transform(val, ' ');
  }

  private currencyToNumber(val: any): number {
    if (typeof (val) === 'string') {
      if (val === '') {
        return null;
      }
      return Number(val.replace(new RegExp('[^.0-9-]', 'g'), ''));
    }
    return val;
  }

  private focusOnAddField() {
    switch (this.missingField) {
      case 'Senior leaders as a percentage of workforce':
        setTimeout(() => this.seniorLeadersInput.nativeElement.focus());
        break;
      case 'Revenue reserve':
        setTimeout(() => this.revenueReserveInput.nativeElement.focus());
        break;
      case 'Teaching staff':
        setTimeout(() => this.teachingStaffInput.nativeElement.focus());
        break;
      case 'Pupil to teacher ratio':
      case 'Average teacher cost':
        setTimeout(() => this.numberOfTeachersInput.nativeElement.focus());
        break;
      case 'Pupil to adult ratio':
        setTimeout(() => this.schoolWorkforceInput.nativeElement.focus());
        break;
      case 'Supply staff':
        setTimeout(() => this.supplyStaffInput.nativeElement.focus());
        break;
      case 'Education support staff':
        setTimeout(() => this.educationSupportStaffInput.nativeElement.focus());
        break;
      case 'Administrative and clerical staff':
        setTimeout(() => this.adminStaffInput.nativeElement.focus());
        break;
      case 'Other staff costs':
        setTimeout(() => this.otherStaffInput.nativeElement.focus());
        break;
      case 'Premises costs':
        setTimeout(() => this.premisesInput.nativeElement.focus());
        break;
      case 'Teaching resources':
        setTimeout(() => this.teachingResourcesInput.nativeElement.focus());
        break;
      case 'Energy':
        setTimeout(() => this.energyInput.nativeElement.focus());
        break;
      case 'Teacher contact ratio (less than 1)':
        setTimeout(() => this.teacherContactRatioElement.nativeElement.focus());
        break;
      case 'Predicted percentage pupil number change in 3-5 years':
        setTimeout(() => this.predictedPupilElement.nativeElement.focus());
        break;
      case 'Average Class size':
        setTimeout(() => this.averageClassSizeElement.nativeElement.focus());
        break;
      default:
        break;
    }
  }

  private buildForm() {
    this.editDataForm = this.fb.group({
      scenarioDetails: this.fb.group({
        scenarioName: [this.scenarioInEdit.scenarioName, [Validators.required, Validators.minLength(3)]],
        scenarioTerm: [this.scenarioInEdit.termOfScenario]
      }),
      schoolDetails: this.fb.group({
        numberOfPupils: [this.scenarioInEdit.numberOfPupils, [Validators.required, Validators.min(1)]],
        schoolWorkforce: [this.scenarioInEdit.workforceTotal, [Validators.required, Validators.min(1)]],
        numberOfTeachers: [this.scenarioInEdit.teachersTotal, [Validators.required, Validators.min(1)]],
        seniorLeadership: [this.scenarioInEdit.teachersLeader, [Validators.required, Validators.min(0)]],
        fsm: [this.scenarioInEdit.fsm],
        teacherContactRatio: [this.scenarioInEdit.getAAValue('Teacher contact ratio (less than 1)'),
          [Validators.min(0), Validators.max(1)]],
        predictedPupil: [this.scenarioInEdit.getAAValue('Predicted percentage pupil number change in 3-5 years') ?
          this.scenarioInEdit.getAAValue('Predicted percentage pupil number change in 3-5 years') * 100 : null, Validators.min(-100)],
        averageClassSize: [this.scenarioInEdit.getAAValue('Average Class size'), Validators.min(0)],
      }),
      spending: this.fb.group({
        teachingStaff: [this.numberToCurrency(this.scenarioInEdit.getAAValue('Teaching staff'))],
        supplyStaff: [this.numberToCurrency(this.scenarioInEdit.getAAValue('Supply staff'))],
        educationSupportStaff: [this.numberToCurrency(this.scenarioInEdit.getAAValue('Education support staff'))],
        adminStaff: [this.numberToCurrency(this.scenarioInEdit.getAAValue('Administrative and clerical staff'))],
        otherStaff: [this.numberToCurrency(this.scenarioInEdit.getAAValue('Other staff costs'))],
        premises: [this.numberToCurrency(this.scenarioInEdit.getAAValue('Premises costs'))],
        teachingResources: [this.numberToCurrency(this.scenarioInEdit.getAAValue('Teaching resources'))],
        energy: [this.numberToCurrency(this.scenarioInEdit.getAAValue('Energy'))],
      }),
      reserveBalance: this.fb.group({
        totalIncome: [this.numberToCurrency(this.scenarioInEdit.totalIncome), [Validators.required]],
        totalExpenditure: [this.numberToCurrency(this.scenarioInEdit.totalExpenditure), [Validators.required]],
        rr: [this.numberToCurrency(this.scenarioInEdit.getAAValue('Revenue reserve'))],
      })
    }, { validators: mustBeLowerThanTotalSpendingValidator });

    if(this.scenarioInEdit.overallPhase === "Primary" || this.scenarioInEdit.overallPhase === "Secondary") {
      this.fsm.setValidators([Validators.required, Validators.min(0)]);
    }

  }

}


