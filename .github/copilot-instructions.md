# Super Dooltocht - Copilot Instructions

## Project Overview

**Super Dooltocht** (Super Maze Adventure) is an educational math, clock and language game for elementary school children. Players navigate through themed mazes, solve challenges, and rescue friends along the way. This is a hobby project created as an ad-free, privacy-respecting alternative to existing educational games.

## Tech Stack

- **Framework:** React 19 with Vite 7
- **Styling:** Tailwind CSS v4 (using `@tailwindcss/vite` plugin)
- **Routing:** React Router v7 (HashRouter)
- **Language:** JavaScript (JSX)
- **Build Tool:** Vite with ESLint
- **Unit Tests:** Vitest 4 (~390 tests)
- **E2E Tests:** Playwright (~110 tests)
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

- **Rekenen (Math):** Addition, subtraction, multiplication, place value, loving hearts, money
- **Klokkijken (Clock Reading):** Analog/digital clocks, words mode, 24h notation
- **Tijdsbesef (Time Awareness):** Days, months, seasons
- **Rekenen met Tijd (Time Calculation):** Duration, forward/backward time
- **Taal (Language):** Spelling rules, vocabulary, reading comprehension

### Game Modes

- **Adventure lengths:** Short (2 friends + 4 challenges), Medium (4 friends + 7 challenges), Long (6 friends + 10 challenges)
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

## Common Tasks

### Adding a New Minigame

1. Create component in `src/components/minigames/`
2. Accept `mathSettings`, `onSuccess`, `onFailure`, `theme` props
3. Use `generateMathProblem()` for math content
4. Add to `GAME_TYPES` array in `ChallengeModal.jsx`
5. Update the player settings modal in `MazeGame.jsx`
6. Write unit tests for any new generation logic
7. Ensure mobile-first responsive design

### Adding a New Theme

1. Create theme file in `src/utils/themes/`
2. Include: `id`, `name`, `emoji`, `colors`, `friendEmojis`
3. Import and add to `THEMES` array in `utils/themes.js`

### Adding a New Setting

1. Add UI controls to the relevant tab in `Home.jsx`
2. Store/load via `localStorage.js` helpers (use `safeGet`/`safeSet`)
3. Pass through to components via settings object
4. **Update the in-game settings modal** in `MazeGame.jsx`
5. Use `??` (not `||`) for boolean defaults to preserve saved `false` values

## Language

- **Code:** English (variable names, comments in English)
- **UI text:** Dutch (this is a Dutch children's game)
- **Documentation:** English
