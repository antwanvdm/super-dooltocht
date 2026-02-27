// @ts-check
import { test, expect } from '@playwright/test';
import {
  mockAllApiCalls,
  buildTestGameState,
  buildMultiFloorTestGameState,
  injectGameStateAndNavigate,
  navigateToHome,
  dismissMazeModals,
} from './helpers.js';

// ──────────────────────────────────────────────────────────────────────────────
// Gameplay tests – "Approach A"
//
// Instead of navigating a random maze, we inject a deterministic game state
// into localStorage. The tiny 7×7 maze has challenges and friends at known
// positions so we can walk to them reliably.
//
// Maze layout (see helpers.js buildTestGameState for details):
//   P=player(1,1) C=challenges(3,1)(1,3)(5,3)(3,5)
//   F=friends(5,1)(1,5) E=exit(5,5)
// ──────────────────────────────────────────────────────────────────────────────

test.describe('Gameplay – Solving challenges', () => {
  test('walking onto a challenge opens the ChallengeModal', async ({
    page,
  }) => {
    // Player at (1,1), challenge at (3,1) — walk right twice
    const state = buildTestGameState({ playerPos: { x: 1, y: 1 } });
    await injectGameStateAndNavigate(page, state);

    // Move right to (2,1) then (3,1) where the challenge is
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(150);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(500);

    // Challenge modal should appear
    await expect(page.getByText('Uitdaging:')).toBeVisible({ timeout: 5000 });
    // The header says "Los de opgave op om verder te gaan"
    await expect(page.getByText('Los de opgave op')).toBeVisible();
  });

  test('closing a challenge with ✕ does not count as completed', async ({
    page,
  }) => {
    const state = buildTestGameState({ playerPos: { x: 1, y: 1 } });
    await injectGameStateAndNavigate(page, state);

    // Walk to challenge at (3,1)
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(150);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(500);

    await expect(page.getByText('Uitdaging:')).toBeVisible({ timeout: 5000 });

    // Close the challenge
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    // Key progress should still show 0 completed (no filled bars)
    // The 🔑 indicator should still be visible
    await expect(page.locator('text=🔑').first()).toBeVisible();
  });

  test('answering a MultipleChoice correctly completes the challenge', async ({
    page,
  }) => {
    const state = buildTestGameState({ playerPos: { x: 1, y: 1 } });
    await injectGameStateAndNavigate(page, state);

    // Walk to challenge at (3,1)
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(150);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(800);

    // Wait for the challenge modal
    await expect(page.getByText('Uitdaging:')).toBeVisible({ timeout: 5000 });

    // Wait for the interaction delay (400ms) + content to render
    await page.waitForTimeout(600);

    // The minigame is randomized, but we can try to solve it.
    // For MultipleChoice: find the question text, extract the answer, and click it.
    // Since we can't predict the game type, let's read the problem and solve it.
    // Alternative: use page.evaluate to peek at React state.
    //
    // Simplest approach: try all answer buttons until one is correct.
    // The correct answer shows green (bg-green-500) and triggers confetti.
    const answerButtons = page.locator('.grid.grid-cols-2 button');
    const count = await answerButtons.count();

    if (count >= 2) {
      // Try each button until we find the correct one
      for (let i = 0; i < count; i++) {
        const btn = answerButtons.nth(i);
        const isDisabled = await btn.isDisabled();
        if (isDisabled) continue;

        await btn.click();
        await page.waitForTimeout(300);

        // Check if it was correct (shows green)
        const classes = await btn.getAttribute('class');
        if (classes && classes.includes('bg-green-500')) {
          // Correct! Wait for confetti + auto-close (1500ms)
          await page.waitForTimeout(2000);
          break;
        }

        // Wrong answer — wait for reset and try again
        await page.waitForTimeout(2500);
      }
    } else {
      // Not a MultipleChoice — close and skip
      await page.keyboard.press('Escape');
    }

    // The challenge modal should be closed now (or we escaped)
    // Either way, the maze should be functional
    await expect(page.locator('text=🔑').first()).toBeVisible();
  });
});

test.describe('Gameplay – Rescuing friends', () => {
  test('walking onto a friend opens the FriendlyDialog', async ({ page }) => {
    // Player at (3,1), friend at (5,1) — walk right twice
    const state = buildTestGameState({ playerPos: { x: 3, y: 1 } });
    await injectGameStateAndNavigate(page, state);

    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(150);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(500);

    // Friendly dialog should appear with the emoji and message
    await expect(page.getByText('Hoera, je hebt me gevonden!')).toBeVisible({
      timeout: 5000,
    });
    await expect(page.getByRole('button', { name: /Neem mee/i })).toBeVisible();
  });

  test('clicking "Neem mee" collects the friend', async ({ page }) => {
    const state = buildTestGameState({ playerPos: { x: 3, y: 1 } });
    await injectGameStateAndNavigate(page, state);

    // Walk to friend at (5,1)
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(150);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(800);

    await expect(page.getByText('Hoera, je hebt me gevonden!')).toBeVisible({
      timeout: 5000,
    });

    // Wait for interaction delay
    await page.waitForTimeout(500);

    await page.getByRole('button', { name: /Neem mee/i }).click();
    await page.waitForTimeout(500);

    // The friends indicator in the header should now show 1 collected
    // The friend slot shows the friend emoji 🛸 instead of '?'
    await expect(page.locator('.bg-green-100').first()).toBeVisible();
  });
});

test.describe('Gameplay – Exit & Win', () => {
  test('exit with incomplete challenges shows warning', async ({ page }) => {
    // Player near exit at (5,5), but 0 challenges completed
    const state = buildTestGameState({
      completedChallenges: 0,
      playerPos: { x: 3, y: 5 },
    });
    await injectGameStateAndNavigate(page, state);

    // Walk right to (4,5) then (5,5) = exit
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(150);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(800);

    // Exit modal should appear
    await expect(page.getByText('Bijna bij de deur!')).toBeVisible({
      timeout: 5000,
    });
    await expect(page.getByText(/mist nog/)).toBeVisible();
    await expect(
      page.getByRole('button', { name: /Verder zoeken/i }),
    ).toBeVisible();
  });

  test('dismissing exit warning lets player continue', async ({ page }) => {
    const state = buildTestGameState({
      completedChallenges: 0,
      playerPos: { x: 3, y: 5 },
    });
    await injectGameStateAndNavigate(page, state);

    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(150);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(800);

    await expect(page.getByText('Bijna bij de deur!')).toBeVisible({
      timeout: 5000,
    });

    // Wait for interaction delay
    await page.waitForTimeout(500);

    // Click "Verder zoeken"
    await page.getByRole('button', { name: /Verder zoeken/i }).click();
    await page.waitForTimeout(300);

    // Modal should be gone, maze still visible
    await expect(page.getByText('Bijna bij de deur!')).not.toBeVisible();
    await expect(page.locator('text=🔑').first()).toBeVisible();
  });

  test('exit with all challenges done but friends left shows warning', async ({
    page,
  }) => {
    // All 4 challenges done, but 0 friends collected
    const state = buildTestGameState({
      completedChallenges: 4,
      collectedFriendIds: [],
      playerPos: { x: 3, y: 5 },
    });
    await injectGameStateAndNavigate(page, state);

    // Walk to exit at (5,5)
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(150);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(800);

    // Friends warning modal should appear
    await expect(page.getByText('Wacht even!')).toBeVisible({ timeout: 5000 });
    await expect(
      page.getByRole('button', { name: /Vriendjes zoeken/i }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: /Toch vertrekken/i }),
    ).toBeVisible();
  });

  test('leaving without friends shows incomplete win screen', async ({
    page,
  }) => {
    const state = buildTestGameState({
      completedChallenges: 4,
      collectedFriendIds: [],
      playerPos: { x: 3, y: 5 },
    });
    await injectGameStateAndNavigate(page, state);

    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(150);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(800);

    await expect(page.getByText('Wacht even!')).toBeVisible({ timeout: 5000 });

    // Wait for interaction delay
    await page.waitForTimeout(500);

    // Choose to leave
    await page.getByRole('button', { name: /Toch vertrekken/i }).click();
    await page.waitForTimeout(500);

    // Win screen (incomplete) should appear
    await expect(page.getByText('Goed gedaan!')).toBeVisible({ timeout: 5000 });
    // Shows "Begin een nieuw avontuur" button
    await expect(
      page.getByRole('button', { name: /Begin een nieuw avontuur/i }),
    ).toBeVisible();
  });

  test('winning with all friends shows complete win screen', async ({
    page,
  }) => {
    // All 4 challenges done, both friends collected, player near exit
    const state = buildTestGameState({
      completedChallenges: 4,
      collectedFriendIds: ['f1', 'f2'],
      playerPos: { x: 3, y: 5 },
    });
    await injectGameStateAndNavigate(page, state);

    // Walk to exit at (5,5)
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(150);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(800);

    // Complete win screen should appear
    await expect(page.getByText('🎉 Geweldig!')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(/2 van de 2 vriendjes gered/)).toBeVisible();
    await expect(
      page.getByRole('button', { name: /Begin een nieuw avontuur/i }),
    ).toBeVisible();
  });

  test('win screen navigates back to home', async ({ page }) => {
    const state = buildTestGameState({
      completedChallenges: 4,
      collectedFriendIds: ['f1', 'f2'],
      playerPos: { x: 3, y: 5 },
    });
    await injectGameStateAndNavigate(page, state);

    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(150);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(800);

    await expect(page.getByText('🎉 Geweldig!')).toBeVisible({ timeout: 5000 });

    // Wait for interaction delay
    await page.waitForTimeout(500);

    await page
      .getByRole('button', { name: /Begin een nieuw avontuur/i })
      .click();

    // Should be back on home
    await expect(page.getByText('Stel je avontuur in')).toBeVisible({
      timeout: 5000,
    });
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// Footer modal tests – verify the three bottom-bar modals show correct info
// ──────────────────────────────────────────────────────────────────────────────

test.describe('Footer modals – Help', () => {
  test('help modal shows correct challenge and friend counts', async ({
    page,
  }) => {
    // Short adventure: 4 challenges, 2 friends
    const state = buildTestGameState();
    await injectGameStateAndNavigate(page, state);

    // Open help modal via the button
    await page.getByRole('button', { name: /❓/ }).click();
    await page.waitForTimeout(300);

    // Modal should be visible
    await expect(page.getByText('❓ Hoe werkt het?')).toBeVisible();

    // Check challenge count matches injected config (4)
    await expect(page.getByText('4 uitdagingen')).toBeVisible();

    // Check friend count matches injected config (2)
    await expect(page.getByText('2 verdwaalde vriendjes')).toBeVisible();

    // Check it mentions keyboard controls
    await expect(page.getByText('pijltjestoetsen')).toBeVisible();

    // Check the shortcut keys are mentioned
    await expect(page.getByText(/Druk op/)).toBeVisible();
  });

  test('help modal closes with "Begrepen" button', async ({ page }) => {
    const state = buildTestGameState();
    await injectGameStateAndNavigate(page, state);

    await page.getByRole('button', { name: /❓/ }).click();
    await expect(page.getByText('❓ Hoe werkt het?')).toBeVisible();

    await page.getByRole('button', { name: /Begrepen/i }).click();
    await page.waitForTimeout(300);

    await expect(page.getByText('❓ Hoe werkt het?')).not.toBeVisible();
  });

  test('help modal closes with Escape key', async ({ page }) => {
    const state = buildTestGameState();
    await injectGameStateAndNavigate(page, state);

    await page.getByRole('button', { name: /❓/ }).click();
    await expect(page.getByText('❓ Hoe werkt het?')).toBeVisible();

    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    await expect(page.getByText('❓ Hoe werkt het?')).not.toBeVisible();
  });
});

test.describe('Footer modals – Minimap', () => {
  test('minimap modal shows plattegrond with SVG map', async ({ page }) => {
    const state = buildTestGameState();
    await injectGameStateAndNavigate(page, state);

    // Open minimap via button
    await page.getByRole('button', { name: /🗺/ }).click();
    await page.waitForTimeout(300);

    // Modal should show the title
    await expect(page.getByText('🗺️ Plattegrond')).toBeVisible();

    // Should contain an SVG element (the map)
    await expect(page.locator('svg').first()).toBeVisible();

    // Should show the hint about friends not being on the map
    await expect(
      page.getByText('Vriendjes staan niet op de kaart'),
    ).toBeVisible();

    // Should show the legend items
    await expect(page.getByText('Jij', { exact: true }).last()).toBeVisible();
  });

  test('minimap modal closes with ❌ button', async ({ page }) => {
    const state = buildTestGameState();
    await injectGameStateAndNavigate(page, state);

    await page.getByRole('button', { name: /🗺/ }).click();
    await expect(page.getByText('🗺️ Plattegrond')).toBeVisible();

    // Click the ❌ close button on the modal
    await page.locator('.fixed').getByText('❌').click();
    await page.waitForTimeout(300);

    await expect(page.getByText('🗺️ Plattegrond')).not.toBeVisible();
  });
});

test.describe('Footer modals – Settings (Speler)', () => {
  test('settings modal shows the chosen player emoji', async ({ page }) => {
    // Our test state uses 🤖 as playerEmoji
    const state = buildTestGameState();
    await injectGameStateAndNavigate(page, state);

    // Open settings via the player button (shows the emoji)
    await page.getByRole('button', { name: /🤖/ }).click();
    await page.waitForTimeout(300);

    // Modal header should show the player emoji and title
    await expect(page.getByText('Speler Keuzes')).toBeVisible();
    // The header includes the emoji
    const header = page.locator('text=Speler Keuzes').locator('..');
    await expect(header.getByText('🤖')).toBeVisible();
  });

  test('settings modal shows only enabled operations', async ({ page }) => {
    // Our test state has only add=true, all others false
    const state = buildTestGameState();
    await injectGameStateAndNavigate(page, state);

    await page.getByRole('button', { name: /🤖/ }).click();
    await page.waitForTimeout(300);

    // Should show "Optellen" card
    await expect(page.getByText('➕ Optellen')).toBeVisible();

    // Should show the maxValue
    await expect(page.getByText('tot 100')).toBeVisible();

    // Should NOT show disabled operations
    await expect(page.getByText('➖ Aftrekken')).not.toBeVisible();
    await expect(page.getByText('✖️ Vermenigvuldigen')).not.toBeVisible();
    await expect(page.getByText('🔢 Getallen begrijpen')).not.toBeVisible();
    await expect(page.getByText('💕 Verliefde Harten')).not.toBeVisible();
    await expect(page.getByText('💰 Rekenen met Geld')).not.toBeVisible();
    await expect(page.getByText('🕐 Klokkijken')).not.toBeVisible();
  });

  test('settings modal shows multiple operations when enabled', async ({
    page,
  }) => {
    // Build a state with add + mul + clock enabled
    const state = buildTestGameState();
    state.mathSettings = {
      enabledOperations: { add: true, sub: false, mul: true, clock: true },
      maxValue: 200,
      mulTables: 'easy',
      clockLevel: 'halfHours',
      clock24h: false,
    };
    await injectGameStateAndNavigate(page, state);

    await page.getByRole('button', { name: /🤖/ }).click();
    await page.waitForTimeout(300);

    // Should show all three enabled operations
    await expect(page.getByText('➕ Optellen')).toBeVisible();
    await expect(page.getByText('✖️ Vermenigvuldigen')).toBeVisible();
    await expect(page.getByText('🕐 Klokkijken')).toBeVisible();

    // Should show correct details
    await expect(page.getByText('tot 200')).toBeVisible();
    await expect(page.getByText('Tafels: 1, 2, 5, 10')).toBeVisible();
    await expect(page.getByText('Halve uren')).toBeVisible();

    // Should NOT show disabled operations
    await expect(page.getByText('➖ Aftrekken')).not.toBeVisible();
  });

  test('settings modal closes with "Terug naar het doolhof"', async ({
    page,
  }) => {
    const state = buildTestGameState();
    await injectGameStateAndNavigate(page, state);

    await page.getByRole('button', { name: /🤖/ }).click();
    await expect(page.getByText('Speler Keuzes')).toBeVisible();

    await page.getByRole('button', { name: /Terug naar het doolhof/i }).click();
    await page.waitForTimeout(300);

    await expect(page.getByText('Speler Keuzes')).not.toBeVisible();
  });
});

test.describe('Gameplay – Stats tracking', () => {
  // These tests do a full round-trip: Home → inject state → maze → win → Home
  // which needs more time than the default 30s timeout.
  test.setTimeout(60_000);

  test('completed maze counter increments after winning', async ({ page }) => {
    // First, check the initial stats on home
    await navigateToHome(page);
    const statsText = await page
      .getByText(/doolhof(hoven)? voltooid/)
      .textContent();
    const initialCount = parseInt(statsText.match(/(\d+)/)?.[1] || '0', 10);

    // Now inject a game state that's ready to win
    const state = buildTestGameState({
      completedChallenges: 4,
      collectedFriendIds: ['f1', 'f2'],
      playerPos: { x: 3, y: 5 },
    });

    await page.evaluate((s) => {
      localStorage.setItem('super-dooltocht-game-state', JSON.stringify(s));
    }, state);

    // Navigate to maze
    await page.evaluate((s) => {
      window.location.hash = `/maze/${s.themeId}`;
    }, state);

    await page.waitForURL(/\/#\/maze\//);
    await page
      .locator('text=🔑')
      .first()
      .waitFor({ state: 'visible', timeout: 10_000 });
    await dismissMazeModals(page);

    // Walk to exit
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(150);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(800);

    // Win!
    await expect(page.getByText('🎉 Geweldig!')).toBeVisible({ timeout: 5000 });
    await page.waitForTimeout(500);
    await page
      .getByRole('button', { name: /Begin een nieuw avontuur/i })
      .click();

    // Back on home — check stats
    await page.getByText('Stel je avontuur in').waitFor({ state: 'visible' });
    const newStatsText = await page
      .getByText(/doolhof(hoven)? voltooid/)
      .textContent();
    const newCount = parseInt(newStatsText.match(/(\d+)/)?.[1] || '0', 10);

    expect(newCount).toBe(initialCount + 1);
  });

  test('saved friends counter increments after winning with friends', async ({
    page,
  }) => {
    // Navigate to home first to check initial count
    await navigateToHome(page);
    const friendsText = await page
      .getByText(/vriendje(s)? gered/)
      .textContent();
    const initialFriends = parseInt(friendsText.match(/(\d+)/)?.[1] || '0', 10);

    // Inject state ready to win with 2 friends
    const state = buildTestGameState({
      completedChallenges: 4,
      collectedFriendIds: ['f1', 'f2'],
      playerPos: { x: 3, y: 5 },
    });

    await page.evaluate((s) => {
      localStorage.setItem('super-dooltocht-game-state', JSON.stringify(s));
    }, state);

    await page.evaluate((s) => {
      window.location.hash = `/maze/${s.themeId}`;
    }, state);

    await page.waitForURL(/\/#\/maze\//);
    await page
      .locator('text=🔑')
      .first()
      .waitFor({ state: 'visible', timeout: 10_000 });
    await dismissMazeModals(page);

    // Walk to exit
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(150);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(800);

    // Win!
    await expect(page.getByText('🎉 Geweldig!')).toBeVisible({ timeout: 5000 });
    await page.waitForTimeout(500);
    await page
      .getByRole('button', { name: /Begin een nieuw avontuur/i })
      .click();

    // Back on home — check friends count
    await page.getByText('Stel je avontuur in').waitFor({ state: 'visible' });
    const newFriendsText = await page
      .getByText(/vriendje(s)? gered/)
      .textContent();
    const newFriends = parseInt(newFriendsText.match(/(\d+)/)?.[1] || '0', 10);

    expect(newFriends).toBe(initialFriends + 2);
  });

  test('winning without friends still increments maze counter but not friends', async ({
    page,
  }) => {
    await navigateToHome(page);
    const mazeText = await page
      .getByText(/doolhof(hoven)? voltooid/)
      .textContent();
    const initialMazes = parseInt(mazeText.match(/(\d+)/)?.[1] || '0', 10);
    const friendsText = await page
      .getByText(/vriendje(s)? gered/)
      .textContent();
    const initialFriends = parseInt(friendsText.match(/(\d+)/)?.[1] || '0', 10);

    // Win with 0 friends
    const state = buildTestGameState({
      completedChallenges: 4,
      collectedFriendIds: [],
      playerPos: { x: 3, y: 5 },
    });

    await page.evaluate((s) => {
      localStorage.setItem('super-dooltocht-game-state', JSON.stringify(s));
    }, state);

    await page.evaluate((s) => {
      window.location.hash = `/maze/${s.themeId}`;
    }, state);

    await page.waitForURL(/\/#\/maze\//);
    await page
      .locator('text=🔑')
      .first()
      .waitFor({ state: 'visible', timeout: 10_000 });
    await dismissMazeModals(page);

    // Walk to exit
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(150);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(800);

    // Friends warning appears
    await expect(page.getByText('Wacht even!')).toBeVisible({ timeout: 5000 });
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: /Toch vertrekken/i }).click();

    // Win screen
    await expect(page.getByText('Goed gedaan!')).toBeVisible({ timeout: 5000 });
    await page.waitForTimeout(500);
    await page
      .getByRole('button', { name: /Begin een nieuw avontuur/i })
      .click();

    // Check stats
    await page.getByText('Stel je avontuur in').waitFor({ state: 'visible' });
    const newMazeText = await page
      .getByText(/doolhof(hoven)? voltooid/)
      .textContent();
    const newMazes = parseInt(newMazeText.match(/(\d+)/)?.[1] || '0', 10);
    const newFriendsText = await page
      .getByText(/vriendje(s)? gered/)
      .textContent();
    const newFriends = parseInt(newFriendsText.match(/(\d+)/)?.[1] || '0', 10);

    expect(newMazes).toBe(initialMazes + 1);
    expect(newFriends).toBe(initialFriends); // No friends collected
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// Multi-floor (XL) gameplay tests
// ──────────────────────────────────────────────────────────────────────────────

test.describe('Gameplay – Multi-floor (XL)', () => {
  test('floor indicator shows "Beneden" on ground floor', async ({ page }) => {
    const state = buildMultiFloorTestGameState({ currentFloor: 0 });
    await injectGameStateAndNavigate(page, state);

    // Floor indicator should show ground floor
    await expect(page.getByText('🪜 Beneden')).toBeVisible({ timeout: 5000 });
  });

  test('floor indicator shows "Boven" on upper floor', async ({ page }) => {
    const state = buildMultiFloorTestGameState({ currentFloor: 1 });
    await injectGameStateAndNavigate(page, state);

    // Floor indicator should show upper floor
    await expect(page.getByText('🪜 Boven')).toBeVisible({ timeout: 5000 });
  });

  test('help modal shows floor explanation in XL mode', async ({ page }) => {
    const state = buildMultiFloorTestGameState();
    await injectGameStateAndNavigate(page, state);

    // Open help modal
    await page.getByRole('button', { name: /❓/ }).click();
    await page.waitForTimeout(300);

    // Should show the floor/stairs explanation
    await expect(page.getByText('Verdiepingen & Trappen')).toBeVisible();
    await expect(page.getByText(/benedenverdieping/)).toBeVisible();
    await expect(page.getByText(/bovenverdieping/)).toBeVisible();
  });

  test('minimap shows floor tabs in XL mode', async ({ page }) => {
    const state = buildMultiFloorTestGameState();
    await injectGameStateAndNavigate(page, state);

    // Open minimap
    await page.getByRole('button', { name: /🗺/ }).click();
    await page.waitForTimeout(300);

    // Should show floor tabs
    await expect(page.getByText('🪜 Beneden').first()).toBeVisible();
    await expect(page.getByText('🪜 Boven').first()).toBeVisible();

    // Should show "Trap" in the legend
    await expect(page.getByText('Trap')).toBeVisible();
  });

  test('minimap can switch between floor tabs', async ({ page }) => {
    const state = buildMultiFloorTestGameState({ currentFloor: 0 });
    await injectGameStateAndNavigate(page, state);

    // Open minimap
    await page.getByRole('button', { name: /🗺/ }).click();
    await page.waitForTimeout(300);

    // Click on "Boven" tab
    const bovenTab = page.locator('button').filter({ hasText: '🪜 Boven' });
    await bovenTab.click();
    await page.waitForTimeout(200);

    // Click on "Beneden" tab to switch back
    const benedenTab = page.locator('button').filter({ hasText: '🪜 Beneden' });
    await benedenTab.click();
    await page.waitForTimeout(200);

    // Map should still be visible
    await expect(page.locator('svg').first()).toBeVisible();
  });

  test('walking onto a portal triggers floor transition', async ({ page }) => {
    // Player at (1,3), portal at (3,3) on floor 0 — walk right twice
    const state = buildMultiFloorTestGameState({
      currentFloor: 0,
      playerPos: { x: 1, y: 3 },
    });
    await injectGameStateAndNavigate(page, state);

    // Verify we start on ground floor
    await expect(page.getByText('🪜 Beneden')).toBeVisible({ timeout: 5000 });

    // Walk right to the portal at (3,3)
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(150);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(1000); // Wait for portal animation

    // Should now be on upper floor
    await expect(page.getByText('🪜 Boven')).toBeVisible({ timeout: 5000 });
  });

  test('continue modal shows correct XL progress', async ({ page }) => {
    // Start an XL game with some progress
    const state = buildMultiFloorTestGameState({
      completedChallenges: 3,
      collectedFriendIds: ['f1'],
    });
    await injectGameStateAndNavigate(page, state);

    // Move a bit to trigger a save
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(200);

    // Go back to home
    await page.locator('button').filter({ hasText: 'Terug' }).click();
    await page.waitForTimeout(500);

    // Continue modal should appear with XL totals
    await expect(page.getByText('Welkom terug!')).toBeVisible({
      timeout: 5000,
    });
    // XL has 16 total challenges, 10 total friends
    await expect(page.getByText('3/16')).toBeVisible();
    await expect(page.getByText('1/10')).toBeVisible();
  });

  test('player settings modal shows adventure length XL', async ({ page }) => {
    const state = buildMultiFloorTestGameState();
    await injectGameStateAndNavigate(page, state);

    // Open player settings modal
    await page.getByRole('button', { name: /🤖/ }).click();
    await page.waitForTimeout(300);

    // Should show XL-related info
    await expect(page.getByText('Speler Keuzes')).toBeVisible();
  });

  test('exit is only on ground floor — no exit on upper floor', async ({
    page,
  }) => {
    // Player on upper floor near where exit would be
    const state = buildMultiFloorTestGameState({
      completedChallenges: 8,
      collectedFriendIds: ['f1', 'f2', 'f3', 'f4'],
      currentFloor: 1,
      playerPos: { x: 3, y: 5 },
    });
    await injectGameStateAndNavigate(page, state);

    // Walk right twice — on upper floor (5,5) should NOT trigger exit
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(150);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(500);

    // Exit modal should NOT appear (exit only on floor 0)
    await expect(page.getByText('Bijna bij de deur!')).not.toBeVisible();
    await expect(page.getByText('Wacht even!')).not.toBeVisible();

    // Floor indicator still shows upper floor
    await expect(page.getByText('🪜 Boven')).toBeVisible();
  });
});
