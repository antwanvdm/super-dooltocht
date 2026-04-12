/**
 * Shared E2E test helpers for Super Dooltocht.
 *
 * The app starts with a CodeFlowManager that blocks the Home screen until the
 * player's code is validated against the server. For E2E tests we mock all API
 * endpoints and click through the code entry screen automatically.
 */

import { expect } from '@playwright/test';

// ─── Mock data ────────────────────────────────────────────────────────────────

/** Minimal emoji categories that satisfy the CodeInputModal */
export const MOCK_EMOJI_CATEGORIES = {
  categories: [
    [
      { emoji: '🐶', slug: 'dog' },
      { emoji: '🐱', slug: 'cat' },
      { emoji: '🐰', slug: 'rabbit' },
    ],
    [
      { emoji: '🍎', slug: 'apple' },
      { emoji: '🍌', slug: 'banana' },
      { emoji: '🍇', slug: 'grape' },
    ],
    [
      { emoji: '⚽', slug: 'soccer' },
      { emoji: '🏀', slug: 'basketball' },
      { emoji: '🎾', slug: 'tennis' },
    ],
    [
      { emoji: '🌞', slug: 'sun' },
      { emoji: '🌧️', slug: 'rain' },
      { emoji: '❄️', slug: 'snow' },
    ],
  ],
  labels: ['Dieren', 'Eten', 'Sport', 'Weer'],
};

export const MOCK_PLAYER_CODE = ['dog', 'apple', 'soccer', 'sun'];

// ─── API mocking ──────────────────────────────────────────────────────────────

/**
 * Intercept all API calls made by the app and return mock responses.
 */
export async function mockAllApiCalls(page) {
  const API = 'http://localhost:3001';

  // GET /api/emoji-categories
  await page.route(`${API}/api/emoji-categories`, (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(MOCK_EMOJI_CATEGORIES),
    }),
  );

  // POST /api/players/validate — always succeed
  await page.route(`${API}/api/players/validate`, (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        code: MOCK_PLAYER_CODE,
        progress: {},
      }),
    }),
  );

  // POST /api/players — create new adventure
  await page.route(`${API}/api/players`, (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ code: MOCK_PLAYER_CODE }),
    }),
  );

  // POST /api/players/:code/progress — sync (always succeed)
  await page.route(`${API}/api/players/*/progress`, (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true }),
    }),
  );
}

// ─── CodeFlowManager bypass ──────────────────────────────────────────────────

/**
 * Navigate to the app and click through the CodeFlowManager so we land on the
 * Home screen.
 */
export async function navigateToHome(page) {
  await mockAllApiCalls(page);

  // Clear all localStorage so we always start fresh (no stale player code)
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.goto('/');

  // The welcome screen should be visible
  await page
    .getByText('Welkom bij Super Dooltocht!')
    .waitFor({ state: 'visible' });

  // Click "Start nieuw avontuur"
  await page.getByRole('button', { name: /Start nieuw avontuur/i }).click();

  // Now on "Nieuw avontuur" screen → click "Maak mijn code!"
  await page.getByRole('button', { name: /Maak mijn code/i }).click();

  // The CodeDisplayModal appears showing the code → confirm it
  await page.getByRole('button', { name: /Ik heb ze onthouden/i }).click();

  // Wait for the Home screen to appear
  await page.getByText('Super Dooltocht!').waitFor({ state: 'visible' });
  await page.getByText('Stel je avontuur in').waitFor({ state: 'visible' });
}

/**
 * Dismiss any modal overlays that appear in the maze (story intro, onboarding).
 * Presses Escape and waits briefly for the overlay to disappear.
 */
export async function dismissMazeModals(page) {
  await page.waitForTimeout(600);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);
  // Sometimes there's a second modal (onboarding hint) — press again
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
}

/**
 * Shorthand: navigate to Home and select a theme + exercise category,
 * then click start. Navigates to the MazeGame route.
 *
 * After this function returns, the maze is loaded and any story intro
 * has been dismissed, so the maze is ready for interaction.
 */
export async function startAdventure(
  page,
  {
    category = 'rekenen',
    operation = 'add',
    theme = 'space',
    length = 'short',
  } = {},
) {
  await navigateToHome(page);

  // Select exercise category tab (scoped to the tab grid to avoid theme name collisions)
  if (category !== 'rekenen') {
    const tabLabels = {
      tijd: '⏰ Tijd',
      taal: '📝 Taal',
      puzzels: '🧠 Puzzels',
      meetkunde: '📐 Meten',
      digitaal: '💻 Digitaal',
      topografie: '🗺️ Topo',
      verkeer: '🚲 Verkeer',
    };
    const tabGrid = page.getByTestId('category-tabs');
    await tabGrid
      .getByRole('button', { name: tabLabels[category], exact: true })
      .click();
  }

  // Enable the operation — use the checkbox label
  const operationLabels = {
    // rekenen
    add: 'Plussommen',
    sub: 'Minsommen',
    mul: 'Keersommen',
    div: 'Deelsommen',
    placeValue: 'Getallen begrijpen',
    lovingHearts: 'Verliefde harten',
    money: 'Rekenen met geld',
    // tijd
    clock: 'Klokkijken',
    timeAwareness: 'Tijdsbesef',
    timeCalculation: 'Rekenen met tijd',
    // taal
    spelling: 'Spelling',
    vocabulary: 'Woordenschat',
    reading: 'Begrijpend lezen',
    english: 'Engels',
    // puzzels
    sudoku: 'Sudoku',
    tectonic: 'Tectonic',
    binary: 'Binair',
    chess: 'Schaken',
    // meetkunde
    vormen: 'Vormen',
    symmetrie: 'Symmetrie',
    omtrekOppervlakte: 'Omtrek & oppervlakte',
    eenheden: 'Eenheden omrekenen',
    // digitaal
    computerkennis: 'Computerkennis',
    veiligheid: 'Online veiligheid',
    mediawijsheid: 'Mediawijsheid',
    // topografie
    windrichtingen: 'Windrichtingen',
    nederland: 'Nederland',
    europa: 'Europa',
    wereld: 'De wereld',
    // verkeer
    borden: 'Verkeersborden',
    regels: 'Verkeersregels',
  };
  const opLabel = operationLabels[operation];
  if (opLabel) {
    // Only click if not already enabled (e.g. clock is ON by default for Tijd)
    const label = page.locator('label').filter({ hasText: opLabel }).first();
    const isAlreadyActive = await label.evaluate(
      (el) =>
        el.classList.contains('bg-blue-500') ||
        el.classList.contains('bg-sky-500') ||
        el.classList.contains('bg-rose-500') ||
        el.classList.contains('bg-violet-500') ||
        el.classList.contains('bg-teal-500') ||
        el.classList.contains('bg-slate-600') ||
        el.classList.contains('bg-amber-500'),
    );
    if (!isAlreadyActive) {
      await label.click();
    }
  }

  // Select adventure length — use the label that has both the name and description
  const lengthSelectors = {
    short: 'Red 2 vriendjes',
    medium: 'Red 4 vriendjes',
    long: 'Red 6 vriendjes',
    xl: 'Red 10 vriendjes',
  };
  await page
    .locator('label')
    .filter({ hasText: lengthSelectors[length] })
    .click();

  // Select theme world — only click the theme grid button (inside the section)
  const themeNames = {
    space: 'Ruimte',
    ocean: 'Oceaan',
    jungle: 'Jungle',
    castle: 'Kasteel',
    pirates: 'Piraten',
    dino: 'Dinosaurus',
    candy: 'Snoep',
    farm: 'Boerderij',
    sports: 'Sport',
    music: 'Muziek',
    food: 'Eten',
    traffic: 'Verkeer',
  };
  const themeName = themeNames[theme] || theme;
  await page
    .getByTestId('theme-selector')
    .getByRole('button', { name: themeName })
    .click();

  // Click start
  await page.getByRole('button', { name: /Start avontuur/i }).click();

  // Wait for the maze to render
  await page.waitForURL(/\/#\/maze\//);

  // Dismiss any story intro / onboarding modals
  await dismissMazeModals(page);
}

/**
 * Get the maze header element that shows the theme name.
 * The header is in the top bar: "{emoji} {emoji} {name}"
 */
export function getMazeHeader(page) {
  return page.locator('header, .w-full').locator('h2').first();
}

// ─── Game state injection ─────────────────────────────────────────────────────

/**
 * Build a minimal but valid game state for a "short" adventure (size 31×31,
 * 4 challenges, 2 friends). The maze is a tiny hand-crafted grid where the
 * player, challenges, friends and exit are at known deterministic positions
 * on a straight path so tests don't need pathfinding.
 *
 * Layout (5×5 inner, 7×7 total with walls):
 *
 *   0 1 2 3 4 5 6
 * 0 # # # # # # #
 * 1 # P . C . F #    P=player(1,1) C=challenge(3,1) F=friend(5,1)
 * 2 # . # . # . #
 * 3 # C . . . C #    C=challenge(1,3) C=challenge(5,3)
 * 4 # . # . # . #
 * 5 # F . C . E #    F=friend(1,5) C=challenge(3,5) E=exit(5,5)
 * 6 # # # # # # #
 *
 * All odd-row/odd-col cells are paths, all even positions are walls (except
 * carved corridors between odd cells).
 */
export function buildTestGameState({
  completedChallenges = 0,
  collectedFriendIds = [],
  playerPos = { x: 1, y: 1 },
} = {}) {
  const SIZE = 7;
  // Build a tiny maze grid
  const maze = Array.from({ length: SIZE }, (_, y) =>
    Array.from({ length: SIZE }, (_, x) => {
      // Odd-odd = path cell
      const isPath = x % 2 === 1 && y % 2 === 1;
      // Corridors between path cells (even cells that connect two odd neighbours)
      const isHorizontalCorridor =
        y % 2 === 1 && x % 2 === 0 && x > 0 && x < SIZE - 1;
      const isVerticalCorridor =
        x % 2 === 1 && y % 2 === 0 && y > 0 && y < SIZE - 1;
      return {
        wall: !(isPath || isHorizontalCorridor || isVerticalCorridor),
        visited: true,
      };
    }),
  );

  // 4 challenges spread across the grid
  const allChallenges = [
    { id: 'c1', x: 3, y: 1, completed: false },
    { id: 'c2', x: 1, y: 3, completed: false },
    { id: 'c3', x: 5, y: 3, completed: false },
    { id: 'c4', x: 3, y: 5, completed: false },
  ].map((c, i) => ({
    ...c,
    completed: i < completedChallenges,
  }));

  // 2 friends
  const allFriendlies = [
    {
      id: 'f1',
      x: 5,
      y: 1,
      emoji: '🛸',
      collected: false,
      spoken: false,
      message: 'Hoera, je hebt me gevonden!',
    },
    {
      id: 'f2',
      x: 1,
      y: 5,
      emoji: '🌟',
      collected: false,
      spoken: false,
      message: 'Eindelijk! Dankjewel!',
    },
  ].map((f) => ({
    ...f,
    collected: collectedFriendIds.includes(f.id),
    spoken: collectedFriendIds.includes(f.id),
  }));

  const collectedFriends = allFriendlies
    .filter((f) => f.collected)
    .map((f) => ({ id: f.id, emoji: f.emoji }));

  return {
    themeId: 'space',
    maze,
    challenges: allChallenges,
    friendlies: allFriendlies,
    collectedFriends,
    playerPos,
    completedCount: completedChallenges,
    mathSettings: {
      enabledOperations: {
        add: true,
        sub: false,
        mul: false,
        placeValue: false,
        lovingHearts: false,
        money: false,
      },
      maxValue: 100,
      addSubMode: 'beyond',
      beyondDigits: 'units',
    },
    playerEmoji: '🤖',
    adventureLength: 'short',
  };
}

/**
 * Build a minimal but valid multi-floor game state for an "xl" adventure
 * (2 floors, 16 challenges, 10 friends). Uses the same 7×7 grid layout as
 * buildTestGameState, duplicated for each floor, with a single portal pair
 * connecting them.
 *
 * Floor 0 (ground / "Beneden"):
 *   Same as buildTestGameState but with portal at (3,3)
 *   Exit at (5,5), start at (1,1)
 *
 * Floor 1 (upper / "Boven"):
 *   Same layout, portal at (3,3), no exit, extra challenges
 *
 * Portal connects (3,3) on floor 0 ↔ (3,3) on floor 1.
 */
export function buildMultiFloorTestGameState({
  completedChallenges = 0,
  collectedFriendIds = [],
  playerPos = { x: 1, y: 1 },
  currentFloor = 0,
} = {}) {
  const SIZE = 7;

  // Build a floor grid (same layout for both floors)
  const buildFloor = () =>
    Array.from({ length: SIZE }, (_, y) =>
      Array.from({ length: SIZE }, (_, x) => {
        const isPath = x % 2 === 1 && y % 2 === 1;
        const isHorizontalCorridor =
          y % 2 === 1 && x % 2 === 0 && x > 0 && x < SIZE - 1;
        const isVerticalCorridor =
          x % 2 === 1 && y % 2 === 0 && y > 0 && y < SIZE - 1;
        return {
          wall: !(isPath || isHorizontalCorridor || isVerticalCorridor),
          visited: true,
        };
      }),
    );

  const floor0 = buildFloor();
  const floor1 = buildFloor();

  // Add portal property to the portal cell on each floor
  floor0[3][3].portal = { targetFloor: 1, targetX: 3, targetY: 3, id: 'p1' };
  floor1[3][3].portal = { targetFloor: 0, targetX: 3, targetY: 3, id: 'p1' };

  const floors = [floor0, floor1];
  const portals = [
    { id: 'p1', floor: 0, x: 3, y: 3, targetFloor: 1, targetX: 3, targetY: 3 },
    { id: 'p1', floor: 1, x: 3, y: 3, targetFloor: 0, targetX: 3, targetY: 3 },
  ];

  // 4 challenges per floor = 8 total (simplified for testing; real XL has 16)
  const allChallenges = [
    // Floor 0
    { id: 'c1', x: 3, y: 1, floor: 0, completed: false },
    { id: 'c2', x: 1, y: 3, floor: 0, completed: false },
    { id: 'c3', x: 5, y: 3, floor: 0, completed: false },
    { id: 'c4', x: 3, y: 5, floor: 0, completed: false },
    // Floor 1
    { id: 'c5', x: 3, y: 1, floor: 1, completed: false },
    { id: 'c6', x: 1, y: 3, floor: 1, completed: false },
    { id: 'c7', x: 5, y: 3, floor: 1, completed: false },
    { id: 'c8', x: 3, y: 5, floor: 1, completed: false },
  ].map((c, i) => ({
    ...c,
    completed: i < completedChallenges,
  }));

  // 2 friends per floor = 4 total (simplified)
  const allFriendlies = [
    // Floor 0
    {
      id: 'f1',
      x: 5,
      y: 1,
      floor: 0,
      emoji: '🛸',
      collected: false,
      spoken: false,
      message: 'Hoera!',
    },
    {
      id: 'f2',
      x: 1,
      y: 5,
      floor: 0,
      emoji: '🌟',
      collected: false,
      spoken: false,
      message: 'Dankjewel!',
    },
    // Floor 1
    {
      id: 'f3',
      x: 5,
      y: 1,
      floor: 1,
      emoji: '🎈',
      collected: false,
      spoken: false,
      message: 'Wow!',
    },
    {
      id: 'f4',
      x: 1,
      y: 5,
      floor: 1,
      emoji: '🧸',
      collected: false,
      spoken: false,
      message: 'Yes!',
    },
  ].map((f) => ({
    ...f,
    collected: collectedFriendIds.includes(f.id),
    spoken: collectedFriendIds.includes(f.id),
  }));

  const collectedFriends = allFriendlies
    .filter((f) => f.collected)
    .map((f) => ({ id: f.id, emoji: f.emoji }));

  return {
    themeId: 'space',
    maze: floors[currentFloor],
    floors,
    portals,
    currentFloor,
    challenges: allChallenges,
    friendlies: allFriendlies,
    collectedFriends,
    playerPos,
    completedCount: completedChallenges,
    mathSettings: {
      enabledOperations: {
        add: true,
        sub: false,
        mul: false,
        placeValue: false,
        lovingHearts: false,
        money: false,
      },
      maxValue: 100,
      addSubMode: 'beyond',
      beyondDigits: 'units',
    },
    playerEmoji: '🤖',
    adventureLength: 'xl',
  };
}

/**
 * Inject a pre-built game state into localStorage and navigate to the maze.
 * The MazeGame component will detect the saved state and restore it instead
 * of generating a new random maze.
 *
 * We also need to provide location.state (mathSettings, playerEmoji,
 * adventureLength) via React Router. The trick: we navigate to Home first
 * (which sets up the player code), inject gameState, then navigate to the
 * maze route. MazeGame checks location.state OR saved state, so we must
 * supply location.state. We do this by navigating via the Home screen
 * which sets it up, OR by injecting the saved state and visiting the URL
 * directly (MazeGame allows this when savedState exists for the themeId).
 */
export async function injectGameStateAndNavigate(
  page,
  gameState,
  { skipBoss = false } = {},
) {
  // First get through CodeFlowManager so the app is authenticated
  await mockAllApiCalls(page);
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.goto('/');

  // Click through welcome
  await page
    .getByText('Welkom bij Super Dooltocht!')
    .waitFor({ state: 'visible' });
  await page.getByRole('button', { name: /Start nieuw avontuur/i }).click();
  await page.getByRole('button', { name: /Maak mijn code/i }).click();
  await page.getByRole('button', { name: /Ik heb ze onthouden/i }).click();
  await page.getByText('Super Dooltocht!').waitFor({ state: 'visible' });

  // Set E2E boss skip flag before navigating to maze
  if (skipBoss) {
    await page.evaluate(() => {
      window.__E2E_SKIP_BOSS__ = true;
    });
  }

  // Now inject the game state into localStorage
  await page.evaluate((state) => {
    localStorage.setItem('super-dooltocht-game-state', JSON.stringify(state));
  }, gameState);

  // Navigate to the maze — MazeGame will load the saved state
  // We need location.state for the fallback check, so we navigate via the app
  await page.evaluate((state) => {
    // Use the HashRouter to navigate with state
    window.location.hash = `/maze/${state.themeId}`;
  }, gameState);

  // The maze should load from saved state
  await page.waitForURL(/\/#\/maze\//);

  // Wait for maze to render
  await page
    .locator('text=🔑')
    .first()
    .waitFor({ state: 'visible', timeout: 10_000 });

  // Dismiss any modals
  await dismissMazeModals(page);
}

// ─── Boss Battle & Friend helpers ─────────────────────────────────────────────

/**
 * Solve one round of a boss battle minigame.
 * Detects the game type and applies the appropriate strategy:
 * - MultipleChoice: brute-force click buttons until one is correct
 * - MathPuzzle: parse equations and fill in correct answers
 * - MemoryGame: flip cards to discover contents, then match pairs
 * - DartsGame: intentionally fail fast (target is hidden)
 *
 * @returns {Promise<boolean>} true if solved, false if failed
 */
async function solveOneBossRound(page) {
  // Wait for game content to render
  await page.waitForTimeout(800);

  // ── Strategy 1: MultipleChoice ──
  // 2x2 grid of answer buttons (grid-cols-2 with exactly 4 buttons)
  const mcButtons = page.locator('.grid.grid-cols-2 button');
  const mcCount = await mcButtons.count();
  if (mcCount >= 2) {
    for (let i = 0; i < mcCount; i++) {
      const btn = mcButtons.nth(i);
      if (await btn.isDisabled().catch(() => true)) continue;
      await btn.click();
      await page.waitForTimeout(500);
      const isGreen = await btn
        .evaluate(
          (el) =>
            el.classList.contains('bg-green-500') ||
            el.classList.contains('bg-green-600'),
        )
        .catch(() => false);
      if (isGreen) return true;
    }
    return false;
  }

  // ── Strategy 2: MathPuzzle ──
  // Has number inputs + "Controleer antwoorden" button
  const numberInputs = page.locator('input[type="number"]');
  const inputCount = await numberInputs.count();
  if (inputCount >= 2) {
    for (let i = 0; i < inputCount; i++) {
      const input = numberInputs.nth(i);
      // The row contains text like "23 + 45 =" — parse the equation
      const row = input.locator('..');
      const rowText = await row.textContent().catch(() => '');
      const answer = parseMathEquation(rowText);
      await input.fill(String(answer));
    }
    const checkBtn = page.getByRole('button', { name: /Controleer/i });
    if (await checkBtn.isVisible().catch(() => false)) {
      await checkBtn.click();
      await page.waitForTimeout(800);
    }
    return true;
  }

  // ── Strategy 3: MemoryGame ──
  // 4-column grid with 8 card buttons
  const memoryCards = page.locator('.grid.grid-cols-4 button');
  const memCount = await memoryCards.count();
  if (memCount >= 4) {
    return await solveMemoryGame(page, memoryCards, memCount);
  }

  // ── Strategy 4: DartsGame ──
  // SVG dartboard with clickable path segments. Target is hidden ("???"),
  // so we intentionally overshoot to fail fast and retry with a different game.
  const svgPaths = page.locator('svg path.cursor-pointer');
  const pathCount = await svgPaths.count();
  if (pathCount >= 2) {
    // Click the biggest value segments repeatedly to overshoot quickly
    for (let i = pathCount - 1; i >= 0 && i >= pathCount - 3; i--) {
      for (let c = 0; c < 5; c++) {
        await svgPaths
          .nth(i)
          .click()
          .catch(() => {});
        await page.waitForTimeout(100);
      }
    }
    return false;
  }

  return false;
}

/**
 * Parse a math equation row like "23 + 45 =" and return the answer.
 * Handles +, -, ×, ÷ operators.
 */
function parseMathEquation(text) {
  // Clean up: remove whitespace noise, checkmarks, etc
  const cleaned = text.replace(/[✅❌=]/g, '').trim();
  // Match patterns like "23 + 45" or "100 - 37" or "6 × 8" or "36 ÷ 6"
  const match = cleaned.match(/(\d+)\s*([+\-×÷xX*\/])\s*(\d+)/);
  if (!match) return 0;
  const a = parseInt(match[1], 10);
  const op = match[2];
  const b = parseInt(match[3], 10);
  switch (op) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '×':
    case 'x':
    case 'X':
    case '*':
      return a * b;
    case '÷':
    case '/':
      return b !== 0 ? Math.round(a / b) : 0;
    default:
      return a + b;
  }
}

/**
 * Solve a MemoryGame by flipping cards to discover contents, then matching pairs.
 * Cards show math questions ("23 + 5") or answers ("28"). Pairs share the same answer.
 */
async function solveMemoryGame(page, cards, count) {
  // Phase 1: Discover card contents by flipping pairs
  const cardContents = new Array(count).fill(null);

  // Flip cards in pairs of 2 to reveal their content
  for (let i = 0; i < count; i += 2) {
    const card1 = cards.nth(i);
    const card2 = cards.nth(i + 1);

    // Skip already matched cards (green)
    const c1Matched = await card1
      .evaluate((el) => el.classList.contains('bg-green-500'))
      .catch(() => false);
    const c2Matched = await card2
      .evaluate((el) => el.classList.contains('bg-green-500'))
      .catch(() => false);

    if (!c1Matched) {
      await card1.click().catch(() => {});
      await page.waitForTimeout(300);
      cardContents[i] = await card1.textContent().catch(() => '');
    }
    if (!c2Matched) {
      await card2.click().catch(() => {});
      await page.waitForTimeout(300);
      cardContents[i + 1] = await card2.textContent().catch(() => '');
    }

    // Wait for non-match flip back
    await page.waitForTimeout(1800);
  }

  // Phase 2: Match pairs using discovered contents
  // Each question card ("23 + 5") has an answer card ("28") with the same pairId
  // Evaluate the math in question cards to find their numeric answer
  const values = cardContents.map((text) => {
    if (!text) return null;
    const t = text.trim();
    // Try to parse as a simple number
    if (/^\d+$/.test(t)) return parseInt(t, 10);
    // Try to parse as math expression
    const match = t.match(/(\d+)\s*([+\-×÷xX*\/])\s*(\d+)/);
    if (match) {
      const a = parseInt(match[1], 10);
      const b = parseInt(match[3], 10);
      const op = match[2];
      switch (op) {
        case '+':
          return a + b;
        case '-':
          return a - b;
        case '×':
        case 'x':
        case 'X':
        case '*':
          return a * b;
        case '÷':
        case '/':
          return b !== 0 ? Math.round(a / b) : 0;
        default:
          return a + b;
      }
    }
    return null;
  });

  // Find pairs with matching values and click them
  const used = new Set();
  for (let i = 0; i < count; i++) {
    if (used.has(i) || values[i] === null) continue;
    // Already matched? Skip
    const iMatched = await cards
      .nth(i)
      .evaluate((el) => el.classList.contains('bg-green-500'))
      .catch(() => false);
    if (iMatched) {
      used.add(i);
      continue;
    }

    for (let j = i + 1; j < count; j++) {
      if (used.has(j) || values[j] === null) continue;
      const jMatched = await cards
        .nth(j)
        .evaluate((el) => el.classList.contains('bg-green-500'))
        .catch(() => false);
      if (jMatched) {
        used.add(j);
        continue;
      }

      if (values[i] === values[j]) {
        await cards
          .nth(i)
          .click()
          .catch(() => {});
        await page.waitForTimeout(400);
        await cards
          .nth(j)
          .click()
          .catch(() => {});
        await page.waitForTimeout(1800);
        used.add(i);
        used.add(j);
        break;
      }
    }
  }

  return true;
}

/**
 * Complete the boss battle that appears before winning.
 * Clicks "Aan de slag!", solves each round (MultipleChoice brute-force),
 * and waits for the victory screen to auto-dismiss.
 *
 * @param {import('@playwright/test').Page} page
 * @param {number} rounds - Number of rounds (2 for short/medium, 3 for long/xl)
 */
export async function solveBossBattle(page, rounds = 2) {
  // Wait for boss intro
  await expect(page.getByText('Baasgevecht!')).toBeVisible({ timeout: 5000 });
  await page.waitForTimeout(300);

  // Start the battle
  await page.getByRole('button', { name: /Aan de slag/i }).click();

  // Solve each round — boss retries on failure so we can be persistent
  for (let r = 0; r < rounds; r++) {
    // Wait for round content to appear
    await page.waitForTimeout(600);

    // Keep trying until either the next round starts or victory appears
    let solved = false;
    for (let attempt = 0; attempt < 15 && !solved; attempt++) {
      const success = await solveOneBossRound(page);
      await page.waitForTimeout(600);

      // Check if we've moved past this round
      const victoryVisible = await page
        .getByText('De bewaker is verslagen!')
        .isVisible()
        .catch(() => false);
      if (victoryVisible) {
        solved = true;
        break;
      }

      // Check if round counter advanced
      const roundText = await page
        .getByText(new RegExp(`Ronde ${r + 2} van`))
        .isVisible()
        .catch(() => false);
      if (roundText) {
        solved = true;
        break;
      }

      // If we failed, wait for the 3s taunt screen + new game to appear
      if (!success) {
        await page.waitForTimeout(4000);
      }
    }
  }

  // Wait for victory animation and auto-dismiss
  await page.waitForTimeout(4000);
}

/**
 * Collect a friend via the new FriendlyDialog flow:
 * greeting → click "Wil je wat leren?" → fact modal → click "Neem mee!".
 *
 * @param {import('@playwright/test').Page} page
 */
export async function collectFriendViaFact(page) {
  // Wait for greeting message
  await expect(
    page.getByText(/Hoera, je hebt me gevonden!|Eindelijk! Dankjewel!/),
  ).toBeVisible({ timeout: 5000 });
  await page.waitForTimeout(500);

  // Click "Wil je wat leren?" or the single fact button (puzzle mode shows different text)
  const learnButton = page.getByRole('button', {
    name: /Wil je wat leren|Wat wil je me vertellen/i,
  });
  await learnButton.click();
  await page.waitForTimeout(500);

  // Fact modal appears — click "Cool! 🤝 Neem mee!"
  const neemMeeButton = page.getByRole('button', {
    name: /Neem mee/i,
  });
  await expect(neemMeeButton).toBeVisible({ timeout: 5000 });
  await neemMeeButton.click();
  await page.waitForTimeout(500);
}
