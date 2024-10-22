// Canvas Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 600;

const tileSize = 20; // Größe der Kacheln
const cols = canvas.width / tileSize;
const rows = canvas.height / tileSize;

// Spielerfarben und Positionen
const players = [
    { color: 'red', x: 0, y: 0, score: 0 },
    { color: 'green', x: cols - 1, y: 0, score: 0 },
    { color: 'blue', x: 0, y: rows - 1, score: 0 },
    { color: 'yellow', x: cols - 1, y: rows - 1, score: 0 }
];

let grid = [];

// Funktion, um das Spielfeld zu initialisieren
function initGrid() {
    grid = [];
    for (let row = 0; row < rows; row++) {
        let line = [];
        for (let col = 0; col < cols; col++) {
            line.push(null); // Anfangs sind alle Zellen leer
        }
        grid.push(line);
    }

    // Setzt die Spielerpositionen
    players.forEach((player, index) => {
        const { x, y, color } = player;
        grid[y][x] = color;
    });

    updateScores();
}

// Punkte aktualisieren
function updateScores() {
    players.forEach((player, index) => {
        let score = 0;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (grid[row][col] === player.color) {
                    score++;
                }
            }
        }
        player.score = score;
        document.getElementById(`score${index + 1}`).innerText = score;
    });
}

// Spielfeld rendern
function renderGrid() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            ctx.strokeStyle = 'black';
            ctx.strokeRect(col * tileSize, row * tileSize, tileSize, tileSize);

            if (grid[row][col]) {
                ctx.fillStyle = grid[row][col];
                ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
            }
        }
    }
}

// Spielzug eines Spielers
function playerTurn(player) {
    let directions = [
        { dx: 0, dy: 1 }, // nach unten
        { dx: 0, dy: -1 }, // nach oben
        { dx: 1, dy: 0 }, // nach rechts
        { dx: -1, dy: 0 } // nach links
    ];

    // zufällige Richtung wählen
    let randomDir = directions[Math.floor(Math.random() * directions.length)];
    let newX = player.x + randomDir.dx;
    let newY = player.y + randomDir.dy;

    // Prüfen, ob die Bewegung innerhalb des Spielfelds bleibt
    if (newX >= 0 && newX < cols && newY >= 0 && newY < rows && grid[newY][newX] === null) {
        grid[newY][newX] = player.color; // Spielfeld füllen
        player.x = newX; // Spielerposition aktualisieren
        player.y = newY;
    }
}

// Spielablauf
function gameLoop() {
    players.forEach(player => playerTurn(player)); // Alle Spieler machen einen Zug
    updateScores(); // Punkte aktualisieren
    renderGrid(); // Spielfeld neu rendern

    // Prüfen, ob das Spiel vorbei ist
    if (isGameOver()) {
        setTimeout(resetGame, 3000); // 3 Sekunden warten und dann neu starten
    } else {
        requestAnimationFrame(gameLoop); // Spiel fortsetzen
    }
}

// Prüfen, ob das Spielfeld voll ist
function isGameOver() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col] === null) {
                return false; // Noch nicht voll
            }
        }
    }
    return true; // Spielfeld ist voll
}

// Spiel zurücksetzen
function resetGame() {
    initGrid(); // Spielfeld zurücksetzen
    requestAnimationFrame(gameLoop); // Spiel neustarten
}

// Spielinitialisierung
initGrid();
requestAnimationFrame(gameLoop);
