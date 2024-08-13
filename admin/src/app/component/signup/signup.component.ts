import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class SignupComponent implements OnInit {
  signupForm:  FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      userType: ['',  [Validators.required]]
    });
  }

  ngOnInit(): void {}

  register() {
    debugger
    console.log('Register button clicked');
    if (this.signupForm.valid) {
      this.userService.register(this.signupForm.value).subscribe(
        response => {
           console.log('User signed up', response);
           this.router.navigate(['']);
        },
        error => console.error('Error', error)
      );
    } else {
      console.log('Form is invalid');
      this.signupForm.markAllAsTouched();
    }
  }
  

  get name() {
    return this.signupForm.get('name');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get userType() {
    return this.signupForm.get('userType');
  }

  navigateToLogin() {
    debugger
    this.router.navigate(['']);
  }
}
