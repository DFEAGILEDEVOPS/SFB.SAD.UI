/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SidebysideFormatBreadcrumbsComponent } from './sidebyside-format-breadcrumbs.component';

describe('SidebysideFormatBreadcrumbsComponent', () => {
  let component: SidebysideFormatBreadcrumbsComponent;
  let fixture: ComponentFixture<SidebysideFormatBreadcrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebysideFormatBreadcrumbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebysideFormatBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
