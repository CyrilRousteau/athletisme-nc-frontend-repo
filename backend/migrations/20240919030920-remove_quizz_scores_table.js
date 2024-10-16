module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('QuizzScores');
  },
  down: async (queryInterface, Sequelize) => {
    // Vous pouvez recréer la table dans la méthode down si vous souhaitez un retour en arrière
    await queryInterface.createTable('QuizzScores', {
      joueur_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      jeu_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      }
    });
  }
};
