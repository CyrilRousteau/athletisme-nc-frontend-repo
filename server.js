const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const sequelize = require('./database');
const configureSocketIo = require('./socket'); // Fichier séparé pour la logique Socket.io

const JoueurRoutes = require('./routes/JoueurRoutes');
const CompetenceRoutes = require('./routes/CompetenceRoutes');
const JeuRoutes = require('./routes/JeuRoutes');
const PartieRoutes = require('./routes/PartieRoutes');
const ScoreRoutes = require('./routes/ScoreRoutes');
const ProfilRoutes = require('./routes/ProfilRoutes');
const QuizzScoreRoutes = require('./routes/QuizzScoreRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/public'));
app.use(express.json());

// Utiliser les routes
app.use('/api', JoueurRoutes);
app.use('/api', CompetenceRoutes);
app.use('/api', JeuRoutes);
app.use('/api', PartieRoutes);
app.use('/api', ScoreRoutes);
app.use('/api', ProfilRoutes);
app.use('/api', QuizzScoreRoutes);

// Configurer Socket.io
configureSocketIo(io);

// Synchroniser les modèles et démarrer le serveur
sequelize.sync({ force: true }).then(() => {
    console.log('Database & tables created!');

    // Start the server and listen on port 3001
    server.listen(3001, () => {
        console.log('Listening on port 3001');
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
