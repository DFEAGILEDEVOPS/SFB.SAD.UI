import { SAModel } from './../Models/SAModel';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { SaDataService as SaDataService } from '@core/network/services/sadata.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  urn: number;
  model: SAModel;
  modalRef: BsModalRef;


  constructor(
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private saDataService: SaDataService) {
      this.route.params.subscribe(params => {
        this.urn = +params.urn;
      });
      this.model = new SAModel();
      this.model.name = 'Your school';
    }

    ngOnInit() {
      this.saDataService.getSaData(this.urn).
      subscribe(result => {
        this.model = result;
      });
    }

    openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template, {animated: false, class: 'sfb-modal-dialog'});
    }

}
