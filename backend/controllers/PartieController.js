// controllers/PartieController.js
const Partie = require('../models/Partie');

exports.createPartie = async (req, res) => {
    try {
        const partie = await Partie.create(req.body);
        res.status(201).json(partie);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getParties = async (req, res) => {
    try {
        const parties = await Partie.findAll();
        res.status(200).json(parties);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getPartie = async (req, res) => {
    try {
        const partie = await Partie.findByPk(req.params.id);
        if (!partie) {
            return res.status(404).json({ error: 'Partie non trouvée' });
        }
        res.status(200).json
        (partie);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.updatePartie = async (req, res) => {
    try {
        const [updated] = await Partie.update(req.body, { where: { id: req.params.id } });
        if (!updated) {
            return res.status(404).json({ error: 'Partie non trouvée' });
        }
        const updatedPartie = await Partie.findByPk(req.params.id);
        res.status(200).json(updatedPartie);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deletePartie = async (req, res) => {
    try {
        const deleted = await Partie.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ error: 'Partie non trouvée' });
        }
        res.status(204).json();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
