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

  constructor(private saScenariosService: SaScenariosService) {
    this.scenarioUnderEdit = saScenariosService.getFirstScenario();
  }

  ngOnInit() {
  }

}
