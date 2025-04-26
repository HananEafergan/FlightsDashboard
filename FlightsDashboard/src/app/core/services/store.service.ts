import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, interval, of, Subject, take, tap } from 'rxjs';
import { Worker } from '../../models/worker.model';
import { Flight } from '../../models/flight.model';

@Injectable()
export class StoreService {
  private workersSubject: BehaviorSubject<Worker[]> = new BehaviorSubject<Worker[]>([]);
  private flightsSubject: BehaviorSubject<Flight[]> = new BehaviorSubject<Flight[]>([]);
  private selectedFlightSubject: BehaviorSubject<Flight | null> = new BehaviorSubject<Flight | null>(null);
  private selectedWorkerSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  private intervalSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  private errorSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  get workers$() {
    return this.workersSubject.asObservable();
  }

  get flights$() {
    return this.flightsSubject.asObservable();
  }

  get selectedFlight$() {
    return this.selectedFlightSubject.asObservable();
  }

  get selectedWorker$() {
    return this.selectedWorkerSubject.asObservable();
  }

  get error$() {
    return this.errorSubject.asObservable();
  }

  constructor(private readonly api: ApiService) { }

  setWorkers(value: Worker[]) {
    this.workersSubject.next(value);
    if (!this.selectedWorkerSubject.getValue()) {
      this.setSelectedWorkerInterval(value[0].id);
    }
  }

  setFlights(value: Flight[]) {
    this.flightsSubject.next(value);
    if (!this.selectedFlightSubject.getValue()) {
      this.setSelectedFlight(value[0]?.num);
    }
  }

  setSelectedFlight(value: string) {
    const flight = this.flightsSubject.getValue()?.find(f => f.num == value);

    if (flight) {
      this.selectedFlightSubject.next(flight);
    }
    else {
      this.selectedFlightSubject.next(null);
    }
  }

  setSelectedWorker(value: number) {
    const worker = this.workersSubject.getValue()?.find(f => f.id == value);

    if (worker) {
      this.selectedWorkerSubject.next(worker.id);
    }
    else {
      this.selectedWorkerSubject.next(null);
    }
  }

  setError(value: string) {
    this.errorSubject.next(value);
  }

  getWorkers() {
    this.api.getWorkers().pipe(take(1), tap(res =>
      this.setWorkers(res)), catchError(err => {
        this.setError(err);
        return of([]);
      })
    ).subscribe();
  }

  getFlightsByWorkerId(workerId: number) {
    this.api.getFlightsByWorkerId(workerId).pipe(take(1), tap(res => {
      this.setFlights(res);
      this.setSelectedWorker(workerId);
    }), catchError(err => {
      this.setError(err);
      return of([]);
    })
    ).subscribe();
  }

  setSelectedWorkerInterval(workerId: number) {
    if (workerId == this.selectedWorkerSubject.getValue()) {
      return;
    }
    
    this.clearStoreInterval();

    const interval = setInterval(() => {
      this.getFlightsByWorkerId(workerId);
    }, 1000
    );
    this.intervalSubject.next(+interval);
  }

  destroy(){
    this.clearStoreInterval();
  }

  clearStoreInterval(){
    const interval = this.intervalSubject.getValue();
    
    if(interval){
      clearInterval(interval);
    }
  }
}
