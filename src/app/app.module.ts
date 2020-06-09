import { EditDataBreadcrumbComponent } from './edit-data/edit-data-breadcrumb/edit-data-breadcrumb.component';
import { EditDataComponent } from './edit-data/edit-data.component';
import { EditingFormatBreadcrumbsComponent } from './editing-format/editing-format-breadcrumbs/editing-format-breadcrumbs.component';
import { EditingFormatComponent } from './editing-format/editing-format.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
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
    EditDataComponent,
    EditDataBreadcrumbComponent
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
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
