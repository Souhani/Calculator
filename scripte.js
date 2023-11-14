//constants from the DOM
const screen = document.querySelector('h1');
const btns = document.querySelectorAll('button');

// variables
let firstNumber = 0;
let usedOperator = '';
let awaitNextNumber = false;
let calculation = {
    '*': (firstNumber, nextNumber) => firstNumber * nextNumber,
    '/': (firstNumber, nextNumber) => firstNumber / nextNumber,
    '+': (firstNumber, nextNumber) => firstNumber + nextNumber,
    '-': (firstNumber, nextNumber) => firstNumber - nextNumber,
    '=': (firstNumber, nextNumber) => firstNumber,
}

// functions
function displayNumber(number) {
    const currentDisplay = screen.textContent;
    if(currentDisplay == '0' || awaitNextNumber) {
        screen.textContent = number;
        awaitNextNumber = false;
    } else {
        screen.textContent = currentDisplay + number;
    }
}
function useOperator(operator) {
    if(!awaitNextNumber){
        awaitNextNumber = true;
        const currentDisplay = screen.textContent;
        if(firstNumber) {
            nextNumber = Number(currentDisplay);
            firstNumber = calculation[usedOperator](firstNumber, nextNumber);
            screen.textContent = firstNumber;
        }else {
            firstNumber = Number(currentDisplay);
        }
    }
    usedOperator = operator;
}
function addDecimal () {
    const currentDisplay = screen.textContent;
    if(!awaitNextNumber && !currentDisplay.includes('.')) {
        screen.textContent = currentDisplay + '.'
    }
}
function resetAll () {
    firstNumber = 0;
    awaitNextNumber = false;
    screen.textContent = '0';
}

//Event listenrs
btns.forEach(btn => {
    if(!btn.classList.length) {
     btn.addEventListener('click', () => displayNumber(btn.value))
    }else if(btn.classList.contains('operator')) {
        btn.addEventListener('click', () => useOperator(btn.value))
    }else  if (btn.classList.contains('clear-btn')) {
        btn.addEventListener('click', resetAll)
    } else if (btn.classList.contains('decimal')) {
        btn.addEventListener('click', addDecimal)
    }
})