// Snake Game Creative Coding Final Project
// Made by Carter Garcia

let gameOver;
let backgroundMusic;
let turningSound;
let widthSize;
let heightSize;
let xPos, yPos, fruitX, fruitY, score;
let tails;
let changeX, changeY;
let rows, columns;
let xSpeed, ySpeed;
let blockSize;
let speedModifier;
let updateFrames;


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
  widthSize = 800;
  heightSize = 800;
  blockSize = 200;
  rows = widthSize / blockSize;
  columns = heightSize / blockSize;
  restartGame();
}

function restartGame() {
	tails = [];
	score = 0;
  gameOver = false;
	valid = 0;
	changeX = 0;
	changeY = 0;
  xSpeed = 0;
  ySpeed = 0;
	speedModifier = 10;
  x = Math.floor((random(blockSize, widthSize - blockSize)) / blockSize);
  y = Math.floor((random(blockSize, heightSize - blockSize)) / blockSize);
  newFruit();
  createCanvas(widthSize, heightSize + 50);
}

function draw() {
	if (backgroundMusic.isPlaying() == false) {
		backgroundMusic.play();
	}
  if (gameOver != true) {
		background(0);
		drawState();
    updatePositions();
    fruitCollected();
  } else {
		background(255);
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
  } else if (key == 'r') {
		if (gameOver == true)
			restartGame();
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
		endGame();
  }
  fill(200, 0, 150, 200);
  rect(0, heightSize, width, height - heightSize);
  displayScore();
}

function endGame() {
		if (gameOver == false) {
			deathSound.play();
		}
    gameOver = true;
}

function updatePositions() {
  changeX += xSpeed / (blockSize / speedModifier);
  changeY += ySpeed / (blockSize / speedModifier);
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
	for (let i = 1; i < tails.length - 1; i++) {
		if (tails[i][0] == x && tails[i][1] == y) {
			endGame();
		}
	}
}

function fruitCollected() {
  if (x == fruitX && y == fruitY) {
		fruitNoise.play();
		tails.push([x, y]);
		score += 100;
		if (tails.length + 1 != (rows - 2) * (columns - 2)) {
			newFruit();	
		} else {
			gameOver = true;
		}
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
	let flag = 0;
  fruitX = Math.floor((random(blockSize, widthSize - blockSize)) / blockSize);
  fruitY = Math.floor((random(blockSize, heightSize - blockSize)) / blockSize);
	if (fruitX == x && fruitY == y) {
		newFruit();
	}
	for (let i = 0; i < tails.length; i++) {
		if (tails[i][0] == fruitX && tails[i][1] == fruitY) {
			flag = 1;
			break;
		}
	}
	if (flag == 1) {
		newFruit();
	}
}