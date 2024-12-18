import { DashboardTableMobileComponent } from './dashboard/dashboard-table-mobile/dashboard-table-mobile.component';
import { DashboardTableDesktopComponent } from './dashboard/dashboard-table-desktop/dashboard-table-desktop.component';
import { SidebysideTableMobileComponent } from './sidebyside/sidebyside-table-mobile/sidebyside-table-mobile.component';
import { SidebysideTableDesktopComponent } from './sidebyside/sidebyside-table-desktop/sidebyside-table-desktop.component';
import { AaValueFormatPipe } from './core/pipes/aa-value-format.pipe';
import { EditDataBreadcrumbComponent } from './edit-data/edit-data-breadcrumb/edit-data-breadcrumb.component';
import { EditDataComponent } from './edit-data/edit-data.component';
import { EditingFormatBreadcrumbsComponent } from './editing-format/editing-format-breadcrumbs/editing-format-breadcrumbs.component';
import { EditingFormatComponent } from './editing-format/editing-format.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { GovUkLayoutModule } from '@layouts/gov-uk-layout/gov-uk-layout.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GovUkLayoutComponent } from '@layouts/gov-uk-layout/gov-uk-layout.component';
import { DashboardBreadcrumbComponent } from './dashboard/dashboard-bread-crumb/dashboard-bread-crumb.component';
import { DashboardCharacteristicsComponent } from './dashboard/dashboard-characteristics/dashboard-characteristics.component';
import { DashboardAaModalComponent } from './dashboard/dashboard-aa-modal/dashboard-aa-modal.component';
// tslint:disable-next-line:max-line-length

import { SidebysideComponent } from './sidebyside/sidebyside.component';
import { SidebysideBreadcrumbComponent } from './sidebyside/sidebyside-breadcrumb/sidebyside-breadcrumb.component';
import { SidebysideCharacteristicsComponent } from './sidebyside/sidebyside-characteristics/sidebyside-characteristics.component';
// tslint:disable-next-line:max-line-length
import { SidebysideFormatBreadcrumbsComponent } from './sidebyside-format/sidebyside-format-breadcrumbs/sidebyside-format-breadcrumbs.component';
import { SidebysideFormatComponent } from './sidebyside-format/sidebyside-format.component';
import { GlobalErrorHandler } from '@core/error-handling/GlobalErrorHandler';
import { CurrencyPipe } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [
    AppComponent,
    GovUkLayoutComponent,
    DashboardBreadcrumbComponent,
    DashboardCharacteristicsComponent,
    DashboardComponent,
    DashboardAaModalComponent,
    EditingFormatComponent,
    EditingFormatBreadcrumbsComponent,
    SidebysideFormatComponent,
    SidebysideFormatBreadcrumbsComponent,
    EditDataComponent,
    EditDataBreadcrumbComponent,
    SidebysideComponent,
    SidebysideBreadcrumbComponent,
    SidebysideCharacteristicsComponent,
    AaValueFormatPipe,
    SidebysideTableDesktopComponent,
    SidebysideTableMobileComponent,
    DashboardTableDesktopComponent,
    DashboardTableMobileComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgBootstrapFormValidationModule.forRoot(),
    CoreModule.forRoot(),
    GovUkLayoutModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    MarkdownModule.forRoot()
  ],
  providers: [{provide: ErrorHandler, useClass: GlobalErrorHandler}, CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
