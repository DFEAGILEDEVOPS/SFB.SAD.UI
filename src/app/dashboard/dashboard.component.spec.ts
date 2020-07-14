import { BsModalService } from 'ngx-bootstrap/modal';
import { SaScenarioModel } from './../Models/SaScenarioModel';
import { SaScenariosService } from './../core/network/services/sascenarios.service';
import { DashboardComponent } from './dashboard.component';
import { TestBed, async, inject, fakeAsync } from '@angular/core/testing';

import { defer } from 'rxjs/internal/observable/defer';
import { SaData } from 'app/Models/SaData';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { FnParam } from '@angular/compiler/src/output/output_ast';
import { ActivatedRouteStub } from 'testing/activated-route-stub';

function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('Component: Dashboard', () => {
  let comp: DashboardComponent;
  let saScenariosServiceSpy: jasmine.SpyObj<SaScenariosService>;
  let activatedRouteStub: ActivatedRouteStub;

  beforeEach(() => {
    activatedRouteStub = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      providers: [
        DashboardComponent,
        { provide: SaScenariosService, useValue: jasmine.createSpyObj('SaScenariosService', ['getFirstScenario']) },
        { provide: BsModalService, useValue: jasmine.createSpyObj('BsModalService', ['_']) },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ]
    });

    // inject both the component and the dependent service.
    activatedRouteStub.setParamMap({ urn: 123 });

    comp = TestBed.inject(DashboardComponent);
    saScenariosServiceSpy = TestBed.inject(SaScenariosService) as jasmine.SpyObj<SaScenariosService>;
    const bsModalServiceSpy = TestBed.inject(BsModalService) as jasmine.SpyObj<BsModalService>;
  });

  it('should load the first scenario upon initialization', () => {
    const stubSaData = new SaData();
    stubSaData.urn = 312;
    saScenariosServiceSpy.getFirstScenario.and.returnValue(of(new SaScenarioModel(stubSaData)));

    comp.ngOnInit();

    expect(comp.scenarioLoaded).toBeTrue();
    expect(comp.activeScenario.urn).toEqual(123);

  });
});
