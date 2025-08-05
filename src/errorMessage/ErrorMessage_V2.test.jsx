import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage_V2', () => {
  it('should render component with default message', () => {
    render(<ErrorMessage />);

    const messageContainer = screen.getByTestId('message-container');

    expect(messageContainer).toHaveTextContent('Something went wrong');
  });

  it('should render component with provided message', () => {
    render(<ErrorMessage message='Email has been taken' />);

    const messageContainer = screen.getByTestId('message-container');

    expect(messageContainer).toHaveTextContent('Email has been taken');
  });
});
