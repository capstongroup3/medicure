import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AssessmentService } from '../../services/assessment.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-assessment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-assessment.component.html',
  styleUrl: './add-assessment.component.scss'
})
export class AddAssessmentComponent {
  anxietyQuestions = [
    "Over the last two weeks, how often have you been bothered by feeling nervous, anxious, or on edge?",
    "Over the last two weeks, how often have you been unable to stop or control worrying?",
    "Over the last two weeks, how often have you been bothered by worrying too much about different things?",
    "Over the last two weeks, how often have you had trouble relaxing?",
    "Over the last two weeks, how often have you been so restless that it is hard to sit still?",
    "Over the last two weeks, how often have you been easily annoyed or irritable?",
    "Over the last two weeks, how often have you felt afraid as if something awful might happen?",
    "Over the last two weeks, how often have you experienced physical symptoms like sweating, trembling, or a racing heart when you are not exerting yourself?",
    "Over the last two weeks, how often have you had trouble sleeping due to anxiety?",
    "Over the last two weeks, how often have you felt tense or 'keyed up'?"
  ];

  anxietyOptions = [
    { value: 1, label: "Not at all" },
    { value: 2, label: "Several days" },
    { value: 3, label: "More than half the days" },
    { value: 4, label: "Nearly every day" }
  ];

  assessmentForm: FormGroup | any;
  errorMessage: string = '';
  total_score: number | any;
  constructor(private fb: FormBuilder, private assessmentService: AssessmentService, private router: Router) {
    this.assessmentForm = this.fb.group({});
    this.anxietyQuestions.forEach((_, index) => {
      this.assessmentForm.addControl(`q${index + 1}_score`, new FormControl('',Validators.required));
    });
    this.assessmentForm.addControl('date', new FormControl(this.getCurrentDate(),Validators.required));
    this.assessmentForm.addControl('time', new FormControl(this.getCurrentTime(),Validators.required));
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.assessmentForm.valid) {
      debugger
      this.calculateTotalScore();
      this.assessmentForm.pat_id = localStorage.getItem('userId');
      console.log('Total Score:', this.total_score);
    console.log('Date:', this.assessmentForm.value.date);
    console.log('Time:', this.assessmentForm.value.time);
      const assessmentData = {
        q1_score: this.assessmentForm.value.q1_score,
        q2_score: this.assessmentForm.value.q2_score,
        q3_score:this.assessmentForm.value.q3_score,
        q4_score: this.assessmentForm.value.q4_score,
        q5_score: this.assessmentForm.value.q5_score,
        q6_score: this.assessmentForm.value.q6_score,
        q7_score: this.assessmentForm.value.q7_score,
        q8_score: this.assessmentForm.value.q8_score,
        q9_score: this.assessmentForm.value.q9_score,
        q10_score: this.assessmentForm.value.q10_score,
        total_score: this.total_score,
        pat_id: localStorage.getItem('userId'),
        date: this.assessmentForm.value.date,
        time: this.assessmentForm.value.time
      };
      this.assessmentService.createAssessment(assessmentData).subscribe(
        response => {
          debugger
          console.log('Assessment Add successfully', response);
          this.router.navigate(['assessment']);
        },
        error => {
          console.error('Error creating assessment', error);
          this.errorMessage = error.error.error || 'An error occurred while adding assessment.';
          alert(this.errorMessage); // Display error message in a popup
        }
      );
    }
  }
  getCurrentDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0]; // YYYY-MM-DD format
  }

  getCurrentTime(): string {
    const today = new Date();
    const hours = today.getHours().toString().padStart(2, '0');
    const minutes = today.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`; // HH:mm format
  }

  calculateTotalScore(): void {
    debugger
    this.total_score = this.anxietyQuestions.reduce((total, _, index) => {
      console.log( total);
      console.log(this.assessmentForm.value[`q${index + 1}_score`]);
      return total + Number(this.assessmentForm.value[`q${index + 1}_score`]);
    }, 0);
  }
  back(): void {
    this.router.navigate(['/assessment']);
  }
}
