import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { AppointmentListComponent } from './component/appointment-list/appointment-list.component';
import { NgModule } from '@angular/core';
import { ScheduleListComponent } from './component/schedule-list/schedule-list.component';


export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'profile', component: UserProfileComponent },
  { path: 'about-us', component: AboutUsComponent},
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'appointment-list', component: AppointmentListComponent },
  { path: 'schedule-list', component: ScheduleListComponent },
  { path: '**', redirectTo: 'login' } // Redirect to login for any undefined routes
 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }