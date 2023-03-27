const numPerPerson = document.getElementById('person-input')
const billAmount = document.getElementById('bill-input')
const tipPercentage = document.getElementById('tip-percentage')
const tip_output = document.getElementById('tip-output')
const total_output = document.getElementById('total-output')
const keys = document.querySelectorAll('.key')
const operator = ['%']

/* The calculateTip() function is triggered when the 'CALCULATE' button is clicked, refer to the README.md file to understand how it works */
function calculateTip() {
    let tipAmount = billAmount.value * (tipPercentage.value / 100)
    let totalAmount = parseFloat(billAmount.value) + parseFloat(tipAmount)
    let amountPerPerson = totalAmount / numPerPerson.value
    tip_output.innerHTML = "$" + tipAmount.toFixed(2)
    total_output.innerHTML = "$" + totalAmount.toFixed(2)
    if (tipPercentage.value.includes(operator)) {
        alert('Please do not include "%"')
        tip_output.innerHTML = "$" + "0.00"
        total_output.innerHTML = "$" + "0.00"
    }
    /* The below codes simply checks if empty value exists in our input */
    if ( billAmount.value == '' || billAmount.value == 0 )
    {
        alert("Bill can't be 0")
    } else if (tipPercentage.value == '' || tipPercentage.value == 0) {
        alert("Tip can't be 0")
    } else if (numPerPerson.value == '' || numPerPerson.value == 0) {
        alert("Number of people can't be 0")
    } else return;
}

/* The resetCalculator() function is triggered when the 'RESET' button is clicked. it just resets all the values */
function resetCalculator() {
    billAmount.value = ''
    tipPercentage.value = ''
    numPerPerson.value = ''
    tip_output.innerHTML = "$" + "0.00"
    total_output.innerHTML = "$" + "0.00"
}
/* Iterating through the buttons using "for of" loop to append each value to the tip percentage input */
for (let key of keys) {
    const value = key.dataset.key
    key.addEventListener('click', () => {
        if (value == "5") {
            tipPercentage.value = value
        } else if (value == "10") {
            tipPercentage.value = value
        } else if (value == "20") {
            tipPercentage.value = value
        } else if (value == "40") {
            tipPercentage.value = value
        } else if (value == "50") {
            tipPercentage.value = value
        } 
    })
}
