import { describe, expect, it } from 'vitest';
import { maximumOddSum, removeIdenticalLetters } from '../index';

describe('removeIdenticalLetters', () => {
  it('is a function', () => {
    expect(removeIdenticalLetters).toBeTypeOf('function');
  });

  it('is a pure function', () => {
    const str = 'john';
    const copyOfStr = str;

    removeIdenticalLetters(str);

    expect(str).toBe(copyOfStr);
  });

  it('returns a string if supplied with a string', () => {
    expect(removeIdenticalLetters('john')).toBeTypeOf('string');
    expect(removeIdenticalLetters('john doe')).toBeTypeOf('string');
    expect(removeIdenticalLetters('john doe smith')).toBeTypeOf('string');
  });

  it('returns an empty string when supplied an empty string', () => {
    expect(removeIdenticalLetters('')).toBe('');
  });

  it('returns the same string if it has a length less than the consecutiveLetterLimit', () => {
    expect(removeIdenticalLetters('a')).toBe('a');
    expect(removeIdenticalLetters('aa')).toBe('aa');
    expect(removeIdenticalLetters('aaa')).toBe('aaa');
    expect(removeIdenticalLetters('aaaa', { consecutiveLetterLimit: 5 })).toBe(
      'aaaa',
    );
    expect(
      removeIdenticalLetters('aaaaaaaaa', { consecutiveLetterLimit: 10 }),
    ).toBe('aaaaaaaaa');
  });

  it('returns the expected string when supplied a string with duplicates', () => {
    // Test that it works with the default consecutiveLetterLimit.
    expect(removeIdenticalLetters('aaaa')).toBe('aaa');
    expect(removeIdenticalLetters('aaaaaaaaaaaaaaaaaaaaaaaa')).toBe('aaa');

    expect(removeIdenticalLetters('abbbbbcddddddeffggggh')).toBe(
      'abbbcdddeffgggh',
    );
    expect(removeIdenticalLetters('aaabbbbbccccdddeeeee')).toBe(
      'aaabbbcccdddeee',
    );

    expect(removeIdenticalLetters('ffdttttyy')).toBe('ffdtttyy');
    expect(removeIdenticalLetters('iiikigggg')).toBe('iiikiggg');

    // Test that it works with other consecutiveLetterLimits.
    expect(
      removeIdenticalLetters('aaaaaaaabbbbbbbbbb', {
        consecutiveLetterLimit: 5,
      }),
    ).toBe('aaaabbbb');
    expect(
      removeIdenticalLetters('xxxxxxyyyyyyqqqqqqqqqxaaabb', {
        consecutiveLetterLimit: 6,
      }),
    ).toBe('xxxxxyyyyyqqqqqxaaabb');
  });

  it('throws if supplied a non-string', () => {
    // @ts-expect-error -- Testing invalid input.
    expect(() => removeIdenticalLetters(1)).toThrowError(TypeError);
  });

  it('throws if supplied a string longer than the maximum length defined in the options', () => {
    expect(() =>
      removeIdenticalLetters('abc', { maxInputLength: 2 }),
    ).toThrowError(RangeError);
  });
});

describe('maximumOddSum', () => {
  it('is a function', () => {
    expect(maximumOddSum).toBeTypeOf('function');
  });

  it('is a pure function', () => {
    const numbers = [19, 2, 42, 18];
    const copyOfNumbers = [...numbers];

    maximumOddSum(numbers);

    expect(numbers).toEqual(copyOfNumbers);
  });

  it('returns a number if supplied with an array of numbers', () => {
    expect(maximumOddSum([2, 4, 6])).toBeTypeOf('number');
    expect(maximumOddSum([1, 3, 5])).toBeTypeOf('number');
    expect(maximumOddSum([19, 2, 42, 18])).toBeTypeOf('number');
    expect(maximumOddSum([61, 32, 51])).toBeTypeOf('number');
    expect(maximumOddSum([1, 2, 3, 4, 5])).toBeTypeOf('number');
  });

  it('returns 0 when supplied an empty array', () => {
    expect(maximumOddSum([])).toBe(0);
  });

  it('returns 0 when supplied an array with only one number', () => {
    expect(maximumOddSum([1])).toBe(0);
  });

  it('returns 0 when supplied an array with only even numbers', () => {
    expect(maximumOddSum([2, 4, 6])).toBe(0);
  });

  it('returns 0 when supplied an array with only odd numbers', () => {
    expect(maximumOddSum([1, 3, 5])).toBe(0);
  });

  it('returns the largest odd sum when supplied an array with both even and odd numbers', () => {
    expect(maximumOddSum([19, 2, 42, 18])).toBe(61);
    expect(maximumOddSum([61, 32, 51])).toBe(93);
    expect(maximumOddSum([1, 2, 3, 4, 5])).toBe(9);
  });

  it('returns 0 if supplied an array with non-numbers', () => {
    // @ts-expect-error -- Testing invalid input.
    expect(maximumOddSum(['john', undefined])).toBe(0);
  });

  it('throws if supplied a non-array', () => {
    // @ts-expect-error -- Testing invalid input.
    expect(() => maximumOddSum('john')).toThrowError(TypeError);
  });
});
