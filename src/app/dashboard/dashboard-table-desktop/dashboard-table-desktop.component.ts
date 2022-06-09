import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SaScenarioModel } from 'app/Models/SaScenarioModel';

@Component({
  selector: 'app-dashboard-table-desktop',
  templateUrl: './dashboard-table-desktop.component.html',
  styleUrls: ['./dashboard-table-desktop.component.scss']
})
export class DashboardTableDesktopComponent implements OnInit {

  @Input() activeScenario: SaScenarioModel;
  @Output() onModalTriggered = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  openModalWithComponent(assessmentArea: string) {
    this.onModalTriggered.emit(assessmentArea);
  }
}
