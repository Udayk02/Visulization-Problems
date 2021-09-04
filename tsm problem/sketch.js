var dots = [];
var totatDots = 6;
var minDist;
var best;
var order = [];

var totalPermutatons;
var count = 0;

function setup() {
  createCanvas(400, 600);
  // frameRate(1);

  for(var i = 0; i < totatDots; ++i){
    var v = createVector(random(width), random(height/2));
    dots[i] = v;
    order[i] = i;
  }

  totalPermutatons = fact(totatDots);
  console.log(totalPermutatons);

  minDist = calcDistance(dots, order);
  best = order.slice();
}

function draw() {
  background(0);

  fill(255);
  for(var i = 0; i < dots.length; ++i){
    ellipse(dots[i].x, dots[i].y, 8, 8);
  }

  stroke(255, 0, 255);
  strokeWeight(4);
  noFill();
  beginShape();
  for(var i = 0; i < best.length; ++i){
    // var dotI = best[i];
    vertex(dots[best[i]].x, dots[best[i]].y);
  }
  endShape();

  translate(0, height / 2);

  stroke(255);
  strokeWeight(1);
  noFill();
  beginShape();
  for(var i = 0; i < order.length; ++i){
    var dotI = order[i];
    vertex(dots[dotI].x, dots[dotI].y);
  }
  endShape();

  
  if(calcDistance(dots, order) < minDist) {
    minDist = calcDistance(dots, order);
    best = order.slice();
    console.log(minDist);
  }

  count++;
  // fill(0);
  stroke(255);
  textSize(32);
  // var s = "";
  // for(var i = 0; i < order.length; ++i){
  //   s += order[i];
  // }
  
  var s = 100 * (count / totalPermutatons);
  text(nf(s, 0, 2) + "% completed", 20, -260);

  nextOrder();

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

function nextOrder(){
  var largestI = -1;

  for(var i = 0; i < order.length - 1; ++i) {
    if(order[i] < order[i + 1]){
      largestI = i;
    }
  }
  
  if(largestI == -1){
    noLoop();
    console.log("Done");
  }

  //step 2
  var largestJ = -1;

  for(var i = order.length; i >= largestI; i--) {
    if(order[largestI] <= order[i]){
      largestJ = i;
      break;
    }
  }

  //step 3
  swap(order, largestI, largestJ);

  //step 4
  var endArray = order.splice(largestI + 1);
  endArray.reverse();
  order = order.concat(endArray);
}

function fact(n) {
  if(n == 1) {
    return 1;
  } else {
    return n * fact(n - 1);
  }
}