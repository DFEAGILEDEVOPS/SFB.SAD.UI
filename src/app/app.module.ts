import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
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
    DashboardAaModalComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    FormsModule,
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
