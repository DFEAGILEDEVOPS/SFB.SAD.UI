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
  get totalExpenditure() { return this.editDataForm.get('spendingDetails').get('totalExpenditure'); }

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
          spendingDetails: this.fb.group({
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
      editedScenario.totalExpenditure = this.editDataForm.value.spendingDetails.totalExpenditure;
      editedScenario.setAAValue('Teaching staff', this.editDataForm.value.spendingDetails.teachingStaff);
      editedScenario.setAAValue('Supply staff', this.editDataForm.value.spendingDetails.supplyStaff);
      editedScenario.setAAValue('Education support staff', this.editDataForm.value.spendingDetails.educationSupportStaff);
      editedScenario.setAAValue('Administrative and clerical staff', this.editDataForm.value.spendingDetails.adminStaff);
      editedScenario.setAAValue('Other staff costs', this.editDataForm.value.spendingDetails.otherStaff);
      editedScenario.setAAValue('Premises costs', this.editDataForm.value.spendingDetails.premises);
      editedScenario.setAAValue('Teaching resources', this.editDataForm.value.spendingDetails.teachingResources);
      editedScenario.setAAValue('Energy', this.editDataForm.value.spendingDetails.energy);

      editedScenario.isEdited = true;
      this.saScenariosService.setFirstScenario(editedScenario);
      this.router.navigate(['self-assessment/', this.urn]);
    }
  }

}
