import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HomeComponent } from './shared/home/home.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { UserService } from './services/user.service';
import { AuthGuard } from './auth/auth.guard';
import { AppRoutingModule, routes } from './app.routes';
import { LoginComponent } from './component/login/login.component';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { AppointmentListComponent } from './component/appointment-list/appointment-list.component';
import { AppointmentService } from './services/appointment.service';
import { ScheduleListComponent } from './component/schedule-list/schedule-list.component';
import { SharedModule } from './shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AboutUsComponent,
    ContactUsComponent,
    UserProfileComponent,
    AppointmentListComponent,
    ScheduleListComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [UserService, AppointmentService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
