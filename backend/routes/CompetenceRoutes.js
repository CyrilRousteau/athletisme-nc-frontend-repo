// routes/CompetenceRoutes.js
const express = require('express');
const router = express.Router();
const CompetenceController = require('../controllers/CompetenceController');

router.post('/competences', CompetenceController.createCompetence);
router.get('/competences', CompetenceController.getCompetences);
router.get('/competences/:id', CompetenceController.getCompetence);
router.put('/competences/:id', CompetenceController.updateCompetence);
router.delete('/competences/:id', CompetenceController.deleteCompetence);

module.exports = router;
