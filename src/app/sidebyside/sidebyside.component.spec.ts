import { SidebysideComponent } from './sidebyside.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SaScenarioModel } from './../Models/SaScenarioModel';
import { SaScenariosService } from './../core/network/services/sascenarios.service';
import { TestBed, async, inject, fakeAsync, ComponentFixture } from '@angular/core/testing';

import { defer } from 'rxjs/internal/observable/defer';
import { SaData } from 'app/Models/SaData';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { ActivatedRouteStub } from 'testing/activated-route-stub';
import { appSettingsFactory } from '@core/config/app-config.module';
import { AppSettings, appSettings } from '@core/config/settings/app-settings';
import { URLService } from '@core/network/services/URL.service';
import { ConfigService } from '@ngx-config/core';

function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('Component: SideBySide', () => {
  let fixture: ComponentFixture<SidebysideComponent>;
  let comp: SidebysideComponent;
  let saScenariosServiceSpy =  jasmine.createSpyObj('SaScenariosService', ['getFirstScenario', 'getSecondScenario', 'deleteFirstScenarioAndReplaceItWithSecond', 'deleteSecondScenario', 'deleteSecondScenarioFromEverywhere']);
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let configServiceSpy =  jasmine.createSpyObj('ConfigService', ['getSettings']);
  let urlServiceSpy =  jasmine.createSpyObj('URLService', ['getDomain']);


  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        SidebysideComponent,
        { provide: SaScenariosService, useValue:  saScenariosServiceSpy},
        { provide: BsModalService, useValue: jasmine.createSpyObj('BsModalService', ['_']) },
        { provide: Router, useValue: routerSpy },
        { provide: ConfigService, useValue: configServiceSpy },
        { provide: URLService, useValue: urlServiceSpy },
        { provide: appSettings, useFactory: appSettingsFactory, deps: [ConfigService, URLService] },
      ]
    })
    .compileComponents();

    //comp = TestBed.inject(SidebysideComponent);
  });

  beforeEach(() => {
    configServiceSpy.getSettings.and.returnValue({appSettings: new AppSettings()});
    urlServiceSpy.getDomain.and.returnValue("localhost");

  });


  it('should load both scenarios on initialization', () => {
    const stubSaData1 = new SaData();
    stubSaData1.urn = 111;
    const stubSaData2 = new SaData();
    stubSaData2.urn = 222;
    saScenariosServiceSpy.getFirstScenario.and.returnValue(of(new SaScenarioModel(stubSaData1)));
    saScenariosServiceSpy.getSecondScenario.and.returnValue(new SaScenarioModel(stubSaData2));

    fixture = TestBed.createComponent(SidebysideComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    expect(comp.firstScenarioLoaded).toBeTrue();
    expect(comp.secondScenarioLoaded).toBeTrue();

  });

  it('should delete the first scenario and replace with second when removed first', () => {
    const stubSaData1 = new SaData();
    stubSaData1.urn = 111;
    const stubSaData2 = new SaData();
    stubSaData2.urn = 222;
    saScenariosServiceSpy.getFirstScenario.and.returnValue(of(new SaScenarioModel(stubSaData1)));
    saScenariosServiceSpy.getSecondScenario.and.returnValue(new SaScenarioModel(stubSaData2));

    fixture = TestBed.createComponent(SidebysideComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    comp.removeScenario(0);

    expect(saScenariosServiceSpy.deleteFirstScenarioAndReplaceItWithSecond).toHaveBeenCalled();

  });

  it('should redirect to dashboard view when removed first', () => {
    const stubSaData1 = new SaData();
    stubSaData1.urn = 111;
    const stubSaData2 = new SaData();
    stubSaData2.urn = 222;
    saScenariosServiceSpy.getFirstScenario.and.returnValue(of(new SaScenarioModel(stubSaData1)));
    saScenariosServiceSpy.getSecondScenario.and.returnValue(new SaScenarioModel(stubSaData2));

    fixture = TestBed.createComponent(SidebysideComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    comp.removeScenario(0);

    expect(routerSpy.navigate).toHaveBeenCalledWith([ 'self-assessment/', 222 ] );

  });

  it('should delete the second scenario when removed second', () => {
    const stubSaData1 = new SaData();
    stubSaData1.urn = 111;
    const stubSaData2 = new SaData();
    stubSaData2.urn = 222;
    saScenariosServiceSpy.getFirstScenario.and.returnValue(of(new SaScenarioModel(stubSaData1)));
    saScenariosServiceSpy.getSecondScenario.and.returnValue(of(new SaScenarioModel(stubSaData2)));

    fixture = TestBed.createComponent(SidebysideComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    comp.removeScenario(1);

    expect(saScenariosServiceSpy.deleteSecondScenarioFromEverywhere).toHaveBeenCalled();

  });

  it('should redirect to dashboard view when removed second', () => {
    const stubSaData1 = new SaData();
    stubSaData1.urn = 111;
    const stubSaData2 = new SaData();
    stubSaData2.urn = 222;
    saScenariosServiceSpy.getFirstScenario.and.returnValue(of(new SaScenarioModel(stubSaData1)));
    saScenariosServiceSpy.getSecondScenario.and.returnValue(of(new SaScenarioModel(stubSaData2)));

    fixture = TestBed.createComponent(SidebysideComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    comp.removeScenario(1);

    expect(routerSpy.navigate).toHaveBeenCalledWith([ 'self-assessment/', 111 ] );

  });

});
