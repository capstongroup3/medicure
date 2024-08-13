import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {


  // // Update the parameter type to use the User interface

  private apiUrl = 'http://localhost:5000/api/appointment';

  constructor(private http: HttpClient) { }


  getAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get-appointment`);
  }

  createAppointment(appointment: any): Observable<any> {
    debugger
    return this.http.post<any>(`${this.apiUrl}/add-appointment`, appointment);
  }
  updateAppointmentStatus(appointmentId: string, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${appointmentId}/status`, { status });
  }
}
