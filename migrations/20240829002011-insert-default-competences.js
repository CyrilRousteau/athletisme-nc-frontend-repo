'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Competences', [
      { nom: 'Competence 1', createdAt: new Date(), updatedAt: new Date() },
      { nom: 'Competence 2', createdAt: new Date(), updatedAt: new Date() },
      { nom: 'Competence 3', createdAt: new Date(), updatedAt: new Date() },
      { nom: 'Competence 4', createdAt: new Date(), updatedAt: new Date() },
      { nom: 'Competence 5', createdAt: new Date(), updatedAt: new Date() },
      { nom: 'Competence 6', createdAt: new Date(), updatedAt: new Date() },
      { nom: 'Competence 7', createdAt: new Date(), updatedAt: new Date() },
      { nom: 'Competence 8', createdAt: new Date(), updatedAt: new Date() }
    ], { ignoreDuplicates: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Competences', null, {});
  }
};