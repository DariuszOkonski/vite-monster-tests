import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
  it('should render component with default message', () => {
    render(<ErrorMessage />);
    const messageContainer = screen.getByTestId('message-container');
    expect(messageContainer).toHaveTextContent('Something went wrong');
  });

  it('should render component with provided message', () => {
    const message = 'Page not found';
    render(<ErrorMessage message={message} />);
    const messageContainer = screen.getByTestId('message-container');
    expect(messageContainer).toHaveTextContent(message);
  });
});
