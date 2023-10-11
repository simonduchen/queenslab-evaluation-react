import type { CreditCardType } from './types';

/**
 * Check which type of card the supplied card is.
 *
 * Returns an empty string if the card is not recognized.
 *
 * @public
 *
 * @param cardNumber The card number to check.
 *
 * @returns The type of card.
 */
function getCreditCardType(cardNumber: string): CreditCardType {
  const visa = /^4[0-9]{12}(?:[0-9]{3})?$/;
  const mastercard =
    /^5[1-5][0-9]{14}|^(222[1-9]|22[3-9]\\d|2[3-6]\\d{2}|27[0-1]\\d|2720)[0-9]{12}$/;
  const amex = /^3[47][0-9]{13}$/;
  const maestro = /^(?:5[0678]\d\d|6304|6390|67\d\d)\d{8,15}$/;
  if (visa.test(cardNumber)) {
    return 'visa';
  }

  if (mastercard.test(cardNumber)) {
    return 'mastercard';
  }

  if (amex.test(cardNumber)) {
    return 'amex';
  }

  if (maestro.test(cardNumber)) {
    return 'maestro';
  }

  return '';
}

/**
 * Formats a card number by adding spaces between every 4 digits.
 *
 * @public
 *
 * @param cardNumber - The card number to format.
 *
 * @returns Formatted card number.
 */
function formatCardNumber(cardNumber: string): string {
  return (
    cardNumber
      .replace(/\s/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim() ?? ''
  );
}

// eslint-disable-next-line import/prefer-default-export -- More exports to come
export { formatCardNumber, getCreditCardType };
