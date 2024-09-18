'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Joueurs', 'date_naissance');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('Joueurs', 'date_naissance', {
      type: Sequelize.DATE,
      allowNull: false
    });
  }
};
