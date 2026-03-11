import { useState, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTheme } from '../utils/themes';
import { lazyRetry } from '../utils/lazyRetry';
import {
  GAME_NAMES,
  STANDARD_GAMES,
  MONEY_GAMES,
  CLOCK_GAMES,
  SPELLING_GAMES,
  VOCABULARY_GAMES,
  READING_GAMES,
  ENGLISH_GAMES,
  TIME_AWARENESS_GAMES,
  TIME_CALCULATION_GAMES,
  PUZZLE_GAMES,
} from '../utils/gameSelection';

// Lazy-loaded minigame components (same as ChallengeModal)
const GAME_COMPONENTS = {
  'multiple-choice': lazy(() => lazyRetry(() => import('./minigames/MultipleChoice'))),
  'memory': lazy(() => lazyRetry(() => import('./minigames/MemoryGame'))),
  'puzzle': lazy(() => lazyRetry(() => import('./minigames/MathPuzzle'))),
  'darts': lazy(() => lazyRetry(() => import('./minigames/DartsGame'))),
  'placeValue': lazy(() => lazyRetry(() => import('./minigames/PlaceValueGame'))),
  'lovingHearts': lazy(() => lazyRetry(() => import('./minigames/LovingHeartsGame'))),
  'makeAmount': lazy(() => lazyRetry(() => import('./minigames/MakeAmountGame'))),
  'countMoney': lazy(() => lazyRetry(() => import('./minigames/CountMoneyGame'))),
  'smartPay': lazy(() => lazyRetry(() => import('./minigames/SmartPayGame'))),
  'change': lazy(() => lazyRetry(() => import('./minigames/ChangeGame'))),
  'clockMultipleChoice': lazy(() => lazyRetry(() => import('./minigames/ClockMultipleChoice'))),
  'clockMemory': lazy(() => lazyRetry(() => import('./minigames/ClockMemory'))),
  'clockInput': lazy(() => lazyRetry(() => import('./minigames/ClockInput'))),
  'clockMatchAnalog': lazy(() => lazyRetry(() => import('./minigames/ClockMatchAnalog'))),
  'clock24h': lazy(() => lazyRetry(() => import('./minigames/Clock24hGame'))),
  'clockWords': lazy(() => lazyRetry(() => import('./minigames/ClockWordsGame'))),
  'spellingCategoryMatch': lazy(() => lazyRetry(() => import('./minigames/SpellingCategoryMatch'))),
  'spellingConnect': lazy(() => lazyRetry(() => import('./minigames/SpellingConnect'))),
  'spellingTypeWord': lazy(() => lazyRetry(() => import('./minigames/SpellingTypeWord'))),
  'vocabularyMatch': lazy(() => lazyRetry(() => import('./minigames/VocabularyMatch'))),
  'vocabularyMemory': lazy(() => lazyRetry(() => import('./minigames/VocabularyMemory'))),
  'vocabularyFillIn': lazy(() => lazyRetry(() => import('./minigames/VocabularyFillIn'))),
  'readingComprehension': lazy(() => lazyRetry(() => import('./minigames/ReadingComprehension'))),
  'readingTrueFalse': lazy(() => lazyRetry(() => import('./minigames/ReadingTrueFalse'))),
  'englishMultipleChoice': lazy(() => lazyRetry(() => import('./minigames/EnglishMultipleChoice'))),
  'englishMemory': lazy(() => lazyRetry(() => import('./minigames/EnglishMemory'))),
  'englishTypeWord': lazy(() => lazyRetry(() => import('./minigames/EnglishTypeWord'))),
  'englishFillIn': lazy(() => lazyRetry(() => import('./minigames/EnglishFillIn'))),
  'englishConnect': lazy(() => lazyRetry(() => import('./minigames/EnglishConnect'))),
  'kalenderQuiz': lazy(() => lazyRetry(() => import('./minigames/KalenderQuiz'))),
  'volgordeSorteer': lazy(() => lazyRetry(() => import('./minigames/VolgordeSorteer'))),
  'seizoenenMatch': lazy(() => lazyRetry(() => import('./minigames/SeizoenenMatch'))),
  'kalenderMemory': lazy(() => lazyRetry(() => import('./minigames/KalenderMemory'))),
  'klokVooruit': lazy(() => lazyRetry(() => import('./minigames/KlokVooruit'))),
  'tijdsduurQuiz': lazy(() => lazyRetry(() => import('./minigames/TijdsduurQuiz'))),
  'omrekenMemory': lazy(() => lazyRetry(() => import('./minigames/OmrekenMemory'))),
  'tijdRekenen': lazy(() => lazyRetry(() => import('./minigames/TijdRekenen'))),
  'klokRekenen': lazy(() => lazyRetry(() => import('./minigames/KlokRekenen'))),
  'sudoku': lazy(() => lazyRetry(() => import('./minigames/SudokuGame'))),
  'tectonic': lazy(() => lazyRetry(() => import('./minigames/TectonicGame'))),
  'binary': lazy(() => lazyRetry(() => import('./minigames/BinaryGame'))),
  'chess': lazy(() => lazyRetry(() => import('./minigames/ChessGame'))),
};

// Categories with their game types, emoji, colour, and configurable settings
const CATEGORIES = [
  {
    name: 'Rekenen',
    emoji: '🧮',
    color: 'from-blue-500 to-indigo-600',
    games: [...STANDARD_GAMES, 'placeValue', 'lovingHearts'],
    settings: [
      { key: 'maxValue', label: 'Plus/min tot', type: 'select', options: [
        { value: 20, label: '20' }, { value: 50, label: '50' }, { value: 100, label: '100' },
        { value: 200, label: '200' }, { value: 500, label: '500' }, { value: 1000, label: '1000' },
      ]},
      { key: 'addSubMode', label: 'Tiental', type: 'select', options: [
        { value: 'within', label: 'Binnen tiental' }, { value: 'beyond', label: 'Over tiental' },
      ]},
      { key: 'beyondDigits', label: 'Rekenen met', type: 'select', options: [
        { value: 'units', label: 'Eenheden' }, { value: 'tens', label: 'Tientallen' },
        { value: 'hundreds', label: 'Honderdtallen' },
      ]},
      { key: 'mulTables', label: 'Tafels', type: 'select', options: [
        { value: 'easy', label: '1, 2, 5, 10' }, { value: 'medium', label: '3, 4, 6, 7, 8, 9' },
        { value: 'all', label: '1 t/m 10' }, { value: 'hard', label: '11 en 12' },
        { value: 'expert', label: '13 t/m 20' }, { value: 'allplus', label: '1 t/m 20' },
      ]},
      { key: 'placeValueLevel', label: 'Getallen begrijpen', type: 'select', options: [
        { value: 'tens', label: 'Tientallen' }, { value: 'hundreds', label: 'Honderdtallen' },
        { value: 'thousands', label: 'Duizendtallen' },
      ]},
    ],
  },
  {
    name: 'Geld',
    emoji: '💰',
    color: 'from-yellow-500 to-amber-600',
    games: MONEY_GAMES,
    settings: [
      { key: 'moneyMaxAmount', label: 'Bedrag tot', type: 'select', options: [
        { value: 2000, label: '€20' }, { value: 10000, label: '€100' }, { value: 50000, label: '€500' },
      ]},
      { key: 'moneyIncludeCents', label: 'Met centen', type: 'toggle' },
    ],
  },
  {
    name: 'Klokkijken',
    emoji: '🕐',
    color: 'from-cyan-500 to-blue-600',
    games: [...CLOCK_GAMES, 'clock24h', 'clockWords'],
    settings: [
      { key: 'clockLevel', label: 'Niveau', type: 'select', options: [
        { value: 'hours', label: 'Hele uren' }, { value: 'halfHours', label: 'Halve uren' },
        { value: 'quarters', label: 'Kwartieren' }, { value: 'fiveMinutes', label: '5 minuten' },
        { value: 'minutes', label: '1 minuut' },
      ]},
      { key: 'clockWords', label: '💬 Woorden', type: 'toggle' },
    ],
  },
  {
    name: 'Tijdsbesef',
    emoji: '📅',
    color: 'from-orange-500 to-red-600',
    games: [...TIME_AWARENESS_GAMES, 'seizoenenMatch'],
  },
  {
    name: 'Rekenen met tijd',
    emoji: '⏱️',
    color: 'from-rose-500 to-pink-600',
    games: TIME_CALCULATION_GAMES,
    settings: [
      { key: 'timeCalcLevel', label: 'Niveau', type: 'select', options: [
        { value: 'wholeHours', label: 'Hele uren' }, { value: 'halfHours', label: 'Halve uren' },
        { value: 'quarters', label: 'Kwartieren' }, { value: 'minutes', label: 'Minuten' },
        { value: 'daysWeeks', label: 'Dagen & weken' },
      ]},
    ],
  },
  {
    name: 'Spelling',
    emoji: '✏️',
    color: 'from-purple-500 to-violet-600',
    games: SPELLING_GAMES,
    settings: [
      { key: 'spellingCategories', label: 'Categorieën', type: 'multiSelect', options: [
        { value: 1, label: '✂️ Hak' }, { value: 2, label: '🎵 Zing' },
        { value: 3, label: '💨 Lucht' }, { value: 4, label: '🪵 Plank' },
        { value: 5, label: '🔤 Eer-oor' }, { value: 6, label: '🌈 Aai-ooi' },
        { value: 7, label: '✨ Eeuw' }, { value: 8, label: '📏 Langer' },
      ]},
    ],
  },
  {
    name: 'Woordenschat',
    emoji: '📚',
    color: 'from-emerald-500 to-teal-600',
    games: VOCABULARY_GAMES,
  },
  {
    name: 'Begrijpend lezen',
    emoji: '📖',
    color: 'from-amber-500 to-orange-600',
    games: READING_GAMES,
    settings: [
      { key: 'readingLevel', label: 'Niveau', type: 'select', options: [
        { value: 'short', label: 'Kort (1-2 zinnen)' }, { value: 'long', label: 'Lang (3-4 zinnen)' },
      ]},
    ],
  },
  {
    name: 'Engels',
    emoji: '🇬🇧',
    color: 'from-red-500 to-rose-600',
    games: ENGLISH_GAMES.concat(['englishTypeWord', 'englishFillIn']),
    settings: [
      { key: 'englishLevel', label: 'Niveau', type: 'select', options: [
        { value: 'easy', label: 'Makkelijk' }, { value: 'medium', label: 'Gemiddeld' },
        { value: 'hard', label: 'Moeilijk' },
      ]},
      { key: 'englishDirection', label: 'Richting', type: 'select', options: [
        { value: 'nl-en', label: 'NL → EN' }, { value: 'en-nl', label: 'EN → NL' },
        { value: 'both', label: 'Beide' },
      ]},
    ],
  },
  {
    name: 'Puzzels',
    emoji: '🧠',
    color: 'from-violet-500 to-fuchsia-600',
    games: PUZZLE_GAMES,
    settings: [
      { key: 'puzzleLevel', label: 'Niveau', type: 'select', options: [
        { value: 'easy', label: 'Makkelijk' }, { value: 'medium', label: 'Gemiddeld' },
        { value: 'hard', label: 'Moeilijk' },
      ]},
      { key: 'chessLevel', label: 'Schaakmat in', type: 'select', options: [
        { value: 'easy', label: '1 zet' }, { value: 'medium', label: '2 zetten' },
        { value: 'hard', label: '3 zetten' },
      ]},
    ],
  },
];

// Full mathSettings that enables everything, so every minigame works
const PREVIEW_SETTINGS = {
  enabledOperations: {
    add: true, sub: true, mul: true, div: true,
    placeValue: true, lovingHearts: true, money: true, clock: true,
    spelling: true, vocabulary: true, reading: true, english: true,
    timeAwareness: true, timeCalculation: true,
    sudoku: true, tectonic: true, binary: true, chess: true,
  },
  maxValue: 100,
  mulTables: 'easy',
  addSubMode: 'beyond',
  beyondDigits: 'units',
  placeValueLevel: 'tens',
  moneyMaxAmount: 2000,
  moneyIncludeCents: false,
  clockLevel: 'halfHours',
  clock24h: true,
  clockWords: true,
  spellingCategories: [1, 2, 3, 4, 5, 6, 7, 8],
  includeThemeVocabulary: false,
  readingLevel: 'short',
  includeThemeReading: false,
  englishLevel: 'easy',
  englishDirection: 'both',
  timeAwarenessDagen: true,
  timeAwarenessMaanden: true,
  timeAwarenessSeizoen: true,
  timeCalcLevel: 'wholeHours',
  timeCalc24h: false,
  timeCalculationVooruit: true,
  timeCalculationTerug: true,
  timeCalculationDuur: true,
  timeCalculationOmrekenen: true,
  timeCalculationKlok: true,
  puzzleLevel: { sudoku: 'easy', tectonic: 'easy', binary: 'easy', chess: 'easy' },
};

function MinigamePreview() {
  const navigate = useNavigate();
  const theme = getTheme('space');
  const [activeGame, setActiveGame] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [key, setKey] = useState(0); // force re-mount on retry
  const [overrides, setOverrides] = useState({});

  const updateOverride = (categoryName, settingKey, value) => {
    setOverrides((prev) => ({
      ...prev,
      [categoryName]: {
        ...(prev[categoryName] || {}),
        [settingKey]: value,
      },
    }));
  };

  const getSettingValue = (categoryName, settingKey) =>
    overrides[categoryName]?.[settingKey] ?? PREVIEW_SETTINGS[settingKey];

  const getSettings = (categoryName) => {
    const merged = { ...PREVIEW_SETTINGS, ...(overrides[categoryName] || {}) };
    // Map chess-specific override into puzzleLevel object
    if (merged.chessLevel) {
      merged.puzzleLevel = { ...merged.puzzleLevel, chess: merged.chessLevel };
    }
    return merged;
  };

  const openGame = (gameType, categoryName) => {
    setActiveGame(gameType);
    setActiveCategory(categoryName);
    setKey((k) => k + 1);
  };

  const closeGame = () => {
    setActiveGame(null);
  };

  const handleSuccess = () => {
    // Short delay so user sees the success state, then close
    setTimeout(() => closeGame(), 1500);
  };

  const handleFailure = () => {
    // No-op, let the minigame handle retries internally
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 sm:px-8 py-6 sm:py-8 shadow-lg">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold">🎮 Minigame Overzicht</h1>
            <p className="text-white/80 text-sm sm:text-base mt-1">
              Test alle minigames — klik op een spel om het uit te proberen
            </p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8">
        {CATEGORIES.map((category) => (
          <div key={category.name} className="bg-white rounded-2xl shadow-md overflow-hidden">
            {/* Category header */}
            <div className={`bg-gradient-to-r ${category.color} px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-2 sm:gap-3`}>
              <span className="text-2xl sm:text-3xl">{category.emoji}</span>
              <h2 className="text-lg sm:text-2xl font-bold text-white">{category.name}</h2>
              <span className="text-white/70 text-xs sm:text-sm ml-auto">{category.games.length} spellen</span>
            </div>

            {/* Settings bar */}
            {category.settings && category.settings.length > 0 && (
              <div className="px-3 sm:px-5 py-2 sm:py-2.5 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1.5 sm:gap-y-2">
                <span className="text-slate-400 text-xs">⚙️</span>
                {category.settings.map((setting) => {
                  const value = getSettingValue(category.name, setting.key);
                  if (setting.type === 'select') {
                    return (
                      <label key={setting.key} className="flex items-center gap-1 sm:gap-1.5">
                        <span className="text-slate-500 font-medium text-xs">{setting.label}:</span>
                        <select
                          value={value}
                          onChange={(e) => {
                            const raw = e.target.value;
                            const parsed = setting.options.some((o) => typeof o.value === 'number')
                              ? Number(raw) : raw;
                            updateOverride(category.name, setting.key, parsed);
                          }}
                          className="bg-white border border-slate-200 rounded-lg px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        >
                          {setting.options.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </label>
                    );
                  }
                  if (setting.type === 'toggle') {
                    return (
                      <label key={setting.key} className="flex items-center gap-1 sm:gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!value}
                          onChange={(e) => updateOverride(category.name, setting.key, e.target.checked)}
                          className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-300 w-3.5 h-3.5"
                        />
                        <span className="text-slate-500 font-medium text-xs">{setting.label}</span>
                      </label>
                    );
                  }
                  if (setting.type === 'multiSelect') {
                    const currentArr = Array.isArray(value) ? value : [];
                    return (
                      <div key={setting.key} className="flex flex-wrap items-center gap-1">
                        <span className="text-slate-500 font-medium text-xs mr-0.5">{setting.label}:</span>
                        {setting.options.map((opt) => {
                          const active = currentArr.includes(opt.value);
                          return (
                            <button
                              key={opt.value}
                              onClick={() => {
                                const next = active
                                  ? currentArr.filter((v) => v !== opt.value)
                                  : [...currentArr, opt.value];
                                if (next.length > 0) updateOverride(category.name, setting.key, next);
                              }}
                              className={`px-1.5 sm:px-2 py-0.5 rounded-full text-xs font-medium transition-colors ${
                                active
                                  ? 'bg-purple-100 text-purple-700 border border-purple-300'
                                  : 'bg-slate-200 text-slate-400 border border-transparent'
                              }`}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            )}

            {/* Game buttons */}
            <div className="p-3 sm:p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
              {category.games.map((gameType) => {
                const name = GAME_NAMES[gameType] || gameType;
                return (
                  <button
                    key={gameType}
                    onClick={() => openGame(gameType, category.name)}
                    className="bg-slate-50 hover:bg-indigo-50 border-2 border-slate-200 hover:border-indigo-300 rounded-xl px-3 py-3 sm:py-4 text-sm sm:text-base font-medium text-gray-700 hover:text-indigo-700 transition-all text-center leading-tight"
                  >
                    {name}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Active minigame modal */}
      {activeGame && (() => {
        const GameComponent = GAME_COMPONENTS[activeGame];
        if (!GameComponent) return null;
        const gameName = GAME_NAMES[activeGame] || 'Spel';
        return (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="relative rounded-3xl shadow-2xl max-w-full sm:max-w-3xl w-full max-h-[95vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-4 sm:px-8 py-4 sm:py-6 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-4">
                    <span className="text-3xl sm:text-5xl">{theme.emoji}</span>
                    <div>
                      <h2 className="text-xl sm:text-3xl font-bold text-white drop-shadow">
                        {gameName}
                      </h2>
                      <p className="text-white/80 font-medium text-xs sm:text-base">Preview modus</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openGame(activeGame, activeCategory)}
                      className="text-white/80 hover:text-white hover:scale-110 transition-all text-lg sm:text-2xl"
                      title="Opnieuw laden"
                    >
                      🔄
                    </button>
                    <button
                      onClick={closeGame}
                      className="text-2xl sm:text-3xl text-white/80 hover:text-white hover:scale-110 transition-all"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="bg-white p-4 sm:p-8 overflow-y-auto flex-1">
                <Suspense fallback={
                  <div className="flex justify-center items-center p-8">
                    <span className="text-4xl animate-bounce">🎮</span>
                  </div>
                }>
                  <GameComponent
                    key={key}
                    mathSettings={getSettings(activeCategory)}
                    onSuccess={handleSuccess}
                    onFailure={handleFailure}
                    theme={theme}
                  />
                </Suspense>
              </div>

              {/* Bottom bar */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2" />
            </div>
          </div>
        );
      })()}
    </div>
  );
}

export default MinigamePreview;
