function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

class Pipe {
    constructor() {
        this.space = 200;
        this.top = randomInRange(canvas.height / 6, (3 / 4) * canvas.height);
        this.bottom = canvas.height - (this.top + this.space);
        this.x = canvas.width;
        this.w = 80;
        this.speed = 6;
    }

    hits = (bird) => {
        if (bird.y < this.top || bird.y > canvas.height - this.bottom) {
            if (bird.x + bird.rad > this.x && bird.x - bird.rad < this.w + this.x) {
                return true;
            }
        }
        return false;
    }

    update = () => {
        this.x -= this.speed;
    }

    render = () => {
        ctx.beginPath();
        ctx.rect(this.x, 0, this.w, this.top);
        ctx.fillStyle = 'white';
        ctx.fill();

        ctx.beginPath();
        ctx.rect(this.x, canvas.height - this.bottom, this.w, this.bottom);
        ctx.fillStyle = 'white';
        ctx.fill();
    }
}