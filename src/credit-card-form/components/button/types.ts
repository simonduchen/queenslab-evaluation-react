/**
 * The Button component props.
 */
export interface ButtonProps {
  /** The label of the button. */
  label: string;
  /** Whether the button is disabled. */
  disabled: boolean;
  /** Callback function to handle clicks from the button. */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** The color of the button. Defaults to `'primary'`. */
  color?: 'primary' | 'secondary';
  /** The type of the button. Defaults to `'button'`. */
  type?: 'button' | 'submit';
  /** The width of the button. Defaults to `'auto'` */
  width?: string;
}
