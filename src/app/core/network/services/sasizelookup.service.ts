import { SizeLookupModel } from './../../../Models/SizeLookupModel';
import { Injectable } from '@angular/core';
import { SaDataService } from './sadata.service';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaSizeLookupService {

  constructor(private saDataService: SaDataService) { }

  getSizeLookup(overallPhase: string, hasSixthForm: boolean, term: string, noPupils: number): Observable<SizeLookupModel> {
    return this.saDataService.getSizeLookupList().pipe(
      map(sizes => sizes.find(s => s.overallPhase === overallPhase
        && (!s.hasSixthForm || s.hasSixthForm === hasSixthForm)
        && (!s.term || s.term === term)
        && (noPupils >= s.noPupilsMin && (s.noPupilsMax == null || noPupils <= s.noPupilsMax))))
    );
  }
}
