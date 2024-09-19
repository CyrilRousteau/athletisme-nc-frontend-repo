const joueurService = require('../services/joueur.service');

const createJoueur = async (req, res) => {
    try {
        const joueur = await joueurService.createJoueur(req.body);
        res.status(201).json(joueur);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllJoueurs = async (req, res) => {
    try {
        const joueurs = await joueurService.getAllJoueurs();
        res.status(200).json(joueurs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getJoueurById = async (req, res) => {
    try {
        const joueur = await joueurService.getJoueurById(req.params.id);
        res.status(200).json(joueur);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const updateJoueur = async (req, res) => {
    try {
        const joueur = await joueurService.updateJoueur(req.params.id, req.body);
        res.status(200).json(joueur);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteJoueur = async (req, res) => {
    try {
        await joueurService.deleteJoueur(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createJoueur,
    getAllJoueurs,
    getJoueurById,
    updateJoueur,
    deleteJoueur
};
