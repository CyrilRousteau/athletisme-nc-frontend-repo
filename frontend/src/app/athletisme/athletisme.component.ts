import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-athletisme',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './athletisme.component.html',
  styleUrls: ['./athletisme.component.css']
})
export class AthletismeComponent {
  form = {
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    club: '',
    licence: ''
  };

  clubEmails: { [key: string]: string } = {
    "ASPTT Nouvelle-Calédonie": "asptt.athle.raids@gmail.com",
    "Olympique de Nouméa section athlé": "olympiquenoumeatri@gmail.com",
    "JS-Vallée du Tir": "sergeletocart56@gmail.com",
    "Club Athlétique Jules Garnier": "ericreuillard80@gmail.com",
    "AS Rivière Salée": "peuchristelle1304@gmail.com",
    "Athletic club espoir de Boulari": "club.aceb@gmail.com"
  };

  constructor(private emailService: EmailService) {}

  onSubmit() {
    const clubEmail = this.clubEmails[this.form.club as keyof typeof this.clubEmails];
  if (!clubEmail) {
    alert('Erreur : Adresse email du club non trouvée.');
    return;
  }

    const templateParams = {
      to_email: clubEmail,
      subject: "Nouvelle demande d'adhésion",
      nom: this.form.nom,
      prenom: this.form.prenom,
      email: this.form.email,
      telephone: this.form.telephone,
      club: this.form.club,
      licence: this.form.licence || 'Aucune licence'
    };

    this.emailService.sendEmail(templateParams)
      .then((response) => {
        console.log('Email envoyé avec succès!', response);
        alert(`Votre demande d'adhésion a été envoyée avec succès au club ${this.form.club}!`);
        this.resetForm();
      }, (error) => {
        console.error(`Erreur lors de l'envoi de l'email:`, error);
        alert("Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer.");
      });
  }

  resetForm() {
    this.form = {
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      club: '',
      licence: ''
    };
  }
}