import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuizService, Quiz, QuizQuestion } from './quiz.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CongratulationsModalComponent } from '../component/congratulations-modal.component';
import { ScoreService } from '../score/score.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule, CongratulationsModalComponent],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  @Input() quizIndex: number = 0;
  @Input() isLastQuiz: boolean = false;
  @Input() joueurId: number | null = null;
  @Output() quizCompleted = new EventEmitter<number>();
  @Output() readyForNextGame = new EventEmitter<void>();

  quiz: Quiz | undefined;
  currentQuestionIndex: number = 0;
  numCorrect: number = 0;
  selectedAnswer: string | undefined = undefined;
  showFeedback: boolean = false;
  showResults: boolean = false;
  showCongratulationsModal: boolean = false;
  playerName: string = '';
  totalScore: number = 0;

  constructor(private quizService: QuizService, private scoreService: ScoreService) { }

  ngOnInit(): void {
    this.loadQuiz();
  }

  ngOnChanges(): void {
    this.loadQuiz();
  }

  private loadQuiz(): void {
    this.quiz = this.quizService.getQuizByIndex(this.quizIndex);
    this.resetQuiz();
  }

  resetQuiz(): void {
    this.currentQuestionIndex = 0;
    this.numCorrect = 0;
    this.selectedAnswer = undefined;
    this.showFeedback = false;
    this.showResults = false;
  }

  selectAnswer(key: string) {
    this.selectedAnswer = key;
  }

  validateAnswer(): void {
    if (this.quiz && this.selectedAnswer) {
      const currentQuestion = this.quiz.questions[this.currentQuestionIndex];
      const isCorrect = this.quizService.checkAnswer(currentQuestion, this.selectedAnswer);

      if (isCorrect) {
        this.numCorrect++;
      }

      this.showFeedback = true;
    }
  }

  nextQuestion(): void {
    if (this.quiz) {
      this.currentQuestionIndex++;
      this.selectedAnswer = undefined;
      this.showFeedback = false;

      if (this.currentQuestionIndex >= this.quiz.questions.length) {
        this.showResults = true;
        this.quizCompleted.emit(this.numCorrect);
      }
    }
  }

  continueToNextGame(): void {
    this.readyForNextGame.emit();
  }

  getProgressBarWidth(): string {
    const progress = ((this.currentQuestionIndex + 1) / this.quiz!.questions.length) * 100;
    return progress + '%';
  }

  isString(value: any): boolean {
    return typeof value === 'string';
  }

  getImageUrl(value: any): string {
    return typeof value === 'object' && value.imageUrl ? value.imageUrl : '';
  }

  restartQuiz(): void {
    this.resetQuiz();
    this.loadQuiz();
  }

  goToNextGame(): void {
    this.quizCompleted.emit(this.numCorrect);
  }

  calculateTotalScore(): void {
    if (this.joueurId !== null) {
      this.scoreService.getScoresByPlayerId(this.joueurId).subscribe(
        (scores: any[]) => {
          this.totalScore = scores.reduce((sum, score) => sum + score.valeur, 0);
        },
        (error: any) => {
          console.error('Erreur lors de la récupération des scores:', error);
        }
      );
    }
  }

  restartGame(): void {
    location.reload();
  }

  viewScores(): void {
    this.calculateTotalScore();
    this.showCongratulationsModal = true;
  }
}