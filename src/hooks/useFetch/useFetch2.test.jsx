import { describe, expect, it, vi } from 'vitest';
import useFetch from './useFetch';
import { renderHook, act } from '@testing-library/react';
import axios from 'axios';

describe('useFetch', () => {
  it('should render initial values', () => {
    const { result } = renderHook(() => useFetch('/todos'));

    const [{ response, isLoading, error }, doFetch] = result.current;

    expect(response).toBe(null);
    expect(isLoading).toBe(false);
    expect(error).toBe(null);
    expect(doFetch).toBeDefined();
  });

  it('should render success values after fetch', async () => {
    const mockedResponse = {
      data: [{ id: '1', text: 'foo', isCompleted: false }],
    };

    vi.spyOn(axios, 'request').mockResolvedValue(mockedResponse);

    const { result } = renderHook(() => useFetch('/todos'));

    await act(async () => {
      await result.current[1]();
    });

    const [{ response, isLoading, error }] = result.current;

    expect(response).toHaveLength(1);
    expect(response[0].text).toBe('foo');
    expect(isLoading).toBe(false);
    expect(error).toBe(null);
  });

  it('should render error values after fetch', async () => {
    const mockedResponse = {
      response: { data: 'Server Error' },
    };

    vi.spyOn(axios, 'request').mockRejectedValue(mockedResponse);

    const { result } = renderHook(() => useFetch('/todos'));

    await act(async () => {
      await result.current[1]();
    });

    const [{ response, isLoading, error }] = result.current;

    expect(response).toBe(null);
    expect(isLoading).toBe(false);
    expect(error).toBe('Server Error');
  });
});
