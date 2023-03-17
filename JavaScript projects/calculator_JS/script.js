const keys = document.querySelectorAll('.key') // This selects each key present in the 'keys' divisions
const display_input = document.querySelector('.display .input')   //This selects the input content
const display_output = document.querySelector('.display .output')  //This selects the output content

let input = ''   //This assigns an empty string value to my input
for (let key of keys) {   //looping through each key in the 'keys' division
    const value = key.dataset.key  //Stores the value of each key
    key.addEventListener('click', () => {   //Enables each key to listen for click
            /* If 'clear' key is clicked, we do not want to display anything on the screen so we set all the contents
            to be displayed on the wenpage to an empty string */
            if (value == 'clear') {
            input = ''
            display_input.innerHTML = ''
            display_output.innerHTML = ''
        } else if (value == "backspace") {
            input = input.slice(0, -1) // This deletes the last index element when the backspace is clicked
            display_input.innerHTML = CleanInput(input)
        } else if (value == '=') {
            let result = eval(PrepareInput(input))   //Eval() which stands for evaluation just as the names implies, evaluates the value of whatever we input
            display_output.innerHTML = CleanOutput(result)
            /* To check and confirm which bracket to apply and when. Bracket doesn't exist when the value is -1 and it exists when it doesn't not equal -1 */
        } else if (value == 'brackets') {   
            if (
                input.indexOf('(') == -1 ||
                input.indexOf('(') != -1 &&
                input.indexOf(')') != -1 &&
                input.lastIndexOf('(') < input.lastIndexOf(')')
            ) {
                input += '('
        } else if (
                input.indexOf('(') != -1 &&
                input.indexOf(')') == -1 ||
                input.indexOf('(') != -1 &&
                input.indexOf(')') != -1 &&
                input.lastIndexOf('(') > input.lastIndexOf(')'))
            {
                input += ')'
            } display_input.innerHTML = CleanInput(input)
        } else {
            if (ValidateInput(value)) {   //This displays on the screen the value of whichever key we click after all the conditions are checked
                input += value
                display_input.innerHTML = CleanInput(input)
            }
        }
    })
}

/*The CleanInput() function changes the operators to be displayed on the screen from the hard coded ones in HTMl to the assignmed ones below */
const CleanInput = (input) => {
    let input_array = input.split('') // This turns all the keys into an array
    for (let i = 0; i < input_array.length; i++) {  // I'm iterating through the array. The rest are conditions to check which key is passed in
        if (input_array[i] == '*') {
            input_array[i] = `<span class="operator">x</span>`
        } else if (input_array[i] == '/') {
            input_array[i] = `<span class="operator">/</span>` 
        } else if (input_array[i] == '-') {
            input_array[i] = `<span class="operator">-</span>` 
        } else if (input_array[i] == '+') {
            input_array[i] = `<span class="operator">+</span>` 
        } else if (input_array[i] == '%') {
            input_array[i] = `<span class="percent">%</span>`
        } else if (input_array[i] == '(') {
            input_array[i] = `<span class="brackets">(</span>`
        } else if (input_array[i] == ')') {
            input_array[i] = `<span class="brackets">)</span>`
        } 
    }   return input_array.join('')   // joining the array back into a string
}

/* What CleanOutput() function does is that it checks whenever the output is beyond 3digits, then it seperates the last 3 elements 
in the string with a comma. For eg. without the CleaOutput(), if we evaluate input to be 1 million, the computer would display it as 1000000
but with the CleaOutput(), it displays as 1,000,000 and thats what the line of code in 79 does */

const CleanOutput = (output) => {
    let output_string = output.toString()
    let decimal = output_string.split('.')[1]
    output_string = output_string.split('.')[0]
    let output_array = output_string.split('')
    if (output_array.length > 3) {
        for (let i = output_array.length - 3; i > 0; i -= 3) {
            output_string = output_array.splice(i, 0, ",")
        }
    } if (decimal) {
        output_array.push('.')
        output_array.push(decimal)
    } return output_array.join("")
}
/* The ValidateInput() checks if we have an operator as the last input, then I don't want user to be able add more operators.
It wouldn't make sense if user enters for example, 8+++. thus the ValidateInput checks if we already have 8+, then the rest of the '++' 
would be ignored and return no value */
const ValidateInput = (value) => {
    let operators = ['*', '+', '-', '/', '%', '']
    let last_input = input.slice(-1)
    if (value == '.' && last_input == '.') {
        return false
    }
    if (operators.includes(value)) {
        if (operators.includes(last_input)) {
            return false
        } else {
        return true
        }
    } return true
}

/* This evaluates the percentage value when being used */
const PrepareInput = (input) => {
    let input_array = input.split('')
    for (i = 0; i < input_array.length; i++) {
        if (input_array[i] == '%') {
            input_array[i] = '/100'
        }
    } return input_array.join('')
}