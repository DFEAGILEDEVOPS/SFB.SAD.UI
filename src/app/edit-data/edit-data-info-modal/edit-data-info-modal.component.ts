import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-data-info-modal',
  templateUrl: './edit-data-info-modal.component.html',
  styleUrls: ['./edit-data-info-modal.component.css']
})
export class EditDataInfoModalComponent implements OnInit {

  title: string;
  textContent: string;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }
}
