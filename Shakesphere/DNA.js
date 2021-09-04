function newChar() {
    var c = floor(random(63, 122));
    if(c == 63) c = 32;
    if(c == 64) c = 46;

    return String.fromCharCode(c);
}

class DNA {
    constructor(num) {
        this.genes = [];
        this.fitness = 0;
        for(var i = 0; i < num; ++i) {
            this.genes[i] = newChar();
        }
    }

    getPhrase() {
        return this.genes.join("");
    }

    calcFitness() {
        var score = 0;
        for(var i = 0; i < this.genes.length; ++i) {
            if(this.genes[i] == target.charAt(i)) {
                score++;
            }
        }
        this.fitness = score / target.length;
        //updation to exponential curve for the fitness function
        this.fitness = Math.pow(this.fitness, 4) + 0.01;
    }

    crossover(partner) {
        var child = new DNA(this.genes.length);

        var midpoint = floor(random(this.genes.length));

        for(var i = 0; i < this.genes.length; ++i) {
            if(i > midpoint) {
                child.genes[i] = this.genes[i];
            }
            else{
                child.genes[i] = partner.genes[i];
            }
        }
        return child;
    }

    mutate(mutationRate) {
        for(var i = 0; i < this.genes.length; ++i) {
            if(random(1) < mutationRate) {
                this.genes[i] = newChar();
            }
        }
    }
}