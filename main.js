let angle = 0;
let ballAngle = 0; // Angle for the ball's movement
let r = 500; // Increased initial radius for zoom effect
let prevX, prevY;
let isDrawing = true; // Flag to check if the line is still being drawn
const initialRadius = r; // Store the initial radius

// Ball bouncing variables
let ballX, ballY; // Ball's position
let ballVelocityX = 2; // Horizontal velocity
let ballVelocityY = 2; // Vertical velocity
let ballSize = 5; // Size of the ball

function setup() {
  createCanvas(800, 800);
  background(0);
  translate(400, 400);
  
  // Initialize the starting position at the center of the canvas
  prevX = r * cos(angle);
  prevY = r * sin(angle);
  
  // Set the initial position of the ball
  ballX = initialRadius * cos(ballAngle);
  ballY = initialRadius * sin(ballAngle);
}

function draw() {
  translate(400, 400);
  strokeWeight(4);
  stroke(252, 238, 33);
  
  // Calculate the current position for the spiral
  let x = r * cos(angle);
  let y = r * sin(angle);
  
  // Draw a line from the previous point to the current point
  if (isDrawing) {
    line(prevX, prevY, x, y);
    
    // Update previous position to current for the next frame
    prevX = x;
    prevY = y;

    // Check if we should stop drawing
    if (r <= 0) {
      isDrawing = false; // Stop drawing when radius is too small
      noLoop(); // Stop the draw loop
    }
  }

  // Draw the moving white ball (dot) in the opposite direction
  if (!isDrawing) { // Start moving the ball after the line stops drawing
    // Update ball position based on velocity
    ballX += ballVelocityX;
    ballY += ballVelocityY;

    // Check for collision with canvas boundaries
    if (ballX > width / 2 - ballSize / 2 || ballX < -width / 2 + ballSize / 2) {
      ballVelocityX *= -1; // Reverse horizontal direction
    }
    if (ballY > height / 2 - ballSize / 2 || ballY < -height / 2 + ballSize / 2) {
      ballVelocityY *= -1; // Reverse vertical direction
    }

    // Draw the ball
    fill(255); // Set fill color to white
    noStroke(); // No outline for the ball
    ellipse(-10, -5, ballSize, ballSize); // Draw the ball
  }

  // Slower increase in angle and smaller radius reduction for a tighter, longer spiral
  angle += 0.05;
  r -= 0.5;
}

function mousePressed() {
  // Make the ball bounce by reversing its velocity
  ballVelocityX *= -1;
  ballVelocityY *= -1;
}




