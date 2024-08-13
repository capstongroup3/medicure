import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AssessmentService {


  // // Update the parameter type to use the User interface

  private apiUrl = 'http://localhost:5000/api/assessment';

  constructor(private http: HttpClient) { }


  getAssessment(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get-assessment`);
  }

  createAssessment(assemssment: any): Observable<any> {
    debugger
    return this.http.post<any>(`${this.apiUrl}/add-assessment`, assemssment);
  }

}
