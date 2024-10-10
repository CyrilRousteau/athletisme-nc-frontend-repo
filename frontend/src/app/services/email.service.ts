import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor() {
    emailjs.init(environment.emailjs.publicKey);
  }

  sendEmail(templateParams: any) {
    return emailjs.send(
      environment.emailjs.gmailServiceId,
      environment.emailjs.templateId,
      templateParams
    );
  }
}
