// Snake Game Creative Coding Final Project
// Made by Carter Garcia

let gameOver;
let widthSize;
let heightSize;
let xPos, yPos, fruitX, fruitY, score;
let tailPos = [];
let rows, columns;
let xSpeed, ySpeed;
let blockSize;
let totalX, totalY;
let grid = new Array(rows);

function setup() {
  ellipseMode(CORNER);
  rectMode(CORNER);
  score = 0;
  widthSize = 1200;
  heightSize = 800;
  blockSize = 40;
  rows = widthSize / blockSize;
  columns = heightSize / blockSize;
  gameOver = false;
  xSpeed = 0;
  ySpeed = 0;
  totalX = 0;
  totalY = 0;
  x = Math.floor((random(blockSize, widthSize - blockSize)) / blockSize);
  y = Math.floor((random(blockSize, heightSize - blockSize)) / blockSize);
  newFruit();
  createCanvas(widthSize, heightSize);
}

function draw() {
  background(0);
  drawState();
  if (gameOver != true) {
    updatePositions();
    fruitCollected();
  }
}

function keyPressed() {
  if (key == 'w' || keyCode == UP_ARROW) {
    if (ySpeed != 1) {
      xSpeed = 0;
      ySpeed = -1;
    }
  }
  else if (key == 's' || keyCode == DOWN_ARROW) {
    if (ySpeed != -1) {
      xSpeed = 0;
      ySpeed = 1;
    }
  }
  else if (key == 'a' || keyCode == LEFT_ARROW) {
    if (xSpeed != 1) {
      xSpeed = -1;
      ySpeed = 0;
    }
  }
  else if (key == 'd' || keyCode == RIGHT_ARROW) {
    if (xSpeed != -1) {
      xSpeed = 1;
      ySpeed = 0;
    }
  }
}

function drawState() {
  fill('white');
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (i == 0 || i == rows - 1 || j == 0 || j == columns - 1)
        rect(i * blockSize, j * blockSize, blockSize, blockSize);
    }
  }
  fill('red');
  circle(fruitX * blockSize, fruitY * blockSize, blockSize);
  fill('blue');
  circle(Math.floor(x) * blockSize, Math.floor(y) * blockSize, blockSize);
  if (Math.floor(x) == 0 || Math.floor(x) == rows - 1 || Math.floor(y) == columns - 1 || Math.floor(y) == 0) {
    gameOver = true;
  }
}

function updatePositions() {
  x += xSpeed / (blockSize / 4);
  y += ySpeed / (blockSize / 4);
}

function fruitCollected() {
  if (Math.floor(x) == fruitX && Math.floor(y) == fruitY) {
    newFruit();
    score += 100;
    for (let i = tailPos.length - 1; i > 0; i--) {
      tailPos[i] = tailPos[i - 1];
    }
    if (tailPos.length) {
      tailPos[0] = [x, y];
    }
  }
}

function newFruit() {
  fruitX = Math.floor((random(blockSize, widthSize - blockSize)) / blockSize);
  fruitY = Math.floor((random(blockSize, heightSize - blockSize)) / blockSize);
}