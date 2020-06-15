/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SidebysideCharacteristicsComponent } from './sidebyside-characteristics.component';

describe('SidebysideCharacteristicsComponent', () => {
  let component: SidebysideCharacteristicsComponent;
  let fixture: ComponentFixture<SidebysideCharacteristicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebysideCharacteristicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebysideCharacteristicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
