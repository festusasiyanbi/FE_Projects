const displayColor = document.getElementById('color-container')
const input = document.getElementById('input')

input.addEventListener('input', (e) => {
    displayColor.textContent = e.target.value
    displayColor.style.backgroundColor = e.target.value
    if (e.target.value === "white"  || e.target.value === "White" ) {
        displayColor.style.color = "black"
    }
    else if (e.target.value === "black" || e.target.value === "Black") {
        displayColor.style.color = "white"
    }
    else return displayColor.style.color = "black" 
})
