import {
  RenderResult,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import { Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import CreditCardForm from '../CreditCardForm';

describe('CreditCardForm', () => {
  it('should render the credit card form', async () => {
    render(<CreditCardForm onSubmit={() => {}} />);
    const formContainer = screen.getByTestId('credit-card-form-container');
    const formComponent = screen.getByTestId('credit-card-form');
    expect(formContainer).toBeInTheDocument();
    expect(formComponent).toBeInTheDocument();
  });

  describe('Submit', () => {
    let onSubmitMock: Mock;
    let creditCardForm: RenderResult;

    beforeEach(() => {
      onSubmitMock = vi.fn();
      creditCardForm = render(
        <CreditCardForm onSubmit={() => onSubmitMock()} />,
      );
    });

    it('should render the credit card submit button', () => {
      const submitButton = creditCardForm.getByRole('button', {
        name: 'Submit Payment',
      });
      expect(submitButton).toBeInTheDocument();
    });

    it('should disable the submit button when the form is invalid', () => {
      const submitButton = creditCardForm.getByRole('button', {
        name: 'Submit Payment',
      });
      expect(submitButton).toBeDisabled();
    });

    it('should enable the submit button when the form is valid', () => {
      const cardNumberInput = creditCardForm.getByRole('textbox', {
        name: 'Card number field',
      });
      const cardHolderInput = creditCardForm.getByRole('textbox', {
        name: 'Card holder field',
      });
      const expiryMonthInput = creditCardForm.getByRole('textbox', {
        name: 'Expiry month field',
      });
      const expiryYearInput = creditCardForm.getByRole('textbox', {
        name: 'Expiry year field',
      });
      const cvvInput = creditCardForm.getByRole('textbox', {
        name: 'Security code field',
      });

      fireEvent.change(cardNumberInput, {
        target: { value: '5555555555554444' },
      });
      fireEvent.change(cardHolderInput, { target: { value: 'John Doe' } });
      fireEvent.change(expiryMonthInput, { target: { value: '12' } });
      fireEvent.change(expiryYearInput, { target: { value: '99' } });
      fireEvent.change(cvvInput, { target: { value: '123' } });

      const submitButton = creditCardForm.getByRole('button', {
        name: 'Submit Payment',
      });
      expect(submitButton.getAttribute('disabled')).toBe('');
    });

    it('should call the onSubmit function when the form is submitted', () => {
      const cardNumberInput = creditCardForm.getByRole('textbox', {
        name: 'Card number field',
      });
      const cardHolderInput = creditCardForm.getByRole('textbox', {
        name: 'Card holder field',
      });
      const expiryMonthInput = creditCardForm.getByRole('textbox', {
        name: 'Expiry month field',
      });
      const expiryYearInput = creditCardForm.getByRole('textbox', {
        name: 'Expiry year field',
      });
      const cvvInput = creditCardForm.getByRole('textbox', {
        name: 'Security code field',
      });

      fireEvent.change(cardNumberInput, {
        target: { value: '5555555555554444' },
      });
      fireEvent.change(cardHolderInput, {
        target: { value: 'John Doe' },
      });
      fireEvent.change(expiryMonthInput, { target: { value: '12' } });
      fireEvent.change(expiryYearInput, { target: { value: '99' } });
      fireEvent.change(cvvInput, { target: { value: '123' } });

      fireEvent.submit(screen.getByTestId('credit-card-form'));
      expect(onSubmitMock).toHaveBeenCalled();
    });
  });

  describe('Credit card form fields', () => {
    let creditCardForm: RenderResult;

    beforeEach(() => {
      creditCardForm = render(<CreditCardForm onSubmit={() => {}} />);
    });

    describe('Card number field', () => {
      it('should render the credit card number field and label', () => {
        const cardNumberLabel = creditCardForm.getByLabelText('Card Number');
        const cardNumberInput = creditCardForm.getByRole('textbox', {
          name: 'Card number field',
        });
        expect(cardNumberLabel).toBeInTheDocument();
        expect(cardNumberInput).toBeInTheDocument();
      });

      it('should not take in other characters besides numbers', () => {
        const cardNumberInput = creditCardForm.getByRole('textbox', {
          name: 'Card number field',
        });

        fireEvent.change(cardNumberInput, {
          target: { value: 'abc-.,<?' },
        });
        fireEvent.blur(cardNumberInput);

        expect(cardNumberInput.getAttribute('value')).toBe('');
      });

      it('formats the input with a space after every fourth character', () => {
        const cardNumberInput = creditCardForm.getByRole('textbox', {
          name: 'Card number field',
        });

        fireEvent.change(cardNumberInput, {
          target: { value: '1234123412341234' },
        });
        fireEvent.blur(cardNumberInput);

        expect(cardNumberInput.getAttribute('value')).toBe(
          '1234 1234 1234 1234',
        );
      });

      it('should render an error message when an invalid card number is entered', () => {
        const cardNumberInput = creditCardForm.getByRole('textbox', {
          name: 'Card number field',
        });

        fireEvent.change(cardNumberInput, { target: { value: '1234' } });
        fireEvent.blur(cardNumberInput);

        const cardNumberErrorMessage = creditCardForm.getByText(
          'Invalid card number.',
        );

        expect(cardNumberErrorMessage).toBeInTheDocument();
      });

      it('should not render an error message when a valid card number is entered', () => {
        const cardNumberInput = creditCardForm.getByRole('textbox', {
          name: 'Card number field',
        });

        fireEvent.change(cardNumberInput, {
          target: { value: '376680816376961' },
        });
        fireEvent.blur(cardNumberInput);

        const cardNumberErrorMessage = creditCardForm.queryByText(
          'Invalid card number.',
        );
        expect(cardNumberInput.getAttribute('value')).toBe(
          '3766 8081 6376 961',
        );
        expect(cardNumberErrorMessage).toBeNull();
      });

      it('should render an error message when a card number is not entered and the field is blurred', () => {
        const cardNumberInput = creditCardForm.getByRole('textbox', {
          name: 'Card number field',
        });

        fireEvent.change(cardNumberInput, { target: { value: '' } });
        fireEvent.blur(cardNumberInput);

        const cardNumberErrorMessage = creditCardForm.getByText(
          'A card number is required.',
        );

        expect(cardNumberErrorMessage).toBeInTheDocument();
      });
    });

    describe('Card holder field', () => {
      it('should render the credit card holder field and label', () => {
        const cardHolderLabel = creditCardForm.getByLabelText('Name on card');
        const cardHolderInput = creditCardForm.getByRole('textbox', {
          name: 'Card holder field',
        });
        expect(cardHolderLabel).toBeInTheDocument();
        expect(cardHolderInput).toBeInTheDocument();
      });

      it('should not allow non-alphabetic characters', () => {
        const cardHolderInput = creditCardForm.getByRole('textbox', {
          name: 'Card holder field',
        });

        fireEvent.change(cardHolderInput, {
          target: { value: '1234' },
        });
        fireEvent.blur(cardHolderInput);

        const cardHolderErrorMessage = creditCardForm.getByText(
          'A card holder name is required.',
        );

        expect(cardHolderInput.getAttribute('value')).toBe('');
        expect(cardHolderErrorMessage).toBeInTheDocument();
      });

      it('should render an error message when no card holder name is entered and the field is blurred', () => {
        const cardHolderInput = creditCardForm.getByRole('textbox', {
          name: 'Card holder field',
        });

        fireEvent.change(cardHolderInput, { target: { value: '' } });
        fireEvent.blur(cardHolderInput);

        const cardHolderErrorMessage = creditCardForm.getByText(
          'A card holder name is required.',
        );

        expect(cardHolderErrorMessage).toBeInTheDocument();
      });

      it('should not render an error message when a valid card holder name is entered', () => {
        const cardHolderInput = creditCardForm.getByRole('textbox', {
          name: 'Card holder field',
        });

        fireEvent.change(cardHolderInput, {
          target: { value: 'John Doe' },
        });
        fireEvent.blur(cardHolderInput);

        const cardHolderErrorMessage1 = creditCardForm.queryByText(
          'A card holder name is required.',
        );
        const cardHolderErrorMessage2 = creditCardForm.queryByText(
          'A card holder name must contain only alphabetic characters.',
        );

        expect(cardHolderErrorMessage1).toBeNull();
        expect(cardHolderErrorMessage2).toBeNull();
      });

      it('should render an error message when a card holder name is not entered and the field is blurred', () => {
        const cardHolderInput = creditCardForm.getByRole('textbox', {
          name: 'Card holder field',
        });

        fireEvent.change(cardHolderInput, { target: { value: '' } });
        fireEvent.blur(cardHolderInput);

        const cardHolderErrorMessage = creditCardForm.getByText(
          'A card holder name is required.',
        );

        expect(cardHolderErrorMessage).toBeInTheDocument();
      });
    });

    describe('Expiry date fields', () => {
      it('should render the credit card expiry date fields and labels', () => {
        const expiryDateLabel = creditCardForm.getByText('Expires');
        const expiryMonthInput = creditCardForm.getByRole('textbox', {
          name: 'Expiry month field',
        });
        const expiryYearInput = creditCardForm.getByRole('textbox', {
          name: 'Expiry year field',
        });
        expect(expiryDateLabel).toBeInTheDocument();
        expect(expiryMonthInput).toBeInTheDocument();
        expect(expiryYearInput).toBeInTheDocument();
      });

      it('should render hidden date labels used for accessibility', () => {
        const expiryMonthLabel = creditCardForm.getByText('Expiry month');
        const expiryYearLabel = creditCardForm.getByText('Expiry year');
        expect(expiryMonthLabel).toBeInTheDocument();
        expect(expiryYearLabel).toBeInTheDocument();
      });

      it('should not allow non-numeric characters in the expiry month field', () => {
        const expiryMonthInput = creditCardForm.getByRole('textbox', {
          name: 'Expiry month field',
        });

        fireEvent.change(expiryMonthInput, {
          target: { value: 'abc' },
        });
        fireEvent.blur(expiryMonthInput);

        const expiryMonthErrorMessage = creditCardForm.getByText(
          'Expiry month is required.',
        );

        expect(expiryMonthInput.getAttribute('value')).toBe('');
        expect(expiryMonthErrorMessage).toBeInTheDocument();
      });

      it('should not allow non-numeric characters in the expiry year field', () => {
        const expiryYearInput = creditCardForm.getByRole('textbox', {
          name: 'Expiry year field',
        });

        fireEvent.change(expiryYearInput, {
          target: { value: 'abc' },
        });
        fireEvent.blur(expiryYearInput);

        const expiryYearErrorMessage = creditCardForm.getByText(
          'Expiry year is required.',
        );

        expect(expiryYearInput.getAttribute('value')).toBe('');
        expect(expiryYearErrorMessage).toBeInTheDocument();
      });

      it('should not allow an expiry month less than 2 characters', () => {
        const expiryMonthInput = creditCardForm.getByRole('textbox', {
          name: 'Expiry month field',
        });

        fireEvent.change(expiryMonthInput, {
          target: { value: '0' },
        });
        fireEvent.blur(expiryMonthInput);

        const expiryMonthErrorMessage = creditCardForm.getByText(
          'Expiry month must be in the form of MM.',
        );

        expect(expiryMonthInput.getAttribute('value')).toBe('0');
        expect(expiryMonthErrorMessage).toBeInTheDocument();
      });

      it('should not allow an expiry month less than 01', () => {
        const expiryMonthInput = creditCardForm.getByRole('textbox', {
          name: 'Expiry month field',
        });

        fireEvent.change(expiryMonthInput, {
          target: { value: '00' },
        });
        fireEvent.blur(expiryMonthInput);

        const expiryMonthErrorMessage = creditCardForm.getByText(
          'Expiry month must be between 01-12.',
        );

        expect(expiryMonthInput.getAttribute('value')).toBe('00');
        expect(expiryMonthErrorMessage).toBeInTheDocument();
      });

      it('should not allow an expiry month greater than 12', () => {
        const expiryMonthInput = creditCardForm.getByRole('textbox', {
          name: 'Expiry month field',
        });

        fireEvent.change(expiryMonthInput, {
          target: { value: '13' },
        });
        fireEvent.blur(expiryMonthInput);

        const expiryMonthErrorMessage = creditCardForm.getByText(
          'Expiry month must be between 01-12.',
        );

        expect(expiryMonthInput.getAttribute('value')).toBe('13');
        expect(expiryMonthErrorMessage).toBeInTheDocument();
      });

      it('should not allow an expiry year in the past', () => {
        const expiryYearInput = creditCardForm.getByRole('textbox', {
          name: 'Expiry year field',
        });

        fireEvent.change(expiryYearInput, {
          target: { value: '20' },
        });
        fireEvent.blur(expiryYearInput);

        const expiryYearErrorMessage = creditCardForm.getByText(
          'Expiry year cannot be in the past.',
        );

        expect(expiryYearInput.getAttribute('value')).toBe('20');
        expect(expiryYearErrorMessage).toBeInTheDocument();
      });

      it('should not render an error message when a valid expiry month and year are entered', () => {
        const expiryMonthInput = creditCardForm.getByRole('textbox', {
          name: 'Expiry month field',
        });
        const expiryYearInput = creditCardForm.getByRole('textbox', {
          name: 'Expiry year field',
        });

        fireEvent.change(expiryMonthInput, {
          target: { value: '12' },
        });
        fireEvent.blur(expiryMonthInput);

        fireEvent.change(expiryYearInput, {
          target: { value: '99' },
        });
        fireEvent.blur(expiryYearInput);

        const expiryMonthErrorMessage = creditCardForm.queryByText(
          'Expiry month must be between 01-12.',
        );
        const expiryYearErrorMessage = creditCardForm.queryByText(
          'Expiry year cannot be in the past.',
        );

        expect(expiryMonthInput.getAttribute('value')).toBe('12');
        expect(expiryYearInput.getAttribute('value')).toBe('99');

        expect(expiryMonthErrorMessage).toBeNull();
        expect(expiryYearErrorMessage).toBeNull();
      });
    });

    describe('CVV field', () => {
      it('should render the credit card CVV field and label', () => {
        const securityCodeLabel =
          creditCardForm.getByLabelText('Security code');
        const securityCodeInput = creditCardForm.getByRole('textbox', {
          name: 'Security code field',
        });
        expect(securityCodeLabel).toBeInTheDocument();
        expect(securityCodeInput).toBeInTheDocument();
      });

      it('should not allow a CVV with less than 3 digits', () => {
        const securityCodeInput = creditCardForm.getByRole('textbox', {
          name: 'Security code field',
        });

        fireEvent.change(securityCodeInput, {
          target: { value: '12' },
        });
        fireEvent.blur(securityCodeInput);

        const securityCodeErrorMessage = creditCardForm.getByText(
          'Security code must be 3 or 4 digits.',
        );

        expect(securityCodeInput.getAttribute('value')).toBe('12');
        expect(securityCodeErrorMessage).toBeInTheDocument();
      });

      it('should render an error message when nothing is entered and the field is blurred', () => {
        const securityCodeInput = creditCardForm.getByRole('textbox', {
          name: 'Security code field',
        });

        fireEvent.change(securityCodeInput, {
          target: { value: '' },
        });
        fireEvent.blur(securityCodeInput);

        const securityCodeErrorMessage = creditCardForm.getByText(
          'Security code is required.',
        );

        expect(securityCodeInput.getAttribute('value')).toBe('');
        expect(securityCodeErrorMessage).toBeInTheDocument();
      });

      it('should render an error message when a non-numeric CVV is entered', () => {
        const securityCodeInput = creditCardForm.getByRole('textbox', {
          name: 'Security code field',
        });

        fireEvent.change(securityCodeInput, {
          target: { value: 'abc' },
        });
        fireEvent.blur(securityCodeInput);

        const securityCodeErrorMessage = creditCardForm.getByText(
          'Security code is required.',
        );

        expect(securityCodeInput.getAttribute('value')).toBe('');
        expect(securityCodeErrorMessage).toBeInTheDocument();
      });

      it('should not render an error message when a valid CVV is entered', () => {
        const securityCodeInput = creditCardForm.getByRole('textbox', {
          name: 'Security code field',
        });

        fireEvent.change(securityCodeInput, {
          target: { value: '123' },
        });
        fireEvent.blur(securityCodeInput);

        const securityCodeErrorMessage = creditCardForm.queryByText(
          'Security code must be 3 or 4 digits.',
        );

        expect(securityCodeInput.getAttribute('value')).toBe('123');
        expect(securityCodeErrorMessage).toBeNull();
      });
    });
  });
});
