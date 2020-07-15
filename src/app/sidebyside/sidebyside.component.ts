import { AAModalModels } from './../Models/AAModalModels';
import { Component, OnInit } from '@angular/core';
import { SaScenarioModel } from 'app/Models/SaScenarioModel';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SaScenariosService } from '@core/network/services/sascenarios.service';
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
  firstScenarioLoaded: boolean;
  secondScenarioLoaded: boolean;

  constructor(
    private router: Router,
    private modalService: BsModalService,
    private saScenariosService: SaScenariosService) {
      this.aaModalModels = new AAModalModels();
    }

    ngOnInit() {
      this.saScenariosService.getFirstScenario(null).
        subscribe(result => {
          this.firstScenario = result;
          this.firstScenarioLoaded = true;
          this.secondScenario = this.saScenariosService.getSecondScenario(this.firstScenario.urn);
          this.secondScenarioLoaded = true;
        });
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
