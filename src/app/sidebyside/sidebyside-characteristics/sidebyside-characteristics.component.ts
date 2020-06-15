import { SizeLookupModel } from './../../Models/SizeLookupModel';
import { FSMLookupModel } from './../../Models/FSMLookupModel';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebyside-characteristics',
  templateUrl: './sidebyside-characteristics.component.html',
  styleUrls: ['./sidebyside-characteristics.component.css']
})
export class SidebysideCharacteristicsComponent implements OnInit {

  @Input() scenarioName1: string;
  @Input() phase1: string;
  @Input() londonWeight1: string;
  @Input() noPupils1: number;
  @Input() FSM1: number;
  @Input() FSMLookup1: FSMLookupModel;
  @Input() SizeLookup1: SizeLookupModel;
  @Input() scenarioName2: string;
  @Input() phase2: string;
  @Input() londonWeight2: string;
  @Input() noPupils2: number;
  @Input() FSM2: number;
  @Input() FSMLookup2: FSMLookupModel;
  @Input() SizeLookup2: SizeLookupModel;
  constructor() { }

  ngOnInit() {
  }

}
