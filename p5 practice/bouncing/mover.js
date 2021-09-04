class Mover {
    constructor(x, y, mass) {
        this.pos = createVector(x, y);
        // this.vel = p5.Vector.random2D();
        this.vel = createVector(0, 0);
        // this.vel.mult(random(3));
        this.acc = createVector(0, 0);
        this.mass = mass;
        this.r = sqrt(this.mass) * 10;
    }

    edges() {
        if(this.pos.y >= height - this.r) {
            this.pos.y = height - this.r;
            this.vel.y *= -1;
        }

        if(this.pos.x >= width - this.r) {
            this.pos.x = width - this.r;
            this.vel.x *= -1;
        } else if(this.pos.x <= this.r) {
            this.pos.x = this.r;
            this.vel.x *= -1;
        }
    }

    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.acc.add(f);
    }

    applyFriction() {
        let diff = height - (this.pos.y + this.r);
        if(diff < 1) {

            //friction = -1 * CoefficientOfFriction(mu) * NormalForce * velocityUnitVector

            // console.log("Friction");
            let friction = this.vel.copy();
            friction.normalize();
            friction.mult(-1);
            let normalForce = this.mass;
            friction.setMag(mu * normalForce);
            this.applyForce(friction);
        }
    }
    
    update() {
        // let mouse = createVector(mouseX, mouseY);
        // this.acc = p5.Vector.sub(mouse, this.pos);
        // this.acc.setMag(1);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.set(0, 0);
    }

    show() {
        stroke(255);
        strokeWeight(2);
        ellipse(this.pos.x, this.pos.y, this.r * 2);
    }
}