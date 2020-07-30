import { Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { SaDataService } from './sadata.service';
import { SaScenarioModel } from 'app/Models/SaScenarioModel';
import { SaData } from 'app/Models/SaData';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SaScenariosService {

  scenarios: SaScenarioModel[];

  constructor(private saDataService: SaDataService) {
    this.scenarios = new Array<SaScenarioModel>();
  }

  getFirstScenario(urn: number): Observable<SaScenarioModel> {
    if (this.scenarios[0]) {
      return new Observable((observer) => {
        observer.next(this.scenarios[0]);
        observer.complete();
      });
    } else if (localStorage.getItem(`urn#${urn}-scenario_0`)) {
      this.scenarios[0] = this.generateNewFromSavedScenarioData(this.retrieveStoredScenarioFromLocalStorage(urn, 0));
      return new Observable((observer) => {
        observer.next(this.scenarios[0]);
        observer.complete();
      });
    } else {
      return this.saDataService.getSaScenario(urn)
        .pipe(
          tap(scenario => {
            scenario.scenarioNo = 0;
            this.scenarios[0] = scenario;
          })
        );
    }
  }

  setFirstScenario(scenario: SaScenarioModel) {
    scenario.initAAsWithCalculatedData();
    scenario.scenarioNo = 0;
    this.scenarios[0] = scenario;
    this.storeScenarioInLocalStorage(scenario, 0);
  }

  setFirstScenarioWithRefresh(scenario: SaScenarioModel) {
      scenario.initAAsWithCalculatedData();
      return this.refreshAATresholdsWithApiData(scenario)
      .pipe(
        tap(() => {
          scenario.scenarioNo = 0;
          this.scenarios[0] = scenario;
          this.storeScenarioInLocalStorage(scenario, 0);
        })
      );
  }

  getSecondScenario(urn: number): SaScenarioModel {
    if (this.scenarios[1]) {
      return this.scenarios[1];
    } else if (localStorage.getItem(`urn#${urn}-scenario_1`)) {
      this.scenarios[1] = this.generateNewFromSavedScenarioData(this.retrieveStoredScenarioFromLocalStorage(urn, 1));
      return this.scenarios[1];
    } else {
      const firstScenario = this.scenarios[0];
      const data: SaData = JSON.parse(JSON.stringify(firstScenario.data));
      const secondScenario = new SaScenarioModel(data);
      secondScenario.scenarioName = null;
      secondScenario.scenarioNo = 1;
      secondScenario.numberOfPupils = null;
      secondScenario.fsm = null;
      secondScenario.totalExpenditure = null;
      secondScenario.totalIncome = null;
      secondScenario.teachersTotal = null;
      secondScenario.teachersLeader = null;
      secondScenario.workforceTotal = null;
      secondScenario.sadAssessmentAreas?.forEach(aa => {
        aa.schoolData = null;
        aa.calculatedSchoolData = null;
        aa.matchingTreshold = null;
      });
      return secondScenario;
    }
  }

  setSecondScenario(scenario: SaScenarioModel) {
    scenario.initAAsWithCalculatedData();
    scenario.scenarioNo = 1;
    this.scenarios[1] = scenario;
    this.storeScenarioInLocalStorage(scenario, 1);
    this.storeScenarioInLocalStorage(this.scenarios[0], 0);
  }

  setSecondScenarioWithRefresh(scenario: SaScenarioModel) {
    scenario.initAAsWithCalculatedData();
    return this.refreshAATresholdsWithApiData(scenario)
    .pipe(
      tap(() => {
        scenario.scenarioNo = 1;
        this.scenarios[1] = scenario;
        this.storeScenarioInLocalStorage(scenario, 1);
        this.storeScenarioInLocalStorage(this.scenarios[0], 0);
      })
    );
  }

  deleteFirstScenario() {
    this.removeScenarioFromLocalStorage(this.scenarios[0].urn, 0);
    this.scenarios[0] = null;
  }

  deleteFirstScenarioAndReplaceItWithSecond() {
    this.storeScenarioInLocalStorage(this.scenarios[1], 0);
    this.removeScenarioFromLocalStorage(this.scenarios[0].urn, 1);
    this.scenarios[0] = this.scenarios[1];
    this.scenarios[1] = null;
  }

  deleteSecondScenario() {
    this.removeScenarioFromLocalStorage(this.scenarios[1].urn, 1);
    this.scenarios[1] = null;
  }

  isSecondScenarioEditedAndStored(urn: number) {
    if (localStorage.getItem(`urn#${urn}-scenario_1`)) {
      return true;
    }
    return false;
  }

  private removeScenarioFromLocalStorage(urn: number, scenarioNo: number) {
    localStorage.removeItem(`urn#${urn}-scenario_${scenarioNo}`);
  }

  private storeScenarioInLocalStorage(scenario: SaScenarioModel, scenarioNo: number) {
    localStorage.setItem(`urn#${scenario.urn}-scenario_${scenarioNo}`, JSON.stringify(scenario));
  }

  private retrieveStoredScenarioFromLocalStorage(urn: number, scenarioNo: number): SaScenarioModel {
    return JSON.parse(localStorage.getItem(`urn#${urn}-scenario_${scenarioNo}`));
  }

  private generateNewFromSavedScenarioData(savedModel: SaScenarioModel) {
    const newModel = new SaScenarioModel(savedModel.data);
    newModel.scenarioName = savedModel.scenarioName;
    newModel.termOfScenario = savedModel.termOfScenario;
    newModel.numberOfPupils = savedModel.numberOfPupils;
    newModel.workforceTotal = savedModel.workforceTotal;
    newModel.teachersTotal = savedModel.teachersTotal;
    newModel.teachersLeader = savedModel.teachersLeader;
    newModel.fsm = savedModel.fsm;
    newModel.totalIncome = savedModel.totalIncome;
    newModel.totalExpenditure = savedModel.totalExpenditure;

    newModel.initAAsWithCalculatedData();
    newModel.isEdited = true;
    newModel.lastEditTimeStamp = savedModel.lastEditTimeStamp;

    return newModel;
  }

  private refreshAATresholdsWithApiData(scenario: SaScenarioModel) {
    return from(new Promise((resolve) => {
      scenario.isTresholdsRefreshed = false;
      scenario.sadAssessmentAreas.forEach(aa => {
        aa.allTresholds = null;
        aa.matchingTreshold = null;
      });

      scenario.sadAssessmentAreas.forEach(aa => {
        this.saDataService.getAATresholdsList(
          aa.assessmentAreaName,
          scenario.overallPhase,
          scenario.hasSixthForm,
          scenario.londonWeighting,
          scenario.sadSizeLookup?.sizeType,
          scenario.sadFSMLookup?.fsmScale,
          scenario.termOfScenario)
          .subscribe(results => {
            aa.allTresholds = results;
            if (aa.calculatedSchoolData != null) {
              aa.matchingTreshold = aa.allTresholds
                .find(t => (aa.calculatedSchoolData >= t.scoreLow || t.scoreLow == null) && (aa.calculatedSchoolData <= t.scoreHigh || t.scoreHigh === null));
            }
            scenario.isTresholdsRefreshed = scenario.sadAssessmentAreas.every(a => a.allTresholds);
            if (scenario.isTresholdsRefreshed) {
              resolve();
            }
          });
      });
    }));
  }
}


