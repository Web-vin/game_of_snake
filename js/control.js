const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const boxSize = 20;
const canvasSize = 400;
let snake = [{ x: 200, y: 200 }];
let direction = 'RIGHT';
let food = { x: getRandomCoordinate(), y: getRandomCoordinate() };
let gameInterval;

function getRandomCoordinate() {
    return Math.floor(Math.random() * (canvasSize / boxSize)) * boxSize;
}

function drawBox(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, boxSize, boxSize);
}

function drawSnake() {
    snake.forEach(segment => drawBox(segment.x, segment.y, 'lime'));
}

function drawFood() {
    drawBox(food.x, food.y, 'red');
}

function updateSnake() {
    const head = { ...snake[0] };

    if (direction === 'UP') head.y -= boxSize;
    if (direction === 'DOWN') head.y += boxSize;
    if (direction === 'LEFT') head.x -= boxSize;
    if (direction === 'RIGHT') head.x += boxSize;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = { x: getRandomCoordinate(), y: getRandomCoordinate() };
    } else {
        snake.pop();
    }

    if (
        head.x < 0 || head.x >= canvasSize ||
        head.y < 0 || head.y >= canvasSize ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        clearInterval(gameInterval);
        alert('Game Over!');
        resetGame();
    }
}
function resetGame() {
    snake = [{ x: 200, y: 200 }];
    direction = 'RIGHT';
    food = { x: getRandomCoordinate(), y: getRandomCoordinate() };
    gameInterval = setInterval(gameLoop, 100);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    updateSnake();
    drawSnake();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (e.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    if (e.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (e.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
});

document.getElementById('up').addEventListener('click', () => {
    if (direction !== 'DOWN') direction = 'UP';
});

document.getElementById('down').addEventListener('click', () => {
    if (direction !== 'UP') direction = 'DOWN';
});

document.getElementById('left').addEventListener('click', () => {
    if (direction !== 'RIGHT') direction = 'LEFT';
});
document.getElementById('right').addEventListener('click', () => {
    if (direction !== 'LEFT') direction = 'RIGHT';
});

resetGame();