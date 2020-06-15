import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SaDataService } from './sadata.service';
import { SaScenario } from 'app/Models/SaScenario';
import { SaData } from 'app/Models/SaData';

@Injectable({
  providedIn: 'root'
})
export class SaScenariosService {

scenarios: SaScenario[];

constructor(private saDataService: SaDataService) {
  this.scenarios = new Array<SaScenario>();
 }

setFirstScenario(scenario: SaScenario) {
  this.updateScenario(scenario);
  scenario.scenarioNo = 0;
  this.scenarios[0] = scenario;
  sessionStorage.setItem('scenario_0', JSON.stringify(scenario));
}

getFirstScenario(urn: number): Observable<SaScenario> {
  // this.scenarios[0] = this.scenarios[0] ?? JSON.parse(sessionStorage.getItem('scenario_0'));
  if (this.scenarios[0]) {
    return new Observable((observer) =>  observer.next(this.scenarios[0]));
  } else {
    return this.saDataService.getSaScenario(urn);
  }
}

setSecondScenario(scenario: SaScenario) {
  this.updateScenario(scenario);
  scenario.scenarioNo = 1;
  this.scenarios[1] = scenario;
  sessionStorage.setItem('scenario_1', JSON.stringify(scenario));
}

getSecondScenario(): SaScenario {
  // this.scenarios[1] = this.scenarios[1] ?? JSON.parse(sessionStorage.getItem('scenario_1'));
  if (this.scenarios[1]) {
    return this.scenarios[1];
  } else {
    const firstScenario = this.scenarios[0];
    const data: SaData = JSON.parse(JSON.stringify(firstScenario.data));
    const secondScenario = new SaScenario(data);
    secondScenario.scenarioName = null;
    secondScenario.scenarioNo = 1;
    secondScenario.numberOfPupils = null;
    secondScenario.fsm = null;
    secondScenario.totalExpenditure = null;
    secondScenario.totalIncome = null;
    secondScenario.sadAssesmentAreas?.forEach(aa => {
      aa.schoolData = null;
      aa.percentageSchoolData = null;
    });
    return secondScenario;
  }
}

private updateScenario(scenario: SaScenario) {
  scenario.spendingAAs.forEach(aa => aa.totalForAreaType = scenario.totalExpenditure);
  scenario.reserveAAs.forEach(aa => aa.totalForAreaType = scenario.totalIncome);
  scenario.sadAssesmentAreas.forEach(aa => {
    if (aa.schoolData) {
      aa.percentageSchoolData = parseFloat((aa.schoolData / aa.totalForAreaType).toFixed(2));
    } else {
      aa.percentageSchoolData = null;
    }
    aa.matchingTreshold = aa.allTresholds
      .find(t => aa.percentageSchoolData >= t.scoreLow && aa.percentageSchoolData <= t.scoreHigh);
  });
}

}


