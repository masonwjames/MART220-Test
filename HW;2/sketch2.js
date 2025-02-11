// Start positions for interactive parts
let porkX = 400, porkY = 300;
let seaweedX1 = 300, seaweedY1 = 290;
let seaweedX2 = 480, seaweedY2 = 290;
let eggX1 = 330, eggY1 = 350, eggX2 = 470, eggY2 = 350;

// Variables for seaweed movement
let seaweedSpeed1X = 1, seaweedSpeed1Y = 0.5;
let seaweedSpeed2X = -1, seaweedSpeed2Y = 0.3;

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(173, 216, 230);

  // Draw dark line to separate background from counter
  stroke(80);
  strokeWeight(4);
  line(0, 450, width, 450);
  noStroke();

  // Counter
  fill(200);
  rect(0, 450, width, 150);

  // Shadow: cast from bowl onto counter (a more directional shadow)
  fill(0, 0, 0, 50);
  ellipse(400, 460, 500, 50);  // Adjust the Y position to make the shadow sit on the counter

  // Bowl (Now drawn after shadow)
  fill(50);
  ellipse(400, 400, 500, 200);
  fill(70);
  ellipse(400, 420, 470, 180);

  // Broth
  fill(255, 204, 153);
  ellipse(400, 380, 440, 160);

  // Noodles
  stroke(255, 228, 181);
  strokeWeight(2);
  noFill();
  for (let i = 320; i <= 480; i += 20) {
    arc(400, 380, 400, 140, radians(200), radians(340));
  }
  noStroke();

  // Eggs
  fill(255, 255, 200);
  ellipse(eggX1, eggY1, 60, 40);
  ellipse(eggX2, eggY2, 60, 40);
  fill(255, 204, 0);
  ellipse(eggX1, eggY1, 30, 20);
  ellipse(eggX2, eggY2, 30, 20);

  // Pork (moves with arrow keys)
  fill(210, 105, 60);
  ellipse(porkX, porkY, 80, 40);
  ellipse(porkX - 30, porkY + 30, 80, 40);
  fill(160, 82, 45);
  ellipse(porkX, porkY, 40, 20);
  ellipse(porkX - 30, porkY + 30, 40, 20);

  // Seaweed (moves randomly with smooth but not erratic motion)
  seaweedX1 += seaweedSpeed1X;
  seaweedY1 += seaweedSpeed1Y;
  seaweedX2 += seaweedSpeed2X;
  seaweedY2 += seaweedSpeed2Y;

  // Add constraints to keep the seaweed inside the bowl
  if (seaweedX1 < 250 || seaweedX1 > 350) seaweedSpeed1X *= -1;
  if (seaweedY1 < 240 || seaweedY1 > 320) seaweedSpeed1Y *= -1;
  
  if (seaweedX2 < 430 || seaweedX2 > 530) seaweedSpeed2X *= -1;
  if (seaweedY2 < 240 || seaweedY2 > 320) seaweedSpeed2Y *= -1;

  // Draw seaweed
  fill(34, 139, 34);
  rect(seaweedX1, seaweedY1, 20, 70, 5);
  rect(seaweedX2, seaweedY2, 20, 70, 5);

  // Fish Cake
  fill(255);
  ellipse(400, 350, 50, 50);
  fill(255, 105, 180);
  ellipse(400, 350, 25, 25);

  // Title
  fill(0);
  // Title in the upper-left
  textSize(20);
  textAlign(LEFT, TOP);
  text("RAMEN BOWL WITH ITERATION", 10, 10);
  
  // Name
  textSize(12);
  textAlign(RIGHT, BOTTOM);
  text("MASON RUSEK", width - 10, height - 10);
}

function keyPressed() {
  // arrow keys to move the pork slices
  if (keyCode === LEFT_ARROW) porkX -= 10;
  else if (keyCode === RIGHT_ARROW) porkX += 10;
  else if (keyCode === UP_ARROW) porkY -= 10;
  else if (keyCode === DOWN_ARROW) porkY += 10;
}