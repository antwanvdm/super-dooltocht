# 🦸🧩 Super Dooltocht (Super Maze Adventure)

An educational math game for elementary school children, built with React and Tailwind CSS.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

## 🎯 About This Project

**Super Dooltocht** is a hobby project born out of frustration with the current state of educational games used in Dutch elementary schools. Many of these apps and websites are riddled with advertisements, dark patterns, and tracking – even those recommended by teachers!

This game aims to be:

- 🚫 **Ad-free** – No advertisements, ever
- 🔒 **Privacy-respecting** – No tracking, no data collection
- 🎮 **Fun** – Engaging gameplay that keeps kids motivated
- 📚 **Educational** – Real math practice with configurable difficulty
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
- **Place Value (Begripsoefening)** – Understanding tens, hundreds, thousands
- **Loving Hearts (Verliefde Harten)** – Number pairs that sum to 10
- **Money (Rekenen met Geld)** – Multiple money-based challenges:
  - Count Money (Geld Tellen)
  - Make Amount (Bedrag Maken)
  - Smart Pay (Slim Betalen)
  - Change (Wisselgeld)

### Challenge Types

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
- 📱 **Touch Controls** – D-pad overlay for touchscreen devices
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

| Technology   | Version | Purpose                    |
| ------------ | ------- | -------------------------- |
| React        | 19      | UI Framework               |
| Vite         | 7       | Build tool & dev server    |
| Tailwind CSS | 4       | Styling                    |
| React Router | 7       | Navigation                 |
| Express      | 5       | Backend API server         |
| Mongoose     | 9       | MongoDB ODM                |
| Vitest       | 4       | Testing                    |

## 📁 Project Structure

```
src/
├── components/
│   ├── maze/           # Core maze game components
│   ├── minigames/      # Educational challenges
│   ├── CodeFlowManager.jsx   # Player code auth flow
│   ├── CodeInputModal.jsx    # Emoji code entry
│   ├── CodeDisplayModal.jsx  # New code display
│   ├── Home.jsx        # Home screen with settings
│   └── Confetti.jsx    # Victory celebration
├── hooks/              # Custom React hooks
├── utils/
│   ├── difficultyAdapter.js  # Math problem generation
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

Requires a `MONGODB_URI` in `server/.env`.

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
