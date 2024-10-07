import { Component, OnInit } from '@angular/core';
import { InscriptionModalComponent } from '../component/inscription-modal/inscription-modal.component';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { QuizComponent } from '../quizz/quiz.component';
import { ResultatService } from '../score/resultat.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [InscriptionModalComponent, CommonModule, FormsModule, QuizComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  welcomeMessage: string | null = null;
  hidePseudo: boolean = false;
  showQuiz: boolean = false;
  currentGameIndex: number = 0;
  score: number | null = null;
  joueurId: number | null = null;
  numCorrect: number = 0;
  showWarning = false;
  isValidScore = false;
  showStartMessage: boolean = false;
  hidePodium: boolean = false;
  topResultats: any[] = [];


  games: { url: SafeResourceUrl; title: string }[];

  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private resultatService: ResultatService
  ) {
    this.games = [
      { 
        url: this.sanitizer.bypassSecurityTrustResourceUrl('https://lancerdepoids.netlify.app/'),
        title: 'Lancer de poids'
      },
      { 
        url: this.sanitizer.bypassSecurityTrustResourceUrl('https://main--100matheltisme.netlify.app/'),
        title: 'Course du 100 m'
      },
      { 
        url: this.sanitizer.bypassSecurityTrustResourceUrl('https://sautenhauteur.netlify.app/'),
        title: 'Saut à la perche'
      }
    ];
  }

  ngOnInit() {
    this.loadTopResultats();
    this.hidePodium = false;
  }

  onInscriptionSuccess(joueur: any) {
    this.welcomeMessage = `Bonjour <strong>${joueur.pseudo}</strong>  ! Click sur "Jouer" pour commencer une partie.`;
    this.joueurId = joueur.id;
  }

  startGame() {
    this.hidePseudo = true;
    this.currentGameIndex = 0;
    this.showStartMessage = true;
    this.hidePodium = true;
  }

  submitScore() {
    if (this.score !== null && this.joueurId !== null && this.isValidScore) {
      const scoreData = {
        joueur_id: this.joueurId,
        jeu_id: this.currentGameIndex + 1,
        valeur: this.score,
        date: new Date().toISOString()
      };
  
      this.http.post<any>('http://localhost:3001/api/scores', scoreData).subscribe(
        () => {
          this.score = null;
          this.showQuiz = true;  // Le jeu disparaît et le quiz apparaît après soumission du score
          if (this.currentGameIndex === 0) {
            this.showStartMessage = false;
          }
        },
        (error) => {
          console.error('Erreur lors de l\'enregistrement du score:', error);
        }
      );
    }
  }
  
  onQuizCompleted(numCorrect: number): void {
    this.numCorrect = numCorrect;
    this.submitQuizScore();
  }
  
  onReadyForNextGame(): void {
    this.showQuiz = false;  // Masque le quiz et passe au jeu suivant
    this.currentGameIndex++;
    if (this.currentGameIndex >= this.games.length) {
      console.log("Tous les jeux sont terminés.");
    }
  }
  

  submitQuizScore(): void {
    if (this.numCorrect !== null && this.joueurId !== null) {
      const scoreValue = this.numCorrect * 20;
      const scoreData = {
        joueur_id: this.joueurId,
        jeu_id: this.currentGameIndex + 5,
        valeur: scoreValue,
        date: new Date().toISOString()
      };

      this.http.post<any>('http://localhost:3001/api/scores', scoreData).subscribe(
        () => {
          console.log('Score de quiz enregistré avec succès');
        },
        (error) => {
          console.error('Erreur lors de l\'enregistrement du score de quiz:', error);
        }
      );
    }
  }

  loadTopResultats(): void {
    this.resultatService.getTopResultats().subscribe(
      (resultats: any[]) => {
        this.topResultats = resultats;
      },
      (error) => {
        console.error('Erreur lors de la récupération des résultats :', error);
      }
    );
  }

  validateScore() {
    if (this.score !== null) {
      this.isValidScore = this.score >= 0 && this.score <= 100;
      this.showWarning = this.score > 100;
    } else {
      this.isValidScore = false;
      this.showWarning = false;
    }
  }
}