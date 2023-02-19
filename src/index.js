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
    '1011':     'a',
    '11101010':   'b',
    '11101110':   'c',
    '111010':    'd',
    '10':      'e',
    '10101110':   'f',
    '111110':    'g',
    '10101010':   'h',
    '1010':     'i',
    '10111111':   'j',
    '111011':    'k',
    '10111010':   'l',
    '1111':     'm',
    '1110':     'n',
    '111111':    'o',
    '10111110':   'p',
    '11111011':   'q',
    '101110':    'r',
    '101010':    's',
    '11':      't',
    '101011':    'u',
    '10101011':   'v',
    '101111':    'w',
    '11101011':   'x',
    '11101111':   'y',
    '11111010':   'z',
    '1011111111':  '1',
    '1010111111':  '2',
    '1010101111':  '3',
    '1010101011':  '4',
    '1010101010':  '5',
    '1110101010':  '6',
    '1111101010':  '7',
    '1111111010':  '8',
    '1111111110':  '9',
    '1111111111':  '0',
    '**********':  ' '
  };

function decode(expr) {
    // write your solution here
    const getIterableExpression = (expression, expressionToArr = [], element = '') => {
        for (let iCount = 0; iCount <= expression.length; iCount+= 10) {
          const getElemSubstring = (expression, element, iCount) => {
            element = (expression.slice(iCount, iCount+10));
            return element;
          }
        
          const addZeroBeforeElement = (element) => {
            while (element.length < 10) {
              element = [...element];
              element.unshift('0');
              element = element.join('');
            }
            return element;
          }
        
          element = getElemSubstring(expression, element, iCount);
        
          element = addZeroBeforeElement(element);
        
          expressionToArr.push(element);
        }
        
        return expressionToArr;
      }

      getIterableExpression(expr, [], '');
}

module.exports = {
    decode
}