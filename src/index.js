// const MORSE_TABLE = {
//   '.-': 'a',
//   '-...': 'b',
//   '-.-.': 'c',
//   '-..': 'd',
//   '.': 'e',
//   '..-.': 'f',
//   '--.': 'g',
//   '....': 'h',
//   '..': 'i',
//   '.---': 'j',
//   '-.-': 'k',
//   '.-..': 'l',
//   '--': 'm',
//   '-.': 'n',
//   '---': 'o',
//   '.--.': 'p',
//   '--.-': 'q',
//   '.-.': 'r',
//   '...': 's',
//   '-': 't',
//   '..-': 'u',
//   '...-': 'v',
//   '.--': 'w',
//   '-..-': 'x',
//   '-.--': 'y',
//   '--..': 'z',
//   '.----': '1',
//   '..---': '2',
//   '...--': '3',
//   '....-': '4',
//   '.....': '5',
//   '-....': '6',
//   '--...': '7',
//   '---..': '8',
//   '----.': '9',
//   '-----': '0',
// };

const MORSE_TABLE_BINARY = {
  '0000001011': 'a',
  '0011101010': 'b',
  '0011101110': 'c',
  '0000111010': 'd',
  '0000000010': 'e',
  '0010101110': 'f',
  '0000111110': 'g',
  '0010101010': 'h',
  '0000001010': 'i',
  '0010111111': 'j',
  '0000111011': 'k',
  '0010111010': 'l',
  '0000001111': 'm',
  '0000001110': 'n',
  '0000111111': 'o',
  '0010111110': 'p',
  '0011111011': 'q',
  '0000101110': 'r',
  '0000101010': 's',
  '0000000011': 't',
  '0000101011': 'u',
  '0010101011': 'v',
  '0000101111': 'w',
  '0011101011': 'x',
  '0011101111': 'y',
  '0011111010': 'z',
  1011111111: '1',
  1010111111: '2',
  1010101111: '3',
  1010101011: '4',
  1010101010: '5',
  1110101010: '6',
  1111101010: '7',
  1111111010: '8',
  1111111110: '9',
  1111111111: '0',
  '**********': ' ',
};

/**
 * Decode Morze encoded string into human readable expression
 * check the @link{./README.md} for more and examples below for clarification.
 *
 * @note ! Impure function (it's a module, an aggregation function) !
 * - implicit dependency on @link{MORSE_TABLE_BINARY} (@note it's encapsulated)
 *
 * @param {string} expr - Morze encoded string
 * @returns {string} - human readable expression
 *
 * @example
 *    const expr =
 *    '00101010100000000010001011101000101110100000111111**********00001011110000111111000010111000101110100000111010';
 *    decode(expr) => 'hello world'
 *
 *    const expr =
      '000000101100000011100000101010000010111100000000100000101110**********00001111110000001110**********000000001100101010100000000010**********00001010110010111010000000001100000010100000001111000000101100000000110000000010**********00111110110000101011000000001000001010100000000011000000101000001111110000001110**********00001111110010101110**********0010111010000000101000101011100000000010**********000000001100101010100000000010**********00001010110000001110000000101000101010110000000010000010111000001010100000000010**********000000101100000011100000111010**********0000000010001010101100000000100000101110001110111100000000110010101010000000101000000011100000111110**********00000010100000101010**********10101010111010111111';
 *    decode(expr) => 'answer on the ultimate question of life the universe and everything is 42'
 *
 *    const expr =
 *     '00000000100000111010101010111100111011100000001011111110101011111010101010101010';
 *    decode(expr) => 'ed3ca775'
 *
 */
function decode(expr) {
  // ---utils---

  /**
   * Break Morze encoded expression into chunks of 10 chars and return array filled with them.
   *
   * @param {string} expression - string of '0'(zeros), '1' and '*' (Morze encoded)
   * @param {string[]} expressionToArr - array to be filled with @link{expression} chunks
   * @returns {string[]} - array of string chunks (that are of '0'(zeros), '1' and '*')
   */
  function getIterableExpression(expression, expressionToArr = []) {
    /**
     * @param {string} string - string of '0'(zeros), '1' and '*'
     * @param {number} iCount - current index for chunk slicing
     *  (@note multiple of 10)
     * @returns {string} - string chunk of length 10
     *
     */
    function getStringChunk(string, iCount) {
      /** @type{string} */
      const currentChunk = string.slice(iCount, iCount + 10);
      return currentChunk;
    }

    /**
     * Add zeros (if needed) to the @link{currentChunk} till the @link{currentChunk}
     * length will've become 10
     * @param {string} currentChunk - string of '0'(zeros), '1' and '*'
     * @returns {string} - string of '0'(zeros), '1' and '*' with 'zeros' at the begining
     *  (till the @link{currentChunk} length is not equal to 10)
     */
    function addStartZerosToStringChunk(currentChunk) {
      return currentChunk.padStart(10, `0`);
    }

    // fill @link{expressionToArr} with string chunks (that are of '0'(zeros), '1' and '*')
    for (let iCount = 0; iCount < expression.length; iCount += 10) {
      let element = getStringChunk(expression, iCount);
      element = addStartZerosToStringChunk(element);
      expressionToArr.push(element);
    }

    return expressionToArr;
  }

  /**
   * Convert Morze encoded array of strings into array of human readable chars (letters, nums and spaces)
   *
   * @param {string[]} iterableExpression - array of Morze encoded strings
   * @returns {string[]} - array of human readable chars
   */
  function convertBinaryMorseToHumanArr(iterableExpression) {
    /**
     * @param {string} currentBinaryKey - Morze encoded char sequence
     * @returns {string} - human readable letter or empty string ('')
     */
    function getHumanLetterDueToKeyCallback(currentBinaryKey) {
      const [, humanLetter] =
        Object.entries(MORSE_TABLE_BINARY).find(([binaryKey, letter]) => {
          if (binaryKey === currentBinaryKey) {
            return letter;
          }
          return null;
        }) ?? [];

      return humanLetter ?? '';
    }

    // get human readable char (if possible)
    /** @type{string[]} */
    const resultArray = iterableExpression.map((binaryLetter) => {
      const result = getHumanLetterDueToKeyCallback(binaryLetter);

      if (result) {
        return result;
      }
      return '';
    });

    return resultArray;
  }

  // ---logic---
  const iterableExpression = getIterableExpression(expr, []);
  const humanReadableExprArr = convertBinaryMorseToHumanArr(iterableExpression);
  const humanReadableExpr = humanReadableExprArr.join('');

  return humanReadableExpr;
}

module.exports = decode;
