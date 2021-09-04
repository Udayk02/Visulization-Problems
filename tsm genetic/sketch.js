var dots = [];
var totalDots = 12;
var minDist = Infinity;
var best;
var currentBest;

var popSize = 500;
var population = [];
var fitness = [];

var totalPermutatons;
var count = 0;

function setup() {
  createCanvas(800, 800);
  // frameRate(1);

  var order = [];

  for(var i = 0; i < totalDots; ++i){
    var v = createVector(random(width), random(height/2));
    dots[i] = v;
    order[i] = i;
  }

  for(var i = 0; i < popSize; ++i) {
    population[i] = shuffle(order);
  }

}

function draw() {
  background(0);

  //genetic algo
  //calculate fitness
  calculateFitness();
  //normalize the fitness values
  normalizeFitness();
  //create a new generation
  createGeneration();

  fill(255);
  for(var i = 0; i < dots.length; ++i){
    ellipse(dots[i].x, dots[i].y, 8, 8);
  }

  stroke(255, 255, 255);
  strokeWeight(4);
  noFill();
  beginShape();
  for(var i = 0; i < best.length; ++i){
    // var dotI = best[i];
    vertex(dots[best[i]].x, dots[best[i]].y);
  }
  endShape();

  translate(0, height / 2);
  fill(255);
  for(var i = 0; i < dots.length; ++i){
    ellipse(dots[i].x, dots[i].y, 8, 8);
  }
  stroke(255, 255, 255);
  strokeWeight(4);
  noFill();
  beginShape();
  for(var i = 0; i < currentBest.length; ++i){
    // var dotI = best[i];
    vertex(dots[currentBest[i]].x, dots[currentBest[i]].y);
  }
  endShape();
}

function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function calcDistance(points, order) {
  var sum = 0;
  for(var i = 0; i < order.length - 1; ++i){
    var dotA = order[i];
    var dotB = order[i + 1];
    sum += dist(points[dotA].x, points[dotA].y, points[dotB].x, points[dotB].y);
  }
  return sum;
}