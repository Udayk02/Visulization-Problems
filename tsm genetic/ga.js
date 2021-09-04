function calculateFitness() {

    var currentMinDist = Infinity;

    for(var i = 0; i < population.length; ++i) {
        var d = calcDistance(dots, population[i]);
        if(d < minDist) {
            minDist = d;
            best = population[i];
        }

        if(d < currentMinDist) {
            currentMinDist = d;
            currentBest = population[i];
        }
        //if the distance is large then it is not the best fit - less fitness. So, best way to map them is to
        //invert them. If the distance is higher, then fitness is lower and viceversa.
        fitness[i] = 1 / (d + 1);
    }
}

function normalizeFitness() {
    var sum = 0;
    for(var i = 0; i < fitness.length; ++i) {
        sum += fitness[i];
    }
    for(var i = 0; i < fitness.length; ++i) {
        fitness[i] = fitness[i] / sum;
    }
}

function createGeneration() {
    var newPopulation = [];
    for(var i = 0; i < population.length; ++i) {
        var orderA = pickOne(population, fitness);
        var orderB = pickOne(population, fitness);
        var order = crossOver(orderA, orderB);
        mutate(order, 0.1);
        newPopulation[i] = order;
    }
    population = newPopulation;
}

//interactive pool selection
//if there three items A, B and C with fitness 0.7, 0.2, 0.1 then percentage of picking A should be 70% from the
//pool. B - 20% and C - 10%.
/*
-----------------
|       A        | - 70%                                                    
|                |                                 
|                |                                 
|                |                                 
|       B        | - 20%                                
|                |                 
|       C        | - 10%
-----------------
*/
function pickOne(list, probability) {
    var index = 0;
    var r = random(1);
    while(r > 0) {
        r = r - probability[index];
        index++;
    }
    index--;
    return list[index].slice();
}

function mutate(list, mutationRate) {
    for(var i = 0; i < totalDots; ++i) {
        if(random(1) < mutationRate) {
            var indexA = floor(random(list.length));
            var indexB = (indexA + 1) % totalDots;
            swap(list, indexA, indexB);
        }
    }
}

//crossover of 2 random orders picked probably with more fitness
//if the orderA is [0, 1, 3, 2] and orderB is [2, 3, 0, 1]
//we select suppose 2 from orderA: let's select [1, 3, -, -]
//then from orderB we select remaining as in their order: [1, 3, 2, 0]
//new order is [1, 3, 2, 0]
function crossOver(orderA, orderB) {
    var start = floor(random(orderA.length));
    var end = floor(random(start + 1, orderA.length));
    
    var newOrder = orderA.slice(start, end);
    for(var i = 0; i < orderB.length; ++i) {
        var city = orderB[i];
        if(!newOrder.includes(city)) {
            newOrder.push(city);
        }
    }
    return newOrder;
}
