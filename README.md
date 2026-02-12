# 🦸🧩🕹 Super Dooltocht (Super Maze Adventure)

An educational math and language game for elementary school children, built with React and Tailwind CSS.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-7-CA4245?logo=reactrouter&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?logo=vitest&logoColor=white)
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
- **Place Value (Getallen begrijpen)** – Understanding tens, hundreds, thousands
- **Loving Hearts (Verliefde Harten)** – Number pairs that sum to 10
- **Money (Rekenen met Geld)** – Multiple money-based challenges:
  - Count Money (Geld Tellen)
  - Make Amount (Bedrag Maken)
  - Smart Pay (Slim Betalen)
  - Change (Wisselgeld)

### Clock Reading (Klokkijken)

A separate exercise category with its own settings tab.

- **Difficulty levels:**
  - Whole hours (Hele uren) – 03:00, 07:00
  - Half hours (Halve uren) – 03:00, 03:30
  - Quarters (Kwartieren) – 03:00, 03:15, 03:30, 03:45
  - 5 minutes – 03:05, 03:10, 03:25...
  - 1 minute – 03:07, 03:42...
- **Extra options:**
  - 💬 Words mode – Practice reading/writing times in Dutch words ("kwart over drie", "half vijf")
  - 🔄 24-hour notation – Practice converting between 12h and 24h (AM/PM understanding)

### Clock Challenge Types

- 🕐 **Hoe laat is het?** – See analog clock, choose the correct time from 4 options
- 🃏 **Klok Memory** – Match analog clocks with digital/word representations
- ⌨️ **Typ de tijd** – See analog clock, type the digital time (HH:MM)
- 🔍 **Welke klok?** – Read a digital/word time, pick the correct analog clock
- 📝 **Schrijf de tijd** – See a clock, type the time in Dutch words (words mode)
- 🔄 **24-uursklok** – Convert between 12h+dagdeel and 24h notation (24h mode)

### Language Exercises (Taal)

A separate exercise category with its own settings tab.

#### Spelling

Practice Dutch spelling rules with 8 word categories:

- ✂️ **Hakwoord** – Words spelled as they sound (e.g. _kat_)
- 🎵 **Zingwoord** – Words ending in -ng (e.g. _zing_)
- 💨 **Luchtwoord** – Words with -cht (e.g. _lucht_)
- 🪵 **Plankwoord** – Words with -nk (e.g. _plank_)
- 🔤 **Eer/oor/eur/eel-woord** – With subcategories (e.g. _beer, hoor, geur, geel_)
- 🌈 **Aai/ooi/oei-woord** – (e.g. _mooi, haai_)
- ✨ **Eeuw/ieuw-woord** – (e.g. _leeuw, nieuw_)
- 📏 **Langermaakwoord** – Words where you need to extend to hear d/t (e.g. _hond, hart_)

#### Vocabulary (Woordenschat)

- General vocabulary words with definitions and example sentences
- Optional theme-specific vocabulary tied to the active game world

#### Reading Comprehension (Begrijpend Lezen)

- **Short texts** – 1-2 sentence passages with a comprehension question
- **Long texts** – 3-4 sentence passages with more complex questions
- Optional theme-specific reading passages

### Spelling Challenge Types

- 🏷️ **Spellingcategorie** – See a word, pick the correct spelling rule category
- 🔗 **Spelling Verbinden** – Connect words to their matching spelling categories
- ⌨️ **Woord Typen** – Type the word correctly and select its category

### Vocabulary Challenge Types

- 🎯 **Woordbetekenis** – See a word, pick the correct definition from 4 options
- 🧠 **Woorden Memory** – Match words with their definitions in a memory game
- ✏️ **Woord Invullen** – Fill in the missing word in a sentence

### Reading Challenge Types

- 📖 **Begrijpend Lezen** – Read a text and answer a multiple choice question
- ✅ **Waar of Niet Waar** – Read a text and judge statements as true or false

### Math Challenge Types

- 🎯 **Multiple Choice** – Pick the correct answer from 4 options
- 🧠 **Memory Game** – Match math problems with their answers
- 📝 **Math Puzzle (Sommenblad)** – Fill in answers for multiple problems
- 🎯 **Darts Game** – Throw darts to add up to the target number

### Adventure Settings

- **Short** – 2 friends to rescue + 4 challenges
- **Medium** – 4 friends to rescue + 7 challenges
- **Long** – 6 friends to rescue + 10 challenges

### Customization & Accessibility

- 🌍 **12 Themed Worlds** – Each with unique visual style and story:
  - Space, Underwater, Forest, Desert, City, Mountains, Jungle, Arctic, Beach, Volcano, Medieval, and more
- 🎭 **Emoji Character Selection** – Choose your own avatar
- 💾 **Auto-save** – Game progress automatically saved
- ⚙️ **Flexible Settings** – Configure math operations and difficulty per child
- 📂 **Exercise Categories** – Switch between Rekenen (math), Klokkijken (clock reading), and Taal (language)
- �📱 **Touch Controls** – D-pad overlay for touchscreen devices
- ⌨️ **Keyboard Shortcuts**:
  - Arrow keys: Move through maze
  - **K**: Toggle minimap
  - **S**: Toggle player settings
  - **H**: Toggle help
  - **B**: Toggle touch controls
  - **ESC**: Close windows

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

| Technology   | Version | Purpose                 |
| ------------ | ------- | ----------------------- |
| React        | 19      | UI Framework            |
| Vite         | 7       | Build tool & dev server |
| Tailwind CSS | 4       | Styling                 |
| React Router | 7       | Navigation              |
| Express      | 5       | Backend API server      |
| Mongoose     | 9       | MongoDB ODM             |
| Vitest       | 4       | Testing                 |

## 📁 Project Structure

```
src/
├── components/
│   ├── maze/           # Core maze game components
│   ├── minigames/      # Educational challenges
│   │   ├── AnalogClock.jsx       # Reusable SVG analog clock
│   │   ├── Clock*.jsx            # Clock reading minigames
│   │   ├── Spelling*.jsx         # Spelling minigames
│   │   ├── Vocabulary*.jsx       # Vocabulary minigames
│   │   ├── Reading*.jsx          # Reading comprehension minigames
│   │   └── ...                   # Math & money minigames
│   ├── CodeFlowManager.jsx   # Player code auth flow
│   ├── CodeInputModal.jsx    # Emoji code entry
│   ├── CodeDisplayModal.jsx  # New code display
│   ├── Home.jsx        # Home screen with settings
│   └── Confetti.jsx    # Victory celebration
├── hooks/              # Custom React hooks
├── utils/
│   ├── difficultyAdapter.js  # Math problem generation
│   ├── languageAdapter.js    # Language problem generation
│   ├── languageData.js       # Spelling, vocabulary & reading data
│   ├── emojiCode.js          # Emoji ↔ slug conversion
│   ├── localStorage.js       # Game state persistence
│   ├── mazeGenerator.js      # Procedural maze generation
│   ├── serverSync.js         # Server sync utilities
│   ├── themes.js             # Visual themes
│   └── __tests__/            # Unit tests
└── assets/             # Static assets
server/
├── index.js            # Express API server
├── cleanup.js          # Stale player cleanup script
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

## 🤝 Contributing

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
