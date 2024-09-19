
const express = require('express');
const router = express.Router();
const JeuxController = require('../controllers/JeuxController');

router.post('/jeux', JeuxController.createJeux);
router.get('/jeux', JeuxController.getJeux);
router.get('/jeux/:id', JeuxController.getJeuxById);
router.put('/jeux/:id', JeuxController.updateJeux);
router.delete('/jeux/:id', JeuxController.deleteJeux);

module.exports = router;
