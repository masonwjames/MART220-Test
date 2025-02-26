let plate, woodBackground, chicken;
let plateX = 100, plateY = 100;
let plateWidth = 230, plateHeight = 230;
let chickenWidth = 150, chickenHeight = 120;
let plateSpeed = 2;  
let plateSpeedX, plateSpeedY;
let chickens = [];  // Array to hold chicken objects
let clickCount = 0;

let pauseMovement = false;
let lastPauseTime = 0;
let resumeTime = 250;  // Time in milliseconds to pause before resuming (now shorter)

let customFont;

// Sprite variables
let spriteX = 0;
let spriteSpeed = 3;
let spriteDirection = 1; 
let spriteFrame = 0;  // To toggle between frames
let runSprite;  // Running sprite
let standSprite;  // Standing sprite

// Variable for syrup visibility and toggling
let syrupVisible = true;
let lastSyrupToggleTime = 0;
let syrupToggleInterval = 2000; // Fixed interval for syrup visibility toggle

// Variables for food items visibility
let foodVisible = true; // Controls visibility of all food (waffle, syrup, chicken)

class Chicken {
  constructor() {
    // Initialize chicken relative to the plate's position
    this.x = plateX + plateWidth / 2 - chickenWidth / 2;
    this.y = plateY + plateHeight / 2 - chickenHeight / 2;
  }

  display() {
    if (foodVisible) { // Only display chicken if food is visible
      image(chicken, this.x, this.y, chickenWidth, chickenHeight);
    }
  }

  update() {
    // Keep the chicken updated based on the plate's current position
    this.x = plateX + plateWidth / 2 - chickenWidth / 2;
    this.y = plateY + plateHeight / 2 - chickenHeight / 2;
  }
}

function preload() {
  chicken = loadImage('images/chicken.png');
  plate = loadImage('images/plate.png');
  woodBackground = loadImage('images/wood.jpg');
  customFont = loadFont('fonts/bronco.ttf'); 

  // Load the standing and running sprites
  standSprite = loadImage('images/stand.png');  // Static standing sprite
  runSprite = loadImage('images/run.png');  // Running sprite
}

function setup() {
  createCanvas(400, 400);
  plateSpeedX = 2;
  plateSpeedY = 2;

  // Initialize syrup toggle time
  lastSyrupToggleTime = millis();

  // Set the random starting direction and speed for the plate
  randomizePlateMovement();
}

function draw() {
  let currentMillis = millis();
  
  // Toggle syrup visibility at a fixed interval
  if (currentMillis - lastSyrupToggleTime > syrupToggleInterval) {
    syrupVisible = !syrupVisible;
    lastSyrupToggleTime = currentMillis; // Reset the last toggle time
  }

  image(woodBackground, 0, 0, width, height);  
  image(plate, plateX, plateY, plateWidth, plateHeight);
  
  // Draw food items (only if they are visible)
  drawWaffle();
  if (syrupVisible && foodVisible) {
    drawSyrup();
  }

  // Create a new chicken on 'e' key press
  if (keyIsPressed && key === 'e') {
    chickens.push(new Chicken());
  }

  for (let i = 0; i < chickens.length; i++) {
    chickens[i].display();
    chickens[i].update();
  }

  // Plate movement: Randomly stop and start
  if (!pauseMovement) {
    plateX += plateSpeedX;
    plateY += plateSpeedY;

    // Handle plate hitting the screen bounds
    if (plateX + plateWidth > width || plateX < 0) {
      plateSpeedX = -plateSpeedX;
    }

    if (plateY + plateHeight > height || plateY < 0) {
      plateSpeedY = -plateSpeedY;
    }
  } else {
    // Wait for the resume time to pass before resuming
    if (millis() - lastPauseTime > resumeTime) {
      pauseMovement = false;
      randomizePlateMovement(); // Randomize speed and direction when movement resumes
    }
  }

  // Check if it's time to pause the plate movement randomly
  if (random(1) < 0.01) {  // 1% chance to pause the movement each frame
    pauseMovement = true;
    lastPauseTime = millis(); // Set the time when pause starts
  }

  // Animate the sprite (toggling between standing and running)
  if (spriteFrame === 0) {
    image(standSprite, spriteX, height - 60, 80, 80);  // Standing sprite
  } else {
    image(runSprite, spriteX, height - 60, 80, 80);  // Running sprite
  }

  if (frameCount % 20 === 0) {
    spriteFrame = (spriteFrame + 1) % 2;  // Toggle between 0 and 1
  }

  spriteX += spriteSpeed * spriteDirection;

  if (spriteX > width) {
    spriteX = -80;
  }

  fill(36, 18, 0);
  textFont(customFont);
  textSize(38);
  text("Chicken N' Waffles", 10, 35);

  textSize(22);
  text("Mason Rusek", width - 105, height - 10);

  // Collision detection between sprite and plate
  if (checkCollision(spriteX, height - 60, 80, 80, plateX, plateY, plateWidth, plateHeight)) {
    // If collision happens, set foodVisible to false to "remove" the food
    foodVisible = false;
  }
}

// Check for collision between the sprite and plate
function checkCollision(spriteX, spriteY, spriteWidth, spriteHeight, plateX, plateY, plateWidth, plateHeight) {
  return spriteX + spriteWidth > plateX && 
         spriteX < plateX + plateWidth &&
         spriteY + spriteHeight > plateY && 
         spriteY < plateY + plateHeight;
}

function drawWaffle() {
  // Set up waffle color and shape
  fill(227, 178, 65);
  stroke(180, 120, 40);
  strokeWeight(4);
  rectMode(CENTER);
  rect(plateX + plateWidth / 2, plateY + plateHeight / 2, 150, 150, 10);

  stroke(180, 120, 40);
  for (let i = -2; i <= 2; i++) {
    line(plateX + plateWidth / 2 - 75, plateY + plateHeight / 2 + i * 30, plateX + plateWidth / 2 + 75, plateY + plateHeight / 2 + i * 30);
    line(plateX + plateWidth / 2 + i * 30, plateY + plateHeight / 2 - 75, plateX + plateWidth / 2 + i * 30, plateY + plateHeight / 2 + 75);
  }
}

function drawSyrup() {
  // Set up syrup color and shape
  noStroke();
  fill(139, 69, 19, 200);
  ellipse(plateX + plateWidth / 2, plateY + plateHeight / 2, 140, 100);
  ellipse(plateX + plateWidth / 2 + 40, plateY + plateHeight / 2 + 20, 70, 50);
  ellipse(plateX + plateWidth / 2 - 40, plateY + plateHeight / 2 - 20, 70, 50);
}

function randomizePlateMovement() {
  // Randomize the plate movement speed and direction
  plateSpeedX = random(1, 4) * (random() < 0.5 ? 1 : -1);
  plateSpeedY = random(1, 4) * (random() < 0.5 ? 1 : -1);
}