// @ts-check
import { test, expect } from '@playwright/test';
import { navigateToHome } from './helpers.js';

test.describe('Home – Settings flow', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToHome(page);
  });

  // ─── Category tabs ────────────────────────────────────────────────────────

  test('shows Rekenen category by default', async ({ page }) => {
    await expect(
      page.locator('label').filter({ hasText: 'Plussommen' }),
    ).toBeVisible();
    await expect(
      page.locator('label').filter({ hasText: 'Minsommen' }),
    ).toBeVisible();
    await expect(
      page.locator('label').filter({ hasText: 'Keersommen' }),
    ).toBeVisible();
  });

  test('can switch to Tijd category', async ({ page }) => {
    await page.getByRole('button', { name: 'Tijd' }).click();

    await expect(
      page.locator('label').filter({ hasText: 'Klokkijken' }),
    ).toBeVisible();
    await expect(
      page.locator('label').filter({ hasText: 'Tijdsbesef' }),
    ).toBeVisible();
    await expect(
      page.locator('label').filter({ hasText: 'Rekenen met tijd' }),
    ).toBeVisible();
  });

  test('can switch to Taal category', async ({ page }) => {
    await page.getByRole('button', { name: 'Taal' }).click();

    await expect(
      page.locator('label').filter({ hasText: 'Spelling' }).first(),
    ).toBeVisible();
    await expect(
      page.locator('label').filter({ hasText: 'Woordenschat' }),
    ).toBeVisible();
    await expect(
      page.locator('label').filter({ hasText: 'Begrijpend lezen' }),
    ).toBeVisible();
    await expect(
      page.locator('label').filter({ hasText: 'Engels' }),
    ).toBeVisible();
  });

  test('can switch between all categories', async ({ page }) => {
    // Rekenen → Tijd → Taal → Rekenen
    await page.getByRole('button', { name: 'Tijd' }).click();
    await expect(
      page.locator('label').filter({ hasText: 'Klokkijken' }),
    ).toBeVisible();

    await page.getByRole('button', { name: 'Taal' }).click();
    await expect(
      page.locator('label').filter({ hasText: 'Spelling' }).first(),
    ).toBeVisible();

    await page.getByRole('button', { name: 'Rekenen' }).click();
    await expect(
      page.locator('label').filter({ hasText: 'Plussommen' }),
    ).toBeVisible();
  });

  // ─── Rekenen operations ───────────────────────────────────────────────────

  test('toggling Plussommen shows level options', async ({ page }) => {
    await page.locator('label').filter({ hasText: 'Plussommen' }).click();

    // Level options should appear
    await expect(page.getByText('Plussommen tot:')).toBeVisible();
  });

  test('toggling Keersommen shows table selection', async ({ page }) => {
    await page.locator('label').filter({ hasText: 'Keersommen' }).click();

    await expect(page.getByText('Keersommen tafels:')).toBeVisible();
    await expect(page.getByText('Tafels van 1, 2, 5, 10')).toBeVisible();
  });

  test('toggling Deelsommen shows table selection', async ({ page }) => {
    await page.locator('label').filter({ hasText: 'Deelsommen' }).click();

    await expect(page.getByText('Deelsommen tafels:')).toBeVisible();
    await expect(page.getByText('Tafels van 1, 2, 5, 10')).toBeVisible();
  });

  test('toggling both Keer- en Deelsommen shows combined label', async ({
    page,
  }) => {
    await page.locator('label').filter({ hasText: 'Keersommen' }).click();
    await page.locator('label').filter({ hasText: 'Deelsommen' }).click();

    await expect(page.getByText('Keer- & deelsommen tafels:')).toBeVisible();
  });

  test('toggling Getallen begrijpen shows level options', async ({ page }) => {
    await page
      .locator('label')
      .filter({ hasText: 'Getallen begrijpen' })
      .click();

    await expect(page.getByText('Getallen begrijpen niveau:')).toBeVisible();
    await expect(
      page.locator('label').filter({ hasText: 'Tientallen' }),
    ).toBeVisible();
  });

  test('toggling Rekenen met geld shows money options', async ({ page }) => {
    await page.locator('label').filter({ hasText: 'Rekenen met geld' }).click();

    await expect(page.getByText('Bedrag tot:')).toBeVisible();
    await expect(
      page.locator('label').filter({ hasText: 'Tot €20' }),
    ).toBeVisible();
  });

  test('enabling plus shows beyond/within tiental options', async ({
    page,
  }) => {
    await page.locator('label').filter({ hasText: 'Plussommen' }).click();

    await expect(page.getByText('Binnen of buiten het tiental:')).toBeVisible();
    await expect(
      page.locator('label').filter({ hasText: 'Binnen tiental' }),
    ).toBeVisible();
    await expect(
      page.locator('label').filter({ hasText: 'Over tiental' }),
    ).toBeVisible();
  });

  // ─── Tijd options ─────────────────────────────────────────────────────────

  test('Klokkijken shows clock level options (enabled by default)', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Tijd' }).click();
    // Clock is already enabled by default — level options should be visible
    await expect(page.getByText('Klokkijken niveau:')).toBeVisible();
    await expect(
      page.locator('label').filter({ hasText: 'Hele uren' }).first(),
    ).toBeVisible();
    await expect(
      page.locator('label').filter({ hasText: 'Halve uren' }).first(),
    ).toBeVisible();
  });

  test('Klokkijken shows extra options (woorden, 24h)', async ({ page }) => {
    await page.getByRole('button', { name: 'Tijd' }).click();
    // Clock is already enabled by default — extra options should be visible
    await expect(page.getByText('Extra opties:')).toBeVisible();
    await expect(
      page.locator('label').filter({ hasText: 'Woorden' }),
    ).toBeVisible();
    await expect(
      page.locator('label').filter({ hasText: '24-uurs notatie' }).first(),
    ).toBeVisible();
  });

  test('Tijdsbesef shows topic checkboxes', async ({ page }) => {
    await page.getByRole('button', { name: 'Tijd' }).click();
    // Tijdsbesef is OFF by default, click to enable
    await page.locator('label').filter({ hasText: 'Tijdsbesef' }).click();

    await expect(page.getByText('Tijdsbesef onderwerpen:')).toBeVisible();
    await expect(
      page.locator('label').filter({ hasText: 'Dagen van de week' }),
    ).toBeVisible();
    await expect(
      page.locator('label').filter({ hasText: 'Maanden van het jaar' }),
    ).toBeVisible();
    await expect(
      page.locator('label').filter({ hasText: '🌿 Seizoenen' }),
    ).toBeVisible();
  });

  test('Rekenen met tijd shows level options', async ({ page }) => {
    await page.getByRole('button', { name: 'Tijd' }).click();
    // The label "Rekenen met tijd" in the operations list
    await page
      .locator('label')
      .filter({ hasText: 'Rekenen met tijd' })
      .first()
      .click();

    await expect(page.getByText('Rekenen met tijd niveau:')).toBeVisible();
    await expect(
      page.locator('label').filter({ hasText: 'Dagen & weken' }),
    ).toBeVisible();
  });

  // ─── Taal options ─────────────────────────────────────────────────────────

  test('Spelling shows category checkboxes', async ({ page }) => {
    await page.getByRole('button', { name: 'Taal' }).click();
    await page.locator('label').filter({ hasText: 'Spelling' }).first().click();

    await expect(page.getByText('Spellingcategorieën:')).toBeVisible();
    await expect(
      page.locator('label').filter({ hasText: 'Hakwoord' }),
    ).toBeVisible();
    await expect(
      page.locator('label').filter({ hasText: 'Zingwoord' }),
    ).toBeVisible();
  });

  test('Woordenschat shows theme vocabulary toggle', async ({ page }) => {
    await page.getByRole('button', { name: 'Taal' }).click();
    await page.locator('label').filter({ hasText: 'Woordenschat' }).click();

    await expect(
      page
        .locator('label')
        .filter({ hasText: 'Woorden van de gekozen wereld' }),
    ).toBeVisible();
  });

  test('Begrijpend lezen shows reading level options', async ({ page }) => {
    await page.getByRole('button', { name: 'Taal' }).click();
    await page.locator('label').filter({ hasText: 'Begrijpend lezen' }).click();

    await expect(
      page.locator('label').filter({ hasText: 'Korte teksten' }),
    ).toBeVisible();
    await expect(
      page.locator('label').filter({ hasText: 'Langere teksten' }),
    ).toBeVisible();
  });

  test('Engels shows level and direction options', async ({ page }) => {
    await page.getByRole('button', { name: 'Taal' }).click();
    await page
      .locator('label')
      .filter({ hasText: 'Leer Engelse woordjes' })
      .click();

    await expect(
      page.locator('label').filter({ hasText: 'Makkelijk' }),
    ).toBeVisible();
    await expect(
      page.locator('label').filter({ hasText: 'Nederlands → Engels' }),
    ).toBeVisible();
    await expect(
      page.locator('label').filter({ hasText: 'Beide richtingen' }),
    ).toBeVisible();
  });

  // ─── Adventure length ─────────────────────────────────────────────────────

  test('adventure length options are visible', async ({ page }) => {
    await expect(
      page
        .locator('label')
        .filter({ hasText: 'Red 2 vriendjes + 4 uitdagingen' }),
    ).toBeVisible();
    await expect(
      page
        .locator('label')
        .filter({ hasText: 'Red 4 vriendjes + 7 uitdagingen' }),
    ).toBeVisible();
    await expect(
      page
        .locator('label')
        .filter({ hasText: 'Red 6 vriendjes + 10 uitdagingen' }),
    ).toBeVisible();
  });

  test('can select different adventure lengths', async ({ page }) => {
    const kortLabel = page
      .locator('label')
      .filter({ hasText: 'Red 2 vriendjes' });
    await kortLabel.click();
    await expect(kortLabel).toHaveClass(/bg-amber-500/);
  });

  // ─── World selection ──────────────────────────────────────────────────────

  test('theme worlds are visible', async ({ page }) => {
    await expect(page.getByText('Kies je wereld')).toBeVisible();
    // Check a few theme buttons
    await expect(
      page.locator('section button').filter({ hasText: 'Ruimte' }),
    ).toBeVisible();
    await expect(
      page.locator('section button').filter({ hasText: 'Oceaan' }),
    ).toBeVisible();
    await expect(
      page.locator('section button').filter({ hasText: 'Jungle' }),
    ).toBeVisible();
  });

  test('selecting a world highlights it', async ({ page }) => {
    const themeBtn = page
      .locator('section button')
      .filter({ hasText: 'Ruimte' });
    await themeBtn.click();
    await expect(themeBtn).toHaveClass(/ring-4/);
  });

  // ─── Start button ─────────────────────────────────────────────────────────

  test('start button is disabled without operation selected', async ({
    page,
  }) => {
    const startBtn = page.getByRole('button', {
      name: /Kies sommen en wereld/i,
    });
    await expect(startBtn).toBeDisabled();
  });

  test('start button says "Kies eerst een wereld" when operation selected but no theme', async ({
    page,
  }) => {
    await page.locator('label').filter({ hasText: 'Plussommen' }).click();
    const startBtn = page.getByRole('button', {
      name: /Kies eerst een wereld/i,
    });
    await expect(startBtn).toBeVisible();
  });

  test('start button is enabled with operation + world selected', async ({
    page,
  }) => {
    await page.locator('label').filter({ hasText: 'Plussommen' }).click();
    await page.locator('section button').filter({ hasText: 'Ruimte' }).click();

    const startBtn = page.getByRole('button', { name: /Start avontuur/i });
    await expect(startBtn).toBeEnabled();
  });

  // ─── Player emoji ─────────────────────────────────────────────────────────

  test('player emoji picker is visible', async ({ page }) => {
    await expect(page.getByText('Jouw karakter')).toBeVisible();
    await expect(page.getByRole('button', { name: 'kies 🤖' })).toBeVisible();
  });

  test('can select a different player emoji', async ({ page }) => {
    // Use exact match to avoid matching 🧙‍♂️
    const wizardBtn = page.getByRole('button', {
      name: 'kies 🧙',
      exact: true,
    });
    await wizardBtn.click();
    await expect(wizardBtn).toHaveClass(/bg-purple-500/);
  });

  // ─── Stats ────────────────────────────────────────────────────────────────

  test('shows stats badges', async ({ page }) => {
    await expect(page.getByText(/doolhof(hoven)? voltooid/)).toBeVisible();
    await expect(page.getByText(/vriendje(s)? gered/)).toBeVisible();
  });
});
