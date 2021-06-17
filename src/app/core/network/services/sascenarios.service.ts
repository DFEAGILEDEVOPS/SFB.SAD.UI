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

  public get firstScenarioInMemory() : SaScenarioModel {
    return this.scenarios[0];
  }

  public set firstScenarioInMemory(v : SaScenarioModel) {
    this.scenarios[0] = v;
  }

  public get secondScenarioInMemory() : SaScenarioModel {
    return this.scenarios[1];
  }

  public set secondScenarioInMemory(v : SaScenarioModel) {
    this.scenarios[1] = v;
  }

  constructor(private saDataService: SaDataService) {
    this.scenarios = new Array<SaScenarioModel>();
  }

  getFirstScenario(urn: number): Observable<SaScenarioModel> {
    if (this.firstScenarioInMemory) {
      return new Observable((observer) => {
        observer.next(this.firstScenarioInMemory);
        observer.complete();
      });
    } else if (this.getScenarioFromSessionStorage(urn, 0)) {
      this.firstScenarioInMemory = this.generateNewFromSavedScenarioData(this.buildScenariModelFromSessionStorage(urn, 0));
      return new Observable((observer) => {
        observer.next(this.firstScenarioInMemory);
        observer.complete();
      });
    } else if (this.getScenarioFromLocalStorage(urn, 0)) {
      this.firstScenarioInMemory = this.generateNewFromSavedScenarioData(this.buildScenarioModelFromLocalStorage(urn, 0));
      return new Observable((observer) => {
        observer.next(this.firstScenarioInMemory);
        observer.complete();
      });
    } else if(urn != null){
      return this.saDataService.getSaScenario(urn)
        .pipe(
          tap(scenario => {
            scenario.scenarioNo = 0;
            this.firstScenarioInMemory = scenario;
          })
        );
    }
  }

  setFirstScenario(scenario: SaScenarioModel, storeBeyondSession: boolean) {
    scenario.initAAsWithCalculatedData();
    scenario.scenarioNo = 0;
    this.firstScenarioInMemory = scenario;
    if(storeBeyondSession){
      this.storeScenarioInLocalStorage(scenario, 0);
      this.deleteFirstScenarioFromSessionStorage();
    }else {
      this.storeScenarioInSessionStorage(scenario, 0);
      this.deleteFirstScenarioFromLocalStorage();
    }
  }

  setFirstScenarioWithRefresh(scenario: SaScenarioModel, storeBeyondSession: boolean) {
      scenario.initAAsWithCalculatedData();
      return this.refreshAATresholdsWithApiData(scenario)
      .pipe(
        tap(() => {
          scenario.scenarioNo = 0;
          this.firstScenarioInMemory = scenario;
          if(storeBeyondSession){
            this.storeScenarioInLocalStorage(scenario, 0);
            this.deleteFirstScenarioFromSessionStorage();
          }else {
            this.storeScenarioInSessionStorage(scenario, 0);
            this.deleteFirstScenarioFromLocalStorage();
          }
        })
      );
  }

  getSecondScenario(urn: number): SaScenarioModel {
    if (this.secondScenarioInMemory) {
      return this.secondScenarioInMemory;
    } else if (this.getScenarioFromSessionStorage(urn, 1)) {
      this.secondScenarioInMemory = this.generateNewFromSavedScenarioData(this.buildScenariModelFromSessionStorage(urn, 1));
      return this.secondScenarioInMemory;
    } else if (this.getScenarioFromLocalStorage(urn, 1)) {
      this.secondScenarioInMemory = this.generateNewFromSavedScenarioData(this.buildScenarioModelFromLocalStorage(urn, 1));
      return this.secondScenarioInMemory;
    } else {
      let firstScenario = this.firstScenarioInMemory;
      let data: SaData = JSON.parse(JSON.stringify(firstScenario.data));
      let secondScenario = new SaScenarioModel(data);
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

  setSecondScenario(scenario: SaScenarioModel, storeBeyondSession: boolean) {
    scenario.initAAsWithCalculatedData();
    scenario.scenarioNo = 1;
    this.secondScenarioInMemory = scenario;
    if(storeBeyondSession) {
      this.storeScenarioInLocalStorage(scenario, 1);
      this.deleteSecondScenarioFromSessionStorage();
      this.storeScenarioInLocalStorage(this.firstScenarioInMemory, 0);
      this.deleteFirstScenarioFromSessionStorage();
    }else{
      this.storeScenarioInSessionStorage(scenario, 1);
      this.deleteSecondScenarioFromLocalStorage();
      if(!this.getScenarioFromLocalStorage(this.firstScenarioInMemory.urn, 0))  {
        this.storeScenarioInSessionStorage(this.firstScenarioInMemory, 0);
      }
    }
  }

  setSecondScenarioWithRefresh(scenario: SaScenarioModel, storeBeyondSession: boolean) {
    scenario.initAAsWithCalculatedData();
    return this.refreshAATresholdsWithApiData(scenario)
    .pipe(
      tap(() => {
        scenario.scenarioNo = 1;
        this.secondScenarioInMemory = scenario;
        if(storeBeyondSession) {
          this.storeScenarioInLocalStorage(scenario, 1);
          this.storeScenarioInLocalStorage(this.firstScenarioInMemory, 0);
          this.removeScenarioFromSessionStorage(this.firstScenarioInMemory.urn, 0);
        }else{
          this.storeScenarioInSessionStorage(scenario, 1);
          this.storeScenarioInSessionStorage(this.firstScenarioInMemory, 0);
          this.removeScenarioFromLocalStorage(this.firstScenarioInMemory.urn, 0);
        }
      })
    );
  }

  deleteFirstScenarioFromLocalStorage() {
    this.removeScenarioFromLocalStorage(this.firstScenarioInMemory.urn, 0);
  }

  deleteFirstScenarioFromSessionStorage() {
    this.removeScenarioFromSessionStorage(this.firstScenarioInMemory.urn, 0);
  }

  deleteFirstScenarioFromEverywhere() {
    this.removeScenarioFromSessionStorage(this.firstScenarioInMemory.urn, 0);
    this.removeScenarioFromLocalStorage(this.firstScenarioInMemory.urn, 0);
    this.firstScenarioInMemory = null;
  }

  deleteFirstScenarioAndReplaceItWithSecond() {
    let urn = this.firstScenarioInMemory.urn;
    if(this.getScenarioFromLocalStorage(urn, 1)) {
      this.storeScenarioInLocalStorage(this.secondScenarioInMemory, 0);
    } else {
      this.storeScenarioInSessionStorage(this.secondScenarioInMemory, 0);
    }
    this.removeScenarioFromLocalStorage(urn, 1);
    this.removeScenarioFromSessionStorage(urn, 1);

    this.firstScenarioInMemory = this.secondScenarioInMemory;
    this.secondScenarioInMemory = null;
  }

  deleteSecondScenarioFromLocalStorage() {
    this.removeScenarioFromLocalStorage(this.secondScenarioInMemory.urn, 1);
  }

  deleteSecondScenarioFromSessionStorage() {
    this.removeScenarioFromSessionStorage(this.secondScenarioInMemory.urn, 1);
  }

  deleteSecondScenarioFromEverywhere() {
    this.removeScenarioFromSessionStorage(this.secondScenarioInMemory.urn, 1);
    this.removeScenarioFromLocalStorage(this.secondScenarioInMemory.urn, 1);
    this.secondScenarioInMemory = null;
  }

  isFirstScenarioEditedAndStored(urn: number) {
    if (this.getScenarioFromLocalStorage(urn, 0) || this.getScenarioFromSessionStorage(urn, 0)) {
      return true;
    }
    return false;
  }

  isSecondScenarioEditedAndStored(urn: number) {
    if (this.getScenarioFromLocalStorage(urn, 1) || this.getScenarioFromSessionStorage(urn, 1)) {
      return true;
    }
    return false;
  }

  private getScenarioFromLocalStorage(urn, scenarioNo) {
    return localStorage.getItem(this.storageKey(urn, scenarioNo));
  }

  private getScenarioFromSessionStorage(urn, scenarioNo) {
    return sessionStorage.getItem(this.storageKey(urn, scenarioNo));
  }

  private removeScenarioFromLocalStorage(urn: number, scenarioNo: number) {
    localStorage.removeItem(this.storageKey(urn, scenarioNo));
  }

  private removeScenarioFromSessionStorage(urn: number, scenarioNo: number) {
    sessionStorage.removeItem(this.storageKey(urn, scenarioNo));
  }

  private storeScenarioInLocalStorage(scenario: SaScenarioModel, scenarioNo: number) {
    localStorage.setItem(this.storageKey(scenario.urn, scenarioNo), JSON.stringify(scenario));
  }

  private storeScenarioInSessionStorage(scenario: SaScenarioModel, scenarioNo: number) {
    sessionStorage.setItem(this.storageKey(scenario.urn, scenarioNo), JSON.stringify(scenario));
  }

  private buildScenarioModelFromLocalStorage(urn: number, scenarioNo: number): SaScenarioModel {
    return JSON.parse(this.getScenarioFromLocalStorage(urn, scenarioNo));
  }

  private buildScenariModelFromSessionStorage(urn: number, scenarioNo: number): SaScenarioModel {
    return JSON.parse(this.getScenarioFromSessionStorage(urn, scenarioNo));
  }

  private storageKey(urn: number, scenarioNo: number){
    return `urn#${urn}-scenario_${scenarioNo}`;
  }

  private generateNewFromSavedScenarioData(savedModel: SaScenarioModel) {
    let newModel = new SaScenarioModel(savedModel.data);
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


