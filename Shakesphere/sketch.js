var target;
var maxPop;
var mutationRate;
var population;

var bestPhrase;
var allPhrases;
var stats;

function setup() {
  bestPhrase = createP("Best Phrase: ");
  bestPhrase.position(10, 10);
  bestPhrase.class("best");

  allPhrases = createP("All Phrases: ");
  allPhrases.position(600, 10);
  allPhrases.class("all");

  stats = createP("Stats");
  stats.position(10, 200);
  stats.class("stats")

  createCanvas(640, 360);

  target = "To be or not to be";
  maxPop = 500;
  mutationRate = 0.01;

  population = new Population(target, mutationRate, maxPop);
}

function draw() {

  // population.naturalSelection();

  population.generate();

  population.calcFitness();

  population.evaluate();

  if(population.isFinished()) {
    noLoop();
  }

  displayInfo();
  // background(220);
}


function displayInfo() {
  var answer = population.getBest();

  bestPhrase.html("Best phrase:<br>" + answer);

  var statstext =
    "total generations:     " + population.getGenerations() + "<br>";
  statstext +=
    "average fitness:       " + nf(population.getAverageFitness()) + "<br>";
  statstext +=
    "total population:      " + maxPop + "<br>";
  statstext +=
    "mutation rate:         " + floor(mutationRate * 100) + "%";

  stats.html(statstext);
  allPhrases.html("All phrases:<br>" + population.allPhrases());
}