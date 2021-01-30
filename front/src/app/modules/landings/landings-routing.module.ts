import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingsComponent } from './landings.component';

const routes: Routes = [
  {
    path: ':id',
    component: LandingsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingsRoutingModule { }
