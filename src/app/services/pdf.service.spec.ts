/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PdfService } from './pdf.service';

describe('Service: Pdf', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PdfService]
    });
  });

  it('should ...', inject([PdfService], (service: PdfService) => {
    expect(service).toBeTruthy();
  }));
});
