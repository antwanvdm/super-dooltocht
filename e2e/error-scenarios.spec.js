// @ts-check
import { test, expect } from '@playwright/test';
import { MOCK_EMOJI_CATEGORIES, MOCK_PLAYER_CODE } from './helpers.js';

const API = 'http://localhost:3001';

// ──────────────────────────────────────────────────────────────────────────────
// API error scenarios
//
// These tests verify the app behaves gracefully when the backend returns
// errors, timeouts, or unexpected data.
// ──────────────────────────────────────────────────────────────────────────────

test.describe('Error scenarios – API failures', () => {
  test('shows loading state when emoji categories are slow', async ({
    page,
  }) => {
    // Delay emoji categories by 3 seconds
    await page.route(`${API}/api/emoji-categories`, async (route) => {
      await new Promise((r) => setTimeout(r, 3000));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(MOCK_EMOJI_CATEGORIES),
      });
    });

    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.goto('/');

    // Should show loading indicator
    await expect(page.getByText('Even laden...')).toBeVisible();
  });

  test('shows server-down screen when emoji categories fail to load', async ({
    page,
  }) => {
    // Abort the emoji categories request (server unreachable)
    await page.route(`${API}/api/emoji-categories`, (route) =>
      route.abort('connectionrefused'),
    );

    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.goto('/');

    // Should show a friendly error screen with retry button
    await expect(page.getByText(/server slaapt even/i)).toBeVisible({
      timeout: 5000,
    });
    await expect(
      page.getByRole('button', { name: /Probeer opnieuw/i }),
    ).toBeVisible();
  });

  test('shows server-down screen for returning player when server is down', async ({
    page,
  }) => {
    // Abort the emoji categories request
    await page.route(`${API}/api/emoji-categories`, (route) =>
      route.abort('connectionrefused'),
    );

    // Returning player has a saved code
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      localStorage.setItem(
        'super-dooltocht-player-code',
        JSON.stringify(['dog', 'heart_red', 'star', 'one']),
      );
    });
    await page.goto('/');

    // Should show friendly error, NOT a broken screen with ❓❓❓❓
    await expect(page.getByText(/server slaapt even/i)).toBeVisible({
      timeout: 5000,
    });
  });

  test('shows error when creating a new adventure fails (server 500)', async ({
    page,
  }) => {
    // Mock emoji categories normally
    await page.route(`${API}/api/emoji-categories`, (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(MOCK_EMOJI_CATEGORIES),
      }),
    );

    // Mock player creation to fail
    await page.route(`${API}/api/players`, (route) =>
      route.fulfill({ status: 500, body: 'Internal Server Error' }),
    );

    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.goto('/');

    // Click through to new adventure
    await page
      .getByText('Welkom bij Super Dooltocht!')
      .waitFor({ state: 'visible' });
    await page.getByRole('button', { name: /Start nieuw avontuur/i }).click();
    await page.getByRole('button', { name: /Maak mijn code/i }).click();

    // Should show error message
    await expect(page.getByText(/Kon geen verbinding maken/)).toBeVisible({
      timeout: 5000,
    });
  });

  test('shows error when code validation fails (invalid code)', async ({
    page,
  }) => {
    // Mock emoji categories normally
    await page.route(`${API}/api/emoji-categories`, (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(MOCK_EMOJI_CATEGORIES),
      }),
    );

    // Mock validation to return 404 (unknown code)
    await page.route(`${API}/api/players/validate`, (route) =>
      route.fulfill({ status: 404, body: 'Not found' }),
    );

    // Set a fake player code to trigger the "enter code" flow (auto-fills emojis)
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      localStorage.setItem(
        'super-dooltocht-player-code',
        JSON.stringify(['dog', 'apple', 'soccer', 'sun']),
      );
    });
    await page.goto('/');

    // Wait for the code entry screen with pre-filled emojis
    await page.getByText('Voer je code in').waitFor({ state: 'visible' });

    // Click submit to trigger validation
    await page.getByRole('button', { name: /Dit is mijn code/i }).click();

    // Should show error
    await expect(page.getByText(/Deze code ken ik niet/)).toBeVisible({
      timeout: 5000,
    });
  });

  test('shows server-down message when validation returns 503', async ({
    page,
  }) => {
    await page.route(`${API}/api/emoji-categories`, (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(MOCK_EMOJI_CATEGORIES),
      }),
    );

    // Mock validation to return 503 (DB down)
    await page.route(`${API}/api/players/validate`, (route) =>
      route.fulfill({ status: 503, body: JSON.stringify({ error: 'Service unavailable' }) }),
    );

    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      localStorage.setItem(
        'super-dooltocht-player-code',
        JSON.stringify(['dog', 'apple', 'soccer', 'sun']),
      );
    });
    await page.goto('/');

    await page.getByText('Voer je code in').waitFor({ state: 'visible' });
    await page.getByRole('button', { name: /Dit is mijn code/i }).click();

    // Should show server-down message, NOT "Deze code ken ik niet"
    await expect(page.getByText(/server is even in slaap/i)).toBeVisible({
      timeout: 5000,
    });
  });

  test('shows error when code validation has network error', async ({
    page,
  }) => {
    // Mock emoji categories normally
    await page.route(`${API}/api/emoji-categories`, (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(MOCK_EMOJI_CATEGORIES),
      }),
    );

    // Abort the validation request (simulates network failure)
    await page.route(`${API}/api/players/validate`, (route) =>
      route.abort('connectionrefused'),
    );

    // Set a fake player code
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      localStorage.setItem(
        'super-dooltocht-player-code',
        JSON.stringify(['dog', 'apple', 'soccer', 'sun']),
      );
    });
    await page.goto('/');

    // Wait for the code entry screen
    await page.getByText('Voer je code in').waitFor({ state: 'visible' });

    // Click submit to trigger validation
    await page.getByRole('button', { name: /Dit is mijn code/i }).click();

    // Should show a server-down error (not "code ken ik niet")
    await expect(page.getByText(/server is even in slaap/i)).toBeVisible({
      timeout: 5000,
    });
  });

  test('app does not crash when progress sync fails', async ({ page }) => {
    // Mock all APIs normally except progress sync
    await page.route(`${API}/api/emoji-categories`, (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(MOCK_EMOJI_CATEGORIES),
      }),
    );
    await page.route(`${API}/api/players/validate`, (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ code: MOCK_PLAYER_CODE, progress: {} }),
      }),
    );
    await page.route(`${API}/api/players`, (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ code: MOCK_PLAYER_CODE }),
      }),
    );

    // Progress sync always fails
    await page.route(`${API}/api/players/*/progress`, (route) =>
      route.fulfill({ status: 500, body: 'Server error' }),
    );

    // Navigate to home normally
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.goto('/');

    await page
      .getByText('Welkom bij Super Dooltocht!')
      .waitFor({ state: 'visible' });
    await page.getByRole('button', { name: /Start nieuw avontuur/i }).click();
    await page.getByRole('button', { name: /Maak mijn code/i }).click();
    await page.getByRole('button', { name: /Ik heb ze onthouden/i }).click();

    // Home screen should still work fine
    await expect(page.getByText('Super Dooltocht!')).toBeVisible();
    await expect(page.getByText('Stel je avontuur in')).toBeVisible();
  });
});
