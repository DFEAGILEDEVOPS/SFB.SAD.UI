
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
  let tableDe: DebugElement;
  let tableEl: HTMLElement;

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

    tableDe  = fixture.debugElement.query(By.css('.govuk-table__body'));
    tableEl = tableDe.nativeElement;

    // trigger initial data binding
    fixture.detectChanges();
  });

  it('should display correct text on no limit upper boundary cases', () => {
    expect(tableEl.textContent).toContain('Schools with 900 or more pupils');
  });
});
