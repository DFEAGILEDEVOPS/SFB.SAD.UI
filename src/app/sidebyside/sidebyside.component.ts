import { AAModalModels } from './../Models/AAModalModels';
import { Component, OnInit } from '@angular/core';
import { SaScenario } from 'app/Models/SaScenario';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { SaScenariosService } from '@core/network/services/sascenarios.service';
import { SaData } from 'app/Models/SaData';

@Component({
  selector: 'app-sidebyside',
  templateUrl: './sidebyside.component.html',
  styleUrls: ['./sidebyside.component.css']
})
export class SidebysideComponent implements OnInit {
  firstScenario: SaScenario;
  secondScenario: SaScenario;
  modalRef: BsModalRef;
  aaModalModels: AAModalModels;

  constructor(
    private modalService: BsModalService,
    private saScenariosService: SaScenariosService) {
      this.aaModalModels = new AAModalModels();
      this.firstScenario = new SaScenario(new SaData());
      this.secondScenario = new SaScenario(new SaData());
    }

    ngOnInit() {
      this.saScenariosService.getFirstScenario(null).
        subscribe(result => {
          this.firstScenario = result;
        });
      this.secondScenario = this.saScenariosService.getSecondScenario();
    }

}
