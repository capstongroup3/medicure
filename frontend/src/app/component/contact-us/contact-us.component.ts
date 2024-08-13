import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
  contact = {
    name: '',
    number: '',
    reason: ''
  };

  onSubmit() {
    console.log('Form Submitted', this.contact);
    // You can add more logic here to handle form submission, like sending the data to a backend server.
  }
}
