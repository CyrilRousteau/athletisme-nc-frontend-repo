import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuizService, Quiz, QuizQuestion } from './quiz.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  @Input() quizIndex: number = 0;
  @Output() quizCompleted = new EventEmitter<number>();  // Émet le score à la fin

  quiz: Quiz | undefined;
  currentQuestionIndex: number = 0;
  numCorrect: number = 0;
  selectedAnswer: string | undefined = undefined;
  showFeedback: boolean = false;
  showResults: boolean = false;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    console.log("Chargement du quiz avec l'index", this.quizIndex);
    this.quiz = this.quizService.getQuizByIndex(this.quizIndex);
  }

  ngOnChanges(): void {
    this.loadQuiz();
  }

  private loadQuiz(): void {
    this.quiz = this.quizService.getQuizByIndex(this.quizIndex);
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
      const selectedAnswer = currentQuestion.answers[this.selectedAnswer];
      
      // Vérifiez si la réponse sélectionnée est correcte en utilisant le service
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
    if (this.currentQuestionIndex >= this.quiz!.questions.length) {
      this.showResults = true;
      this.quizCompleted.emit(this.numCorrect);  // Émet le score une fois le quiz terminé
    }
  }
  }

  showResultsScreen(): void {
    this.showResults = true;
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
}
