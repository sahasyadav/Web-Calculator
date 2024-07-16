document.addEventListener('DOMContentLoaded', function() {
    const displayingText = document.querySelector('.displaying-text');
    let currentText = '0';

    function updateDisplay(value) {
        displayingText.textContent = value;
    }

    function clearDisplay() {
        currentText = '0';
        updateDisplay(currentText);
    }

    function deleteLastDigit() {
        if (currentText.length > 1) {
            currentText = currentText.slice(0, -1);
        } else {
            currentText = '0';
        }
        updateDisplay(currentText);
    }

    function handleNumberClick(e) {
        const number = e.target.textContent;
        if (currentText === '0' && number !== '0') {
            currentText = number;
        } else if (currentText !== '0') {
            currentText += number;
        }
        updateDisplay(currentText);
    }

    function handleOperatorClick(e) {
        const operator = e.target.textContent;
        if (currentText !== '0') {
            currentText += ` ${operator} `;
            updateDisplay(currentText);
        }
    }

    function handleEqualsClick() {
        try {
            currentText = evaluateExpression(currentText);
            updateDisplay(currentText);
        } catch (error) {
            updateDisplay('Error');
            currentText = '0';
        }
    }

    function evaluateExpression(expression) {
        const operators = {
            '+': (a, b) => a + b,
            '−': (a, b) => a - b,
            '×': (a, b) => a * b,
            '÷': (a, b) => a / b,
            '%': (a, b) => a % b
        };

        const tokens = expression.split(' ').filter(token => token.trim() !== '');
        let result = parseFloat(tokens[0]);

        for (let i = 1; i < tokens.length; i += 2) {
            const operator = tokens[i];
            const operand = parseFloat(tokens[i + 1]);
            if (operators[operator]) {
                result = operators[operator](result, operand);
            } else {
                throw new Error('Invalid operator');
            }
        }

        return result;
    }

    function handleClearClick() {
        clearDisplay();
    }

    function handleDeleteClick() {
        deleteLastDigit();
    }

    function handleDotClick() {
        if (!currentText.includes('.')) {
            currentText += '.';
            updateDisplay(currentText);
        }
    }

    // Event listeners for number buttons
    const numberButtons = document.querySelectorAll('.number');
    numberButtons.forEach(button => {
        button.addEventListener('click', handleNumberClick);
    });

    // Event listeners for operator buttons
    const operatorButtons = document.querySelectorAll('.operator');
    operatorButtons.forEach(button => {
        button.addEventListener('click', handleOperatorClick);
    });

    // Event listener for equals button
    const equalsButton = document.querySelector('.equals');
    equalsButton.addEventListener('click', handleEqualsClick);

    // Event listener for clear button
    const clearButton = document.querySelector('.clear');
    clearButton.addEventListener('click', handleClearClick);

    // Event listener for delete button
    const deleteButton = document.querySelector('.delete');
    deleteButton.addEventListener('click', handleDeleteClick);

    // Event listener for dot button
    const dotButton = document.querySelector('.dot');
    dotButton.addEventListener('click', handleDotClick);
});
