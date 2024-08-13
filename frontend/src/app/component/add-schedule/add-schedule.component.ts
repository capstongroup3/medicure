import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ScheduleService } from '../../services/schedule.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-schedule',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-schedule.component.html',
  styleUrl: './add-schedule.component.scss'
})
export class AddScheduleComponent {
  scheduleForm: FormGroup | any;
  errorMessage: string = '';
  constructor(private fb: FormBuilder, private scheduleService: ScheduleService,private router: Router) {
    this.scheduleForm = this.fb.group({
      schedule_date: ['', Validators.required],
      schedule_time: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.scheduleForm.valid) {
      debugger
      this.scheduleForm.doctor_id = localStorage.getItem('userId');
      const scheduleData = {
        doctor_id: localStorage.getItem('userId'),
        schedule_date: this.scheduleForm.value.schedule_date,
        schedule_time: this.convertTimeToString(this.scheduleForm.value.schedule_time)
      };
      this.scheduleService.createSchedule(scheduleData).subscribe(
        response => {
          debugger
          console.log('Schedule created successfully', response);
          this.router.navigate(['schedule-list']);
        },
        error => {
          console.error('Error creating schedule', error);
          this.errorMessage = error.error.error || 'An error occurred while creating the schedule.';
          alert(this.errorMessage); // Display error message in a popup
        }
      );
    }
  }
  convertTimeToString(time: string): string {
    const [hours, minutes] = time.split(':');
    const formattedTime = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    return formattedTime;
  }
  back(): void {
    this.router.navigate(['/schedule-list']);
  }
}
