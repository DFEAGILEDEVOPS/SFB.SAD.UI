import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SaScenarioModel } from 'app/Models/SaScenarioModel';

@Component({
  selector: 'app-sidebyside-table-desktop',
  templateUrl: './sidebyside-table-desktop.component.html',
  styleUrls: ['./sidebyside-table-desktop.component.scss']
})
export class SidebysideTableDesktopComponent implements OnInit {

  @Input() firstScenario: SaScenarioModel;
  @Input() secondScenario: SaScenarioModel;
  @Output() onModalTriggered = new EventEmitter();
  @Output() onScenarioRemoveTriggered = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  openModalWithComponent(assessmentArea: string, activeScenario: SaScenarioModel, scenarioNo: number) {
    this.onModalTriggered.emit([assessmentArea, activeScenario, scenarioNo]);
  }

  removeScenario(scenarioNo: number) {
    this.onScenarioRemoveTriggered.emit(scenarioNo);
  }

}
