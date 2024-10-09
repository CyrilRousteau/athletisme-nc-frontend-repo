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
            question: "Quel est le nombre de disciplines aux JO 2024 ?",
            answers: {
                1: "32",
                2: "28",
                3: "43"
            },
            correctAnswer: "1",
            imageUrl: "assets/img/jeux.png"
        },
        {
            question: "Aux JO 2024, quel pays a remporté le plus de médailles d’or au 110m haies ?",
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
            question: "Combien d’année consécutives Usain Bolt est-il resté le détenteur du record du 100m ?",
            answers: {
                1: "9 ans",
                2: "10 ans",
                3: "11 ans"
            },
            correctAnswer: "1",
            imageUrl: "assets/img/usain_bolt.png"
        },
        {
            question: "De manière générale, combien de haies y a-t-il sur le 110m ?",
            answers: {
                1: "8 haies",
                2: "10 haies",
                3: "14 haies"
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
            question: "Combien de tentatives ont les lanceurs pour faire leur meilleur lancer ?",
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
      title: 'Quiz Jeux Paralympiques',
      questions: [
          {
              question: "Quel jeu paralympique n’a pas son équivalent aux jeux olympiques ?",
              answers: {
                  1: "L’aviron",
                  2: "La boccia",
                  3: "Le hockey sur gazon"
              },
              correctAnswer: "2",
              imageUrl: "assets/img/boccia.png"
          },
          {
              question: "Les athlètes sourd concourent à quels jeux ?",
              answers: {
                  1: "Les jeux olympiques",
                  2: "Les jeux paraympiques",
                  3: "Les jeux deaflympics"
              },
              correctAnswer: "3",
              imageUrl: "assets/img/deaflympics.png"
          },
          {
              question: "Quelle est la devise du paralympisme ?",
              answers: {
                  1: "Citius, Altius, Fortius",
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
              imageUrl: "assets/img/para1960.png"
          },
          {
            question: "Quel athlète calédonien s’est qualifié aux jeux paralympiques ?",
            answers: {
                1: "Nicolas BRIGNONE",
                2: "Pierre FAIRBANK",
                3: "Thierry CIBONE"
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
