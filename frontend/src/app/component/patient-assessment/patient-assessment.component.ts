import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AssessmentService } from '../../services/assessment.service';

@Component({
  selector: 'app-patient-assessment',
  templateUrl: './patient-assessment.component.html',
  styleUrl: './patient-assessment.component.scss'
})
export class PatientAssessmentComponent {
  assessments: any[] = [];
  userType: string | undefined;
  constructor(private assessmentService: AssessmentService,
    private router: Router
  ) {
    this.userType = localStorage.getItem('userType') == 'doctor' ? 'doctor' : 'user';
  }
  ngOnInit(): void {
    
    this.getAppointments();
  }
  getAppointments(): void {
    this.assessmentService.getAssessment().subscribe(
      (data: any[]) => {
        this.assessments = data;
      },
      error => {
        console.error('Error fetching appointment data:', error);
      }
    );
  }
  navigateToAddAssessment(): void {
    this.router.navigate(['/add-assessment']);
  }
}
