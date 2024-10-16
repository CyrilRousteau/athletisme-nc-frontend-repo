const express = require('express');
const http = require('http');
const cors = require('cors');
const initializeDatabase = require('./dbInit');
require('dotenv').config();

const JoueurRoutes = require('./routes/joueurRoutes');
const CompetenceRoutes = require('./routes/CompetenceRoutes');
const JeuxRoutes = require('./routes/JeuxRoutes');
const PartieRoutes = require('./routes/PartieRoutes');
const ScoreRoutes = require('./routes/ScoreRoutes');
const ProfilRoutes = require('./routes/ProfilRoutes');
const ResultatRoutes = require('./routes/ResultatRoutes');

const app = express();
const server = http.createServer(app);
const allowedOrigins = ['http://localhost:4200', 'https://athletisme-nc.netlify.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(cors(corsOptions));

// Utiliser les routes
app.use('/api', JoueurRoutes);
app.use('/api', CompetenceRoutes);
app.use('/api', JeuxRoutes);
app.use('/api', PartieRoutes);
app.use('/api', ScoreRoutes);
app.use('/api', ProfilRoutes);
app.use('/api', ResultatRoutes);

// Initialiser la base de données avant de démarrer le serveur
initializeDatabase().then(() => {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
  });
}).catch(error => {
  console.error('Erreur lors de l initialisation de l application:', error);
});
