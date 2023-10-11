import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { formatCardNumber } from '../../util';
import CreditCard from './CreditCard';

describe('CreditCard', () => {
  it('renders the credit card number', () => {
    const cardNumber = '1234567890123456';
    render(
      <CreditCard
        cardNumber={cardNumber}
        cardHolder=''
        cvv=''
        expiryMonth=''
        expiryYear=''
      />,
    );
    const cardNumberElement = screen.getByText(formatCardNumber(cardNumber));
    expect(cardNumberElement).toBeInTheDocument();
  });

  it('renders the card holder name', () => {
    const cardHolderName = 'John Doe';
    render(
      <CreditCard
        cardNumber=''
        cardHolder={cardHolderName}
        cvv=''
        expiryMonth=''
        expiryYear=''
      />,
    );
    const cardHolderNameElement = screen.getByText(cardHolderName);
    expect(cardHolderNameElement).toBeInTheDocument();
  });

  it('renders the expiration date', () => {
    const expiryMonth = '12';
    const expiryYear = '23';
    render(
      <CreditCard
        cardNumber=''
        cardHolder=''
        cvv=''
        expiryMonth={expiryMonth}
        expiryYear={expiryYear}
      />,
    );
    const expirationDateElement = screen.getByText(
      `${expiryMonth}/${expiryYear}`,
    );
    expect(expirationDateElement).toBeInTheDocument();
  });

  it('renders the CVV', () => {
    const cvv = '123';
    render(
      <CreditCard
        cvv={cvv}
        cardNumber=''
        cardHolder=''
        expiryMonth=''
        expiryYear=''
      />,
    );
    const cvvElement = screen.getByText(cvv);
    expect(cvvElement).toBeInTheDocument();
  });
});
