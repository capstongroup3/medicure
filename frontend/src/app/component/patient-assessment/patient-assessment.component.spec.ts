import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAssessmentComponent } from './patient-assessment.component';

describe('PatientAssessmentComponent', () => {
  let component: PatientAssessmentComponent;
  let fixture: ComponentFixture<PatientAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientAssessmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
