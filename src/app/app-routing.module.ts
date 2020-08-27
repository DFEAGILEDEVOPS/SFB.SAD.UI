import { ServiceProblemComponent } from './core/error-handling/ServiceProblem/ServiceProblem.component';
import { NotFoundErrorComponent } from './core/error-handling/NotFoundError/NotFoundError.component';

import { EditDataComponent } from './edit-data/edit-data.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '@layouts/gov-uk-layout/not-found/not-found.component';
import { SidebysideComponent } from './sidebyside/sidebyside.component';

const routes: Routes = [
  { path: 'self-assessment/side-by-side', component: SidebysideComponent},
  { path: 'self-assessment/edit-data/:urn/:viewType/:scenarioNo', component: EditDataComponent},
  { path: 'self-assessment/edit-data/:urn/:viewType', component: EditDataComponent},
  { path: 'self-assessment/add-missing-data/:urn/:field/:scenarioNo', component: EditDataComponent},
  { path: 'self-assessment/add-missing-data/:urn/:field', component: EditDataComponent},
  { path: 'self-assessment/:urn', component: DashboardComponent},
  { path: 'service-problem', component: ServiceProblemComponent},
  { path: '**', component: NotFoundErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled',  useHash: false,  anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
