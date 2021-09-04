let moverA;
let moverB;

let mu = 0.01;

function collide(A, B) {

}

function setup() {
  createCanvas(400, 400);
  moverA = new Mover(100, 200, 1);
  moverB = new Mover(300, 200, 2)
}

function draw() {
  background(51);

  
  if(mouseIsPressed) {
    let wind = createVector(0.1, 0);
    moverA.applyForce(wind);
    moverB.applyForce(wind);
  }
  
  let gravity = createVector(0, 0.4);

  let weightA = p5.Vector.mult(gravity, moverA.mass);
  let weightB = p5.Vector.mult(gravity, moverB.mass);

  moverA.applyForce(weightA);
  moverA.applyFriction();
  moverA.update();
  moverA.edges();
  moverA.show();
  
  moverB.applyForce(weightB);
  moverB.applyFriction();
  moverB.update();
  moverB.edges();
  moverB.show();
}
