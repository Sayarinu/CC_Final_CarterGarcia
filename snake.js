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
let highScore;
let speedModifier;


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
	highScore = 0;
  widthSize = 1200;
  heightSize = 800;
  blockSize = 40;
  rows = widthSize / blockSize;
  columns = heightSize / blockSize;
  restartGame();
}

function restartGame() {
	tails = [];
	score = 0;
  gameOver = false;
	changeX = 0;
	changeY = 0;
  xSpeed = 0;
  ySpeed = 0;
	speedModifier = 4;
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
  } else {
		updateHighScore();
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
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
			fill(255, 255, 255, 5);
			stroke(255, 255, 255, 5);
			line(i * blockSize, 0, i * blockSize, heightSize);
			line(0, j * blockSize, widthSize, j * blockSize);
			fill('white');
      if (i == 0 || i == rows - 1 || j == 0 || j == columns - 1)
        rect(i * blockSize, j * blockSize, blockSize, blockSize);
    }
  }
	stroke('black');
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
  text(score, 200, heightSize + 25);
	text('High Score:', width / 2 + 50, heightSize + 25);
  text(highScore, width / 2 + 200, heightSize + 25);
}

function updateTails() {
	for (let i = (tails.length - 1); i > 0; i--) {
		tails[i] = tails[i - 1];
	}
	
	if (tails.length > 0) {
		tails[0] = [x, y];
	}
}

function updateHighScore() {
	if (score > highScore) {
		highScore = score;
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