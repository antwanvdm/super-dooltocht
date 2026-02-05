// Minimap - overzicht rechtsboven

function Minimap({ maze, playerPos, challenges, theme, maxHeight = null }) {
  const cellSize = 8; // pixels per cel
  const height = maze.length;
  const width = maze[0].length;

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
        {maze.map((row, y) =>
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

        {/* Render challenges */}
        {challenges.map((challenge) => (
          <circle
            key={challenge.id}
            cx={challenge.x * cellSize + cellSize / 2}
            cy={challenge.y * cellSize + cellSize / 2}
            r={cellSize / 2}
            fill={challenge.completed ? '#22c55e' : '#ef4444'}
          />
        ))}

        {/* Start marker */}
        <rect
          x={1 * cellSize}
          y={1 * cellSize}
          width={cellSize}
          height={cellSize}
          fill="#38bdf8"
        />

        {/* Exit marker */}
        <rect
          x={(maze[0].length - 2) * cellSize}
          y={(maze.length - 2) * cellSize}
          width={cellSize}
          height={cellSize}
          fill="#f59e0b"
        />

        {/* Render player */}
        <circle
          cx={playerPos.x * cellSize + cellSize / 2}
          cy={playerPos.y * cellSize + cellSize / 2}
          r={cellSize / 2}
          fill="#3b82f6"
          stroke="#1e40af"
          strokeWidth="1"
        />
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
        </div>
      </div>
    </div>
  );
}

export default Minimap;
