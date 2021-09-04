let movers = [];

let mu = 0.01;

function setup() {
  createCanvas(400, 400);

  for(let i = 0; i < 10; ++i) {
    movers[i] = new Mover(random(width), 0, random(1, 9));
  }
}

function draw() {
  background(51);

  
  if(mouseIsPressed) {
    let wind = createVector(0.1, 0);
    for(let mover of movers) {
      mover.applyForce(wind);
    }
  }
  
  let gravity = createVector(0, 0.4);

  for(let mover of movers) {
    let weight = p5.Vector.mult(gravity, mover.mass);
  
    mover.applyForce(weight);
    mover.applyFriction();
    mover.applyDrag();
    mover.update();
    mover.edges();
    mover.show();
  }
}
