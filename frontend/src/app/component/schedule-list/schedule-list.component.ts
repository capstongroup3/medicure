import { Component } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrl: './schedule-list.component.scss'
})
export class ScheduleListComponent {

  schedules: any[] = [];
  userType: string;

  constructor(private scheduleService: ScheduleService,private router: Router) {
    this.userType = localStorage.getItem('userType') == 'doctor' ? 'doctor' : 'user';
  }

  ngOnInit(): void {
    this.loadSchedules();
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
  navigateToAddSchedule(): void {
    this.router.navigate(['/add-schedule']);
  }
}
