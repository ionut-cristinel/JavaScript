
const budgetController = (() => {

    // function constructor for expenses
    const Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome){

        if(totalIncome > 0){
            this.percentage = Math.round((this.value / totalIncome) * 100);
        }
        else{
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function(){
        return this.percentage;
    };

    // function constructor for income
    const Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    const calculateTotal = type => {
        var sum = 0;

        data.allItems[type].forEach(cur => {
            sum += cur.value;
        });

        data.totals[type] = sum;
    };
    
    // data storage
    const data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    return {
        // function expression to add new items to the list
        addItem: (type, des, val) => {
            var newItem, ID;

            ID = (data.allItems[type].length > 0) ? data.allItems[type][data.allItems[type].length - 1].id + 1 : 0;

            if(type === 'exp'){
                newItem = new Expense(ID, des, val);
            }
            else if(type === 'inc'){
                newItem = new Income(ID, des, val);
            }

            data.allItems[type].push(newItem);

            return newItem;
        },
        calculateBudget: () => {

            // calculates total income and expense
            calculateTotal('exp');
            calculateTotal('inc');

            // calculeaza total buget
            data.budget = data.totals.inc - data.totals.exp;

            // calculates the percentage of spending
            if(data.totals.inc > 0){

                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            }
            else{

                data.percentage = -1;
            }
        },
        getBudget: () => {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },
        deleteItem: (id, type) => {
            var ids, index;

            ids = data.allItems[type].map(current => current.id);

            index = ids.indexOf(id);

            if(index !== -1){

                data.allItems[type].splice(index, 1);
            }
        },
        calculatePercentages: () => {

            data.allItems.exp.forEach(cur => {
                cur.calcPercentage(data.totals.inc);
            });
        },
        getPercentages: () => {

            var allPerc = data.allItems.exp.map(current => current.getPercentage());

            return allPerc;
        }
    };

})();

////////////////////////////////////////

const UIController = (() => {

    // the list of html selectors used in the project
    const DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        precentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    }

    const formatNumber = (num, type) => {
        var numSplit, int, dec, sign;

        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');

        int = numSplit[0];

        if(int.length > 3){
            int = `${int.substr(0, int.length - 3)}, ${int.substr(int.length - 3, 3)}`;
        }

        dec = numSplit[1];

        type === 'exp' ? sign = '-' : sign = '+';

        return `${sign} ${int}.${dec}`;
    };

    const nodeListForEach = (list, callback) => {
        for(var i = 0; i < list.length; i++){
            callback(list[i], i);
        }
    };

    return {

        // function expression for collecting form values
        getInput: () => {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value) 
            }
        },

        // function expression to add new items to the page
        addListItem: (type, obj) => {
            var html, newHtml, element;

            if(type === 'inc'){
                element = DOMstrings.incomeContainer;
                html = `<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;
            }
            else if(type === 'exp'){
                element = DOMstrings.expensesContainer;
                html = `<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;
            }

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

            document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
        },

        // function expression to delete form values
        clearFields: () => {
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach((current, index, array) => {
                current.value = '';
            });

            fieldsArr[0].focus();
        },

        displayBudget: obj => {
            var type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';

            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');

            if(obj.percentage > 0){

                document.querySelector(DOMstrings.precentageLabel).textContent = obj.percentage + ' %';
            }
            else{

                document.querySelector(DOMstrings.precentageLabel).textContent = '---';
            }
        },

        deleteListItem: id => {

            var el = document.getElementById(id);
            el.parentNode.removeChild(el);
        },

        displayPercentages: percentages => {

            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

            nodeListForEach(fields, function(current, index){
                if(percentages[index] > 0){
                    current.textContent = percentages[index] + ' %';
                }
                else{
                    current.textContent = '---';
                }
            });
        },

        displayMonth: () => {
            var now, months, month, year;

            now = new Date();

            months = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];

            month = months[now.getMonth()];
            year = now.getFullYear();

            document.querySelector(DOMstrings.dateLabel).textContent = month + ' ' + year;
        },

        changedType: () => {

            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue
            );

            nodeListForEach(fields, function(current){

                current.classList.toggle('red-focus');
            });

            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
        },

        // function expression for returning the list of html elements
        getDOMstrings: () => {
            return DOMstrings;
        }
    }

})();

////////////////////////////////////////

const controller = ((budgetCtrl, UICtrl) => {

    // function expresion pentru adaugarea evenimentelor
    const setupEventListeners = () => {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', event => {
            if(event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
    };

    const updateBudget = () => {

        budgetCtrl.calculateBudget();

        var budget = budgetCtrl.getBudget();

        UICtrl.displayBudget(budget);
    };

    const updatePercentages = () => {

        budgetCtrl.calculatePercentages();

        var percentages = budgetCtrl.getPercentages();

        UICtrl.displayPercentages(percentages);
    };

    // function expresion pentru adaugarea elementelor noi in budgetController si UIController
    const ctrlAddItem = () => {
        var input, newItem;

        // 1. colecteaza valorile din formulare
        input = UICtrl.getInput();

        if(input.description !== '' && !isNaN(input.value) && input.value > 0){

            // 2. adauga itemul nou la budgetControler
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. afiseaza itemul nou in browser
            UICtrl.addListItem(input.type, newItem);

            // 4. sterge valorile din formulare
            UICtrl.clearFields();

            // 5. update buget
            updateBudget();

            updatePercentages();
        }
    };

    const ctrlDeleteItem = event => {
        var itemID, splitID, type, ID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(itemID){
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            // 1. delete item
            budgetCtrl.deleteItem(ID, type);

            // 2. delete from UI
            UICtrl.deleteListItem(itemID);

            // 3. update budget and show the new budget
            updateBudget();

            updatePercentages();
        }
    };

    return {
        init: () => {
            console.log('Aplicatia ruleaza!');
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    };
})(budgetController, UIController);

controller.init();