/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditingFormatComponent } from './editing-format.component';

describe('EditingFormatComponent', () => {
  let component: EditingFormatComponent;
  let fixture: ComponentFixture<EditingFormatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditingFormatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditingFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
