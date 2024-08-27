import { Component } from '@angular/core';
import { InscriptionModalComponent } from '../component/inscription-modal/inscription-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InscriptionModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  onModalClose() {
    // Logique à exécuter après la fermeture de la modale
    // Par exemple, afficher les jeux
  }

}
