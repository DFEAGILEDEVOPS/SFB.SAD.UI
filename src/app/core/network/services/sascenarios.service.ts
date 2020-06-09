import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SaDataService } from './sadata.service';
import { SaScenario } from 'app/Models/SaScenario';

@Injectable({
  providedIn: 'root'
})
export class SaScenariosService {

scenarios: SaScenario[];

constructor(private saDataService: SaDataService) {
  this.scenarios = new Array<SaScenario>();
 }

setFirstScenario(scenario: SaScenario) {
  this.scenarios[0] = scenario;
}

getFirstScenario(urn: number): Observable<SaScenario> {
  if (this.scenarios[0]) {
    const firstScenario = this.scenarios[0];

    // TODO: find a better way of doing this
    firstScenario.getAAValue = function(aaName: string) {
      return this.sadAssesmentAreas.filter(aa => aa.assessmentAreaName === aaName)[0].schoolData;
    };

    firstScenario.getAALatestTermValue =  function(aaName: string) {
      return this.sadAssesmentAreas.filter(aa => aa.assessmentAreaName === aaName)[0].schoolDataLatestTerm;
    };

    firstScenario.setAAValue = function(aaName: string, value: any) {
      this.sadAssesmentAreas.filter(aa => aa.assessmentAreaName === aaName)[0].schoolData = value;
    };

    return new Observable((observer) =>  observer.next(firstScenario));
  } else {
    return this.saDataService.getSaData(urn);
  }
}

setSecondScenario(scenario: SaScenario) {
  this.scenarios[1] = scenario;
}

getSecondScenario(): SaScenario {
  return this.scenarios[1];
}

}


