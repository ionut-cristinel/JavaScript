
class Element{

    constructor(name, buildYear){

        this.name = name;
        this.buildYear = buildYear;
    }
}

class Park extends Element{

    constructor(name, buildYear, area, numTrees){

        super(name, buildYear);

        this.area = area;
        this.numTrees = numTrees;
    }

    treeDensity() {
        const density = Math.round(this.numTrees / this.area);
        console.log(`${this.name} has a tree density of ${density} trees per square km.`);
    } 
}

class Street extends Element{

    constructor(name, buildYear, length, size = 3){

        super(name, buildYear);

        this.length = length;
        this.size = size;
    }

    classifyStreet(){

        const classification = new Map();
        classification.set(1, 'tiny');
        classification.set(2, 'small');
        classification.set(3, 'normal');
        classification.set(4, 'big');
        classification.set(5, 'huge');

        console.log(`${this.name}, build in ${this.buildYear}, is a ${classification.get(this.size)} street.`);
    }
}

const allParks = [
    new Park('Green Park', 1957, 50, 1739),
    new Park('New Park', 2013, 20, 565),
    new Park('Central Park', 1932, 35, 10010)
];

const allStreets = [
    new Street('Long Street', 1890, 6, 5),
    new Street('Victory Street', 1973, 1, 1),
    new Street('Old Street', 1879, 2.5),
    new Street('Main Street', 2001, 4, 4)
];


function calc(arr){

    const sum = arr.reduce((acc, curr) => acc + curr);

    return [sum, sum / arr.length];
}


function reportParks(allParks){

    console.log(``);
    console.log(`------ PARKS REPORT ------`);
    console.log(``);

    allParks.forEach(el => el.treeDensity());

    const ages = allParks.map(curr => new Date().getFullYear() - curr.buildYear);

    const [sum, average] = calc(ages);

    console.log(``);
    console.log(`Our ${allParks.length} parks have an average of ${Math.round(average)} years.`);
    console.log(``);

    allParks.forEach(cur => {
        if(cur.numTrees >= 1000){
            console.log(`${cur.name} has more than 1000 trees.`);
        }
    });

    console.log(``);
}

function reportStreets(allStreets){

    console.log(``);
    console.log(`------ STREETS REPORT ------`);
    console.log(``);

    const length = allStreets.map(cur => cur.length);

    const [total, average] = calc(length);

    console.log(`Our ${allStreets.length} streets have ${total} km in total.`);
    console.log(`Our ${allStreets.length} streets have an average of ${average} km.`);
    console.log(``);

    allStreets.forEach(cur => cur.classifyStreet());
}


reportParks(allParks);
reportStreets(allStreets);