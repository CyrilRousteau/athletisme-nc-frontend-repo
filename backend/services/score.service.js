const Score = require('../models/Score');

const createScore = async (scoreData) => {
  try {
    const score = await Score.create(scoreData);
    return score;
  } catch (error) {
    throw new Error('Erreur lors de la création du score : ' + error.message);
  }
};

const getAllScores = async () => {
  try {
    const scores = await Score.findAll();
    return scores;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des scores : ' + error.message);
  }
};

const getScoreById = async (id) => {
  try {
    const score = await Score.findByPk(id);
    if (!score) {
      throw new Error('Score non trouvé');
    }
    return score;
  } catch (error) {
    throw new Error('Erreur lors de la récupération du score : ' + error.message);
  }
};

const getScoresByPlayerId = async (playerId) => {
  try {
    const scores = await Score.findAll({
      where: { joueur_id: playerId }
    });
    return scores;
  } catch (error) {
    throw new Error(error.message);
  }
};


module.exports = {
  createScore,
  getAllScores,
  getScoreById,
  getScoresByPlayerId
};
