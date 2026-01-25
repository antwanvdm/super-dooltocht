# Super Dooltocht - Copilot Instructions

## Project Overview

**Super Dooltocht** (Super Maze Adventure) is an educational math game for elementary school children. Players navigate through themed mazes, solve math challenges, and rescue friends along the way. This is a hobby project created as an ad-free, privacy-respecting alternative to existing educational games.

## Tech Stack

- **Framework:** React 19 with Vite 7
- **Styling:** Tailwind CSS v4 (using `@tailwindcss/vite` plugin)
- **Routing:** React Router v7
- **Language:** JavaScript (JSX)
- **Build Tool:** Vite with ESLint

## Project Structure

```
src/
├── components/
│   ├── maze/           # Core maze game components
│   │   ├── MazeGame.jsx    # Main game controller
│   │   ├── MazeView.jsx    # Maze rendering & player movement
│   │   └── Minimap.jsx     # Overview minimap
│   ├── minigames/      # Educational challenges
│   │   ├── ChallengeModal.jsx  # Modal wrapper for challenges
│   │   ├── MathPuzzle.jsx      # Fill-in-the-blank math worksheet
│   │   ├── MultipleChoice.jsx  # Multiple choice questions
│   │   ├── MemoryGame.jsx      # Memory matching game
│   │   └── DartsGame.jsx       # Darts-style number addition
│   ├── ui/             # Reusable UI components
│   ├── Home.jsx        # Home screen with settings
│   └── Confetti.jsx    # Victory celebration animation
├── hooks/              # Custom React hooks
├── utils/
│   ├── difficultyAdapter.js  # Math problem generation
│   ├── localStorage.js       # Game state persistence
│   ├── mazeGenerator.js      # Procedural maze generation
│   └── themes.js             # Visual themes configuration
└── assets/             # Static assets
```

## Key Features

### Math Operations
- **Addition (Plussommen):** Configurable range (up to 20, 50, 100, 200, 500, or 1000)
- **Subtraction (Minsommen):** Same configurable range
- **Multiplication (Keersommen):** Configurable table groups:
  - Easy: Tables 1, 2, 5, 10
  - Medium: Tables 3, 4, 6, 7, 8, 9
  - Hard: Tables 11, 12
  - All: Tables 1-12

### Game Modes
- **Adventure lengths:** Short (2 friends + 4 challenges), Medium (4 friends + 7 challenges), Long (6 friends + 10 challenges)
- **Themed worlds:** Multiple visual themes (space, underwater, forest, etc.)
- **Player customization:** Emoji-based character selection

### Minigames
1. **Multiple Choice:** Select the correct answer from 4 options
2. **Memory Game:** Match math problems with their answers
3. **Math Puzzle (Sommenblad):** Fill in answers for 4 problems
4. **Darts Game:** Throw darts to reach the target sum

## Coding Guidelines

### React Patterns
- Use functional components with hooks (`useState`, `useEffect`, `useRef`)
- Components receive game settings via props from parent components
- Use React Router for navigation between screens

### State Management
- Local component state for UI interactions
- `localStorage` utility for game persistence
- Math settings passed down as `mathSettings` object:
  ```js
  {
    enabledOperations: { add: boolean, sub: boolean, mul: boolean },
    maxValue: number,
    mulTables: 'easy' | 'medium' | 'hard' | 'all'
  }
  ```

### Styling Conventions
- Use Tailwind CSS utility classes directly in JSX
- Theme colors accessed via theme object: `theme.colors.primary`, `theme.colors.secondary`
- Responsive design with Tailwind breakpoints (`sm:`, `md:`, `lg:`)
- Animation with Tailwind (`animate-pulse`, `transition-all`, etc.)

### Math Problem Generation
- All math problems generated in `utils/difficultyAdapter.js`
- `generateMathProblem(settings)` - creates a problem based on settings
- `generateWrongAnswers(correctAnswer, count)` - generates plausible wrong answers
- Always include safeguards against infinite loops when generating unique values

### Accessibility
- Use semantic HTML elements
- Include `aria-label` attributes for interactive elements
- Maintain good color contrast for readability
- Support keyboard navigation where applicable

## Common Tasks

### Adding a New Minigame
1. Create component in `src/components/minigames/`
2. Accept `mathSettings`, `onSuccess`, `onFailure`, `theme` props
3. Use `generateMathProblem()` for math content
4. Add to `GAME_TYPES` array in `ChallengeModal.jsx`

### Adding a New Theme
1. Add theme object to `THEMES` in `utils/themes.js`
2. Include: `id`, `name`, `emoji`, `colors`, `friendEmojis`

### Testing Math Generation
- Ensure generated problems stay within configured bounds
- Test edge cases: very small ranges, single operation enabled
- Verify unique answer generation doesn't cause infinite loops

## Language

- **Code:** English (variable names, comments in English)
- **UI text:** Dutch (this is a Dutch children's game)
- **Documentation:** English
