var data;

var resultP;

function preload() {
  data = loadJSON('movies.json');
}

function setup() {
  // createCanvas(400, 400);
  noCanvas();

  var users = {};
  
  var dropDown1 = createSelect("");
  var dropDown2 = createSelect("");

  for(var i = 0; i < data.users.length; i++) {
    var name = data.users[i].name;
    dropDown1.option(name);
    dropDown2.option(name);
    
    users[name] = data.users[i];
  }
  
  var button = createButton('Submit');
  button.mousePressed(euclideanSimilarity);
  
  var resultP = createP('');

  function euclideanSimilarity() {
    var name1 = dropDown1.value();
    var name2 = dropDown2.value();

    var titles = Object.keys(users[name1]);
    var i = titles.indexOf('name');
    titles.splice(i, 1);
    var j = titles.indexOf('timestamp');
    titles.splice(j, 1);

    var ratings1 = users[name1];
    var ratings2 = users[name2];

    var d = 0;
    for(var i = 0; i < titles.length; ++i) {
      var title = titles[i];
      var r1 = ratings1[title];
      var r2 = ratings2[title];
      var diff = r1 - r2;
      d += Math.pow(diff, 2);
    }
    d = sqrt(d);

    var similarity = 1 / (d + 1);
    resultP.html(similarity);
  }
}

// function draw() {
//   background(220);
// }
