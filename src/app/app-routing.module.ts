import { EditScenariosComponent } from './edit-scenarios/edit-scenarios.component';
import { EditDataComponent } from './edit-data/edit-data.component';
import { EditingFormatComponent } from './editing-format/editing-format.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '@layouts/gov-uk-layout/not-found/not-found.component';
import { SidebysideComponent } from './sidebyside/sidebyside.component';
import { SidebysideFormatComponent } from './sidebyside-format/sidebyside-format.component';

const routes: Routes = [
  { path: 'self-assessment/side-by-side', component: SidebysideComponent},
  { path: 'self-assessment/edit-data/:urn/:viewType/:scenarioNo', component: EditDataComponent},
  { path: 'self-assessment/edit-data/:urn/:viewType', component: EditDataComponent},
  { path: 'self-assessment/:urn', component: DashboardComponent},
  { path: 'self-assessment/editing-format/:urn/:name/:scenarioNo', component: EditingFormatComponent},
  { path: 'self-assessment/editing-format/:urn/:name', component: EditingFormatComponent},
  { path: 'self-assessment/sidebyside-format/:urn/:name', component: SidebysideFormatComponent},
  { path: 'self-assessment/edit-scenarios/:urn/:name', component: EditScenariosComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
