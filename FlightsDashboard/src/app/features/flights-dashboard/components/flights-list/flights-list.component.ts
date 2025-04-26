import { Component, Input } from '@angular/core';
import { StoreService } from '../../../../core/services/store.service';
import { Flight } from '../../../../models/flight.model';

@Component({
  selector: 'app-flights-list',
  standalone: false,
  templateUrl: './flights-list.component.html',
  styleUrl: './flights-list.component.scss'
})
export class FlightsListComponent {
  @Input() flights: Flight[] = [];

  constructor(private readonly store: StoreService) {
  }

  selectFlight(flightNumber: string){
    this.store.setSelectedFlight(flightNumber);
  }
}
