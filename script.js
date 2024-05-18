class Budget{

constructor(){
    this.income=[];
    this.expenses=[];
}

addIncome(description, amount){
    this.income.push({description, amount})
    this.calculateNetIncome()
    //Calls this after to update the net income based on the new entry
    // netsted method is invoked to ensure that the income is recalculated and updated. 
}

addExpense(description, amount){
    this.expenses.push({description, amount})
    this.calculateTotalExpenses();
    
}

calculateTax(){
   const totalIncome= this.income.reduce((sum,income)=> sum+income.amount,0)
   return totalIncome*0.30;
//reduce is an array method that iterates over all items in the array, 
//accumulating a single result, .amount is each income object that holds the income value. And 0 is a starting point 
}

calculateNetIncome(){
    const finalIncome= this.income.reduce((sum,income)=> sum+income.amount,0)
    const tax= this.calculateTax();
    const netIncome= finalIncome-tax

    //Update HTML elements with calculated values. The second $ will represent U.S currency and fix limits the decimals returned by 2
    document.getElementById('taxes').innerText= `$${tax.toFixed(2)}`
    document.getElementById('grossIncome').innerText= `$${finalIncome.toFixed(2)}`
    document.getElementById('netIncome').innerText= `$${netIncome.toFixed(2)}`
    document.getElementById('monthNetIncome').innerText= `$${netIncome.toFixed(2)}`
    document.getElementById('annualNetIncome').innerText= `$${(netIncome*12).toFixed(2)}`

    

    // Call other methods to update related calculations
    this.calcMaxMonthlySpend()
    this.calcMonthlySave()
    this.calcAnnual()
}


calculateTotalExpenses(){
    const totalExpenses= this.expenses.reduce((sum,expenses)=> sum+expenses.amount,0)
    document.getElementById('totalExpenses').innerText= `$${totalExpenses.toFixed(2)}`
    
    this.calcMaxMonthlySpend()
    this.calcMonthlySave()
    this.calcAnnual()
}


calcMaxMonthlySpend() {
    //update net income from a string to a number or return 0 if conversion fails
    //parseFloat converts a string to a floating point number
    const netIncome = parseFloat(document.getElementById('netIncome').innerText.replace('$', '')) || 0;
    const totalExpenses = this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const maxMonthlySpend = netIncome - totalExpenses;
    document.getElementById('monthMaxNetIncome').innerText = `$${maxMonthlySpend.toFixed(2)}`;
}

calcMonthlySave() {
    const netIncome = parseFloat(document.getElementById('netIncome').innerText.replace('$', '')) || 0;
    const monthlySavings = netIncome * 0.20;
    document.getElementById('monthSave').innerText = `$${monthlySavings.toFixed(2)}`;
}

calcAnnual(){
    const netIncome = parseFloat(document.getElementById('netIncome').innerText.replace('$', '')) || 0;
    const totalExpenses = this.expenses.reduce((sum, expense) => sum + expense.amount, 0);

    const annualIncome= netIncome*12;
    const maxAnnualSpend = (netIncome - totalExpenses) * 12;
    const annualSavings = netIncome * 12 * 0.20;
    

    document.getElementById('annualNetIncome').innerText= `$${annualIncome.toFixed(2)}`;
    document.getElementById('yearMaxNetIncome').innerText = `$${maxAnnualSpend.toFixed(2)}`;
    document.getElementById('yearSave').innerText = `$${annualSavings.toFixed(2)}`;
}
}


// Now start using the class the variable budget will manage and update the budget data.

const budget = new Budget();

function addIncome() {

//set and retrieves the value from the HTML to add income
const description = document.getElementById('incomeDescription').value;
const amount = parseFloat(document.getElementById('incomeAmount').value);


//condtional checks input validation. If it's and empy string descrip will return as false
//  and isNaN returns regulary true if the amount is not a numner so use ! to get the opposite

if (description && !isNaN(amount) && amount > 0) {
    budget.addIncome(description, amount);
    displayIncome(description, amount);
}
}

function addExpense() {
const description = document.getElementById('expenseDescription').value;
const amount = parseFloat(document.getElementById('expenseAmount').value);

if (description && !isNaN(amount) && amount > 0) {
    budget.addExpense(description, amount);
    displayExpense(description, amount);
}
}

function displayIncome(description, amount) {
const incomeList = document.getElementById('incomeList');
const item = document.createElement('div');
item.innerText = `${description}: $${amount.toFixed(2)}`;
incomeList.appendChild(item);
}
//Target the container div incomeList. Create a new div within that div called item which
//is updated with decription and ammount then added to the container div. 

function displayExpense(description, amount) {
const expenseList = document.getElementById('expenseList');
const item = document.createElement('div');
item.innerText = `${description}: $${amount.toFixed(2)}`;
expenseList.appendChild(item);
}








