import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-congratulations-modal',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './congratulations-modal.component.html',
  styleUrls: ['./congratulations-modal.component.css']
})
export class CongratulationsModalComponent {
  @Input() playerName: string = '';
  @Input() totalScore: number = 0;
  @Output() restartGame = new EventEmitter<void>();

  getCongratulationsMessage(): string {
    if (this.totalScore >= 300 && this.totalScore <= 600) {
      return 'Bravo tu es un véritable athlète ! Rejoins nous et adhère à notre ligue.';
    } else if (this.totalScore >= 0 && this.totalScore < 300) {
      return 'Pas mal mais tu peux mieux faire ! As tu besoin d\'entraînement ? Rejoins nous et adhère à notre ligue.';
    } else {
      return '';
    }
  }

  onRestartGame() {
    this.restartGame.emit();
  }
}
