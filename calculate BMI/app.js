
var john, mark;

john = {
    fullName: `John Smith`,
    mass: 65,
    height: 1.80,
    calcBMI: function(){
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
}

mark = {
    fullName: `Mark Smith`,
    mass: 83,
    height: 1.75,
    calcBMI: function(){
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
}

switch(true){
    case john.calcBMI() > mark.calcBMI():
        console.log(`${john.fullName} has ${john.bmi} BMI.`);
        break;
    case john.bmi < mark.bmi:
        console.log(`${mark.fullName} has ${mark.bmi} BMI.`);
        break;
    default:
        console.log(`They have the same BMI: ${john.bmi} / ${mark.bmi}`);
        break;
}
