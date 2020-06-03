import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TresholdModel } from 'app/Models/TresholdModel';

@Component({
  selector: 'app-dashboard-aa-modal',
  templateUrl: './dashboard-aa-modal.component.html',
  styleUrls: ['./dashboard-aa-modal.component.scss']
})
export class DashboardAaModalComponent implements OnInit {

  assessmentArea: string;
  title: string;
  textContent: string;
  tresholds: TresholdModel[];
  matchingTreshold: TresholdModel;
  tresholdFormat: string;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
