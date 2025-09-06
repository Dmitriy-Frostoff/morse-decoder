/*
const MORSE_TABLE = {
  '.-': 'a',
  '-...': 'b',
  '-.-.': 'c',
  '-..': 'd',
  '.': 'e',
  '..-.': 'f',
  '--.': 'g',
  '....': 'h',
  '..': 'i',
  '.---': 'j',
  '-.-': 'k',
  '.-..': 'l',
  '--': 'm',
  '-.': 'n',
  '---': 'o',
  '.--.': 'p',
  '--.-': 'q',
  '.-.': 'r',
  '...': 's',
  '-': 't',
  '..-': 'u',
  '...-': 'v',
  '.--': 'w',
  '-..-': 'x',
  '-.--': 'y',
  '--..': 'z',
  '.----': '1',
  '..---': '2',
  '...--': '3',
  '....-': '4',
  '.....': '5',
  '-....': '6',
  '--...': '7',
  '---..': '8',
  '----.': '9',
  '-----': '0',
};
*/

function decode(expr) {
  // write your solution here
  const getIterableExpression = (
    expression,
    expressionToArr = [],
    element = ''
  ) => {
    const getElemSubstring = (expression, element, iCount) => {
      element = expression.slice(iCount, iCount + 10);
      return element;
    };

    const addZeroBeforeElement = (element) => {
      return element.padStart(10, `0`);
    };

    for (let iCount = 0; iCount < expression.length; iCount += 10) {
      element = getElemSubstring(expression, element, iCount);
      element = addZeroBeforeElement(element);
      expressionToArr.push(element);
    }

    return expressionToArr;
  };

  const convertBinaryMorseToHumanArr = (iterableExpression) => {
    let value;

    const getValueEqElement = (element) => {
      Object.keys(MORSE_TABLE_BINARY).find((key) => {
        if (key === element) {
          value = MORSE_TABLE_BINARY[key];
          return value;
        }
      });

      return value;
    };

    const resultArray = iterableExpression.map((item) => {
      if (getValueEqElement(item)) {
        return getValueEqElement(item);
      }
    });

    return resultArray;
  };

  const iterableExpression = getIterableExpression(expr, [], '');
  const humanReadableExprArr = convertBinaryMorseToHumanArr(iterableExpression);
  const humanReadableExpr = humanReadableExprArr.join('');

  return humanReadableExpr;
}

module.exports = {
  decode,
};
