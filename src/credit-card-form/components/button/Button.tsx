import styles from './button.module.css';
import { ButtonProps } from './types';

/**
 * A button component.
 *
 * @returns A button component.
 */
function Button({
  label,
  disabled = false,
  onClick = undefined,
  color = 'primary',
  type = 'button',
  width = 'auto',
}: ButtonProps): JSX.Element {
  return (
    <button
      disabled={disabled}
      className={styles.button}
      color={color}
      style={{ width }}
      onClick={onClick}
      type={type === 'button' ? 'button' : 'submit'}
    >
      {label}
    </button>
  );
}

Button.defaultProps = {
  disabled: false,
  onClick: undefined,
  type: 'button',
  width: 'auto',
  color: 'primary',
};

export default Button;
