import { useState, useEffect, useReducer, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { THEMES, getTheme } from '../utils/themes';
import { getCompletedMazes, getSavedFriends, getGameState, clearGameState, getUserSettings, saveUserSettings } from '../utils/localStorage';
import { useSyncToServer } from '../hooks/useSyncToServer';

const PLAYER_EMOJIS = [
  '🤖','🧙','🧚','🧜','🧛','🧞','🧟','🧝','🧞‍♂️','🧚‍♀️','🧜‍♂️','🧙‍♂️',
  '🤠','🏴‍☠️','🦸','🦹','🧑‍🚀','🧑‍✈️','🧑‍🚒','🤹','🏊','🤿','🚴','🏇'
];

// Default settings used when no saved settings exist
const DEFAULT_SETTINGS = {
  exerciseCategory: 'rekenen',
  ops: { add: false, sub: false, mul: false, div: false, placeValue: false, lovingHearts: false, money: false },
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
  taalOps: { spelling: false, vocabulary: false, reading: false, english: false },
  spellingCategories: [1, 2, 3, 4, 5, 6, 7, 8],
  includeThemeVocabulary: true,
  includeThemeReading: true,
  readingLevel: 'short',
  englishLevel: 'easy',
  englishDirection: 'nl-en',
  adventureLength: 'medium',
  playerEmoji: PLAYER_EMOJIS[0],
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
  adventureLength: saved?.adventureLength || DEFAULT_SETTINGS.adventureLength,
  playerEmoji: saved?.playerEmoji || DEFAULT_SETTINGS.playerEmoji,
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
    readingLevel, englishLevel, englishDirection, adventureLength, playerEmoji,
  } = settings;

  // Shorthand dispatch helpers for the JSX
  const set = useCallback((field, value) => dispatch({ type: 'SET_FIELD', field, value }), []);

  const [selectedTheme, setSelectedTheme] = useState(null);
  const [continueModal, setContinueModal] = useState(null);

  // Save settings whenever they change
  useEffect(() => {
    saveUserSettings(settings);
  }, [settings]);

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
        mathSettings: savedGame.mathSettings,
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
        enabledOperations: { add: false, sub: false, mul: false, div: false, placeValue: false, lovingHearts: false, money: false, clock: tijdOps.clock, timeAwareness: tijdOps.timeAwareness, timeCalculation: tijdOps.timeCalculation },
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
        enabledOperations: { ...taalOps, add: false, sub: false, mul: false, div: false, placeValue: false, lovingHearts: false, money: false, clock: false },
        spellingCategories,
        includeThemeVocabulary,
        includeThemeReading,
        readingLevel,
        englishLevel,
        englishDirection,
        themeId: selectedTheme,
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
    || exerciseCategory === 'taal' && (taalOps.spelling || taalOps.vocabulary || taalOps.reading || taalOps.english)
    || exerciseCategory === 'rekenen' && (ops.add || ops.sub || ops.mul || ops.div || ops.placeValue || ops.lovingHearts || ops.money);
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
                {completedMazes} doolhof{completedMazes !== 1 ? 'hoven' : ''} voltooid
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
          <div className="grid grid-cols-3 gap-2 sm:flex sm:justify-center sm:gap-3 mb-6 sm:mb-8">
            {[
              { key: 'rekenen', label: 'Rekenen', icon: '🔢', disabled: false },
              { key: 'tijd', label: 'Tijd', icon: '🕐', disabled: false },
              { key: 'taal', label: 'Taal', icon: '📝', disabled: false },
            ].map(({ key, label, icon, disabled }) => (
              <button
                key={key}
                onClick={() => !disabled && set('exerciseCategory', key)}
                disabled={disabled}
                className={`flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-4 rounded-xl font-bold text-xs sm:text-lg transition-all min-w-0 ${
                  disabled
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                    : exerciseCategory === key
                      ? 'bg-indigo-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-300'
                }`}
              >
                <span className="text-xl sm:text-2xl">{icon}</span>
                <span>{label}</span>
                {disabled && <span className="text-[10px] sm:text-xs">(binnenkort)</span>}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 mb-8 sm:mb-12">
            {/* Operations - Rekenen */}
            {exerciseCategory === 'rekenen' && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 sm:p-7 border-2 border-blue-100">
              <h3 className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg font-bold text-gray-700 mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl">🔢</span> Soort oefening
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {[  
                  { key: 'add', label: 'Plussommen', icon: '➕' },
                  { key: 'sub', label: 'Minsommen', icon: '➖' },
                  { key: 'mul', label: 'Keersommen', icon: '✖️' },
                  { key: 'div', label: 'Deelsommen', icon: '➗' },
                  { key: 'placeValue', label: 'Getallen begrijpen', icon: '🧮' },
                  { key: 'lovingHearts', label: 'Verliefde harten', icon: '💕' },
                  { key: 'money', label: 'Rekenen met geld', icon: '💶' },
                ].map(({ key, label, icon }) => (
                  <label
                    key={key}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                      ops[key]
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={ops[key]}
                      onChange={() => dispatch({ type: 'TOGGLE_OPS', key })}
                      className="sr-only"
                    />
                    <span className="text-xl">{icon}</span>
                    <span className="font-semibold">{label}</span>
                    {ops[key] && <span className="ml-auto text-xl">✓</span>}
                  </label>
                ))}
              </div>
              {!canStart && (
                <p className="mt-4 text-sm text-red-500 font-medium text-center">
                  ⚠️ Kies minstens één soort oefening
                </p>
              )}
            </div>
            )}

            {/* Soort oefening - Tijd */}
            {exerciseCategory === 'tijd' && (
            <div className="bg-gradient-to-br from-sky-50 to-cyan-50 rounded-2xl p-4 sm:p-7 border-2 border-sky-100">
              <h3 className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg font-bold text-gray-700 mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl">🕐</span> Soort oefening
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { key: 'clock', label: 'Klokkijken', icon: '🕐', desc: 'Analoge en digitale klok aflezen' },
                  { key: 'timeAwareness', label: 'Tijdsbesef', icon: '📅', desc: 'Dagen, maanden en seizoenen' },
                  { key: 'timeCalculation', label: 'Rekenen met tijd', icon: '⏱️', desc: 'Tijd optellen, aftrekken en omrekenen' },
                ].map(({ key, label, icon, desc }) => (
                  <label
                    key={key}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                      tijdOps[key]
                        ? 'bg-sky-500 text-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-sky-50 border border-gray-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={tijdOps[key]}
                      onChange={() => dispatch({ type: 'TOGGLE_TIJD_OPS', key })}
                      className="sr-only"
                    />
                    <span className="text-xl">{icon}</span>
                    <div className="min-w-0">
                      <span className="font-semibold">{label}</span>
                      <span className={`block text-xs mt-0.5 ${tijdOps[key] ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
                    </div>
                    {tijdOps[key] && <span className="ml-auto text-xl">✓</span>}
                  </label>
                ))}
              </div>
              {!tijdOps.clock && !tijdOps.timeAwareness && !tijdOps.timeCalculation && (
                <p className="mt-4 text-sm text-red-500 font-medium text-center">
                  ⚠️ Kies minstens één soort oefening
                </p>
              )}
            </div>
            )}

            {/* Level - only for rekenen */}
            {exerciseCategory === 'rekenen' && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-7 border-2 border-green-100">
              <h3 className="flex items-center gap-3 text-lg font-bold text-gray-700 mb-6">
                <span className="text-2xl">📊</span> Niveau
              </h3>
              
              {/* Plus/Min niveau - alleen zichtbaar als plus of min aan staat */}
              {(ops.add || ops.sub) && (
                <>
                  <p className="text-sm font-medium text-gray-600 mb-3">{ops.add && ops.sub ? '➕➖' : ops.add ? '➕' : '➖'} {ops.add && ops.sub ? 'Plus- & minsommen' : ops.add ? 'Plussommen' : 'Minsommen'} tot:</p>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[20, 50, 100, 200, 500, 1000].map((val) => (
                      <label
                        key={val}
                        className={`flex items-center justify-center p-2 rounded-xl cursor-pointer transition-all font-bold text-sm ${
                          Number(maxValue) === val
                            ? 'bg-green-500 text-white shadow-md'
                            : 'bg-white text-gray-700 hover:bg-green-50 border border-gray-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="level"
                          value={val}
                          checked={Number(maxValue) === val}
                          onChange={(e) => set('maxValue', Number(e.target.value))}
                          className="sr-only"
                        />
                        {val}
                      </label>
                    ))}
                  </div>
                  
                  {/* Binnen/Buiten tiental */}
                  <p className="text-sm font-medium text-gray-600 mb-2">Binnen of buiten het tiental:</p>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {[
                      { key: 'within', label: 'Binnen tiental', desc: '45+4, 56-3' },
                      { key: 'beyond', label: 'Over tiental', desc: '47+5, 52-8' },
                    ].map(({ key, label, desc }) => (
                      <label
                        key={key}
                        className={`flex flex-col p-2 rounded-lg cursor-pointer transition-all text-sm ${
                          addSubMode === key
                            ? 'bg-teal-500 text-white shadow-sm'
                            : 'bg-white text-gray-700 hover:bg-teal-50 border border-gray-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="addSubMode"
                          value={key}
                          checked={addSubMode === key}
                          onChange={(e) => set('addSubMode', e.target.value)}
                          className="sr-only"
                        />
                        <span className="font-medium">{label}</span>
                        <span className={`text-xs ${addSubMode === key ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
                      </label>
                    ))}
                  </div>
                  
                  {/* Opties voor buiten het tiental */}
                  {addSubMode === 'beyond' && (
                    <>
                      <p className="text-sm font-medium text-gray-600 mb-2">Rekenen met:</p>
                      <div className="space-y-2">
                        {[
                          { key: 'units', label: 'Alleen eenheden', desc: '78+3, 61-9' },
                          { key: 'tens', label: 'Met tientallen', desc: '78+13, 61-39' },
                          ...(maxValue >= 200 ? [{ key: 'hundreds', label: 'Met honderdtallen', desc: '178+123, 461-239' }] : []),
                        ].map(({ key, label, desc }) => (
                          <label
                            key={key}
                            className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all text-sm ${
                              beyondDigits === key
                                ? 'bg-cyan-500 text-white shadow-sm'
                                : 'bg-white text-gray-700 hover:bg-cyan-50 border border-gray-200'
                            }`}
                          >
                            <input
                              type="radio"
                              name="beyondDigits"
                              value={key}
                              checked={beyondDigits === key}
                              onChange={(e) => set('beyondDigits', e.target.value)}
                              className="sr-only"
                            />
                            <div>
                              <span className="font-medium">{label}</span>
                              <span className={`ml-2 text-xs ${beyondDigits === key ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
                            </div>
                            {beyondDigits === key && <span>✓</span>}
                          </label>
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}
              
              {/* Tafel selectie - alleen zichtbaar als keer- of deelsommen aan staat */}
              {(ops.mul || ops.div) && (
                <>
                  <p className={`text-sm font-medium text-gray-600 mb-3 ${(ops.add || ops.sub) ? 'mt-4 pt-4 border-t border-gray-300' : ''}`}>{ops.mul && ops.div ? '✖️➗' : ops.mul ? '✖️' : '➗'} {ops.mul && ops.div ? 'Keer- & deelsommen' : ops.mul ? 'Keersommen' : 'Deelsommen'} tafels:</p>
                  <div className="space-y-2">
                    {[
                      { key: 'easy', label: 'Tafels van 1, 2, 5, 10' },
                      { key: 'medium', label: 'Tafels van 3, 4, 6, 7, 8, 9' },
                      { key: 'all', label: 'Tafels van 1 t/m 10' },
                      { key: 'hard', label: 'Tafels van 11 en 12' },
                      { key: 'expert', label: 'Tafels van 13 t/m 20' },
                      { key: 'allplus', label: 'Tafels van 1 t/m 20' },
                    ].map(({ key, label }) => (
                      <label
                        key={key}
                        className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all text-sm ${
                          mulTables === key
                            ? 'bg-orange-500 text-white shadow-sm'
                            : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="mulTables"
                          value={key}
                          checked={mulTables === key}
                          onChange={(e) => set('mulTables', e.target.value)}
                          className="sr-only"
                        />
                        <span className="font-medium">{label}</span>
                        {mulTables === key && <span className="ml-auto">✓</span>}
                      </label>
                    ))}
                  </div>
                </>
              )}
              
              {/* Getallen begrijpen niveau */}
              {ops.placeValue && (
                <>
                  <p className={`text-sm font-medium text-gray-600 mb-3 ${(ops.add || ops.sub || ops.mul) ? 'mt-4 pt-4 border-t border-gray-300' : ''}`}>🧮 Getallen begrijpen niveau:</p>
                  <div className="space-y-2">
                    {[
                      { key: 'tens', label: 'Tientallen', desc: 'Getallen 10-99' },
                      { key: 'hundreds', label: 'Honderdtallen', desc: 'Getallen 100-999' },
                      { key: 'thousands', label: 'Duizendtallen', desc: 'Getallen 1000-9999' },
                    ].map(({ key, label, desc }) => (
                      <label
                        key={key}
                        className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all text-sm ${
                          placeValueLevel === key
                            ? 'bg-purple-500 text-white shadow-sm'
                            : 'bg-white text-gray-700 hover:bg-purple-50 border border-gray-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="placeValueLevel"
                          value={key}
                          checked={placeValueLevel === key}
                          onChange={(e) => set('placeValueLevel', e.target.value)}
                          className="sr-only"
                        />
                        <div>
                          <span className="font-medium">{label}</span>
                          <span className={`ml-2 text-xs ${placeValueLevel === key ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
                        </div>
                        {placeValueLevel === key && <span>✓</span>}
                      </label>
                    ))}
                  </div>
                </>
              )}
              
              {/* Verliefde harten heeft geen extra niveau opties */}
              {ops.lovingHearts && (
                <p className={`text-sm text-gray-500 italic ${(ops.add || ops.sub || ops.mul || ops.placeValue) ? 'mt-4 pt-4 border-t border-gray-300' : ''}`}>💕 Verliefde harten: oefen getallenparen die samen 10 maken</p>
              )}
              
              {/* Geld instellingen */}
              {ops.money && (
                <>
                  <p className={`text-sm font-medium text-gray-600 mb-3 ${(ops.add || ops.sub || ops.mul || ops.placeValue || ops.lovingHearts) ? 'mt-4 pt-4 border-t border-gray-300' : ''}`}>💶 Rekenen met geld:</p>
                  
                  <p className="text-xs text-gray-500 mb-2">Bedrag tot:</p>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {[
                      { key: 2000, label: 'Tot €20' },
                      { key: 10000, label: 'Tot €100' },
                      { key: 50000, label: 'Tot €500' },
                      { key: 100000, label: 'Tot €1000' },
                    ].map(({ key, label }) => (
                      <label
                        key={key}
                        className={`flex items-center justify-center p-2 rounded-lg cursor-pointer transition-all text-sm ${
                          moneyMaxAmount === key
                            ? 'bg-emerald-500 text-white shadow-sm'
                            : 'bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="moneyMaxAmount"
                          value={key}
                          checked={moneyMaxAmount === key}
                          onChange={(e) => set('moneyMaxAmount', Number(e.target.value))}
                          className="sr-only"
                        />
                        <span className="font-medium">{label}</span>
                      </label>
                    ))}
                  </div>
                  
                  <label
                    className={`flex items-center justify-center gap-3 p-2 rounded-lg cursor-pointer transition-all text-sm ${
                      moneyIncludeCents
                        ? 'bg-amber-500 text-white shadow-sm'
                        : 'bg-white text-gray-700 hover:bg-amber-50 border border-gray-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={moneyIncludeCents}
                      onChange={() => set('moneyIncludeCents', !moneyIncludeCents)}
                      className="sr-only"
                    />
                    <span className="font-medium">Met centen (5c, 10c, 20c, 50c)</span>
                    {moneyIncludeCents && <span>✓</span>}
                  </label>
                </>
              )}
              
              {/* Geen opties geselecteerd */}
              {!ops.add && !ops.sub && !ops.mul && !ops.div && !ops.placeValue && !ops.lovingHearts && !ops.money && (
                <p className="text-sm text-gray-500 italic">Kies eerst een soort som om niveau-opties te zien</p>
              )}
            </div>
            )}

            {/* Niveau/opties - Tijd */}
            {exerciseCategory === 'tijd' && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 sm:p-7 border-2 border-green-100">
              <h3 className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg font-bold text-gray-700 mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl">📊</span> Opties
              </h3>

              {/* Klokkijken niveau */}
              {tijdOps.clock && (
                <>
                  <p className="text-sm font-medium text-gray-600 mb-3">🕐 Klokkijken niveau:</p>
                  <div className="space-y-2 mb-3">
                    {[
                      { key: 'hours', label: 'Hele uren', desc: '03:00, 07:00' },
                      { key: 'halfHours', label: 'Halve uren', desc: '03:00, 03:30' },
                      { key: 'quarters', label: 'Kwartieren', desc: '03:00, 03:15, 03:30, 03:45' },
                      { key: 'fiveMinutes', label: '5 minuten', desc: '03:05, 03:10, 03:25...' },
                      { key: 'minutes', label: '1 minuut', desc: '03:07, 03:42...' },
                    ].map(({ key, label, desc }) => (
                      <label
                        key={key}
                        className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all text-sm ${
                          clockLevel === key
                            ? 'bg-green-500 text-white shadow-sm'
                            : 'bg-white text-gray-700 hover:bg-green-50 border border-gray-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="clockLevel"
                          value={key}
                          checked={clockLevel === key}
                          onChange={(e) => set('clockLevel', e.target.value)}
                          className="sr-only"
                        />
                        <div>
                          <span className="font-medium">{label}</span>
                          <span className={`ml-2 text-xs ${clockLevel === key ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
                        </div>
                        {clockLevel === key && <span>✓</span>}
                      </label>
                    ))}
                  </div>

                  <p className="text-sm font-medium text-gray-600 mb-2 mt-3">Extra opties:</p>
                  <div className="space-y-1.5 mb-3">
                    <label
                      className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all text-sm ${
                        clockWords
                          ? 'bg-sky-500 text-white shadow-sm'
                          : 'bg-white text-gray-700 hover:bg-sky-50 border border-gray-200'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={clockWords}
                        onChange={() => set('clockWords', !clockWords)}
                        className="sr-only"
                      />
                      <div>
                        <span className="font-medium">💬 Woorden</span>
                        <span className={`block text-xs mt-0.5 ${clockWords ? 'text-white/80' : 'text-gray-500'}`}>Kwart over drie, half vijf</span>
                      </div>
                      {clockWords && <span className="ml-auto">✓</span>}
                    </label>
                    <label
                      className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all text-sm ${
                        clock24h
                          ? 'bg-sky-500 text-white shadow-sm'
                          : 'bg-white text-gray-700 hover:bg-sky-50 border border-gray-200'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={clock24h}
                        onChange={() => set('clock24h', !clock24h)}
                        className="sr-only"
                      />
                      <div>
                        <span className="font-medium">🔄 24-uurs notatie</span>
                        <span className={`block text-xs mt-0.5 ${clock24h ? 'text-white/80' : 'text-gray-500'}`}>05:45 → 17:45</span>
                      </div>
                      {clock24h && <span className="ml-auto">✓</span>}
                    </label>
                  </div>
                </>
              )}

              {/* Tijdsbesef opties */}
              {tijdOps.timeAwareness && (
                <>
                  <p className={`text-sm font-medium text-gray-600 mb-3 ${tijdOps.clock ? 'mt-4 pt-4 border-t border-gray-300' : ''}`}>📅 Tijdsbesef onderwerpen:</p>
                  <div className="space-y-1.5">
                    {[
                      { key: 'dagen', label: '📅 Dagen van de week', desc: 'Volgorde, gisteren/morgen', checked: timeAwarenessDagen, onChange: () => set('timeAwarenessDagen', !timeAwarenessDagen) },
                      { key: 'maanden', label: '🗓️ Maanden van het jaar', desc: 'Volgorde, aantal dagen', checked: timeAwarenessMaanden, onChange: () => set('timeAwarenessMaanden', !timeAwarenessMaanden) },
                      { key: 'seizoenen', label: '🌿 Seizoenen', desc: 'Volgorde, kenmerken', checked: timeAwarenessSeizoen, onChange: () => set('timeAwarenessSeizoen', !timeAwarenessSeizoen) },
                    ].map(({ key, label, desc, checked, onChange }) => (
                      <label
                        key={key}
                        className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all text-sm ${
                          checked
                            ? 'bg-cyan-500 text-white shadow-sm'
                            : 'bg-white text-gray-700 hover:bg-cyan-50 border border-gray-200'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={onChange}
                          className="sr-only"
                        />
                        <div>
                          <span className="font-medium">{label}</span>
                          <span className={`block text-xs mt-0.5 ${checked ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
                        </div>
                        {checked && <span className="ml-auto">✓</span>}
                      </label>
                    ))}
                  </div>
                  {!timeAwarenessDagen && !timeAwarenessMaanden && !timeAwarenessSeizoen && (
                    <p className="text-xs text-red-500 mt-2">Kies minstens één onderwerp</p>
                  )}
                </>
              )}

              {/* Rekenen met tijd niveau */}
              {tijdOps.timeCalculation && (
                <>
                  <p className={`text-sm font-medium text-gray-600 mb-3 ${tijdOps.clock || tijdOps.timeAwareness ? 'mt-4 pt-4 border-t border-gray-300' : ''}`}>⏱️ Rekenen met tijd niveau:</p>
                  <div className="space-y-1.5">
                    {[
                      { key: 'wholeHours', label: 'Hele uren', desc: '03:00 + 2 uur' },
                      { key: 'halfHours', label: 'Halve uren', desc: '03:30 + 1,5 uur' },
                      { key: 'quarters', label: 'Kwartieren', desc: '03:15 + 45 min' },
                      { key: 'minutes', label: 'Minuten', desc: '03:22 + 20 min' },
                      { key: 'daysWeeks', label: 'Dagen & weken', desc: '2 weken = ... dagen' },
                    ].map(({ key, label, desc }) => (
                      <label
                        key={key}
                        className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all text-sm ${
                          timeCalcLevel === key
                            ? 'bg-amber-500 text-white shadow-sm'
                            : 'bg-white text-gray-700 hover:bg-amber-50 border border-gray-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="timeCalcLevel"
                          value={key}
                          checked={timeCalcLevel === key}
                          onChange={(e) => set('timeCalcLevel', e.target.value)}
                          className="sr-only"
                        />
                        <div>
                          <span className="font-medium">{label}</span>
                          <span className={`ml-2 text-xs ${timeCalcLevel === key ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
                        </div>
                        {timeCalcLevel === key && <span>✓</span>}
                      </label>
                    ))}
                  </div>

                  {timeCalcLevel !== 'daysWeeks' && (
                    <>
                      <p className="text-sm font-medium text-gray-600 mb-2 mt-3">Extra optie:</p>
                      <label
                        className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all text-sm ${
                          timeCalc24h
                            ? 'bg-amber-500 text-white shadow-sm'
                            : 'bg-white text-gray-700 hover:bg-amber-50 border border-gray-200'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={timeCalc24h}
                          onChange={() => set('timeCalc24h', !timeCalc24h)}
                          className="sr-only"
                        />
                        <div>
                          <span className="font-medium">🔄 24-uurs notatie</span>
                          <span className={`block text-xs mt-0.5 ${timeCalc24h ? 'text-white/80' : 'text-gray-500'}`}>03:00 → 15:00</span>
                        </div>
                        {timeCalc24h && <span className="ml-auto">✓</span>}
                      </label>
                    </>
                  )}
                </>
              )}

              {/* Geen opties geselecteerd */}
              {!tijdOps.clock && !tijdOps.timeAwareness && !tijdOps.timeCalculation && (
                <p className="text-sm text-gray-500 italic">Kies eerst een soort oefening om opties te zien</p>
              )}
            </div>
            )}

            {/* Soort oefening - Taal */}
            {exerciseCategory === 'taal' && (
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-4 sm:p-7 border-2 border-rose-100">
              <h3 className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg font-bold text-gray-700 mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl">📝</span> Soort oefening
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { key: 'spelling', label: 'Spelling', icon: '✏️', desc: 'Oefen spellingcategorieën' },
                  { key: 'vocabulary', label: 'Woordenschat', icon: '📖', desc: 'Leer de betekenis van woorden' },
                  { key: 'reading', label: 'Begrijpend lezen', icon: '📚', desc: 'Lees teksten en beantwoord vragen' },
                  { key: 'english', label: 'Engels', icon: '🇬🇧', desc: 'Leer Engelse woordjes' },
                ].map(({ key, label, icon, desc }) => (
                  <label
                    key={key}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                      taalOps[key]
                        ? 'bg-rose-500 text-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-rose-50 border border-gray-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={taalOps[key]}
                      onChange={() => dispatch({ type: 'TOGGLE_TAAL_OPS', key })}
                      className="sr-only"
                    />
                    <span className="text-xl">{icon}</span>
                    <div className="min-w-0">
                      <span className="font-semibold">{label}</span>
                      <span className={`block text-xs mt-0.5 ${taalOps[key] ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
                    </div>
                    {taalOps[key] && <span className="ml-auto text-xl">✓</span>}
                  </label>
                ))}
              </div>
              {!taalOps.spelling && !taalOps.vocabulary && !taalOps.reading && !taalOps.english && (
                <p className="mt-4 text-sm text-red-500 font-medium text-center">
                  ⚠️ Kies minstens één soort oefening
                </p>
              )}
            </div>
            )}

            {/* Niveau/opties - Taal */}
            {exerciseCategory === 'taal' && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 sm:p-7 border-2 border-green-100">
              <h3 className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg font-bold text-gray-700 mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl">📊</span> Opties
              </h3>

              {/* Spellingcategorieën */}
              {taalOps.spelling && (
                <>
                  <p className="text-sm font-medium text-gray-600 mb-3">✏️ Spellingcategorieën:</p>
                  <div className="space-y-1.5 mb-4">
                    {[
                      { id: 1, label: '🔨 Hakwoord', desc: 'kat' },
                      { id: 2, label: '🎵 Zingwoord', desc: 'zing' },
                      { id: 3, label: '💨 Luchtwoord', desc: 'lucht' },
                      { id: 4, label: '🪵 Plankwoord', desc: 'plank' },
                      { id: 5, label: '👂 Eer-oor-eur-eel', desc: 'beer, hoor, geur, geel' },
                      { id: 6, label: '🌈 Aai-ooi-oei', desc: 'haai, mooi, loei' },
                      { id: 7, label: '🦁 Eeuw-ieuw', desc: 'leeuw, nieuw' },
                      { id: 8, label: '📏 Langermaakwoord', desc: 'hart, vind' },
                    ].map(({ id, label, desc }) => {
                      const active = spellingCategories.includes(id);
                      return (
                        <label
                          key={id}
                          className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all text-sm ${
                            active
                              ? 'bg-rose-500 text-white shadow-sm'
                              : 'bg-white text-gray-700 hover:bg-rose-50 border border-gray-200'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={active}
                            onChange={() => dispatch({ type: 'TOGGLE_SPELLING_CATEGORY', id })}
                            className="sr-only"
                          />
                          <div>
                            <span className="font-medium">{label}</span>
                            <span className={`ml-2 text-xs ${active ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
                          </div>
                          {active && <span>✓</span>}
                        </label>
                      );
                    })}
                  </div>
                  {spellingCategories.length === 0 && (
                    <p className="text-xs text-red-500 mb-3">Kies minstens één categorie</p>
                  )}
                </>
              )}

              {/* Woordenschat opties */}
              {taalOps.vocabulary && (
                <>
                  <p className={`text-sm font-medium text-gray-600 mb-2 ${taalOps.spelling ? 'mt-4 pt-4 border-t border-gray-300' : ''}`}>📖 Woordenschat:</p>
                  <label
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all text-sm mb-2 ${
                      includeThemeVocabulary
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : 'bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={includeThemeVocabulary}
                      onChange={() => set('includeThemeVocabulary', !includeThemeVocabulary)}
                      className="sr-only"
                    />
                    <div>
                      <span className="font-medium">🌍 Woorden van de gekozen wereld</span>
                      <span className={`block text-xs mt-0.5 ${includeThemeVocabulary ? 'text-white/80' : 'text-gray-500'}`}>
                        Thema-woorden worden meegenomen naast de algemene woorden
                      </span>
                    </div>
                    {includeThemeVocabulary && <span className="ml-auto">✓</span>}
                  </label>
                </>
              )}

              {/* Begrijpend lezen opties */}
              {taalOps.reading && (
                <>
                  <p className={`text-sm font-medium text-gray-600 mb-2 ${taalOps.spelling || taalOps.vocabulary ? 'mt-4 pt-4 border-t border-gray-300' : ''}`}>📚 Begrijpend lezen:</p>
                  <label
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all text-sm mb-2 ${
                      includeThemeReading
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : 'bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={includeThemeReading}
                      onChange={() => set('includeThemeReading', !includeThemeReading)}
                      className="sr-only"
                    />
                    <div>
                      <span className="font-medium">🌍 Teksten van de gekozen wereld</span>
                      <span className={`block text-xs mt-0.5 ${includeThemeReading ? 'text-white/80' : 'text-gray-500'}`}>
                        Thema-teksten worden meegenomen naast de algemene teksten
                      </span>
                    </div>
                    {includeThemeReading && <span className="ml-auto">✓</span>}
                  </label>
                  <p className="text-sm font-medium text-gray-600 mb-2 mt-3">Niveau:</p>
                  <div className="space-y-2">
                    {[
                      { key: 'short', label: 'Korte teksten', desc: '1-2 zinnen' },
                      { key: 'long', label: 'Langere teksten', desc: '3-4 zinnen' },
                    ].map(({ key, label, desc }) => (
                      <label
                        key={key}
                        className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all text-sm ${
                          readingLevel === key
                            ? 'bg-amber-500 text-white shadow-sm'
                            : 'bg-white text-gray-700 hover:bg-amber-50 border border-gray-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="readingLevel"
                          value={key}
                          checked={readingLevel === key}
                          onChange={(e) => set('readingLevel', e.target.value)}
                          className="sr-only"
                        />
                        <div>
                          <span className="font-medium">{label}</span>
                          <span className={`ml-2 text-xs ${readingLevel === key ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
                        </div>
                        {readingLevel === key && <span>✓</span>}
                      </label>
                    ))}
                  </div>
                </>
              )}

              {/* Engels opties */}
              {taalOps.english && (
                <>
                  <p className={`text-sm font-medium text-gray-600 mb-2 ${taalOps.spelling || taalOps.vocabulary || taalOps.reading ? 'mt-4 pt-4 border-t border-gray-300' : ''}`}>🇬🇧 Engels:</p>
                  <p className="text-xs text-gray-500 mb-2">Niveau:</p>
                  <div className="space-y-1.5 mb-3">
                    {[
                      { key: 'easy', label: 'Makkelijk', desc: 'Kleuren, dieren, fruit, cijfers' },
                      { key: 'medium', label: 'Gemiddeld', desc: '+ weer, school, eten, hobby\'s' },
                      { key: 'hard', label: 'Moeilijk', desc: '+ gevoelens, beroepen, reizen' },
                    ].map(({ key, label, desc }) => (
                      <label
                        key={key}
                        className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all text-sm ${
                          englishLevel === key
                            ? 'bg-blue-500 text-white shadow-sm'
                            : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="englishLevel"
                          value={key}
                          checked={englishLevel === key}
                          onChange={(e) => set('englishLevel', e.target.value)}
                          className="sr-only"
                        />
                        <div>
                          <span className="font-medium">{label}</span>
                          <span className={`ml-2 text-xs ${englishLevel === key ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
                        </div>
                        {englishLevel === key && <span>✓</span>}
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mb-2">Richting bij woordspellen:</p>
                  <div className="space-y-1.5">
                    {[
                      { key: 'nl-en', label: 'Nederlands → Engels', desc: 'Je ziet het Nederlandse woord' },
                      { key: 'en-nl', label: 'Engels → Nederlands', desc: 'Je ziet het Engelse woord' },
                      { key: 'both', label: 'Beide richtingen', desc: 'Afwisselend Nederlands of Engels' },
                    ].map(({ key, label, desc }) => (
                      <label
                        key={key}
                        className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all text-sm ${
                          englishDirection === key
                            ? 'bg-blue-500 text-white shadow-sm'
                            : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="englishDirection"
                          value={key}
                          checked={englishDirection === key}
                          onChange={(e) => set('englishDirection', e.target.value)}
                          className="sr-only"
                        />
                        <div>
                          <span className="font-medium">{label}</span>
                          <span className={`block text-xs mt-0.5 ${englishDirection === key ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
                        </div>
                        {englishDirection === key && <span>✓</span>}
                      </label>
                    ))}
                  </div>
                </>
              )}

              {/* Geen opties geselecteerd */}
              {!taalOps.spelling && !taalOps.vocabulary && !taalOps.reading && !taalOps.english && (
                <p className="text-sm text-gray-500 italic">Kies eerst een soort oefening om opties te zien</p>
              )}
            </div>
            )}

            {/* Adventure Length */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-7 border-2 border-amber-100">
              <h3 className="flex items-center gap-3 text-lg font-bold text-gray-700 mb-6">
                <span className="text-2xl">⏱️</span> Lengte
              </h3>
              <div className="space-y-3">
                {[
                  { key: 'short', label: 'Kort', icon: '⚡', desc: 'Red 2 vriendjes + 4 uitdagingen' },
                  { key: 'medium', label: 'Medium', icon: '🎯', desc: 'Red 4 vriendjes + 7 uitdagingen' },
                  { key: 'long', label: 'Lang', icon: '🏔️', desc: 'Red 6 vriendjes + 10 uitdagingen' },
                ].map(({ key, label, icon, desc }) => (
                  <label
                    key={key}
                    className={`flex flex-col gap-1 p-3 rounded-xl cursor-pointer transition-all ${
                      adventureLength === key
                        ? 'bg-amber-500 text-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-amber-50 border border-gray-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="adventureLength"
                      value={key}
                      checked={adventureLength === key}
                      onChange={(e) => set('adventureLength', e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{icon}</span>
                      <span className="font-semibold">{label}</span>
                      {adventureLength === key && <span className="ml-auto text-xl">✓</span>}
                    </div>
                    <span className={`text-xs ml-7 ${
                      adventureLength === key ? 'text-white/90' : 'text-gray-500'
                    }`}>{desc}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Emoji picker */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-7 border-2 border-purple-100">
              <h3 className="flex items-center gap-3 text-lg font-bold text-gray-700 mb-6">
                <span className="text-2xl">🎭</span> Jouw karakter
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 gap-2">
                {PLAYER_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => set('playerEmoji', emoji)}
                    className={`text-2xl p-2 rounded-xl transition-all aspect-square flex items-center justify-center ${
                      playerEmoji === emoji
                        ? 'bg-purple-500 shadow-md scale-110 ring-2 ring-purple-300'
                        : 'bg-white hover:bg-purple-50 border border-gray-200 hover:scale-105'
                    }`}
                    aria-label={`kies ${emoji}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* World Selection */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-4xl">🌍</span>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800">Kies je wereld</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Object.values(THEMES).map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`group relative overflow-hidden rounded-2xl p-4 transition-all duration-200 ${
                    selectedTheme === theme.id
                      ? 'bg-gradient-to-br from-yellow-100 to-orange-100 ring-4 ring-orange-400 shadow-lg scale-105'
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                    {theme.emoji}
                  </div>
                  <p className={`text-xs font-bold ${selectedTheme === theme.id ? 'text-orange-700' : 'text-gray-700'}`}>
                    {theme.name.replace(/^[^\s]+\s/, '')}
                  </p>
                  {selectedTheme === theme.id && (
                    <div className="absolute top-2 right-2 text-sm">✓</div>
                  )}
                </button>
              ))}
            </div>
            {!selectedTheme && (
              <p className="mt-4 text-sm text-gray-500 text-center">
                Klik op een wereld om deze te selecteren
              </p>
            )}
          </div>

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
              {canLaunch ? '🚀 Start avontuur!' : canStart ? '👆 Kies eerst een wereld' : '👆 Kies sommen en wereld'}
            </button>
          </div>
        </section>

        {/* Footer motivation */}
        <footer className="text-center mt-6 sm:mt-10">
          <div className="inline-flex items-center gap-2 sm:gap-4 bg-white/10 backdrop-blur-md rounded-full px-4 sm:px-8 py-2 sm:py-4 border border-white/20">
            <span className="text-xl sm:text-3xl">💪</span>
            <p className="text-sm sm:text-lg text-white font-medium">
              Elke uitdaging is een goede oefening!
            </p>
            <span className="text-xl sm:text-3xl">🧠</span>
          </div>
        </footer>
      </div>

      {/* Continue Modal - opgeslagen spel gevonden */}
      {continueModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl text-center max-h-[90vh] overflow-y-auto overscroll-contain">
            <div className="text-7xl mb-4">{continueModal.themeEmoji}</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Welkom terug! 👋
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Je hebt een lopend avontuur in <strong>{continueModal.themeName}</strong>!
            </p>
            
            <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-left">
              {(() => {
                let totalChallenges = 7, totalFriends = 4;
                switch (continueModal.adventureLength) {
                  case 'short':
                    totalChallenges = 4; totalFriends = 2; break;
                  case 'long':
                    totalChallenges = 10; totalFriends = 6; break;
                  case 'medium':
                  default:
                    totalChallenges = 7; totalFriends = 4;
                }
                return (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">⭐ Uitdagingen:</span>
                      <span className="font-bold text-gray-800">{continueModal.completedCount}/{totalChallenges}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">🤝 Geredde vriendjes:</span>
                      <span className="font-bold text-gray-800">{continueModal.collectedFriends}/{totalFriends}</span>
                    </div>
                  </>
                );
              })()}
            </div>

            <div className="space-y-3">
              <button
                onClick={continueGame}
                className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-lg rounded-xl transition-all hover:scale-105 shadow-lg"
              >
                ▶️ Ga verder
              </button>
              <button
                onClick={startNewGame}
                className="w-full px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-colors"
              >
                🔄 Start opnieuw
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
