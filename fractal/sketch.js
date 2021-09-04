let angle;
let slider;

function setup() {
  createCanvas(400, 400);

  slider = createSlider(0, TWO_PI, PI / 4, 0.01);
}

function draw() {
  background(255);
  
  angle = slider.value();
  let len = 100;
  let thickness = 10;
  let color = 2;
  translate(200, height);

  branch(len, thickness, color);
}

function branch(len, thickness, color) {
  stroke(color * 0.1, color * 4, color * 8);
  strokeWeight(thickness);
  line(0, 0, 0, -len);
  translate(0, -len);
  if(len > 4) {
    push();
    rotate(angle);
    branch(len * 0.67, thickness - 4, color * 1.5);
    pop();
    push();
    rotate(-angle);
    branch(len * 0.67, thickness - 4, color * 1.5);
    pop();
  }
}
