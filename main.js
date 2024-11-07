const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let dot = {
    x: 100,
    y: 300,
    radius: 10,
    velocityY: 0,
};

const spirals = [];
const spiralDistance = 150;
const spiralWidth = 30;
const spiralGap = 100;
let gameSpeed = 2;
let isGameOver = false;


function createSpiral() {
    const angle = Math.random() * 360;
    //spawning the spiral a bit on left so they can be visible
    const x = canvas.width + 50; 
    // spawning the spirals on 150 pixels from the center
    const y = canvas.height / 2 + Math.sin(angle) * spiralDistance; 
    spirals.push({ x, y, angle });
}

function update() {
    if (isGameOver) return;

    //constantly increasing the velocity to imitate gravity
    dot.velocityY += 0.5; 
    dot.y += dot.velocityY;

    if (Math.random() < 0.02) {
        createSpiral();
    }

    for (let spiral of spirals) {
        spiral.x -= gameSpeed;
    }

    if (spirals.length > 0 && spirals[0].x < -50) {
        spirals.shift();
    }

    for (let spiral of spirals) {
        const dx = dot.x - spiral.x;
        const dy = dot.y - spiral.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < dot.radius + spiralWidth) {
            isGameOver = true;
            break;
        }
    }

   // if the player's y coordinates are bigger than the canvas 
   // and less than zero the game ends
    if (dot.y + dot.radius > canvas.height || dot.y < 0) {
        isGameOver = true;
    }

    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    for (let spiral of spirals) {
        ctx.beginPath();
        ctx.arc(spiral.x, spiral.y, spiralWidth, 0, Math.PI * 2); 
        ctx.fillStyle = 'white';
        ctx.fill();
    }

    
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();

    
    if (isGameOver) {
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 70, canvas.height / 2);
    }
}

function flap() {
    if (!isGameOver) {
        dot.velocityY = -8; 
    } else {
        resetGame(); 
    }
}

function resetGame() {
    dot.y = canvas.height / 2;
    dot.velocityY = 0;
    spirals.length = 0;
    isGameOver = false;
}


document.addEventListener('keydown', flap);

// Main game loop
function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();




















