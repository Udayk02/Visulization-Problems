class Population {
    constructor(p, m, num) {
        this.population;
        this.matingPool;
        this.generations = 0;
        this.finished = false;
        this.target = p;
        this.mutationRate = m;
        this.perfectScore = 1;
        this.maxFitness = 0;

        this.best = "";

        this.population = [];
        for(var i = 0; i < num; ++i) {
            this.population[i] = new DNA(this.target.length);
        }
        this.matingPool = [];
        this.calcFitness();
    }

    calcFitness() {
        for(var i = 0; i < this.population.length; ++i) {
            this.population[i].calcFitness(target);
        }
    }

    // naturalSelection() {
    //     this.matingPool = [];

    //     var maxFitness = 0;
    //     for(var i = 0; i < this.population.length; ++i) {
    //         if(this.population[i].fitness > maxFitness) {
    //             maxFitness = this.population[i].fitness;
    //         }
    //     }

    //     for(var i = 0; i < this.population.length; ++i) {
    //         var fitness = map(this.population[i].fitness, 0, maxFitness, 0, 1);
    //         var n = floor(fitness * 100);
    //         for(var j = 0; j < n; ++j) {
    //             this.matingPool.push(this.population[i]);
    //         }
    //     }
    // }

    generate() {
        this.maxFitness = 0;
        for(var i = 0; i < this.population.length; ++i) {
            if(this.population[i].fitness > this.maxFitness) {
                this.maxFitness = this.population[i].fitness;
            }
        }

        var newPopulation = [];
        for(var i = 0; i < this.population.length; ++i) {
            var partnerA = this.acceptReject();
            var partnerB = this.acceptReject();
            var child = partnerA.crossover(partnerB);
            child.mutate(this.mutationRate);
            newPopulation[i] = child;
        }
        this.population = newPopulation;
        this.generations++;
    }

    acceptReject() {
        var count = 0;
        while(true) {
            var index = floor(random(this.population.length));
            var r = random(this.maxFitness);
            var partner = this.population[index];
            if(r < partner.fitness) {
                return partner;
            }

            count++;

            if(count > 10000) {
                return null;
            }
        }
    }

    getBest() {
        return this.best;
    }

    evaluate() {
        var worldrecord = 0.0;
        var index = 0;
        for(var i = 0; i < this.population.length; ++i) {
            if(this.population[i].fitness > worldrecord) {
                index = i;
                worldrecord = this.population[i].fitness;
            }
        }

        this.best = this.population[index].getPhrase();
        if(worldrecord >= this.perfectScore) {
            this.finished = true;
        }
    }

    isFinished() {
        return this.finished;
    }

    getGenerations() {
        return this.generations;
    }

    getAverageFitness() {
        var total = 0;
        for(var i = 0; i < this.population.length; ++i) {
            total += this.population[i].fitness;
        }
        return total / this.population.length;
    }

    allPhrases() {
        var everything = "";

        var displayLimit = min(this.population.length, 50);

        for(var i = 0; i < displayLimit; ++i) {
            everything += this.population[i].getPhrase() + "<br>";
        }
        return everything;
    }
}