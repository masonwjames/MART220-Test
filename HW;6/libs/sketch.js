let plate, woodBackground, chicken;
let plateX = 100, plateY = 100;
let plateWidth = 150, plateHeight = 150;
let chickenWidth = 100, chickenHeight = 80;
let plateSpeed = 2;
let plateSpeedX, plateSpeedY;
let chickens = [];
let pauseMovement = false;
let lastPauseTime = 0;
let resumeTime = 250;

let customFont;

let spriteX = 0;
let spriteY = 340;
let spriteSpeed = 6;
let spriteDirection = 1;
let spriteFrame = 0;
let runSprite;
let standSprite;

let spriteScale = 1;
let maxSpriteScale = 1.5;

let foodEaten = false;
let syrupEaten = false;
let waffleEaten = false;

let spriteCanMove = true;

let score = 0;
let timer = 30 * 1000; // Timer starts at 30 seconds in milliseconds
let avoidanceStartTime = 0;

class Chicken {
  constructor() {
    this.x = plateX + plateWidth / 2 - chickenWidth / 2;
    this.y = plateY + plateHeight / 2 - chickenHeight / 2;
  }

  display() {
    if (!foodEaten) {
      image(chicken, this.x, this.y, chickenWidth, chickenHeight);
    }
  }

  update() {
    if (!foodEaten) {
      this.x = plateX + plateWidth / 2 - chickenWidth / 2;
      this.y = plateY + plateHeight / 2 - chickenHeight / 2;
    }
  }
}

function preload() {
  chicken = loadImage('images/chicken.png');
  plate = loadImage('images/plate.png');
  woodBackground = loadImage('images/wood.jpg');
  customFont = loadFont('fonts/bronco.ttf');

  standSprite = loadImage('images/stand.png');
  runSprite = loadImage('images/run.png');
}

function setup() {
  createCanvas(400, 400);
  plateSpeedX = 2;
  plateSpeedY = 2;

  let newChicken = new Chicken();
  chickens.push(newChicken);

  randomizePlateMovement();
}

function draw() {
  let currentMillis = millis();

  image(woodBackground, 0, 0, width, height);  
  image(plate, plateX, plateY, plateWidth, plateHeight);

  if (!foodEaten) {
    drawWaffle();
    drawSyrup();
  }

  for (let i = 0; i < chickens.length; i++) {
    chickens[i].display();
    chickens[i].update();
  }

  if (!pauseMovement) {
    plateX += plateSpeedX;
    plateY += plateSpeedY;

    if (plateX + plateWidth > width || plateX < 0) {
      plateSpeedX = -plateSpeedX;
    }

    if (plateY + plateHeight > height || plateY < 0) {
      plateSpeedY = -plateSpeedY;
    }
  } else {
    if (millis() - lastPauseTime > resumeTime) {
      pauseMovement = false;
    }
  }

  let isMoving = (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW) || keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW)) && spriteCanMove;

  if (isMoving) {
    image(runSprite, spriteX, spriteY, 80 * spriteScale, 80 * spriteScale);
  } else {
    image(standSprite, spriteX, spriteY, 80 * spriteScale, 80 * spriteScale);
  }

  if (keyIsDown(LEFT_ARROW) && spriteCanMove) {
    spriteX -= spriteSpeed;
  }
  if (keyIsDown(RIGHT_ARROW) && spriteCanMove) {
    spriteX += spriteSpeed;
  }
  if (keyIsDown(UP_ARROW) && spriteCanMove) {
    spriteY -= spriteSpeed;
  }
  if (keyIsDown(DOWN_ARROW) && spriteCanMove) {
    spriteY += spriteSpeed;
  }

  spriteX = constrain(spriteX, 0, width - 80);
  spriteY = constrain(spriteY, 0, height - 80);

  // Collision detection with the plate
  if (!foodEaten && isColliding(spriteX, spriteY, 80 * spriteScale, 80 * spriteScale, plateX, plateY, plateWidth, plateHeight)) {
    foodEaten = true;
    syrupEaten = true;
    waffleEaten = true;
    pauseMovement = true;
    plateSpeedX = 0;
    plateSpeedY = 0;
    spriteCanMove = false;
    lastPauseTime = millis();

    // Stop the timer when collision occurs
    timer = -1; // Stop the timer by setting it to -1
    score -= 1;
  }

  if (millis() - avoidanceStartTime > 5000 && !foodEaten) {
    score++;
    avoidanceStartTime = millis();
  }

  // Timer countdown logic
  if (timer > 0 && score !== -1) {
    timer -= deltaTime; // Subtract the elapsed time
  }

  // Display title and score without shifting
  fill(36, 18, 0);
  textFont(customFont);
  textSize(38);
  textAlign(LEFT, TOP);
  text("Chicken N' Waffles", 10, 10);

  textSize(22);
  textAlign(RIGHT, BOTTOM);
  text("Mason Rusek", width - 10, height - 10);

  // Display score in top-right corner
  textSize(28);
  textAlign(RIGHT, TOP);
  text("Score: " + score, width - 10, 10);

  // Display timer in top-right corner if the timer is active
  if (timer > 0) {
    let secondsLeft = Math.ceil(timer / 1000); // Convert to seconds and round
    textSize(20);
    textAlign(RIGHT, TOP);
    fill(36, 18, 0); // Match the existing font color
    text("Time: " + secondsLeft, width - 10, 40); // Adjusted Y position to be below the score
  }

  // Game Over screen when score is -1
  if (score === -1) {
    fill(255, 0, 0);
    textSize(50);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text("GAME OVER", width / 2, height / 2);
  }
}

function drawWaffle() {
  if (!waffleEaten) {
    fill(227, 178, 65);
    stroke(180, 120, 40);
    strokeWeight(4);
    rectMode(CENTER);
    rect(plateX + plateWidth / 2, plateY + plateHeight / 2, 100, 100, 10);

    stroke(180, 120, 40);
    for (let i = -2; i <= 2; i++) {
      line(plateX + plateWidth / 2 - 50, plateY + plateHeight / 2 + i * 25, plateX + plateWidth / 2 + 50, plateY + plateHeight / 2 + i * 25);
      line(plateX + plateWidth / 2 + i * 25, plateY + plateHeight / 2 - 50, plateX + plateWidth / 2 + i * 25, plateY + plateHeight / 2 + 50);
    }
  }
}

function drawSyrup() {
  if (!syrupEaten) {
    noStroke();
    fill(139, 69, 19, 200);
    ellipse(plateX + plateWidth / 2, plateY + plateHeight / 2, 110, 80);
    ellipse(plateX + plateWidth / 2 + 30, plateY + plateHeight / 2 + 20, 50, 35);
    ellipse(plateX + plateWidth / 2 - 30, plateY + plateHeight / 2 - 20, 50, 35);
  }
}

function randomizePlateMovement() {
  plateSpeedX = random(1, 4) * (random() < 0.5 ? 1 : -1);
  plateSpeedY = random(1, 4) * (random() < 0.5 ? 1 : -1);
}

function isColliding(x1, y1, w1, h1, x2, y2, w2, h2) {
  return !(x1 + w1 < x2 || x1 > x2 + w2 || y1 + h1 < y2 || y1 > y2 + h2);
}

function keyPressed() {
  if (keyCode === ENTER && score !== -1) {
    resetGame();
  }
  if (keyCode === BACKSPACE && score === -1) {
    resetGame();
  }
}

function resetGame() {
  foodEaten = false;
  syrupEaten = false;
  waffleEaten = false;
  plateX = 100;
  plateY = 100;
  plateSpeedX = 2;
  plateSpeedY = 2;
  spriteX = 0;
  spriteY = 340;
  spriteCanMove = true;
  let newChicken = new Chicken();
  chickens = [newChicken];
  randomizePlateMovement();
  pauseMovement = false;
  timer = 30 * 1000;  // Reset timer to 30 seconds when starting a new round
  avoidanceStartTime = millis();  // Reset avoidance timer
  score = 0; // Reset score
}
