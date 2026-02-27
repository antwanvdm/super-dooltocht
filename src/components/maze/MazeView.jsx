// MazeView - ingezoomde view van het doolhof
import { useState, useEffect } from 'react';

function MazeView({ maze, playerPos, challenges, friendlies = [], collectedFriends = [], theme, playerEmoji, currentFloor = 0, isMultiFloor = false, totalFloors = 1 }) {
  // Toon 13x13 grid rondom de speler voor betere zichtbaarheid
  const viewSize = 13;
  const halfView = Math.floor(viewSize / 2);

  const startPos = { x: 1, y: 1 };

  // Bereken cellSize functie
  const calculateCellSize = () => {
    if (typeof window === 'undefined') return 44;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    
    // Mobile-first: kleinere marges op mobile, grotere op desktop
    const isMobile = vw < 640; // Tailwind sm breakpoint
    const horizontalMargin = isMobile ? 16 : 60;
    const verticalReserve = isMobile ? 280 : 220;
    
    const availableWidth = vw - horizontalMargin;
    const availableHeight = vh - verticalReserve;
    const available = Math.min(availableWidth, availableHeight);
    
    const minSize = isMobile ? 20 : 32;
    return Math.max(minSize, Math.min(52, Math.floor(available / viewSize)));
  };

  // State voor cellSize zodat we kunnen re-renderen op resize
  const [cellSize, setCellSize] = useState(calculateCellSize);

  // Luister naar window resize en update cellSize
  useEffect(() => {
    let resizeTimeout;
    
    const handleResize = () => {
      // Debounce: wacht 150ms na laatste resize event
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setCellSize(calculateCellSize());
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Thema-specifieke kleuren
  const themeColors = {
    wall: theme.colors.wall || 'bg-gray-800',
    path: theme.colors.path || 'bg-gray-100',
  };

  const renderCell = (x, y) => {
    const isPlayer = x === playerPos.x && y === playerPos.y;
    const challenge = challenges.find(c => c.x === x && c.y === y);
    const friendly = friendlies.find(f => f.x === x && f.y === y && !f.collected);
    
    // Buiten maze = donkere rand in themakleur
    if (y < 0 || y >= maze.length || x < 0 || x >= maze[0].length) {
      return <div className={`w-full h-full ${themeColors.wall} opacity-80`} />;
    }

    const cell = maze[y][x];
    const isWall = cell.wall;
    const isEnd = x === maze[0].length - 2 && y === maze.length - 2 && (!isMultiFloor || currentFloor === 0);
    const isStart = x === startPos.x && y === startPos.y && (!isMultiFloor || currentFloor === 0);
    const isPortal = !isWall && cell.portal;

    // Muur styling met thema
    if (isWall) {
      return (
        <div className={`w-full h-full ${themeColors.wall} border border-black/20 shadow-inner`}>
          <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent" />
        </div>
      );
    }

    // Pad styling
    let cellClasses = `w-full h-full flex items-center justify-center text-xl sm:text-2xl md:text-3xl font-bold transition-all`;
    
    if (isPortal) {
      cellClasses += ' bg-gradient-to-br from-indigo-200 to-purple-300 border-2 border-indigo-400 shadow-md';
    } else if (isEnd) {
      cellClasses += ' bg-gradient-to-br from-yellow-200 to-amber-300 border-2 border-yellow-500 animate-pulse shadow-lg';
    } else if (isStart) {
      cellClasses += ' bg-gradient-to-br from-sky-100 to-blue-200 border-2 border-sky-400';
    } else {
      // Normale pad met subtiel thema-tint
      cellClasses += ` ${themeColors.path} border border-gray-200/50`;
    }

    return (
      <div className={cellClasses}>
        {isEnd && <span className="drop-shadow-lg">🚪</span>}
        {isStart && !isPlayer && <span className="drop-shadow">🏠</span>}
        {isPortal && !isPlayer && (
          <span className="drop-shadow animate-pulse text-lg sm:text-xl md:text-2xl" title={cell.portal.targetFloor === 0 ? 'Naar beneden' : 'Naar boven'}>
            🪜
          </span>
        )}
        {isPlayer && (
          <div className="relative flex items-center justify-center w-full h-full">
            {/* Verzamelde vriendjes achter de speler tonen */}
            {collectedFriends.length > 0 && (
              <div className="absolute flex items-center justify-center">
                {collectedFriends.slice(0, 3).map((f, i) => (
                  <span 
                    key={f.id} 
                    className="text-xs sm:text-sm md:text-lg drop-shadow absolute"
                    style={{ 
                      zIndex: 5 - i,
                      left: `${(i - 1) * 8}px`,
                      top: `${(i - 1) * 8}px`,
                    }}
                  >
                    {f.emoji}
                  </span>
                ))}
                {collectedFriends.length > 3 && (
                  <span className="text-[8px] sm:text-xs font-bold text-white bg-green-500 rounded-full w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center absolute" style={{ zIndex: 2, right: '-2px', bottom: '-2px' }}>
                    +{collectedFriends.length - 3}
                  </span>
                )}
              </div>
            )}
            {/* Speler */}
            <span className="drop-shadow-lg scale-110 z-10 relative">{playerEmoji || theme.colors.player}</span>
          </div>
        )}
        {!isPlayer && challenge && !challenge.completed && (
          <span className="drop-shadow animate-bounce">{theme.colors.challenge}</span>
        )}
        {!isPlayer && challenge && challenge.completed && (
          <span className="drop-shadow">✅</span>
        )}
        {/* Toon alleen niet-verzamelde vriendjes */}
        {!isPlayer && !challenge && friendly && (
          <span className="drop-shadow animate-pulse">{friendly.emoji}</span>
        )}
        {/* Pad karakter voor lege paden (niet speler, niet challenge, niet friendly, niet start/eind/portal) */}
        {!isPlayer && !challenge && !friendly && !isEnd && !isStart && !isPortal && (
          <span className="text-white/20 text-sm sm:text-base">{theme.pathChar || '·'}</span>
        )}
      </div>
    );
  };

  const cells = [];
  for (let dy = -halfView; dy <= halfView; dy++) {
    for (let dx = -halfView; dx <= halfView; dx++) {
      const x = playerPos.x + dx;
      const y = playerPos.y + dy;
      cells.push(
        <div key={`${x}-${y}`}>
          {renderCell(x, y)}
        </div>
      );
    }
  }

  const gridSize = cellSize * viewSize;

  return (
    <div className="flex justify-center items-center w-full overflow-x-hidden">
      <div className={`${theme.colors.secondary || theme.colors.primary} p-2 sm:p-3 rounded-2xl shadow-2xl`}>
        <div className="bg-black/20 p-1.5 sm:p-2 rounded-xl">
          <div
            className="grid gap-0 rounded-lg overflow-hidden shadow-inner mx-auto"
            style={{
              gridTemplateColumns: `repeat(${viewSize}, ${cellSize}px)`,
              gridAutoRows: `${cellSize}px`,
              width: `${gridSize}px`,
              height: `${gridSize}px`,
            }}
          >
            {cells}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MazeView;
