
import { async, ComponentFixture, TestBed
} from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { DashboardCharacteristicsComponent } from './dashboard-characteristics.component';
import { SizeLookupModel } from 'app/Models/SizeLookupModel';
import { FSMLookupModel } from 'app/Models/FSMLookupModel';

describe('Component: DashboardCharacteristics', () => {

  let comp: DashboardCharacteristicsComponent;
  let fixture: ComponentFixture<DashboardCharacteristicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCharacteristicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCharacteristicsComponent);
    comp = fixture.componentInstance;

    comp.phase = 'Primary';
    comp.londonWeight = 'Inner';
    comp.noPupils = 1000;
    comp.FSM = 5;
    comp.SizeLookup = new SizeLookupModel(900, null, 'Large', 'Primary', true, '2019-2020');
    comp.FSMLookup = new FSMLookupModel(0, 10, 'small', 'Primary', true, '2019-2020');

    // trigger initial data binding
    fixture.detectChanges();
  });

  it('should display correct text on no limit upper boundary cases', () => {

    let tableDe  = fixture.debugElement.query(By.css('.govuk-table__body'));
    let tableEl = tableDe.nativeElement;

    expect(tableEl.textContent).toContain('Schools with 900 or more pupils');
  });

  it('should display "London" when weighting is "Inner"', () => {
    comp.londonWeight = 'Inner';
    fixture.detectChanges();
    let lw1De = fixture.debugElement.query(By.css('#lw1'));
    expect(lw1De.nativeElement.textContent).toEqual('London');
  });


  it('should display "London" when weighting is "Outer"', () => {
    comp.londonWeight = 'Outer';
    fixture.detectChanges();
    let lw1De = fixture.debugElement.query(By.css('#lw1'));
    expect(lw1De.nativeElement.textContent).toEqual('London');
  });

  it('should display "Not London" when weighting is "Neither"', () => {
    comp.londonWeight = 'Neither';
    fixture.detectChanges();
    let lw1De = fixture.debugElement.query(By.css('#lw1'));
    expect(lw1De.nativeElement.textContent).toEqual('Not London');
  });

  it('should display Size row when size lookup is there', () => {
    let sizeDe = fixture.debugElement.query(By.css('#size'));
    expect(sizeDe).not.toBeNull();
  });

  it('should not display Size row when size lookup is not there', () => {
    comp.SizeLookup = null;
    fixture.detectChanges();
    let sizeDe = fixture.debugElement.query(By.css('#size'));
    expect(sizeDe).toBeNull();
  });

  it('should display FSM row when size lookup is there', () => {
    let sizeDe = fixture.debugElement.query(By.css('#fsm'));
    expect(sizeDe).not.toBeNull();
  });

  it('should not display FSM row when size lookup is not there', () => {
    comp.FSMLookup = null;
    fixture.detectChanges();
    let sizeDe = fixture.debugElement.query(By.css('#fsm'));
    expect(sizeDe).toBeNull();
  });

});
