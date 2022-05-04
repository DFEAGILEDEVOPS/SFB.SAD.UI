import { Observable } from 'rxjs';
import { FSMLookupModel } from './../../../Models/FSMLookupModel';
import { Injectable } from '@angular/core';
import { SaDataService } from './sadata.service';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class SaFsmLookupService {

  constructor(private saDataService: SaDataService) { }

  getFSMLookup(overallPhase: string, hasSixthForm: boolean, term: string, fsm: number): Observable<FSMLookupModel> {
    return this.saDataService.getFSMLookupList().pipe(
      map(sizes => sizes.sort(a => parseInt(a.term.substring(5))).reverse().find(
          s => s.overallPhase === overallPhase
          && (s.hasSixthForm === hasSixthForm || s.hasSixthForm == null)
          && (!s.term || s.term <= term)
          && fsm >= s.fsmMin && fsm <= s.fsmMax)
      ));
  }

}
