const express = require('express');
const router = express.Router();
const JoueurController = require('../controllers/JoueurController');
const cors = require('cors');

router.post('/joueurs', JoueurController.createJoueur);
router.get('/joueurs', JoueurController.getAllJoueurs);
router.get('/joueurs/:id', JoueurController.getJoueurById);
router.put('/joueurs/:id', JoueurController.updateJoueur);
router.delete('/joueurs/:id', JoueurController.deleteJoueur);

module.exports = router;
