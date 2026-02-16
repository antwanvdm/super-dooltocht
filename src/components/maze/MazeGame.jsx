import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getTheme } from '../../utils/themes';
import { SPELLING_CATEGORIES } from '../../utils/languageData';
import { generateMaze, placeChallenges, placeFriendlies, getStartPosition, getEndPosition } from '../../utils/mazeGenerator';
import { incrementCompletedMazes, saveGameState, getGameState, clearGameState, addSavedFriends, getCompletedMazes } from '../../utils/localStorage';
import { useSyncToServer } from '../../hooks/useSyncToServer';
import MazeView from './MazeView';
import Minimap from './Minimap';
import DPad from './DPad';
import ChallengeModal from '../minigames/ChallengeModal';
import Confetti from '../Confetti';

function MazeGame() {
  const { theme: themeId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = getTheme(themeId);
  const { syncProgress } = useSyncToServer();

  const { mathSettings, playerEmoji, adventureLength } = useMemo(() => {
    const defaults = { enabledOperations: { add: true, sub: true, mul: true }, maxValue: 50 };
    const state = location.state || {};
    const settings = state.mathSettings || defaults;
    // Zorg dat clock-gerelateerde settings doorgegeven worden
    if (settings.enabledOperations?.clock) {
      settings.clockLevel = settings.clockLevel || 'hours';
      settings.clock24h = settings.clock24h || false;
      settings.clockWords = settings.clockWords || false;
    }
    return {
      mathSettings: settings,
      playerEmoji: state.playerEmoji || '🙂',
      adventureLength: state.adventureLength || 'medium',
    };
  }, [location.state]);

  // Bepaal maze configuratie op basis van adventureLength
  const mazeConfig = useMemo(() => {
    switch (adventureLength) {
      case 'short':
        return { size: 31, challenges: 4, friendlies: 2 };
      case 'long':
        return { size: 61, challenges: 10, friendlies: 6 };
      case 'medium':
      default:
        return { size: 45, challenges: 7, friendlies: 4 };
    }
  }, [adventureLength]);

  const [maze, setMaze] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [friendlies, setFriendlies] = useState([]);
  const [collectedFriends, setCollectedFriends] = useState([]); // Verzamelde vriendjes
  const [playerPos, setPlayerPos] = useState(getStartPosition());
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [activeFriendly, setActiveFriendly] = useState(null);
  const [completedCount, setCompletedCount] = useState(0);
  const [showMinimap, setShowMinimap] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [exitModal, setExitModal] = useState(null);
  const [friendsWarningModal, setFriendsWarningModal] = useState(null); // Waarschuwing voor achtergelaten vriendjes
  const [showHelp, setShowHelp] = useState(false);
  const [lastCompletedPos, setLastCompletedPos] = useState(null); // Voorkom direct opnieuw triggeren
  const [showOnboarding, setShowOnboarding] = useState(false); // Onboarding hint voor nieuwe spelers
  const [showStoryIntro, setShowStoryIntro] = useState(false); // Story intro bij start van nieuw spel
  const [showSettings, setShowSettings] = useState(false); // Settings modal
  // Touch controls default aan op mobile (<640px), uit op desktop
  const [showTouchControls, setShowTouchControls] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 640;
    }
    return false;
  });
  const [pendingSync, setPendingSync] = useState(false);

  // Genereer maze bij mount OF laad saved state
  useEffect(() => {
    const savedState = getGameState();

    // Geen location.state (direct URL) én geen saved game voor dit thema → terug naar Home
    if (!location.state && (!savedState || savedState.themeId !== themeId)) {
      navigate('/', { replace: true });
      return;
    }

    // Check of er een saved state is voor dit thema
    if (savedState && savedState.themeId === themeId) {
      // Laad opgeslagen spel
      setMaze(savedState.maze);
      setChallenges(savedState.challenges);
      setFriendlies(savedState.friendlies);
      setCollectedFriends(savedState.collectedFriends || []);
      setPlayerPos(savedState.playerPos);
      setCompletedCount(savedState.completedCount || 0);
      setShowMinimap(false);
      setHasWon(false);
      setExitModal(null);
      setActiveFriendly(null);
    } else {
      // Nieuw spel starten
      const newMaze = generateMaze(mazeConfig.size, mazeConfig.size);
      const newChallenges = placeChallenges(newMaze, mazeConfig.challenges);
      const newFriendlies = placeFriendlies(
        newMaze,
        newChallenges,
        theme.friendlies || ['🌟', '🎈', '🤖', '🧸', '🐶'],
        mazeConfig.friendlies,
        theme.story?.friendTexts || theme.friendTexts // Gebruik story friendTexts als beschikbaar
      );
      setMaze(newMaze);
      setChallenges(newChallenges);
      setFriendlies(newFriendlies);
      setCollectedFriends([]);
      setPlayerPos(getStartPosition());
      setCompletedCount(0);
      setShowMinimap(false);
      setHasWon(false);
      setExitModal(null);
      setActiveFriendly(null);

      // Toon story intro bij nieuw spel
      setShowStoryIntro(true);
      
      // Trigger sync naar server voor nieuw spel (zodat instellingen worden opgeslagen)
      setPendingSync(true);
    }
  }, [themeId, theme.friendlies]);

  // Save game state bij belangrijke wijzigingen
  const saveCurrentState = useCallback(() => {
    if (!maze) return;
    saveGameState({
      themeId,
      maze,
      challenges,
      friendlies,
      collectedFriends,
      playerPos,
      completedCount,
      mathSettings,
      playerEmoji,
      adventureLength,
    });
  }, [maze, themeId, challenges, friendlies, collectedFriends, playerPos, completedCount, mathSettings, playerEmoji, adventureLength]);

  // Auto-save bij elke belangrijke wijziging
  useEffect(() => {
    if (maze && !hasWon) {
      saveCurrentState();
      
      // Sync naar server als pending
      if (pendingSync) {
        syncProgress();
        setPendingSync(false);
      }
    }
  }, [playerPos, challenges, friendlies, collectedFriends, completedCount, saveCurrentState, maze, hasWon, pendingSync, syncProgress]);

  // Move functie - herbruikbaar voor keyboard en touch
  const move = useCallback((direction) => {
    setPlayerPos(prev => {
      const { x, y } = prev;
      let newX = x;
      let newY = y;

      switch (direction) {
        case 'up': newY = y - 1; break;
        case 'down': newY = y + 1; break;
        case 'left': newX = x - 1; break;
        case 'right': newX = x + 1; break;
        default: return prev;
      }

      if (
        maze &&
        newY >= 0 && newY < maze.length &&
        newX >= 0 && newX < maze[0].length &&
        !maze[newY][newX].wall
      ) {
        return { x: newX, y: newY };
      }
      return prev;
    });
  }, [maze]);

  // Keyboard controls met snellere beweging
  useEffect(() => {
    let moveInterval = null;
    let lastDirection = null;

    const handleKeyDown = (e) => {
      // ESC sluit alle modals
      if (e.key === 'Escape') {
        if (activeChallenge) {
          setLastCompletedPos({ ...playerPos });
          setActiveChallenge(null);
        }
        if (activeFriendly) setActiveFriendly(null);
        if (showMinimap) setShowMinimap(false);
        if (exitModal) setExitModal(null);
        if (showHelp) setShowHelp(false);
        if (friendsWarningModal) setFriendsWarningModal(null);
        if (showOnboarding) setShowOnboarding(false);
        if (showStoryIntro) setShowStoryIntro(false);
        if (showSettings) setShowSettings(false);
        if (showTouchControls) setShowTouchControls(false);
        return;
      }

      if (activeChallenge || activeFriendly || showMinimap || showHelp || exitModal || friendsWarningModal || showStoryIntro || showSettings) return; // Geen beweging als popup open staat

      // Toggle kaart met K
      if (e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        setShowMinimap(prev => !prev);
        return;
      }

      // Toggle settings met S
      if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        setShowSettings(prev => !prev);
        return;
      }

      // Toggle besturing (D-pad) met B
      if (e.key === 'b' || e.key === 'B') {
        e.preventDefault();
        setShowTouchControls(prev => !prev);
        return;
      }

      // Toggle help met H
      if (e.key === 'h' || e.key === 'H') {
        e.preventDefault();
        setShowHelp(prev => !prev);
        return;
      }

      let direction = null;
      switch (e.key) {
        case 'ArrowUp':
          direction = 'up';
          break;
        case 'ArrowDown':
          direction = 'down';
          break;
        case 'ArrowLeft':
          direction = 'left';
          break;
        case 'ArrowRight':
          direction = 'right';
          break;
        default:
          return;
      }

      e.preventDefault();

      // Start continuous movement als het een nieuwe richting is
      if (direction !== lastDirection) {
        lastDirection = direction;
        move(direction); // Direct eerste beweging

        // Start interval voor snelle beweging bij ingedrukt houden
        if (moveInterval) clearInterval(moveInterval);
        moveInterval = setInterval(() => move(direction), 80); // 80ms = snel maar controleerbaar
      }
    };

    const handleKeyUp = (e) => {
      const releasedDirection = {
        'ArrowUp': 'up',
        'ArrowDown': 'down',
        'ArrowLeft': 'left',
        'ArrowRight': 'right',
      }[e.key];

      if (releasedDirection === lastDirection) {
        lastDirection = null;
        if (moveInterval) {
          clearInterval(moveInterval);
          moveInterval = null;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (moveInterval) clearInterval(moveInterval);
    };
  }, [maze, activeChallenge, activeFriendly, showMinimap, showHelp, exitModal, friendsWarningModal, showOnboarding, showStoryIntro, showSettings]);

  // Check voor challenges/friendlies/exit na beweging
  useEffect(() => {
    if (!maze || hasWon) return;

    const { x, y } = playerPos;

    // Check exit
    const endPos = getEndPosition(maze);
    if (x === endPos.x && y === endPos.y) {
      if (completedCount === challenges.length) {
        // Check of er nog vriendjes achterblijven
        const uncollectedFriends = friendlies.filter(f => !f.collected);
        if (uncollectedFriends.length > 0) {
          setFriendsWarningModal({
            uncollected: uncollectedFriends,
            canLeave: true // Alle challenges gedaan, mag vertrekken
          });
        } else {
          // Gewonnen! Sla geredde vriendjes op
          setHasWon(true);
          addSavedFriends(collectedFriends.length);
          clearGameState();
          incrementCompletedMazes();
          // Final sync naar server: adventure afgerond (localStorage is al bijgewerkt)
          setTimeout(() => syncProgress(), 100);
          // Niet automatisch sluiten - laat de speler klikken
        }
      } else {
        const remaining = challenges.length - completedCount;
        setExitModal({ remaining });
      }
    }

    // Check of speler op een challenge staat
    const challenge = challenges.find(
      c => c.x === x && c.y === y && !c.completed
    );
    // Alleen triggeren als we niet net op deze plek een challenge hebben afgesloten
    const isLastCompletedPos = lastCompletedPos && lastCompletedPos.x === x && lastCompletedPos.y === y;
    if (challenge && !activeChallenge && !isLastCompletedPos) {
      setActiveChallenge(challenge);
      return;
    }

    // Reset lastCompletedPos als we weggelopen zijn
    if (lastCompletedPos && (lastCompletedPos.x !== x || lastCompletedPos.y !== y)) {
      setLastCompletedPos(null);
    }

    // Check of speler op een friendly NPC staat (nog niet verzameld)
    const friendly = friendlies.find(
      f => f.x === x && f.y === y && !f.collected
    );
    if (friendly && !activeFriendly) {
      setActiveFriendly(friendly);
    }
  }, [playerPos, maze, challenges, friendlies, completedCount, activeChallenge, activeFriendly, collectedFriends, hasWon, navigate]);

  const handleFriendlyClose = () => {
    // Verzamel het vriendje - gaat nu met je mee!
    const friend = activeFriendly;
    setCollectedFriends(prev => [...prev, { id: friend.id, emoji: friend.emoji }]);
    setFriendlies(prev =>
      prev.map(f => f.id === friend.id ? { ...f, collected: true, spoken: true } : f)
    );
    setActiveFriendly(null);
    
    // Mark for sync (happens after state + localStorage update)
    setPendingSync(true);
  };

  // Functie voor vertrekken met achtergelaten vriendjes
  const handleLeaveWithoutFriends = () => {
    setFriendsWarningModal(null);
    setHasWon(true);
    addSavedFriends(collectedFriends.length);
    clearGameState();
    incrementCompletedMazes();
    
    // Final sync naar server: adventure afgerond (localStorage is al bijgewerkt)
    setTimeout(() => syncProgress(), 100);
    // Niet automatisch navigeren - laat speler zelf klikken in win scherm
  };

  // Functie om terug te gaan en vriendjes te zoeken
  const handleSearchForFriends = () => {
    setFriendsWarningModal(null);
  };

  const handleChallengeComplete = (challengeId) => {
    // Onthoud waar we waren zodat de challenge niet direct opnieuw triggert
    setLastCompletedPos({ ...playerPos });

    setChallenges(prev =>
      prev.map(c => c.id === challengeId ? { ...c, completed: true } : c)
    );
    setActiveChallenge(null);

    const newCount = completedCount + 1;
    setCompletedCount(newCount);
    // Victory nu alleen bij uitgang; hier geen auto-win meer
    
    // Mark for sync (happens after state + localStorage update)
    setPendingSync(true);
  };

  const handleChallengeClose = () => {
    // Onthoud waar we waren zodat de challenge niet direct opnieuw triggert
    setLastCompletedPos({ ...playerPos });
    setActiveChallenge(null);
  };

  if (!maze) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl text-white">Doolhof wordt gemaakt... 🎨</div>
      </div>
    );
  }

  const totalChallenges = challenges.length;
  const totalFriendlies = mazeConfig.friendlies;

  const renderKeyProgress = () => {
    const totalPieces = totalChallenges || 10;
    const pieces = Array.from({ length: totalPieces }, (_, i) => i < completedCount);
    return (
      <div className="flex items-center gap-2">
        <span className="text-lg">🔑</span>
        <div className="flex gap-1">
          {pieces.map((filled, idx) => (
            <div
              key={idx}
              className={`h-3 w-6 rounded-sm ${filled ? 'bg-amber-500' : 'bg-gray-200'}`}
            />
          ))}
        </div>
      </div>
    );
  };

  // Render verzamelde vriendjes
  const renderCollectedFriends = () => {
    return (
      <div className="flex items-center gap-2">
        <span className="text-lg">🤝</span>
        <div className="flex gap-1">
          {Array.from({ length: totalFriendlies }, (_, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-lg
                ${i < collectedFriends.length 
                  ? 'bg-green-100 border-2 border-green-400' 
                  : 'bg-gray-100 border-2 border-gray-300'}`}
            >
              {i < collectedFriends.length ? collectedFriends[i].emoji : '?'}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`h-dvh ${theme.colors.primary} flex flex-col items-center overflow-hidden select-none`}>
      {/* Header met progress */}
      <div className="w-full mb-2 sm:mb-4">
        <div className="w-full bg-white/95 backdrop-blur-sm shadow-lg">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-3 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 text-sm sm:text-base"
              >
                <span className="text-base sm:text-xl">⬅️</span>
                <span className="font-semibold">Terug</span>
              </button>
              <h2 className="text-base sm:text-xl font-bold text-gray-800">
                {theme.emoji} {theme.name}
              </h2>
            </div>
            <div className="flex items-center gap-2 sm:gap-5 flex-wrap">
              {renderCollectedFriends()}
              {renderKeyProgress()}
            </div>
          </div>
        </div>
      </div>

      {/* Main maze view */}
      <div className="flex-1 flex items-center justify-center w-full px-2">
        <MazeView
          maze={maze}
          playerPos={playerPos}
          challenges={challenges}
          friendlies={friendlies}
          collectedFriends={collectedFriends}
          theme={theme}
          playerEmoji={playerEmoji}
        />
      </div>

      {/* Controls hint + kaart knop */}
      <div className="w-full mt-2 sm:mt-4">
        <div className="w-full bg-white/95 backdrop-blur-sm shadow-lg">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-3 flex flex-col gap-2">
            {/* Knoppen en instellingen naast elkaar */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {/* Onboarding hint naast help knop */}
              {showOnboarding && (
                <div className="flex items-center gap-1 sm:gap-2 bg-purple-100 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border-2 border-purple-300 animate-pulse">
                  <button
                    onClick={() => setShowOnboarding(false)}
                    className="text-purple-400 hover:text-purple-600 text-base sm:text-lg ml-1"
                  >
                    ✕
                  </button>
                  <span className="text-xs sm:text-sm font-semibold text-purple-800">Eerste keer?</span>
                  <span className="text-lg sm:text-2xl">👉</span>
                </div>
              )}
              <button
                onClick={() => {
                  setShowHelp(true);
                  setShowOnboarding(false);
                }}
                className="px-3 sm:px-4 py-2.5 sm:py-2 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-lg transition-colors text-base sm:text-base"
              >
                ❓ <span className="hidden sm:inline">Help (H)</span>
              </button>
              <button
                onClick={() => setShowMinimap(true)}
                className="px-3 sm:px-4 py-2.5 sm:py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors text-base sm:text-base"
              >
                🗺️ <span className="hidden sm:inline">Kaart (K)</span>
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="px-3 sm:px-4 py-2.5 sm:py-2 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-lg transition-colors flex items-center gap-1 sm:gap-2 text-base sm:text-base"
              >
                <span>{playerEmoji}</span>
                <span className="hidden sm:inline">Speler (S)</span>
              </button>
              {/* Besturing knop alleen op grotere schermen */}
              <button
                onClick={() => setShowTouchControls(prev => !prev)}
                className={`flex px-3 sm:px-4 py-2.5 sm:py-2 ${showTouchControls ? 'bg-orange-600' : 'bg-orange-500 hover:bg-orange-600'} text-white font-bold rounded-lg transition-colors text-base items-center gap-2`}
              >
                🎮 <span className="hidden sm:inline">Besturing (B)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Touch Controls D-Pad Overlay */}
      {showTouchControls && <DPad move={move} />}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-full sm:max-w-2xl max-h-[90vh] flex flex-col relative">
            <button
              onClick={() => setShowSettings(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-xl sm:text-2xl hover:scale-110 transition-transform z-10"
            >
              ❌
            </button>
            <div className="p-4 sm:p-6 pt-3 sm:pt-4 overflow-y-auto">
              <div className="text-center text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl mr-2">{playerEmoji}</span> Speler Keuzes
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {mathSettings.enabledOperations.add && (
                  <div className="bg-blue-50 rounded-xl p-4">
                    <h4 className="font-bold text-blue-800 mb-2">➕ Optellen</h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      <p>Niveau: tot <strong>{mathSettings.maxValue}</strong></p>
                      {mathSettings.addSubMode && (
                        <p>
                          Modus: <strong>
                            {mathSettings.addSubMode === 'within' && 'Binnen tiental'}
                            {mathSettings.addSubMode === 'beyond' && 'Over tiental'}
                          </strong>
                        </p>
                      )}
                      {mathSettings.beyondDigits && mathSettings.addSubMode === 'beyond' && (
                        <p>
                          Cijfers: <strong>
                            {mathSettings.beyondDigits === 'units' && 'Eenheden'}
                            {mathSettings.beyondDigits === 'tens' && 'Met tiental'}
                            {mathSettings.beyondDigits === 'hundreds' && 'Met honderdtal'}
                          </strong>
                        </p>
                      )}
                    </div>
                  </div>
                )}
                {mathSettings.enabledOperations.sub && (
                  <div className="bg-blue-50 rounded-xl p-4">
                    <h4 className="font-bold text-blue-800 mb-2">➖ Aftrekken</h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      <p>Niveau: tot <strong>{mathSettings.maxValue}</strong></p>
                      {mathSettings.addSubMode && (
                        <p>
                          Modus: <strong>
                            {mathSettings.addSubMode === 'within' && 'Binnen tiental'}
                            {mathSettings.addSubMode === 'beyond' && 'Over tiental'}
                          </strong>
                        </p>
                      )}
                      {mathSettings.beyondDigits && mathSettings.addSubMode === 'beyond' && (
                        <p>
                          Cijfers: <strong>
                            {mathSettings.beyondDigits === 'units' && 'Eenheden'}
                            {mathSettings.beyondDigits === 'tens' && 'Met tiental'}
                            {mathSettings.beyondDigits === 'hundreds' && 'Met honderdtal'}
                          </strong>
                        </p>
                      )}
                    </div>
                  </div>
                )}
                {mathSettings.enabledOperations.mul && (
                  <div className="bg-green-50 rounded-xl p-4">
                    <h4 className="font-bold text-green-800 mb-2">✖️ Vermenigvuldigen</h4>
                    <p className="text-sm text-green-700">
                      {mathSettings.mulTables === 'easy' && 'Tafels: 1, 2, 5, 10'}
                      {mathSettings.mulTables === 'medium' && 'Tafels: 3, 4, 6, 7, 8, 9'}
                      {mathSettings.mulTables === 'hard' && 'Tafels: 11, 12'}
                      {mathSettings.mulTables === 'expert' && 'Tafels: 13 t/m 20'}
                      {mathSettings.mulTables === 'all' && 'Tafels: 1 t/m 12'}
                      {mathSettings.mulTables === 'allplus' && 'Tafels: 1 t/m 20'}
                    </p>
                  </div>
                )}
                {mathSettings.enabledOperations.placeValue && (
                  <div className="bg-amber-50 rounded-xl p-4">
                    <h4 className="font-bold text-amber-800 mb-2">🔢 Getallen begrijpen</h4>
                    <p className="text-sm text-amber-700">
                      Niveau: <strong>
                        {mathSettings.placeValueLevel === 'tens' && 'Tientallen'}
                        {mathSettings.placeValueLevel === 'hundreds' && 'Honderdtallen'}
                        {mathSettings.placeValueLevel === 'thousands' && 'Duizendtallen'}
                      </strong>
                    </p>
                  </div>
                )}
                {mathSettings.enabledOperations.lovingHearts && (
                  <div className="bg-pink-50 rounded-xl p-4">
                    <h4 className="font-bold text-pink-800 mb-2">💕 Verliefde Harten</h4>
                    <p className="text-sm text-pink-700">Hart-getallen tot 10</p>
                  </div>
                )}
                {mathSettings.enabledOperations.money && (
                  <div className="bg-yellow-50 rounded-xl p-4">
                    <h4 className="font-bold text-yellow-800 mb-2">💰 Rekenen met Geld</h4>
                    <div className="text-sm text-yellow-700 space-y-1">
                      <p>Bedrag: tot €{(mathSettings.moneyMaxAmount || 2000) / 100}</p>
                      <p>Centen: <strong>{mathSettings.moneyIncludeCents ? 'Ja' : 'Nee'}</strong></p>
                    </div>
                  </div>
                )}
                {mathSettings.enabledOperations.clock && (
                  <div className="bg-indigo-50 rounded-xl p-4">
                    <h4 className="font-bold text-indigo-800 mb-2">🕐 Klokkijken</h4>
                    <div className="text-sm text-indigo-700 space-y-1">
                      <p>Niveau: <strong>
                        {mathSettings.clockLevel === 'hours' && 'Hele uren'}
                        {mathSettings.clockLevel === 'halfHours' && 'Halve uren'}
                        {mathSettings.clockLevel === 'quarters' && 'Kwartieren'}
                        {mathSettings.clockLevel === 'fiveMinutes' && '5 minuten'}
                        {mathSettings.clockLevel === 'minutes' && '1 minuut'}
                      </strong></p>
                      {mathSettings.clock24h && <p>24-uursklok: <strong>Aan</strong></p>}
                      {mathSettings.clockWords && <p>Tijd in woorden: <strong>Aan</strong></p>}
                    </div>
                  </div>
                )}
                {mathSettings.enabledOperations.spelling && (
                  <div className="bg-rose-50 rounded-xl p-4">
                    <h4 className="font-bold text-rose-800 mb-2">✏️ Spelling</h4>
                    <div className="grid grid-cols-2 gap-1 text-sm text-rose-700">
                      {(mathSettings.spellingCategories || []).map(id => {
                        const cat = SPELLING_CATEGORIES.find(c => c.id === id);
                        return <span key={id}>{cat ? cat.name : `Cat ${id}`}</span>;
                      })}
                    </div>
                  </div>
                )}
                {mathSettings.enabledOperations.vocabulary && (
                  <div className="bg-emerald-50 rounded-xl p-4">
                    <h4 className="font-bold text-emerald-800 mb-2">📖 Woordenschat</h4>
                    <div className="text-sm text-emerald-700 space-y-1">
                      <p>Themawoorden: <strong>{mathSettings.includeThemeVocabulary ? 'Aan' : 'Uit'}</strong></p>
                    </div>
                  </div>
                )}
                {mathSettings.enabledOperations.reading && (
                  <div className="bg-amber-50 rounded-xl p-4">
                    <h4 className="font-bold text-amber-800 mb-2">📚 Begrijpend lezen</h4>
                    <div className="text-sm text-amber-700 space-y-1">
                      <p>Niveau: <strong>{mathSettings.readingLevel === 'short' ? 'Korte teksten' : 'Langere teksten'}</strong></p>
                      <p>Themateksten: <strong>{mathSettings.includeThemeReading ? 'Aan' : 'Uit'}</strong></p>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="mt-4 sm:mt-6 w-full px-4 py-2 sm:py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors text-sm sm:text-base"
              >
                🚀 Terug naar het doolhof
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-full sm:max-w-lg max-h-[90vh] flex flex-col relative">
            <button
              onClick={() => setShowHelp(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-xl sm:text-2xl hover:scale-110 transition-transform z-10"
            >
              ❌
            </button>
            <div className="p-4 sm:p-6 pt-3 sm:pt-4 overflow-y-auto">
              <div className="text-center text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">❓ Hoe werkt het?</div>
              <div className="space-y-3 sm:space-y-3 sm:space-y-4">
                <div className="bg-blue-50 rounded-xl p-3 sm:p-4">
                  <h4 className="font-bold text-blue-800 mb-1 sm:mb-2 text-sm sm:text-base">⌨️ Bewegen</h4>
                  <p className="text-blue-700 text-xs sm:text-sm">Gebruik de <strong>pijltjestoetsen</strong> op je toetsenbord om door het doolhof te lopen. Houd een toets ingedrukt om snel te bewegen!</p>
                  <p className="text-blue-700 text-xs sm:text-sm mt-2">Op een <strong>mobiel of tablet</strong> gebruik je de <strong>🎮 besturing</strong> rechtsonder in beeld.</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-3 sm:p-4">
                  <h4 className="font-bold text-amber-800 mb-1 sm:mb-2 text-sm sm:text-base">🔑 Sleutel & Uitdagingen</h4>
                  <p className="text-amber-700 text-xs sm:text-sm">Vind alle <strong>{mazeConfig.challenges} uitdagingen</strong> ({theme.colors.challenge}) en los de uitdagingen op. Elke uitdaging geeft een stukje sleutel. Met een complete sleutel kun je door de deur!</p>
                </div>
                <div className="bg-green-50 rounded-xl p-3 sm:p-4">
                  <h4 className="font-bold text-green-800 mb-1 sm:mb-2 text-sm sm:text-base">🤝 Vriendjes redden</h4>
                  <p className="text-green-700 text-xs sm:text-sm">Er zijn <strong>{mazeConfig.friendlies} verdwaalde vriendjes</strong> in het doolhof. Vind ze en neem ze mee naar de uitgang om ze te redden!</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-3 sm:p-4">
                  <h4 className="font-bold text-purple-800 mb-1 sm:mb-2 text-sm sm:text-base">🗺️ Hulpmiddelen</h4>
                  <p className="text-purple-700 text-xs sm:text-sm">Druk op <strong>K</strong> voor kaart, <strong>H</strong> voor help, <strong>S</strong> voor speler-info, en <strong>ESC</strong> om vensters te sluiten.</p>
                </div>
              </div>
              <button
                onClick={() => setShowHelp(false)}
                className="w-full mt-4 sm:mt-6 px-4 py-2 sm:py-3 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-lg transition-colors text-sm sm:text-base"
              >
                👍 Begrepen!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Minimap Modal */}
      {showMinimap && (
        <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-[90vw] max-h-[90vh] relative">
            <button
              onClick={() => setShowMinimap(false)}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 text-xl sm:text-2xl hover:scale-110 transition-transform z-10 bg-white/80 rounded-full p-1"
            >
              ❌
            </button>
            <Minimap
              maze={maze}
              playerPos={playerPos}
              challenges={challenges}
              theme={theme}
              maxHeight="70vh"
            />
          </div>
        </div>
      )}

      {/* Story Intro Modal - bij start van nieuw spel */}
      {showStoryIntro && theme.story?.intro && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className={`${theme.colors.secondary || theme.colors.primary} rounded-3xl shadow-2xl max-w-full sm:max-w-lg w-full overflow-hidden`}>
            <div className="p-4 sm:p-8 text-center">
              <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg">
                {theme.name}
              </h2>
              <div className="bg-white/95 rounded-2xl p-4 sm:p-6 shadow-inner mb-4 sm:mb-6">
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  {theme.story.intro}
                </p>
              </div>
              <div className="mb-4 sm:mb-6">
                <p className="text-white font-semibold mb-2 sm:mb-3 drop-shadow text-sm sm:text-base">
                  Vind deze verdwaalde vriendjes:
                </p>
                <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
                  {friendlies.map((f, i) => (
                    <span
                      key={i}
                      className="text-3xl sm:text-4xl animate-bounce bg-white/20 rounded-full p-1.5 sm:p-2"
                      style={{ animationDelay: `${i * 150}ms` }}
                    >
                      {f.emoji}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => {
                  setShowStoryIntro(false);
                  // Toon onboarding voor nieuwe spelers na story intro
                  if (getCompletedMazes() === 0) {
                    setShowOnboarding(true);
                  }
                }}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-green-500 hover:bg-green-600 text-white text-lg sm:text-xl font-bold rounded-xl shadow-lg transition-all hover:scale-105"
              >
                🚀 Ga aan de slag!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exit warning modal */}
      {exitModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-2xl p-4 sm:p-8 w-full max-w-full sm:max-w-xl shadow-2xl text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-3">Bijna bij de deur!</h3>
            <p className="text-lg sm:text-xl text-gray-700 mb-3 sm:mb-4">
              Je mist nog {exitModal.remaining} {exitModal.remaining === 1 ? 'uitdaging' : 'uitdagingen'} om de sleutel compleet te maken.
            </p>
            <div className="flex justify-center mb-4 sm:mb-6">{renderKeyProgress()}</div>
            <button
              onClick={() => setExitModal(null)}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg text-sm sm:text-base"
            >
              Verder zoeken
            </button>
          </div>
        </div>
      )}

      {/* Friendly NPC Dialog */}
      {activeFriendly && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className={`${theme.colors.secondary || theme.colors.primary} rounded-3xl shadow-2xl max-w-full sm:max-w-md w-full overflow-hidden`}>
            <div className="p-4 sm:p-8 text-center">
              <div className="text-6xl sm:text-8xl mb-3 sm:mb-4 animate-bounce">
                {activeFriendly.emoji}
              </div>
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-inner">
                <p className="text-base sm:text-xl text-gray-800 font-medium leading-relaxed">
                  "{activeFriendly.message}"
                </p>
              </div>
              <button
                onClick={handleFriendlyClose}
                className="mt-4 sm:mt-6 px-6 sm:px-8 py-2.5 sm:py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg transition-all hover:scale-105 text-sm sm:text-base"
              >
                🤝 Neem mee!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Friends Warning Modal - wanneer je weggaat zonder alle vriendjes */}
      {friendsWarningModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-2xl p-4 sm:p-8 w-full max-w-full sm:max-w-lg shadow-2xl text-center">
            <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">😢</div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">Wacht even!</h3>
            <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
              {theme.story?.warningLeave || `Er zijn nog ${friendsWarningModal.uncollected.length} verdwaalde vriendjes in het doolhof!`}
            </p>
            <div className="flex justify-center gap-2 mb-4 sm:mb-6">
              {friendsWarningModal.uncollected.map((f, i) => (
                <span key={i} className="text-3xl sm:text-4xl animate-bounce" style={{ animationDelay: `${i * 100}ms` }}>
                  {f.emoji}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={handleSearchForFriends}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors text-sm sm:text-base"
              >
                🔍 Vriendjes zoeken
              </button>
              <button
                onClick={handleLeaveWithoutFriends}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-400 hover:bg-gray-500 text-white font-bold rounded-lg transition-colors text-sm sm:text-base"
              >
                🚪 Toch vertrekken
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Challenge Modal */}
      {activeChallenge && (
        <ChallengeModal
          challenge={activeChallenge}
          theme={theme}
          mathSettings={mathSettings}
          onComplete={handleChallengeComplete}
          onClose={handleChallengeClose}
        />
      )}

      {/* Victory message */}
      {hasWon && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Confetti duration={5000} />
          <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-2xl max-w-lg mx-4">
            <div className="text-7xl md:text-8xl mb-4">{theme.emoji}</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {collectedFriends.length === friendlies.length ? '🎉 Geweldig!' : 'Goed gedaan!'}
            </h2>

            {/* Story ending */}
            {theme.story && (
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {collectedFriends.length === friendlies.length
                    ? theme.story.endingComplete
                    : theme.story.endingIncomplete}
                </p>
              </div>
            )}

            {/* Collected friends display */}
            {collectedFriends.length > 0 && (
              <div className="bg-green-50 rounded-xl p-4 mb-4">
                <p className="text-lg text-green-700 font-semibold mb-2">
                  🤝 Je hebt {collectedFriends.length} van de {friendlies.length} vriendjes gered!
                </p>
                <div className="flex justify-center gap-2 flex-wrap">
                  {collectedFriends.map((f) => (
                    <span key={f.id} className="text-3xl">{f.emoji}</span>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => navigate('/')}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xl font-bold rounded-xl shadow-lg transition-all hover:scale-105"
            >
              🚀 Begin een nieuw avontuur!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MazeGame;
