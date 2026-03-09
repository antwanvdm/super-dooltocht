/**
 * Wrapper around dynamic import() that retries once on failure.
 * After a new deployment, cached HTML may reference chunk filenames that
 * no longer exist on the server. A single page reload fetches the new HTML
 * with correct chunk references.
 *
 * Usage:
 *   lazy(() => lazyRetry(() => import('./MyComponent')))
 */
export function lazyRetry(importFn) {
  return importFn().catch((error) => {
    // Only attempt reload once per session to avoid infinite loops
    const key = 'lazyRetryReloaded';
    const alreadyReloaded = sessionStorage.getItem(key);

    if (!alreadyReloaded) {
      sessionStorage.setItem(key, '1');
      window.location.reload();
      // Return a never-resolving promise so React doesn't render an error
      return new Promise(() => {});
    }

    // Already reloaded once — surface the real error
    throw error;
  });
}
