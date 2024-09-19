const express = require('express');
const router = express.Router();
const ScoreController = require('../controllers/ScoreController');

router.post('/scores', ScoreController.createScore);
router.get('/scores', ScoreController.getAllScores);
router.get('/scores/top', ScoreController.getTopScores);
router.get('/scores/:id', ScoreController.getScoreById);
router.get('/scores/player/:id', ScoreController.getScoresByPlayerId);
//router.put('/scores/:id', ScoreController.updateScore);
//router.delete('/scores/:id', ScoreController.deleteScore);


module.exports = router;
