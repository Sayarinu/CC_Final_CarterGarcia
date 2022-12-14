// Snake Game Creative Coding Final Project
// Made by Carter Garcia

// Sound effects and Music
let backgroundMusic; // Background music
let fruitNoise; // Noise when collecting a fruit
let deathSound; // Noise when you die

// Variables
let gameOver; // Determines if the game is over or not
let widthSize; // Grid Width
let heightSize; // Grid height
let fruitX, fruitY; // Fruit X and Y Position
let score; // Tracks the score
let tails; // Tails array
let changeX, changeY; // Determines the current change in X and Y Direction (Determines how we move)
let rows, columns; // Tracks the rows and columns
let xSpeed, ySpeed; // Tracks the direction the snake is going
let blockSize; // Determines how big the blocks are (determines rows and columns too)
let highScore; // Keeps track of the highest score in your session
let speedModifier; // Determines how fast the ball will move
let playing; // Determines if the game is running or not (if not running will display menus)
let difficulty; // Determines the speed and size of the map


// BGM music found at https://youtu.be/ptrI2TZnVYU?list=PLBE459782E55DE0D8
function preload() { // preloads all of the music and sets it to the correct volume
  	backgroundMusic = loadSound("BGM.wav");
	backgroundMusic.setVolume(0.06);
	// Sound effects made by me
	fruitNoise = loadSound("FruitNoise.mp3");
	fruitNoise.setVolume(0.06);
	deathSound = loadSound("PlayerDeath.mp3");
	deathSound.setVolume(0.06);
}

function setup() { // Setup
	playing = false; // sets us to menus
	difficulty = false; // Starts on easy
	backgroundMusic.play(); // Plays our music
  	ellipseMode(CORNER); // Makes it so we can have the circles correctly in the grid
	highScore = 0; // Highscore starts at 0
  	widthSize = 1200; // Width
  	heightSize = 800; // height for grid (height for canvas is 50 more to hold the score)
	createCanvas(widthSize, heightSize + 50);
}

function restartGame() { // Sets the game state
	rectMode(CORNER);
	textSize(25);
	if (difficulty) { // sets the speed modifier and size of the map based on the difficulty
		// hard mode
		speedModifier = 12;
		blockSize = 50;
	} else {
		// easy mode
		speedModifier = 12;
		blockSize = 80;
	}
	rows = widthSize / blockSize; // Sets our rows based on the difficulty
  	columns = heightSize / blockSize; // Sets our columns based on the difficulty
	tails = []; // Clears our tails array
	score = 0; // Score is initialized to 0
  	gameOver = false; // We haven't lost so gameOver is false
	// sets speeds to 0 since we want to recognize where we start
	changeX = 0;
	changeY = 0;
  	xSpeed = 0;
  	ySpeed = 0;
	// creates x and y starting locations
  	x = Math.floor((random(blockSize, widthSize - blockSize)) / blockSize);
  	y = Math.floor((random(blockSize, heightSize - blockSize)) / blockSize);
  	newFruit(); // creates a fruit
}

function draw() {
	if (backgroundMusic.isPlaying() == false) {
		backgroundMusic.play();
	}
	if (playing) { // if in gameplay
		background(0);
		drawState(); // draws the board
  		if (gameOver != true) {
    		updatePositions(); // updates positions of the player
    		fruitCollected(); // checks if we collected a fruit
  		} else { // just lost, update the high score
			updateHighScore();
		}
	} else { // if in menus
		if (gameOver == true) { // if you just lost
			gameOverScreen();
		} else { // if you are in main menu
			startMenu();
		}
	}
}

function startMenu() { // Displays the ui of the screen
	rectMode(CORNER);
	background(100, 0, 255);
	textAlign(CENTER);
	fill('white');
	stroke('black');
	// Sets our buttons
	rect(width * (1/16), height * (11/16), width * (4/16), height * (2/16));
	rect(width * (11/16), height * (11/16), width * (4/16), height * (2/16));
	// Displays all our text
	fill('orange');
	textSize(72);
  	text('Snake Game', width/2, height / 2 - 200);
	text('by Carter Garcia', width/2, height / 2 - 100);
	textSize(32);
	text('Start Game', width * (3/16), height * (12/16));
	text('Change Difficulty', width * (13/16), height * (12/16));
	if (difficulty) { // Says the text based on if we are on hard or easy mode
		text('Difficulty: Hard', width/2, height * (14.5/16));
	} else {
		text('Difficulty: Easy', width/2, height * (14.5/16));
	}
}

function gameOverScreen() { // Displays game over screen
	background(100, 0, 255);
	textAlign(CENTER);
	fill('white');
	stroke('black');
	// Play again button
	rect(width * (5/16), height * (10/16), width * (6/16), height * (4/16));
	fill('orange');
	text('Game Over', width/2, height/4);
	text('High Score:', width/2 - 50, height / 2);
	text(highScore, width/2 + 50, height / 2);
	text('Return to Main Menu', width / 2, height * (12/16));
}

function keyPressed() { 

	// Using either WASD or Arrow Keys, determines which spot to go to
	// The checks are for if you are trying to input too many inputs or if you are trying to turn around

  	if (key == 'w' || keyCode == UP_ARROW) {
    	if (ySpeed != 1 && (changeY < 0.25 || changeY > -0.25)) {
      	xSpeed = 0;
      	ySpeed = -1;
    	}
  	}
  	else if (key == 's' || keyCode == DOWN_ARROW) {
    	if (ySpeed != -1 && (changeY < 0.25 || changeY > -0.25)) {
      	xSpeed = 0;
      	ySpeed = 1;
    	}
  	}
  	else if (key == 'a' || keyCode == LEFT_ARROW) {
    	if (xSpeed != 1 && (changeX < 0.25 || changeX > -0.25)) {
      	xSpeed = -1;
      	ySpeed = 0;
    	}
  	}
  	else if (key == 'd' || keyCode == RIGHT_ARROW) {
    	if (xSpeed != -1 && (changeX < 0.25 || changeX > -0.25)) {
      		xSpeed = 1;
      		ySpeed = 0;
    	}
  	}
}

function drawState() {
	// Draws our board
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
	// draws our fruit
  	circle(fruitX * blockSize, fruitY * blockSize, blockSize);
  	fill('blue');
	// draws the snake head
  	circle(x * blockSize, y * blockSize, blockSize);
	if (tails.length > 0) {
		fill('yellow');
		for (let i = 0; i < tails.length; i++) { // Draws all of the tails
			circle(tails[i][0] * blockSize, tails[i][1] * blockSize, blockSize);
		}
	}
 	if (Math.floor(x) == 0 || Math.floor(x) == rows - 1 || Math.floor(y) == columns - 1 || Math.floor(y) == 0) { // If you run into a wall, end the game
		endGame();
  	}
  	fill(200, 0, 150, 200);
  	rect(0, heightSize, width, height - heightSize);
  	displayScore(); // Displays the score
}

function endGame() { // Ends the game
	if (gameOver == false) {
		deathSound.play(); // plays our dying noise
	}
    gameOver = true;
}

function updatePositions() {
  	changeX += xSpeed / (blockSize / speedModifier);
  	changeY += ySpeed / (blockSize / speedModifier);
	if (changeX < -1 || changeX > 1 || changeY < -1 || changeY > 1) { //.If we need to updateTail positions update them
		updateTails(); // updates our tails
		if (changeX < -1) { // Changes our X to the left by 1 on the grid
			x -= 1;
			changeX = 0;
		} else if (changeX > 1) { // Changes our X to the Right by 1 on the grid
			x += 1;
			changeX = 0;
		} else if (changeY < -1) { // Changes our Y up by 1 on the grid
			y -= 1;
			changeY = 0;
		} else { // Changes our Y down by 1 on the grid
			y += 1;
			changeY = 0;
		 }
	}
	for (let i = 1; i < tails.length - 1; i++) { // Checks for tail collisions
		if (tails[i][0] == x && tails[i][1] == y) { // If we run into a tail, end the game
			endGame();
		}
	}
}

function fruitCollected() { // Checks if we ran into a fruit
  	if (x == fruitX && y == fruitY) {
		fruitNoise.play(); // plays the noise from collecting a fruit
		tails.push([x, y]);
		score += 100;
		if (tails.length + 1 != (rows - 2) * (columns - 2)) {
			newFruit();	// generates a new fruit
		} else {
			gameOver = true; // We win if we filled the board
		}
  	}
}

function displayScore() { // Displays our score text at the bottom of the screen
  	fill('orange');
  	textSize(25);
  	textAlign(CENTER);
  	text('Score:', 50, heightSize + 25);
  	text(score, 200, heightSize + 25);
	text('High Score:', width / 2 + 50, heightSize + 25);
  	text(highScore, width / 2 + 200, heightSize + 25);
}

function updateTails() { //Updates all the tails positions
	for (let i = (tails.length - 1); i > 0; i--) {
		tails[i] = tails[i - 1];
	}
	
	if (tails.length > 0) {
		tails[0] = [x, y];
	}
}

function updateHighScore() { // Updates the high score
	if (score > highScore) {
		highScore = score;
	}
	playing = false; // brings us to the menus
}

function mouseClicked() { // Deals with menus
	if (!playing && !gameOver) { // Main menu
		if (mouseX > width * (1/16) && mouseX < width * (5/16) && mouseY > height * (11/16) && mouseY < height * (13/16)) { // Hit the play again
			restartGame();
			playing = true;
			gameOver = false;
		} else if (mouseX > width * (11/16) && mouseX < width * (15/16) && mouseY > height * (11/16) && mouseY < height * (13/16)) { // Swapped the difficulty
			difficulty = !difficulty;
		}
	} else if (!playing && gameOver) { // Game Over Menu
		if (mouseX > width * (5/16) && mouseX < width * (11/16) && mouseY > height * (10/16) && mouseY < height * (14/16)) { // Brings you back to the main menu
			gameOver = false;
		}
	}
}

function newFruit() {
	let flag = 0; // overlap fruit and tail flag
	fruitX = Math.floor((random(blockSize, widthSize - blockSize)) / blockSize); // sets fruit's X coord
	fruitY = Math.floor((random(blockSize, heightSize - blockSize)) / blockSize); // sets fruit's Y coord
	if (fruitX == x && fruitY == y) { // if overlaps with the player, roll again
		newFruit();
	}
	for (let i = 0; i < tails.length; i++) {
		if (tails[i][0] == fruitX && tails[i][1] == fruitY) {
			flag = 1; // Sets flag if one tail overlaps with the fruit
			break;
		}
	}
	if (flag == 1) { // If flag is set then roll a new fruit
		newFruit();
	}
	// Otherwise it will be a valid fruit and display
}