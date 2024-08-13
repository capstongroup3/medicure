import { Component } from '@angular/core';



interface Question {
  title: string;
  content: string;
  category: string;
}

@Component({
  selector: 'app-f-aqs',
  templateUrl: './f-aqs.component.html',
  styleUrl: './f-aqs.component.scss'
})
export class FAQsComponent {
  categories: string[] = ['Platform Information and Requirements', 'Data Security and Privacy', 'Customer Support and Feedback'];
  questions: Question[] = [
    { title: 'What is Dr Julian?', content: 'Dr Julian is an online platform that connects patients with therapists for video, audio, and text-based therapy sessions.', category: 'Platform Information and Requirements' },
    { title: 'Is Dr Julian Right for me?', content: 'Dr Julian is suitable for anyone looking for accessible, confidential, and professional therapy from the comfort of their own home.', category: 'Platform Information and Requirements' },
    { title: 'When is Dr Julian NOT right for me?', content: 'Dr Julian may not be suitable for individuals in immediate crisis or those who require intensive, in-person support.', category: 'Platform Information and Requirements' },
    { title: 'What Technology do I need to connect to Dr Julian?', content: 'You need a device with a stable internet connection, a camera, microphone, and a compatible web browser or the Dr Julian app.', category: 'Platform Information and Requirements' },
    { title: 'How do I have my appointment?', content: 'Appointments are conducted via secure video calls, phone calls, or text messaging through the Dr Julian platform.', category: 'Platform Information and Requirements' },
    { title: 'What are the Free Assessments?', content: 'Dr Julian offers free assessments for anxiety, depression, and other mental health conditions to help determine the appropriate level of care.', category: 'Platform Information and Requirements' },
    { title: 'How long is my appointment?', content: 'Appointments typically last between 30 to 60 minutes, depending on the type and nature of the session.', category: 'Platform Information and Requirements' },
    { title: 'What does it Cost?', content: 'The cost of sessions varies based on the type of therapy and the therapist’s qualifications. Prices are displayed during the booking process.', category: 'Platform Information and Requirements' },
    { title: 'When do I pay for my Appointment?', content: 'Payment is required at the time of booking your appointment through the Dr Julian platform.', category: 'Platform Information and Requirements' },

    { title: 'How and where is my data stored?', content: 'Your data is stored securely on encrypted servers located in data centers that comply with industry standards for security and privacy.', category: 'Data Security and Privacy' },
    { title: 'How secure is my data when being transferred between my device and the Dr Julian platform?', content: 'Data transferred between your device and the Dr Julian platform is encrypted using SSL/TLS protocols to ensure secure communication.', category: 'Data Security and Privacy' },
    { title: 'How do I manage my notification settings for security and privacy?', content: 'You can manage your notification settings by accessing your account settings on the Dr Julian platform, where you can customize your preferences for email and SMS notifications.', category: 'Data Security and Privacy' },
    { title: 'What happens if there is a data security breach?', content: 'In the event of a data security breach, Dr Julian has protocols in place to quickly respond, mitigate any risks, and notify affected users as required by law.', category: 'Data Security and Privacy' },
    { title: 'Does Dr Julian sell or share its information with third parties?', content: 'Dr Julian does not sell or share your personal information with third parties without your explicit consent, except as required by law.', category: 'Data Security and Privacy' },
  
    { title: 'How to Contact Us?', content: 'You can contact us through the support page on our website, by email at support@drjulian.com, or by calling our customer service hotline.', category: 'Customer Support and Feedback' },
    { title: 'What if I am not happy with my first appointment?', content: 'If you are not satisfied with your first appointment, you can provide feedback through the platform, and we will work to address your concerns and find a suitable solution.', category: 'Customer Support and Feedback' },
    { title: 'What do I do if I am unhappy with the service I have received?', content: 'If you are unhappy with the service, please contact our support team to discuss your issues, and we will strive to resolve them to your satisfaction.', category: 'Customer Support and Feedback' },
    { title: 'Can I use this service even if I am not based in the UK?', content: 'Yes, Dr Julian services are available to users outside the UK, but please check for any regional restrictions or limitations.', category: 'Customer Support and Feedback' },
    { title: 'How old do you need to be to have therapy with Dr Julian?', content: 'You need to be at least 18 years old to use Dr Julian’s therapy services.', category: 'Customer Support and Feedback' },
    { title: 'What payment methods do you accept?', content: 'We accept various payment methods including credit/debit cards, PayPal, and other online payment options.', category: 'Customer Support and Feedback' },
    { title: 'What happens if my appointment over-runs?', content: 'If your appointment overruns, you may be charged for the additional time, depending on the therapist’s policy. Please discuss this with your therapist beforehand.', category: 'Customer Support and Feedback' }
  
  ];

  filteredQuestions: Question[] = [];
  selectedCategory: string = 'All';

  ngOnInit(): void {
    this.filteredQuestions = this.questions;
  }

  filterQuestions(category: string): void {
    this.selectedCategory = category;
    if (category === 'All') {
      this.filteredQuestions = this.questions;
    } else {
      this.filteredQuestions = this.questions.filter(q => q.category === category);
    }
  }
}