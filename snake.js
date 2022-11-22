// Snake Game Creative Coding Final Project
// Made by Carter Garcia

let gameOver;
let widthSize;
let heightSize;
let xPos, yPos, fruitX, fruitY, score;
let tailPos = [];
let direction;

function setup() {
  score = 0;
  widthSize = 1200;
  heightSize = 800;
  x = widthSize / 2;
	y = heightSize / 2;
  fruitX = random(100, widthSize - 100);
	fruitY = random(100, heightSize - 100);
  createCanvas(widthSize, heightSize);
}

function draw() {
  background(0);
  drawBorder();
  ellipseMode(CORNER);
  fill(255, 255, 255);
  circle(x, y, 50);
  fill(255, 0, 0);
  circle(fruitX, fruitY, 50);
}

function keyPressed() {
  switch(keyCode) {
    case(87): // w
      break;
    case(83): // s
      break;
    case(65): // a
      break;
    case(68): // d
      break;
  }
}

function drawBorder() {
  stroke(0);
  fill(255);
  for (let i = 0; i <= widthSize; i += 50) {
    rect(i, 0, 50, 50);
  }
  for (let i = 0; i <= widthSize; i += 50) {
    rect(i, heightSize - 50, 50, 50);
  }
  for (let i = 50; i <= heightSize; i += 50) {
    rect(0, i, 50, 50);
  }
  for (let i = 50; i <= heightSize; i += 50) {
    rect(widthSize - 50, i, 50, 50);
  }
}