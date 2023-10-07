import { useState } from 'react';
import {
  CreditCardFormErrors,
  CreditCardInfo,
  ValidateFormProps,
  ValidateFormResult,
} from '../types';
import {
  validateCardHolder,
  validateCardNumber,
  validateCvv,
  validateExpiryMonth,
  validateExpiryYear,
} from '../validators';

/**
 * Sets the dirty flag to true for all fields in the errors object.
 *
 * @param errors The credit card form errors object.
 *
 * @returns A deep copy of the errors object with all fields dirty flag set to true.
 */
function setAllFieldsDirty(errors: CreditCardFormErrors) {
  const dirtyErrors: CreditCardFormErrors = {};
  Object.keys(errors).forEach((fieldName: string) => {
    dirtyErrors[fieldName] = {
      ...errors[fieldName],
      dirty: true,
    };
  });

  return dirtyErrors;
}

/**
 * Hook for validating the credit card form
 *
 * @param form The credit card form state.
 *
 * @returns An object containing the form errors, a hook to validate the form and a
 *    hook to validate a field on blur.
 */
function useCreditCardFormValidator(form: CreditCardInfo) {
  const [errors, setErrors] = useState<CreditCardFormErrors>({
    cardNumber: { message: '', error: false, dirty: false },
    cardHolder: { message: '', error: false, dirty: false },
    expiryMonth: { message: '', error: false, dirty: false },
    expiryYear: { message: '', error: false, dirty: false },
    cvv: { message: '', error: false, dirty: false },
  });

  /**
   * Validates the form.
   *
   * @param props - The props.
   * @param props.formState - The form state to validate.
   * @param props.fieldName - The name of the field to validate.
   * @param props.formErrors - The form errors object, i.e. current state of errors.
   * @param props.forceValidation - Whether to force validation of the whole form.
   *
   * @returns An object containing errors and a flag indicating whether the form is valid.
   */
  function validateForm({
    formState,
    fieldName,
    formErrors,
    forceValidate = false,
  }: ValidateFormProps): ValidateFormResult {
    let isValid = true;
    let errorsCopy = structuredClone(formErrors);
    if (forceValidate) {
      errorsCopy = setAllFieldsDirty(errorsCopy);
    }

    /**
     * Validates a field.
     *
     * Manipulates the errorsCopy object and sets the `isValid` flag to false if
     * the field is invalid.
     *
     * @param name Name of the field to validate.
     * @param value Value of the field to validate.
     * @param validationFunction The validation function to use.
     */
    const validateField = (
      name: string,
      value: string,
      validationFunction: (value: string) => string,
    ) => {
      // Either the field is dirty or we are validating the whole form
      if (errorsCopy[name].dirty && fieldName ? fieldName === name : true) {
        const cardNumberErrorMessage = validationFunction(value);
        errorsCopy[name].error = cardNumberErrorMessage !== '';
        errorsCopy[name].message = cardNumberErrorMessage;

        if (cardNumberErrorMessage !== '') {
          isValid = false;
        }
      }
    };

    const { cardNumber, cardHolder, expiryMonth, expiryYear, cvv } = formState;
    validateField('cardNumber', cardNumber, validateCardNumber);
    validateField('cardHolder', cardHolder, validateCardHolder);
    validateField('expiryMonth', expiryMonth, validateExpiryMonth);
    validateField('expiryYear', expiryYear, validateExpiryYear);
    validateField('cvv', cvv, validateCvv);
    setErrors(errorsCopy);

    return { isValid, errors: errorsCopy };
  }

  /**
   * Validates the input field the event comes from.
   *
   * @param event Input focus event.
   */
  function validateOnBlur(event: React.FocusEvent<HTMLInputElement>) {
    const fieldName = event.target.name;
    const errorField = errors[fieldName];

    if (errorField.dirty) return;

    // Set the dirty flag to true for the field so we can validate it
    const updatedFormErrors = {
      ...errors,
      [fieldName]: {
        ...errors[fieldName],
        dirty: true,
      },
    };

    validateForm({
      formState: form,
      fieldName,
      formErrors: updatedFormErrors,
    });
  }

  return { formErrors: errors, validateForm, validateOnBlur };
}

export default useCreditCardFormValidator;
