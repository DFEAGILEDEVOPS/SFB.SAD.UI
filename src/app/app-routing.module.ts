
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
  { path: 'self-assessment/add-missing-data/:urn/:field', component: EditDataComponent},
  { path: 'self-assessment/:urn', component: DashboardComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
