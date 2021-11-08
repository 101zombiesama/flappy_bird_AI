const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 700;
canvas.height = 700;

var frameNumber = 0;

function resetCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

let birds = [];
let savedBirds = [];
let pipes = [];
const TOTAL = 250;

tf.setBackend('cpu');
for (let i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
}

window.addEventListener('keypress', e => {
    if (e.keyCode == 32) {
        bird.up();
    }
})

function animate () {
    requestAnimationFrame(animate);
    frameNumber++;

    resetCanvas();

    if (frameNumber % 120 == 0) {
        pipes.push(new Pipe());
    }
    
    for (let i = pipes.length-1; i >= 0; i--) {
        pipes[i].update();

        for (let j = birds.length - 1; j >= 0; j--) {
            if (pipes[i].hits(birds[j])) {
                savedBirds.push(birds.splice(j, 1)[0]);
            }
        }

        pipes[i].render();

        if (pipes[i].x < -pipes[i].w) {
            pipes.splice(i, 1);
        }

        for (let i = birds.length - 1; i >= 0; i--) {
            if (birds[i].offScreen()) {
                savedBirds.push(birds.splice(i, 1)[0]);
            }
        }

        // making decision
        for (let bird of birds) {
            bird.think(pipes);
            bird.update();
            bird.render();
        }

        if (birds.length === 0) {
            frameNumber = 0;
            nextGeneration();
            pipes = [];
        }

    }
    
}

animate();
