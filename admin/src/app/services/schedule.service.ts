import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ScheduleService {


  // // Update the parameter type to use the User interface

  private apiUrl = 'http://localhost:5000/api/schedule';

  constructor(private http: HttpClient) { }



  getSchedules(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get-schedule`);
  }

  createSchedule(schedule: any): Observable<any> {
    debugger
    return this.http.post<any>(`${this.apiUrl}/add-schedule`, schedule);
  }
}
