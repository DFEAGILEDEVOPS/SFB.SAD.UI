import { SaFsmLookupService } from './../core/network/services/safsmlookup.service';
import { SaSizeLookupService } from './../core/network/services/sasizelookup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SaScenarioModel } from '../Models/SaScenarioModel';
import { Component, OnInit } from '@angular/core';
import { SaScenariosService } from '@core/network/services/sascenarios.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

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
    private fsmLookupService: SaFsmLookupService) {
    this.route.params.subscribe(params => {
      this.urn = +params.urn;
      this.viewType = params.viewType;
    });

    if (this.viewType === 'edit') {
      scenariosService.getFirstScenario(this.urn)
        .subscribe(result => {
          this.scenarioInEdit = result;
          this.buildForm();
        });
    } else {
      this.scenarioInEdit = scenariosService.getSecondScenario();
      this.buildForm();
    }
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
        totalExpenditure: [this.scenarioInEdit.totalExpenditure],
        teachingStaff: [this.scenarioInEdit.getAAValue('Teaching staff')],
        supplyStaff: [this.scenarioInEdit.getAAValue('Supply staff')],
        educationSupportStaff: [this.scenarioInEdit.getAAValue('Education support staff')],
        adminStaff: [this.scenarioInEdit.getAAValue('Administrative and clerical staff')],
        otherStaff: [this.scenarioInEdit.getAAValue('Other staff costs')],
        premises: [this.scenarioInEdit.getAAValue('Premises costs')],
        teachingResources: [this.scenarioInEdit.getAAValue('Teaching resources')],
        energy: [this.scenarioInEdit.getAAValue('Energy')],
      }),
      reserveBalance: this.fb.group({
        totalIncome: [this.scenarioInEdit.totalIncome],
        balance: [this.scenarioInEdit.getAAValue('In-year balance')],
        rr: [this.scenarioInEdit.getAAValue('Revenue reserve')],
      }),
      character: this.fb.group({
        teacherCost: [this.scenarioInEdit.getAAValue('Average teacher cost')],
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

      editedScenario.totalExpenditure = this.editDataForm.value.spending.totalExpenditure;
      editedScenario.setAAValue('Teaching staff', this.editDataForm.value.spending.teachingStaff);
      editedScenario.setAAValue('Supply staff', this.editDataForm.value.spending.supplyStaff);
      editedScenario.setAAValue('Education support staff', this.editDataForm.value.spending.educationSupportStaff);
      editedScenario.setAAValue('Administrative and clerical staff', this.editDataForm.value.spending.adminStaff);
      editedScenario.setAAValue('Other staff costs', this.editDataForm.value.spending.otherStaff);
      editedScenario.setAAValue('Premises costs', this.editDataForm.value.spending.premises);
      editedScenario.setAAValue('Teaching resources', this.editDataForm.value.spending.teachingResources);
      editedScenario.setAAValue('Energy', this.editDataForm.value.spending.energy);

      editedScenario.totalIncome = this.editDataForm.value.reserveBalance.totalIncome;
      editedScenario.setAAValue('In-year balance', this.editDataForm.value.reserveBalance.balance);
      editedScenario.setAAValue('Revenue reserve', this.editDataForm.value.reserveBalance.rr);

      editedScenario.setAAValue('Average teacher cost', this.editDataForm.value.character.teacherCost);
      editedScenario.setAAValue('Senior leaders as a percentage of workforce', this.editDataForm.value.character.seniorLeaders / 100);
      editedScenario.setAAValue('Pupil to teacher ratio', this.editDataForm.value.character.pupilToTeacher);
      editedScenario.setAAValue('Pupil to adult ratio', this.editDataForm.value.character.pupilToAdult);
      editedScenario.setAAValue('Teacher contact ratio (less than 1)', this.editDataForm.value.character.teacherContactRatio);
      // tslint:disable-next-line:max-line-length
      editedScenario.setAAValue('Predicted percentage pupil number change in 3-5 years', this.editDataForm.value.character.predictedPupil / 100);
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

      if (this.viewType === 'edit') {
        this.scenariosService.setFirstScenario(editedScenario, true);
        this.router.navigate(['self-assessment/', this.urn]);
      } else if (this.viewType === 'enter')  {
        this.scenariosService.setSecondScenario(editedScenario);
        this.router.navigate(['self-assessment/side-by-side']);
      }
    }
  }

}
