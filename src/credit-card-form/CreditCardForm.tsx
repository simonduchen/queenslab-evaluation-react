import React, { useState } from 'react';
import Button from './components/button/Button';
import CreditCard from './components/credit-card/CreditCard';
import styles from './creditCardForm.module.css';
import useCreditCardFormValidator from './hooks/useCreditCardFormValidator';
import amexLogo from './resources/amex.png';
import maestroLogo from './resources/maestro.png';
import masterCardLogo from './resources/mastercard.png';
import visaLogo from './resources/visa.png';
import { CreditCardFormProps } from './types';
import { formatCardNumber, getCreditCardType } from './util';
/**
 * A component for the credit card form.
 *
 * Supports validation of cards from Amex, Maestro, Mastercard and Visa.
 *
 * @returns The credit card form component.
 */
function CreditCardForm({ onSubmit }: CreditCardFormProps): JSX.Element {
  const [form, setForm] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });
  const [isValid, setIsValid] = useState(false);
  const { formErrors, validateForm, validateOnBlur } =
    useCreditCardFormValidator(form);

  /**
   * Update the component's state with the value from the input field and
   * validate the field.
   *
   * @param fieldName The name of the field to update.
   * @param fieldValue The value to update the state with.
   */
  function updateField(fieldName: string, fieldValue: string) {
    const updatedFormState = {
      ...form,
      [fieldName]: fieldValue,
    };
    setForm(updatedFormState);

    // Validate the field if it has been marked as dirty.
    if (formErrors.cardNumber.dirty) {
      const { isValid: updatedFormIsValid } = validateForm({
        formState: updatedFormState,
        fieldName,
        formErrors,
      });
      setIsValid(updatedFormIsValid);
    }
  }

  /**
   * Update and validate the card number field.
   *
   * Only allow numbers to be entered into the field and make sure it is
   * not longer than 16 digits.
   *
   * @param cardNumber The card number to update the field with.
   */
  function updateCardNumber(cardNumber: string) {
    // We need to remove the spaces before updating the state of the field.
    const cardNumberWithNoSpaces = cardNumber.replace(/ /g, '');
    // We only want to update the state if the card number has 16 or less digits.
    if (cardNumberWithNoSpaces.length <= 16) {
      // Make sure that it only contains numbers.
      if (/^[0-9]*$/.test(cardNumberWithNoSpaces)) {
        updateField('cardNumber', cardNumberWithNoSpaces);
      }
    }
  }

  /**
   * Update and validate the card holder field.
   *
   * Only allow letters and spaces to be entered into the field.
   *
   * @param cardHolder The card holder name to update the field with.
   */
  function updateCardHolder(cardHolder: string) {
    if (/^[a-zA-ZåäöÅÄÖ ]*$/.test(cardHolder)) {
      updateField('cardHolder', cardHolder);
    }
  }

  /**
   * Update and validate a numeric field.
   *
   * Only allow numbers to be entered into the field.
   *
   * @param fieldName The name of the field to update.
   * @param fieldValue The value to update the field with.
   */
  function updateNumericField(fieldName: string, fieldValue: string) {
    if (/^[0-9]*$/.test(fieldValue)) {
      updateField(fieldName, fieldValue);
    }
  }

  /**
   * Update the component's state with the value from the input field and
   * also validate the field.
   *
   * @param event Change event from input field.
   */
  function updateForm(event: React.ChangeEvent<HTMLInputElement>) {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    switch (fieldName) {
      case 'cardNumber':
        updateCardNumber(fieldValue);
        break;
      case 'cardHolder':
        updateCardHolder(fieldValue);
        break;
      case 'expiryMonth':
      case 'expiryYear':
      case 'cvv':
        updateNumericField(fieldName, fieldValue);
        break;
      default:
        updateField(fieldName, fieldValue);
        break;
    }
  }

  /**
   * Handle the submit event of the form.
   *
   * Validates the form and executes submit callback if it is valid.
   *
   * @param event Submit event from the form.
   */
  async function submitCreditCardForm(event: React.FormEvent) {
    event.preventDefault();

    const { isValid: formIsValid } = validateForm({
      formState: form,
      formErrors,
      forceValidate: true,
    });

    if (formIsValid) {
      onSubmit(form);
    }
  }

  /**
   * Check if a field has an error.
   *
   * @param fieldName The name of the field to check.
   *
   * @returns `true` if the field has an error.
   */
  function fieldHasError(fieldName: string): boolean {
    return formErrors[fieldName].dirty && formErrors[fieldName].error;
  }

  /**
   * Render the error message for a field if it has an error.
   *
   * @param fieldName The field to render the error message for.
   *
   * @returns The error message if the field has an error, otherwise `null`.
   */
  function renderErrorMessage(fieldName: string): JSX.Element | null {
    return fieldHasError(fieldName) ? (
      <p className={styles['error-message']}>{formErrors[fieldName].message}</p>
    ) : null;
  }

  return (
    <div
      className={styles['credit-card-form-container']}
      data-testid='credit-card-form-container'
    >
      <form
        className={styles['row-flex-container']}
        data-testid='credit-card-form'
        onSubmit={submitCreditCardForm}
      >
        <div
          className={`${styles['col-flex-container']} ${styles['flex-center']}`}
        >
          <img src={visaLogo} alt='Visa' title='Visa' height='32px' />
          <img src={maestroLogo} alt='Maestro' title='Maestro' height='32px' />
          <img
            src={masterCardLogo}
            alt='Mastercard'
            title='Mastercard'
            height='32px'
          />
          <img
            src={amexLogo}
            alt='American Express'
            title='American Express'
            height='32px'
          />
        </div>
        {/* Card number input */}
        <label
          className={styles['input-field-container']}
          htmlFor='card-number'
        >
          Card Number
          <input
            id='card-number'
            name='cardNumber'
            aria-label='Card number field'
            className={styles['input-field']}
            value={formatCardNumber(form.cardNumber)}
            onChange={updateForm}
            onBlur={validateOnBlur}
            required
            type='text'
          />
          {renderErrorMessage('cardNumber')}
        </label>
        {/* Card holder input */}
        <label
          className={styles['input-field-container']}
          htmlFor='card-holder'
        >
          Name on card
          <input
            id='card-holder'
            name='cardHolder'
            aria-label='Card holder field'
            value={form.cardHolder}
            className={styles['input-field']}
            onChange={updateForm}
            onBlur={validateOnBlur}
            required
            type='text'
          />
          {renderErrorMessage('cardHolder')}
        </label>
        <div
          className={`${styles['col-flex-container']} ${styles['align-top']}`}
        >
          {/* Expiry date input */}
          <div
            className={`${styles['row-flex-container']} ${styles['small-gap']} ${styles['date-inputs']} `}
          >
            <div className={styles['col-flex-container']}>
              <label
                className={`${styles['input-field-container']} ${styles['small-width']}`}
                htmlFor='expiry-month'
              >
                Expires
                <span className={styles['sr-only']}>Expiry month</span>
                <input
                  id='expiry-month'
                  name='expiryMonth'
                  aria-label='Expiry month field'
                  className={styles['input-field']}
                  value={form.expiryMonth}
                  onChange={updateForm}
                  onBlur={validateOnBlur}
                  placeholder='MM'
                  type='text'
                  required
                  maxLength={2}
                />
              </label>
              <label
                htmlFor='expiry-year'
                className={`${styles['input-field-container']} ${styles['small-width']}`}
              >
                &nbsp;
                <span className={styles['sr-only']}>Expiry year</span>
                <input
                  id='expiry-year'
                  name='expiryYear'
                  aria-label='Expiry year field'
                  className={styles['input-field']}
                  value={form.expiryYear}
                  onChange={updateForm}
                  onBlur={validateOnBlur}
                  placeholder='YY'
                  type='text'
                  required
                  maxLength={2}
                />
              </label>
            </div>
            {renderErrorMessage('expiryMonth')}
            {renderErrorMessage('expiryYear')}
          </div>
          {/* CVV input */}
          <label
            className={`${styles['input-field-container']} ${styles['small-width']} ${styles['flex-auto']}`}
            htmlFor='cvv'
          >
            Security code
            <input
              id='cvv'
              name='cvv'
              aria-label='Security code field'
              className={`${styles['input-field']} ${styles['small-width']}`}
              value={form.cvv}
              onChange={updateForm}
              onBlur={validateOnBlur}
              maxLength={getCreditCardType(form.cardNumber) === 'amex' ? 4 : 3}
              type='text'
              required
            />
            {renderErrorMessage('cvv')}
          </label>
        </div>
        <Button
          label='Submit Payment'
          type='submit'
          disabled={
            !isValid || !Object.values(formErrors).every(({ error }) => !error)
          }
          aria-label='Submit Payment'
        />
      </form>
      <CreditCard
        cardNumber={form.cardNumber}
        cardHolder={form.cardHolder}
        expiryMonth={form.expiryMonth}
        expiryYear={form.expiryYear}
        cvv={form.cvv}
      />
    </div>
  );
}

export default CreditCardForm;
