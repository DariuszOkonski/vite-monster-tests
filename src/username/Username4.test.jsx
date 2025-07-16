import { describe, expect, it } from 'vitest';
import Username from './Username';
import { getByTestId, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Username', () => {
  it('should render component without username', () => {
    render(<Username />);
    const username = screen.getByTestId('username');
    expect(username).toHaveTextContent('');
  });

  it('should render component with username set by click', async () => {
    const userMock = userEvent.setup();
    render(<Username />);

    const button = screen.getByTestId('button');
    const userName = screen.getByTestId('username');

    await userMock.click(button);

    expect(userName).toHaveTextContent('bar');
  });

  it('should render component with username provided by input', async () => {
    const userMock = userEvent.setup();
    render(<Username />);

    const usernameInput = screen.getByTestId('usernameInput');
    const userName = screen.getByTestId('username');

    await userMock.type(usernameInput, 'foo');

    expect(userName).toHaveTextContent('foo');
  });
});
