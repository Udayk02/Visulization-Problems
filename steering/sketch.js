//array storing vehicles
let vehicles = [];
//array storing food
let food = [];
//poison array
let poison = [];

let debug;
let fd;
let ps;
let vh;

function setup() {
  createCanvas(640, 360);

  //initialising new vehicles
  for(var i = 0; i < 50; ++i) {
    var x = random(width);
    var y = random(height);
    vehicles[i] = new Vehicle(x, y);
  }

  //initialising new food
  for(var i = 0; i < 40; ++i) {
    var x = random(width);
    var y = random(height);
    food.push(createVector(x, y));
  }
  
  //initialising new poison
  for(var i = 0; i < 20; ++i) {
    var x = random(width);
    var y = random(height);
    poison.push(createVector(x, y));
  }

  debug = createCheckbox();
  createP("Debug");
  fd = createCheckbox();
  createP("Food");
  ps = createCheckbox();
  createP("Poison");
  vh = createCheckbox();
  createP("Vehicle");
}

function mouseClicked() {
  if(vh.checked()) {
    vehicles.push(new Vehicle(mouseX, mouseY));
  } else if(fd.checked()) {
    food.push(createVector(mouseX, mouseY));
  } else if(ps.checked()) {
    poison.push(createVector(mouseX, mouseY));
  }
}

function draw() {
  background(51);
  
  //adding new food more often
  if(random() < 0.1) {
    var x = random(width);
    var y = random(height);
    food.push(createVector(x, y));
  }
  
  //adding new poison less often
  if(random() < 0.01) {
    var x = random(width);
    var y = random(height);
    poison.push(createVector(x, y));
  }

  for(var i = 0; i < food.length; ++i) {
    fill(0, 255, 0);
    noStroke();
    ellipse(food[i].x, food[i].y, 4, 4);
  }

  for(var i = 0; i < poison.length; ++i) {
    fill(255, 0, 0);
    noStroke();
    ellipse(poison[i].x, poison[i].y, 4, 4);
  }

  for(var i = vehicles.length - 1; i >= 0; i--) {
    //checking whether the vehicle reaches any boundarie
    vehicles[i].boundaries();
    //complete function in which we apply weights to the food and poison and a perception radius to the vehicle
    //towards the food and poison and also seek speed towards them
    //perception is also random: if it is lucky enough it will have more perception radius towards food and also
    //more steering towards the food
    vehicles[i].behaviour(food, poison);
    //updating the vehicle's position
    vehicles[i].update();
    //display function
    vehicles[i].display();

    //reproducing new children
    var child = vehicles[i].clone();
    if(child != null) {
      vehicles.push(child);
    }

    //if it is dead it is removed from the array and also a food is added at that position
    if(vehicles[i].dead()) {
        var x = vehicles[i].position.x;
        var y = vehicles[i].position.y;
        food.push(createVector(x, y));
      vehicles.splice(i, 1);
    }
  }
}
