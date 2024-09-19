import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-congratulations-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal">
      <div class="modal-content">
        <h2>Félicitations, {{ playerName }} !</h2>
        <p>Vous avez obtenu un score total de {{ totalScore }}.</p>
        <button (click)="onRestartGame()">Recommencer à jouer</button>
      </div>
    </div>
  `,
  styles: [`
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .modal-content {
      background: white;
      padding: 20px;
      border-radius: 5px;
      text-align: center;
    }
  `]
})
export class CongratulationsModalComponent {
  @Input() playerName: string = '';
  @Input() totalScore: number = 0;
  @Output() restartGame = new EventEmitter<void>();

  onRestartGame() {
    this.restartGame.emit();
  }
}
