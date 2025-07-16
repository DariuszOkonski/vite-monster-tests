import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import Tags from './Tags';
import { render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import axios from 'axios';

describe('Tags with MSW', () => {
  const server = setupServer(
    http.get('http://localhost:3004/tags', () => {
      return HttpResponse.json([
        { id: '1', name: 'javascript' },
        { id: '2', name: 'react' },
        { id: '3', name: 'testing' },
      ]);
    })
  );

  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  it('renders all tags from API', async () => {
    render(<Tags />);

    const tags = await screen.findAllByTestId('tag');

    expect(tags).toHaveLength(3);
    expect(tags[0]).toHaveTextContent('javascript');
    expect(tags[1]).toHaveTextContent('react');
    expect(tags[2]).toHaveTextContent('testing');
  });

  it.skip('handles empty tags array', async () => {
    server.use(
      http.get('http://localhost:3004/tags', () => {
        return HttpResponse.json([]);
      })
    );

    render(<Tags />);

    const tags = screen.queryAllByTestId('tag');
    expect(tags).toHaveLength(0);
  });

  it.skip('handles server error gracefully', async () => {
    server.use(
      http.get('http://localhost:3004/tags', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(<Tags />);

    const tags = screen.queryAllByTestId('tag');
    expect(tags).toHaveLength(0);
  });
});

describe('Tags with axios mocking', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.skip('renders tags from mocked axios response', async () => {
    const mockTags = [
      { id: '1', name: 'vue' },
      { id: '2', name: 'angular' },
    ];
    vi.spyOn(axios, 'get').mockResolvedValue({ data: mockTags });

    render(<Tags />);

    const tags = await screen.findAllByTestId('tag');

    expect(tags).toHaveLength(2);
    expect(tags[0]).toHaveTextContent('vue');
    expect(tags[1]).toHaveTextContent('angular');
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3004/tags');
  });

  it.skip('handles axios rejection', async () => {
    vi.spyOn(axios, 'get').mockRejectedValue(new Error('Network error'));

    render(<Tags />);

    const tags = screen.queryAllByTestId('tag');
    expect(tags).toHaveLength(0);
  });
});
