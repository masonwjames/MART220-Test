// Start positions for interaction
let porkX = 400, porkY = 300;
let seaweedX1 = 375, seaweedY1 = 350;
let seaweedX2 = 425, seaweedY2 = 350;
let eggX1 = 330, eggY1 = 350, eggX2 = 470, eggY2 = 350;
let eggAnimationX1 = 0, eggAnimationX2 = 0;
let porkAnimationX = 0, porkAnimationY = 0;
let seaweedAnimationX1 = 0, seaweedAnimationY1 = 0;
let seaweedAnimationX2 = 0, seaweedAnimationY2 = 0;
let fishCakeX = 400, fishCakeY = 330;

// Variables for images
let img1, img2, img3;

// Timer variables for movement
let timerRamen = 0;
let timerChopsticks = 0;
let ramenDirection = 1; 
let chopsticksDirection = 1; 

function preload() {
  // Load images from folder
  img1 = loadImage('images/ramen.png');  
  img2 = loadImage('images/chopsticks.png'); 
  img3 = loadImage('images/ai.png');
}

function setup() {
  createCanvas(800, 600);
  textFont('Pacifico');
}

function draw() {
  background(30, 50, 80); // Navy background

  // Update timer 
  timerRamen += deltaTime;
  timerChopsticks += deltaTime;

  // Movement timing 
  if (timerRamen >= 500) { //(0.5 second)
    ramenDirection *= -1; // Reverse
    timerRamen = 0; // Reset
  }

  // Movement timing
  if (timerChopsticks >= 600) { // (0.6 second)
    chopsticksDirection *= -1; // Reverse
    timerChopsticks = 0; // Reset
  }

  // Draw the bowl (center of the images)
  fill(50);
  ellipse(400, 400, 500, 200); 
  fill(70);
  ellipse(400, 420, 470, 180); 
  
   // Image 1 moves back and forth with timer
   image(img1, 50 + ramenDirection * 10, 150, 200, 200);  

   // Image 2 moves back and forth with timer
   image(img2, 550 + chopsticksDirection * 10, 175, 150, 150);  

  // Image background color)
fill(209, 161, 77);
stroke(255);  
strokeWeight(2);

// Draw image background
rect(290, 60, 220, 220, 20);  

// Draw the AI image on top 
image(img3, 300, 75, 200, 200);  


  // Draw dark line to separate background from counter
  stroke(80);
  strokeWeight(4);
  line(0, 450, width, 450);
  noStroke();

  // Counter
  fill(200);
  rect(0, 450, width, 150);

  // Shadow
  fill(0, 0, 0, 50);
  ellipse(400, 460, 500, 50);  

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

  // Eggs (animate slowly)
  fill(255, 255, 200);
  eggAnimationX1 = sin(frameCount * 0.02) * 5; // Animate egg 1 back and forth
  eggAnimationX2 = sin(frameCount * 0.02) * -5; // Animate egg 2 back and forth
  
  // Egg 1
  push();
  translate(eggX1 + eggAnimationX1, eggY1);
  rotate(radians(-10)); 
  ellipse(0, 0, 60, 40);
  pop();
  
  // Egg 2
  push();
  translate(eggX2 + eggAnimationX2, eggY2);
  rotate(radians(10)); 
  ellipse(0, 0, 60, 40);
  pop();
  
  fill(255, 204, 0);
  // Egg yolks
  push();
  translate(eggX1 + eggAnimationX1, eggY1);
  rotate(radians(-10)); 
  ellipse(0, 0, 30, 20);
  pop();
  push();
  translate(eggX2 + eggAnimationX2, eggY2);
  rotate(radians(10)); 
  ellipse(0, 0, 30, 20);
  pop();

  // Pork 
  fill(210, 105, 60);
  porkAnimationX = sin(frameCount * 0.02) * 10; 
  porkAnimationY = cos(frameCount * 0.02) * 10; 
  
  push();
  translate(400 + porkAnimationX, 350 + porkAnimationY); // Center around eggs and fish cake
  rotate(radians(-10)); // Rotate to angle it
  ellipse(0, 0, 80, 40);
  ellipse(-30, 30, 80, 40);
  pop();
  
  fill(160, 82, 45);
  push();
  translate(400 + porkAnimationX, 350 + porkAnimationY); // Center around eggs and fish cake
  rotate(radians(-10)); 
  ellipse(0, 0, 40, 20);
  ellipse(-30, 30, 40, 20);
  pop();

  // Seaweed 1 
  fill(34, 139, 34);
  seaweedAnimationX1 = sin(frameCount * 0.03) * 15; 
  seaweedAnimationY1 = cos(frameCount * 0.03) * 15; 
  
  push();
  translate(seaweedX1 + seaweedAnimationX1, seaweedY1 + seaweedAnimationY1);
  rotate(radians(30)); // Skew the orientation
  rect(0, 0, 60, 20, 5); 
  pop();
  
  // Seaweed 2 
  seaweedAnimationX2 = sin(frameCount * 0.04) * 15; 
  seaweedAnimationY2 = cos(frameCount * 0.04) * 15; 
  
  push();
  translate(seaweedX2 + seaweedAnimationX2, seaweedY2 + seaweedAnimationY2);
  rotate(radians(-30)); // Skew the orientation
  rect(0, 0, 60, 20, 5); 
  pop();

  // Fish Cake 
  fill(255);
  ellipse(fishCakeX, fishCakeY, 50, 50);
  fill(255, 105, 180);
  ellipse(fishCakeX, fishCakeY, 25, 25);

  // Title with outline
  textFont("Pacifico");
  textSize(48);
  fill(209, 161, 77);  
  stroke(255);  
  strokeWeight(2); 
  textAlign(LEFT, TOP);
  text("RAMEN BOWL", 10, 10);

  // Name with outline
  textSize(20);
  textAlign(RIGHT, BOTTOM);
  text("MASON RUSEK", width - 10, height - 10);
}