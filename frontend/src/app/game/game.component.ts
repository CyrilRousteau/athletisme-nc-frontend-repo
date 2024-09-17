import { Component, OnInit } from '@angular/core';
import { InscriptionModalComponent } from '../component/inscription-modal/inscription-modal.component';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { QuizComponent } from '../quizz/quiz.component';

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

  private gameUrl = 'https://lancerdepoids.netlify.app/';
  private secondGameUrl = 'https://lancerdepoids.netlify.app/'; // Assurez-vous que cette URL est correcte
  private thirdGameUrl = 'https://lancerdepoids.netlify.app/'; // Assurez-vous que cette URL est correcte
  private fourthGameUrl = 'https://lancerdepoids.netlify.app/';
  private gameIds = [1, 2, 3, 4];
  private quizIds = [5, 6, 7, 8];  // Assurez-vous que cette URL est correcte

  constructor(private sanitizer: DomSanitizer, private http: HttpClient) {
    this.safeGameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.gameUrl);
    this.safeSecondGameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.secondGameUrl);
    this.safeThirdGameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.thirdGameUrl);
    this.safeFourthGameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fourthGameUrl);
  }

  ngOnInit() {
    // Initialisation si nécessaire
  }

  onInscriptionSuccess(joueur: any) {
    console.log('Joueur inscrit:', joueur); // Ajoutez ce log pour vérifier la structure de l'objet joueur
    this.welcomeMessage = `Bonjour ${joueur.pseudo} ! Appuie sur "Jouer" pour commencer une partie.`;
    this.joueurId = joueur.id; // Assurez-vous que joueur contient l'identifiant du joueur
  }


  startGame() {
    this.showGame = true;
    this.hidePseudo = true;
    console.log('Le jeu va se lancer...');
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
    console.log("nextGameOrQuiz appelé");
    console.log("currentQuizIndex:", this.currentQuizIndex);
  
    if (this.showGame) {
      console.log("Le jeu est en cours, on va lancer le quiz");
      this.showGame = false;
      this.startQuiz(); // Démarrer le quiz suivant après le jeu
    } else if (this.showQuiz) {
      console.log("Le quiz est en cours, on va passer au jeu suivant");
      this.showQuiz = false;
      this.currentQuizIndex++; // Incrémenter l'index du quiz après chaque quiz terminé
      console.log("currentQuizIndex après incrémentation:", this.currentQuizIndex);
  
      if (this.currentQuizIndex < this.quizIds.length) {
        this.startNextGame(); // Démarrer le prochain jeu après le quiz
      } else {
        console.log("Tous les quiz sont terminés");
      }
    } else if (this.showSecondGame) {
      console.log("Le deuxième jeu est en cours, on va lancer le deuxième quiz");
      this.showSecondGame = false;
      this.startQuiz(); // Démarrer le deuxième quiz après le deuxième jeu
    } else if (this.showThirdGame) {
      console.log("Le troisième jeu est en cours, on va lancer le troisième quiz");
      this.showThirdGame = false;
      this.startQuiz(); // Démarrer le troisième quiz après le troisième jeu
    } else if (this.showFourthGame) {
      console.log("Le quatrième jeu est en cours, on va lancer le quatrième quiz");
      this.showFourthGame = false;
      this.startQuiz(); // Démarrer le quatrième quiz après le quatrième jeu
    }
  }
  
  
  

submitScore() {
  if (this.score !== null && this.joueurId !== null) {
    const jeuId = this.getJeuId();
    const scoreData = {
      joueur_id: this.joueurId,
      jeu_id: jeuId,
      valeur: this.score,
      date: new Date().toISOString()
    };

    console.log('Données envoyées:', scoreData);

    this.http.post<any>('http://localhost:3001/api/scores', scoreData).subscribe(
      (response: any) => {
        console.log('Score enregistré:', response);
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
  this.submitQuizScore();        // Appelle la méthode pour enregistrer le score
  this.nextGameOrQuiz();         // Passe au jeu ou quiz suivant
}

submitQuizScore(): void {
  const joueurId = this.joueurId; // Récupère l'ID du joueur
  const jeuId = this.getJeuId();  // Récupère l'ID du jeu (qui peut être un quiz)
  
  if (this.numCorrect !== null && joueurId !== null) {
    const scoreData = {
      joueur_id: joueurId,
      jeu_id: jeuId,  // L'ID du quiz dans ta table "jeux"
      valeur: this.numCorrect,  // Le score est le nombre de réponses correctes
      date: new Date().toISOString()
    };

    console.log('Envoi des données de score pour le quiz:', scoreData);

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
  console.log("Démarrage du quiz avec l'index", this.currentQuizIndex);
  this.showQuiz = true;
  this.showGame = false; // Cacher le jeu en cours
  // Ne réinitialise pas currentQuizIndex ici
}



startNextGame(): void {
  console.log("Démarrage du jeu après le quiz avec currentQuizIndex:", this.currentQuizIndex);

  if (this.currentQuizIndex === 1) {
    console.log("Affichage du deuxième jeu");
    this.showSecondGame = true;
  } else if (this.currentQuizIndex === 2) {
    console.log("Affichage du troisième jeu");
    this.showThirdGame = true;
  } else if (this.currentQuizIndex === 3) {
    console.log("Affichage du quatrième jeu");
    this.showFourthGame = true;
  } else {
    console.log("Tous les jeux sont terminés.");
  }
}


}
