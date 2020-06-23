import { AAModalModels } from './../Models/AAModalModels';
import { Component, OnInit } from '@angular/core';
import { SaScenarioModel } from 'app/Models/SaScenarioModel';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SaScenariosService } from '@core/network/services/sascenarios.service';
import { SaData } from 'app/Models/SaData';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebyside',
  templateUrl: './sidebyside.component.html',
  styleUrls: ['./sidebyside.component.scss']
})
export class SidebysideComponent implements OnInit {
  firstScenario: SaScenarioModel;
  secondScenario: SaScenarioModel;
  modalRef: BsModalRef;
  aaModalModels: AAModalModels;

  constructor(
    private router: Router,
    private modalService: BsModalService,
    private saScenariosService: SaScenariosService) {
      this.aaModalModels = new AAModalModels();
      this.firstScenario = new SaScenarioModel(new SaData());
      this.secondScenario = new SaScenarioModel(new SaData());
    }

    ngOnInit() {
      this.saScenariosService.getFirstScenario(null).
        subscribe(result => {
          this.firstScenario = result;
        });
      this.secondScenario = this.saScenariosService.getSecondScenario();
    }

    removeScenario(scenarioNo: number) {
      if (scenarioNo === 0) {
        this.saScenariosService.deleteFirstScenario();
        this.router.navigate(['self-assessment/', this.secondScenario.urn]);
      }
      if (scenarioNo === 1) {
        this.saScenariosService.deleteSecondScenario();
        this.router.navigate(['self-assessment/', this.firstScenario.urn]);
      }
    }

}
