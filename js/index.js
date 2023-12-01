const inputElement = window.document.getElementById("calc-screen");
const hiddenMath = window.document.getElementById("math-formula");
let mathFormula = [];
let result = "";
let symbol = {
    "×": "*",
    "÷": "/",
    "+": "+",
    "%": "%",
    "−": "-"
};
window.document.querySelectorAll(".keys > .key").forEach(
    element => element.addEventListener('click', (event) => {
        const targetElement = event.target.outerText;
        const elementConvertedToInt = parseInt(event.target.outerText);

        if (!isNaN(elementConvertedToInt)) {
            inputElement.value += elementConvertedToInt;
            hiddenMath.value += elementConvertedToInt;
            return;
        } else if (targetElement == ',' || targetElement == "(" || targetElement == ")") {
            inputElement.value += targetElement;
            hiddenMath.value += targetElement;
            return;
        } else if (targetElement == '↶') {
            inputElement.value = inputElement.value.substring(0, inputElement.value.length - 1);
            hiddenMath.value = hiddenMath.value.substring(0, hiddenMath.value.length - 1);
            return;
        }

        switch (targetElement) {
            case "C":
                mathFormula = [];
                result = "";
                inputElement.value = "";
                hiddenMath.value = "";
                break;
            case "=":
                mathFormula.push(inputElement.value);
                result = mathFormula.join("").replaceAll(",", ".");
                inputElement.value = new Function("return " + result)();
                mathFormula = [];
                hiddenMath.value = inputElement.value.replaceAll(".", ",");
                break;
            case "√":
                mathFormula.push(inputElement.value);
                result = mathFormula.join("").replaceAll(",", ".");
                inputElement.value = Math.sqrt(result);
                mathFormula = [];
                hiddenMath.value = inputElement.value;
                break;
            case "x²":
                mathFormula.push(inputElement.value);
                result = mathFormula.join("").replaceAll(",", ".");
                inputElement.value = Math.pow(result, 0.5);
                mathFormula = [];
                hiddenMath.value = inputElement.value;
                break;
            default:
                mathFormula.push(inputElement.value);
                mathFormula.push(symbol[targetElement]);
                inputElement.value = "";
                hiddenMath.value += targetElement;
                break;
        }
    })
);