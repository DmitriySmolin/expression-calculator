function eval() {

    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    const oper = [")", "(", "+", "-", "*", "/"];

    if (checkBrackets(expr) === false) throw new Error("ExpressionError: Brackets must be paired");

    if (expr.split("").includes(" ") === false) expr = addSpace(expr);

    let arr = deleteSpace(expr.split(" "));

    let expArr = transformArr(arr);

    function transformArr(expArr) {
        let stack = [];
        let transformArr = [];

        for (let i = 0; i < expArr.length; i++) {

            if (oper.includes(expArr[i]) === false) transformArr.push(expArr[i]);

            else if (expArr[i] == "(") stack.push(expArr[i]);

            else if (expArr[i] == ")") {
                while (true) {
                    let pop = "";

                    if (stack.length > 0) pop = stack.pop();
                    else throw new Error("ExpressionError: Brackets must be paired");

                    if (pop !== "(") transformArr.push(pop);
                    else break;
                }


            } else if (oper.includes(expArr[i])) {

                while (true) {

                    if (checkIndexOf(expArr[i], stack[stack.length - 1])) {
                        transformArr.push(stack.pop());
                    } else {
                        stack.push(expArr[i]);
                        break;
                    }
                }

            }
        }

        while (stack.length > 0) {
            transformArr.push(stack.pop());
        }

        return transformArr;
    }

    function calculating(expArr) {
        let result = [];

        for (let i = 0; i < expArr.length; i++) {


            if (oper.includes(expArr[i]) === false) result.push(expArr[i]);


            if (oper.includes(expArr[i])) {
                let b = result.pop();
                let a = result.pop();

                if (expArr[i] === "+") result.push(Number(a) + Number(b));

                if (expArr[i] === "-") result.push(Number(a) - Number(b));

                if (expArr[i] === "*") result.push(Number(a) * Number(b));

                if (expArr[i] === "/") {
                    if (Number(b) === 0) throw new Error("TypeError: Division by zero.");
                    else result.push(Number(a) / Number(b));
                }
            }

        }
        return result[0];
    }

    return calculating(expArr);


    function checkBrackets(exp) {
        let open = 0;
        let close = 0;

        for (let key in exp) {

            if (exp.includes("(")) {
                open++;
                exp = exp.replace("(", "");
            }
            if (exp.includes(")")) {
                close++;
                exp = exp.replace(")", "");
            }

            if (open !== close) throw new Error("ExpressionError: Brackets must be paired");
        }

    }

    function addSpace(expr) {
        return expr = expr.split("").join(" ")
    }

    function deleteSpace(expr) {
        return expr.filter((item) => item !== '');
    }

    function checkIndexOf(el, lastEl) {
        return (oper.indexOf(lastEl) > 1 && oper.indexOf(el) > 1 &&
            oper.indexOf(el) < 4) || (oper.indexOf(lastEl) > 3 && oper.indexOf(el) > 3)
    }

}


module.exports = {
    expressionCalculator
};