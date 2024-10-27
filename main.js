let angle = 0;
let r = 500; // Initial radius for spiral effect
let prevX, prevY;
let isDrawing = true; // Flag to track line drawing status
let zoom = 2.5; // Zoom level

function setup() {
  createCanvas(800, 800);
  background(0);
  
  // Initial starting position for the line
  prevX = r * cos(angle);
  prevY = r * sin(angle);
}

function draw() {
  background(0, 10); // Adds fading effect
  
  translate(400, 400); // Center of canvas
  strokeWeight(4);
  stroke(252, 238, 33); // Yellow color

  if (isDrawing) {
    // Calculate the next point on the spiral
    let x = r * cos(angle);
    let y = r * sin(angle);
    
    // Draw a line segment for the spiral
    line(prevX, prevY, x, y);
    
    // Update previous point for next line segment
    prevX = x;
    prevY = y;

    // Stop drawing when radius becomes too small
    if (r <= 0) {
      isDrawing = false; // Stop drawing the spiral line
      noLoop(); // Stop `draw()` loop
    }
  } else {
    // Draw the bouncing point when the line stops drawing
    let bounceX = r * cos(-angle);
    let bounceY = r * sin(-angle);
    strokeWeight(16);
    point(bounceX, bounceY); // Draw the point in the spiral's opposite direction
    
    // Reverse the direction of the angle increment when left mouse button is held down
    if (mouseIsPressed && mouseButton === LEFT) {
      angle -= 0.05; // Reverse angle direction
    } else {
      angle += 0.05; // Normal angle increment
    }
  }

  // Spiral angle and radius adjustments
  angle += 0.05;
  r -= random(-2, 2); // Random variation in radius
}






