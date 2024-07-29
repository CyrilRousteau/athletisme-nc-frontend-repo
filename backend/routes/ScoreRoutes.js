// routes/ScoreRoutes.js
const express = require('express');
const router = express.Router();
const ScoreController = require('../controllers/ScoreController');

router.post('/scores', ScoreController.createScore);
router.get('/scores', ScoreController.getScores);
router.get('/scores/:id', ScoreController.getScore);
router.put('/scores/:id', ScoreController.updateScore);
router.delete('/scores/:id', ScoreController.deleteScore);

module.exports = router;
