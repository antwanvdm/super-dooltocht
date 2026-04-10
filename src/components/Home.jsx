import { useState, useEffect, useReducer, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTheme } from '../utils/themes';
import { getCompletedMazes, getSavedFriends, getGameState, clearGameState, getUserSettings, saveUserSettings } from '../utils/localStorage';
import { useSyncToServer } from '../hooks/useSyncToServer';
import { useAudio, AUDIO_FEATURE_ENABLED } from '../context/AudioProvider';
import RekenPanel from './home/RekenPanel';
import TijdPanel from './home/TijdPanel';
import TaalPanel from './home/TaalPanel';
import PuzzelPanel from './home/PuzzelPanel';
import AdventureLengthPicker from './home/AdventureLengthPicker';
import EmojiPicker from './home/EmojiPicker';
import ThemeSelector from './home/ThemeSelector';
import ContinueModal from './home/ContinueModal';

const PLAYER_EMOJIS = [
  '🤖','🧙','🧚','🧜','🧛','🧞','🧟','🧝','🧞‍♂️','🧚‍♀️','🧜‍♂️','🧙‍♂️',
  '🤠','🏴‍☠️','🦸','🦹','🧑‍🚀','🧑‍✈️','🧑‍🚒','🤹','🏊','🤿','🚴','🏇'
];

// Default settings used when no saved settings exist
const DEFAULT_SETTINGS = {
  exerciseCategory: 'rekenen',
  ops: { add: false, sub: false, mul: false, div: false, placeValue: false, lovingHearts: false, money: false, fractions: false },
  maxValue: 100,
  mulTables: 'easy',
  addSubMode: 'beyond',
  beyondDigits: 'units',
  placeValueLevel: 'tens',
  moneyMaxAmount: 2000,
  moneyIncludeCents: false,
  tijdOps: { clock: true, timeAwareness: false, timeCalculation: false },
  clockLevel: 'hours',
  clock24h: false,
  clockWords: false,
  timeAwarenessDagen: true,
  timeAwarenessMaanden: true,
  timeAwarenessSeizoen: true,
  timeCalcLevel: 'wholeHours',
  timeCalc24h: false,
  taalOps: { spelling: false, vocabulary: false, reading: false, english: false, rijmen: false, woordsoorten: false },
  spellingCategories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  includeThemeVocabulary: true,
  includeThemeReading: true,
  readingLevel: 'short',
  englishLevel: 'easy',
  englishDirection: 'nl-en',
  rijmenLevel: 'easy',
  woordsoortenLevel: 'easy',
  fractionLevel: 'easy',
  puzzelOps: { sudoku: true, tectonic: true, binary: true, chess: false },
  puzzleLevel: { sudoku: 'easy', tectonic: 'easy', binary: 'easy', chess: 'easy' },
  chessThemes: ['mateIn1'],
  adventureLength: 'medium',
  playerEmoji: PLAYER_EMOJIS[0],
  musicEnabled: false,
};

const VALID_CHESS_THEMES = new Set([
  'mateIn1', 'mateIn2', 'mateIn3', 'mateIn4',
  'fork', 'pin', 'hangingPiece', 'skewer',
  'discoveredAttack', 'sacrifice', 'castling',
  'promotion', 'trappedPiece', 'enPassant',
]);

// Sanitize a saved game's mathSettings (maze-format) without reshaping it.
// Only strips invalid chess themes; leaves all other fields untouched.
const sanitizeSavedMathSettings = (ms) => {
  if (!ms) return ms;
  if (!ms.chessThemes) return ms;
  const filtered = ms.chessThemes.filter(t => VALID_CHESS_THEMES.has(t));
  return { ...ms, chessThemes: filtered.length > 0 ? filtered : ['mateIn1'] };
};

// Build initial state from saved settings, using defaults for missing values.
// Uses nullish coalescing (??) for booleans that can be false, || for the rest.
const buildInitialSettings = (saved) => ({
  exerciseCategory: saved?.exerciseCategory || DEFAULT_SETTINGS.exerciseCategory,
  ops: saved?.ops || DEFAULT_SETTINGS.ops,
  maxValue: saved?.maxValue || DEFAULT_SETTINGS.maxValue,
  mulTables: saved?.mulTables || DEFAULT_SETTINGS.mulTables,
  addSubMode: saved?.addSubMode || DEFAULT_SETTINGS.addSubMode,
  beyondDigits: saved?.beyondDigits || DEFAULT_SETTINGS.beyondDigits,
  placeValueLevel: saved?.placeValueLevel || DEFAULT_SETTINGS.placeValueLevel,
  moneyMaxAmount: saved?.moneyMaxAmount || DEFAULT_SETTINGS.moneyMaxAmount,
  moneyIncludeCents: saved?.moneyIncludeCents ?? DEFAULT_SETTINGS.moneyIncludeCents,
  tijdOps: saved?.tijdOps || DEFAULT_SETTINGS.tijdOps,
  clockLevel: saved?.clockLevel || DEFAULT_SETTINGS.clockLevel,
  clock24h: saved?.clock24h ?? DEFAULT_SETTINGS.clock24h,
  clockWords: saved?.clockWords ?? DEFAULT_SETTINGS.clockWords,
  timeAwarenessDagen: saved?.timeAwarenessDagen ?? DEFAULT_SETTINGS.timeAwarenessDagen,
  timeAwarenessMaanden: saved?.timeAwarenessMaanden ?? DEFAULT_SETTINGS.timeAwarenessMaanden,
  timeAwarenessSeizoen: saved?.timeAwarenessSeizoen ?? DEFAULT_SETTINGS.timeAwarenessSeizoen,
  timeCalcLevel: saved?.timeCalcLevel || DEFAULT_SETTINGS.timeCalcLevel,
  timeCalc24h: saved?.timeCalc24h ?? DEFAULT_SETTINGS.timeCalc24h,
  taalOps: saved?.taalOps || DEFAULT_SETTINGS.taalOps,
  spellingCategories: saved?.spellingCategories || DEFAULT_SETTINGS.spellingCategories,
  includeThemeVocabulary: saved?.includeThemeVocabulary ?? DEFAULT_SETTINGS.includeThemeVocabulary,
  includeThemeReading: saved?.includeThemeReading ?? DEFAULT_SETTINGS.includeThemeReading,
  readingLevel: saved?.readingLevel || DEFAULT_SETTINGS.readingLevel,
  englishLevel: saved?.englishLevel || DEFAULT_SETTINGS.englishLevel,
  englishDirection: saved?.englishDirection || DEFAULT_SETTINGS.englishDirection,
  rijmenLevel: saved?.rijmenLevel || DEFAULT_SETTINGS.rijmenLevel,
  woordsoortenLevel: saved?.woordsoortenLevel || DEFAULT_SETTINGS.woordsoortenLevel,
  fractionLevel: saved?.fractionLevel || DEFAULT_SETTINGS.fractionLevel,
  puzzelOps: saved?.puzzelOps || DEFAULT_SETTINGS.puzzelOps,
  puzzleLevel: saved?.puzzleLevel || DEFAULT_SETTINGS.puzzleLevel,
  chessThemes: (saved?.chessThemes || DEFAULT_SETTINGS.chessThemes).filter(t => VALID_CHESS_THEMES.has(t)),
  adventureLength: saved?.adventureLength || DEFAULT_SETTINGS.adventureLength,
  playerEmoji: saved?.playerEmoji || DEFAULT_SETTINGS.playerEmoji,
  musicEnabled: saved?.musicEnabled ?? DEFAULT_SETTINGS.musicEnabled,
});

function settingsReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'TOGGLE_OPS':
      return { ...state, ops: { ...state.ops, [action.key]: !state.ops[action.key] } };
    case 'TOGGLE_TIJD_OPS':
      return { ...state, tijdOps: { ...state.tijdOps, [action.key]: !state.tijdOps[action.key] } };
    case 'TOGGLE_TAAL_OPS':
      return { ...state, taalOps: { ...state.taalOps, [action.key]: !state.taalOps[action.key] } };
    case 'TOGGLE_PUZZEL_OPS':
      return { ...state, puzzelOps: { ...state.puzzelOps, [action.key]: !state.puzzelOps[action.key] } };
    case 'SET_PUZZLE_LEVEL': {
      const next = { ...state, puzzleLevel: { ...state.puzzleLevel, [action.key]: action.value } };
      // Auto-remove hard-only chess themes when level drops below hard
      if (action.key === 'chess' && action.value !== 'hard' && action.value !== 'wizard') {
        next.chessThemes = state.chessThemes.filter(t => t !== 'castling' && t !== 'enPassant');
      }
      return next;
    }
    case 'TOGGLE_CHESS_THEME': {
      const active = state.chessThemes.includes(action.theme);
      return {
        ...state,
        chessThemes: active
          ? state.chessThemes.filter(t => t !== action.theme)
          : [...state.chessThemes, action.theme],
      };
    }
    case 'TOGGLE_SPELLING_CATEGORY': {
      const active = state.spellingCategories.includes(action.id);
      return {
        ...state,
        spellingCategories: active
          ? state.spellingCategories.filter(c => c !== action.id)
          : [...state.spellingCategories, action.id],
      };
    }

    default:
      return state;
  }
}

function Home({ disabled = false }) {
  const navigate = useNavigate();
  const { syncProgress } = useSyncToServer();
  const { musicEnabled: audioEnabled, setMusicEnabled: setAudioEnabled } = useAudio();
  const completedMazes = getCompletedMazes();
  const savedFriends = getSavedFriends();
  
  // All user settings managed by a single reducer
  const [settings, dispatch] = useReducer(
    settingsReducer,
    getUserSettings(),
    buildInitialSettings,
  );

  // Convenience aliases so the JSX can stay readable
  const {
    exerciseCategory, ops, maxValue, mulTables, addSubMode, beyondDigits,
    placeValueLevel, moneyMaxAmount, moneyIncludeCents, tijdOps, clockLevel,
    clock24h, clockWords, timeAwarenessDagen, timeAwarenessMaanden,
    timeAwarenessSeizoen, timeCalcLevel, timeCalc24h, taalOps,
    spellingCategories, includeThemeVocabulary, includeThemeReading,
    readingLevel, englishLevel, englishDirection, rijmenLevel,
    woordsoortenLevel, fractionLevel, puzzelOps, puzzleLevel, chessThemes,
    adventureLength, playerEmoji,
    musicEnabled,
  } = settings;

  // Shorthand dispatch helpers for the JSX
  const set = useCallback((field, value) => dispatch({ type: 'SET_FIELD', field, value }), []);

  const [selectedTheme, setSelectedTheme] = useState(null);
  const [continueModal, setContinueModal] = useState(null);

  // Save settings whenever they change
  useEffect(() => {
    saveUserSettings(settings);
  }, [settings]);

  // Sync musicEnabled setting with AudioProvider
  useEffect(() => {
    if (musicEnabled !== audioEnabled) {
      setAudioEnabled(musicEnabled);
    }
  }, [musicEnabled]);

  // Check voor opgeslagen spel bij laden
  useEffect(() => {
    const savedGame = getGameState();
    if (savedGame && savedGame.themeId) {
      const theme = getTheme(savedGame.themeId);
      setContinueModal({
        themeId: savedGame.themeId,
        themeName: theme?.name || savedGame.themeId,
        themeEmoji: theme?.emoji || '🎮',
        completedCount: savedGame.completedCount || 0,
        collectedFriends: savedGame.collectedFriends?.length || 0,
        mathSettings: sanitizeSavedMathSettings(savedGame.mathSettings),
        playerEmoji: savedGame.playerEmoji,
        adventureLength: savedGame.adventureLength || 'medium',
      });
    }
  }, []);

  // Lock body scroll when continue modal is open
  useEffect(() => {
    if (!continueModal) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [continueModal]);

  const continueGame = () => {
    if (continueModal) {
      navigate(`/maze/${continueModal.themeId}`, {
        state: {
          mathSettings: continueModal.mathSettings,
          playerEmoji: continueModal.playerEmoji,
          adventureLength: continueModal.adventureLength,
        },
      });
    }
  };

  const startNewGame = () => {
    clearGameState();
    setContinueModal(null);
    // Sync de gewiste game state naar server
    setTimeout(() => syncProgress(), 100);
  };

  const startMaze = () => {
    if (!selectedTheme || !canStart) return;
    // Als er een saved game is voor een ander thema, wis die
    const savedGame = getGameState();
    if (savedGame && savedGame.themeId !== selectedTheme) {
      clearGameState();
    }
    let mathSettings;
    if (exerciseCategory === 'tijd') {
      mathSettings = {
        enabledOperations: { add: false, sub: false, mul: false, div: false, placeValue: false, lovingHearts: false, money: false, fractions: false, clock: tijdOps.clock, timeAwareness: tijdOps.timeAwareness, timeCalculation: tijdOps.timeCalculation },
        clockLevel,
        clock24h,
        clockWords,
        timeAwarenessDagen,
        timeAwarenessMaanden,
        timeAwarenessSeizoen,
        timeCalcLevel,
        timeCalc24h,
      };
    } else if (exerciseCategory === 'taal') {
      mathSettings = {
        enabledOperations: { ...taalOps, add: false, sub: false, mul: false, div: false, placeValue: false, lovingHearts: false, money: false, fractions: false, clock: false },
        spellingCategories,
        includeThemeVocabulary,
        includeThemeReading,
        readingLevel,
        englishLevel,
        englishDirection,
        rijmenLevel,
        woordsoortenLevel,
        themeId: selectedTheme,
      };
    } else if (exerciseCategory === 'puzzel') {
      mathSettings = {
        enabledOperations: { ...puzzelOps, add: false, sub: false, mul: false, div: false, placeValue: false, lovingHearts: false, money: false, fractions: false, clock: false, spelling: false, vocabulary: false, reading: false, english: false },
        puzzleLevel,
        chessThemes,
      };
    } else {
      mathSettings = {
        enabledOperations: ops,
        maxValue: Number(maxValue),
        mulTables: mulTables,
        addSubMode: addSubMode,
        beyondDigits: beyondDigits,
        placeValueLevel: placeValueLevel,
        moneyMaxAmount: moneyMaxAmount,
        moneyIncludeCents: moneyIncludeCents,
        fractionLevel: fractionLevel,
      };
    }

    navigate(`/maze/${selectedTheme}`, {
      state: {
        mathSettings,
        playerEmoji,
        adventureLength,
      },
    });
  };

  const canStart = exerciseCategory === 'tijd' && (tijdOps.clock || (tijdOps.timeAwareness && (timeAwarenessDagen || timeAwarenessMaanden || timeAwarenessSeizoen)) || tijdOps.timeCalculation)
    || exerciseCategory === 'taal' && (taalOps.spelling || taalOps.vocabulary || taalOps.reading || taalOps.english || taalOps.rijmen || taalOps.woordsoorten)
    || exerciseCategory === 'puzzel' && (puzzelOps.sudoku || puzzelOps.tectonic || puzzelOps.binary || puzzelOps.chess)
    || exerciseCategory === 'rekenen' && (ops.add || ops.sub || ops.mul || ops.div || ops.placeValue || ops.lovingHearts || ops.money || ops.fractions);
  const canLaunch = canStart && selectedTheme;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center py-12 px-4">
      {/* Decorative floating shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-300/30 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-40 right-20 w-40 h-40 bg-cyan-300/30 rounded-full blur-2xl animate-pulse delay-700" />
        <div className="absolute bottom-32 left-1/4 w-36 h-36 bg-pink-300/30 rounded-full blur-2xl animate-pulse delay-300" />
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-green-300/30 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        {/* Hero Header */}
        <header className="text-center mb-8 sm:mb-12">
          <div className="mb-4 sm:mb-6">
            <span className="text-5xl sm:text-6xl">🦸🧩🕹️</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4 sm:mb-5 px-4">
            Super Dooltocht!
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-medium mb-6 sm:mb-8 px-4">
            Ontdek werelden, los uitdagingen op, red je vriendjes en vind de uitgang!
          </p>
          
          {/* Stats badges */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 px-4">
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/20 backdrop-blur-md rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-white/30">
              <span className="text-2xl sm:text-3xl">🏆</span>
              <span className="text-base sm:text-lg md:text-xl text-white font-bold">
                {completedMazes} {completedMazes === 1 ? 'doolhof' : 'doolhoven'} voltooid
              </span>
            </div>
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/20 backdrop-blur-md rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-white/30">
              <span className="text-2xl sm:text-3xl">🤝</span>
              <span className="text-base sm:text-lg md:text-xl text-white font-bold">
                {savedFriends} vriendje{savedFriends !== 1 ? 's' : ''} gered
              </span>
            </div>
          </div>
        </header>

        {/* Settings Card */}
        <section className="bg-white rounded-3xl shadow-2xl p-5 sm:p-10 md:p-12 border-4 border-white/50">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-10">
            <span className="text-4xl sm:text-5xl">⚙️</span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Stel je avontuur in</h2>
          </div>

          {/* Category Tabs */}
          <div className="grid grid-cols-4 gap-2 sm:flex sm:justify-center sm:gap-3 mb-6 sm:mb-8">
            {[
              { key: 'rekenen', label: 'Rekenen', icon: '🔢', disabled: false },
              { key: 'tijd', label: 'Tijd', icon: '⏰', disabled: false },
              { key: 'taal', label: 'Taal', icon: '📝', disabled: false },
              { key: 'puzzel', label: 'Puzzels', icon: '🧠', disabled: false },
            ].map(({ key, label, icon, disabled: tabDisabled }) => (
              <button
                key={key}
                onClick={() => !tabDisabled && set('exerciseCategory', key)}
                disabled={tabDisabled}
                className={`flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-4 rounded-xl font-bold text-xs sm:text-lg transition-all min-w-0 ${
                  tabDisabled
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                    : exerciseCategory === key
                      ? 'bg-indigo-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-300'
                }`}
              >
                <span className="text-xl sm:text-2xl">{icon}</span>
                <span>{label}</span>
                {tabDisabled && <span className="text-[10px] sm:text-xs">(binnenkort)</span>}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 mb-8 sm:mb-12">
            {exerciseCategory === 'rekenen' && <RekenPanel settings={settings} dispatch={dispatch} set={set} canStart={canStart} />}
            {exerciseCategory === 'tijd' && <TijdPanel settings={settings} dispatch={dispatch} set={set} />}
            {exerciseCategory === 'taal' && <TaalPanel settings={settings} dispatch={dispatch} set={set} />}
            {exerciseCategory === 'puzzel' && <PuzzelPanel settings={settings} dispatch={dispatch} />}

            <AdventureLengthPicker adventureLength={adventureLength} set={set} />
            <EmojiPicker playerEmoji={playerEmoji} set={set} emojis={PLAYER_EMOJIS} />
          </div>

          <ThemeSelector selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} />

          {/* Audio toggle */}
          {AUDIO_FEATURE_ENABLED && (
            <div className="flex justify-center mb-6">
              <button
                onClick={() => set('musicEnabled', !musicEnabled)}
                className={`flex items-center gap-2 sm:gap-3 px-5 sm:px-6 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all border-2 ${
                  musicEnabled
                    ? 'bg-green-100 border-green-400 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 border-gray-300 text-gray-500 hover:bg-gray-200'
                }`}
                aria-label={musicEnabled ? 'Geluid uitzetten' : 'Geluid aanzetten'}
              >
                <span className="text-2xl">{musicEnabled ? '🔊' : '🔇'}</span>
                <span>{musicEnabled ? 'Geluid aan' : 'Geluid uit'}</span>
              </button>
            </div>
          )}

          {/* Start Button */}
          <div className="text-center pt-4">
            <button
              onClick={startMaze}
              disabled={!canLaunch}
              className={`w-full sm:w-auto px-6 sm:px-12 py-3 sm:py-5 text-base sm:text-2xl font-bold rounded-2xl transition-all duration-300 ${
                canLaunch
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-xl hover:shadow-2xl hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {canLaunch ? '🚀 Start avontuur!' : canStart ? '👆 Kies eerst een wereld' : '👆 Kies oefening en wereld'}
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center mt-6 sm:mt-10 space-y-4 sm:space-y-5 pb-4">
          <div className="inline-flex items-center gap-2 sm:gap-4 bg-white/10 backdrop-blur-md rounded-full px-4 sm:px-8 py-2 sm:py-4 border border-white/20">
            <span className="text-xl sm:text-3xl">💪</span>
            <p className="text-sm sm:text-lg text-white font-medium">
              Elke uitdaging is een goede oefening!
            </p>
            <span className="text-xl sm:text-3xl">🧠</span>
          </div>
          <div className="max-w-md mx-auto px-4">
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Gemaakt door een vader die vond dat kinderen beter verdienen dan educatieve apps vol reclame en trackers. 
              Dit spel is gratis, advertentievrij en open source.
            </p>
            <a
              href="https://github.com/antwanvdm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-2 text-xs sm:text-sm text-white/50 hover:text-white/80 transition-colors"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              antwanvdm
            </a>
          </div>
        </footer>
      </div>

      <ContinueModal
        continueModal={continueModal}
        onContinue={continueGame}
        onStartNew={startNewGame}
      />
    </div>
  );
}

export default Home;
