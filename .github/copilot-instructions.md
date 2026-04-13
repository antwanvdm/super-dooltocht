# Super Dooltocht - Copilot Instructions

## Project Overview

**Super Dooltocht** (Super Maze Adventure) is an educational math, clock and language game for elementary school children. Players navigate through themed mazes, solve challenges, and rescue friends along the way. This is a hobby project created as an ad-free, privacy-respecting alternative to existing educational games.

## Tech Stack

- **Framework:** React 19 with Vite 7
- **Styling:** Tailwind CSS v4 (using `@tailwindcss/vite` plugin)
- **Routing:** React Router v7 (HashRouter)
- **Language:** JavaScript (JSX)
- **Build Tool:** Vite with ESLint
- **Unit Tests:** Vitest 4 (~508 tests)
- **E2E Tests:** Playwright (~89 tests)
- **Backend:** Express 5 + Mongoose 9 (MongoDB)

## Project Structure

```
src/
├── components/
│   ├── maze/           # Core maze game components
│   │   ├── MazeGame.jsx    # Main game controller
│   │   ├── MazeView.jsx    # Maze rendering & player movement
│   │   ├── DPad.jsx        # Touch controls overlay
│   │   └── Minimap.jsx     # Overview minimap
│   ├── minigames/      # Educational challenges
│   │   ├── ChallengeModal.jsx  # Modal wrapper for challenges
│   │   ├── MathPuzzle.jsx      # Fill-in-the-blank math worksheet
│   │   ├── MultipleChoice.jsx  # Multiple choice questions
│   │   ├── MemoryGame.jsx      # Memory matching game
│   │   ├── DartsGame.jsx       # Darts-style number addition
│   │   ├── Clock*.jsx          # Clock reading minigames
│   │   ├── Kalender*.jsx       # Time awareness minigames
│   │   ├── Spelling*.jsx       # Spelling minigames
│   │   ├── Vocabulary*.jsx     # Vocabulary minigames
│   │   ├── Reading*.jsx        # Reading comprehension minigames
│   │   ├── *Money*.jsx / *Pay*.jsx / *Change*.jsx  # Money minigames
│   │   └── ...                 # Other minigames
│   ├── CodeFlowManager.jsx  # Player code auth flow
│   ├── Home.jsx        # Home screen with settings tabs
│   └── Confetti.jsx    # Victory celebration animation
├── hooks/              # Custom React hooks
├── utils/
│   ├── difficultyAdapter.js     # Math problem generation
│   ├── gameSelection.js         # Minigame type selection (round-robin)
│   ├── languageAdapter.js       # Language problem generation
│   ├── languageData.js          # Spelling, vocabulary & reading data
│   ├── timeAwarenessData.js     # Calendar/season quiz generation
│   ├── timeCalculationData.js   # Time calculation problem generation
│   ├── localStorage.js          # Game state persistence (safeGet/safeSet/safeRemove)
│   ├── mazeGenerator.js         # Procedural maze generation
│   ├── serverSync.js            # Server sync utilities
│   ├── themes.js                # Visual themes configuration
│   └── __tests__/               # Unit tests (Vitest)
└── assets/             # Static assets
e2e/
├── helpers.js            # Shared E2E utilities & fixtures
├── settings.spec.js      # Home screen & settings tests
├── play-adventure.spec.js # Adventure start & minigame tests
├── gameplay.spec.js      # In-game mechanics & modal tests
└── error-scenarios.spec.js # Error handling & edge cases
server/
├── index.js            # Express API server
├── cleanup.js          # Stale player cleanup script
└── package.json
```

## Key Features

### Exercise Categories

- **Rekenen (Math):** Addition, subtraction, multiplication, division, place value, loving hearts, money, fractions
- **Klokkijken (Clock Reading):** Analog/digital clocks, words mode, 24h notation
- **Tijdsbesef (Time Awareness):** Days, months, seasons
- **Rekenen met Tijd (Time Calculation):** Duration, forward/backward time
- **Taal (Language):** Spelling rules (incl. verkleinwoord & meervoud), rijmen, woordsoorten, vocabulary, reading comprehension, English
- **Puzzels (Puzzles):** Sudoku, tectonic, binary, chess
- **Meetkunde (Geometry):** Shapes (vormen), symmetry, perimeter & area, unit conversion
- **Digitaal (Digital Literacy):** Computer knowledge, online safety, media literacy
- **Topografie (Geography):** Netherlands, Europe, World — quiz, memory, interactive map
- **Verkeer (Traffic Safety):** Traffic signs, traffic rules

### Game Modes

- **Adventure lengths:** Short (2 friends + 4 challenges), Medium (4 friends + 7 challenges), Long (6 friends + 10 challenges), XL (10 friends + 16 challenges, 2 floors)
- **Boss battle:** Final challenge before the exit — solve 3 rapid-fire minigames in a row
- **Themed worlds:** 12 visual themes (space, ocean, jungle, castle, etc.)
- **Player customization:** Emoji-based character selection

## Coding Guidelines

### React Patterns

- Use functional components with hooks (`useState`, `useEffect`, `useRef`, `useCallback`)
- Components receive game settings via props from parent components
- Use React Router (HashRouter) for navigation between screens
- **One component per file** — never add multiple exported components to a single file. If a new piece of UI is needed, create a separate file for it. Shared/reusable pieces (e.g. `MoneyDisplay`, `AnalogClock`, `SpellingReferenceCard`) get their own file in the same folder.
- Keep files focused: generation logic goes in `utils/`, UI goes in `components/`, data goes in `utils/languageData/`

### State Management

- Local component state for UI interactions
- `localStorage` utility for game persistence with `safeGet`/`safeSet`/`safeRemove` helpers
- All localStorage access wrapped in try/catch for crash resilience
- Math settings passed down as `mathSettings` object

### Styling Conventions

- Use Tailwind CSS utility classes directly in JSX
- **Always design mobile-first** — start with base classes for small screens, then add `sm:`, `md:`, `lg:` breakpoints for larger screens
- All interactive elements must be touch-friendly (min 44×44px tap target)
- Theme colors accessed via theme object: `theme.colors.primary`, `theme.colors.secondary`
- Animation with Tailwind (`animate-pulse`, `transition-all`, etc.)
- When building similar components (e.g. memory games), keep styling consistent across variants

### Math Problem Generation

- All math problems generated in `utils/difficultyAdapter.js`
- `generateMathProblem(settings)` - creates a problem based on settings
- `generateWrongAnswers(correctAnswer, count)` - generates plausible wrong answers
- Always include safeguards against infinite loops/recursion when generating unique values (use `attempts` parameter + fallback)

### Accessibility

- Use semantic HTML elements
- Include `aria-label` attributes for interactive elements
- Maintain good color contrast for readability
- Support keyboard navigation where applicable

## Critical Rules

### Single Responsibility per Minigame

Each minigame component must have exactly **one** game mechanic. Never combine two hidden/separate game modes into a single minigame component (e.g. mixing "pick the category" with "pick the transform" in one file). If a component needs to behave differently based on settings, split it into separate minigame files instead.

Concrete anti-patterns to avoid:

- **Random sub-category mixing:** A quiz component that uses `Math.random()` to pick between different content domains (e.g. randomly serving computerkennis OR veiligheid OR mediawijsheid questions). Each content domain must be its own component.
- **Conditional generator switching:** A component that checks multiple `enabledOperations` flags and picks a random generator from the enabled ones. Instead, create one component per generator/domain.
- **Content variation is OK:** A single quiz that varies _within_ one topic (e.g. different question formats about shapes) is fine — it's the same game mechanic and content domain.

### Minigame Feedback Rules

Feedback after a correct or incorrect answer must be **motivational and never reveal the correct answer**. The child gets another attempt, so revealing the answer would remove the learning challenge.

- **Correct:** `🎉 Super! Je hebt het goed!` or `🎉 Goed zo!` — green (bg-green-100/text-green-800 or text-green-600)
- **Incorrect:** `💪 Bijna! Probeer nog eens!` — orange (bg-orange-100/text-orange-800 or text-orange-600)
- **Never** show the correct answer, an explanation, or a hint after a wrong answer
- **Never** use red (bg-red) for the feedback banner — use orange for an encouraging tone
- Keep messages short, positive, and age-appropriate (6–10 years)

### Mobile-First Styling

Every UI component MUST work well on mobile screens (320px+). Always:

- Start with mobile styles as the base
- Add responsive breakpoints (`sm:`, `md:`, `lg:`) for larger screens
- Test that text doesn't overflow, buttons are tappable, and modals don't exceed viewport
- Use `text-sm sm:text-base md:text-lg` patterns, not just `text-lg`

### Testing Requirements

When adding or changing crucial functionality:

- Add or update unit tests in `src/utils/__tests__/` for logic changes
- Add or update E2E tests in `e2e/` for user-facing behavior changes
- Run `npm run test:run` to verify unit tests pass
- Run `npm run test:e2e` to verify E2E tests pass

### Settings & Minigame Registration

When adding a new setting or minigame:

1. Add the setting controls to the appropriate tab in `Home.jsx`
2. Add the minigame component to `ChallengeModal.jsx` (`GAME_TYPES` array)
3. **Update the player/settings modal** in `MazeGame.jsx` to show the new setting — this modal shows active exercise configuration during gameplay
4. Pass the setting through `mathSettings` (or equivalent) to the minigame
5. **Update the `canStart` validation** in `Home.jsx` — every new sub-operation flag must be included in the `canStart` condition for its category, otherwise the Start button stays disabled when only that operation is selected

## Common Tasks

### Adding a New Minigame

1. Create component in `src/components/minigames/`
2. Accept `mathSettings`, `onSuccess`, `onFailure`, `theme` props
3. Use `generateMathProblem()` for math content
4. Add to `GAME_TYPES` array in `ChallengeModal.jsx`
5. Update the player settings modal in `MazeGame.jsx`
6. **Update `MinigamePreview.jsx`** — add the lazy import to `GAME_COMPONENTS`, add the game type to the correct `CATEGORIES` entry, and add any needed `PREVIEW_SETTINGS` fields
7. Write unit tests for any new generation logic
8. Ensure mobile-first responsive design

### Adding a New Theme

1. Create theme file in `src/utils/themes/`
2. Include: `id`, `name`, `emoji`, `colors`, `friendEmojis`
3. Import and add to `THEMES` array in `utils/themes.js`

### Adding a New Setting

1. Add UI controls to the relevant tab in `Home.jsx`
2. Store/load via `localStorage.js` helpers (use `safeGet`/`safeSet`)
3. Pass through to components via settings object
4. **Update the in-game settings modal** in `MazeGame.jsx`
5. **Update `MinigamePreview.jsx`** if the setting affects available game types
6. **Update the `canStart` validation** in `Home.jsx` — add the new flag to the correct category's OR-chain so the Start button enables when only this setting is active
7. Use `??` (not `||`) for boolean defaults to preserve saved `false` values

### Adding a New Exercise Category

1. Create a panel component in `src/components/home/` (e.g. `MeetkundePanel.jsx`)
2. Add the panel + tab button in `Home.jsx`
3. Register game types in `gameSelection.js` (`getAvailableGameTypes` + GAME_NAMES)
4. Add minigame components, register in `ChallengeModal.jsx` and `BossBattleModal.jsx`
5. **Update `MinigamePreview.jsx`** — add the category to `CATEGORIES` array with all game types, add lazy imports to `GAME_COMPONENTS`, and add any `PREVIEW_SETTINGS` fields
6. **Add the category + all sub-operations to the `canStart` validation** in `Home.jsx` — every sub-operation flag must appear in the OR-chain so the Start button enables when any single sub-operation is selected
7. **Update E2E helpers** — add the tab label to `startAdventure()` in `e2e/helpers.js` (`tabLabels` + `operationLabels` + any active color classes in `isAlreadyActive`)
8. Add unit tests for data generators and `getAvailableGameTypes` in `gameSelection.test.js`
9. Add E2E settings tests in `e2e/settings.spec.js` and adventure start tests in `e2e/play-adventure.spec.js`

## Language

- **Code:** English (variable names, comments in English)
- **UI text:** Dutch (this is a Dutch children's game)
- **Documentation:** English
