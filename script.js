'use-strict';

const previousOpernd = document.querySelector("[data-previousOperand]");
const currentOpernd = document.querySelector("[data-currentOperand]");
const deleteBtn = document.querySelector("[data-delete]");
const resultBtn = document.querySelector("[data-output]");
const resetBtn = document.querySelector("[data-reset]");
const btn = document.querySelectorAll("[data-num]");
const operatorBtn = document.querySelectorAll("[data-operator]");

let currOperand = currentOpernd.innerHTML;
let prevOperand = previousOpernd.innerHTML;
let operation;

const displayNum = () => {
    currentOpernd.innerText = formatNumber(currOperand);
    if (operation !== undefined) {
        previousOpernd.innerText = `${formatNumber(prevOperand)} ${operation.toString("en")}`;
    } else {
        previousOpernd.innerText = prevOperand;
    }
};

const deleteOprnd = () => {
    currOperand = currOperand.slice(0, -1);
};

deleteBtn.addEventListener("click", () => {
    deleteOprnd();
    displayNum();
});

const reset = () => {
    prevOperand = "";
    currOperand = "";
    operation = undefined;
};

resetBtn.addEventListener("click", () => {
    reset();
    displayNum();
});

const addNum = num => {
    if (num === "." && currOperand.includes(".")) return;
    currOperand = currOperand.toString() + num.toString();
};

const operationSelection = operate => {
    if (currentOpernd === "") return;

    if (previousOpernd !== "") {
        calculatorOperation();
    }

    operation = operate;
    prevOperand = currOperand;
    currOperand = "";
};

const formatNumber = (num) => {
    return Number(num).toLocaleString("en");
};

const calculatorOperation = () => {
    let result;
    let prev = parseFloat(prevOperand);
    let curr = parseFloat(currOperand);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operation) {
        case "+":
            result = prev + curr;
            break;
        case "-":
            result = prev - curr;
            break;
        case "×":
            result = prev * curr;
            break;
        case "/":
            result = prev / curr;
            break;
        default:
            return;
    }

    currOperand = result;
    operation = undefined;
    prevOperand = "";
    previousOpernd.innerText = "";
}

btn.forEach(operand => {
    operand.addEventListener("click", () => {
        addNum(operand.innerText);
        displayNum();
    });
});

operatorBtn.forEach(oprBtn => {
    oprBtn.addEventListener("click", () => {
        operationSelection(oprBtn.innerText);
        displayNum();
    });
});

resultBtn.addEventListener("click", () => {
    calculatorOperation();
    displayNum();
});