// controllers/joueur.controller.js
const express = require('express');
const router = express.Router();
const joueurService = require('../services/joueur.service');

router.post('/register', async (req, res) => {
    try {
        const joueur = await joueurService.createJoueur(req.body);
        res.status(201).json(joueur);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const joueurs = await joueurService.getAllJoueurs();
        res.status(200).json(joueurs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const joueur = await joueurService.getJoueurById(req.params.id);
        res.status(200).json(joueur);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const joueur = await joueurService.updateJoueur(req.params.id, req.body);
        res.status(200).json(joueur);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await joueurService.deleteJoueur(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
