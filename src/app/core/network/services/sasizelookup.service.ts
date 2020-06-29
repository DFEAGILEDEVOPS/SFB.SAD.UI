import { SizeLookupModel } from './../../../Models/SizeLookupModel';
import { Injectable } from '@angular/core';
import { SaDataService } from './sadata.service';

@Injectable({
  providedIn: 'root'
})
export class SaSizeLookupService {
  private sizeLookups: SizeLookupModel[];

  constructor(private saDataService: SaDataService) {
    saDataService.getSizeLookupList().subscribe(
      result => {
        this.sizeLookups = result;
      }
    );
  }

  get SizeLookups(): SizeLookupModel[] {
    return this.sizeLookups;
  }

  getSizeLookup(overallPhase: string, hasSixthForm: boolean, term: string, noPupils: number): SizeLookupModel {
    return this.SizeLookups
      .find(s => s.overallPhase === overallPhase
        && (!s.hasSixthForm || s.hasSixthForm === hasSixthForm)
        && (!s.term || s.term === term)
        && (noPupils >= s.noPupilsMin && (s.noPupilsMax == null || noPupils <= s.noPupilsMax)));
  }
}
