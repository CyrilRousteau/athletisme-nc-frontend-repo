/*const QuizzScore = require('../models/QuizzScore');

const createQuizzScore = async (quizzScoreData) => {
  try {
    const quizzScore = await QuizzScore.create(quizzScoreData);
    return quizzScore;
  } catch (error) {
    throw new Error('Erreur lors de la création du score : ' + error.message);
  }
};

const getAllQuizzScores = async () => {
  try {
    const quizzScores = await QuizzScore.findAll();
    return quizzScores;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des scores : ' + error.message);
  }
};

const getQuizzScoreById = async (id) => {
  try {
    const quizzScore = await QuizzScore.findByPk(id);
    if (!quizzScore) {
      throw new Error('Score non trouvé');
    }
    return quizzScore;
  } catch (error) {
    throw new Error('Erreur lors de la récupération du score : ' + error.message);
  }
};

module.exports = {
  createQuizzScore,
  getAllQuizzScores,
  getQuizzScoreById
};
*/