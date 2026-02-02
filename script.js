
        let currentOperand = '0';
        let previousOperand = '';
        let operation = null;

        function appendNumber(number) {
            if (number === '.' && currentOperand.includes('.')) return;
            if (currentOperand === '0' && number !== '.') {
                currentOperand = number;
            } else {
                currentOperand += number;
            }
            updateDisplay();
        }

        function chooseOperation(op) {
            if (currentOperand === '') return;
            if (previousOperand !== '') {
                compute();
            }
            operation = op;
            previousOperand = currentOperand;
            currentOperand = '';
            updateDisplay();
        }

        function compute() {
            let computation;
            const prev = parseFloat(previousOperand);
            const current = parseFloat(currentOperand);
            if (isNaN(prev) || isNaN(current)) return;
            switch (operation) {
                case '+':
                    computation = prev + current;
                    break;
                case '-':
                    computation = prev - current;
                    break;
                case '×':
                    computation = prev * current;
                    break;
                case '÷':
                    if (current === 0) {
                        alert('Cannot divide by zero');
                        return;
                    }
                    computation = prev / current;
                    break;
                default:
                    return;
            }
            currentOperand = Math.round(computation * 100000000) / 100000000;
            operation = null;
            previousOperand = '';
            updateDisplay();
        }

        function clearDisplay() {
            currentOperand = '0';
            previousOperand = '';
            operation = null;
            updateDisplay();
        }

        function deleteLast() {
            currentOperand = currentOperand.toString().slice(0, -1);
            if (currentOperand === '') currentOperand = '0';
            updateDisplay();
        }

        function updateDisplay() {
            const currentOperandElement = document.getElementById('currentOperand');
            const previousOperandElement = document.getElementById('previousOperand');
            
            currentOperandElement.innerText = currentOperand;
            if (operation != null) {
                previousOperandElement.innerText = `${previousOperand} ${operation}`;
            } else {
                previousOperandElement.innerText = '';
            }
        }

        // Keyboard support
        document.addEventListener('keydown', function(event) {
            if (event.key >= '0' && event.key <= '9') appendNumber(event.key);
            if (event.key === '.') appendNumber('.');
            if (event.key === '+') chooseOperation('+');
            if (event.key === '-') chooseOperation('-');
            if (event.key === '*') chooseOperation('×');
            if (event.key === '/') {
                event.preventDefault();
                chooseOperation('÷');
            }
            if (event.key === 'Enter' || event.key === '=') {
                event.preventDefault();
                compute();
            }
            if (event.key === 'Backspace') {
                event.preventDefault();
                deleteLast();
            }
            if (event.key === 'Escape') clearDisplay();
        });