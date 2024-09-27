import { Injectable } from '@angular/core';

export interface Answer {
    text?: string;
    imageUrl?: string;
  }
  
  export interface QuizQuestion {
    question: string;
    answers: { [key: string]: string | Answer };
    correctAnswer: string;
    imageUrl: string;
  }
  
  export interface Quiz {
    title: string;
    questions: QuizQuestion[];
  }

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private quizzes: Quiz[] = [
    {
      title: 'Quiz Jeux Olympiques',
      questions: [
        {
          question: "Quelle est la date de création des JO internationaux tels qu’on les connaît ?",
          answers: {
            1: "776 av. JC",
            2: "1767",
            3: "1896"
        },
          correctAnswer: "3",
          imageUrl: "assets/img/1896.png"
        },
        {
            question: "Dans combien de villes passe la flamme olympique ?",
            answers: {
                1: "400",
                2: "150",
                3: "470"
            },
            correctAnswer: "1",
            imageUrl: "assets/img/flamme.png"
          },
          {
            question: "combien de disciplines aux jo 2024 ?",
            answers: {
                1: "32",
                2: "28",
                3: "43"
            },
            correctAnswer: "1",
            imageUrl: "assets/img/jeux.png"
        },
        {
            question: "Aux JO 2024, quel pays a remporté le plus de médailles d’or au 100m haie ?",
            answers: {
                1: "Jamaïque",
                2: "France",
                3: "USA"
            },
            correctAnswer: "3",
            imageUrl: "assets/img/100mhaie.png"
        },
        {
            question: "Quelles sont les valeurs des JO ?",
            answers: {
                1: "L’intégrité, la passion et la solidarité",
                2: "L’excellence, le respect et l'amitié",
                3: "Le plaisir, l’engagement et la tolérance"
            },
            correctAnswer: "2",
            imageUrl: "assets/img/valeurs.png"
        },
      ]
    },
    {
      title: 'Quiz Sports',
      questions: [
        {
            question: "Quelle est la hauteur du record du monde de saut à la perche ?",
            answers: {
                1: "6,17 m",
                2: "6,24 m",
                3: "6, 30 m"
            },
            correctAnswer: "2",
            imageUrl: "assets/img/saut_perche.png"
        },
        {
            question: "Combien d'années consécutives Usain Bolt est resté le détenteur du record de 100m ?",
            answers: {
                1: "9",
                2: "10",
                3: "11"
            },
            correctAnswer: "1",
            imageUrl: "assets/img/usain_bolt.png"
        },
        {
            question: "De manière générale combien de haie il y a sur un 100m ?",
            answers: {
                1: "8",
                2: "10",
                3: "14"
            },
            correctAnswer: "2",
            imageUrl: "assets/img/haie.png"
        },
        {
            question: "Quel pays a le plus grand palmarès en lancer de poids chez les hommes ?",
            answers: {
                1: "Allemagne",
                2: "Pologne",
                3: "États-Unis"
            },
            correctAnswer: "3",
            imageUrl: "assets/img/poids.png"
        },
        {
            question: "Combien de tentatives ont les lanceurs de javelots pour faire le meilleur lancer ?",
            answers: {
                1: "3",
                2: "6",
                3: "9"
            },
            correctAnswer: "2",
            imageUrl: "assets/img/javelot.png"
        }
      ]
    },
    {
      title: 'Quiz Jeux Paralympique',
      questions: [
          {
              question: "Quel jeu paralympique n’a pas son équivalent aux jeux olympiques ?",
              answers: {
                  1: "L’aviron",
                  2: "Boccia",
                  3: "Hockey sur gazon"
              },
              correctAnswer: "2",
              imageUrl: "assets/img/boccia.png"
          },
          {
              question: "Quelles sont les dernières disciplines à avoir été intégrées au paralympique ?",
              answers: {
                  1: "Surf, escalade sportive, skateboard, breakdance",
                  2: "Escrime en fauteuille roulant, judo, natation, équitation",
                  3: "Tennis de table, voile, aviron, haltérophilie "
              },
              correctAnswer: "1",
              imageUrl: "assets/img/nouveau_sport.png"
          },
          {
              question: "Quelle est la devise du paralympisme ?",
              answers: {
                  1: "Cituis, Altuis, Fortuis",
                  2: "Construisons l’excellence à partir de nos différences ",
                  3: "Spirit in motion"
              },
              correctAnswer: "3",
              imageUrl: "assets/img/devise.png"
          },
          {
              question: "En quelle année les jeux paralympiques ont-ils été inventés ?",
              answers: {
                  1: "1896",
                  2: "1932",
                  3: "1960"
              },
              correctAnswer: "3",
              imageUrl: "assets/img/devise.png"
          },
          {
            question: "Quel athlete calédonien est qualifié aux JO paralympiques ?",
            answers: {
                1: "Nicolas Brignone",
                2: "Pierre Fairbank",
                3: "Thierry Cibone"
            },
            correctAnswer: "2",
            imageUrl: "assets/img/pfairbank.png"
          }    
      ]
    },
  ];

  getQuizzes(): Quiz[] {
    return this.quizzes;
  }

  getQuizByIndex(index: number): Quiz | undefined {
    return this.quizzes[index];
  }

  checkAnswer(question: QuizQuestion, userAnswer: string): boolean {
    return userAnswer === question.correctAnswer;
  }
}
