import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Button from './Button';

describe('Button', () => {
  it('renders the button with the correct label', () => {
    const { getByText } = render(<Button label='Submit' />);
    expect(getByText('Submit')).toBeInTheDocument();
  });

  it('calls the onClick handler when clicked', () => {
    const handleClick = vi.fn();
    const { getByText } = render(
      <Button label='Submit' onClick={handleClick} />,
    );
    fireEvent.click(getByText('Submit'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('disables the button when disabled prop is true', () => {
    const { getByText } = render(<Button label='Submit' disabled />);
    expect(getByText('Submit')).toBeDisabled();
  });
});
