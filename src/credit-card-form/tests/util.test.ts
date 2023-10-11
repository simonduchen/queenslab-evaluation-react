import { describe, expect, it } from 'vitest';
import { formatCardNumber, getCreditCardType } from '../util';

describe('getCreditCardType', () => {
  it('should return visa', () => {
    const visaCards = [
      '4242424242424242',
      '4000056655665556',
      '4005519200000004',
    ];
    visaCards.forEach((card) => {
      expect(getCreditCardType(card)).toBe('visa');
    });
  });

  it('should return mastercard', () => {
    const masterCards = [
      '5555555555554444',
      '2223003122003222',
      '2223000048400011',
    ];
    masterCards.forEach((card) => {
      expect(getCreditCardType(card)).toBe('mastercard');
    });
  });

  it('should return amex', () => {
    const amexCards = ['376680816376961', '378282246310005', '371449635398431'];
    amexCards.forEach((card) => {
      expect(getCreditCardType(card)).toBe('amex');
    });
  });

  it('should return maestro', () => {
    const maestroCards = ['6304000000000000', '5063516945005047'];
    maestroCards.forEach((card) => {
      expect(getCreditCardType(card)).toBe('maestro');
    });
  });

  it('should return empty string when supplied an invalid card number', () => {
    const invalidCards = ['123', '1234567890123456'];
    invalidCards.forEach((card) => {
      expect(getCreditCardType(card)).toBe('');
    });
  });

  it('should return empty string when supplied an string', () => {
    expect(getCreditCardType('')).toBe('');
  });

  it('should return empty string when supplied an object', () => {
    // @ts-expect-error -- Testing invalid input
    expect(getCreditCardType({})).toBe('');
  });
});

describe('formatCardNumber', () => {
  it('should add a space after every fourth character', () => {
    expect(formatCardNumber('1234123412341234')).toBe('1234 1234 1234 1234');
  });

  it('should handle input with spaces', () => {
    expect(formatCardNumber('1234 1234 1234 1234')).toBe('1234 1234 1234 1234');
  });

  it('should handle an odd amount of characters', () => {
    expect(formatCardNumber('12341234123')).toBe('1234 1234 123');
  });

  it('should return the same string if the length is less than 5', () => {
    expect(formatCardNumber('1')).toBe('1');
    expect(formatCardNumber('12')).toBe('12');
    expect(formatCardNumber('123')).toBe('123');
    expect(formatCardNumber('1234')).toBe('1234');
  });

  it('should return an empty string when supplied an empty string', () => {
    expect(formatCardNumber('')).toBe('');
  });
});
