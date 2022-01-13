import { TestBed} from '@angular/core/testing';

import { defer } from 'rxjs/internal/observable/defer';
import { SaFsmLookupService } from './safsmlookup.service';
import { SaDataService } from './sadata.service';

function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('Service: SaFSMlookup', () => {
  let saFSMLookupService: SaFsmLookupService;
  let saDataServiceSpy: jasmine.SpyObj<SaDataService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SaFsmLookupService,
        { provide: SaDataService, useValue: jasmine.createSpyObj('SaDataService', ['getFSMLookupList']) }
      ]
    });

    // Inject both the service-to-test and its (spy) dependency
    saFSMLookupService = TestBed.inject(SaFsmLookupService);
    saDataServiceSpy = TestBed.inject(SaDataService) as jasmine.SpyObj<SaDataService>;

    // tslint:disable-next-line:max-line-length
    let stubValue = [{ term: "2020/2021", overallPhase: 'Secondary', hasSixthForm: true, fsmMin: 6.0001, fsmMax: 16.5, fsmScale: 'Medium FSM' },
    { term: "2020/2021", overallPhase: 'Primary', hasSixthForm: null, fsmMin: 18.0001, fsmMax: 100, fsmScale: 'High FSM' },
    { term: "2020/2021", overallPhase: 'Primary', hasSixthForm: null, fsmMin: 0, fsmMax: 5, fsmScale: 'Low FSM' },
    { term: "2020/2021", overallPhase: 'Primary', hasSixthForm: null, fsmMin: 5.0001, fsmMax: 18, fsmScale: 'Medium FSM' },
    { term: "2020/2021", overallPhase: 'Secondary', hasSixthForm: false, fsmMin: 21.5001, fsmMax: 100, fsmScale: 'High FSM' },
    { term: "2020/2021", overallPhase: 'Secondary', hasSixthForm: false, fsmMin: 0, fsmMax: 8, fsmScale: 'Low FSM' },
    { term: "2020/2021", overallPhase: 'Secondary', hasSixthForm: true, fsmMin: 0, fsmMax: 6, fsmScale: 'Low FSM' },
    { term: "2020/2021", overallPhase: 'Secondary', hasSixthForm: false, fsmMin: 8.0001, fsmMax: 21.5, fsmScale: 'Medium FSM' },
    { term: "2020/2021", overallPhase: 'Secondary', hasSixthForm: true, fsmMin: 16.5001, fsmMax: 100, fsmScale: 'High FSM' }];

    saDataServiceSpy.getFSMLookupList.and.returnValue(asyncData(stubValue));
  });


  it('#getFSMLookup should return correct fsm lookup from list', done => {
    saFSMLookupService.getFSMLookup('Secondary', true, null, 7).subscribe(
      result => {
        expect(result).toBeDefined();
        expect(result.overallPhase).toBe('Secondary');
        done();
      },
      fail
    );
  });


});
