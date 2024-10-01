// routes/ResultatRoutes.js
const express = require('express');
const router = express.Router();
const ResultatController = require('../controllers/ResultatController');

router.post('/resultats', ResultatController.createResultat);

// Nouvelle route pour récupérer les 3 meilleurs résultats
router.get('/resultats/top', ResultatController.getTopResultats);


module.exports = router;
