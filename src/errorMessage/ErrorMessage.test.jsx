import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
  it('renders default error state', () => {
    render(<ErrorMessage />);
    const messageContainer = screen.getByTestId('message-container');

    expect(messageContainer).toHaveTextContent('Something went wrong');
  });

  it('renders custom error state', () => {
    render(<ErrorMessage message='Email is already taken' />);

    expect(screen.getByTestId('message-container')).toHaveTextContent(
      'Email is already taken'
    );
  });
});
