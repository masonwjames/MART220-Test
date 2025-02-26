let chickenX = 0;
let chickenY = 0;
let chickenSizeTop = 80;  // Starting size for the top chicken piece
let chickenSizeBottom = 70;  // Starting size for the bottom chicken piece

let plateSize = 300;  // Starting size for the plate
let plateX, plateY;  // Position of the plate
let plateSpeed = 0.5;  // Speed of plate movement
let plateSizeSpeed = 0.05;  // Speed of plate resizing
let minPlateSize = 250;  // Minimum size of the plate (ensures waffle fits)
let maxPlateSize = 350;  // Maximum size for the plate

let plateSpeedX, plateSpeedY;  // Velocity of plate movement
let clickCount = 0;  // Track the number of times the E key is pressed

function setup() {
  createCanvas(400, 400);
  noFill();
  
  // Initial position for chicken and plate
  chickenX = width / 2;
  chickenY = height / 2;
  plateX = width / 2;
  plateY = height / 2;
  plateSpeedX = random(-plateSpeed, plateSpeed);
  plateSpeedY = random(-plateSpeed, plateSpeed);
}

function randomPlateSizeChange() {
  // Gradually adjust the plate size randomly within its limits
  plateSize += random(-1, 1);  // Randomly change size slightly
  plateSize = constrain(plateSize, minPlateSize, maxPlateSize);  // Keep within size limits
}

function smoothPlateMovement() {
  // Smooth random movement for the plate
  plateX += plateSpeedX;
  plateY += plateSpeedY;

  // Constrain the plate position to keep it inside the canvas
  plateX = constrain(plateX, plateSize / 2, width - plateSize / 2);
  plateY = constrain(plateY, plateSize / 2, height - plateSize / 2);

  // Randomize the movement directions smoothly over time
  if (frameCount % 60 === 0) {  // Change direction every 60 frames for smoother randomness
    plateSpeedX = random(-plateSpeed, plateSpeed);
    plateSpeedY = random(-plateSpeed, plateSpeed);
  }
}

function draw() {
  background(240); // Clear the canvas every frame to avoid marks

  // Randomly change plate size and position
  randomPlateSizeChange();
  smoothPlateMovement();

  // Plate Outer Edge
  fill(255);
  stroke(200);
  strokeWeight(4);
  ellipse(plateX, plateY, plateSize, plateSize);  // Draw plate with dynamic size
  
  // Plate Inner Edge (Lip)
  noFill();
  stroke(180);
  strokeWeight(2);
  ellipse(plateX, plateY, plateSize - 30, plateSize - 30);
  
  // Waffle
  fill(227, 178, 65);
  stroke(180, 120, 40);
  rectMode(CENTER);
  rect(plateX, plateY, 150, 150, 10);
  
  // Waffle Grid
  stroke(180, 120, 40);
  strokeWeight(4);
  for (let i = -2; i <= 2; i++) {
    line(plateX - 75, plateY + i * 30, plateX + 75, plateY + i * 30);
    line(plateX + i * 30, plateY - 75, plateX + i * 30, plateY + 75);
  }
  
  // Syrup Drizzle (Larger but staying within waffle boundaries)
  noStroke();
  fill(139, 69, 19, 200);
  ellipse(plateX, plateY, 130, 90);      // Main syrup blob
  ellipse(plateX + 30, plateY + 20, 70, 50);  // Side syrup blob
  ellipse(plateX - 30, plateY - 20, 65, 45);  // Side syrup blob
  
  // Chicken Pieces (Move with plate)
  if (clickCount < 4) {  // Chicken will disappear after 4 presses of the 'E' key
    fill(194, 126, 70);
    stroke(150, 100, 50);
    strokeWeight(2);

    // Draw chicken pieces centered around the plate
    ellipse(plateX, plateY - 10, chickenSizeTop, chickenSizeBottom);  // Top chicken piece
    ellipse(plateX, plateY + 20, chickenSizeTop * 0.9, chickenSizeBottom * 0.9);  // Bottom chicken piece
  }
  
  // Title in upper-left corner
  stroke(90, 60, 20); // Darker border color
  strokeWeight(1); // Thinner strokeee
  textSize(24);
  textFont('Arial');
  text("Chicken & Waffles", 15, 32);
  
  // Your name in lower-right corner
  textSize(16);
  text("Mason Rusek", width - 114, height - 15);
}

function keyPressed() {
  if (key === 'e' || key === 'E') {
    if (clickCount < 4) {
      // Shrink chicken size gradually when 'E' key is pressed
      chickenSizeTop *= 0.95;
      chickenSizeBottom *= 0.95;
      clickCount++;  // Track the number of presses
    }
  }
}