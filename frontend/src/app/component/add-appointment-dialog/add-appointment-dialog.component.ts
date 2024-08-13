import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'app-add-appointment-dialog',
  templateUrl: './add-appointment-dialog.component.html',
  styleUrls: ['./add-appointment-dialog.component.scss']
})
export class AddAppointmentDialogComponent {
  appointmentForm: FormGroup;
  date: any;
  time: any;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddAppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    debugger
    const formattedDate = moment(data.schedule.schedule_date).format('YYYY-MM-DD');
    this.date = data.schedule.schedule_date;
    this.time = data.schedule.schedule_time
    this.appointmentForm = this.fb.group({
      pname: ['', Validators.required],
      phone: ['', Validators.required],
      p_age: ['', Validators.required],
      a_date: [{ value: formattedDate, disabled: true }, Validators.required],
      a_time: [{ value: data.schedule.schedule_time, disabled: true }, Validators.required],
      problem: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      // Logic to handle form submission, e.g., send the data to the backend
      debugger
      console.log('Form Data:', this.appointmentForm.value);
      debugger
      this.appointmentForm.value.a_date = this.date
      this.appointmentForm.value.a_time = this.time
      this.dialogRef.close(this.appointmentForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
