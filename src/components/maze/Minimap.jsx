// Minimap - overzicht rechtsboven

import { useState } from 'react';

function Minimap({ maze, playerPos, challenges, theme, maxHeight = null, floors = null, currentFloor = 0, isMultiFloor = false }) {
  const [viewFloor, setViewFloor] = useState(currentFloor);
  const activeMaze = isMultiFloor && floors ? floors[viewFloor] : maze;
  const cellSize = 8; // pixels per cel
  const height = activeMaze.length;
  const width = activeMaze[0].length;

  // Filter challenges voor de actieve verdieping op de minimap
  const floorChallenges = challenges.filter(c => c.floor === undefined || c.floor === viewFloor);

  // Verzamel portalen op de huidige view-verdieping
  const portalCells = [];
  if (isMultiFloor && floors) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (activeMaze[y][x].portal) {
          portalCells.push({ x, y, portal: activeMaze[y][x].portal });
        }
      }
    }
  }

  const mapContent = (
    <div
      className="border-2 border-gray-800"
      style={{
        width: width * cellSize,
        height: height * cellSize,
      }}
    >
      <svg width={width * cellSize} height={height * cellSize}>
        {/* Render maze */}
        {activeMaze.map((row, y) =>
          row.map((cell, x) => (
            <rect
              key={`${x}-${y}`}
              x={x * cellSize}
              y={y * cellSize}
              width={cellSize}
              height={cellSize}
              fill={cell.wall ? '#374151' : '#e5e7eb'}
            />
          ))
        )}

        {/* Render portals */}
        {portalCells.map((p, idx) => (
          <g key={`portal-${idx}`}>
            <rect
              x={p.x * cellSize}
              y={p.y * cellSize}
              width={cellSize}
              height={cellSize}
              fill="#818cf8"
              rx="1"
            />
            <text
              x={p.x * cellSize + cellSize / 2}
              y={p.y * cellSize + cellSize / 2 + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="5"
              fill="white"
              fontWeight="bold"
            >
              {p.portal.targetFloor === 0 ? '↓' : '↑'}
            </text>
          </g>
        ))}

        {/* Render challenges */}
        {floorChallenges.map((challenge) => (
          <circle
            key={challenge.id}
            cx={challenge.x * cellSize + cellSize / 2}
            cy={challenge.y * cellSize + cellSize / 2}
            r={cellSize / 2}
            fill={challenge.completed ? '#22c55e' : '#ef4444'}
          />
        ))}

        {/* Start marker — alleen op de begane grond (verdieping 0) */}
        {(!isMultiFloor || viewFloor === 0) && (
          <rect
            x={1 * cellSize}
            y={1 * cellSize}
            width={cellSize}
            height={cellSize}
            fill="#38bdf8"
          />
        )}

        {/* Exit marker — alleen op de begane grond (verdieping 0) */}
        {(!isMultiFloor || viewFloor === 0) && (
          <rect
            x={(activeMaze[0].length - 2) * cellSize}
            y={(activeMaze.length - 2) * cellSize}
            width={cellSize}
            height={cellSize}
            fill="#f59e0b"
          />
        )}

        {/* Render player — alleen op de actieve verdieping */}
        {viewFloor === currentFloor && (
          <circle
            cx={playerPos.x * cellSize + cellSize / 2}
            cy={playerPos.y * cellSize + cellSize / 2}
            r={cellSize / 2}
            fill="#3b82f6"
            stroke="#1e40af"
            strokeWidth="1"
          />
        )}
      </svg>
    </div>
  );

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
      <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">
        🗺️ Plattegrond
      </h3>
      <p className="text-sm text-gray-500 mb-3 text-center">
        Vriendjes staan niet op de kaart - ze zijn verdwaald! Kun jij ze vinden?
      </p>

      {/* Verdieping tabs (alleen bij multi-floor) */}
      {isMultiFloor && floors && (
        <div className="flex justify-center gap-2 mb-3">
          {floors.map((_, fi) => (
            <button
              key={fi}
              onClick={() => setViewFloor(fi)}
              className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
                viewFloor === fi
                  ? 'bg-indigo-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-indigo-50 border border-gray-200'
              }`}
            >
              🪜 {fi === 0 ? 'Beneden' : 'Boven'}
              {fi === currentFloor && <span className="ml-1 text-xs">(📍)</span>}
            </button>
          ))}
        </div>
      )}
      
      {/* Scrollbare container alleen voor de kaart */}
      {maxHeight ? (
        <div 
          className="overflow-auto mx-auto border border-gray-300 rounded-lg bg-gray-100 p-1"
          style={{ maxHeight, maxWidth: '100%' }}
        >
          {mapContent}
        </div>
      ) : (
        <div className="mx-auto flex justify-center mb-3">
          {mapContent}
        </div>
      )}
      
      <div className="mt-3 text-xs text-gray-600 text-center">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-blue-500 rounded-full inline-block" /> Jij
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-red-500 rounded-full inline-block" /> Open
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-green-500 rounded-full inline-block" /> Klaar
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-sky-400 inline-block" /> Ingang
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-amber-500 inline-block" /> Uitgang
          </span>
          {isMultiFloor && (
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-indigo-400 rounded-sm inline-block" /> Trap
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Minimap;
