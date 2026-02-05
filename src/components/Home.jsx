import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { THEMES, getTheme } from '../utils/themes';
import { getCompletedMazes, getSavedFriends, getGameState, clearGameState, getUserSettings, saveUserSettings } from '../utils/localStorage';

const PLAYER_EMOJIS = [
  '🤖','🧙','🧚','🧜','🧛','🧞','🧟','🧝','🧞‍♂️','🧚‍♀️','🧜‍♂️','🧙‍♂️',
  '🤠','🏴‍☠️','🦸','🦹','🧑‍🚀','🧑‍✈️','🧑‍🚒','🤹','🏊','🤿','🚴','🏇'
];

function Home() {
  const navigate = useNavigate();
  const completedMazes = getCompletedMazes();
  const savedFriends = getSavedFriends();
  
  // Load saved settings or use defaults
  const savedSettings = getUserSettings();
  const [ops, setOps] = useState(savedSettings?.ops || { add: false, sub: false, mul: false, placeValue: false, lovingHearts: false, money: false });
  const [maxValue, setMaxValue] = useState(savedSettings?.maxValue || 100);
  const [mulTables, setMulTables] = useState(savedSettings?.mulTables || 'easy');
  const [addSubMode, setAddSubMode] = useState(savedSettings?.addSubMode || 'beyond');
  const [beyondDigits, setBeyondDigits] = useState(savedSettings?.beyondDigits || 'units');
  const [placeValueLevel, setPlaceValueLevel] = useState(savedSettings?.placeValueLevel || 'tens');
  const [moneyMaxAmount, setMoneyMaxAmount] = useState(savedSettings?.moneyMaxAmount || 2000);
  const [moneyIncludeCents, setMoneyIncludeCents] = useState(savedSettings?.moneyIncludeCents || false);
  const [adventureLength, setAdventureLength] = useState(savedSettings?.adventureLength || 'medium');
  const [playerEmoji, setPlayerEmoji] = useState(savedSettings?.playerEmoji || PLAYER_EMOJIS[0]);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [continueModal, setContinueModal] = useState(null);

  // Save settings whenever they change
  useEffect(() => {
    saveUserSettings({
      ops,
      maxValue,
      mulTables,
      addSubMode,
      beyondDigits,
      placeValueLevel,
      moneyMaxAmount,
      moneyIncludeCents,
      adventureLength,
      playerEmoji,
    });
  }, [ops, maxValue, mulTables, addSubMode, beyondDigits, placeValueLevel, moneyMaxAmount, moneyIncludeCents, adventureLength, playerEmoji]);

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
  };

  const startMaze = () => {
    if (!selectedTheme || !canStart) return;
    // Als er een saved game is voor een ander thema, wis die
    const savedGame = getGameState();
    if (savedGame && savedGame.themeId !== selectedTheme) {
      clearGameState();
    }
    navigate(`/maze/${selectedTheme}`, {
      state: {
        mathSettings: {
          enabledOperations: ops,
          maxValue: Number(maxValue),
          mulTables: mulTables,
          addSubMode: addSubMode,
          beyondDigits: beyondDigits,
          placeValueLevel: placeValueLevel,
          moneyMaxAmount: moneyMaxAmount,
          moneyIncludeCents: moneyIncludeCents,
        },
        playerEmoji,
        adventureLength,
      },
    });
  };

  const canStart = ops.add || ops.sub || ops.mul || ops.placeValue || ops.lovingHearts || ops.money;
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 mb-8 sm:mb-12">
            {/* Operations */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 sm:p-7 border-2 border-blue-100">
              <h3 className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg font-bold text-gray-700 mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl">➕</span> Soort oefening
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {[  
                  { key: 'add', label: 'Plussommen', icon: '➕' },
                  { key: 'sub', label: 'Minsommen', icon: '➖' },
                  { key: 'mul', label: 'Keersommen', icon: '✖️' },
                  { key: 'placeValue', label: 'Begripsoefening', icon: '🔢' },
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
                      onChange={() => setOps(prev => ({ ...prev, [key]: !prev[key] }))}
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

            {/* Level */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-7 border-2 border-green-100">
              <h3 className="flex items-center gap-3 text-lg font-bold text-gray-700 mb-6">
                <span className="text-2xl">📊</span> Niveau
              </h3>
              
              {/* Plus/Min niveau - alleen zichtbaar als plus of min aan staat */}
              {(ops.add || ops.sub) && (
                <>
                  <p className="text-sm font-medium text-gray-600 mb-3">➕➖ Plus/Min sommen tot:</p>
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
                          onChange={(e) => setMaxValue(Number(e.target.value))}
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
                          onChange={(e) => setAddSubMode(e.target.value)}
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
                              onChange={(e) => setBeyondDigits(e.target.value)}
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
              
              {/* Tafel selectie - alleen zichtbaar als keersommen aan staat */}
              {ops.mul && (
                <>
                  <p className={`text-sm font-medium text-gray-600 mb-3 ${(ops.add || ops.sub) ? 'mt-4 pt-4 border-t border-gray-300' : ''}`}>✖️ Keersommen tafels:</p>
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
                          onChange={(e) => setMulTables(e.target.value)}
                          className="sr-only"
                        />
                        <span className="font-medium">{label}</span>
                        {mulTables === key && <span className="ml-auto">✓</span>}
                      </label>
                    ))}
                  </div>
                </>
              )}
              
              {/* Begripsoefening niveau */}
              {ops.placeValue && (
                <>
                  <p className={`text-sm font-medium text-gray-600 mb-3 ${(ops.add || ops.sub || ops.mul) ? 'mt-4 pt-4 border-t border-gray-300' : ''}`}>🔢 Begripsoefening niveau:</p>
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
                          onChange={(e) => setPlaceValueLevel(e.target.value)}
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
                          onChange={(e) => setMoneyMaxAmount(Number(e.target.value))}
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
                      onChange={() => setMoneyIncludeCents(!moneyIncludeCents)}
                      className="sr-only"
                    />
                    <span className="font-medium">Met centen (5c, 10c, 20c, 50c)</span>
                    {moneyIncludeCents && <span>✓</span>}
                  </label>
                </>
              )}
              
              {/* Geen opties geselecteerd */}
              {!ops.add && !ops.sub && !ops.mul && !ops.placeValue && !ops.lovingHearts && !ops.money && (
                <p className="text-sm text-gray-500 italic">Kies eerst een soort som om niveau-opties te zien</p>
              )}
            </div>

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
                      onChange={(e) => setAdventureLength(e.target.value)}
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
                    onClick={() => setPlayerEmoji(emoji)}
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
              className={`px-12 py-5 text-2xl font-bold rounded-2xl transition-all duration-300 ${
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
        <footer className="text-center mt-10">
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-full px-8 py-4 border border-white/20">
            <span className="text-3xl">💪</span>
            <p className="text-lg text-white font-medium">
              Elke uitdaging is een goede oefening!
            </p>
            <span className="text-3xl">🧠</span>
          </div>
        </footer>
      </div>

      {/* Continue Modal - opgeslagen spel gevonden */}
      {continueModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl text-center">
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
