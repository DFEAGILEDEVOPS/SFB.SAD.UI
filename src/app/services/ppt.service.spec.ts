/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PptService } from './ppt.service';

describe('Service: Ppt', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PptService]
    });
  });

  it('should ...', inject([PptService], (service: PptService) => {
    expect(service).toBeTruthy();
  }));
});
