import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuizService, Quiz, QuizQuestion } from './quiz.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CongratulationsModalComponent } from '../component/congratulations-modal.component';
import { ScoreService } from '../services/score.service';
import { JoueurService } from '../services/joueur.service';
import { ResultatService } from '../services/resultat.service';

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
  currentGameIndex: number = 0;
  showQuiz: boolean = false;

  constructor(private quizService: QuizService, private scoreService: ScoreService, private joueurService: JoueurService, private resultatService: ResultatService) { }

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
    
    // Valider automatiquement dès qu'une réponse est sélectionnée
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

  async calculateTotalScore(): Promise<void> {
    if (this.joueurId !== null) {  // Vérifier que joueurId n'est pas null
      return new Promise((resolve, reject) => {
        this.scoreService.getScoresByPlayerId(this.joueurId as number).subscribe(  // Utilisation de 'as number'
          (scores: any[]) => {
            this.totalScore = scores.reduce((sum, score) => sum + score.valeur, 0);
            resolve();
          },
          (error: any) => {
            console.error('Erreur lors de la récupération des scores:', error);
            reject(error);
          }
        );
      });
    } else {
      console.error('joueurId is null');
      return Promise.reject('joueurId is null');
    }
  }
  
  async getPlayerName(): Promise<void> {
    if (this.joueurId !== null) {  // Vérification que joueurId n'est pas null
      return new Promise((resolve, reject) => {
        this.joueurService.getJoueurById(this.joueurId as number).subscribe(  // Utilisation de 'as number'
          (joueur: any) => {
            this.playerName = joueur.pseudo;
            resolve();
          },
          (error: any) => {
            console.error('Erreur lors de la récupération du pseudo:', error);
            reject(error);
          }
        );
      });
    } else {
      console.error('joueurId is null');
      return Promise.reject('joueurId is null');
    }
  }
  
  

  restartGame(): void {
    location.reload();
  }


  async viewScores(): Promise<void> {
    if (this.joueurId === null) {
      console.error('joueurId is null');
      return;
    }
  
    try {
      await this.calculateTotalScore();
      await this.getPlayerName();
      this.showCongratulationsModal = true;
      await this.persistResult();
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  }
  
  

  async persistResult(): Promise<void> {
    
    if (!this.playerName || typeof this.playerName !== 'string' || this.playerName.trim() === '') {
      console.error('Invalid player name');
      return;
    }
    
    if (typeof this.totalScore !== 'number' || isNaN(this.totalScore)) {
      console.error('Invalid total score');
      return;
    }
  
    try {
      const response = await this.resultatService.createResultat(this.playerName, this.totalScore).toPromise();
    } catch (error) {
      console.error('Erreur lors de la persistance du résultat', error);
    }
  }
  
}