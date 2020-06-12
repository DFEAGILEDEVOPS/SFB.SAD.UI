/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SidebysideFormatComponent } from './sidebyside-format.component';

describe('SidebysideFormatComponent', () => {
  let component: SidebysideFormatComponent;
  let fixture: ComponentFixture<SidebysideFormatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebysideFormatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebysideFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
