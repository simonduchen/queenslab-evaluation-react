import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { describe, expect, it } from 'vitest';
import { CreditCardInfo } from '../../types';
import useCreditCardForm from '../useCreditCardFormValidator';

describe('useCreditCardFormValidator', () => {
  const hookProps: CreditCardInfo = {
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  };

  it('should return no errors when set up with empty strings', () => {
    const { result } = renderHook(() => useCreditCardForm(hookProps));
    const { formErrors } = result.current;
    Object.values(formErrors).forEach(({ error }) => {
      expect(error).toBeFalsy();
    });
  });

  it('should return an error when card number is invalid', () => {
    const { result } = renderHook(() => useCreditCardForm(hookProps));
    const { formErrors, validateForm } = result.current;
    act(() => {
      const { errors } = validateForm({
        formState: { ...hookProps, cardNumber: '1234' },
        fieldName: 'cardNumber',
        formErrors,
      });
      expect(errors.cardNumber.error).toBeTruthy();
    });
  });

  it('should return an error when card holder is invalid', () => {
    const { result } = renderHook(() => useCreditCardForm(hookProps));
    const { formErrors, validateForm } = result.current;
    act(() => {
      const { errors } = validateForm({
        formState: { ...hookProps, cardHolder: '1234' },
        fieldName: 'cardHolder',
        formErrors,
      });
      expect(errors.cardHolder.error).toBeTruthy();
    });
  });

  it('should return an error when expiry month is invalid', () => {
    const { result } = renderHook(() => useCreditCardForm(hookProps));
    const { formErrors, validateForm } = result.current;
    act(() => {
      const { errors } = validateForm({
        formState: { ...hookProps, expiryMonth: '1' },
        fieldName: 'expiryMonth',
        formErrors,
      });
      expect(errors.expiryMonth.error).toBeTruthy();
    });
  });

  it('should return an error when expiry year is invalid', () => {
    const { result } = renderHook(() => useCreditCardForm(hookProps));
    const { formErrors, validateForm } = result.current;
    act(() => {
      const { errors } = validateForm({
        formState: { ...hookProps, expiryYear: '1' },
        fieldName: 'expiryYear',
        formErrors,
      });
      expect(errors.expiryYear.error).toBeTruthy();
    });
  });

  it('should return an error when cvv is invalid', () => {
    const { result } = renderHook(() => useCreditCardForm(hookProps));
    const { formErrors, validateForm } = result.current;
    act(() => {
      const { errors } = validateForm({
        formState: { ...hookProps, cvv: '1' },
        fieldName: 'cvv',
        formErrors,
      });
      expect(errors.cvv.error).toBeTruthy();
    });
  });
});
