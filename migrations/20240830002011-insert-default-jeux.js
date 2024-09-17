'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Récupérez d'abord les IDs des compétences
    const [competences] = await queryInterface.sequelize.query(
      "SELECT id, nom FROM Competences ORDER BY id ASC"
    );

    const competenceMap = competences.reduce((acc, comp) => {
      acc[comp.nom] = comp.id;
      return acc;
    }, {});

    await queryInterface.bulkInsert('Jeux', [
      {
        nom: 'Lancer',
        type_score: 'number',
        competence_id: competenceMap['Competence 1'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nom: 'Saut',
        type_score: 'number',
        competence_id: competenceMap['Competence 2'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nom: 'Vitesse',
        type_score: 'number',
        competence_id: competenceMap['Competence 3'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nom: 'Course',
        type_score: 'number',
        competence_id: competenceMap['Competence 4'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nom: 'Quiz1',
        type_score: 'number',
        competence_id: competenceMap['Competence 5'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nom: 'Quiz2',
        type_score: 'number',
        competence_id: competenceMap['Competence 6'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nom: 'Quiz3',
        type_score: 'number',
        competence_id: competenceMap['Competence 7'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nom: 'Quiz4',
        type_score: 'number',
        competence_id: competenceMap['Competence 8'],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { ignoreDuplicates: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Jeux', null, {});
  }
};