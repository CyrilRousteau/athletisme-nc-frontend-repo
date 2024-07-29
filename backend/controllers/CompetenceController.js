// controllers/CompetenceController.js
const Competence = require('../models/Competence');

exports.createCompetence = async (req, res) => {
    try {
        const competence = await Competence.create(req.body);
        res.status(201).json(competence);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getCompetences = async (req, res) => {
    try {
        const competences = await Competence.findAll();
        res.status(200).json(competences);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getCompetence = async (req, res) => {
    try {
        const competence = await Competence.findByPk(req.params.id);
        if (!competence) {
            return res.status(404).json({ error: 'Compétence non trouvée' });
        }
        res.status(200).json(competence);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateCompetence = async (req, res) => {
    try {
        const [updated] = await Competence.update(req.body, { where: { id: req.params.id } });
        if (!updated) {
            return res.status(404).json({ error: 'Compétence non trouvée' });
        }
        const updatedCompetence = await Competence.findByPk(req.params.id);
        res.status(200).json(updatedCompetence);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteCompetence = async (req, res) => {
    try {
        const deleted = await Competence.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ error: 'Compétence non trouvée' });
        }
        res.status(204).json();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
