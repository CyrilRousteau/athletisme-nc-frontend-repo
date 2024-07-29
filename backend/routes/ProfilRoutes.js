// routes/ProfilRoutes.js
const express = require('express');
const router = express.Router();
const ProfilController = require('../controllers/ProfilController');

router.post('/profils', ProfilController.createProfil);
router.get('/profils', ProfilController.getProfils);
router.get('/profils/:id', ProfilController.getProfil);
router.put('/profils/:id', ProfilController.updateProfil);
router.delete('/profils/:id', ProfilController.deleteProfil);

module.exports = router;
