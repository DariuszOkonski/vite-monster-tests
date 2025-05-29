import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Pagination from './Pagination';
import userEvent from '@testing-library/user-event';
import * as utils from '../utils';

// vi.mock('../utils', () => {
//   return {
//     range: () => [1, 2, 3, 4, 5],
//   };
// });

describe('Pagination', () => {
  it('renders correct pagination', () => {
    render(<Pagination total={50} limit={10} currentPage={1} />);
    const pageContainers = screen.getAllByTestId('page-container');
    expect(pageContainers).toHaveLength(5);
    expect(pageContainers[0]).toHaveTextContent('1');
  });

  it('should emit clicked page', async () => {
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

    const pageContainers = screen.getAllByTestId('page-container');

    await user.click(pageContainers[0]);

    expect(handleClick).toHaveBeenCalledOnce();
    expect(handleClick).toHaveBeenCalledWith(1);
  });

  it('spies on utils', () => {
    vi.spyOn(utils, 'range');
    render(<Pagination total={50} limit={10} currentPage={1} />);

    expect(utils.range).toHaveBeenCalledWith(1, 6);
  });
});

describe('Pagination my solution', () => {
  it('should renders correct pagination', () => {
    render(<Pagination total={50} limit={10} currentPage={1} />);

    const pageContainer = screen.getAllByTestId('page-container');
    expect(pageContainer).toHaveLength(5);
    expect(pageContainer[0]).toHaveTextContent(1);
  });

  it('should emit clicked page', async () => {
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

  it('should spies on utils', () => {
    vi.spyOn(utils, 'range');
    render(<Pagination total={50} limit={10} currentPage={1} />);

    expect(utils.range).toHaveBeenCalledOnce();
    expect(utils.range).toHaveBeenLastCalledWith(1, 6);
  });
});
