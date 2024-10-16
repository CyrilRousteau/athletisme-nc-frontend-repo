import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-inscription-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inscription-modal.component.html',
  styleUrls: ['./inscription-modal.component.css']
})
export class InscriptionModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() inscriptionSuccess = new EventEmitter<any>(); // Modifier pour émettre un objet

  showModal = false;
  hideInscriptionButton = false;
  joueur = {
    pseudo: '',
    email: ''
  };

  constructor(private http: HttpClient) { }

  openModal() {
    this.showModal = true;
  }

  closeModalHandler() {
    this.showModal = false;
    this.closeModal.emit();
  }

  isFormValid(): boolean {
    return !!this.joueur.pseudo;
  }


  onSubmit() {
    if (this.isFormValid()) {
      this.http.post(`${environment.apiUrl}/joueurs`, this.joueur)
        .subscribe({
          next: (response: any) => {
            this.closeModalHandler();
            this.inscriptionSuccess.emit(response); // Émettre l'événement avec l'objet joueur
            this.hideInscriptionButton = true;
          },
          error: (error: any) => {
            // Gérer l'erreur (par exemple, afficher un message à l'utilisateur)
          }
        });
    }
  }
}
