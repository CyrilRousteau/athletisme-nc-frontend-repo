import { Component, OnInit } from '@angular/core';
import { InscriptionModalComponent } from '../component/inscription-modal/inscription-modal.component';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { QuizComponent } from '../quizz/quiz.component';
import { ScoreService } from '../score/score.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [InscriptionModalComponent, CommonModule, FormsModule, QuizComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  welcomeMessage: string | null = null;
  showGame: boolean = false;
  hidePseudo: boolean = false;
  showSecondGame: boolean = false;
  showThirdGame: boolean = false;
  showFourthGame: boolean = false;
  safeGameUrl: SafeResourceUrl;
  safeSecondGameUrl: SafeResourceUrl;
  safeThirdGameUrl: SafeResourceUrl;
  safeFourthGameUrl: SafeResourceUrl;
  score: number | null = null;
  joueurId: number | null = null;
  numCorrect: number = 0;
  showQuiz: boolean = false;
  currentQuizIndex: number = 0;
  topScores: any[] = [];
  showWarning = false;
  isValidScore = false;

  private gameUrl = 'https://lancerdepoids.netlify.app/';
  private secondGameUrl = 'https://lancerdepoids.netlify.app/'; // Assurez-vous que cette URL est correcte
  private thirdGameUrl = 'https://lancerdepoids.netlify.app/'; // Assurez-vous que cette URL est correcte
  private fourthGameUrl = 'https://lancerdepoids.netlify.app/';
  private gameIds = [1, 2, 3, 4];
  public quizIds = [5, 6, 7, 8];  // Assurez-vous que cette URL est correcte

  constructor(private sanitizer: DomSanitizer, private http: HttpClient, private scoreService: ScoreService) {
    this.safeGameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.gameUrl);
    this.safeSecondGameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.secondGameUrl);
    this.safeThirdGameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.thirdGameUrl);
    this.safeFourthGameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fourthGameUrl);
  }

  ngOnInit() {
    this.loadTopScores();
  }

  onInscriptionSuccess(joueur: any) {
    this.welcomeMessage = `Bonjour ${joueur.pseudo} ! Appuie sur "Jouer" pour commencer une partie.`;
    this.joueurId = joueur.id;
  }

  startGame() {
    this.showGame = true;
    this.hidePseudo = true;
  }

  getJeuId() {
    if (this.showGame || this.showSecondGame || this.showThirdGame || this.showFourthGame) {
      if (this.currentQuizIndex === 0) {
        return this.gameIds[0]; // Jeu 1
      } else if (this.currentQuizIndex === 1) {
        return this.gameIds[1]; // Jeu 2
      } else if (this.currentQuizIndex === 2) {
        return this.gameIds[2]; // Jeu 3
      } else if (this.currentQuizIndex === 3) {
        return this.gameIds[3]; // Jeu 4
      }
    }

    if (this.showQuiz) {
      if (this.currentQuizIndex === 0) {
        return this.quizIds[0];  // ID du premier quiz
      } else if (this.currentQuizIndex === 1) {
        return this.quizIds[1];  // ID du deuxième quiz
      } else if (this.currentQuizIndex === 2) {
        return this.quizIds[2];  // ID du troisième quiz
      } else if (this.currentQuizIndex === 3) {
        return this.quizIds[3];  // ID du quatrième quiz
      }
    }

    return null;
  }

  nextGameOrQuiz(): void {
    if (this.showGame) {
      this.showGame = false;
      this.startQuiz(); // Démarrer le quiz suivant après le jeu
    } else if (this.showQuiz) {
      this.showQuiz = false;
      this.currentQuizIndex++; // Incrémenter l'index du quiz après chaque quiz terminé
      if (this.currentQuizIndex < this.quizIds.length) {
        this.startNextGame(); // Démarrer le prochain jeu après le quiz
      } else {
        console.log("Tous les quiz sont terminés");
      }
    } else if (this.showSecondGame) {
      this.showSecondGame = false;
      this.startQuiz(); // Démarrer le deuxième quiz après le deuxième jeu
    } else if (this.showThirdGame) {
      this.showThirdGame = false;
      this.startQuiz(); // Démarrer le troisième quiz après le troisième jeu
    } else if (this.showFourthGame) {
      this.showFourthGame = false;
      this.startQuiz(); // Démarrer le quatrième quiz après le quatrième jeu
    }
  }

  submitScore() {
    if (this.score !== null && this.joueurId !== null && this.isValidScore) {
      const jeuId = this.getJeuId();
      const scoreData = {
        joueur_id: this.joueurId,
        jeu_id: jeuId,
        valeur: this.score,
        date: new Date().toISOString()
      };

      this.http.post<any>('http://localhost:3001/api/scores', scoreData).subscribe(
        (response: any) => {
          this.score = null; // Réinitialiser le score après la soumission
          this.startQuiz(); // Démarrer le quiz après la soumission du score
        },
        (error: any) => {
          console.error('Erreur lors de l\'enregistrement du score:', error);
        }
      );
    }
  }

  onQuizCompleted(numCorrect: number): void {
    this.numCorrect = numCorrect;  // Met à jour la variable numCorrect avec le score du quiz
    this.submitQuizScore();        // Appelle la méthode pour enregistrer le score        // Passe au jeu ou quiz suivant
  }

  onReadyForNextGame(): void {
    this.nextGameOrQuiz();         // Passe au jeu ou quiz suivant
  }

  submitQuizScore(): void {
    const joueurId = this.joueurId; // Récupère l'ID du joueur
    const jeuId = this.getJeuId();  // Récupère l'ID du jeu (qui peut être un quiz)

    if (this.numCorrect !== null && joueurId !== null) {
      const scoreValue = this.numCorrect * 20; // Multiplie le score par 20
      const scoreData = {
        joueur_id: joueurId,
        jeu_id: jeuId,  // L'ID du quiz dans ta table "jeux"
        valeur: scoreValue,  // Le score est le nombre de réponses correctes multiplié par 20
        date: new Date().toISOString()
      };

      this.http.post<any>('http://localhost:3001/api/scores', scoreData).subscribe(
        (response: any) => {
          console.log('Score de quiz enregistré avec succès:', response);
        },
        (error: any) => {
          console.error('Erreur lors de l\'enregistrement du score de quiz:', error);
        }
      );
    }
  }

  startQuiz(): void {
    this.showQuiz = true;
    this.showGame = false; // Cacher le jeu en cours
  }

  startNextGame(): void {
    if (this.currentQuizIndex === 1) {
      this.showSecondGame = true;
    } else if (this.currentQuizIndex === 2) {
      this.showThirdGame = true;
    } else if (this.currentQuizIndex === 3) {
      this.showFourthGame = true;
    } else {
      console.log("Tous les jeux sont terminés.");
    }
  }

  
  loadTopScores(): void {
    this.scoreService.getAllScores().subscribe(
      (scores: any[]) => {
        this.topScores = scores;
        console.log('Scores récupérés avec joueurs:', this.topScores); // Vérifie que les joueurs sont bien inclus
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des scores:', error);
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
