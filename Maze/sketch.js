var cols, rows; // rows and columns
var w = 20; //cell ratio to the width and height
var grid = [];
//1_D array to store the created cells
var current;
//to follow the current cell

var stack = [];
//stack maitained

/*
Algorithm: Depth First Search:

1. Choose the first cell as current and make it as visited
2. When there are unvisited cells
    1. if the current cell is having any neighbours
        1. select a random neighbour of the current cell and make it as visited
        2. push the current cell into stack
        3. remove the wall between the selected cell and the current cell
        4. make the selected cell as current
    2. else if there are no neighbours and the stack is not empty
        1. pop a cell from stack
        2. make that popped cell as the current cell
*/


function setup() {
  createCanvas(600, 600);

  frameRate(80);

  cols = floor(width / w);
  rows = floor(height / w);

  // frameRate(10);

  for (var j = 0; j < rows; ++j) {
    for (var i = 0; i < cols; ++i) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }
  
  current = grid[0];
  //making the first cell as the current cell initially
}

function draw() {
  background(51);

  for (var i = 0; i < grid.length; ++i) {
    grid[i].show();
  }
  current.visited = true; //making the first cell as visited
  current.highlight();
  //step 1
  var next = current.checkNeighbours();
  //checking the neighbours and selecting one of them

  if(next){
    //if there are neighbours to the current cell
    //step 2
    stack.push(current);
    //push the current cell into the stack
    next.visited = true;
    //making the selected cell as visited
    //step 3
    removeWalls(current, next);
    //removing the wall between the current cell and the selected cell
    //step 4
    current = next;  // making the selected cell as the current cell
  } else if(stack.length > 0){
    //if there are no neighbours and also stack is not empty
    current = stack.pop();
    //popping the top element from the stack and making it as current
  }
}

//index function to obtain the exact index in a 1D array simulating a 2D array
function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}

function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];
  //for each wall to be noted
  this.visited = false;

  this.checkNeighbours = function () {
    var neighbours = [];

    var top    = grid[index(i    , j - 1)];
    var right  = grid[index(i + 1, j    )];
    var bottom = grid[index(i    , j + 1)];
    var left   = grid[index(i - 1, j    )];
    //getting all the four cells if they exist

    if(top && !top.visited){
      neighbours.push(top);
    }
    if(right && !right.visited){
      neighbours.push(right);
    }
    if(bottom && !bottom.visited){
      neighbours.push(bottom);
    }
    if(left && !left.visited){
      neighbours.push(left);
    }
    //if they exist and they are not visited they will be added into the neighbours list of the current cell

    if(neighbours.length > 0){
      //if the neighbours are there then we select a random neighbour and return that selected cell
      var r = floor(random(0, neighbours.length));
      return neighbours[r];
    } else {
      //there are no neighbours
      return undefined;
    }
  }

  this.highlight = function() {
    var x = this.i*w;
    var y = this.j*w;
    noStroke();
    fill(255, 255, 255, 500);
    rect(x, y, w, w);
  }

  this.show = function () {
    var x = this.i * w;
    var y = this.j * w;
    stroke(255);

    if (this.walls[0]) {
      line(x, y, x + w, y);
    }
    if (this.walls[1]) {
      line(x + w, y, x + w, y + w);
    }
    if (this.walls[2]) {
      line(x + w, y + w, x, y + w);
    }
    if (this.walls[3]) {
      line(x, y + w, x, y);
    }
    //if the wall exists then we show it

    if(this.visited){
      noStroke();
      fill(255, 0, 0, 100);
      rect(x, y, w, w);
    }
    //if the cell is visited, we denoting it with different color
  }
}


function removeWalls(a, b) {
  let x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  let y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}