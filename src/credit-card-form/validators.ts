import { getCreditCardType } from './util';

function validateCardNumber(cardNumber: string): string {
  const cardNumberWithNoSpaces = cardNumber.replace(/ /g, '');
  const creditCardType = getCreditCardType(cardNumberWithNoSpaces);

  if (!cardNumberWithNoSpaces) {
    return 'A card number is required.';
  }

  if (creditCardType === '') {
    return 'Invalid card number.';
  }
  return '';
}

function validateCardHolder(cardHolder: string): string {
  if (!cardHolder) {
    return 'A card holder name is required.';
  }

  if (!/^[a-zA-ZåäöÅÄÖ ]*$/.test(cardHolder)) {
    return 'A card holder name must contain only alphabetic characters.';
  }

  return '';
}

function validateExpiryMonth(expiryMonth: string): string {
  if (!expiryMonth) {
    return 'Expiry month is required.';
  }

  if (expiryMonth.length < 2) {
    return 'Expiry month must be in the form of MM.';
  }

  if (Number(expiryMonth) < 1 || Number(expiryMonth) > 12) {
    return 'Expiry month must be between 01-12.';
  }

  return '';
}

function validateExpiryYear(expiryYear: string): string {
  if (!expiryYear) {
    return 'Expiry year is required.';
  }

  if (expiryYear.length < 2) {
    return 'Expiry year must be in the form of YY.';
  }

  if (expiryYear < new Date().getFullYear().toString().slice(2)) {
    return 'Expiry year cannot be in the past.';
  }

  return '';
}

function validateCvv(cvv: string): string {
  if (!cvv) {
    return 'Security code is required.';
  }
  if (cvv.length < 3) {
    return 'Security code must be 3 or 4 digits.';
  }
  return '';
}

export {
  validateCardHolder,
  validateCardNumber,
  validateCvv,
  validateExpiryMonth,
  validateExpiryYear,
};
