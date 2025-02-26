let chicken, plate, woodBackground;
let plateX = 100, plateY = 100;
let plateWidth = 230, plateHeight = 230;
let chickenWidth = 80, chickenHeight = 60;
let plateSpeed = 2;  // Speed of plate movement
let plateSpeedX, plateSpeedY;
let chickens = [];  // Array to hold chicken pieces
let clickCount = 0;  // Track the number of times 'E' key is pressed

let pauseMovement = false;  // State to check if movement is paused
let lastPauseTime = 0;  // Store the last time the plate movement was toggled
let pauseDuration = 3000;  // Duration for which the plate stays paused (in milliseconds)
let resumeTime = 5000;  // Time after which the plate should resume its movement

let customFont;

function preload() {
  // Load images from the 'images' folder
  chicken = loadImage('images/chicken.png');
  plate = loadImage('images/plate.png');
  woodBackground = loadImage('images/wood.jpg');
  
  // Load the custom font 'bronco.ttf' from the 'assets' folder
  customFont = loadFont('fonts/bronco.ttf');  // Ensure the path is correct
}

function setup() {
  createCanvas(400, 400);
  
  // Randomize plate movement speed
  plateSpeedX = random(-plateSpeed, plateSpeed);
  plateSpeedY = random(-plateSpeed, plateSpeed);
}

function draw() {
  // Check if it's time to pause the movement
  let currentMillis = millis();
  if (currentMillis - lastPauseTime >= resumeTime) {  // Pause after the given duration
    pauseMovement = !pauseMovement;  // Toggle the movement pause
    lastPauseTime = currentMillis;  // Update the last time the movement was toggled
  }

  // Set the background to the wood image
  image(woodBackground, 0, 0, width, height);  // Draw the wood background

  // Draw the plate (with its image)
  image(plate, plateX, plateY, plateWidth, plateHeight);

  // Waffle (rectangular shape on plate)
  drawWaffle();
  
  // Syrup (blobs on waffle)
  drawSyrup();

  // Draw all chicken images
  for (let i = 0; i < chickens.length; i++) {
    let chickenX = chickens[i].x;
    let chickenY = chickens[i].y;
    image(chicken, chickenX, chickenY, chickenWidth, chickenHeight);
  }

  // Move the plate and chicken together only if movement is not paused
  if (!pauseMovement) {
    plateX += plateSpeedX;
    plateY += plateSpeedY;
  }

  // Ensure that the plate stays within canvas bounds but keeps moving
  if (plateX + plateWidth > width) {
    plateSpeedX = -plateSpeedX;  // Reverse direction if plate hits right edge
    plateX = width - plateWidth;  // Set plate to the right edge
  } else if (plateX < 0) {
    plateSpeedX = -plateSpeedX;  // Reverse direction if plate hits left edge
    plateX = 0;  // Set plate to the left edge
  }

  if (plateY + plateHeight > height) {
    plateSpeedY = -plateSpeedY;  // Reverse direction if plate hits bottom edge
    plateY = height - plateHeight;  // Set plate to the bottom edge
  } else if (plateY < 0) {
    plateSpeedY = -plateSpeedY;  // Reverse direction if plate hits top edge
    plateY = 0;  // Set plate to the top edge
  }

  // Chicken follows the plate position with an offset
  for (let i = 0; i < chickens.length; i++) {
    chickens[i].x = plateX + plateWidth / 2 - chickenWidth / 2;
    chickens[i].y = plateY + plateHeight / 2 - chickenHeight / 2;
  }

  // Ensure that the chicken stays within canvas bounds
  for (let i = 0; i < chickens.length; i++) {
    chickens[i].x = constrain(chickens[i].x, 0, width - chickenWidth);
    chickens[i].y = constrain(chickens[i].y, 0, height - chickenHeight);
  }
  
  fill(36, 18, 0);

  // Title in upper-left corner with custom font
  textFont(customFont);  // Apply the custom font
  textSize(38);
  text("Chicken N' Waffles", 10, 35);
  
  // Your name in lower-right corner with custom font
  textSize(22);
  text("Mason Rusek", width - 105, height - 10);
}

// Function to draw the waffle
function drawWaffle() {
  fill(227, 178, 65);
  stroke(180, 120, 40);
  strokeWeight(4);
  rectMode(CENTER);
  rect(plateX + plateWidth / 2, plateY + plateHeight / 2, 150, 150, 10);  // Smaller waffle size to fit plate
  
  // Waffle Grid
  stroke(180, 120, 40);
  for (let i = -2; i <= 2; i++) {
    line(plateX + plateWidth / 2 - 75, plateY + plateHeight / 2 + i * 30, plateX + plateWidth / 2 + 75, plateY + plateHeight / 2 + i * 30);
    line(plateX + plateWidth / 2 + i * 30, plateY + plateHeight / 2 - 75, plateX + plateWidth / 2 + i * 30, plateY + plateHeight / 2 + 75);
  }
}

// Function to draw the syrup
function drawSyrup() {
  noStroke();
  fill(139, 69, 19, 200);
  ellipse(plateX + plateWidth / 2, plateY + plateHeight / 2, 140, 100);      // Main syrup blob
  ellipse(plateX + plateWidth / 2 + 40, plateY + plateHeight / 2 + 20, 70, 50);  // Side syrup blob
  ellipse(plateX + plateWidth / 2 - 40, plateY + plateHeight / 2 - 20, 70, 50);  // Side syrup blob
}

function keyPressed() {
  if (key === 'e' || key === 'E') {
    // Add a new chicken piece when 'E' is pressed
    let chickenX = plateX + plateWidth / 2 - chickenWidth / 2;
    let chickenY = plateY + plateHeight / 2 - chickenHeight / 2;
    chickens.push({ x: chickenX, y: chickenY });

    clickCount++;
  }
}