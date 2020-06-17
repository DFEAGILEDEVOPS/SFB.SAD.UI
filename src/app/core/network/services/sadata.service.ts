import { SizeLookupModel } from './../../../Models/SizeLookupModel';
import { SaScenarioModel } from '../../../Models/SaScenarioModel';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';
import { SaData } from 'app/Models/SaData';
import { FSMLookupModel } from 'app/Models/FSMLookupModel';
import { TresholdModel } from 'app/Models/TresholdModel';

@Injectable({
  providedIn: 'root'
})
export class SaDataService {

constructor(private http: HttpClient, @Inject(appSettings) private settings: AppSettings) { }

getSaScenario(urn: number): Observable<SaScenarioModel> {
  return this.http.get<SaData>(`${this.settings.apiDomain}/selfassessment/${urn}`)
    .pipe(
      tap(_ => this.log('fetched saData')),
      map(data => new SaScenarioModel(data)),
      catchError(this.handleError<SaScenarioModel>('getSaData', new SaScenarioModel(new SaData())))
    );
}

getSizeLookupList(): Observable<SizeLookupModel[]> {
  return this.http.get<SizeLookupModel[]>(`${this.settings.apiDomain}/sadsizelookup`)
    .pipe(
      tap(_ => this.log('fetched saData')),
      catchError(this.handleError<SizeLookupModel[]>('getSaData', new Array<SizeLookupModel>()))
    );
}

getFSMLookupList(): Observable<FSMLookupModel[]> {
  return this.http.get<FSMLookupModel[]>(`${this.settings.apiDomain}/sadfsmlookup`)
    .pipe(
      tap(_ => this.log('fetched saData')),
      catchError(this.handleError<FSMLookupModel[]>('getSaData', new Array<FSMLookupModel>()))
    );
}

getAATresholdsList(
  areaName: string,
  overallPhase: string,
  has6Form: boolean,
  londonWeight: string,
  sizeType: string,
  fsmScale: string,
  termYears: string): Observable<TresholdModel[]> {
  return this.http.get<TresholdModel[]>(`${this.settings.apiDomain}/sadtresholds?`
    + `areaName=${areaName}&overallPhase=${overallPhase}&has6Form=${has6Form}`
    + `&londonWeight=${londonWeight}&sizeType=${sizeType}&fsmScale=${fsmScale}&termYears=${termYears}`)
    .pipe(
      tap(_ => this.log('fetched saData')),
      catchError(this.handleError<TresholdModel[]>('getSaData', new Array<TresholdModel>()))
    );
}

private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };

}
private log(message: string) {
  // this.messageService.add(`HeroService: ${message}`);
}

}
