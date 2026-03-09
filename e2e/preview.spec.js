// @ts-check
import { test, expect } from '@playwright/test';

// The preview page bypasses CodeFlowManager, so no API mocking is needed.

test.describe('Minigame Preview Page', () => {
  test('should show all categories and open a minigame', async ({ page }) => {
    await page.goto('/#/preview-minigames');

    // Header is visible
    await expect(page.getByText('Minigame Overzicht')).toBeVisible();

    // All 9 category headers are present
    const categories = [
      'Rekenen', 'Geld', 'Klokkijken', 'Tijdsbesef',
      'Rekenen met tijd', 'Spelling', 'Woordenschat',
      'Begrijpend lezen', 'Engels',
    ];
    for (const name of categories) {
      await expect(page.getByRole('heading', { name, exact: true })).toBeVisible();
    }

    // Click a game button in the Rekenen category
    await page.getByRole('button', { name: 'Kies het antwoord' }).first().click();

    // The minigame modal opens with a header
    await expect(page.getByText('Preview modus')).toBeVisible({ timeout: 5000 });

    // The reload button is present
    await expect(page.getByTitle('Opnieuw laden')).toBeVisible();

    // Close the modal
    await page.getByText('✕').click();
    await expect(page.getByText('Preview modus')).not.toBeVisible();
  });

  test('should have settings controls for configurable categories', async ({ page }) => {
    await page.goto('/#/preview-minigames');

    // Rekenen has a "Plus/min tot" dropdown
    await expect(page.getByText('Plus/min tot:')).toBeVisible();

    // Geld has a "Met centen" toggle
    await expect(page.getByText('Met centen')).toBeVisible();

    // Engels has a direction selector
    await expect(page.getByText('Richting:')).toBeVisible();
  });
});
