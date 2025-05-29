import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Pagination from './Pagination';
import userEvent from '@testing-library/user-event';
import * as utils from '../utils';

vi.mock('../utils.js', () => {
  return {
    range: () => [1, 2, 3, 4],
  };
});

describe('Pagination v3', () => {
  it('should render four page containers', () => {
    render(<Pagination total={40} limit={10} currentPage={1} />);

    const pageContainers = screen.getAllByTestId('page-container');

    expect(pageContainers).toHaveLength(4);
    expect(pageContainers[0]).toHaveTextContent('1');
  });

  it('should call selectPage function', async () => {
    const user = userEvent.setup();
    const handleSelectPage = vi.fn();
    render(
      <Pagination
        total={40}
        limit={10}
        currentPage={1}
        selectPage={handleSelectPage}
      />
    );

    const pageContainers = screen.getAllByTestId('page-container');

    await user.click(pageContainers[0]);

    expect(handleSelectPage).toHaveBeenCalledWith(1);
  });

  it('spies on utils', () => {
    vi.spyOn(utils, 'range');

    render(<Pagination total={40} limit={10} currentPage={1} />);
    expect(utils.range).toHaveBeenCalledWith(1, 5);
  });
});
