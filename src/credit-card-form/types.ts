export interface CreditCardFormProps {
  onSubmit: (formState: CreditCardInfo) => void;
}

/**
 * The credit card information the that the form contains.
 */
export interface CreditCardInfo {
  /* The credit card number. */
  cardNumber: string;
  /* The name of the card holder. */
  cardHolder: string;
  /* The expiration month of the credit card. */
  expiryMonth: string;
  /* The expiration year of the credit card. */
  expiryYear: string;
  /* The CVV code of the credit card. */
  cvv: string;
}

/**
 * The type of the credit card.
 */
export type CreditCardType = 'visa' | 'mastercard' | 'amex' | 'maestro' | '';

/**
 * The errors that can occur in the credit card form.
 */
export type CreditCardFormErrors = {
  [fieldName: string]: {
    /* The error message. */
    message: string;
    /* Whether an error occurred. */
    error: boolean;
    /* Whether the field has been modified. */
    dirty: boolean;
  };
};

/**
 * The properties used to validate the credit card form.
 */
export interface ValidateFormProps {
  /* The current state of the credit card form. */
  formState: CreditCardInfo;
  /* The name of the field to validate. */
  fieldName?: string;
  /* The current errors in the credit card form. */
  formErrors: CreditCardFormErrors;
  /* Whether to force validation. */
  forceValidate?: boolean;
}

/**
 * The result of validating the credit card form.
 */
export interface ValidateFormResult {
  /* The errors in the credit card form. */
  errors: CreditCardFormErrors;
  /* Whether the credit card form is valid. */
  isValid: boolean;
}
