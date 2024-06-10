const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 400;
let snake = [{ x: 200, y: 200 }];
let food = { x: 0, y: 0 };
let dx = 0;
let dy = 0;
let score = 0;

function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = "green";
        ctx.fillRect(segment.x, segment.y, box, box);
        ctx.strokeStyle = "darkgreen";
        ctx.strokeRect(segment.x, segment.y, box, box);
    });
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
}

function drawScore() {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Pontuação: " + score, 10, 30);
}

function generateFood() {
    food.x = Math.floor(Math.random() * (canvasSize / box)) * box;
    food.y = Math.floor(Math.random() * (canvasSize / box)) * box;
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score++;
        generateFood();
    } else {
        snake.pop();
    }
}

function checkCollision() {
    if (snake[0].x < 0 || snake[0].x >= canvasSize || snake[0].y < 0 || snake[0].y >= canvasSize) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    return false;
}

function gameOver() {
    clearInterval(game);
    alert("Fim de jogo! Sua pontuação: " + score);
    document.location.reload();
}

document.addEventListener("keydown", event => {
    const keyPressed = event.key;
    if (keyPressed === "ArrowLeft" && dx !== box) {
        dx = -box;
        dy = 0;
    } else if (keyPressed === "ArrowRight" && dx !== -box) {
        dx = box;
        dy = 0;
    } else if (keyPressed === "ArrowUp" && dy !== box) {
        dx = 0;
        dy = -box;
    } else if (keyPressed === "ArrowDown" && dy !== -box) {
        dx = 0;
        dy = box;
    }
});

function gameLoop() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    drawSnake();
    drawFood();
    drawScore();
    moveSnake();
    if (checkCollision()) {
        gameOver();
    }
}

generateFood();
let game = setInterval(gameLoop, 100);