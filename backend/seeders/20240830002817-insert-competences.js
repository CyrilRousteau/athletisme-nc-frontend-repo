'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Competences', [
      { nom: 'Compétence_1', createdAt: new Date(), updatedAt: new Date() },
      { nom: 'Compétence_2', createdAt: new Date(), updatedAt: new Date() },
      { nom: 'Compétence_3', createdAt: new Date(), updatedAt: new Date() },
      { nom: 'Compétence_4', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Competences', null, {});
  }
};
