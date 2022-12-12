// Snake Game Creative Coding Final Project
// Made by Carter Garcia

let gameOver;
let backgroundMusic;
let turningSound;
let widthSize;
let heightSize;
let xPos, yPos, fruitX, fruitY, score;
let tails = [];
let changeX, changeY;
let rows, columns;
let xSpeed, ySpeed;
let blockSize;


// BGM music found at https://youtu.be/ptrI2TZnVYU?list=PLBE459782E55DE0D8
function preload() {
  backgroundMusic = loadSound("BGM.wav");
	backgroundMusic.setVolume(0.06);
	// Sound effects made by me
	fruitNoise = loadSound("FruitNoise.mp3");
	fruitNoise.setVolume(0.06);
	deathSound = loadSound("PlayerDeath.mp3");
	deathSound.setVolume(0.06);
}

function setup() {
	backgroundMusic.play();
  ellipseMode(CORNER);
  rectMode(CORNER);
  score = 0;
  widthSize = 1200;
  heightSize = 800;
  blockSize = 40;
  rows = widthSize / blockSize;
  columns = heightSize / blockSize;
  gameOver = false;
	changeX = 0;
	changeY = 0;
  xSpeed = 0;
  ySpeed = 0;
  x = Math.floor((random(blockSize, widthSize - blockSize)) / blockSize);
  y = Math.floor((random(blockSize, heightSize - blockSize)) / blockSize);
  newFruit();
  createCanvas(widthSize, heightSize + 50);
}

function draw() {
	if (backgroundMusic.isPlaying() == false) {
		backgroundMusic.play();
	}
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
  circle(x * blockSize, y * blockSize, blockSize);
	if (tails.length > 0) {
		fill('yellow');
		for (let i = 0; i < tails.length; i++) {
			circle(tails[i][0] * blockSize, tails[i][1] * blockSize, blockSize);
		}
	}
  if (Math.floor(x) == 0 || Math.floor(x) == rows - 1 || Math.floor(y) == columns - 1 || Math.floor(y) == 0) {
		if (gameOver == false) {
			deathSound.play();
		}
    gameOver = true;
  }
  fill(200, 0, 150, 200);
  rect(0, heightSize, width, height - heightSize);
  displayScore();
}

function updatePositions() {
  changeX += xSpeed / (blockSize / 10);
  changeY += ySpeed / (blockSize / 10);
	if (changeX < -1 || changeX > 1 || changeY < -1 || changeY > 1) {
		updateTails();
		if (changeX < -1) {
			x -= 1;
			changeX = 0;
		} else if (changeX > 1) {
			x += 1;
			changeX = 0;
		} else if (changeY < -1) {
			y -= 1;
			changeY = 0;
		} else {
			y += 1;
			changeY = 0;
		 }
	}
}

function fruitCollected() {
  if (Math.floor(x) == fruitX && Math.floor(y) == fruitY) {
		fruitNoise.play();
		tails.push([x, y]);
    newFruit();
    score += 100;
  }
}

function displayScore() { 
  fill('orange');
  textSize(25);
  textAlign(CENTER);
  text('Score:', 50, heightSize + 25);
  textAlign(CENTER);
  text(score, 200, heightSize + 25);
}

function updateTails() {
	for (let i = (tails.length - 1); i > 0; i--) {
		tails[i] = tails[i - 1];
	}
	
	if (tails.length > 0) {
		tails[0] = [x, y];
	}
}

function newFruit() {
  fruitX = Math.floor((random(blockSize, widthSize - blockSize)) / blockSize);
  fruitY = Math.floor((random(blockSize, heightSize - blockSize)) / blockSize);
}