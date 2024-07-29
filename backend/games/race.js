const canvas = document.getElementById('raceCanvas');
const context = canvas.getContext('2d');
const socket = io();
const messageDiv = document.getElementById('message');
const replayButton = document.getElementById('replayButton');
const countdownDiv = document.getElementById('countdown');

// Load sprite images
const player1Sprites = [...Array(12).keys()].map(i => {
    const img = new Image();
    img.src = `assets/images/frame${18 + i}.png`;
    return img;
});
const player2Sprites = [...Array(12).keys()].map(i => {
    const img = new Image();
    img.src = `assets/images/frame${6 + i}.png`;
    return img;
});

// Load background images
const background0 = new Image();
background0.src = 'assets/images/stadium0.png';
const background1 = new Image();
background1.src = 'assets/images/stadium1.png';
const background2 = new Image();
background2.src = 'assets/images/stadium2.png';
const background3 = new Image();
background3.src = 'assets/images/stadium3.png';
const background4 = new Image();
background4.src = 'assets/images/stadium4.png';

let player1Frame = 0;
let player2Frame = 0;

const trackLength = 3200; // Total track length (4 x 800)
const entityWidth = 60; // Width of player sprites
const entityHeight = 60; // Height of player sprites

let player1X = 0; // Horizontal position of player 1
let player2X = 0; // Horizontal position of player 2
let player1Speed = 0;
let player2Speed = 0;
let gameRunning = false;
let countdownRunning = false; // Added to check if countdown is in progress
let countdownInterval; // Added to store countdown interval

// Ajouter des variables pour stocker le temps de départ et d'arrivée
let player1StartTime = 0;
let player2StartTime = 0;
let player1EndTime = 0;
let player2EndTime = 0;

// Animation speed control
let frameCounter1 = 0;
let frameCounter2 = 0;

// Base frames per sprite for animation
const baseFramesPerSprite = 30; // Larger number to start slowly

// Define maximum animation speed
const maxSpeed = 2; // Adjust this value based on desired behavior

// Function to draw entities
function drawEntity(context, x, y, sprite) {
    context.drawImage(sprite, x, y, entityWidth, entityHeight);
}

// Function to draw the racetrack and entities
function draw() {
    const offsetX = Math.min(player1X, player2X);

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the backgrounds
    if (offsetX < canvas.width) {
        context.drawImage(background0, -offsetX, 0, canvas.width, canvas.height);
        context.drawImage(background1, canvas.width - offsetX, 0, canvas.width, canvas.height);
    } else if (offsetX < 2 * canvas.width) {
        context.drawImage(background1, -offsetX + canvas.width, 0, canvas.width, canvas.height);
        context.drawImage(background2, 2 * canvas.width - offsetX, 0, canvas.width, canvas.height);
    } else if (offsetX < 3 * canvas.width) {
        context.drawImage(background2, -offsetX + 2 * canvas.width, 0, canvas.width, canvas.height);
        context.drawImage(background3, 3 * canvas.width - offsetX, 0, canvas.width, canvas.height);
    } else {
        context.drawImage(background3, -offsetX + 3 * canvas.width, 0, canvas.width, canvas.height);
        context.drawImage(background4, 4 * canvas.width - offsetX, 0, canvas.width, canvas.height);
    }

    // Draw the entities
    drawEntity(context, player1X - offsetX, 310, player1Sprites[player1Frame]);
    drawEntity(context, player2X - offsetX, 250, player2Sprites[player2Frame]);

    // Draw the finish line
    //drawFinishLine(offsetX);
}

// Function to draw the finish line
/*function drawFinishLine(offsetX) {
    const finishLineX = trackLength - 200 - offsetX;
    if (finishLineX > 0 && finishLineX < canvas.width) {
        context.drawImage(background3, finishLineX, 270, 20, canvas.height);
    }
}*/

// Ajouter une fonction pour calculer le temps écoulé
function calculateElapsedTime(startTime, endTime) {
    const elapsedTime = endTime - startTime;
    const seconds = Math.floor(elapsedTime / 1000);
    const milliseconds = elapsedTime % 1000;
    return `${seconds}.${milliseconds.toString().padStart(3, '0')}`;
}

// Function to move entities
function moveEntities() {
    if (!gameRunning) return;

    player1X += player1Speed;
    player2X += player2Speed;

    if (player1X >= trackLength - entityWidth && player1EndTime === 0) {
        player1EndTime = Date.now();
        socket.emit('endGame', 'Joueur 1 gagne!');
    } else if (player2X >= trackLength - entityWidth && player2EndTime === 0) {
        player2EndTime = Date.now();
        socket.emit('endGame', 'Joueur 2 gagne!');
    }

    socket.emit('entityMovement', { player1X, player2X });
}


// Function to update animation frames
function updateFrames() {
    if (!gameRunning) return; // Do not update frames if the game is not running

    // Limit sprite animation speed
    const animationSpeed1 = Math.min(player1Speed, maxSpeed);
    const animationSpeed2 = Math.min(player2Speed, maxSpeed);

    // Update frame counter based on player 1's speed
    frameCounter1++;
    if (frameCounter1 >= baseFramesPerSprite / (1 + animationSpeed1 * 5)) {
        frameCounter1 = 0;
        player1Frame = (player1Frame + 1) % player1Sprites.length;
    }

    // Update frame counter based on player 2's speed
    frameCounter2++;
    if (frameCounter2 >= baseFramesPerSprite / (1 + animationSpeed2 * 5)) {
        frameCounter2 = 0;
        player2Frame = (player2Frame + 1) % player2Sprites.length;
    }
}

// Function to start the countdown
function startCountdown() {
    let countdown = 3;
    countdownRunning = true;
    countdownDiv.style.display = 'block';
    countdownDiv.textContent = countdown;

    clearInterval(countdownInterval); // Clear any existing interval
    countdownInterval = setInterval(() => {
        countdown--;
        countdownDiv.textContent = countdown;
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            countdownDiv.style.display = 'none';
            gameRunning = true;
            countdownRunning = false; // Stop the countdown

            // Enregistrer le temps de départ pour chaque joueur
            player1StartTime = Date.now();
            player2StartTime = Date.now();
        }
    }, 1000);
}


// Function to end the game
function endGame(message) {
    gameRunning = false;
    let winnerChrono = '';

    if (message === 'Joueur 1 gagne!') {
        winnerChrono = calculateElapsedTime(player1StartTime, player1EndTime);
    } else if (message === 'Joueur 2 gagne!') {
        winnerChrono = calculateElapsedTime(player2StartTime, player2EndTime);
    }

    messageDiv.textContent = `${message} - Chrono: ${winnerChrono}`;
    messageDiv.style.display = 'block';

    setTimeout(() => {
        replayButton.style.display = 'block';
    }, 2000);
}


// Function to reset the game
function resetGame() {
    player1X = 0;
    player2X = 0;
    player1Speed = 0; // Reset player 1's speed
    player2Speed = 0; // Reset player 2's speed
    player1Frame = 0;
    player2Frame = 0;
    frameCounter1 = 0;  // Reset player 1's frame counter
    frameCounter2 = 0;  // Reset player 2's frame counter
    gameRunning = false;
    countdownRunning = false; // Reset countdown status
    messageDiv.style.display = 'none';
    replayButton.style.display = 'none';
    draw();
    socket.emit('resetComplete');  // Emit reset signal to synchronize clients
    startCountdown();  // Start the countdown
}function resetGame() {
    player1X = 0;
    player2X = 0;
    player1Speed = 0; // Reset player 1's speed
    player2Speed = 0; // Reset player 2's speed
    player1Frame = 0;
    player2Frame = 0;
    frameCounter1 = 0;  // Reset player 1's frame counter
    frameCounter2 = 0;  // Reset player 2's frame counter
    gameRunning = false;
    countdownRunning = false; // Reset countdown status
    messageDiv.style.display = 'none';
    replayButton.style.display = 'none';
    draw();
    socket.emit('resetComplete');  // Emit reset signal to synchronize clients

    // Réinitialiser les temps de départ et d'arrivée
    player1StartTime = 0;
    player2StartTime = 0;
    player1EndTime = 0;
    player2EndTime = 0;

    startCountdown();  // Start the countdown
}


// Key press event listener to increase speed
document.addEventListener('keydown', function(event) {
    if (gameRunning) {
        if (event.key === 'a') { // Key for player 1
            player1Speed += 0.1;
            socket.emit('keyPress', { player: 1 });
        } else if (event.key === 'o') { // Key for player 2
            player2Speed += 0.1;
            socket.emit('keyPress', { player: 2 });
        }
    }
});

// Event listener to reset the game when clicking the "Replay" button
replayButton.addEventListener('click', function() {
    socket.emit('resetGame');
});

// Update player positions from the server
socket.on('update', data => {
    player1X = data.player1X;
    player2X = data.player2X;
    draw();
});

// Handle end game event
socket.on('endGame', message => {
    endGame(message);
});

// Reset the game when reset event is received
socket.on('resetGame', () => {
    resetGame();
});

// Ensure synchronization after reset
socket.on('resetComplete', () => {
    draw();
});

// Call move and draw functions at regular intervals
setInterval(moveEntities, 1000 / 60);
setInterval(draw, 1000 / 60);
setInterval(updateFrames, 1000 / 60);

// Start the initial countdown
startCountdown();
