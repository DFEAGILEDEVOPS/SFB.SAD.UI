import { AaValueFormatPipe } from './../core/pipes/aa-value-format.pipe';
import { CurrencyPipe } from '@angular/common';
import { SaFsmLookupService } from './../core/network/services/safsmlookup.service';
import { FormBuilder } from '@angular/forms';
import { EditDataComponent } from './edit-data.component';
import { SaScenarioModel } from './../Models/SaScenarioModel';
import { SaScenariosService } from './../core/network/services/sascenarios.service';
import { TestBed, async, inject, fakeAsync } from '@angular/core/testing';

import { defer } from 'rxjs/internal/observable/defer';
import { SaData } from 'app/Models/SaData';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { ActivatedRouteStub } from 'testing/activated-route-stub';
import { SaSizeLookupService } from '@core/network/services/sasizelookup.service';
import { By } from '@angular/platform-browser';


function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('Component: Edit-data', () => {
  let comp: EditDataComponent;
  let saScenariosServiceSpy: jasmine.SpyObj<SaScenariosService>;
  let saSizeLookupServiceSpy: jasmine.SpyObj<SaSizeLookupService>;
  let saFSMLookupServiceSpy: jasmine.SpyObj<SaFsmLookupService>;
  let currencyPipeSpy: jasmine.SpyObj<CurrencyPipe>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteStub: ActivatedRouteStub;

  beforeEach(async(() => {
    activatedRouteStub = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      providers: [
        { provide: SaScenariosService, useValue: jasmine.createSpyObj('SaScenariosService', ['getFirstScenario']) },
        { provide: SaSizeLookupService, useValue: jasmine.createSpyObj('SaSizeLookupService', ['getSizeLookup']) },
        { provide: SaFsmLookupService, useValue: jasmine.createSpyObj('SaFsmLookupService', ['getFSMLookup']) },
        { provide: CurrencyPipe, useValue: jasmine.createSpyObj('CurrencyPipe', ['transform']) },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: FormBuilder, useClass: FormBuilder },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
      ],
      declarations: [ EditDataComponent, AaValueFormatPipe ]
    })
    .compileComponents();

    activatedRouteStub.setParamMap({ urn: 123 });

    saScenariosServiceSpy = TestBed.inject(SaScenariosService) as jasmine.SpyObj<SaScenariosService>;
    saSizeLookupServiceSpy = TestBed.inject(SaSizeLookupService) as jasmine.SpyObj<SaSizeLookupService>;
    saFSMLookupServiceSpy = TestBed.inject(SaFsmLookupService) as jasmine.SpyObj<SaFsmLookupService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    currencyPipeSpy = TestBed.inject(CurrencyPipe) as jasmine.SpyObj<CurrencyPipe>;

  }));


  it('should display FSM field when primary or secondary school', () => {

    let fixture = TestBed.createComponent(EditDataComponent);
    comp = fixture.componentInstance;

    const stubSaData = new SaData();
    stubSaData.urn = 123;
    stubSaData.overallPhase = 'Primary';
    stubSaData.name = 'test';
    saScenariosServiceSpy.getFirstScenario.and.returnValue(of(new SaScenarioModel(stubSaData)));

    fixture.detectChanges();

    let fsmDe  = fixture.debugElement.query(By.css('.fsm'));
    let fsmEl = fsmDe.nativeElement;

    expect(fsmEl).not.toBeNull();
  });

  it('should not display FSM field when not primary or secondary school', () => {

    let fixture = TestBed.createComponent(EditDataComponent);
    comp = fixture.componentInstance;

    const stubSaData = new SaData();
    stubSaData.urn = 123;
    stubSaData.overallPhase = 'All-through';
    stubSaData.name = 'test';
    saScenariosServiceSpy.getFirstScenario.and.returnValue(of(new SaScenarioModel(stubSaData)));
    
    fixture.detectChanges();

    let fsmDe  = fixture.debugElement.query(By.css('.fsm'));

    expect(fsmDe).toBeNull();
});

});
