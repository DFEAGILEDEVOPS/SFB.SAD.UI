/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SidebysideComponent } from './sidebyside.component';

describe('SidebysideComponent', () => {
  let component: SidebysideComponent;
  let fixture: ComponentFixture<SidebysideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebysideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebysideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
