// Start positions for interactive parts
let porkX = 400, porkY = 300;
let seaweedX1 = 300, seaweedY1 = 290;
let seaweedX2 = 480, seaweedY2 = 290;
let eggX1 = 330, eggY1 = 350, eggX2 = 470, eggY2 = 350;

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(240);
  
  // Counter
  fill(200);
  rect(0, 450, width, 150);

  // Drop Shadow
  fill(0, 0, 0, 50);
  ellipse(400, 440, 500, 50);

  // Bowl
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

  // Seaweed (repositioned on mouse click)
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

function mousePressed() {
    // Check if mouse is over Seaweed 1
    if (mouseX > seaweedX1 && mouseX < seaweedX1 + 20 && mouseY > seaweedY1 && mouseY < seaweedY1 + 70) {
      draggingSeaweed1 = true;
      // Calculate offset so the drag is smooth
      offsetX1 = mouseX - seaweedX1;
      offsetY1 = mouseY - seaweedY1;
    }
    // Check if mouse is over Seaweed 2
    if (mouseX > seaweedX2 && mouseX < seaweedX2 + 20 && mouseY > seaweedY2 && mouseY < seaweedY2 + 70) {
      draggingSeaweed2 = true;
      offsetX2 = mouseX - seaweedX2;
      offsetY2 = mouseY - seaweedY2;
    }
  }
  
  function mouseDragged() {
    // If dragging seaweed 1, update its position
    if (draggingSeaweed1) {
      seaweedX1 = mouseX - offsetX1;
      seaweedY1 = mouseY - offsetY1;
    }
    // If dragging seaweed 2, update its position
    if (draggingSeaweed2) {
      seaweedX2 = mouseX - offsetX2;
      seaweedY2 = mouseY - offsetY2;
    }
  }
  
  function mouseReleased() {
    // Stop dragging when the mouse is released
    draggingSeaweed1 = false;
    draggingSeaweed2 = false;
  }
