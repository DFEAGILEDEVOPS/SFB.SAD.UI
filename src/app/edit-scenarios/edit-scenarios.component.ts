import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { SaScenariosService } from '@core/network/services/sascenarios.service';

@Component({
  selector: 'app-edit-scenarios',
  templateUrl: './edit-scenarios.component.html',
  styleUrls: ['./edit-scenarios.component.css']
})
export class EditScenariosComponent implements OnInit {
  urn: number;
  name: string;
  selectedScenarioNo: number;
  scenario1Name: string;
  scenario2Name: string;

  @ViewChild('editScenariosForm')
  private form: NgForm;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private saScenariosService: SaScenariosService,
    private location: Location) {
      this.route.params.subscribe(params => {
        this.urn = +params.urn;
        this.name = params.name;
      });
  }

  ngOnInit() {
    this.saScenariosService.getFirstScenario(null)
    .subscribe(result => {
      this.scenario1Name = result.scenarioName;
    });
    this.scenario2Name = this.saScenariosService.getSecondScenario(this.urn).scenarioName;
  }

  onContinue() {
    if (this.form.valid) {
      if (this.selectedScenarioNo === 0) {
        this.router.navigate(['self-assessment/edit-data', this.urn, 'edit', this.selectedScenarioNo]);
      } else {
        this.router.navigate(['self-assessment/edit-data', this.urn, 'edit', this.selectedScenarioNo]);
      }
    }
  }

  onBack() {
    this.location.back();
  }

}
