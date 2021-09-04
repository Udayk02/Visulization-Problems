function Particle() {
    this.vel = createVector(0, 0);
    //velocity of the particle starting from 0
    this.acc = createVector(0, 0);
    //acceleration of the particle starting from 0
    this.pos = createVector(random(width), random(height));
    //position of the particle which is random within the canvas
    this.maxSpeed = 2;
    //maximum speed of the particle

    this.prevPos = this.pos.copy();
    //previous copy of the particle inorder to maintain the correct curve

    this.update = function() {
        this.vel.add(this.acc);
        //accelaration given is added to the velocity: the force applied will also be added (refer follow())
        this.vel.limit(this.maxSpeed);
        //limiting the velocity to the maxSpeed given
        this.pos.add(this.vel);
        //adding the velocity to the position of the particle to move it
        this.acc.mult(0);
        //resetting the acceleration to 0 again
    }

    this.applyForce = function(force) {
        this.acc.add(force);
        //adding the force of vector basically magnitude to the accelaration of that particle
    }

    this.follow = function(vectors) {
        var x = floor(this.pos.x / scl);
        var y = floor(this.pos.y / scl);
        //getting the values of the position of the particle when mapped to the flowfield array contianing vectors
        index = x + y * cols;
        //same index as flowfield reference
        var force = vectors[index];
        //force that is vector instance itself
        this.applyForce(force);
        //applying the force to the particle: here force is nothing but the magnitude considering the vector
    }

    this.show = function() {
        // var color = [];
        // if(num == 1) {
        //     color[0] = 148;
        //     color[1] = 0;
        //     color[2] = 211;
        // }     
        // else if(num == 2) {
        //     color[0] = 75;
        //     color[1] = 0;
        //     color[2] = 130;
        // }     
        // else if(num == 3) {
        //     color[0] = 0;
        //     color[1] = 0;
        //     color[2] = 255;
        // }     
        // else if(num == 4) {
        //     color[0] = 0;
        //     color[1] = 255;
        //     color[2] = 0;
        // }     
        // else if(num == 5) {
        //     color[0] = 255;
        //     color[1] = 255;
        //     color[2] = 0;
        // }     
        // else if(num == 6) {
        //     color[0] = 255;
        //     color[1] = 127;
        //     color[2] = 0;
        // }     
        // else if(num == 7) {
        //     color[0] = 255;
        //     color[1] = 0;
        //     color[2] = 0;
        // }     
        stroke(255, 5);
        strokeWeight(2);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        // point(this.pos.x, this.pos.y);
        this.updatePrev();
        //updating the previous as current after the particle is diplayed at that particular instance
    }

    this.updatePrev = function() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }

    this.edges = function() {
        if(this.pos.x > width){
            this.pos.x = 0;
            this.updatePrev();
        }
        if(this.pos.x < 0) {
            this.pos.x = width;
            this.updatePrev();
        }
        if(this.pos.y > height){
            this.pos.y = 0;
            this.updatePrev();
        }  
        if(this.pos.y < 0){    
            this.pos.y = height;
            this.updatePrev();
        }
    }
}