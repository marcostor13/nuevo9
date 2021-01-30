import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingsRoutingModule } from './landings-routing.module';
import { LandingsComponent } from './landings.component';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    LandingsComponent
  ],
  imports: [
    CommonModule,
    LandingsRoutingModule,
    CalendarModule,
  ]
})
export class LandingsModule { }
