import { describe, expect, it } from 'vitest';
import Username from './Username';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Username', () => {
  it('renders empty username', () => {
    render(<Username />);

    const username = screen.getByTestId('username');

    expect(username).toHaveTextContent('');
  });

  it('should change username by click button', async () => {
    const user = userEvent.setup();

    render(<Username />);

    const button = screen.getByTestId('button');
    const username = screen.getByTestId('username');

    await user.click(button);

    expect(username).toHaveTextContent('bar');
  });

  it('should change username by typing to input', async () => {
    const user = userEvent.setup();

    render(<Username />);

    const input = screen.getByTestId('usernameInput');
    const username = screen.getByTestId('username');

    await user.type(input, 'foo');

    expect(username).toHaveTextContent('foo');
  });
});
