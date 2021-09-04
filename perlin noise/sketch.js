var inc = 0.1; //value for increment
var zoff = 0;
//VALUE FOR Z OFFSET VISUALLY FOR 3RD dimension, theoretically for time
var cols, rows;
var scl = 10;
//rows, cols and scaling per each vector position

var particles = [];
//array to store particles that move
var flowField;
//array to store the vectors and their field 

var fr;
//framerate

function setup() {
  createCanvas(800, 600);

  cols = floor(width / scl);
  rows = floor(height / scl);
  //scaling the entire width and height to get rows and columns

  fr = createP('');

  flowField = new Array(cols * rows);
  //creating an array to store vectors

  for(var i = 0; i < 1000; ++i) {
    particles[i] = new Particle();
  }
  background(135, 0, 255);
}

function draw() {
  // randomSeed(10);
  var yoff = 0;
  //y offset

  for(var y = 0; y < rows; ++y) {
    var xoff = 0;
    //x offset 
    for(var x = 0; x < cols; ++x) {
      var index = x + y * cols;
      //index of that particular vector start inorder to map it with particles
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      //a random angle in which vectors rotate
      var v = p5.Vector.fromAngle(angle);
      //creating a vector from that angle
      v.setMag(1);
      //setting the magnitude of that vector
      flowField[index] = v;
      //updating the vector at that index position
      xoff += inc;
      //incrementing the x offset
      // stroke(0, 50);
      // strokeWeight(1);
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // line(0, 0, scl, 0);
      // pop();
      ////drawing the actual vectors by translating to that position and using the line function to draw a line representation
      // fill(r);
      // rect(x * scl, y * scl, scl, scl);
    }
    yoff += inc;
    zoff += 0.0003;
    //zoffset incrementation, interpretation of time
  }

  fr.html(floor(frameRate()));

  for(var i = 0; i < particles.length; ++i) {
    particles[i].follow(flowField);
    //making that particle follow the path of vectors 
    particles[i].update();
    //updating their acceleration
    particles[i].edges();
    //managing the corner cases where the particle leaves the canvas 
    particles[i].show();
    //displaying the particle 
  }


}
