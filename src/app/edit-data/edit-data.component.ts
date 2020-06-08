import { ActivatedRoute, Router } from '@angular/router';
import { SaScenario } from './../Models/SaScenario';
import { Component, OnInit } from '@angular/core';
import { SaScenariosService } from '@core/network/services/sascenarios.service';

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.css']
})
export class EditDataComponent implements OnInit {
  scenarioUnderEdit: SaScenario;
  urn: number;

  constructor(private route: ActivatedRoute, private router: Router, private saScenariosService: SaScenariosService) {
    this.route.params.subscribe(params => {
      this.urn = +params.urn;
    });
    let original: SaScenario;
    saScenariosService.getFirstScenario(this.urn)
    .subscribe(result => {
      original = result;
      this.scenarioUnderEdit = JSON.parse(JSON.stringify(original));
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.saScenariosService.setFirstScenario(this.scenarioUnderEdit);
    this.router.navigate(['self-assessment/', this.urn]);
  }
}
