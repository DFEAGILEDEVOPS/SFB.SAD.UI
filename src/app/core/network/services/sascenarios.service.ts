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

  this.scenarios[0] = scenario;
}

getFirstScenario(urn: number): Observable<SaScenario> {
  if (this.scenarios[0]) {
    return new Observable((observer) =>  observer.next(this.scenarios[0]));
  } else {
    return this.saDataService.getSaScenario(urn);
  }
}

setSecondScenario(scenario: SaScenario) {
  this.scenarios[1] = scenario;
}

getSecondScenario(): SaScenario {
  if (this.scenarios[1]) {
    return this.scenarios[1];
  } else {
    const data = new SaData();
    data.urn = this.scenarios[0].urn;
    data.name = this.scenarios[0].name;
    return new SaScenario(data);
  }
}

}


