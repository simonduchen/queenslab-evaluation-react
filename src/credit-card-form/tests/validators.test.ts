import { describe, expect, it } from 'vitest';
import {
  validateCardHolder,
  validateCardNumber,
  validateCvv,
  validateExpiryMonth,
  validateExpiryYear,
} from '../validators';

describe('Credit card form validators', () => {
  describe('validateCardNumber', () => {
    it('should return an error message if the card number is empty', () => {
      expect(validateCardNumber('')).toBe('A card number is required.');
    });

    it('should return an error message if the card number is invalid', () => {
      expect(validateCardNumber('1234567890123456')).toBe(
        'Invalid card number.',
      );
    });

    it('should return an empty string if the card number is valid', () => {
      expect(validateCardNumber('4111111111111111')).toBe('');
    });
  });

  describe('validateCardHolder', () => {
    it('should return an error message if the card holder name is empty', () => {
      expect(validateCardHolder('')).toBe('A card holder name is required.');
    });

    it('should return an error message if the card holder name contains non-alphabetic characters', () => {
      expect(validateCardHolder('John Doe 123')).toBe(
        'A card holder name must contain only alphabetic characters.',
      );
    });

    it('should return an empty string if the card holder name is valid', () => {
      expect(validateCardHolder('John Doe')).toBe('');
    });
  });

  describe('validateExpiryMonth', () => {
    it('should return an error message if the expiry month is empty', () => {
      expect(validateExpiryMonth('')).toBe('Expiry month is required.');
    });

    it('should return an error message if the expiry month is only one digit', () => {
      expect(validateExpiryMonth('1')).toBe(
        'Expiry month must be in the form of MM.',
      );
    });

    it('should return an error message if the expiry month is out of range', () => {
      expect(validateExpiryMonth('13')).toBe(
        'Expiry month must be between 01-12.',
      );
    });

    it('should return an empty string if the expiry month is valid', () => {
      expect(validateExpiryMonth('12')).toBe('');
    });
  });

  describe('validateExpiryYear', () => {
    it('should return an error message if the expiry year is empty', () => {
      expect(validateExpiryYear('')).toBe('Expiry year is required.');
    });

    it('should return an error message if the expiry year is invalid', () => {
      expect(validateExpiryYear('19')).toBe(
        'Expiry year cannot be in the past.',
      );
    });

    it('should return an error message if the expiry year is only one digit', () => {
      expect(validateExpiryYear('2')).toBe(
        'Expiry year must be in the form of YY.',
      );
    });

    it('should return en empty string if the expiry year is valid', () => {
      expect(validateExpiryYear('99')).toBe('');
    });
  });

  describe('validateCvv', () => {
    it('should return an error message if the CVV is empty', () => {
      expect(validateCvv('')).toBe('Security code is required.');
    });

    it('should return an error message if the CVV is invalid', () => {
      expect(validateCvv('12')).toBe('Security code must be 3 or 4 digits.');
    });

    it('should return an empty string if the CVV is valid', () => {
      expect(validateCvv('123')).toBe('');
    });
  });
});
