class Bird {
    constructor(brain) {
        this.y = canvas.height/2;
        this.x = 50;
        this.rad = 25;

        this.velocity = 0;
        this.gravity = 0.8;
        this.lift = -12;

        this.score = 0;
        this.fitness = 0;
        if (brain) {
        this.brain = brain.copy();
        } else {
        this.brain = new NeuralNetwork(5, 8, 2);
        }

    }

    update = () => {
        this.score++;

        this.velocity += this.gravity;
        this.y += this.velocity;
        

    }

    dispose() {
        this.brain.dispose();
    }

    offScreen = () => {
        return this.y + this.rad > canvas.height || this.y - this.rad < 0;
    }

    mutate() {
        this.brain.mutate(0.1);
    }

    think(pipes) {
        // Find the closest pipe
        let closest = null;
        let closestD = Infinity;
        for (let i = 0; i < pipes.length; i++) {
            let d = pipes[i].x + pipes[i].w - this.x;
            if (d < closestD && d > 0) {
            closest = pipes[i];
            closestD = d;
            }
        }

        let inputs = [];
        inputs[0] = this.y / canvas.height;
        inputs[1] = closest.top / canvas.height;
        inputs[2] = closest.bottom / canvas.height;
        inputs[3] = closest.x / canvas.width;
        inputs[4] = this.velocity / 10;
        let output = this.brain.predict(inputs);
        
        if (output[0] > output[1]) {
            this.up();
        }
    }

    up = () => {
        this.velocity += this.lift;
    }

    render = () => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, 2*Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
    }

}