# 🦸🧩🕹 Super Dooltocht (Super Maze Adventure)

An educational math and language game for elementary school children, built with React and Tailwind CSS.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-7-CA4245?logo=reactrouter&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?logo=vitest&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-E2E-2EAD33?logo=playwright&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC?logo=tailwindcss&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-9-880000?logo=mongoose&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

## 🎯 About This Project

**Super Dooltocht** is a hobby project born out of frustration with the current state of educational games used in Dutch elementary schools. Many of these apps and websites are riddled with advertisements, dark patterns, and tracking – even those recommended by teachers!

This game aims to be:

- 🚫 **Ad-free** – No advertisements, ever
- 🔒 **Privacy-respecting** – No tracking, no data collection
- 🎮 **Fun** – Engaging gameplay that keeps kids motivated
- 📚 **Educational** – Real math, clock reading, and language practice with configurable difficulty
- 🆓 **Free** – Open source and available to everyone

## ✨ Features

### Math Operations

- **Addition (Plussommen)** – Configurable ranges with modes:
  - Within tens (within tiental)
  - Beyond tens: units, tens, or hundreds
- **Subtraction (Minsommen)** – Same configurable ranges and modes
- **Multiplication (Keersommen)** – Multiple difficulty levels:
  - Easy: Tables 1, 2, 5, 10
  - Medium: Tables 3, 4, 6, 7, 8, 9
  - Hard: Tables 11, 12
  - Expert: Tables 13-20
  - All Tables (1-20)
- **Division (Deelsommen)** – Shares the same table selection as multiplication:
  - Reverses multiplication: product ÷ table = answer
  - Always produces whole-number answers (1-10)
  - Same difficulty levels as Keersommen
- **Place Value (Getallen begrijpen)** – Understanding tens, hundreds, thousands
- **Loving Hearts (Verliefde Harten)** – Number pairs that sum to 10
- **Money (Rekenen met Geld)** – Multiple money-based challenges:
  - Count Money (Geld Tellen)
  - Make Amount (Bedrag Maken)
  - Smart Pay (Slim Betalen)
  - Change (Wisselgeld)
- **Challenge types** (round-robin: each type is played before any repeats):
  - Multiple Choice – Pick the correct answer from 4 options
  - Memory Game – Match math problems with their answers
  - Math Puzzle (Sommenblad) – Fill in answers for multiple problems
  - Darts Game – Throw darts to add up to the target number

### Puzzles (Puzzels)

- **Sudoku** – Classic number puzzles in 4×4 (easy), 6×6 (medium), and 9×9 (hard) grids
- **Tectonic** – Fill regions with numbers where no adjacent cells share the same value
- **Binary (Binair)** – Fill a grid with 0s and 1s following row/column balance and no-triple rules
- **Chess (Schaken)** – Tactical checkmate puzzles sourced from the [Lichess puzzle database](https://database.lichess.org/#puzzles) (CC0):
  - Schaakmat in 1 – Find the single move that delivers checkmate
  - Schaakmat in 2 – Two-move checkmate sequences (opponent responds automatically)
  - Schaakmat in 3 – Three-move checkmate sequences
- **Difficulty levels** per puzzle type (easy/medium/hard), configurable in settings
- **Friend encounters** – When rescuing friends, a random puzzle (sudoku, tectonic, or binary) must be solved at easy difficulty

### Clock Reading (Klokkijken)

- **Difficulty levels:** Whole hours → half hours → quarters → 5 minutes → 1 minute
- **Words mode** – Practice reading/writing times in Dutch words ("kwart over drie", "half vijf")
- **24-hour notation** – Practice converting between 12h and 24h (AM/PM understanding)
- **Challenge types:**
  - Hoe laat is het? – See analog clock, choose the correct time
  - Klok Memory – Match analog clocks with digital/word representations
  - Typ de tijd – See analog clock, type the digital time (HH:MM)
  - Welke klok? – Read a time, pick the correct analog clock
  - Schrijf de tijd – Type the time in Dutch words
  - 24-uursklok – Convert between 12h and 24h notation

### Time Awareness (Tijdsbesef)

- **Topics:** Days of the week, months of the year, seasons (with characteristics)
- **Challenge types:**
  - Kalenderquiz – Multiple choice questions about calendar facts
  - Volgorde – Drag items into the correct order
  - Seizoenen verbinden – Connect characteristics to the right season
  - Kalender Memory – Match related calendar pairs

### Time Calculation (Rekenen met Tijd)

- **Difficulty levels:** Whole hours → half hours → quarters → minutes → days & weeks
- **24-hour notation** – Show times in 24h format (e.g. 15:00 instead of 03:00)
- **Challenge types:**
  - Klok vooruit – "It's 03:00, what time is it in 2 hours?"
  - Klok rekenen – See an analog clock, calculate time forward/backward
  - Hoe lang duurt het? – Calculate duration between two times
  - Omreken Memory – Match time unit conversions (e.g. "1 uur" ↔ "60 min")
  - Rekenen met tijd – Fill in the missing number in time calculations

### Language (Taal)

- **Spelling** – Practice Dutch spelling rules across 8 word categories:
  - Hakwoord, zingwoord, luchtwoord, plankwoord, eer/oor/eur/eel, aai/ooi/oei, eeuw/ieuw, langermaakwoord
  - Challenge types: pick the category, connect words to rules, type the word
- **Vocabulary (Woordenschat)** – Words with definitions and example sentences:
  - General vocabulary + optional theme-specific words
  - Challenge types: pick the definition, memory matching, fill in the blank
- **Reading Comprehension (Begrijpend Lezen)** – Short and long passages with questions:
  - Optional theme-specific reading passages
  - Challenge types: multiple choice, true or false
- **English** – Basic English vocabulary practice:
  - Challenge types: multiple choice, memory, connect pairs, fill in the blank, type the word

### Adventure Settings

- **Short** – 2 friends to rescue + 4 challenges
- **Medium** – 4 friends to rescue + 7 challenges
- **Long** – 6 friends to rescue + 10 challenges
- **XL** 🏰 – 10 friends to rescue + 16 challenges across **2 floors**
  - Ground floor (Beneden) and upper floor (Boven) connected by bidirectional staircases (🪜)
  - Challenges and friends are spread across both floors
  - The exit is always on the ground floor
  - Minimap shows floor tabs to inspect both levels

### Customization & Accessibility

- 🌍 **12 Themed Worlds** – Each with unique visual style and story:
  - Space, Underwater, Forest, Desert, City, Mountains, Jungle, Arctic, Beach, Volcano, Medieval, and more
- 🎭 **Emoji Character Selection** – Choose your own avatar
- 💾 **Auto-save** – Game progress automatically saved
- ⚙️ **Flexible Settings** – Configure math operations and difficulty per child
- 📂 **Exercise Categories** – Switch between Rekenen (math), Klokkijken (clock reading), Tijdsbesef (time awareness), Rekenen met Tijd (time calculation), and Taal (language)
- 📱 **Touch Controls** – D-pad overlay for touchscreen devices
- 🔊 **Read-Aloud (Voorlezen)** – Text-to-speech button on language minigames (Spelling, Vocabulary, Reading, English) using the browser's SpeechSynthesis API. Uses Dutch (`nl-NL`) or English (`en-GB`) voices depending on the context. Works independently of the sound/music toggle.
- 🎵 **Sound & Music** _(feature-toggled, currently off)_ – Background music per theme with Howler.js, SFX for game events (correct/wrong answer, friend found, victory, etc.). Controlled by a single `AUDIO_FEATURE_ENABLED` constant in `AudioProvider.jsx`.
- ⌨️ **Keyboard Shortcuts**:
  - Arrow keys: Move through maze
  - **K**: Toggle minimap
  - **S**: Toggle player settings
  - **H**: Toggle help
  - **B**: Toggle touch controls
  - **ESC**: Close windows

### Developer Tools

- 🎮 **Minigame Preview Page** – Test all ~40 minigames in isolation at `/#/preview-minigames` (bypasses player code authentication). Each category has configurable settings (difficulty, ranges, spelling categories, etc.) so you can test different configurations without starting an adventure.
- 🔄 **Lazy Import Retry** – Dynamic imports wrapped with `lazyRetry()` to gracefully handle stale chunk references after deployments (auto-reloads once per session on import failure).

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/super-dooltocht.git
cd super-dooltocht

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## 🛠️ Tech Stack

| Technology   | Version | Purpose                       |
| ------------ | ------- | ----------------------------- |
| React        | 19      | UI Framework                  |
| Vite         | 7       | Build tool & dev server       |
| Tailwind CSS | 4       | Styling                       |
| React Router | 7       | Navigation                    |
| Express      | 5       | Backend API server            |
| Mongoose     | 9       | MongoDB ODM                   |
| Howler.js    | 2       | Audio playback (music & SFX)  |
| chess.js     | 1       | Chess move validation & rules |
| Vitest       | 4       | Unit testing                  |
| Playwright   | 1.58    | E2E testing                   |

## 📁 Project Structure

```
src/
├── components/
│   ├── maze/           # Core maze game components
│   │   ├── MazeGame.jsx    # Main game controller
│   │   ├── MazeView.jsx    # Maze rendering & player movement
│   │   ├── DPad.jsx        # Touch controls overlay
│   │   └── Minimap.jsx     # Overview minimap
│   ├── minigames/      # Educational challenges (~40 components)
│   │   ├── ChallengeModal.jsx    # Modal wrapper & game type router
│   │   ├── MathPuzzle.jsx        # Fill-in-the-blank worksheet
│   │   ├── MultipleChoice.jsx    # Multiple choice questions
│   │   ├── MemoryGame.jsx        # Math memory matching
│   │   ├── DartsGame.jsx         # Darts-style addition
│   │   ├── AnalogClock.jsx       # Reusable SVG analog clock
│   │   ├── MoneyDisplay.jsx      # Reusable coin/bill display
│   │   ├── SpellingReferenceCard.jsx # Reusable spelling rule card
│   │   ├── Clock*.jsx            # Clock reading minigames
│   │   ├── Kalender*.jsx         # Time awareness minigames
│   │   ├── Klok*.jsx / Tijd*.jsx # Time calculation minigames
│   │   ├── OmrekenMemory.jsx     # Time unit conversion memory
│   │   ├── Spelling*.jsx         # Spelling minigames
│   │   ├── Vocabulary*.jsx       # Vocabulary minigames
│   │   ├── English*.jsx          # English language minigames
│   │   ├── Reading*.jsx          # Reading comprehension minigames
│   │   ├── *Money*.jsx / *Pay*.jsx / *Change*.jsx  # Money minigames
│   │   ├── ChessGame.jsx         # Checkmate puzzles (Lichess DB)
│   │   ├── PuzzleRulesCard.jsx   # Shared puzzle rules overlay
│   │   └── PlaceValueGame.jsx, LovingHeartsGame.jsx, ...
│   ├── CodeFlowManager.jsx  # Player code auth flow
│   ├── CodeInputModal.jsx   # Emoji code entry modal
│   ├── CodeDisplayModal.jsx # New code display modal
│   ├── MinigamePreview.jsx  # Dev preview page for all minigames
│   ├── Home.jsx             # Home screen with settings tabs
│   └── Confetti.jsx         # Victory celebration animation
├── context/
│   └── AudioProvider.jsx    # Music & SFX context (feature-toggled)
├── hooks/
│   ├── useSyncToServer.js   # Server sync hook
│   └── useSpeech.js         # SpeechSynthesis TTS hook
├── utils/
│   ├── difficultyAdapter.js     # Math problem generation
│   ├── languageAdapter.js       # Language problem generation
│   ├── localStorage.js          # Game state persistence (safeGet/safeSet/safeRemove)
│   ├── mazeGenerator.js         # Procedural maze generation
│   ├── serverSync.js            # Server sync utilities
│   ├── emojiCode.js             # Emoji ↔ slug conversion
│   ├── gameSelection.js         # Minigame type selection (round-robin)
│   ├── chessData.js             # 90 Lichess checkmate puzzles (CC0)
│   ├── chessGenerator.js        # Chess game logic (wraps chess.js)
│   ├── sudokuGenerator.js       # Sudoku puzzle generation & validation
│   ├── tectonicGenerator.js     # Tectonic puzzle generation & validation
│   ├── binaryGenerator.js       # Binary puzzle generation & validation
│   ├── lazyRetry.js             # Resilient dynamic import wrapper
│   ├── themes.js                # Theme registry & exports
│   ├── languageData.js          # Language data registry
│   ├── timeAwarenessData.js     # Calendar/season quiz generation
│   ├── timeCalculationData.js   # Time calculation problem generation
│   ├── themes/                  # Individual theme files
│   │   ├── space.js, ocean.js, jungle.js, castle.js, ...
│   │   └── (12 themes total)
│   ├── languageData/            # Language data files
│   │   ├── spellingData.js      # Dutch spelling rules & words
│   │   ├── vocabularyData.js    # Vocabulary words & definitions
│   │   ├── readingData.js       # Reading comprehension passages
│   │   └── englishData.js       # English vocabulary data
│   └── __tests__/               # Unit tests (Vitest)
└── assets/             # Static assets
e2e/
├── helpers.js            # Shared test utilities & fixtures
├── settings.spec.js      # Home screen & settings tests
├── play-adventure.spec.js # Adventure start & minigame tests
├── gameplay.spec.js      # In-game mechanics & modal tests
└── error-scenarios.spec.js # Error handling & edge cases
server/
├── index.js            # Express API server
├── cleanup.js          # Stale player cleanup script
├── scripts/
│   └── generate-sounds.js  # jsfxr SFX generator
├── public/sounds/      # Audio files (SFX + music)
└── package.json
```

## 🖥️ Server

The game uses a lightweight Express/MongoDB backend for player code management and progress sync.

### Running the server

```bash
cd server
npm install
node --env-file=.env --watch index.js
```

Requires a `MONGODB_URI` and `PORT` in `server/.env`.

### Player cleanup

Remove players that haven't been active in the last 3 months:

```bash
cd server

# Dry-run (shows what would be deleted)
node --env-file=.env cleanup.js

# Actually delete
node --env-file=.env cleanup.js --confirm
```

## � Testing

The project has two layers of testing:

### Unit Tests (Vitest)

~470 unit tests covering math problem generation, maze generation (including multi-floor), language adapters, time awareness/calculation data, puzzle generators (sudoku, tectonic, binary, chess), and edge cases.

```bash
# Run all unit tests
npm run test:run

# Run in watch mode
npm test

# Run with UI
npm run test:ui
```

### E2E Tests (Playwright)

~115 end-to-end tests covering settings, adventure flow, gameplay mechanics (including multi-floor XL mode), and error scenarios. Tests inject deterministic game state via localStorage for reliable, repeatable results.

```bash
# Run all E2E tests (headless)
npm run test:e2e

# Run with interactive UI
npm run test:e2e:ui

# Run with slow motion (500ms) for debugging
npm run test:e2e:ui:slow
```

E2E test output is written to `e2e/test-results/` and `e2e/playwright-report/`.

## �🤝 Contributing

Contributions are welcome! Feel free to:

- 🐛 Report bugs
- 💡 Suggest new features
- 🔧 Submit pull requests

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with love for Dutch elementary school children
- Inspired by the need for quality, ad-free educational content
- Thanks to all the parents and teachers who share this frustration!

---

**Note:** The game UI is in Dutch 🇳🇱 as it's designed for Dutch children. The code and documentation are in English.
