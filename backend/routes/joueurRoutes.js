const express = require('express');
const router = express.Router();
const joueurController = require('../controllers/JoueurController');
const cors = require('cors');

router.post('/joueurs', joueurController.createJoueur);
router.get('/joueurs', joueurController.getAllJoueurs);
router.get('/joueurs/:id', joueurController.getJoueurById);
router.put('/joueurs/:id', joueurController.updateJoueur);
router.delete('/joueurs/:id', joueurController.deleteJoueur);

module.exports = router;
