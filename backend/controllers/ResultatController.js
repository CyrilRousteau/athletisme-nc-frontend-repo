const Resultat = require('../models/Resultat');

const createResultat = async (req, res) => {
  const { joueurName, totalScore } = req.body;
  if (!joueurName || totalScore === undefined) {
    return res.status(400).json({ error: 'Invalid data received' });
  }
  try {
    const { joueurName, totalScore } = req.body;
    const newResultat = await Resultat.create({
      joueurName,
      totalScore
    });
    res.status(201).json(newResultat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupération des 3 meilleurs résultats
const getTopResultats = async (req, res) => {
  try {
    const topResultats = await Resultat.findAll({
      order: [['totalScore', 'DESC']],  // Trié par totalScore descendant (du plus grand au plus petit)
      limit: 3  // Limité à 3 résultats
    });
    res.status(200).json(topResultats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createResultat, getTopResultats };
