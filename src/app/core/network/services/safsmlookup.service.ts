import { FSMLookupModel } from './../../../Models/FSMLookupModel';
import { Injectable } from '@angular/core';
import { SaDataService } from './sadata.service';

@Injectable({
  providedIn: 'root'
})
export class SaFsmLookupService {
  private fsmLookups: FSMLookupModel[];

  constructor(private saDataService: SaDataService) {
    saDataService.getFSMLookupList().subscribe(
      result => {
        this.fsmLookups = result;
      }
    );
  }

  get FSMLookups(): FSMLookupModel[] {
    return this.fsmLookups;
  }

  getFSMLookup(overallPhase: string, hasSixthForm: boolean, term: string, fsm: number): FSMLookupModel {
    return this.FSMLookups
      .find(s => s.overallPhase === overallPhase && (!s.hasSixthForm || s.hasSixthForm === hasSixthForm) && s.term === term
      && fsm >= s.fsmMin && fsm <= s.fsmMax);
  }

}
