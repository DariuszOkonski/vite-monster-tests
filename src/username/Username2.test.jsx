import { describe, expect, it } from 'vitest';
import Username from './Username';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Username', () => {
  it('renders default empty text', () => {
    render(<Username />);

    const usernameElement = screen.getByTestId('username');

    expect(usernameElement).toHaveTextContent('');
  });

  it('renders changed username with button', async () => {
    const user = userEvent.setup();
    render(<Username />);

    const button = screen.getByTestId('button');
    await user.click(button);

    const usernameElement = screen.getByTestId('username');

    expect(usernameElement).toHaveTextContent('bar');
  });

  it('render changed username with input', async () => {
    const user = userEvent.setup();
    render(<Username />);

    const usernameInput = screen.getByTestId('usernameInput');
    await user.type(usernameInput, 'foo');

    const usernameElement = screen.getByTestId('username');

    expect(usernameElement).toHaveTextContent('foo');
  });
});
