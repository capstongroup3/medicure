import { Component } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.scss'
})
export class AppointmentListComponent {
  appointments: any[] = [];
  userType: string | undefined;
  constructor(private appointmentService: AppointmentService,
    private router: Router
  ) {
    this.userType = localStorage.getItem('userType') == 'doctor' ? 'doctor' : 'user';
  }
  ngOnInit(): void {
    
    this.getAppointments();
  }

  getAppointments(): void {
    this.appointmentService.getAppointments().subscribe(
      (data: any[]) => {
        this.appointments = data;
      },
      error => {
        console.error('Error fetching appointment data:', error);
      }
    );
  }
  navigateToAddAppointment(): void {
    this.router.navigate(['/add-appointment']);
  }
  confirmAction(action: string, appointment: any) {
    const message = action === 'accepted' ? 'Do you want to accept this appointment?' : 'Do you want to reject this appointment?';
    if (confirm(message)) {
      debugger
      // Call the backend service to accept or reject the appointment
      this.handleAppointmentAction(action, appointment);
    }
  }

  handleAppointmentAction(action: string, appointment: any) {
    this.appointmentService.updateAppointmentStatus(appointment._id, action).subscribe(
      response => {
        debugger
        // Handle the response and update the UI accordingly
        console.log('Appointment status updated successfully', response);
        // Update the appointment list UI, e.g., remove or mark the appointment as handled
        this.getAppointments(); // Re-fetch the appointments list if necessary
      },
      error => {
        console.error('Error updating appointment status', error);
      }
    );
  }
}
