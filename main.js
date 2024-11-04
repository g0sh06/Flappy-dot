class Spiral {
  constructor() {
    this.angle = 0;
    this.r = 250;
    this.prevX = this.r * cos(this.angle);
    this.prevY = this.r * sin(this.angle);
    this.isDrawing = true;
    this.SPIRAL_COLOR = [252, 238, 33];
    this.INITIAL_RADIUS = this.r;
    this.SPIRAL_DECREASE_RATE = 0.2;
    this.ANGLE_INCREMENT = 0.02;
    this.finalX = 0;
    this.finalY = 0;
  }

  draw() {
    if (this.isDrawing) {
      this.drawSpiral();
    }
  }

  drawSpiral() {
    stroke(this.SPIRAL_COLOR);
    strokeWeight(2);
    let x = this.r * cos(this.angle);
    let y = this.r * sin(this.angle);
    line(this.prevX, this.prevY, x, y);
    
    this.prevX = x;
    this.prevY = y;

    this.angle += this.ANGLE_INCREMENT;
    this.r -= this.SPIRAL_DECREASE_RATE;

    if (this.r <= 0) {
      this.isDrawing = false;
      this.finalX = x;
      this.finalY = y;
    }
  }
}

class Dot {
  constructor() {
    this.x = -10;
    this.y = 10;
    this.SPIRAL_COLOR = [255, 255, 255];
    this.POINT_RADIUS = 5;
    this.jumping = false;
    this.jumpHeight = 10;
    this.gravity = 0.5;
    this.velocity = 0;
    this.initialY = this.y;
  }

  draw() {
    fill(this.SPIRAL_COLOR);
    noStroke();
    circle(this.x, this.y, this.POINT_RADIUS);
    
    // Apply gravity to the dot's vertical movement
    this.velocity += this.gravity;
    this.y += this.velocity;

    // If the dot reaches the initial Y position
    if (this.y >= this.initialY) {
      this.y = this.initialY;
      this.velocity = 0;
      this.jumping = false;
    }
  }

  jump() {
    if (!this.jumping) {
      this.velocity -= this.jumpHeight; // Apply an initial upward velocity
      this.jumping = true; // Set jumping state to true
    }
  }

  resetPosition(finalX, finalY) {
    this.x = finalX - 10; // Set final position slightly left
    this.y = finalY + 10; // Set final position slightly down
  }
}

let spiral;
let dot;

function setup() {
  createCanvas(800, 800);
  spiral = new Spiral();
  dot = new Dot();
}

function draw() {
  background(0); // Clear the background each frame
  translate(width / 2, height / 2);
  scale(2.75);

  spiral.draw();

  if (!spiral.isDrawing) {
    dot.resetPosition(spiral.finalX, spiral.finalY); // Update dot's position after spiral finishes
  }
  
  dot.draw();
}

function keyPressed() {
  if (key === ' ') {
    dot.jump(); // Make the dot jump when the spacebar is pressed
  }
}



















