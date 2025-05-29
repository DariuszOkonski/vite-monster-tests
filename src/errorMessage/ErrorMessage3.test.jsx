import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage v3', () => {
  it('should return default message if custom message is not provided', () => {
    render(<ErrorMessage />);
    const messageContainer = screen.getByTestId('message-container');
    expect(messageContainer).toHaveTextContent(/something went wrong/i);
  });

  it('should return custom message if provided', () => {
    render(<ErrorMessage message='Email is already taken' />);
    const messageContainer = screen.getByTestId('message-container');

    expect(messageContainer).toHaveTextContent(/email is already taken/i);
  });
});
