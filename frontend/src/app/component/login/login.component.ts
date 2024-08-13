
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup | any;
  loginData = { email: '', password: '', userType: '' };
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private userService: UserService,
    private authService: AuthService
  ) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      userType: ['', Validators.required]
    });

  }

  login() {
    this.loginData.email = this.loginForm.value.email;
    this.loginData.password = this.loginForm.value.password;
    this.loginData.userType = this.loginForm.value.userType;
    debugger
    this.userService.login(this.loginForm.value).subscribe(
      response => {
        debugger
        const userId = response.user._id;
        const token = response.token;
        const userType = response.user.userType;
        this.authService.login(token, userId, userType);
        this.route.navigate(['home']); // Navigate to some dashboard or home page
      },
      error => console.error('Error', error)
    );
  }
  signup() {
    this.route.navigate(['signup']);
  }
}

