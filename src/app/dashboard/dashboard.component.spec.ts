import { BsModalService } from 'ngx-bootstrap/modal';
import { SaScenarioModel } from './../Models/SaScenarioModel';
import { SaScenariosService } from './../core/network/services/sascenarios.service';
import { DashboardComponent } from './dashboard.component';
import { TestBed, async, inject, fakeAsync, ComponentFixture } from '@angular/core/testing';

import { defer } from 'rxjs/internal/observable/defer';
import { SaData } from 'app/Models/SaData';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { ActivatedRouteStub } from 'testing/activated-route-stub';
import { By } from '@angular/platform-browser';

function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('Component: Dashboard', () => {
  let comp: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let saScenariosServiceSpy =  jasmine.createSpyObj('SaScenariosService', ['getFirstScenario', 'isSecondScenarioEditedAndStored']);
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let activatedRouteStub = new ActivatedRouteStub();

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers: [
        { provide: SaScenariosService, useValue:  saScenariosServiceSpy},
        { provide: BsModalService, useValue: jasmine.createSpyObj('BsModalService', ['_']) },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: routerSpy },
      ]
    }).compileComponents();

  });

  it('should load the first scenario upon initialization, if there is no stored second scenario', () => {

    fixture = TestBed.createComponent(DashboardComponent);
    comp = fixture.componentInstance;

    const stubSaData = new SaData();
    stubSaData.urn = 123;
    saScenariosServiceSpy.getFirstScenario.and.returnValue(of(new SaScenarioModel(stubSaData)));
    saScenariosServiceSpy.isSecondScenarioEditedAndStored.and.returnValue(false);

    activatedRouteStub.setParamMap({ urn: 123 });

    fixture.detectChanges();

    expect(comp.scenarioLoaded).toBeTrue();
    expect(comp.activeScenario.urn).toEqual(123);

  });

  it('should navigate to side by side, if there is a stored second scenario', () => {

    fixture = TestBed.createComponent(DashboardComponent);
    comp = fixture.componentInstance;

    const stubSaData = new SaData();
    stubSaData.urn = 123;
    saScenariosServiceSpy.getFirstScenario.and.returnValue(of(new SaScenarioModel(stubSaData)));
    saScenariosServiceSpy.isSecondScenarioEditedAndStored.and.returnValue(true);

    activatedRouteStub.setParamMap({ urn: 123 });

    fixture.detectChanges();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['self-assessment/side-by-side']);

  });

  it('should display a warning message, if financial data is partial', () => {
    fixture = TestBed.createComponent(DashboardComponent);
    comp = fixture.componentInstance;

    const stubSaData = new SaData();
    stubSaData.urn = 123;
    stubSaData.isReturnsComplete = false;
    saScenariosServiceSpy.getFirstScenario.and.returnValue(of(new SaScenarioModel(stubSaData)));
    saScenariosServiceSpy.isSecondScenarioEditedAndStored.and.returnValue(false);

    activatedRouteStub.setParamMap({ urn: 123 });

    fixture.detectChanges();

    let warning = fixture.debugElement.query(By.css('#partialWarning'));
    expect(warning).not.toBeNull();

  });

  it('should not display a warning message, if financial data is complete', () => {
    fixture = TestBed.createComponent(DashboardComponent);
    comp = fixture.componentInstance;

    const stubSaData = new SaData();
    stubSaData.urn = 123;
    stubSaData.isReturnsComplete = true;
    saScenariosServiceSpy.getFirstScenario.and.returnValue(of(new SaScenarioModel(stubSaData)));
    saScenariosServiceSpy.isSecondScenarioEditedAndStored.and.returnValue(false);

    activatedRouteStub.setParamMap({ urn: 123 });

    fixture.detectChanges();

    let warning = fixture.debugElement.query(By.css('#partialWarning'));
    expect(warning).toBeNull();

  });
});
