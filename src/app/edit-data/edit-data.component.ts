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
            scenarioName: [this.originalScenario.termOfScenario, Validators.required]
          }),
          schoolDetails: this.fb.group({
            schoolPhase: [this.originalScenario.overallPhaseWSixthForm],
            numberOfPupils: [this.originalScenario.numberOfPupils]
          })
        });
      });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.editDataForm.valid) {
      const editedScenario: SaScenario = JSON.parse(JSON.stringify(this.originalScenario));
      editedScenario.scenarioName = this.editDataForm.value.scenarioDetails.scenarioName;
      editedScenario.overallPhaseWSixthForm = this.editDataForm.value.schoolDetails.schoolPhase;
      editedScenario.numberOfPupils = this.editDataForm.value.schoolDetails.numberOfPupils;

      this.saScenariosService.setFirstScenario(editedScenario);
      this.router.navigate(['self-assessment/', this.urn]);
    }
  }
}
