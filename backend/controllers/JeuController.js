// controllers/JeuController.js
const Jeu = require('../models/Jeu');

exports.createJeu = async (req, res) => {
    try {
        const jeu = await Jeu.create(req.body);
        res.status(201).json(jeu);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getJeux = async (req, res) => {
    try {
        const jeux = await Jeu.findAll();
        res.status(200).json(jeux);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getJeu = async (req, res) => {
    try {
        const jeu = await Jeu.findByPk(req.params.id);
        if (!jeu) {
            return res.status(404).json({ error: 'Jeu non trouvé' });
        }
        res.status(200).json(jeu);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateJeu = async (req, res) => {
    try {
        const [updated] = await Jeu.update(req.body, { where: { id: req.params.id } });
        if (!updated) {
            return res.status(404).json({ error: 'Jeu non trouvé' });
        }
        const updatedJeu = await Jeu.findByPk(req.params.id);
        res.status(200).json(updatedJeu);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteJeu = async (req, res) => {
    try {
        const deleted = await Jeu.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ error: 'Jeu non trouvé' });
        }
        res.status(204).json();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
