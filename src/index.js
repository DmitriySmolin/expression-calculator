function eval() {

    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

    class ExpressionError extends Error {

        constructor(message) {

            super(message);
            this.name = "ExpressionError";

        }
    }
    let SYArr = [];
    let operators = [];
    let res = [];
    let zeroDivision = false;

    let precDictionary = {
        "+": 2,
        "-": 2,
        "*": 3,
        "/": 3
    };

    let exprQuantified = [];

    if(/ /.test(expr)) {

        exprQuantified = expr.split(/ +/);

    } else {

        exprQuantified = expr.split("");

    }

    exprQuantified.map((char) => {

        if(/\d+/g.test(char)) {

            SYArr.push(char);

        } else {

            if(/[\-+*/]/g.test(char)) {

                while ((precDictionary[operators[operators.length - 1]] >= precDictionary[char]) && operators[operators.length - 1] !== "(") {
                    
                    SYArr.push(operators.pop());

                }

                operators.push(char);

            } else {

                if(char === "(") {

                    operators.push(char);

                } else {

                    if(char === ")") {

                        while (operators[operators.length - 1] !== "(") {

                            SYArr.push(operators.pop());

                        }

                        if (operators[operators.length - 1] === "(") {

                            operators.pop();

                        }

                    }
                }
            }
        }
    });

    while (operators.length > 0) {

        SYArr.push(operators.pop());

    }

    SYArr.forEach(sign => {

        //Brackets expr to res

        if (/\d+/g.test(sign)) res.push(sign);

        //Partial calc

        switch (sign) {

            case "+":

                removeTopAddCalculated(Number(res[res.length - 2]) + Number(res[res.length - 1]), res);
                break;

            case "-":

                removeTopAddCalculated(Number(res[res.length - 2]) - Number(res[res.length - 1]), res);
                break;

            case "/":

                if (res[res.length - 1] == 0) {
                    zeroDivision = true;
                }

                removeTopAddCalculated(Number(res[res.length - 2]) / Number(res[res.length - 1]), res);
                break;

            case "*":

                removeTopAddCalculated(Number(res[res.length - 2]) * Number(res[res.length - 1]), res);
                break;

        }
    });

    const finalRes = res[0];

    // Calculation error in case of unpaired brackets

    if (isNaN(finalRes)) {

        throw new ExpressionError('ExpressionError: Brackets must be paired');

    } else {
    
    // Divided by zero

        if (zeroDivision) {

            throw new TypeError("TypeError: Division by zero.");

        } else {
    //OK res
            return finalRes;

        }

    }

    //Support functions
    
    function removeTopAddCalculated(miniRes, dest) {

        dest.pop();
        dest.pop();

        dest.push(miniRes);

    }
}

module.exports = {
    expressionCalculator
};