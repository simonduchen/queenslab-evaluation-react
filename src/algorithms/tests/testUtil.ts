/**
 * Generates a long string with the given length and pattern.
 *
 * @param length The length of the string to generate.
 * @param pattern The pattern to use to generate the string.
 *
 * @returns The generated string.
 */
function generateString(length: number, pattern: string): string {
  let result = '';

  while (result.length < length) {
    const remainingLength = length - result.length;
    result +=
      pattern.length > remainingLength
        ? pattern.slice(0, remainingLength)
        : pattern;
  }

  return result;
}

/**
 * Generates a list of numbers with the given length.
 *
 * @param length The length of the array to generate.
 * @param range The range of the numbers to generate.
 *
 * @returns The generated array of numbers.
 */
function generateListOfNumbers(length: number, range: number): number[] {
  return Array.from({ length }, () => Math.ceil(Math.random() * range));
}

export { generateListOfNumbers, generateString };
