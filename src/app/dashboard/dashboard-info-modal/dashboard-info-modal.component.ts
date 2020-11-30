import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dashboard-info-modal',
  templateUrl: './dashboard-info-modal.component.html',
  styleUrls: ['./dashboard-info-modal.component.scss']
})
export class DashboardInfoModalComponent implements OnInit {

  title: string;
  textContent: string;
  
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
