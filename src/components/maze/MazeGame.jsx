import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getTheme } from '../../utils/themes';
import { generateMaze, generateMultiFloorMaze, placeChallenges, placeFriendlies, getStartPosition, getEndPosition } from '../../utils/mazeGenerator';
import { incrementCompletedMazes, saveGameState, getGameState, clearGameState, addSavedFriends } from '../../utils/localStorage';
import { useSyncToServer } from '../../hooks/useSyncToServer';
import MazeView from './MazeView';
import DPad from './DPad';
import ChallengeModal from '../minigames/ChallengeModal';
import { pickRandomGameType } from '../../utils/gameSelection';
import SettingsModal from './modals/SettingsModal';
import HelpModal from './modals/HelpModal';
import MinimapModal from './modals/MinimapModal';
import StoryIntroModal from './modals/StoryIntroModal';
import ExitModal from './modals/ExitModal';
import FriendlyDialog from './modals/FriendlyDialog';
import FriendsWarningModal from './modals/FriendsWarningModal';
import WinScreen from './modals/WinScreen';

function MazeGame() {
  const { theme: themeId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = getTheme(themeId);
  const { syncProgress } = useSyncToServer();

  const { mathSettings, playerEmoji, adventureLength } = useMemo(() => {
    const defaults = { enabledOperations: { add: true, sub: true, mul: true }, maxValue: 50 };
    const state = location.state || {};
    // Fall back to savedState when location.state is lost (e.g. page refresh)
    const saved = !location.state ? getGameState() : null;
    const settings = state.mathSettings || saved?.mathSettings || defaults;
    // Zorg dat clock-gerelateerde settings doorgegeven worden
    if (settings.enabledOperations?.clock) {
      settings.clockLevel = settings.clockLevel || 'hours';
      settings.clock24h = settings.clock24h || false;
      settings.clockWords = settings.clockWords || false;
    }
    return {
      mathSettings: settings,
      playerEmoji: state.playerEmoji || saved?.playerEmoji || '🙂',
      adventureLength: state.adventureLength || saved?.adventureLength || 'medium',
    };
  }, [location.state]);

  // Bepaal maze configuratie op basis van adventureLength
  const mazeConfig = useMemo(() => {
    switch (adventureLength) {
      case 'short':
        return { size: 31, challenges: 4, friendlies: 2, floors: 1 };
      case 'long':
        return { size: 61, challenges: 10, friendlies: 6, floors: 1 };
      case 'xl':
        return { size: 53, challenges: 16, friendlies: 10, floors: 2 };
      case 'medium':
      default:
        return { size: 45, challenges: 7, friendlies: 4, floors: 1 };
    }
  }, [adventureLength]);

  const isMultiFloor = mazeConfig.floors > 1;

  const [maze, setMaze] = useState(null);
  const [floors, setFloors] = useState(null); // Array van verdiepingen (null = single-floor)
  const [currentFloor, setCurrentFloor] = useState(0);
  const [portals, setPortals] = useState([]); // Portal objecten
  const [portalTransition, setPortalTransition] = useState(false); // Animatie bij verdiepingswisseling
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

  // Track welke game types al gespeeld zijn voor round-robin verdeling.
  // Leeft in MazeGame (niet in ChallengeModal) omdat ChallengeModal
  // elke keer opnieuw gemount wordt per challenge.
  const playedGameTypesRef = useRef([]);
  const [activeGameType, setActiveGameType] = useState(null);
  const [lastCompletedPos, setLastCompletedPos] = useState(null); // Voorkom direct opnieuw triggeren
  const [lastPortalPos, setLastPortalPos] = useState(null); // Voorkom heen-en-weer portaal loop
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
  const [modalInteractionReady, setModalInteractionReady] = useState(false);

  // Korte delay voordat popup-modals interactief worden, zodat een vinger die
  // al op het scherm lag (bijv. D-pad) niet per ongeluk meteen een knop indrukt.
  useEffect(() => {
    if (exitModal || friendsWarningModal || activeFriendly || hasWon) {
      setModalInteractionReady(false);
      const timer = setTimeout(() => setModalInteractionReady(true), 400);
      return () => clearTimeout(timer);
    }
  }, [exitModal, friendsWarningModal, activeFriendly, hasWon]);

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
      // Laad opgeslagen spel — backward-compatible: floors kan ontbreken
      if (savedState.floors) {
        setFloors(savedState.floors);
        setMaze(savedState.floors[savedState.currentFloor || 0]);
        setCurrentFloor(savedState.currentFloor || 0);
        setPortals(savedState.portals || []);
      } else {
        setFloors(null);
        setMaze(savedState.maze);
        setCurrentFloor(0);
        setPortals([]);
      }
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
      let newMaze, newFloors = null, newPortals = [];

      if (mazeConfig.floors > 1) {
        // Multi-floor XL modus
        const result = generateMultiFloorMaze(mazeConfig.size, mazeConfig.size, mazeConfig.floors);
        newFloors = result.floors;
        newPortals = result.portals;
        newMaze = newFloors[0]; // Actieve verdieping = 0
      } else {
        newMaze = generateMaze(mazeConfig.size, mazeConfig.size);
      }

      // Verdeel challenges en friendlies over alle verdiepingen
      let newChallenges, newFriendlies;
      if (newFloors) {
        newChallenges = [];
        newFriendlies = [];
        const challengesPerFloor = Math.ceil(mazeConfig.challenges / mazeConfig.floors);
        const friendliesPerFloor = Math.ceil(mazeConfig.friendlies / mazeConfig.floors);
        let challengeIdCounter = 0;
        let friendlyIdCounter = 0;

        // Shuffle de volledige emoji-pool één keer en verdeel uniek over verdiepingen
        const allEmojis = [...(theme.friendlies || ['🌟', '🎈', '🤖', '🧸', '🐶'])]
          .sort(() => Math.random() - 0.5);

        for (let fi = 0; fi < newFloors.length; fi++) {
          const floorChallengeCount = fi < newFloors.length - 1
            ? challengesPerFloor
            : mazeConfig.challenges - newChallenges.length;
          const floorChallenges = placeChallenges(newFloors[fi], floorChallengeCount);
          // Tag challenges with floor + renumber IDs
          for (const c of floorChallenges) {
            c.floor = fi;
            c.id = challengeIdCounter++;
          }
          // Avoid portal cells for challenges
          const portalCells = newPortals.filter(p => p.floor === fi);
          const filtered = floorChallenges.filter(c => !portalCells.some(p => p.x === c.x && p.y === c.y));
          newChallenges.push(...filtered);

          const floorFriendlyCount = fi < newFloors.length - 1
            ? friendliesPerFloor
            : mazeConfig.friendlies - newFriendlies.length;
          // Geef elke verdieping een unieke slice van de emoji-pool
          const emojiStart = fi * friendliesPerFloor;
          const floorEmojis = allEmojis.slice(emojiStart, emojiStart + floorFriendlyCount);
          const floorFriendlies = placeFriendlies(
            newFloors[fi],
            floorChallenges,
            floorEmojis,
            floorFriendlyCount,
            theme.story?.friendTexts || theme.friendTexts
          );
          for (const f of floorFriendlies) {
            f.floor = fi;
            f.id = `friendly-${friendlyIdCounter++}`;
          }
          newFriendlies.push(...floorFriendlies);
        }
        // Trim to exact counts
        newChallenges = newChallenges.slice(0, mazeConfig.challenges);
        newFriendlies = newFriendlies.slice(0, mazeConfig.friendlies);
      } else {
        newChallenges = placeChallenges(newMaze, mazeConfig.challenges);
        newFriendlies = placeFriendlies(
          newMaze,
          newChallenges,
          theme.friendlies || ['🌟', '🎈', '🤖', '🧸', '🐶'],
          mazeConfig.friendlies,
          theme.story?.friendTexts || theme.friendTexts
        );
      }

      setFloors(newFloors);
      setPortals(newPortals);
      setCurrentFloor(0);
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

      // Sla nieuw spel direct op in localStorage + sync naar server
      saveGameState({
        themeId,
        maze: newMaze,
        floors: newFloors,
        portals: newPortals,
        currentFloor: 0,
        challenges: newChallenges,
        friendlies: newFriendlies,
        collectedFriends: [],
        playerPos: getStartPosition(),
        completedCount: 0,
        mathSettings,
        playerEmoji,
        adventureLength,
      });
      syncProgress();
    }
  }, [themeId, theme.friendlies]);

  // Save game state naar localStorage (alleen aangeroepen bij events, niet elke stap)
  const saveCurrentState = useCallback(() => {
    if (!maze) return;
    saveGameState({
      themeId,
      maze,
      floors,
      portals,
      currentFloor,
      challenges,
      friendlies,
      collectedFriends,
      playerPos,
      completedCount,
      mathSettings,
      playerEmoji,
      adventureLength,
    });
  }, [maze, floors, portals, currentFloor, themeId, challenges, friendlies, collectedFriends, playerPos, completedCount, mathSettings, playerEmoji, adventureLength]);

  // Save + sync in één keer – aangeroepen bij challenge klaar, vriendje verzameld, etc.
  const saveAndSync = useCallback(() => {
    saveCurrentState();
    syncProgress();
  }, [saveCurrentState, syncProgress]);

  // Beforeunload vangnet: sla huidige positie op als de browser/tab wordt gesloten
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (maze && !hasWon) {
        saveCurrentState();
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [maze, hasWon, saveCurrentState]);

  // Portal transitie: wisselt van verdieping met animatie
  const handlePortalStep = useCallback((portal) => {
    if (portalTransition) return; // Voorkom dubbele transitie
    setPortalTransition(true);
    // Markeer de landing-positie zodat de portal op de andere verdieping niet direct opnieuw triggert
    setLastPortalPos({ x: portal.targetX, y: portal.targetY, floor: portal.targetFloor });
    setTimeout(() => {
      const targetFloor = portal.targetFloor;
      setCurrentFloor(targetFloor);
      if (floors) {
        setMaze(floors[targetFloor]);
      }
      setPlayerPos({ x: portal.targetX, y: portal.targetY });
      setTimeout(() => setPortalTransition(false), 300);
    }, 300);
  }, [floors, portalTransition]);

  // Move functie - herbruikbaar voor keyboard en touch
  const move = useCallback((direction) => {
    if (portalTransition) return; // Blokkeer beweging tijdens verdiepingswisseling
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
  }, [maze, portalTransition]);

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
  }, [move, activeChallenge, activeFriendly, showMinimap, showHelp, exitModal, friendsWarningModal, showOnboarding, showStoryIntro, showSettings]);

  // Check voor challenges/friendlies/exit/portalen na beweging
  useEffect(() => {
    if (!maze || hasWon || portalTransition) return;

    const { x, y } = playerPos;

    // Check portal (multi-floor) — skip als we net hier geland zijn via een portal
    const isLastPortalPos = lastPortalPos && lastPortalPos.x === x && lastPortalPos.y === y && lastPortalPos.floor === currentFloor;
    if (isMultiFloor && maze[y] && maze[y][x] && maze[y][x].portal && !isLastPortalPos) {
      const portal = maze[y][x].portal;
      handlePortalStep(portal);
      return; // Wacht op transitie, check rest daarna
    }

    // Reset lastPortalPos zodra de speler van de portal-cel afstapt
    if (lastPortalPos && (lastPortalPos.x !== x || lastPortalPos.y !== y || lastPortalPos.floor !== currentFloor)) {
      setLastPortalPos(null);
    }

    // Check exit — alleen op de laatste verdieping (of single-floor)
    const endPos = getEndPosition(maze);
    const isGroundFloor = !isMultiFloor || currentFloor === 0;
    if (x === endPos.x && y === endPos.y && isGroundFloor) {
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

    // Check of speler op een challenge staat (filter op huidige verdieping)
    const challenge = challenges.find(
      c => c.x === x && c.y === y && !c.completed && (c.floor === undefined || c.floor === currentFloor)
    );
    // Alleen triggeren als we niet net op deze plek een challenge hebben afgesloten
    const isLastCompletedPos = lastCompletedPos && lastCompletedPos.x === x && lastCompletedPos.y === y && (lastCompletedPos.floor === undefined || lastCompletedPos.floor === currentFloor);
    if (challenge && !activeChallenge && !isLastCompletedPos) {
      setActiveGameType(pickRandomGameType(mathSettings, playedGameTypesRef.current));
      setActiveChallenge(challenge);
      return;
    }

    // Reset lastCompletedPos als we weggelopen zijn
    if (lastCompletedPos && (lastCompletedPos.x !== x || lastCompletedPos.y !== y)) {
      setLastCompletedPos(null);
    }

    // Check of speler op een friendly NPC staat (filter op huidige verdieping)
    const friendly = friendlies.find(
      f => f.x === x && f.y === y && !f.collected && (f.floor === undefined || f.floor === currentFloor)
    );
    if (friendly && !activeFriendly) {
      setActiveFriendly(friendly);
    }
  }, [playerPos, maze, challenges, friendlies, completedCount, activeChallenge, activeFriendly, collectedFriends, hasWon, navigate, currentFloor, isMultiFloor, portalTransition, handlePortalStep]);

  const handleFriendlyClose = () => {
    // Verzamel het vriendje - gaat nu met je mee!
    const friend = activeFriendly;
    const updatedCollected = [...collectedFriends, { id: friend.id, emoji: friend.emoji }];
    const updatedFriendlies = friendlies.map(f => f.id === friend.id ? { ...f, collected: true, spoken: true } : f);
    setCollectedFriends(updatedCollected);
    setFriendlies(updatedFriendlies);
    setActiveFriendly(null);
    
    // Save bijgewerkte data direct (niet via stale closure)
    if (maze) {
      saveGameState({
        themeId, maze, floors, portals, currentFloor, challenges, friendlies: updatedFriendlies,
        collectedFriends: updatedCollected, playerPos, completedCount,
        mathSettings, playerEmoji, adventureLength,
      });
      syncProgress();
    }
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
    // Registreer het voltooide game type in de round-robin lijst
    if (activeGameType) {
      playedGameTypesRef.current.push(activeGameType);
    }

    // Onthoud waar we waren zodat de challenge niet direct opnieuw triggert
    setLastCompletedPos({ ...playerPos, floor: currentFloor });

    const updatedChallenges = challenges.map(c => c.id === challengeId ? { ...c, completed: true } : c);
    setChallenges(updatedChallenges);
    setActiveChallenge(null);

    const newCount = completedCount + 1;
    setCompletedCount(newCount);
    // Victory nu alleen bij uitgang; hier geen auto-win meer
    
    // Save bijgewerkte data direct (niet via stale closure)
    if (maze) {
      saveGameState({
        themeId, maze, floors, portals, currentFloor, challenges: updatedChallenges, friendlies,
        collectedFriends, playerPos, completedCount: newCount,
        mathSettings, playerEmoji, adventureLength,
      });
      syncProgress();
    }
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
              className={`h-3 w-4 rounded-sm ${filled ? 'bg-amber-500' : 'bg-gray-200'}`}
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
              {isMultiFloor && (
                <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs sm:text-sm font-bold rounded-full border border-indigo-200">
                  🪜 {currentFloor === 0 ? 'Beneden' : 'Boven'}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 sm:gap-5 flex-wrap">
              {renderCollectedFriends()}
              {renderKeyProgress()}
            </div>
          </div>
        </div>
      </div>

      {/* Main maze view */}
      <div className="flex-1 flex items-center justify-center w-full px-2 relative">
        <MazeView
          maze={maze}
          playerPos={playerPos}
          challenges={challenges.filter(c => c.floor === undefined || c.floor === currentFloor)}
          friendlies={friendlies.filter(f => f.floor === undefined || f.floor === currentFloor)}
          collectedFriends={collectedFriends}
          theme={theme}
          playerEmoji={playerEmoji}
          currentFloor={currentFloor}
          isMultiFloor={isMultiFloor}
          totalFloors={mazeConfig.floors}
        />
        {/* Portal transitie overlay */}
        {portalTransition && (
          <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
            <div className="animate-portalFlash absolute inset-0 bg-indigo-500/40" />
            <span className="text-6xl sm:text-8xl animate-bounce drop-shadow-lg">🪜</span>
          </div>
        )}
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
        <SettingsModal
          mathSettings={mathSettings}
          playerEmoji={playerEmoji}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* Help Modal */}
      {showHelp && (
        <HelpModal
          mazeConfig={mazeConfig}
          theme={theme}
          isMultiFloor={isMultiFloor}
          onClose={() => setShowHelp(false)}
        />
      )}

      {/* Minimap Modal */}
      {showMinimap && (
        <MinimapModal
          maze={maze}
          floors={floors}
          currentFloor={currentFloor}
          isMultiFloor={isMultiFloor}
          playerPos={playerPos}
          challenges={challenges}
          theme={theme}
          onClose={() => setShowMinimap(false)}
        />
      )}

      {/* Story Intro Modal - bij start van nieuw spel */}
      {showStoryIntro && theme.story?.intro && (
        <StoryIntroModal
          theme={theme}
          friendlies={friendlies}
          onClose={() => setShowStoryIntro(false)}
          setShowOnboarding={setShowOnboarding}
        />
      )}

      {/* Exit warning modal */}
      {exitModal && (
        <ExitModal
          exitModal={exitModal}
          modalInteractionReady={modalInteractionReady}
          renderKeyProgress={renderKeyProgress}
          onClose={() => setExitModal(null)}
        />
      )}

      {/* Friendly NPC Dialog */}
      {activeFriendly && (
        <FriendlyDialog
          activeFriendly={activeFriendly}
          theme={theme}
          modalInteractionReady={modalInteractionReady}
          onClose={handleFriendlyClose}
        />
      )}

      {/* Friends Warning Modal - wanneer je weggaat zonder alle vriendjes */}
      {friendsWarningModal && (
        <FriendsWarningModal
          friendsWarningModal={friendsWarningModal}
          theme={theme}
          modalInteractionReady={modalInteractionReady}
          onSearchForFriends={handleSearchForFriends}
          onLeaveWithoutFriends={handleLeaveWithoutFriends}
        />
      )}

      {/* Challenge Modal */}
      {activeChallenge && (
        <ChallengeModal
          challenge={activeChallenge}
          theme={theme}
          mathSettings={mathSettings}
          gameType={activeGameType}
          onComplete={handleChallengeComplete}
          onClose={handleChallengeClose}
        />
      )}

      {/* Victory message */}
      {hasWon && (
        <WinScreen
          theme={theme}
          friendlies={friendlies}
          collectedFriends={collectedFriends}
          modalInteractionReady={modalInteractionReady}
        />
      )}
    </div>
  );
}

export default MazeGame;
