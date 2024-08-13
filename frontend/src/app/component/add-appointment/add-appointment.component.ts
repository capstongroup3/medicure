import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ScheduleService } from '../../services/schedule.service';
import { AddAppointmentDialogComponent } from '../add-appointment-dialog/add-appointment-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-appointment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-appointment.component.html',
  styleUrl: './add-appointment.component.scss'
})
export class AddAppointmentComponent {
  appointmentForm: FormGroup | any;

  schedules: any[] = [];
  userType: string;
  selectedSchedule: any;
  constructor(private fb: FormBuilder, private appointmentService: AppointmentService,
    private scheduleService: ScheduleService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.userType = localStorage.getItem('userType') == 'doctor' ? 'doctor' : 'user';
    this.appointmentForm = this.fb.group({
      pname: ['', Validators.required],
      phone: ['', Validators.required],
      p_age: ['', Validators.required],
      a_date: ['', Validators.required],
      a_time: ['', Validators.required],
      problem: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadSchedules();
  }

  onSubmit(): void {
    debugger
    if (this.appointmentForm.valid) {
      debugger
      this.appointmentService.createAppointment(this.appointmentForm.value).subscribe(
        response => {
          console.log('Appointment created successfully', response);
        },
        error => {
          console.error('Error creating appointment', error);
        }
      );
    }
  }

  loadSchedules(): void {
    debugger
    this.scheduleService.getSchedules().subscribe(
      data => {
        debugger

        this.schedules = data;
      },
      error => {
        console.error('Error fetching schedules', error);
      }
    );
  }
  addToAppointment(schedule: any): void {
    this.selectedSchedule = schedule;
    const dialogRef = this.dialog.open(AddAppointmentDialogComponent, {
      width: '400px',  // Adjust as needed
      height: 'auto',  // Adjust as needed
      data: { schedule },
      position: { top: '-20%', left: '32%' },
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        debugger
        console.log('The dialog was closed with result:', result);
        const appointment = {
          pname: result.pname,
          phone: result.phone,
          p_age: result.p_age,
          a_date: result.a_date,
          a_time: result.a_time,
          problem: result.problem,
          doc_id: this.selectedSchedule.doctor_id._id,
          pat_id: localStorage.getItem('userId')
        }
        this.appointmentService.createAppointment(appointment).subscribe(
          response => {
            debugger
            console.log('Appointment created successfully', response);
            this.router.navigate(['/appointment-list']);
          },
          error => {
            console.error('Error creating appointment', error);
          }
        );
      }
    });
  }
  back(): void {
    this.router.navigate(['/appointment-list']);
  }
}
