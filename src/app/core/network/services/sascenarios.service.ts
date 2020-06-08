import { Observable } from 'rxjs';
import { SaScenario } from './../../../Models/SaScenario';
import { Injectable } from '@angular/core';
import { SaDataService } from './sadata.service';

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
    return new Observable((observer) =>  observer.next(this.scenarios[0]));
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


