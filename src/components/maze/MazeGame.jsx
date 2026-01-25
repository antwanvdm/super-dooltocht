import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getTheme } from '../../utils/themes';
import { generateMaze, placeChallenges, placeFriendlies, getStartPosition, getEndPosition } from '../../utils/mazeGenerator';
import { incrementCompletedMazes, saveGameState, getGameState, clearGameState, addSavedFriends, getCompletedMazes } from '../../utils/localStorage';
import MazeView from './MazeView';
import Minimap from './Minimap';
import ChallengeModal from '../minigames/ChallengeModal';
import Confetti from '../Confetti';

function MazeGame() {
  const { theme: themeId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = getTheme(themeId);

  const { mathSettings, playerEmoji, adventureLength } = useMemo(() => {
    const defaults = { enabledOperations: { add: true, sub: true, mul: true }, maxValue: 50 };
    const state = location.state || {};
    return {
      mathSettings: state.mathSettings || defaults,
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

  // Genereer maze bij mount OF laad saved state
  useEffect(() => {
    const savedState = getGameState();
    
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
      const newFriendlies = placeFriendlies(newMaze, newChallenges, theme.friendlies || ['🌟', '�', '🤖', '🧸', '🐶'], mazeConfig.friendlies);
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
      
      // Toon onboarding hint voor nieuwe spelers (eerste keer spelen)
      if (getCompletedMazes() === 0) {
        setShowOnboarding(true);
      }
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
    }
  }, [playerPos, challenges, friendlies, collectedFriends, completedCount, saveCurrentState, maze, hasWon]);

  // Keyboard controls met snellere beweging
  useEffect(() => {
    let moveInterval = null;
    let lastDirection = null;

    const move = (direction) => {
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
    };

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
        return;
      }

      if (activeChallenge || activeFriendly || showMinimap || showHelp || exitModal || friendsWarningModal || showOnboarding) return; // Geen beweging als popup open staat

      // Toggle minimap met M
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        setShowMinimap(prev => !prev);
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
        case 'w':
        case 'W':
          direction = 'up';
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          direction = 'down';
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          direction = 'left';
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
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
        'ArrowUp': 'up', 'w': 'up', 'W': 'up',
        'ArrowDown': 'down', 's': 'down', 'S': 'down',
        'ArrowLeft': 'left', 'a': 'left', 'A': 'left',
        'ArrowRight': 'right', 'd': 'right', 'D': 'right',
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
  }, [maze, activeChallenge, activeFriendly, showMinimap, showHelp, exitModal, friendsWarningModal, showOnboarding]);

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
  };

  // Functie voor vertrekken met achtergelaten vriendjes
  const handleLeaveWithoutFriends = () => {
    setFriendsWarningModal(null);
    setHasWon(true);
    addSavedFriends(collectedFriends.length);
    clearGameState();
    incrementCompletedMazes();
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
    <div className={`min-h-screen ${theme.colors.primary} flex flex-col items-center`}>
      {/* Header met progress */}
      <div className="w-full mb-4">
        <div className="w-full bg-white/95 backdrop-blur-sm shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
              >
                <span className="text-xl">⬅️</span>
                <span className="font-semibold">Terug</span>
              </button>
              <h2 className="text-xl font-bold text-gray-800">
                {theme.emoji} {theme.name}
              </h2>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              {renderCollectedFriends()}
              <div className="text-lg font-bold text-gray-800">
                ⭐ {completedCount}/{totalChallenges}
              </div>
              {renderKeyProgress()}
            </div>
          </div>
        </div>
      </div>

      {/* Main maze view */}
      <div className="flex-1 flex items-center justify-center">
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
      <div className="w-full mt-4">
        <div className="w-full bg-white/95 backdrop-blur-sm shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-2">
            {/* Knoppen en instellingen naast elkaar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Knoppen links */}
              <div className="flex gap-3 items-center">
                <button
                  onClick={() => setShowMinimap(true)}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors"
                >
                  🗺️ Kaart (M)
                </button>
                <button
                  onClick={() => {
                    setShowHelp(true);
                    setShowOnboarding(false);
                  }}
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-lg transition-colors"
                >
                  ❓ Help (H)
                </button>
                {/* Onboarding hint naast help knop */}
                {showOnboarding && (
                  <div className="flex items-center gap-2 bg-purple-100 px-3 py-2 rounded-lg border-2 border-purple-300 animate-pulse">
                    <span className="text-2xl">👈</span>
                    <span className="text-sm font-semibold text-purple-800">Eerste keer? Lees hier de uitleg!</span>
                    <button
                      onClick={() => setShowOnboarding(false)}
                      className="text-purple-400 hover:text-purple-600 text-lg ml-1"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
              {/* Settings display rechts */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-blue-800">Sommen:</span>
                  <span className="text-blue-700">
                    {mathSettings.enabledOperations.add && '➕ '}
                    {mathSettings.enabledOperations.sub && '➖ '}
                    {mathSettings.enabledOperations.mul && '✖️ '}
                  </span>
                </div>
                {(mathSettings.enabledOperations.add || mathSettings.enabledOperations.sub) && (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-blue-800">Niveau:</span>
                    <span className="text-blue-700">tot {mathSettings.maxValue}</span>
                  </div>
                )}
                {mathSettings.enabledOperations.mul && (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-blue-800">Tafels:</span>
                    <span className="text-blue-700">
                      {mathSettings.mulTables === 'easy' && '1,2,5,10'}
                      {mathSettings.mulTables === 'medium' && '3,4,6,7,8,9'}
                      {mathSettings.mulTables === 'hard' && '11,12'}
                      {mathSettings.mulTables === 'all' && 'alle (1-12)'}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-blue-800">Lengte:</span>
                  <span className="text-blue-700">
                    {adventureLength === 'short' && 'Kort'}
                    {adventureLength === 'medium' && 'Medium'}
                    {adventureLength === 'long' && 'Lang'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative">
            <button
              onClick={() => setShowHelp(false)}
              className="absolute top-4 right-4 text-2xl hover:scale-110 transition-transform"
            >
              ❌
            </button>
            <div className="p-6 pt-4">
              <div className="text-center text-2xl font-bold text-gray-800 mb-6">❓ Hoe werkt het?</div>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-xl p-4">
                  <h4 className="font-bold text-blue-800 mb-2">⌨️ Bewegen</h4>
                  <p className="text-blue-700 text-sm">Gebruik de <strong>pijltjestoetsen</strong> om door het doolhof te lopen. Houd ingedrukt om snel te bewegen!</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-4">
                  <h4 className="font-bold text-amber-800 mb-2">🔑 Sleutel & Uitdagingen</h4>
                  <p className="text-amber-700 text-sm">Vind alle <strong>{mazeConfig.challenges} uitdagingen</strong> ({theme.colors.challenge}) en los de sommen op. Elke uitdaging geeft een stukje sleutel. Met een complete sleutel kun je door de deur!</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <h4 className="font-bold text-green-800 mb-2">🤝 Vriendjes redden</h4>
                  <p className="text-green-700 text-sm">Er zijn <strong>{mazeConfig.friendlies} verdwaalde vriendjes</strong> in het doolhof. Vind ze en neem ze mee naar de uitgang om ze te redden!</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4">
                  <h4 className="font-bold text-purple-800 mb-2">🗺️ Hulpmiddelen</h4>
                  <p className="text-purple-700 text-sm">Druk op <strong>M</strong> voor de kaart, <strong>H</strong> voor help, en <strong>ESC</strong> om vensters te sluiten.</p>
                </div>
              </div>
              <button
                onClick={() => setShowHelp(false)}
                className="w-full mt-6 px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-lg transition-colors"
              >
                👍 Begrepen!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Minimap Modal */}
      {showMinimap && (
        <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl relative">
            <button
              onClick={() => setShowMinimap(false)}
              className="absolute top-4 right-4 text-2xl hover:scale-110 transition-transform"
            >
              ❌
            </button>
            <div className="p-6 pt-12">
              <div className="flex justify-center">
                <Minimap
                  maze={maze}
                  playerPos={playerPos}
                  challenges={challenges}
                  theme={theme}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Exit warning modal */}
      {exitModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-xl shadow-2xl text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-3">Bijna bij de deur!</h3>
            <p className="text-xl text-gray-700 mb-4">
              Je mist nog {exitModal.remaining} {exitModal.remaining === 1 ? 'uitdaging' : 'uitdagingen'} om de sleutel compleet te maken.
            </p>
            <div className="flex justify-center mb-6">{renderKeyProgress()}</div>
            <button
              onClick={() => setExitModal(null)}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg"
            >
              Verder zoeken
            </button>
          </div>
        </div>
      )}

      {/* Friendly NPC Dialog */}
      {activeFriendly && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className={`${theme.colors.secondary || theme.colors.primary} rounded-3xl shadow-2xl max-w-md w-full overflow-hidden`}>
            <div className="p-8 text-center">
              <div className="text-8xl mb-4 animate-bounce">
                {activeFriendly.emoji}
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-inner">
                <p className="text-xl text-gray-800 font-medium leading-relaxed">
                  "{activeFriendly.message}"
                </p>
              </div>
              <button
                onClick={handleFriendlyClose}
                className="mt-6 px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg transition-all hover:scale-105"
              >
                🤝 Neem mee!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Friends Warning Modal - wanneer je weggaat zonder alle vriendjes */}
      {friendsWarningModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl text-center">
            <div className="text-6xl mb-4">😢</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Wacht even!</h3>
            <p className="text-lg text-gray-700 mb-4">
              Er zijn nog {friendsWarningModal.uncollected.length} verdwaalde vriendjes in het doolhof!
            </p>
            <div className="flex justify-center gap-2 mb-6">
              {friendsWarningModal.uncollected.map((f, i) => (
                <span key={i} className="text-4xl animate-bounce" style={{ animationDelay: `${i * 100}ms` }}>
                  {f.emoji}
                </span>
              ))}
            </div>
            <p className="text-gray-600 mb-6">
              Wil je ze eerst nog redden of toch vertrekken?
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleSearchForFriends}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors"
              >
                🔍 Vriendjes zoeken
              </button>
              <button
                onClick={handleLeaveWithoutFriends}
                className="px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white font-bold rounded-lg transition-colors"
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
          <div className="bg-white rounded-2xl p-12 text-center shadow-2xl max-w-lg">
            <div className="text-8xl mb-4">🎉</div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Super goed gedaan!
            </h2>
            <p className="text-2xl text-gray-600 mb-4">
              Je hebt alle uitdagingen gehaald!
            </p>
            {collectedFriends.length > 0 && (
              <div className="bg-green-50 rounded-xl p-4 mb-4">
                <p className="text-lg text-green-700 font-semibold mb-2">
                  🤝 Je hebt {collectedFriends.length} vriendjes gered!
                </p>
                <div className="flex justify-center gap-2">
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
