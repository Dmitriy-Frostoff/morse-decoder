const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

const MORSE_TABLE_BINARY = {
    '0000001011':   'a',
    '0011101010':   'b',
    '0011101110':   'c',
    '0000111010':   'd',
    '0000000010':   'e',
    '0010101110':   'f',
    '0000111110':   'g',
    '0010101010':   'h',
    '0000001010':   'i',
    '0010111111':   'j',
    '0000111011':   'k',
    '0010111010':   'l',
    '0000001111':   'm',
    '0000001110':   'n',
    '0000111111':   'o',
    '0010111110':   'p',
    '0011111011':   'q',
    '0000101110':   'r',
    '0000101010':   's',
    '0000000011':   't',
    '0000101011':   'u',
    '0010101011':   'v',
    '0000101111':   'w',
    '0011101011':   'x',
    '0011101111':   'y',
    '0011111010':   'z',
    '1011111111':   '1',
    '1010111111':   '2',
    '1010101111':   '3',
    '1010101011':   '4',
    '1010101010':   '5',
    '1110101010':   '6',
    '1111101010':   '7',
    '1111111010':   '8',
    '1111111110':   '9',
    '1111111111':   '0',
    '**********':   ' '
  };

function decode(expr) {
    // write your solution here
    const getIterableExpression = (expression, expressionToArr = [], element = '') => {
      const getElemSubstring = (expression, element, iCount) => {
        element = (expression.slice(iCount, iCount+10));
        return element;
      }
    
      const addZeroBeforeElement = (element) => {
        return element.padStart(10, `0`);
      }

      for (let iCount = 0; iCount < expression.length; iCount+= 10) {
          element = getElemSubstring(expression, element, iCount);
          element = addZeroBeforeElement(element);
          expressionToArr.push(element);
        }
        
        return expressionToArr;
      }

      const convertBinaryMorseToHumanArr = (iterableExpression) => {
        let value;
      
        const getValueEqElement = (element) => {
          Object.keys(MORSE_TABLE_BINARY).find(key => {
            if (key === element) {
              value = MORSE_TABLE_BINARY[key];
              return value;
            };
          })
          
          return value;
        }
      
        let resultArray = iterableExpression.map(item => {
          if (getValueEqElement(item)) {
            return getValueEqElement(item);
          }
        })
        
        return resultArray;
      }

      let iterableExpression = getIterableExpression(expr, [], '');
      let humanReadableExprArr = convertBinaryMorseToHumanArr(iterableExpression);
      let humanReadableExpr = humanReadableExprArr.join('');

      return humanReadableExpr;
}

module.exports = {
    decode
}