// controllers/QuizzScoreController.js
const QuizzScore = require('../models/QuizzScore');

exports.createQuizzScore = async (req, res) => {
    try {
        const quizzScore = await QuizzScore.create(req.body);
        res.status(201).json(quizzScore);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getQuizzScores = async (req, res) => {
    try {
        const quizzScores = await QuizzScore.findAll();
        res.status(200).json(quizzScores);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getQuizzScore = async (req, res) => {
    try {
        const quizzScore = await QuizzScore.findByPk(req.params.id);
        if (!quizzScore) {
            return res.status(404).json({ error: 'QuizzScore non trouvé' });
        }
        res.status(200).json(quizzScore);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateQuizzScore = async (req, res) => {
    try {
        const [updated] = await QuizzScore.update(req.body, { where: { id: req.params.id } });
        if (!updated) {
            return res.status(404).json({ error: 'QuizzScore non trouvé' });
        }
        const updatedQuizzScore = await QuizzScore.findByPk(req.params.id);
        res.status(200).json(updatedQuizzScore);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteQuizzScore = async (req, res) => {
    try {
        const deleted = await QuizzScore.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ error: 'QuizzScore non trouvé' });
        }
        res.status(204).json();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
