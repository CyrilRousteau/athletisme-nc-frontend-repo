// controllers/ScoreController.js
const Score = require('../models/Score');

exports.createScore = async (req, res) => {
    try {
        const score = await Score.create(req.body);
        res.status(201).json(score);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getScores = async (req, res) => {
    try {
        const scores = await Score.findAll();
        res.status(200).json(scores);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getScore = async (req, res) => {
    try {
        const score = await Score.findByPk(req.params.id);
        if (!score) {
            return res.status(404).json({ error: 'Score non trouvé' });
        }
        res.status(200).json(score);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateScore = async (req, res) => {
    try {
        const [updated] = await Score.update(req.body, { where: { id: req.params.id } });
        if (!updated) {
            return res.status(404).json({ error: 'Score non trouvé' });
        }
        const updatedScore = await Score.findByPk(req.params.id);
        res.status(200).json(updatedScore);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteScore = async (req, res) => {
    try {
        const deleted = await Score.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ error: 'Score non trouvé' });
        }
        res.status(204).json();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
