// routes/QuizzScoreRoutes.js
const express = require('express');
const router = express.Router();
const QuizzScoreController = require('../controllers/QuizzScoreController');

router.post('/quizzscores', QuizzScoreController.createQuizzScore);
router.get('/quizzscores', QuizzScoreController.getQuizzScores);
router.get('/quizzscores/:id', QuizzScoreController.getQuizzScore);
router.put('/quizzscores/:id', QuizzScoreController.updateQuizzScore);
router.delete('/quizzscores/:id', QuizzScoreController.deleteQuizzScore);

module.exports = router;
