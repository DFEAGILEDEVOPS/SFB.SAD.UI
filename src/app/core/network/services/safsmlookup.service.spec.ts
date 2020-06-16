/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SaFsmLookupService } from './safsmlookup.service';

describe('Service: Safsmlookup', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaFsmLookupService]
    });
  });

  it('should ...', inject([SaFsmLookupService], (service: SaFsmLookupService) => {
    expect(service).toBeTruthy();
  }));
});
