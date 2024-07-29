// controllers/ProfilController.js
const Profil = require('../models/Profil');

exports.createProfil = async (req, res) => {
    try {
        const profil = await Profil.create(req.body);
        res.status(201).json(profil);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getProfils = async (req, res) => {
    try {
        const profils = await Profil.findAll();
        res.status(200).json(profils);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getProfil = async (req, res) => {
    try {
        const profil = await Profil.findByPk(req.params.id);
        if (!profil) {
            return res.status(404).json({ error: 'Profil non trouvé' });
        }
        res.status(200).json(profil);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateProfil = async (req, res) => {
    try {
        const [updated] = await Profil.update(req.body, { where: { id: req.params.id } });
        if (!updated) {
            return res.status(404).json({ error: 'Profil non trouvé' });
        }
        const updatedProfil = await Profil.findByPk(req.params.id);
        res.status(200).json(updatedProfil);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteProfil = async (req, res) => {
    try {
        const deleted = await Profil.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ error: 'Profil non trouvé' });
        }
        res.status(204).json();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
