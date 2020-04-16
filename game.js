let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
let ball = document.getElementById("ball");

let ballX = 50;
let ballY = 50;
let ballSpeedX = 10;
let ballSpeedY = 4;
let paddle1Y = 250;
let paddle2Y = 250;

let player1Score = 0;
let player2Score = 0;
let showWinScreen = false;

const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;
const WINNING_SCORE = 3;

function handleMouseDown(event) {
    if (showWinScreen) {
        player1Score = 0;
        player2Score = 0;
        showWinScreen = true;
    }
}

window.onload = function () {
    this.drawGameScreen();

    var framesPerSecond = 30;
    setInterval(function () {
        moveBall();
        drawEverything();
    }, 1000 / framesPerSecond);

    canvas.addEventListener('mousedown', handleMouseDown);

    canvas.addEventListener('mousemove', function (event) {
        var mousePos = calculateMousePos(event);
        paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
    });
}

function drawNet() {
    for (var i = 0; i < canvas.height; i += 40) {
        ctx.fillStyle = "white";
        ctx.fillRect(canvas.width / 2 - 1, i, 2, 20);
    }
}

function drawEverything() {

    if (showWinScreen) {
        if (player1Score >= WINNING_SCORE) {
            ctx.fillText("Left player won!", 250, 50);
        }
        else if (player2Score >= WINNING_SCORE) {
            ctx.fillText("Right player won!", 470, 50);
        }
        ctx.fillText("REFRESH THE PAGE TO CONTINUE", canvas.width / 2 - 100, canvas.height / 2);
        return;
    }


    this.drawGameScreen();
    this.drawNet();
    this.drawBall(ballX, ballY, 10);
    this.drawBothPaddle();

    ctx.fillText(player1Score, canvas.width / 4, 100);
    ctx.fillText(player2Score, canvas.width / 1.4, 100);
}

/* Game Screen */
function drawGameScreen() {
    ctx.fillStyle = "#E7E6E4";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
/* END - Game Screen */

/* Ball */
function drawBall(centerX, centerY, radius) {
    ctx.fillStyle = '#54595c';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    ctx.fill();
}

function moveBall() {

    if (showWinScreen) {
        return;
    }

    computerMovement();

    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if (ballX > canvas.width) {
        if (ballY > paddle2Y && ballY < (paddle2Y + PADDLE_HEIGHT)) {
            ballSpeedX = -ballSpeedX;
            var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);
            ballSpeedY = deltaY * 0.35;
        }
        else {
            player1Score++;
            ballReset();
        }

    }
    if (ballX < 0) {
        if (ballY > paddle1Y && ballY < (paddle1Y + PADDLE_HEIGHT)) {
            ballSpeedX = -ballSpeedX;
            var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
            ballSpeedY = deltaY * 0.75;
        }
        else {
            player2Score++;
            ballReset();

        }
    }
    if (ballY > canvas.height) ballSpeedY = -ballSpeedY;
    if (ballY < 0) ballSpeedY = -ballSpeedY;
}

function ballReset() {
    if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
        showWinScreen = true;
    }

    ballSpeedX = -ballSpeedX;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}
/* END - Ball */

/* Paddle */
function drawBothPaddle() {
    // left
    ctx.fillStyle = "#357C93";
    ctx.fillRect(0, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT);
    // right
    ctx.fillStyle = "#357C93";
    ctx.fillRect(canvas.width - PADDLE_WIDTH, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT);
}

function calculateMousePos(event) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = event.clientX - rect.left - root.scrollLeft;
    var mouseY = event.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX, y: mouseY
    };
}

function computerMovement() {
    var paddle2Ycenter = paddle2Y + (PADDLE_HEIGHT / 2);
    if (paddle2Ycenter < ballY - 35)
        paddle2Y += 6;
    else if (paddle2Ycenter > ballY + 35)
        paddle2Y -= 6;
}
/* END - Paddle */
