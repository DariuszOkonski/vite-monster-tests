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

const PATH = 'http://localhost:3004/tags';

describe('Tags with MSW', () => {
  const server = setupServer(
    http.get(PATH, () => {
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

  it.skip('should renders all tags from API', async () => {
    render(<Tags />);

    const tags = await screen.findAllByTestId('tag');

    expect(tags).toHaveLength(3);
    expect(tags[0]).toHaveTextContent('javascript');
    expect(tags[1]).toHaveTextContent('react');
    expect(tags[2]).toHaveTextContent('testing');
  });

  it('should render empty tags array', async () => {
    server.use(
      http.get(PATH, () => {
        return HttpResponse.json([]);
      })
    );

    render(<Tags />);

    const tags = await screen.queryAllByTestId('tag');

    expect(tags).toHaveLength(0);
  });

  it.skip('should handles server error gracefully', async () => {
    server.use(
      http.get(PATH, () => {
        return HttpResponse('Not Found', { status: 500 });
      })
    );

    render(<Tags />);
  });
});

describe('Tags with axios mocking', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should renders tags from mocked axios response', async () => {
    const mockTags = [
      { id: '1', name: 'vue' },
      { id: '2', name: 'angular' },
    ];

    vi.spyOn(axios, 'get').mockResolvedValue({ data: mockTags });

    render(<Tags />);

    const tags = await screen.findAllByTestId('tag');

    expect(tags).toHaveLength(2);
  });

  // it('should handles axios rejection', () => {
  //   vi.spyOn(axios, 'get').mockRejectedValue(new Error('Network error'));

  //   render(<Tags />);
  // });
});
