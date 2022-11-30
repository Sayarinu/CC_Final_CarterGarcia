// Snake Game Creative Coding Final Project
// Made by Carter Garcia

let gameOver;
let widthSize;
let heightSize;
let xPos, yPos, fruitX, fruitY, score;
let tailPos = [];
let direction;
let grid = new Array(24);

function setup() {
  direction = "unset";
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(16);
    if (i == 0 || i == (grid.length - 1)) {
      for (let j = 0; j < grid[i].length; j++) {
        grid[i][j] = "edge";
      }
    } else if (i > 0 && i < grid.length - 1) {
      grid[i][0] = "edge";
      grid[i][15] = "edge";
    }
  }
  ellipseMode(CORNER);
  rectMode(CORNER);
  score = 0;
  widthSize = 1200;
  heightSize = 800;
  x = Math.floor((random(100, widthSize - 100)) / 50);
	y = Math.floor((random(100, heightSize - 100)) / 50);
  fruitX = Math.floor((random(100, widthSize - 100)) / 50);
	fruitY = Math.floor((random(100, heightSize - 100)) / 50);
  while(x != fruitX && y != fruitY) {
    fruitX = Math.floor((random(100, widthSize - 100)) / 50);
    fruitY = Math.floor((random(100, heightSize - 100)) / 50);
  }
  grid[fruitX][fruitY] = "fruit";
  grid[x][y] = "playerHead";
  createCanvas(widthSize, heightSize);
}

function draw() {
  background(0);
  drawState();
  updatePositions();
}

function keyPressed() {
  switch(keyCode) {
    case(87): // w
      if (direction != "down") {
        direction = "up";
      }
      break;
    case(83): // s
      if (direction != "up") {
        direction = "down";
      }
      break;
    case(65): // a
      if (direction != "right") {
        direction = "left";
      }
      break;
    case(68): // d
      if (direction != "left") {
        direction = "right";
      }
      break;
  }
}

function drawState() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      switch(grid[i][j]) {
        case("fruit"):
          fill('red');
          circle(i * 50, j * 50, 50);
          break;
        case("edge"):
          fill('white');
          rect(i * 50, j * 50, 50);
          break;
        case("playerHead"):
          fill('blue');
          x = i;
          y = j;
          circle(i * 50, j * 50, 50);
          break;
      }
    }
  }
}

function updatePositions() {
  switch(direction) {
    case("down"):
      if (grid[x][y + 1] == "fruit") {
        while(x != fruitX && y + 1 != fruitY) {
          fruitX = Math.floor((random(100, widthSize - 100)) / 50);
          fruitY = Math.floor((random(100, heightSize - 100)) / 50);
        }
        score += 10;
      } else if (grid[x][y + 1] != "edge") {
        grid[x][y + 1] = "empty";
        grid[x][y + 1] = "player";
      }
      break;
    case("up"):
      if (grid[x][y - 1] == "fruit") {
        while(x != fruitX && y - 1 != fruitY) {
          fruitX = Math.floor((random(100, widthSize - 100)) / 50);
          fruitY = Math.floor((random(100, heightSize - 100)) / 50);
        }
        score += 10;
      } else if (grid[x][y + 1] != "edge") {
        grid[x][y - 1] = "empty";
        grid[x][y - 1] = "player";
      }
      break;
    case("right"):
      if (grid[x + 1][y] == "fruit") {
        while(x + 1 != fruitX && y != fruitY) {
          fruitX = Math.floor((random(100, widthSize - 100)) / 50);
          fruitY = Math.floor((random(100, heightSize - 100)) / 50);
        }
        score += 10;
      } else if (grid[x][y + 1] != "edge") {
        grid[x + 1][y] = "empty";
        grid[x + 1][y] = "player";
      }
      break;
    case("left"):
      if (grid[x - 1][y] == "fruit") {
        while(x - 1 != fruitX && y != fruitY) {
          fruitX = Math.floor((random(100, widthSize - 100)) / 50);
          fruitY = Math.floor((random(100, heightSize - 100)) / 50);
        }
        score += 10;
      } else if (grid[x][y + 1] != "edge") {
        grid[x - 1][y] = "empty";
        grid[x - 1][y] = "player";
      }
      break;
  }
}