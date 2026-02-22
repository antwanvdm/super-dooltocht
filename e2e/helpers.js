/**
 * Shared E2E test helpers for Super Dooltocht.
 *
 * The app starts with a CodeFlowManager that blocks the Home screen until the
 * player's code is validated against the server. For E2E tests we mock all API
 * endpoints and click through the code entry screen automatically.
 */

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

  // Select exercise category tab
  if (category !== 'rekenen') {
    const tabLabels = { tijd: 'Tijd', taal: 'Taal' };
    await page.getByRole('button', { name: tabLabels[category] }).click();
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
  };
  const opLabel = operationLabels[operation];
  if (opLabel) {
    // Only click if not already enabled (e.g. clock is ON by default for Tijd)
    const label = page.locator('label').filter({ hasText: opLabel }).first();
    const isAlreadyActive = await label.evaluate(
      (el) =>
        el.classList.contains('bg-blue-500') ||
        el.classList.contains('bg-sky-500') ||
        el.classList.contains('bg-rose-500'),
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
  await page.locator('section button').filter({ hasText: themeName }).click();

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
export async function injectGameStateAndNavigate(page, gameState) {
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
