class Budget{

constructor(){
    this.income=[];
    this.expenses=[];
}

addIncome(description, amount){
    this.income.push({description, amount})
    this.calculateNetIncome()
}

addExpense(description, amount){
    this.income.push({description, amount})
    this.calculateTotalExpenses();
}

calculateTax(){
   const totalIncome= this.income.reduce((sum,income)=> sum+income.amount,0)
   return totalIncome*0.30;
}

calculateNetIncome(){
    const finalIncome= this.income.reduce((sum,income)=> sum+income.amount,0)
    const tax= this.calculateTax();
    const netIncome= finalIncome-tax

document.getElementById('taxes').innerText= `$${tax.toFixed(2)}`
document.getElementById('netIncome').innerText= `$${netIncome.toFixed(2)}`
document.getElementById('monthNetIncome').innerText= `$${netIncome.toFixed(2)}`
document.getElementById('annualNetIncomee').innerText= `$${(netIncome*12).toFixed(2)}`


}


}