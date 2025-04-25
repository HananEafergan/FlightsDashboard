import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, of, take, tap } from 'rxjs';
import { Worker } from '../../models/worker.model';
import { Flight } from '../../models/flight.model';

@Injectable()
export class StoreService {
  private workersSubject: BehaviorSubject<Worker[]> = new BehaviorSubject<Worker[]>([]);
  private flightsSubject: BehaviorSubject<Flight[]> = new BehaviorSubject<Flight[]>([]);
  private errorSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  get workers$() {
    return this.workersSubject.asObservable();
  }

  get flights$(){
    return this.flightsSubject.asObservable();
  }

  get error$(){
    return this.errorSubject.asObservable();
  }

  constructor(private readonly api: ApiService) { }

  setWorkers(value: Worker[]){
    this.workersSubject.next(value);
  }

  setFlights(value: Flight[]){
    this.flightsSubject.next(value);
  }

  setError(value: string)
  {
    this.errorSubject.next(value);
  }

  getWorkers(){
    this.api.getWorkers().pipe(take(1), tap(res =>
      this.setWorkers(res)), catchError(err => {
        this.setError(err);
        return of([]);
      })
    ).subscribe();
  }

  getFlightsByWorkerId(workerId: number){
    this.api.getFlightsByWorkerId(workerId).pipe(take(1), tap(res =>
      this.setFlights(res)), catchError(err => {
        this.setError(err);
        return of([]);
      })
    ).subscribe();
  }
}
