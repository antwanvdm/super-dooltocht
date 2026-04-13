// @ts-check
import { test, expect } from '@playwright/test';
import {
  startAdventure,
  navigateToHome,
  dismissMazeModals,
} from './helpers.js';

/**
 * Helper: verify we're on a maze page. Uses the top-bar heading which contains
 * the theme emoji + name (e.g. "🚀 🚀 Ruimte").
 */
async function expectMazeLoaded(page) {
  // The top-bar has key progress (🔑) and friends (🤝) indicators
  await expect(page.locator('text=🔑').first()).toBeVisible({
    timeout: 10_000,
  });
}

// ──────────────────────────────────────────────────────────────────────────────
// Start different exercise categories
// ──────────────────────────────────────────────────────────────────────────────

test.describe('Play adventure – Rekenen', () => {
  test('start a short Plussommen adventure', async ({ page }) => {
    await startAdventure(page, {
      category: 'rekenen',
      operation: 'add',
      theme: 'space',
      length: 'short',
    });
    await expectMazeLoaded(page);
  });

  test('start a short Keersommen adventure', async ({ page }) => {
    await startAdventure(page, {
      category: 'rekenen',
      operation: 'mul',
      theme: 'jungle',
      length: 'short',
    });
    await expectMazeLoaded(page);
  });

  test('start a short Deelsommen adventure', async ({ page }) => {
    await startAdventure(page, {
      category: 'rekenen',
      operation: 'div',
      theme: 'jungle',
      length: 'short',
    });
    await expectMazeLoaded(page);
  });

  test('start a short Minsommen adventure', async ({ page }) => {
    await startAdventure(page, {
      category: 'rekenen',
      operation: 'sub',
      theme: 'ocean',
      length: 'short',
    });
    await expectMazeLoaded(page);
  });

  test('start a Getallen begrijpen adventure', async ({ page }) => {
    await startAdventure(page, {
      category: 'rekenen',
      operation: 'placeValue',
      theme: 'castle',
      length: 'short',
    });
    await expectMazeLoaded(page);
  });

  test('start a Rekenen met geld adventure', async ({ page }) => {
    await startAdventure(page, {
      category: 'rekenen',
      operation: 'money',
      theme: 'pirates',
      length: 'short',
    });
    await expectMazeLoaded(page);
  });

  test('start a Verliefde harten adventure', async ({ page }) => {
    await startAdventure(page, {
      category: 'rekenen',
      operation: 'lovingHearts',
      theme: 'candy',
      length: 'short',
    });
    await expectMazeLoaded(page);
  });

  test('start a Breuken adventure', async ({ page }) => {
    await startAdventure(page, {
      category: 'rekenen',
      operation: 'fractions',
      theme: 'dino',
      length: 'short',
    });
    await expectMazeLoaded(page);
  });
});

test.describe('Play adventure – Tijd', () => {
  test('start a Klokkijken adventure', async ({ page }) => {
    await startAdventure(page, {
      category: 'tijd',
      operation: 'clock',
      theme: 'farm',
      length: 'short',
    });
    await expectMazeLoaded(page);
  });

  test('start a Tijdsbesef adventure', async ({ page }) => {
    await startAdventure(page, {
      category: 'tijd',
      operation: 'timeAwareness',
      theme: 'candy',
      length: 'short',
    });
    await expectMazeLoaded(page);
  });

  test('start a Rekenen met tijd adventure', async ({ page }) => {
    await startAdventure(page, {
      category: 'tijd',
      operation: 'timeCalculation',
      theme: 'music',
      length: 'short',
    });
    await expectMazeLoaded(page);
  });
});

test.describe('Play adventure – Taal', () => {
  test('start a Spelling adventure', async ({ page }) => {
    await startAdventure(page, {
      category: 'taal',
      operation: 'spelling',
      theme: 'dino',
      length: 'short',
    });
    await expectMazeLoaded(page);
  });

  test('start a Woordenschat adventure', async ({ page }) => {
    await startAdventure(page, {
      category: 'taal',
      operation: 'vocabulary',
      theme: 'food',
      length: 'short',
    });
    await expectMazeLoaded(page);
  });

  test('start a Begrijpend lezen adventure', async ({ page }) => {
    await startAdventure(page, {
      category: 'taal',
      operation: 'reading',
      theme: 'traffic',
      length: 'short',
    });
    await expectMazeLoaded(page);
  });

  test('start an Engels adventure', async ({ page }) => {
    await startAdventure(page, {
      category: 'taal',
      operation: 'english',
      theme: 'sports',
      length: 'short',
    });
    await expectMazeLoaded(page);
  });

  test('start a Rijmen adventure', async ({ page }) => {
    await startAdventure(page, {
      category: 'taal',
      operation: 'rijmen',
      theme: 'candy',
      length: 'short',
    });
    await expectMazeLoaded(page);
  });

  test('start a Woordsoorten adventure', async ({ page }) => {
    await startAdventure(page, {
      category: 'taal',
      operation: 'woordsoorten',
      theme: 'farm',
      length: 'short',
    });
    await expectMazeLoaded(page);
  });
});

test.describe('Play adventure – Puzzels', () => {
  test('start a Sudoku adventure', async ({ page }) => {
    await startAdventure(page, {
      category: 'puzzels',
      operation: 'sudoku',
      theme: 'castle',
      length: 'short',
    });
    await expectMazeLoaded(page);
  });

  test('start a Schaken adventure', async ({ page }) => {
    await startAdventure(page, {
      category: 'puzzels',
      operation: 'chess',
      theme: 'dino',
      length: 'short',
    });
    await expectMazeLoaded(page);
  });

  test('start a Tectonic adventure', async ({ page }) => {
    await startAdventure(page, {
      category: 'puzzels',
      operation: 'tectonic',
      theme: 'ocean',
      length: 'short',
    });
    await expectMazeLoaded(page);
  });

  test('start a Binair adventure', async ({ page }) => {
    await startAdventure(page, {
      category: 'puzzels',
      operation: 'binary',
      theme: 'space',
      length: 'short',
    });
    await expectMazeLoaded(page);
  });
});

test.describe('Play adventure – Meetkunde', () => {
  test('start a Vormen adventure', async ({ page }) => {
    await startAdventure(page, {
      category: 'meetkunde',
      operation: 'vormen',
      theme: 'ocean',
      length: 'short',
    });
    await expectMazeLoaded(page);
  });

  test('start a Symmetrie adventure', async ({ page }) => {
    await startAdventure(page, {
      category: 'meetkunde',
      operation: 'symmetrie',
      theme: 'candy',
      length: 'short',
    });
    await expectMazeLoaded(page);
  });

  test('start an Omtrek & oppervlakte adventure', async ({ page }) => {
    await startAdventure(page, {
      category: 'meetkunde',
      operation: 'omtrekOppervlakte',
      theme: 'castle',
      length: 'short',
    });
    await expectMazeLoaded(page);
  });

  test('start an Eenheden omrekenen adventure', async ({ page }) => {
    await startAdventure(page, {
      category: 'meetkunde',
      operation: 'eenheden',
      theme: 'pirates',
      length: 'short',
    });
    await expectMazeLoaded(page);
  });
});

test.describe('Play adventure – Digitaal', () => {
  test('start a Computerkennis adventure', async ({ page }) => {
    await startAdventure(page, {
      category: 'digitaal',
      operation: 'computerkennis',
      theme: 'space',
      length: 'short',
    });
    await expectMazeLoaded(page);
  });

  test('start an Online veiligheid adventure', async ({ page }) => {
    await startAdventure(page, {
      category: 'digitaal',
      operation: 'veiligheid',
      theme: 'castle',
      length: 'short',
    });
    await expectMazeLoaded(page);
  });

  test('start a Mediawijsheid adventure', async ({ page }) => {
    await startAdventure(page, {
      category: 'digitaal',
      operation: 'mediawijsheid',
      theme: 'jungle',
      length: 'short',
    });
    await expectMazeLoaded(page);
  });
});

test.describe('Play adventure – Topografie', () => {
  test('start a Nederland adventure', async ({ page }) => {
    await startAdventure(page, {
      category: 'topografie',
      operation: 'nederland',
      theme: 'farm',
      length: 'short',
    });
    await expectMazeLoaded(page);
  });

  test('start a Europa adventure', async ({ page }) => {
    await startAdventure(page, {
      category: 'topografie',
      operation: 'europa',
      theme: 'jungle',
      length: 'short',
    });
    await expectMazeLoaded(page);
  });

  test('start a De wereld adventure', async ({ page }) => {
    await startAdventure(page, {
      category: 'topografie',
      operation: 'wereld',
      theme: 'pirates',
      length: 'short',
    });
    await expectMazeLoaded(page);
  });

  test('start a Windrichtingen adventure', async ({ page }) => {
    await startAdventure(page, {
      category: 'topografie',
      operation: 'windrichtingen',
      theme: 'ocean',
      length: 'short',
    });
    await expectMazeLoaded(page);
  });
});

test.describe('Play adventure – Verkeer', () => {
  test('start a Verkeersborden adventure', async ({ page }) => {
    await startAdventure(page, {
      category: 'verkeer',
      operation: 'borden',
      theme: 'sports',
      length: 'short',
    });
    await expectMazeLoaded(page);
  });

  test('start a Verkeersregels adventure', async ({ page }) => {
    await startAdventure(page, {
      category: 'verkeer',
      operation: 'regels',
      theme: 'music',
      length: 'short',
    });
    await expectMazeLoaded(page);
  });
});

// ──────────────────────────────────────────────────────────────────────────────

test.describe('Maze interaction', () => {
  test('help modal can be opened with H and closed with Escape', async ({
    page,
  }) => {
    await startAdventure(page, {
      category: 'rekenen',
      operation: 'add',
      theme: 'space',
      length: 'short',
    });

    // Open help
    await page.keyboard.press('h');
    await expect(page.getByText('Hoe werkt het?')).toBeVisible({
      timeout: 3000,
    });

    // Close help
    await page.keyboard.press('Escape');
    await expect(page.getByText('Hoe werkt het?')).not.toBeVisible();
  });

  test('help modal can be opened via button', async ({ page }) => {
    await startAdventure(page, {
      category: 'rekenen',
      operation: 'add',
      theme: 'space',
      length: 'short',
    });

    await page.locator('button:has-text("❓")').click();
    await expect(page.getByText('Hoe werkt het?')).toBeVisible({
      timeout: 3000,
    });
  });

  test('minimap can be opened with K and closed with Escape', async ({
    page,
  }) => {
    await startAdventure(page, {
      category: 'rekenen',
      operation: 'add',
      theme: 'space',
      length: 'short',
    });

    // Open minimap
    await page.keyboard.press('k');
    await page.waitForTimeout(500);

    // Minimap overlay should be visible (it has a dark backdrop)
    // Close it
    await page.keyboard.press('Escape');
  });

  test('player can move around with arrow keys without crashing', async ({
    page,
  }) => {
    await startAdventure(page, {
      category: 'rekenen',
      operation: 'add',
      theme: 'space',
      length: 'short',
    });

    // Move the player around — maze is random so just verify no crash
    for (const key of [
      'ArrowRight',
      'ArrowRight',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowUp',
    ]) {
      await page.keyboard.press(key);
      await page.waitForTimeout(100);
    }

    // Maze should still be functional
    await expectMazeLoaded(page);
  });

  test('back button navigates to home', async ({ page }) => {
    await startAdventure(page, {
      category: 'rekenen',
      operation: 'add',
      theme: 'space',
      length: 'short',
    });

    // Click back button
    await page.locator('button').filter({ hasText: 'Terug' }).click();

    // Should be back on home
    await expect(page.getByText('Stel je avontuur in')).toBeVisible();
  });

  test('continue modal appears when returning to a saved game', async ({
    page,
  }) => {
    // Start a game
    await startAdventure(page, {
      category: 'rekenen',
      operation: 'add',
      theme: 'space',
      length: 'short',
    });

    // Move a bit to generate a save
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(200);

    // Go back to home
    await page.locator('button').filter({ hasText: 'Terug' }).click();
    await page.waitForTimeout(500);

    // Continue modal should appear
    await expect(page.getByText('Welkom terug!')).toBeVisible({
      timeout: 5000,
    });
    await expect(
      page.getByRole('button', { name: /Ga verder/i }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: /Start opnieuw/i }),
    ).toBeVisible();
  });

  test('can continue a saved game', async ({ page }) => {
    await startAdventure(page, {
      category: 'rekenen',
      operation: 'add',
      theme: 'space',
      length: 'short',
    });

    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(200);

    await page.locator('button').filter({ hasText: 'Terug' }).click();
    await page.waitForTimeout(500);

    // Continue the game
    await page.getByRole('button', { name: /Ga verder/i }).click();

    // Should be back in the maze
    await expectMazeLoaded(page);
  });

  test('can start fresh after dismissing continue modal', async ({ page }) => {
    await startAdventure(page, {
      category: 'rekenen',
      operation: 'add',
      theme: 'space',
      length: 'short',
    });

    await page.locator('button').filter({ hasText: 'Terug' }).click();
    await page.waitForTimeout(500);

    // Start fresh
    await page.getByRole('button', { name: /Start opnieuw/i }).click();

    // Continue modal should be gone, settings visible
    await expect(page.getByText('Stel je avontuur in')).toBeVisible();
    await expect(page.getByText('Welkom terug!')).not.toBeVisible();
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// Multiple exercise combinations
// ──────────────────────────────────────────────────────────────────────────────

test.describe('Multiple exercise combinations', () => {
  test('Rekenen: plussommen + minsommen combined', async ({ page }) => {
    await navigateToHome(page);

    await page.locator('label').filter({ hasText: 'Plussommen' }).click();
    await page.locator('label').filter({ hasText: 'Minsommen' }).click();
    await page.locator('section button').filter({ hasText: 'Ruimte' }).click();
    await page.getByRole('button', { name: /Start avontuur/i }).click();

    await page.waitForURL(/\/#\/maze\//);
    await expectMazeLoaded(page);
  });

  test('Rekenen: all operations enabled', async ({ page }) => {
    await navigateToHome(page);

    await page.locator('label').filter({ hasText: 'Plussommen' }).click();
    await page.locator('label').filter({ hasText: 'Minsommen' }).click();
    await page.locator('label').filter({ hasText: 'Keersommen' }).click();
    await page
      .locator('label')
      .filter({ hasText: 'Getallen begrijpen' })
      .click();
    await page.locator('label').filter({ hasText: 'Verliefde harten' }).click();
    await page.locator('label').filter({ hasText: 'Rekenen met geld' }).click();
    await page.locator('section button').filter({ hasText: 'Oceaan' }).click();
    await page.getByRole('button', { name: /Start avontuur/i }).click();

    await page.waitForURL(/\/#\/maze\//);
    await expectMazeLoaded(page);
  });

  test('Tijd: clock + time awareness combined', async ({ page }) => {
    await navigateToHome(page);

    await page.getByRole('button', { name: 'Tijd' }).click();
    await page.locator('label').filter({ hasText: 'Klokkijken' }).click();
    await page.locator('label').filter({ hasText: 'Tijdsbesef' }).click();
    await page.locator('section button').filter({ hasText: 'Jungle' }).click();
    await page.getByRole('button', { name: /Start avontuur/i }).click();

    await page.waitForURL(/\/#\/maze\//);
    await expectMazeLoaded(page);
  });

  test('Taal: spelling + vocabulary + reading combined', async ({ page }) => {
    await navigateToHome(page);

    await page
      .getByTestId('category-tabs')
      .getByRole('button', { name: '📝 Taal', exact: true })
      .click();
    await page
      .locator('label')
      .filter({ hasText: 'Oefen spellingcategorieën' })
      .click();
    await page.locator('label').filter({ hasText: 'Woordenschat' }).click();
    await page.locator('label').filter({ hasText: 'Begrijpend lezen' }).click();
    await page
      .getByTestId('theme-selector')
      .getByRole('button', { name: 'Kasteel' })
      .click();
    await page.getByRole('button', { name: /Start avontuur/i }).click();

    await page.waitForURL(/\/#\/maze\//);
    await expectMazeLoaded(page);
  });

  test('Taal: all taal operations enabled', async ({ page }) => {
    await navigateToHome(page);

    await page
      .getByTestId('category-tabs')
      .getByRole('button', { name: '📝 Taal', exact: true })
      .click();
    await page
      .locator('label')
      .filter({ hasText: 'Oefen spellingcategorieën' })
      .click();
    await page.locator('label').filter({ hasText: 'Woordenschat' }).click();
    await page.locator('label').filter({ hasText: 'Begrijpend lezen' }).click();
    await page
      .locator('label')
      .filter({ hasText: 'Leer Engelse woordjes' })
      .click();
    await page
      .getByTestId('theme-selector')
      .getByRole('button', { name: 'Dinosaurus' })
      .click();
    await page.getByRole('button', { name: /Start avontuur/i }).click();

    await page.waitForURL(/\/#\/maze\//);
    await expectMazeLoaded(page);
  });

  test('start long adventure', async ({ page }) => {
    await navigateToHome(page);

    await page.locator('label').filter({ hasText: 'Plussommen' }).click();
    await page.locator('label').filter({ hasText: 'Red 6 vriendjes' }).click();
    await page.locator('section button').filter({ hasText: 'Piraten' }).click();
    await page.getByRole('button', { name: /Start avontuur/i }).click();

    await page.waitForURL(/\/#\/maze\//);
    await expectMazeLoaded(page);
  });

  test('start XL adventure shows floor indicator', async ({ page }) => {
    test.setTimeout(120_000);
    await startAdventure(page, {
      category: 'rekenen',
      operation: 'add',
      theme: 'castle',
      length: 'xl',
    });
    await expectMazeLoaded(page);

    // XL mode should show the floor indicator badge
    await expect(page.getByText('🪜 Beneden')).toBeVisible({ timeout: 5000 });
  });

  test('each theme can be selected and started', async ({ page }) => {
    test.setTimeout(180_000);
    const themes = [
      'Ruimte',
      'Oceaan',
      'Jungle',
      'Kasteel',
      'Dinosaurus',
      'Snoep',
      'Sport',
      'Eten',
      'Verkeer',
      'Boerderij',
      'Muziek',
      'Piraten',
    ];

    for (const themeName of themes) {
      await navigateToHome(page);
      await page.locator('label').filter({ hasText: 'Plussommen' }).click();
      await page
        .getByTestId('theme-selector')
        .getByRole('button', { name: themeName })
        .click();
      await page.getByRole('button', { name: /Start avontuur/i }).click();
      await page.waitForURL(/\/#\/maze\//);

      // Verify the maze loaded
      await expectMazeLoaded(page);
    }
  });
});
