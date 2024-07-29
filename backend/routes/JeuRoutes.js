// routes/JeuRoutes.js
const express = require('express');
const router = express.Router();
const JeuController = require('../controllers/JeuController');

router.post('/jeux', JeuController.createJeu);
router.get('/jeux', JeuController.getJeux);
router.get('/jeux/:id', JeuController.getJeu);
router.put('/jeux/:id', JeuController.updateJeu);
router.delete('/jeux/:id', JeuController.deleteJeu);

module.exports = router;
