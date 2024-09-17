'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    console.log('Executing migration to remove date_naissance column...');
    await queryInterface.removeColumn('Joueurs', 'date_naissance');
    console.log('date_naissance column removed successfully.');
  },

  async down (queryInterface, Sequelize) {
    console.log('Reverting migration to add date_naissance column...');
    await queryInterface.addColumn('Joueurs', 'date_naissance', {
      type: Sequelize.DATE,
      allowNull: false
    });
    console.log('date_naissance column added successfully.');
  }
};
