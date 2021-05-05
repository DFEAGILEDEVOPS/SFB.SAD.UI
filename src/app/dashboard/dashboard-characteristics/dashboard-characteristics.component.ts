import { SizeLookupModel } from './../../Models/SizeLookupModel';
import { FSMLookupModel } from './../../Models/FSMLookupModel';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-characteristics',
  templateUrl: './dashboard-characteristics.component.html',
  styleUrls: ['./dashboard-characteristics.component.css']
})
export class DashboardCharacteristicsComponent implements OnInit {

  @Input() phase: string;
  @Input() londonWeight: string;
  @Input() noPupils: number;
  @Input() FSM: number;
  @Input() FSMLookup: FSMLookupModel;
  @Input() SizeLookup: SizeLookupModel;
  @Input() financeType: string;
  constructor() { }

  ngOnInit() {
  }

}
