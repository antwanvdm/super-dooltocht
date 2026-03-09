import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { lazyRetry } from '../lazyRetry';

describe('lazyRetry', () => {
  let mockStore;
  let reloadCalled;

  beforeEach(() => {
    mockStore = {};
    reloadCalled = false;

    vi.stubGlobal('sessionStorage', {
      getItem: (key) => mockStore[key] ?? null,
      setItem: (key, value) => {
        mockStore[key] = value;
      },
    });

    // lazyRetry uses window.location.reload()
    vi.stubGlobal('window', {
      location: {
        reload: () => {
          reloadCalled = true;
        },
      },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should resolve when import succeeds', async () => {
    const mod = { default: 'MyComponent' };
    const result = await lazyRetry(() => Promise.resolve(mod));
    expect(result).toBe(mod);
  });

  it('should reload once on first import failure', async () => {
    const importFn = () => Promise.reject(new Error('Failed to fetch'));

    // lazyRetry returns a never-resolving promise after reload,
    // so we race it with a short timeout to verify the side effects
    const result = await Promise.race([
      lazyRetry(importFn).catch(() => 'threw'),
      new Promise((resolve) => setTimeout(() => resolve('pending'), 50)),
    ]);

    expect(result).toBe('pending'); // never-resolving promise
    expect(reloadCalled).toBe(true);
    expect(mockStore.lazyRetryReloaded).toBe('1');
  });

  it('should throw on second failure (already reloaded)', async () => {
    mockStore.lazyRetryReloaded = '1';
    const error = new Error('Chunk not found');

    await expect(lazyRetry(() => Promise.reject(error))).rejects.toThrow(
      'Chunk not found',
    );
    expect(reloadCalled).toBe(false);
  });
});
