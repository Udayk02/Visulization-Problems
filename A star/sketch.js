function removeFromArray(arr, element) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == element) {
      arr.splice(i, 1);
    }
  }
}

function heuristic(a, b) {
  // return dist(a.i, a.j, b.i, b.j);
  var d = abs(a.i - b.i) + abs(a.j - b.j);
  return d;
}

function drawObstaclePath(obs) {
  var i = obs.i;
  var j = obs.j;
  noFill();
  stroke(0);
  strokeWeight(2);
  if (i < cols - 1 && grid[i + 1][j].wall) {
    line(i * w + w/2, j * h + h/2, (i + 1) * w + w/2, j * h + h/2);
  }
  if (i > 0 && grid[i - 1][j].wall) {
    line(i * w + w/2, j * h + h/2, (i - 1) * w + w/2, j * h + h/2);
  }
  if (j < rows - 1 && grid[i][j + 1].wall) {
    line(i * w + w/2, j * h + h/2, i * w + w/2, (j + 1) * h + h/2);
  }
  if (j > 0 && grid[i][j - 1].wall) {
    line(i * w + w/2, j * h + h/2, i * w + w/2, (j - 1) * h + h/2);
  }
  // if (i > 0 && j > 0 && grid[i - 1][j - 1].wall) {
  //   line(i * w + w/2, j * h + h/2, (i - 1) * w + w/2, (j - 1) * h + h/2);
  // }
  // if (i < cols - 1 && j > 0 && grid[i + 1][j - 1].wall) {
  //   line(i * w + w/2, j * h + h/2, (i + 1) * w + w/2, (j - 1) * h + h/2);
  // }
  // if (i < cols - 1 && j < rows - 1 && grid[i + 1][j + 1].wall) {
  //   line(i * w + w/2, j * h + h/2, (i + 1) * w + w/2, (j + 1) * h + h/2);
  // }
  // if (i > 0 && j < rows - 1 && grid[i - 1][j + 1].wall) {
  //   line(i * w + w/2, j * h + h/2, (i - 1) * w + w/2, (j + 1) * h + h/2);
  // }
}

var cols = 50;
var rows = 50;
var grid = new Array(cols);
var openSet = [];
var closedSet = [];
var start;
var end;
var w, h;
var path = [];


function Spot(i, j) {
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  //total path length f_score = total length upto that point g_score + heuristic value (assumption) 
  this.neighbours = [];
  //neighbours to that spot
  this.previous = undefined;
  //previous one in the path
  this.wall = false;


  if (random(1) < 0.3) {
    this.wall = true;
  }

  this.show = function (color) {
    // fill(color);
    if (this.wall) {
      fill(0);
      noStroke();
      ellipse(this.i * w + w/2, this.j * h + h/2, w - 1, h - 1);
    }
    // rect(this.i * w, this.j * h, w - 1, h - 1);
  };

  this.addNeighbours = function (grid) {
    var i = this.i;
    var j = this.j;

    //right neighbour
    if (i < cols - 1) {
      this.neighbours.push(grid[i + 1][j]);
    }
    //left neighbour
    if (i > 0) {
      this.neighbours.push(grid[i - 1][j]);
    }
    //top neighbour
    if (j < rows - 1) {
      this.neighbours.push(grid[i][j + 1]);
    }
    // bottom neighbour
    if (j > 0) {
      this.neighbours.push(grid[i][j - 1]);
    }
    //top left neighbour
    if (i > 0 && j > 0) {
      this.neighbours.push(grid[i - 1][j - 1]);
    }
    //top right neighbour
    if (i < cols - 1 && j > 0) {
      this.neighbours.push(grid[i + 1][j - 1]);
    }
    //bottom right neighbour
    if (i < cols - 1 && j < rows - 1) {
      this.neighbours.push(grid[i + 1][j + 1]);
    }
    //bottom left neighbour
    if (i > 0 && j < rows - 1) {
      this.neighbours.push(grid[i - 1][j + 1]);
    }
  };
}

function setup() {
  createCanvas(400, 400);

  frameRate(8);

  w = width / cols;
  h = height / rows;

  //making a 2D array
  for (var i = 0; i < cols; ++i) {
    grid[i] = new Array(rows);
  }

  //filling it with spots
  for (var i = 0; i < cols; ++i) {
    for (var j = 0; j < rows; ++j) {
      grid[i][j] = new Spot(i, j);
    }
  }

  for (var i = 0; i < cols; ++i) {
    for (var j = 0; j < rows; ++j) {
      grid[i][j].addNeighbours(grid);
    }
  }

  //start and end of the path
  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  start.wall = false;
  end.wall = false;

  openSet.push(start);
}

function draw() {
  if (openSet.length > 0) {
    //we can keep moving on
    //the node having least fscore() has to be selected
    var winner = 0;
    for (var i = 0; i < openSet.length; ++i) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }

    var current = openSet[winner];

    if (current === end) {
      noLoop();
      console.log("Done");
    }

    removeFromArray(openSet, current);
    closedSet.push(current);

    var neighbours = current.neighbours;

    for (var i = 0; i < neighbours.length; ++i) {
      var neighbour = neighbours[i];

      if (!closedSet.includes(neighbour) && !neighbour.wall) {
        var temp = current.g + 1;

        var newPath = false;
        if (openSet.includes(neighbour)) {
          if (temp < neighbour.g) {
            neighbour.g = temp;
            newPath = true;
          }
        } else {
          neighbour.g = temp;
          newPath = true;
          openSet.push(neighbour);
        }

        if(newPath){
          neighbour.h = heuristic(neighbour, end);
          neighbour.f = neighbour.g + neighbour.h;
          neighbour.previous = current;
        }
      }
    }
  } else {
    console.log("No solution");
    noLoop();
    return;
    //no solution
  }

  background(255);

  for (var i = 0; i < cols; ++i) {
    for (var j = 0; j < rows; ++j) {
      grid[i][j].show(color(255, 255, 255));
      if(grid[i][j].wall){
        drawObstaclePath(grid[i][j]);
      }
    }
  }

  //visualizing the spots in openset and closedset
  for (var i = 0; i < closedSet.length; ++i) {
    // closedSet[i].show(color(255, 0, 0));
  }

  for (var i = 0; i < openSet.length; ++i) {
    // openSet[i].show(color(0, 255, 0));
  }

  path = [];
  var temp = current;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }

  noFill();
  stroke(255, 0, 0);
  strokeWeight(3);
  beginShape();
  for (var i = 0; i < path.length; ++i) {
    vertex(path[i].i * w + w/2, path[i].j * h + h/2);
  }
  endShape();
}
