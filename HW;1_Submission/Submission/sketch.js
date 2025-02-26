function setup() {
  createCanvas(400, 400);
  background(240);
}

function draw() {
  background(240);
  
  // Plate Outer Edge
  fill(255);
  stroke(200);
  strokeWeight(4);
  ellipse(width / 2, height / 2, 300, 300);
  
  // Plate Inner Edge (Lip)
  noFill();
  stroke(180);
  strokeWeight(2);
  ellipse(width / 2, height / 2, 270, 270);
  
  // Waffle
  fill(227, 178, 65);
  stroke(180, 120, 40);
  rectMode(CENTER);
  rect(width / 2, height / 2, 150, 150, 10);
  
  // Waffle Grid
  stroke(180, 120, 40);
  strokeWeight(4);
  for (let i = -2; i <= 2; i++) {
    line(width / 2 - 75, height / 2 + i * 30, width / 2 + 75, height / 2 + i * 30);
    line(width / 2 + i * 30, height / 2 - 75, width / 2 + i * 30, height / 2 + 75);
  }
  
  // Syrup Drizzle (Larger but staying within waffle boundaries)
  noStroke();
  fill(139, 69, 19, 200);
  ellipse(width / 2, height / 2, 130, 90);      // Main syrup blob
  ellipse(width / 2 + 30, height / 2 + 20, 70, 50);  // Side syrup blob
  ellipse(width / 2 - 30, height / 2 - 20, 65, 45);  // Side syrup blob
  
  // Chicken Pieces (Moved slightly upward for better centering on syrup)
  fill(194, 126, 70);
  stroke(150, 100, 50);
  strokeWeight(2);
  ellipse(width / 2, height / 2 - 10, 80, 50);  // Top chicken piece (shifted up)
  ellipse(width / 2, height / 2 + 20, 70, 40);  // Bottom chicken piece (shifted up slightly)
}