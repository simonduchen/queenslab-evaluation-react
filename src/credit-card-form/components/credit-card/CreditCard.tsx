import { formatCardNumber, getCreditCardType } from '../../util';
import styles from './creditCard.module.css';
import { CreditCardProps } from './types';

function CreditCard({
  cardNumber,
  cardHolder,
  expiryMonth,
  expiryYear,
  cvv,
}: CreditCardProps): JSX.Element {
  function getLogo(): JSX.Element | null {
    const cardType = getCreditCardType(cardNumber);
    return cardType.length ? (
      <img
        height='32px'
        src={`src/credit-card-form/resources/${cardType}.png`}
        alt='Visa'
      />
    ) : null;
  }

  function maskValue(value: string, maxLength: number, char: string): string {
    const maskedString = Array(maxLength).fill(char).join('');
    const maskedCardNumber = `${value}${maskedString}`.slice(0, maxLength);
    return maskedCardNumber;
  }

  return (
    <div className={styles['credit-card']}>
      <div className={styles['credit-card-header']}>
        <div className={styles['credit-card-logo']}>{getLogo()}</div>
        <div className={styles['credit-card-cvv']}>
          <span className={styles['credit-card-cvv-label']}>Security code</span>
          <span>
            {maskValue(
              cvv,
              getCreditCardType(cardNumber) === 'amex' ? 4 : 3,
              '*',
            )}
          </span>
        </div>
      </div>
      <div className={styles['credit-card-number-wrapper']}>
        <span className={styles['credit-card-number']}>
          {formatCardNumber(
            maskValue(
              cardNumber,
              getCreditCardType(cardNumber) === 'amex' ? 15 : 16,
              '*',
            ),
          )}
        </span>
      </div>
      <div className={styles['credit-card-details']}>
        <div className={styles['credit-card-holder']}>{cardHolder}</div>
        <div className={styles['credit-card-expiry-date-wrapper']}>
          <span className={styles['credit-card-expiry-date']}>
            {maskValue(expiryMonth, 2, 'MM')}/{maskValue(expiryYear, 2, 'YY')}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CreditCard;
