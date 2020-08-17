import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SaScenarioModel } from 'app/Models/SaScenarioModel';

@Component({
  selector: 'app-dashboard-table-mobile',
  templateUrl: './dashboard-table-mobile.component.html',
  styleUrls: ['./dashboard-table-mobile.component.scss']
})
export class DashboardTableMobileComponent implements OnInit {

  @Input() activeScenario: SaScenarioModel;
  @Output() modalTriggered = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  openModalWithComponent(assessmentArea: string) {
    this.modalTriggered.emit(assessmentArea);
  }
}
