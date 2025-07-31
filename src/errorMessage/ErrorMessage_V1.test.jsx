import { describe, expect, it } from 'vitest';
import ErrorMessage from './ErrorMessage';
import { render, screen } from '@testing-library/react';

describe('ErrorMessage', () => {
  it('should render with default message', () => {
    render(<ErrorMessage />);

    const messageContainer = screen.getByTestId('message-container');

    expect(messageContainer).toHaveTextContent('Something went wrong');
  });

  it('should render with provided message', () => {
    render(<ErrorMessage message='Email is already taken' />);

    const messageContainer = screen.getByTestId('message-container');

    expect(messageContainer).toHaveTextContent('Email is already taken');
  });
});
