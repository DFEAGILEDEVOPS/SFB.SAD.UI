import { AaValueFormatPipe } from './../core/pipes/aa-value-format.pipe';
import { CurrencyPipe } from '@angular/common';
import { SaFsmLookupService } from './../core/network/services/safsmlookup.service';
import { FormBuilder } from '@angular/forms';
import { EditDataComponent } from './edit-data.component';
import { SaScenarioModel } from './../Models/SaScenarioModel';
import { SaScenariosService } from './../core/network/services/sascenarios.service';
import { TestBed, async, inject, fakeAsync, ComponentFixture } from '@angular/core/testing';

import { defer } from 'rxjs/internal/observable/defer';
import { SaData } from 'app/Models/SaData';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { ActivatedRouteStub } from 'testing/activated-route-stub';
import { SaSizeLookupService } from '@core/network/services/sasizelookup.service';
import { By } from '@angular/platform-browser';
import { BsModalService } from 'ngx-bootstrap/modal';


function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('Component: Edit-data', () => {
  let comp: EditDataComponent;
  let saScenariosServiceSpy =  jasmine.createSpyObj('SaScenariosService', ['getFirstScenario']);
  let saSizeLookupServiceSpy = jasmine.createSpyObj('SaSizeLookupService', ['getSizeLookup']);
  let saFSMLookupServiceSpy = jasmine.createSpyObj('SaFsmLookupService', ['getFSMLookup']);
  let currencyPipeSpy = jasmine.createSpyObj('CurrencyPipe', ['transform']);
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let activatedRouteStub: ActivatedRouteStub;
  let fixture: ComponentFixture<EditDataComponent>;

  beforeEach(async(() => {
    activatedRouteStub = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      providers: [
        { provide: SaScenariosService, useValue:  saScenariosServiceSpy},
        { provide: SaSizeLookupService, useValue: saSizeLookupServiceSpy },
        { provide: SaFsmLookupService, useValue: saFSMLookupServiceSpy },
        { provide: CurrencyPipe, useValue: currencyPipeSpy},
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: routerSpy },
        { provide: FormBuilder, useClass: FormBuilder },
        { provide: BsModalService, useValue: jasmine.createSpyObj('BsModalService', ['_']) },
      ],
      declarations: [EditDataComponent, AaValueFormatPipe]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditDataComponent);
    comp = fixture.componentInstance;

  }));


  it('should display FSM field when primary or secondary school', () => {

    activatedRouteStub.setParamMap({ urn: 123 });

    const stubSaData = new SaData();
    stubSaData.urn = 123;
    stubSaData.overallPhase = 'Primary';
    stubSaData.name = 'test';
    saScenariosServiceSpy.getFirstScenario.and.returnValue(of(new SaScenarioModel(stubSaData)));

    fixture.detectChanges();

    let fsmDe = fixture.debugElement.query(By.css('#fsm'));
    let fsmEl = fsmDe.nativeElement;

    expect(fsmEl).not.toBeNull();
  });

  it('should not display FSM field when not primary or secondary school', () => {

    activatedRouteStub.setParamMap({ urn: 123 });

    const stubSaData = new SaData();
    stubSaData.urn = 123;
    stubSaData.overallPhase = 'All-through';
    stubSaData.name = 'test';
    saScenariosServiceSpy.getFirstScenario.and.returnValue(of(new SaScenarioModel(stubSaData)));

    fixture.detectChanges();

    let fsmDe = fixture.debugElement.query(By.css('#fsm')).parent;
    let fsmNe = fsmDe.nativeElement;

    expect(fsmNe.attributes["hidden"]).not.toBeUndefined();

  });

  it('should not display error summary when there are no validation errors in form', () => {

    activatedRouteStub.setParamMap({ urn: 123 });

    const stubSaData = new SaData();
    stubSaData.urn = 123;
    stubSaData.overallPhase = 'Primary';
    stubSaData.name = 'test';
    saScenariosServiceSpy.getFirstScenario.and.returnValue(of(new SaScenarioModel(stubSaData)));

    fixture.detectChanges();

    let fsmDe = fixture.debugElement.query(By.css('.govuk-error-summary'));

    expect(fsmDe).toBeNull();
  });

  it('should display error summary when there are validation errors in form', () => {

    activatedRouteStub.setParamMap({ urn: 123 });

    const stubSaData = new SaData();
    stubSaData.urn = 123;
    stubSaData.overallPhase = 'Primary';
    stubSaData.name = 'test';
    saScenariosServiceSpy.getFirstScenario.and.returnValue(of(new SaScenarioModel(stubSaData)));

    fixture.detectChanges();

    comp.onSubmit();

    fixture.detectChanges();

    let fsmDe = fixture.debugElement.query(By.css('.govuk-error-summary'));

    expect(fsmDe).not.toBeNull();
  });

});
