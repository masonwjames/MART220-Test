// Define two pepperoni objects
let pepperoni1 = { x: 350, y: 300, r: 20 }; // static pepperoni
let pepperoni2 = { x: 450, y: 320, r: 20 }; // this pepperoni will move randomly

function setup() {
  createCanvas(800, 600);
  angleMode(DEGREES);
}

function draw() {
  background(240);
  
  // Draw table surface at the bottom
  fill(200);
  rect(0, 500, width, 100);
  
  // Draw Pizza Base (centered on canvas)
  push();
  translate(width / 2, height / 2);
  
  // Crust
  noStroke();
  fill(210, 180, 140);
  ellipse(0, 0, 400, 400);
  
  // Sauce
  fill(220, 20, 60);
  ellipse(0, 0, 360, 360);
  
  // Cheese texture (overlapping yellow ellipses)
  fill(255, 215, 0, 200);
  for (let i = 0; i < 8; i++) {
    let angle = i * 45;
    let x = 50 * cos(angle);
    let y = 50 * sin(angle);
    ellipse(x, y, 120, 80);
  }
  pop();
  
  // Draw static pepperoni
  drawPepperoni(pepperoni1);
  
  // Update pepperoni2 with a random walk movement
  pepperoni2.x += random(-2, 2);
  pepperoni2.y += random(-2, 2);
  
  // Constrain pepperoni2 to remain within the pizza area
  let centerX = width / 2;
  let centerY = height / 2;
  let margin = 180; // roughly half the sauce ellipse size
  pepperoni2.x = constrain(pepperoni2.x, centerX - margin, centerX + margin);
  pepperoni2.y = constrain(pepperoni2.y, centerY - margin, centerY + margin);
  
  // Draw moving pepperoni
  drawPepperoni(pepperoni2);
  
  // Draw Title in the upper-left
  textAlign(LEFT, TOP);
  fill(0);
  textSize(20);
  text("Pizza Party", 10, 10);
  
  // Draw my Name in the lower-right
  textAlign(RIGHT, BOTTOM);
  textSize(12);
  text("ChatGPT", width - 10, height - 10);
}

function drawPepperoni(p) {
  fill(139, 0, 0);
  stroke(100);
  strokeWeight(1);
  ellipse(p.x, p.y, p.r * 2, p.r * 2);
}