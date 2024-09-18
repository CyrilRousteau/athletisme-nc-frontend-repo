const scoreService = require('../services/score.service');

const createScore = async (req, res) => {
  try {
    const score = await scoreService.createScore(req.body);
    res.status(201).json(score);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllScores = async (req, res) => {
  try {
    const scores = await scoreService.getAllScores();
    res.status(200).json(scores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getScoreById = async (req, res) => {
  try {
    const score = await scoreService.getScoreById(req.params.id);
    res.status(200).json(score);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getScoresByPlayerId = async (req, res) => {
  try {
    const scores = await scoreService.getScoresByPlayerId(req.params.id);
    res.status(200).json(scores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createScore,
  getAllScores,
  getScoreById,
  getScoresByPlayerId
};
