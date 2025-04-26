import { Component, Input } from '@angular/core';
import { Flight } from '../../../../models/flight.model';

@Component({
  selector: 'app-flight-info',
  standalone: false,
  templateUrl: './flight-info.component.html',
  styleUrl: './flight-info.component.scss'
})
export class FlightInfoComponent {
  @Input() flight!: Flight;
}
