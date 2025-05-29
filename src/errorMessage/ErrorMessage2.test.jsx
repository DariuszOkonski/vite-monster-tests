import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage v2', () => {
  it('renders default error state', () => {
    render(<ErrorMessage />);
    const messageContainer = screen.queryByTestId('message-container');

    expect(messageContainer).toHaveTextContent(/something went wrong/i);
  });

  it('renders custom error state', () => {
    render(<ErrorMessage message='Email is already taken' />);
    const messageContainer = screen.queryByTestId('message-container');

    expect(messageContainer).toHaveTextContent(/email is already taken/i);
  });
});
