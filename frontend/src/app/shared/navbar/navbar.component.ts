// navbar.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isLoggedIn = localStorage.getItem('isLoggedIn') ? localStorage.getItem('isLoggedIn') : false ;

  constructor(private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  navigateToLogin() {
    this.router.navigate(['']);
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
  aboutUsNavigation() {
    this.router.navigate(['/about-us']);
  }
  contactUsNavigation() {
    this.router.navigate(['/contact-us']);
  }
  navigateToProfile(): void {
    debugger
    const userId = localStorage.getItem('userId')
    this.router.navigate([`/profile`]);
  }
  homepage(): void {
    this.router.navigate([`/home`]);
  }
  toggleLogin() {
    this.isLoggedIn = !this.isLoggedIn;
  }
  getSchedules() {
    this.router.navigate(['/schedule-list']);
  }
  getAppointments() {
    this.router.navigate(['/appointment-list']);
  }
  faqs() {
    this.router.navigate(['/faqs']);
  }
}