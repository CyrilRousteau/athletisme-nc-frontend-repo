// routes/PartieRoutes.js
const express = require('express');
const router = express.Router();
const PartieController = require('../controllers/PartieController');

router.post('/parties', PartieController.createPartie);
router.get('/parties', PartieController.getParties);
router.get('/parties/:id', PartieController.getPartie);
router.put('/parties/:id', PartieController.updatePartie);
router.delete('/parties/:id', PartieController.deletePartie);

module.exports = router;
