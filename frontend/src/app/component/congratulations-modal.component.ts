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

  onRestartGame() {
    this.restartGame.emit();
  }
}
