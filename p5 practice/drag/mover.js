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
    
    //drag force opposite to air direction: air resistence

    //formula: (-1/2) * DensityOfTheMedium(rho) * (velocity)^2 * surfaceArea(A) * coeffOfDrag(Cd) * velocityUnitVector
    //simplified for the p5 2D canvas: (-1) * Constant(Cd) * v^2 * velocityUnitVector

    ///Here, constants are density of the medium, surface area & coefficient of drag
 
    applyDrag() {
        let drag = this.vel.copy();
        drag.normalize();
        drag.mult(-1);
        
        let c = 0.1;
        let speedSq = this.vel.magSq();
        drag.setMag(c * speedSq);

        this.applyForce(drag);
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