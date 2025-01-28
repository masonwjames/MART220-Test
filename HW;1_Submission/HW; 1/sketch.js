function setup() {
    createCanvas(800, 600);
    background(240); // Background
  
    noStroke();
  
    // Counter
    drawCounter();
  
    // Drop Shadow
    drawDropShadow();
  
    // Bowl
    drawBowl();
  
    // Draw Ingredients
    drawBroth();
    drawNoodles();
    drawEggs();
    drawPork();
    drawSeaweed();
    drawCake();
  }
  
  function drawCounter() {
    fill(200); // Light Grey Counter
    rect(0, 450, width, 150);
  }
  
  function drawDropShadow() {
    fill(0, 0, 0, 50); // Transparent Black 
    ellipse(400, 440, 500, 50);
  }
  
  function drawBowl() {
    fill(50); // Dark Grey Bowl
    ellipse(400, 400, 500, 200); // Outer Bowl
    fill(70);
    ellipse(400, 420, 470, 180); // Bowl Rim
  }
  
  function drawBroth() {
    fill(255, 204, 153); // Broth
    ellipse(400, 380, 440, 160);
  }
  
  function drawNoodles() {
    stroke(255, 228, 181); // Noodles
    strokeWeight(2);
    noFill();
    for (let i = 320; i <= 480; i += 20) {
      arc(400, 380, 400, 140, radians(200), radians(340));
    }
    noStroke(); // Lift Pen
  }
  
  function drawEggs() {
    fill(255, 255, 200); // Egg White
    ellipse(330, 350, 60, 40); // Egg 1
    ellipse(470, 350, 60, 40); // Egg 2
    fill(255, 204, 0); // Yolk
    ellipse(330, 350, 30, 20);
    ellipse(470, 350, 30, 20);
  }
  
  function drawPork() {
    fill(210, 105, 60); // Brownish-Pink
    ellipse(400, 300, 80, 40); // Pork 1
    ellipse(370, 330, 80, 40); // Pork 2
    fill(160, 82, 45); // Swirl
    ellipse(400, 300, 40, 20);
    ellipse(370, 330, 40, 20);
  }
  
  function drawSeaweed() {
    fill(34, 139, 34); // Green
    rect(300, 290, 20, 70, 5); // Seaweed 1
    rect(480, 290, 20, 70, 5); // Seaweed 2
  }
  
  function drawCake() {
    fill(255); // White Base
  ellipse(400, 350, 50, 50);
  
  fill(255, 105, 180); // Pink Inner Circle
  ellipse(400, 350, 25, 25);
}