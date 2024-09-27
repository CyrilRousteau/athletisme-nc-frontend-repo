/*const race = require('./backend/games/race');


module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('New client connected');

         // Intégration de la logique spécifique à mon jeu
        race(io, socket);

        // Handle client disconnection
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};
*/