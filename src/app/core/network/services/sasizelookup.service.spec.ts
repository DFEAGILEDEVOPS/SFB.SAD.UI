/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SaSizeLookupService } from './sasizelookup.service';
import { defer } from 'rxjs/internal/observable/defer';
import { SaDataService } from './sadata.service';

function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('Service: Sasizelookup', () => {
  let saSizeLookupService: SaSizeLookupService;
  let saDataServiceSpy: jasmine.SpyObj<SaDataService>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        SaSizeLookupService,
        { provide: SaDataService, useValue: jasmine.createSpyObj('SaDataService', ['getSizeLookupList']) }
      ]
    });

    // Inject both the service-to-test and its (spy) dependency
    saSizeLookupService = TestBed.inject(SaSizeLookupService);
    saDataServiceSpy = TestBed.inject(SaDataService) as jasmine.SpyObj<SaDataService>;

    // tslint:disable-next-line:max-line-length
    let stubValue = [{ term: "2020/2021", overallPhase: 'Primary', hasSixthForm: null, noPupilsMin: 1, noPupilsMax: 100, sizeType: 'Very small' },
    { term: "2020/2021", overallPhase: 'Primary', hasSixthForm: null, noPupilsMin: 101, noPupilsMax: 175, sizeType: 'Small' },
    { term: "2020/2021", overallPhase: 'Primary', hasSixthForm: null, noPupilsMin: 176, noPupilsMax: 385, sizeType: 'Medium' },
    { term: "2020/2021", overallPhase: 'Secondary', hasSixthForm: false, noPupilsMin: 486, noPupilsMax: 935, sizeType: 'Medium' },
    { term: "2020/2021", overallPhase: 'Secondary', hasSixthForm: true, noPupilsMin: 1, noPupilsMax: 770, sizeType: 'Small' },
    { term: "2020/2021", overallPhase: 'Secondary', hasSixthForm: false, noPupilsMin: 1, noPupilsMax: 485, sizeType: 'Small' },
    { term: "2020/2021", overallPhase: 'Secondary', hasSixthForm: true, noPupilsMin: 771, noPupilsMax: 1300, sizeType: 'Medium' },
    { term: "2020/2021", overallPhase: 'Secondary', hasSixthForm: true, noPupilsMin: 1301, noPupilsMax: null, sizeType: 'Large' },
    { term: "2020/2021", overallPhase: 'Secondary', hasSixthForm: false, noPupilsMin: 936, noPupilsMax: null, sizeType: 'Large' },
    { term: "2020/2021", overallPhase: 'Primary', hasSixthForm: null, noPupilsMin: 386, noPupilsMax: null, sizeType: 'Large' }];

    saDataServiceSpy.getSizeLookupList.and.returnValue(asyncData(stubValue));

  });

  it('#getSizeLookup should return correct size lookup from list', done => {
    saSizeLookupService.getSizeLookup('Primary', false, null, 1000).subscribe(
      result => {
        expect(result).toBeDefined();
        expect(result.overallPhase).toBe('Primary');
        done();
      },
      fail
    );
  });

});
