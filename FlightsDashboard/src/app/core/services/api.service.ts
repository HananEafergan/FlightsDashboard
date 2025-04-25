import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Worker } from '../../models/worker.model';
import { Flight } from '../../models/flight.model';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class ApiService {

  constructor(private readonly http: HttpClient) { }

  getWorkers(){
    return this.http.get<Worker[]>(`/api/workers`).pipe(catchError(this.handleError));;
  }

  getFlightsByWorkerId(workerId: number){
    return this.http.get<Flight[]>(`/api/flights/${workerId}`).pipe(catchError(this.handleError));;
  }

  handleError = (error: HttpErrorResponse) => {
    return throwError(() => new Error(error.message));
  }
}
