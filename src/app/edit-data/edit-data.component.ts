import { ActivatedRoute, Router } from '@angular/router';
import { SaScenario } from './../Models/SaScenario';
import { Component, OnInit } from '@angular/core';
import { SaScenariosService } from '@core/network/services/sascenarios.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.css']
})
export class EditDataComponent implements OnInit {
  originalScenario: SaScenario;
  urn: number;
  editDataForm: FormGroup;


  get scenarioName() { return this.editDataForm.get('scenarioDetails').get('scenarioName'); }
  get totalExpenditure() { return this.editDataForm.get('spending').get('totalExpenditure'); }
  get totalIncome() { return this.editDataForm.get('reserveBalance').get('totalIncome'); }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private saScenariosService: SaScenariosService) {
    this.route.params.subscribe(params => {
      this.urn = +params.urn;
    });

    saScenariosService.getFirstScenario(this.urn)
      .subscribe(result => {
        this.originalScenario = result;

        this.editDataForm = this.fb.group({
          scenarioDetails: this.fb.group({
            scenarioName: [this.originalScenario.scenarioName, Validators.required],
            scenarioTerm: [this.originalScenario.termOfScenario]
          }),
          schoolDetails: this.fb.group({
            schoolPhase: [this.originalScenario.overallPhase],
            hasSixthForm: [this.originalScenario.hasSixthForm],
            londonWeighting: [this.originalScenario.londonWeighting],
            numberOfPupils: [this.originalScenario.numberOfPupils],
            fsm: [this.originalScenario.fsm]
          }),
          spending: this.fb.group({
            totalExpenditure: [this.originalScenario.totalExpenditure],
            teachingStaff: [this.originalScenario.getAAValue('Teaching staff')],
            supplyStaff: [this.originalScenario.getAAValue('Supply staff')],
            educationSupportStaff: [this.originalScenario.getAAValue('Education support staff')],
            adminStaff: [this.originalScenario.getAAValue('Administrative and clerical staff')],
            otherStaff: [this.originalScenario.getAAValue('Other staff costs')],
            premises: [this.originalScenario.getAAValue('Premises costs')],
            teachingResources: [this.originalScenario.getAAValue('Teaching resources')],
            energy: [this.originalScenario.getAAValue('Energy')],
          }),
          reserveBalance: this.fb.group({
            totalIncome: [this.originalScenario.totalIncome],
            balance: [this.originalScenario.getAAValue('In-year balance')],
            rr: [this.originalScenario.getAAValue('Revenue reserve')],
          }),
          character: this.fb.group({
            teacherCost: [this.originalScenario.getAAValue('Average teacher cost')],
            seniorLeaders: [this.originalScenario.getAAValue('Senior leaders as a percentage of workforce') * 100],
            pupilToTeacher: [this.originalScenario.getAAValue('Pupil to teacher ratio')],
            pupilToAdult: [this.originalScenario.getAAValue('Pupil to adult ratio')],
            teacherContactRatio: [this.originalScenario.getAAValue('Teacher contact ratio (less than 1)')],
            predictedPupil: [this.originalScenario.getAAValue('Predicted percentage pupil number change in 3-5 years') ?
              this.originalScenario.getAAValue('Predicted percentage pupil number change in 3-5 years') * 100 : null],
            averageClassSize: [this.originalScenario.getAAValue('Average Class size')],
          }),
        });
      });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.editDataForm.valid) {
      // const editedScenario: SaScenario = JSON.parse(JSON.stringify(this.originalScenario));
      const editedScenario: SaScenario = this.originalScenario;
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
      this.saScenariosService.setFirstScenario(editedScenario);
      this.router.navigate(['self-assessment/', this.urn]);
    }
  }

}
