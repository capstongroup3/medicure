import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';

// Define an interface for the user object
interface User {
  name?: string;
  email: string;
  password: string;
  userType: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {


  // // Update the parameter type to use the User interface

  private apiUrl = 'http://localhost:5000/api/users';
  private token: string | null = null;
  private userId: string | null = null;

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    debugger
    return this.http.post(`${this.apiUrl}/signup`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user).pipe(
      tap((response: any) => {
        debugger
        this.token = response.token;
        this.userId = response.user._id;
      }),
      catchError(this.handleError)
    );
  }

  logout() {
    this.token = null;
    this.userId = null;
    localStorage.removeItem('userId');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
  }

  getUserProfile(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile/${userId}`).pipe(
      catchError(this.handleError)
    );
  }
 
  isLoggedIn(): boolean {
    return !!this.token;
  }

  getLoggedInUserId(): string | null {
    return this.userId;
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error);
  }
}
