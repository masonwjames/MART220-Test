function setup() {
    createCanvas(400, 400);
    noLoop();
  }
  
  function draw() {
    background(220);
  
    // Draw bottom bun
    fill(222, 184, 135);
    ellipse(200, 300, 200, 60);
  
    // Draw lettuce
    fill(50, 205, 50);
    ellipse(200, 270, 180, 40);
  
    // Draw tomato
    fill(255, 69, 0);
    ellipse(200, 250, 160, 30);
  
    // Draw patty
    fill(139, 69, 19);
    rect(120, 230, 160, 40, 10);
  
    // Draw cheese
    fill(255, 204, 0);
    quad(130, 230, 270, 230, 230, 210, 170, 210);
  
    // Draw top bun
    fill(222, 184, 135);
    arc(200, 200, 200, 100, PI, 0, CHORD);
  
    // Add sesame seeds
    fill(255);
    for (let i = 0; i < 10; i++) {
      let x = random(150, 250);
      let y = random(160, 190);
      ellipse(x, y, 10, 5);
    }
  }