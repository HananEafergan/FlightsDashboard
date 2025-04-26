import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { WorkersListComponent } from './flights-dashboard/components/workers-list/workers-list.component';
import { FlightsListComponent } from './flights-dashboard/components/flights-list/flights-list.component';
import { FlightInfoComponent } from './flights-dashboard/components/flight-info/flight-info.component';
import { FlightsDashboardComponent } from './flights-dashboard/flights-dashboard.component';



@NgModule({
  declarations: [
    FlightsDashboardComponent,
    WorkersListComponent,
    FlightsListComponent,
    FlightInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    FlightsDashboardComponent,
    WorkersListComponent,
    FlightsListComponent,
    FlightInfoComponent
  ]

})
export class FeaturesModule { }
