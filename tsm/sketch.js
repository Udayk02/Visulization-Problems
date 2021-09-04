var dots = [];
var totalDots = 3;
var arr = [];
var best;
var minDist;

function setup() {
  createCanvas(400, 800);
  noLoop();

  for(var i = 0; i < totalDots; ++i) {
    var v = createVector(random(width), random(height/2));
    dots[i] = v;
  }

  for(var i = 0; i < totalDots; ++i) {
    arr[i] = i;
  }

  minDist = calcDist(dots);
  best = dots.slice();

  console.log(dots);
  console.log(minDist);

}

function draw() {
  background(0);

  fill(255);
  for(var i = 0; i < dots.length; ++i){
    ellipse(dots[i].x, dots[i].y, 8, 8);
  }

  stroke(255);
  strokeWeight(1);
  noFill();
  beginShape();
  for(var i = 0; i < dots.length; ++i) {
    vertex(dots[i].x, dots[i].y);
  }
  endShape();

  console.log(arr);
  console.log(dots);

  var largestI = -1;

  for(var i = 0; i < arr.length; ++i) {
    if(arr[i] < arr[i + 1]){
      largestI = i;
    }
  }

  if(largestI == -1){
    noLoop();
    console.log("Done");
  }

  var largestJ = -1;

  for(var i = arr.length; i >= 0; i--) {
    if(arr[largestI] <= arr[i]) {
      largestJ = i;
      break;
    }
  }

  swap(arr, largestI, largestJ);
  swap(dots, largestI, largestJ);

  var endArr = arr.splice(largestI + 1);
  var endDots = arr.splice(largestI + 1);
  endArr.reverse();
  endDots.reverse();
  arr = arr.concat(endArr);
  dots = dots.concat(endDots);

  if(calcDist(dots) < minDist) {
    minDist = calcDist(dots);
    best = dots.slice();
    console.log(minDist);
  }

  stroke(255, 0, 255);
  strokeWeight(4);
  noFill();
  beginShape();
  for(var i = 0; i < best.length; ++i){
    vertex(best[i].x, best[i].y);
  }
  endShape();

  fill(255);
  textSize(64);
  var s = "";
  for(var i = 0; i < arr.length; ++i){
    s += arr[i];
  }
  
  text(s, 30, 2*height/3);

}

function calcDist(points) {
  var sum = 0;
  for(var i = 0; i < points.length - 1; ++i) {
    sum += dist(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
  }
  return sum;
}


function swap(a, i, j) {
  var temp = a[j];
  a[j] = a[i];
  a[i] = temp;
}