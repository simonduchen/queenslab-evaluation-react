interface RemoveIdenticalLettersOptions {
  /**
   * Maximum number of consecutive duplicate characters allowed.
   *
   * @default 4
   */
  consecutiveLetterLimit?: number;
  /**
   * Maximum length of the input string.
   *
   * @default 1500000
   */
  maxInputLength?: number;
}

/**
 * Remove consecutive identical characters that are more than the defined limit which
 * defaults to 4.
 *
 * It removes as few characters as possible, i.e. allowing consecutive duplicates to go up to
 * three per instance.
 *
 * @param str String to remove consecutive identical characters from.
 * @param options Options object.
 *
 * @throws {TypeError | RangeError} When supplied a non-string or an input that is longer than
 *     the maximum length defined in the options.
 *
 * @returns A string with consecutive identical characters removed.
 *
 * @example
 * removeIdenticalLetters('aaaa'); // 'aaa'
 * removeIdenticalLetters('ffdttttyy'); // 'ffdtttyy'
 * removeIdenticalLetters('iiikigggg'); // 'iiikiggg'
 */
function removeIdenticalLetters(
  str: string,
  options?: RemoveIdenticalLettersOptions,
): string {
  const { maxInputLength = 150000, consecutiveLetterLimit = 4 } = options ?? {};

  if (typeof str !== 'string') {
    throw new TypeError(
      `removeIdenticalLetters() expected a string. But got supplied a ${typeof str}.`,
    );
  }

  if (str.length > maxInputLength) {
    throw new RangeError(
      `removeIdenticalLetters() expected an input with maximum length of ${maxInputLength}.` +
        ` But got supplied an input with length of ${str.length}.`,
    );
  }

  if (str.length < consecutiveLetterLimit) {
    return str;
  }

  let result: string = '';
  let consecutiveLetterCount: number = 1;

  for (let index: number = 1; index <= str.length; index += 1) {
    if (str[index] === str[index - 1]) {
      consecutiveLetterCount += 1;
    } else {
      result += str[index - 1].repeat(
        Math.min(consecutiveLetterLimit - 1, consecutiveLetterCount),
      );
      consecutiveLetterCount = 1;
    }
  }

  return result;
}

/**
 * Find the maximum odd sum of an array of numbers.
 *
 * @param numbers - Numbers to find the maximum odd sum of.
 *
 * @throws {TypeError} When supplied a non-array or an array with non-numbers.
 *
 * @returns The maximum odd sum of the array of numbers.
 *
 * @example
 * maximumOddSum([19, 2, 42, 18]); // 61
 * maximumOddSum([61, 32, 51]); // 93
 * maximumOddSum([1, 2, 3, 4, 5]); // 9
 */
function maximumOddSum(numbers: number[]): number {
  if (!Array.isArray(numbers)) {
    throw new TypeError(
      `maximumOddSum() expected an array of numbers. But got supplied an ${typeof numbers}.`,
    );
  }

  const oddNumbers: number[] = numbers.filter(
    (number) => typeof number === 'number' && number % 2 !== 0,
  );
  const evenNumbers: number[] = numbers.filter(
    (number) => typeof number === 'number' && number % 2 === 0,
  );

  if (!oddNumbers.length || !evenNumbers.length) {
    return 0;
  }

  const maxOdd: number = Math.max(...oddNumbers);
  const maxEven: number = Math.max(...evenNumbers);

  return maxOdd + maxEven;
}

export { maximumOddSum, removeIdenticalLetters };
