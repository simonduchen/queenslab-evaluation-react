import { describe, expect, it } from 'vitest';
import { generateListOfNumbers, generateString } from './testUtil';

describe('generateString', () => {
  it('is a function', () => {
    expect(generateString).toBeTypeOf('function');
  });

  it('returns a string', () => {
    expect(generateString(1, 'a')).toBeTypeOf('string');
    expect(generateString(2, 'ab')).toBeTypeOf('string');
    expect(generateString(3, 'abc')).toBeTypeOf('string');
  });

  it('returns an empty string when supplied a length of 0', () => {
    expect(generateString(0, 'a')).toBe('');
    expect(generateString(0, 'ab')).toBe('');
    expect(generateString(0, 'abc')).toBe('');
  });

  it('returns a string with the expected length and pattern', () => {
    expect(generateString(1, 'a')).toBe('a');
    expect(generateString(2, 'a')).toBe('aa');
    expect(generateString(3, 'a')).toBe('aaa');

    expect(generateString(1, 'ab')).toBe('a');
    expect(generateString(2, 'ab')).toBe('ab');
    expect(generateString(3, 'ab')).toBe('aba');

    expect(generateString(1, 'abc')).toBe('a');
    expect(generateString(2, 'abc')).toBe('ab');
    expect(generateString(3, 'abc')).toBe('abc');
  });
});

describe('generateListOfNumbers', () => {
  it('is a function', () => {
    expect(generateListOfNumbers).toBeTypeOf('function');
  });

  it('returns an array', () => {
    expect(Array.isArray(generateListOfNumbers(1, 1))).toBeTruthy();
    expect(Array.isArray(generateListOfNumbers(2, 1))).toBeTruthy();
    expect(Array.isArray(generateListOfNumbers(3, 1))).toBeTruthy();
  });

  it('returns an empty array when supplied a length of 0', () => {
    expect(generateListOfNumbers(0, 1)).toEqual([]);
    expect(generateListOfNumbers(0, 2)).toEqual([]);
    expect(generateListOfNumbers(0, 3)).toEqual([]);
  });

  it('returns an array with the expected length and range', () => {
    expect(generateListOfNumbers(1, 1)).toEqual([1]);
    expect(generateListOfNumbers(2, 1)).toEqual([1, 1]);
    expect(generateListOfNumbers(3, 1)).toEqual([1, 1, 1]);

    expect(Math.max(...generateListOfNumbers(3, 5))).toBeLessThanOrEqual(5);
    expect(Math.max(...generateListOfNumbers(3, 10))).toBeLessThanOrEqual(10);
    expect(Math.max(...generateListOfNumbers(3, 20))).toBeLessThanOrEqual(20);
  });
});
