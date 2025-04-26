import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { StoreService } from '../../core/services/store.service';
import { Observable, take, tap } from 'rxjs';
import { Worker } from '../../models/worker.model';
import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-flights-dashboard',
  standalone: false,
  templateUrl: './flights-dashboard.component.html',
  styleUrl: './flights-dashboard.component.scss',
  providers: [ApiService, StoreService]
})
export class FlightsDashboardComponent implements OnInit, OnDestroy {
  workers$!: Observable<Worker[]>;
  flights$!: Observable<Flight[]>;
  error$!: Observable<string>;
  selectedFlight$!: Observable<Flight | null>;

  constructor(private readonly store: StoreService) { }

  ngOnInit(): void {
    this.workers$ = this.store.workers$;
    this.flights$ = this.store.flights$;
    this.error$ = this.store.error$;
    this.selectedFlight$ = this.store.selectedFlight$;
    this.store.getWorkers();
  }

  ngOnDestroy(): void {
    this.store.destroy();

  }
  getFlightsByWorker(workerId: number) {
    this.store.setFlights([]);
    this.store.setSelectedFlight('');
    this.store.setSelectedWorkerInterval(workerId);
    this.store.getFlightsByWorkerId(workerId);
  }
}