let angle = 0;
let r = 500; // Initial radius for the spiral drawing
let prevX, prevY;
let isDrawing = true; // Flag to check if the line is still being drawn
const initialRadius = r; // Store the initial radius

function setup() {
  createCanvas(800, 800);
  background(0);

  // Calculate the initial position for the spiral
  prevX = r * cos(angle);
  prevY = r * sin(angle);
}

function draw() {
  translate(400, 400);
  strokeWeight(4);
  stroke(252, 238, 33); // Yellow color for spiral and point

  // Calculate the current position for the spiral
  let x = r * cos(angle);
  let y = r * sin(angle);

  // Draw the spiral line while isDrawing is true
  if (isDrawing) {
    line(prevX, prevY, x, y);
    
    // Update the previous position for the next frame
    prevX = x;
    prevY = y;

    // Reduce radius and increase angle for the spiral
    angle += 0.10;
    r -= 0.5;

    // Stop drawing the spiral when the radius becomes too small
    if (r <= 0) {
      isDrawing = false; // Stop drawing the line
      r = 150; // Reset radius for the point's circular motion
      angle = 0; // Reset angle for smoother point movement
    }
  } else {
    // When the spiral stops, the bouncing point starts in the opposite direction
    strokeWeight(16); // Thicker stroke for the point

    // Move the point only when the left mouse button is not pressed
    if (!(mouseIsPressed && mouseButton === LEFT)) {
      // Calculate the position in the opposite direction of the spiral
      let bounceX = r * cos(angle) - 10; // 10 pixels left from the end position
      let bounceY = r * sin(angle) - 5;   // 5 pixels down from the end position

      circle(bounceX, bounceY, 50); // Draw the point

      // Update the angle and radius for the next frame
      angle -= 0.05; // Negative angle increment for opposite movement
      r -= 0.5; // Subtle radius adjustment
    }
  }
}









