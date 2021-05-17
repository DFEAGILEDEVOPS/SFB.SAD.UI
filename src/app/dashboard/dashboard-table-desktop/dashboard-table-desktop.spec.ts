import { DashboardTableDesktopComponent } from './dashboard-table-desktop.component';

import { async, ComponentFixture, TestBed
} from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { SizeLookupModel } from 'app/Models/SizeLookupModel';
import { FSMLookupModel } from 'app/Models/FSMLookupModel';
import { SaScenarioModel } from 'app/Models/SaScenarioModel';
import { SaData } from 'app/Models/SaData';

describe('Component: DashboardTableDesktop', () => {

  let comp: DashboardTableDesktopComponent;
  let fixture: ComponentFixture<DashboardTableDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardTableDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTableDesktopComponent);
    comp = fixture.componentInstance;
  });

  it('should display Outcomes table when not a federation', () => {

    let stubSaData = new SaData();
    stubSaData.urn = 123;
    stubSaData.financeType = "Maintained";

    comp.activeScenario = new SaScenarioModel(stubSaData);

    fixture.detectChanges();

    let tableDe  = fixture.debugElement.query(By.css('#outcomesTable'));

    expect(tableDe).not.toBeNull();
  });

  it('should not display Outcomes table when a federation', () => {

    let stubSaData = new SaData();
    stubSaData.urn = 123;
    stubSaData.financeType = "Federation";

    comp.activeScenario = new SaScenarioModel(stubSaData);

    fixture.detectChanges();

    let tableDe  = fixture.debugElement.query(By.css('#outcomesTable'));

    expect(tableDe).toBeNull();
  });

});
