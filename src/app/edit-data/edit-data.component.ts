import { Location, CurrencyPipe } from '@angular/common';
import { SaFsmLookupService } from './../core/network/services/safsmlookup.service';
import { SaSizeLookupService } from './../core/network/services/sasizelookup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SaScenarioModel } from '../Models/SaScenarioModel';
import { Component, OnInit } from '@angular/core';
import { SaScenariosService } from '@core/network/services/sascenarios.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { isNumber } from 'util';

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.css']
})
export class EditDataComponent implements OnInit {
  scenarioInEdit: SaScenarioModel;
  urn: number;
  editDataForm: FormGroup;
  viewType: string;
  scenarioNo: number;
  formattedAmount: any;
  scenarioLoaded: boolean;

  get scenarioName() {
    return this.editDataForm.get('scenarioDetails').get('scenarioName');
  }

  get totalExpenditure() {
    return this.editDataForm.get('spending').get('totalExpenditure');
  }

  get totalIncome() {
    return this.editDataForm.get('reserveBalance').get('totalIncome');
  }

  get numberOfPupils() {
    return this.editDataForm.get('schoolDetails').get('numberOfPupils');
  }

  get fsm() {
    return this.editDataForm.get('schoolDetails').get('fsm');
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private scenariosService: SaScenariosService,
    private sizeLookupService: SaSizeLookupService,
    private fsmLookupService: SaFsmLookupService,
    private currencyPipe: CurrencyPipe,
    private location: Location) {
    this.route.params.subscribe(params => {
      this.urn = +params.urn;
      this.viewType = params.viewType;
      this.scenarioNo =  params.scenarioNo ? Number(params.scenarioNo) : null;
    });
    this.scenarioLoaded = false;
  }

  private buildForm() {
    this.editDataForm = this.fb.group({
      scenarioDetails: this.fb.group({
        scenarioName: [this.scenarioInEdit.scenarioName, Validators.required],
        scenarioTerm: [this.scenarioInEdit.termOfScenario]
      }),
      schoolDetails: this.fb.group({
        schoolPhase: [this.scenarioInEdit.overallPhase],
        hasSixthForm: [this.scenarioInEdit.hasSixthForm],
        londonWeighting: [this.scenarioInEdit.londonWeighting],
        numberOfPupils: [this.scenarioInEdit.numberOfPupils],
        fsm: [this.scenarioInEdit.fsm]
      }),
      spending: this.fb.group({
        totalExpenditure: [this.numberToCurrency(this.scenarioInEdit.totalExpenditure)],
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
        totalIncome: [this.numberToCurrency(this.scenarioInEdit.totalIncome)],
        balance: [this.numberToCurrency(this.scenarioInEdit.getAAValue('In-year balance'))],
        rr: [this.numberToCurrency(this.scenarioInEdit.getAAValue('Revenue reserve'))],
      }),
      character: this.fb.group({
        teacherCost: [this.numberToCurrency(this.scenarioInEdit.getAAValue('Average teacher cost'))],
        seniorLeaders: [this.scenarioInEdit.getAAValue('Senior leaders as a percentage of workforce') ?
          this.scenarioInEdit.getAAValue('Senior leaders as a percentage of workforce') * 100 : null],
        pupilToTeacher: [this.scenarioInEdit.getAAValue('Pupil to teacher ratio')],
        pupilToAdult: [this.scenarioInEdit.getAAValue('Pupil to adult ratio')],
        teacherContactRatio: [this.scenarioInEdit.getAAValue('Teacher contact ratio (less than 1)')],
        predictedPupil: [this.scenarioInEdit.getAAValue('Predicted percentage pupil number change in 3-5 years') ?
          this.scenarioInEdit.getAAValue('Predicted percentage pupil number change in 3-5 years') * 100 : null],
        averageClassSize: [this.scenarioInEdit.getAAValue('Average Class size')],
      }),
    });
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
      this.scenarioInEdit = this.scenariosService.getSecondScenario();
      this.scenarioLoaded = true;
      this.buildForm();
    }
  }

  onSubmit() {
    if (this.editDataForm.valid) {

      const editedScenario: SaScenarioModel = this.scenarioInEdit;
      editedScenario.scenarioName = this.editDataForm.value.scenarioDetails.scenarioName;
      editedScenario.termOfScenario = this.editDataForm.value.scenarioDetails.scenarioTerm;
      editedScenario.overallPhase = this.editDataForm.value.schoolDetails.schoolPhase;
      editedScenario.hasSixthForm = this.editDataForm.value.schoolDetails.hasSixthForm;
      editedScenario.londonWeighting = this.editDataForm.value.schoolDetails.londonWeighting;
      editedScenario.numberOfPupils = this.editDataForm.value.schoolDetails.numberOfPupils;
      editedScenario.fsm = this.editDataForm.value.schoolDetails.fsm;

      editedScenario.totalExpenditure = this.currencyToNumber(this.editDataForm.value.spending.totalExpenditure);
      editedScenario.setAAValue('Teaching staff', this.currencyToNumber(this.editDataForm.value.spending.teachingStaff));
      editedScenario.setAAValue('Supply staff', this.currencyToNumber(this.editDataForm.value.spending.supplyStaff));
      editedScenario.setAAValue('Education support staff', this.currencyToNumber(this.editDataForm.value.spending.educationSupportStaff));
      editedScenario.setAAValue('Administrative and clerical staff', this.currencyToNumber(this.editDataForm.value.spending.adminStaff));
      editedScenario.setAAValue('Other staff costs', this.currencyToNumber(this.editDataForm.value.spending.otherStaff));
      editedScenario.setAAValue('Premises costs', this.currencyToNumber(this.editDataForm.value.spending.premises));
      editedScenario.setAAValue('Teaching resources', this.currencyToNumber(this.editDataForm.value.spending.teachingResources));
      editedScenario.setAAValue('Energy', this.currencyToNumber(this.editDataForm.value.spending.energy));

      editedScenario.totalIncome = this.currencyToNumber(this.editDataForm.value.reserveBalance.totalIncome);
      editedScenario.setAAValue('In-year balance', this.currencyToNumber(this.editDataForm.value.reserveBalance.balance));
      editedScenario.setAAValue('Revenue reserve', this.currencyToNumber(this.editDataForm.value.reserveBalance.rr));

      editedScenario.setAAValue('Average teacher cost', this.currencyToNumber(this.editDataForm.value.character.teacherCost));
      // tslint:disable-next-line:max-line-length
      editedScenario.setAAValue('Senior leaders as a percentage of workforce', isNumber(this.editDataForm.value.character.seniorLeaders) ?
        this.editDataForm.value.character.seniorLeaders / 100 : null);
      editedScenario.setAAValue('Pupil to teacher ratio', this.editDataForm.value.character.pupilToTeacher);
      editedScenario.setAAValue('Pupil to adult ratio', this.editDataForm.value.character.pupilToAdult);
      editedScenario.setAAValue('Teacher contact ratio (less than 1)', this.editDataForm.value.character.teacherContactRatio);
      // tslint:disable-next-line:max-line-length
      editedScenario.setAAValue('Predicted percentage pupil number change in 3-5 years', isNumber(this.editDataForm.value.character.predictedPupil) ?
        this.editDataForm.value.character.predictedPupil / 100 : null);
      editedScenario.setAAValue('Average Class size', this.editDataForm.value.character.averageClassSize);

      editedScenario.isEdited = true;

      editedScenario.sadSizeLookup =
        this.sizeLookupService.getSizeLookup(
          editedScenario.overallPhase,
          editedScenario.hasSixthForm,
          editedScenario.termOfScenario,
          editedScenario.numberOfPupils);

      editedScenario.sadFSMLookup =
        this.fsmLookupService.getFSMLookup(
          editedScenario.overallPhase,
          editedScenario.hasSixthForm,
          editedScenario.termOfScenario,
          editedScenario.fsm);

      if (this.viewType === 'edit' && this.scenarioNo === null) {
        this.scenariosService.setFirstScenarioWithEdits(editedScenario);
        this.router.navigate(['self-assessment/', this.urn]);
      } else {
        if (this.scenarioNo === 0) {
          this.scenariosService.setFirstScenarioWithEdits(editedScenario);
        } else {
          this.scenariosService.setSecondScenario(editedScenario);
        }
        this.router.navigate(['self-assessment/side-by-side']);
      }
    }
  }

  onBack() {
    this.location.back();
  }

  transformAmount(element, formControl) {
    this.formattedAmount = this.numberToCurrency(this.currencyToNumber(formControl));

    element.target.value = this.formattedAmount;
  }

  private numberToCurrency(val: number): string {
    return this.currencyPipe.transform(val, ' ');
  }

  private currencyToNumber(val: any): number {
    if (typeof(val) === 'string') {
      return Number(val.replace(new RegExp('[^.0-9-]', 'g'), ''));
    }

    return val;
  }

}
