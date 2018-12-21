// expr := {expr}\s*(+|-)\s*{expr}
// expr := {diceExpr}
// diceExpr := {num}\s*T\s*{num}
// expr := {num}
// num = [0-9]

//expression terminations
//-----------------------
//\s*(([0-9]+T[0-9]|[0-9]+|[-+])\s*)+

function tokenize(expression) {
  let regex = /\s*([0-9]+\s*T\s*[0-9]+\s*|[0-9]+\s*|[-+]\s*)/g;
  let found = expression.match(regex);
  for (let i = 0; i < found.length; ++i) {
    found[i] = found[i].split(' ').join('');
  }

  return found;
}

function roll(expression) {
  let tokens = tokenize(expression);
  let result = 0;
  let operator = '+';
  let wasOperator = false;

  for (let i = 0; i < tokens.length; ++i) {
    let token = tokens[i];
    //if (i % 2 === 0) { //number expression and dice expression tokens should be on even indices
    if (isDiceExpression(token) && (wasOperator || i === 0)) {
      wasOperator = false;
      let diceParts = token.split('T');
      let numberOfDice = parseInt(diceParts[0]);
      let sidesOnDice = parseInt(diceParts[1]);
      for (let rolls = 0; rolls < numberOfDice; ++rolls) {
        let roll = Math.ceil(sidesOnDice * Math.random());
        result += applyOperator(operator, roll);
      }
    } else if (isNumberExpression(token) && (wasOperator || i === 0)) {
      wasOperator = false;
      result += applyOperator(operator, parseInt(token));
    } else if (isOperatorExpression(token) && (!wasOperator || i === 0)) {
      wasOperator = true;
      operator = token;
    } else {
      throw {
        name: "IllegalTokenException",
        message: "The token " + token + " is not allowed at this index."
      };
    }
  }
  return result;
}

function applyOperator(operator, number) {
  if (operator === '+') {
    return number;
  } else if (operator === '-') {
    return -number;
  } else {
    throw {
      name: "IllegalOperatorException",
      message: "The operator " + operator + " is not a supported operator."
    };
  }
}

function isDiceExpression(token) {
  let regex = /^[0-9]+T[0-9]+$/g
  return regex.test(token);
}

function isNumberExpression(token) {
  let regex = /^[0-9]+$/g;
  return regex.test(token);
}

function isOperatorExpression(token) {
  return token === '+' || token === '-';
}

// console.log(roll("1"));
// console.log(roll("-1"));
// console.log(roll("3"));
// console.log(roll("-5"));
// console.log(roll("243"));
// console.log(roll("1T3"));
// console.log(roll("-5T3"));
// console.log(roll("-10T20"));
// console.log(roll("3T3"))
// console.log(roll("-2T3 + 5 - 1T3"));
