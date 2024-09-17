
const Jeux = require('../models/Jeux');

exports.createJeux = async (req, res) => {
    try {
        const jeux = await Jeux.create(req.body);
        res.status(201).json(jeux);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getJeux = async (req, res) => {
    try {
        const jeux = await Jeux.findAll();
        res.status(200).json(jeux);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getJeuxById = async (req, res) => {
    try {
        const jeux = await Jeux.findByPk(req.params.id);
        if (!jeux) {
            return res.status(404).json({ error: 'Jeux non trouvé' });
        }
        res.status(200).json(jeux);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateJeux = async (req, res) => {
    try {
        const [updated] = await Jeux.update(req.body, { where: { id: req.params.id } });
        if (!updated) {
            return res.status(404).json({ error: 'Jeux non trouvé' });
        }
        const updatedJeux = await Jeux.findByPk(req.params.id);
        res.status(200).json(updatedJeux);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteJeux = async (req, res) => {
    try {
        const deleted = await Jeux.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ error: 'Jeux non trouvé' });
        }
        res.status(204).json();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
