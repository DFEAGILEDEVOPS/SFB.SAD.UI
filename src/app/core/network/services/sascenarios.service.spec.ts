/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SaScenariosService } from './sascenarios.service';

describe('Service: Sascenarios', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaScenariosService]
    });
  });

  it('should ...', inject([SaScenariosService], (service: SaScenariosService) => {
    expect(service).toBeTruthy();
  }));
});
