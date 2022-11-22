// Sketch 4 Carter Garcia - Creative Coding

let imgs = []; // Array that holds my different images
let minBlur, maxBlur; // Minimum and maximum pixel rectangle size
let state; // Chooses which image we are on
let largeness; // Chooses the size of our pixels from our mapping function from minBlur to maxBlur
let x, y; // Variables for our for loops
let redFlag, blueFlag, greenFlag; // Sets our tint color flags
let shape; // The shape that our pixels are of

function preload() { // Preload all of my images to improve function later
  imgs[0] = loadImage('Carmella.jpg');
  imgs[1] = loadImage('Zoe Alone.jpg');
  imgs[2] = loadImage('Zoe and poppy.jpg');
}


function setup() {
  createCanvas(windowWidth, windowHeight); // creates canvas
  // Sets our RGB tint flags
  redFlag = false;
  blueFlag = false;
  greenFlag = false;
  // Sets our max and minimum pixel size
  minBlur = 1;
  maxBlur = 50;
  state = 0; // Sets it to our first image
  largeness = minBlur; // Sets our minimum value
  shape = 1; // Sets our shape to squares
  imgs[state].loadPixels(); // loads image
}


function draw() {
  clear();
  background(0);
  pixelate(); // Calls our pixelate function
}

function pixelate() {
  let largeness = floor(map(mouseX, 0, width, minBlur, maxBlur)); // maps mouseX value to element size

  for (let y = 0; y < imgs[state].height; y++) { // creates pixel index
    for (let x = 0; x < imgs[state].width; x++) {
      let index = (x + y * imgs[state].width) * 4;
      let r = imgs[state].pixels[index + 0]; // Gets the red
      let g = imgs[state].pixels[index + 1]; // Gets the green
      let b = imgs[state].pixels[index + 2]; // Gets the blue

      // Checks our flags and will adjust the tint according to which flags we have set
      if (redFlag) {
        r *= 1.7;
      } else if (greenFlag) {
        g *= 1.7;
      } else if (blueFlag) {
        b *= 1.7;
      }
      // Fills our image with that color value
      fill(r, g, b);
  
      noStroke(); // No outline on the shapes
      switch(shape) { // Determines which shape to draw the pixels as
        case(1):
          rect(x, y, largeness, largeness); // Draws rectangles for pixels
          break;
        case(2):
          circle(x, y, largeness); // Draws circles for pixels
          break;
        case(3):
          triangle(x, y, x + largeness/2, y - largeness, x + largeness, y); // Draws Triangles for pixels
          break;
      }
      x = x + largeness -1; // set new startx value
    }
    y = y + largeness -1; // set new starty value
  }
}

function mouseReleased() { // Checks if we clicked to swap to the next image
  if (state < 2) {
    state++;
  } else {
    state = 0;
  }
  imgs[state].loadPixels();
}


function keyPressed() {
  switch(keyCode) {
    case(82): // r ** turns off or on red tint
      redFlag = !redFlag;
      break;
    case(71): // g ** turns off or on green tint
      greenFlag = !greenFlag;
      break;
    case(66): // b ** turns off or on blue tint
      blueFlag = !blueFlag;
      break;
    case(67): // c ** clears all our flags
      redFlag = false;
      greenFlag = false;
      blueFlag = false;
      break;
    case(83): // s ** Changes the shape of our pixels
      if (shape < 3) {
        shape++;
      } else {
        shape = 1;
      }
      break;
  }
}
