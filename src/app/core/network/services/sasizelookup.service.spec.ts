/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SasizelookupService } from './sasizelookup.service';

describe('Service: Sasizelookup', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SasizelookupService]
    });
  });

  it('should ...', inject([SasizelookupService], (service: SasizelookupService) => {
    expect(service).toBeTruthy();
  }));
});
