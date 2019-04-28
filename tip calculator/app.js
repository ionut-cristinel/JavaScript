
var john = {
    fullName: 'John Smith',
    bills: [124, 48, 268, 180, 42],
    allTips: [],
    total: [],
    tipCalculator: function(){
        var tip, percentage, bill;
        for(var i = 0; i < this.bills.length; i++){
            bill = this.bills[i];
            switch(true){
                case bill <= 50:
                    percentage = 20 / 100;
                    break;
                case bill > 50 && bill < 200:
                    percentage = 15 / 100;
                    break;
                case bill >= 200:
                    percentage = 10 / 100;
                    break;
            }
            tip = percentage * bill;
            this.allTips.push(tip);
            this.total.push(bill + tip);
        }
    }
};

var mark = {
    fullName: 'Mark Miller',
    bills: [77, 475, 110, 45],
    allTips: [],
    total: [],
    tipCalculator: function(){
        var tip, percentage, bill;
        for(var i = 0; i < this.bills.length; i++){
            bill = this.bills[i];
            switch(true){
                case this.bills[i] <= 100:
                    percentage = 20 / 100;
                    break;
                case this.bills[i] > 100 && this.bills[i] < 300:
                    percentage = 10 / 100;
                    break;
                case this.bills[i] >= 300:
                    percentage = 25 / 100;
                    break;
            }
            tip = percentage * bill;
            this.allTips.push(tip);
            this.total.push(bill + tip);
        }
    }
};

function averageCalculator(tips){
    var sum = 0;
    for(var i = 0; i < tips.length; i++){
        sum += tips[i];
    }
    return sum / tips.length;
}


john.tipCalculator();

console.log(john.bills);
console.log(john.allTips);
console.log(john.total);

console.log(' ');

mark.tipCalculator();

console.log(mark.bills);
console.log(mark.allTips);
console.log(mark.total);

console.log(' ');

john.average = averageCalculator(john.allTips);
mark.average = averageCalculator(mark.allTips);

if(john.average > mark.average){
    console.log('Smith family paid the highest tip: ' + john.average);
}
else{
    console.log('Miller family paid the highest tip: ' + mark.average);
}