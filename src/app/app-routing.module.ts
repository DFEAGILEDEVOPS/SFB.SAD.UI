import { EditingFormatComponent } from './editing-format/editing-format.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '@layouts/gov-uk-layout/not-found/not-found.component';

const routes: Routes = [
  { path: 'self-assessment/:urn', component: DashboardComponent},
  { path: 'self-assessment/editing-format/:urn/:name', component: EditingFormatComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
