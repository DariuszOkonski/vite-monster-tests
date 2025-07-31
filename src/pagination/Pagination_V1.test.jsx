import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Pagination from './Pagination';

describe('Pagination', () => {
  it('should render component', () => {
    render(<Pagination total={50} limit={10} currentPage={1} />);

    const pageContainer = screen.getAllByTestId('page-container');

    expect(pageContainer).toHaveLength(5);
    expect(pageContainer[0]).toHaveTextContent(1);
  });

  it('should emit click button', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Pagination
        total={50}
        limit={10}
        currentPage={1}
        selectPage={handleClick}
      />
    );

    const pageContainer = screen.getAllByTestId('page-container');

    await user.click(pageContainer[0]);

    expect(handleClick).toHaveBeenCalledOnce();
    expect(handleClick).toHaveBeenCalledWith(1);
  });

  it('should check if active class is added', () => {
    render(<Pagination total={50} limit={10} currentPage={2} />);

    const pageContainer = screen.getAllByTestId('page-container');

    expect(pageContainer[1]).toHaveClass('active');
  });
});
