import { SaScenario } from './../../../Models/SaScenario';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaScenariosService {

scenarios: SaScenario[];

constructor() {
  this.scenarios = new Array<SaScenario>();
 }

setFirstScenario(scenario: SaScenario) {
  this.scenarios[0] = scenario;
}

getFirstScenario(): SaScenario {
  return this.scenarios[0];
}

setSecondScenario(scenario: SaScenario) {
  this.scenarios[1] = scenario;
}

getSecondScenario(): SaScenario {
  return this.scenarios[1];
}

}


