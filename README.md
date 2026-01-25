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
- **Addition (Plussommen)** – Numbers up to 20, 50, 100, 200, 500, or 1000
- **Subtraction (Minsommen)** – Same configurable ranges
- **Multiplication (Keersommen)** – Tables 1-12 with difficulty groupings:
  - Easy: Tables 1, 2, 5, 10
  - Medium: Tables 3, 4, 6, 7, 8, 9
  - Hard: Tables 11, 12
  - All tables combined

### Game Modes
- 🎯 **Multiple Choice** – Pick the correct answer from 4 options
- 🧠 **Memory Game** – Match math problems with their answers
- 📝 **Math Puzzle** – Fill in answers for multiple problems
- 🎯 **Darts Game** – Throw darts to add up to the target number

### Adventure Settings
- **Short** – 2 friends to rescue + 4 challenges
- **Medium** – 4 friends to rescue + 7 challenges
- **Long** – 6 friends to rescue + 10 challenges

### Customization
- 🌍 Multiple themed worlds (space, underwater, forest, and more!)
- 🎭 Choose your own emoji character
- 💾 Game progress automatically saved

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

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19 | UI Framework |
| Vite | 7 | Build tool & dev server |
| Tailwind CSS | 4 | Styling |
| React Router | 7 | Navigation |

## 📁 Project Structure

```
src/
├── components/
│   ├── maze/           # Core maze game components
│   ├── minigames/      # Educational challenges
│   ├── ui/             # Reusable UI components
│   ├── Home.jsx        # Home screen with settings
│   └── Confetti.jsx    # Victory celebration
├── hooks/              # Custom React hooks
├── utils/
│   ├── difficultyAdapter.js  # Math problem generation
│   ├── localStorage.js       # Game state persistence
│   ├── mazeGenerator.js      # Procedural maze generation
│   └── themes.js             # Visual themes
└── assets/             # Static assets
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
