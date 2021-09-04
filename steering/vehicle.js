var mr = 0.01;

class Vehicle {
    constructor(x, y, dna) {
        this.acceleration = createVector(0, 0);
        this.velocity = createVector(0, -2);
        this.position = createVector(x, y);
        this.r = 4;
        //size of the Vehicle
        this.maxSpeed = 5;
        //maximum speed that vehicle can attain
        this.maxForce = 0.5;
        //maximum force it can seek or go towards the target object
        this.health = 1;
        this.dna = [];
        if(dna == undefined) {
            this.dna[0] = random(2, -2);
            //poison weight
            this.dna[1] = random(2, -2);
            //food perception
            this.dna[2] = random(0, 100);
            //poison perception
            this.dna[3] = random(0, 100);
            //food weight
        } else {
            //applying mutation
            for(var i = 0; i < 4; ++i) {
                this.dna[i] = dna[i];
                if((i == 0 || i == 1) && random(1) < mr) {
                    this.dna[i] += random(-0.1, 0.1);
                } else if(random(1) < mr) {
                    this.dna[i] += random(-10, 10);
                }
            }
        }
    }

    //method to update the position
    update() {
        this.health -= 0.005;
        //add acceleration to velocity
        this.velocity.add(this.acceleration);
        //limit the velocity: as it should be under maxSpeed
        this.velocity.limit(this.maxSpeed);
        //applying velocity to the vehicle
        this.position.add(this.velocity);
        //we have to reset the acceleration everytime we cycle in this update function
        this.acceleration.mult(0);
    }

    behaviour(good, bad) {
        //steering towards the food
        var goodSteer = this.eat(good, 0.2, this.dna[2]);
        //steering towards the poison
        var badSteer = this.eat(bad, -1, this.dna[3]);

        goodSteer.mult(this.dna[0]);
        badSteer.mult(this.dna[1]);

        this.applyForce(goodSteer);
        this.applyForce(badSteer);
    }

    clone() {
        //creating new children often
        if(random(1) < 0.002) {
            return new Vehicle(this.position.x, this.position.y, this.dna);
        } else{
            return null;
        }
    }

    eat(list, nutrition, perception) {
        var record = Infinity;
        var closest = null;
        for(var i = list.length - 1; i >= 0; i--) {
            var d = this.position.dist(list[i]);
        
            //if anything either food or poison is very close, it just eats it
            if(d < this.maxSpeed) {
                list.splice(i, 1);
                this.health += nutrition;
            } else {
                //if only it farther away from it is stored in the closest object
                if(d < record && d < perception) {
                    record = d;
                    closest = list[i];
                }
            }

        }

        //if it is near to the food it gets deleted or it still seeks or steers towards the food
        if(closest != null) {
            return this.seek(closest);
        }
        return createVector(0, 0);
    }

    //we have to calculate the steering force towards the target
    seek(target) {
        //the desired velocity is towards the target: target position - vehicle position limiting to the maxSPeed
        var desired = p5.Vector.sub(target, this.position);
        //scale to maxSpeed of the vehicle
        desired.setMag(this.maxSpeed);

        //Steering is Desired velocity - Actual velocity
        var steer = p5.Vector.sub(desired, this.velocity);
        //scaling it with tqhe maxForce
        steer.setMag(this.maxForce);

        return steer;
        // this.applyForce(steer);
    }

    applyForce(force) {
        //applying the force to alter the accelaration
        //we can also add mass to the vehicle if needed
        this.acceleration.add(force);
    }

    dead() {
        return (this.health < 0);
    }

    display() {
        //triangle representing the vehicle
        //it rotates in the direction of the velocity vector
        let theta = this.velocity.heading() + PI / 2;
 
        push();
        
        translate(this.position.x, this.position.y);
        
        if(debug.checked()) {
            strokeWeight(2);
            
            stroke(0, 255, 0);
            noFill();
            line(0, 0, 0, -this.dna[0] * 20);
            ellipse(0, 0, this.dna[2] * 2);
            stroke(255, 0, 0);
            line(0, 0, 0, -this.dna[1] * 20);
            ellipse(0, 0, this.dna[3] * 2);
        }
        
        var green = color(0, 255, 0);
        var red = color(255, 0, 0);
        var col = lerpColor(red, green, this.health);
        
        fill(col);
        stroke(col);
        strokeWeight(1);
        
        rotate(theta);
        beginShape();
        vertex(0, -this.r * 2);
        vertex(-this.r, this.r * 2);
        vertex(this.r, this.r * 2);
        endShape(CLOSE);
        pop();
    }
    
    boundaries() {
        const d = 25;
        
        let desired = null;
        
        if (this.position.x < d) {
            desired = createVector(this.maxSpeed, this.velocity.y);
        } else if (this.position.x > width - d) {
            desired = createVector(-this.maxSpeed, this.velocity.y);
        }

        if (this.position.y < d) {
            desired = createVector(this.velocity.x, this.maxSpeed);
        } else if (this.position.y > height - d) {
            desired = createVector(this.velocity.x, -this.maxSpeed);
        }

        if (desired !== null) {
            desired.normalize();
            desired.setMag(this.maxSpeed);
            const steer = p5.Vector.sub(desired, this.velocity);
            steer.setMag(this.maxForce);
            this.applyForce(steer);
        }
    }
}