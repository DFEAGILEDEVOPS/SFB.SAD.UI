import { SAModel } from '../../../Models/SAModel';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';

@Injectable({
  providedIn: 'root'
})
export class SaDataService {

constructor(private http: HttpClient, @Inject(appSettings) private settings: AppSettings) { }

getSaData(urn: number): Observable<SAModel> {
  return this.http.get<SAModel>(`${this.settings.apiDomain}/${urn}`)
    .pipe(
      tap(_ => this.log('fetched emData')),
      catchError(this.handleError<SAModel>('getEmData', new SAModel()))
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
