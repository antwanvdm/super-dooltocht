import { useState, useEffect } from 'react';
import { getVoorangSituation } from '../../utils/voorrangData';

// SVG layout constants (200×200 viewBox)
const CX = 100; // center x
const CY = 100; // center y
const RW = 28;  // road half-width — full road width = 56px

const INT_L = CX - RW; // 72  — left edge of intersection
const INT_R = CX + RW; // 128 — right edge of intersection
const INT_T = CY - RW; // 72  — top edge of intersection
const INT_B = CY + RW; // 128 — bottom edge of intersection

const ROAD_COLOR = '#9ca3af';
const GRASS_COLOR = '#86efac';
const LINE_COLOR = 'rgba(255,255,255,0.55)';
const BIKE_COLOR = '#f87171'; // red = Dutch fietspad surface

// Vehicle positions: center of right lane, ~38px from intersection edge
// "going" = direction of travel
const VEHICLE_POS = {
  north: { x: CX + 14, y: INT_B + 37 }, // approaching from south
  south: { x: CX - 14, y: INT_T - 37 }, // approaching from north
  east:  { x: INT_L - 37, y: CY + 14 }, // approaching from west (right-hand lane = south side)
  west:  { x: INT_R + 37, y: CY - 14 }, // approaching from east (right-hand lane = north side)
};

// Arrow SVG path pointing in the direction of travel (centered at vehicle position)
function arrowPath(x, y, going) {
  const d = 18; // distance from center to tip
  const w = 5;  // half-width of arrow base
  switch (going) {
    case 'north': return `M ${x},${y - d} L ${x - w},${y - d + 9} L ${x + w},${y - d + 9} Z`;
    case 'south': return `M ${x},${y + d} L ${x - w},${y + d - 9} L ${x + w},${y + d - 9} Z`;
    case 'east':  return `M ${x + d},${y} L ${x + d - 9},${y - w} L ${x + d - 9},${y + w} Z`;
    case 'west':  return `M ${x - d},${y} L ${x - d + 9},${y - w} L ${x - d + 9},${y + w} Z`;
    default:      return '';
  }
}

// Renders a single vehicle at its calculated road position
function Vehicle({ going, type, isPlayer }) {
  const pos = VEHICLE_POS[going];
  if (!pos) return null;
  const { x, y } = pos;

  return (
    <g>
      {isPlayer ? (
        <circle cx={x} cy={y} r={13} fill="#22c55e" stroke="white" strokeWidth={2} />
      ) : type === 'car' ? (
        <g>
          <rect x={x - 9} y={y - 13} width={18} height={26} rx={3} fill="#ef4444" stroke="white" strokeWidth={1.5} />
          <rect x={x - 7} y={y - 11} width={14} height={8} rx={2} fill="#fca5a5" />
        </g>
      ) : (
        <circle cx={x} cy={y} r={13} fill="#f97316" stroke="white" strokeWidth={2} />
      )}
      <path d={arrowPath(x, y, going)} fill="white" />
    </g>
  );
}

// Shark teeth (haaientanden) at a specific road entry
// Tips point toward the approaching vehicle (outward from the intersection)
function SharkTeeth({ road }) {
  const sz = 8; // tooth depth
  if (road === 'south') {
    // At south edge of intersection (y=INT_B), teeth point south
    return (
      <g>
        {[INT_L + 4, INT_L + 16, INT_L + 28, INT_L + 40, INT_L + 52].filter(x => x + 6 <= INT_R).map(x => (
          <polygon key={x} points={`${x},${INT_B - 1} ${x + 6},${INT_B - 1} ${x + 3},${INT_B + sz - 1}`} fill="white" />
        ))}
      </g>
    );
  }
  if (road === 'east') {
    // At east edge of intersection (x=INT_R), teeth point east
    return (
      <g>
        {[INT_T + 4, INT_T + 16, INT_T + 28, INT_T + 40, INT_T + 52].filter(y => y + 6 <= INT_B).map(y => (
          <polygon key={y} points={`${INT_R - 1},${y} ${INT_R - 1},${y + 6} ${INT_R + sz - 1},${y + 3}`} fill="white" />
        ))}
      </g>
    );
  }
  if (road === 'west') {
    // At west edge of intersection (x=INT_L), teeth point west
    return (
      <g>
        {[INT_T + 4, INT_T + 16, INT_T + 28, INT_T + 40, INT_T + 52].filter(y => y + 6 <= INT_B).map(y => (
          <polygon key={y} points={`${INT_L + 1},${y} ${INT_L + 1},${y + 6} ${INT_L - sz + 1},${y + 3}`} fill="white" />
        ))}
      </g>
    );
  }
  if (road === 'north') {
    // At north edge of intersection (y=INT_T), teeth point north
    return (
      <g>
        {[INT_L + 4, INT_L + 16, INT_L + 28, INT_L + 40, INT_L + 52].filter(x => x + 6 <= INT_R).map(x => (
          <polygon key={x} points={`${x},${INT_T + 1} ${x + 6},${INT_T + 1} ${x + 3},${INT_T - sz + 1}`} fill="white" />
        ))}
      </g>
    );
  }
  return null;
}

// Dashed center lines outside the intersection
function CenterLines() {
  const dashLen = 10;
  const dashGap = 8;
  const lineWidth = 2;
  // N-S road: vertical dashes along x=CX, outside intersection
  const nsPositions = [];
  for (let y = 5; y < INT_T - 2; y += dashLen + dashGap) nsPositions.push(y);
  for (let y = INT_B + 5; y < 195; y += dashLen + dashGap) nsPositions.push(y);
  // E-W road: horizontal dashes along y=CY, outside intersection
  const ewPositions = [];
  for (let x = 5; x < INT_L - 2; x += dashLen + dashGap) ewPositions.push(x);
  for (let x = INT_R + 5; x < 195; x += dashLen + dashGap) ewPositions.push(x);

  return (
    <g fill={LINE_COLOR}>
      {nsPositions.map(y => (
        <rect key={`ns-${y}`} x={CX - lineWidth / 2} y={y} width={lineWidth} height={dashLen} />
      ))}
      {ewPositions.map(x => (
        <rect key={`ew-${x}`} x={x} y={CY - lineWidth / 2} width={dashLen} height={lineWidth} />
      ))}
    </g>
  );
}

// 4-way cross intersection SVG
function CrossSVG({ situation }) {
  const { others, markings, playerGoing } = situation;
  return (
    <svg viewBox="0 0 200 200" width="200" height="200" className="rounded-xl border border-gray-200 shadow-sm">
      {/* Grass background */}
      <rect x={0} y={0} width={200} height={200} fill={GRASS_COLOR} />

      {/* Road arms */}
      <rect x={INT_L} y={0} width={RW * 2} height={200} fill={ROAD_COLOR} />
      <rect x={0} y={INT_T} width={200} height={RW * 2} fill={ROAD_COLOR} />

      {/* Center dashed lines */}
      <CenterLines />

      {/* Shark teeth markings */}
      {markings.map((m, i) =>
        m.type === 'sharkTeeth' ? <SharkTeeth key={i} road={m.road} /> : null
      )}

      {/* Other vehicles */}
      {others.map((v, i) => (
        <Vehicle key={i} going={v.going} type={v.type} isPlayer={false} />
      ))}

      {/* Player (always green, always going north) */}
      <Vehicle going={playerGoing} type="bicycle" isPlayer={true} />
    </svg>
  );
}

// Dutch-style roundabout SVG:
// - Inner car ring (gray)
// - Outer fietspad ring (red, like Dutch bike paths)
// - 4 arms: each has a center car road + red bike paths on both sides
// - Car crosses the fietspad at the south arm crossing (player's fietspad)
// - Shark teeth on fietspad = car has right of way; no teeth = cyclist has right of way
function RoundaboutSVG({ situation }) {
  const { others, markings } = situation;

  // Roundabout geometry (center shifted up to leave room for player below)
  const rcx = 100, rcy = 78;
  const carR = 30;  // car ring outer radius
  const bikeR = 46; // bike ring outer radius (bike ring = 16px wide)
  const islandR = 12;
  const carHW = 12; // car road half-width (total 24px = 2 lanes)
  const bikeW = 14; // bike path width each side
  const sz = 7;     // shark tooth depth

  // N/S arm lane boundaries
  const carLeft  = rcx - carHW; // 88
  const carRight = rcx + carHW; // 112
  const bikeLOuter = carLeft  - bikeW; // 74 (left fietspad outer edge)
  const bikeROuter = carRight + bikeW; // 126 (right fietspad outer edge)

  // Ring outer edges (arm starts here)
  const armBottom = rcy + bikeR; // 124
  const armTop    = rcy - bikeR; // 32
  const armRight  = rcx + bikeR; // 146
  const armLeft   = rcx - bikeR; // 54

  // E/W arm lane boundaries
  const carTop = rcy - carHW; // 66
  const carBot = rcy + carHW; // 90
  const bikeTopOuter = carTop - bikeW; // 52
  const bikeBotOuter = carBot + bikeW; // 104

  // Shark teeth variants
  // Teeth on cyclist path (car crosses your fietspad, you must yield)
  const hasCarTeeth  = markings?.some((m) => m.type === 'sharkTeeth' && m.road === 'fietspad');
  // Teeth on car road (car must yield before crossing the fietspad)
  const hasCarRoadTeeth = markings?.some((m) => m.type === 'sharkTeeth' && m.road === 'carweg');
  // Teeth at ring entry (yield to cyclists already on fietsrotonde ring)
  const hasRingTeeth = markings?.some((m) => m.type === 'sharkTeeth' && m.road === 'fietsrotonde');

  // y position of the crossing: where the south car arm meets the right fietspad arm
  // armBottom = rcy + bikeR = 124. crossY is 4px above that = ring/arm junction.
  const crossY = armBottom - 4; // 120

  // Vehicle positions
  // Car: on the inner ring, exiting via south arm (going south = crossing the fietspad)
  const carCx = rcx - 6; // 94 — left lane of south car arm
  const carCy = 104;     // on the gray ring, below island (island bottom at y=90)
  const playerCx = carRight + 7; // 119 — center of right fietspad arm
  const playerCy = 146;  // lower on the arm so shark teeth stay clearly visible

  return (
    <svg viewBox="0 0 200 200" width="200" height="200" className="rounded-xl border border-gray-200 shadow-sm">
      {/* Grass background */}
      <rect x={0} y={0} width={200} height={200} fill={GRASS_COLOR} />

      {/* === ARM ROADS ===
           Rects extend to ring center (rcy/rcx) so the outer corners of the bike
           arm always overlap the ring circle — eliminates the curved gap at corners. */}
      {/* South */}
      <rect x={bikeLOuter} y={rcy} width={bikeW}     height={200 - rcy} fill={BIKE_COLOR} />
      <rect x={carLeft}    y={rcy} width={carHW * 2} height={200 - rcy} fill={ROAD_COLOR} />
      <rect x={carRight}   y={rcy} width={bikeW}     height={200 - rcy} fill={BIKE_COLOR} />
      {/* North */}
      <rect x={bikeLOuter} y={0} width={bikeW}     height={rcy} fill={BIKE_COLOR} />
      <rect x={carLeft}    y={0} width={carHW * 2} height={rcy} fill={ROAD_COLOR} />
      <rect x={carRight}   y={0} width={bikeW}     height={rcy} fill={BIKE_COLOR} />
      {/* East */}
      <rect x={rcx} y={bikeTopOuter} width={200 - rcx} height={bikeW}     fill={BIKE_COLOR} />
      <rect x={rcx} y={carTop}       width={200 - rcx} height={carHW * 2} fill={ROAD_COLOR} />
      <rect x={rcx} y={carBot}       width={200 - rcx} height={bikeW}     fill={BIKE_COLOR} />
      {/* West */}
      <rect x={0} y={bikeTopOuter} width={rcx} height={bikeW}     fill={BIKE_COLOR} />
      <rect x={0} y={carTop}       width={rcx} height={carHW * 2} fill={ROAD_COLOR} />
      <rect x={0} y={carBot}       width={rcx} height={bikeW}     fill={BIKE_COLOR} />

      {/* === RINGS === */}
      {/* Outer bike ring disk (pink) */}
      <circle cx={rcx} cy={rcy} r={bikeR} fill={BIKE_COLOR} />
      {/* Car ring disk (gray) — covers inner portion of bike ring */}
      <circle cx={rcx} cy={rcy} r={carR} fill={ROAD_COLOR} />

      {/* Re-punch car road through bike ring (gray over pink in ring zone) */}
      <rect x={carLeft} y={rcy + carR} width={carHW * 2} height={bikeR - carR} fill={ROAD_COLOR} />
      <rect x={carLeft} y={armTop}     width={carHW * 2} height={bikeR - carR} fill={ROAD_COLOR} />
      <rect x={rcx + carR} y={carTop}  width={bikeR - carR} height={carHW * 2} fill={ROAD_COLOR} />
      <rect x={armLeft}    y={carTop}  width={bikeR - carR} height={carHW * 2} fill={ROAD_COLOR} />

      {/* Center island */}
      <circle cx={rcx} cy={rcy} r={islandR} fill={GRASS_COLOR} />

      {/* Clockwise indicator */}
      <text x={rcx} y={rcy + 5} textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.7)">↻</text>

      {/* Center dashes in car arms */}
      {[130, 143, 156, 169, 182].map(y => (
        <rect key={`sd-${y}`} x={rcx - 1} y={y} width={2} height={8} fill={LINE_COLOR} />
      ))}
      {[5, 18].map(y => (
        <rect key={`nd-${y}`} x={rcx - 1} y={y} width={2} height={8} fill={LINE_COLOR} />
      ))}
      {[152, 165, 178, 191].map(x => (
        <rect key={`ed-${x}`} x={x} y={rcy - 1} width={8} height={2} fill={LINE_COLOR} />
      ))}
      {[5, 18, 31, 44].map(x => (
        <rect key={`wd-${x}`} x={x} y={rcy - 1} width={8} height={2} fill={LINE_COLOR} />
      ))}

      {/* Shark teeth: cyclist must yield — car crosses the fietspad.
           Tips point south (toward approaching cyclist). Right arm only. */}
      {hasCarTeeth && (
        <g>
          {[113, 120].map(x => (
            <polygon key={`ct-${x}`} points={`${x},${crossY} ${x + 5},${crossY} ${x + 2.5},${crossY + sz}`} fill="white" />
          ))}
        </g>
      )}

      {/* Shark teeth: car must yield before crossing the fietspad.
           Tips point north (toward car approaching from above). */}
      {hasCarRoadTeeth && (
        <g>
          {[91, 98].map(x => (
            <polygon key={`crt-${x}`} points={`${x},${crossY + 6} ${x + 5},${crossY + 6} ${x + 2.5},${crossY - 1}`} fill="white" />
          ))}
        </g>
      )}

      {/* Shark teeth: ring entry — yield to cyclists already on the fietsrotonde.
           Tips point south (toward approaching cyclist). */}
      {hasRingTeeth && (
        <g>
          {[113, 120].map(x => (
            <polygon key={`rt-${x}`} points={`${x},122 ${x + 5},122 ${x + 2.5},129`} fill="white" />
          ))}
        </g>
      )}

      {/* Vehicles: cars on the south arm, or cyclists on the ring when onRing=true */}
      {others.map((v, i) => {
        // onRing: place cyclist on the SW part of the fietspad ring (r≈35, going west)
        const vx = v.onRing ? 83 : carCx;
        const vy = v.onRing ? 109 : carCy;
        // turning: car is mid-turn exiting ring (-30° CCW = angled SW = turning right)
        const transform = v.turning ? `rotate(-30, ${vx}, ${vy})` : undefined;
        return (
          <g key={i} transform={transform}>
            {v.type === 'car' ? (
              <>
                <rect x={vx - 9} y={vy - 13} width={18} height={26} rx={3} fill="#ef4444" stroke="white" strokeWidth={1.5} />
                <rect x={vx - 7} y={vy - 11} width={14} height={8} rx={2} fill="#fca5a5" />
              </>
            ) : (
              <circle cx={vx} cy={vy} r={13} fill="#f97316" stroke="white" strokeWidth={2} />
            )}
            <path d={arrowPath(vx, vy, v.going)} fill="white" />
          </g>
        );
      })}

      {/* Player: on right fietspad arm, going north */}
      <circle cx={playerCx} cy={playerCy} r={13} fill="#22c55e" stroke="white" strokeWidth={2} />
      <path d={arrowPath(playerCx, playerCy, 'north')} fill="white" />
    </svg>
  );
}

function VoorrangQuiz({ mathSettings, onSuccess, onFailure }) {
  const [situation, setSituation] = useState(null);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    const level = mathSettings?.verkeerLevel?.voorrang || 'easy';
    const sit = getVoorangSituation(level);
    setSituation(sit);
    const opts = [
      { label: sit.correctAnswer, correct: true },
      { label: sit.wrongAnswer, correct: false },
    ].sort(() => Math.random() - 0.5);
    setShuffledOptions(opts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (option, index) => {
    if (showFeedback) return;
    setSelected(index);
    setShowFeedback(true);
    if (option.correct) {
      setTimeout(() => onSuccess(), 1500);
    } else {
      onFailure();
      setTimeout(() => {
        setShowFeedback(false);
        setSelected(null);
      }, 2000);
    }
  };

  if (!situation) return null;

  const hasOtherCar = situation.others.some((o) => o.type === 'car');
  const hasOtherBike = situation.others.some((o) => o.type === 'bicycle');

  return (
    <div className="text-center">
      <p className="text-gray-600 text-sm sm:text-base mb-2">Voorrang</p>

      {/* Legend */}
      <div className="flex justify-center gap-3 sm:gap-4 mb-3 text-xs sm:text-sm text-gray-600">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full bg-green-500" />
          Jij
        </span>
        {hasOtherCar && (
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-4 h-3 rounded-sm bg-red-500" />
            Auto
          </span>
        )}
        {hasOtherBike && (
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full bg-orange-500" />
            Fietser
          </span>
        )}
        {situation.layout === 'roundabout' && (
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-4 h-3 rounded-sm bg-red-400" />
            Fietspad
          </span>
        )}
        {situation.markings.some((m) => m.type === 'sharkTeeth') && (
          <span className="flex items-center gap-1.5">
            <span className="text-white bg-gray-500 rounded px-1 text-[10px] font-bold">▼▼</span>
            Haaientanden
          </span>
        )}
      </div>

      {/* Traffic diagram */}
      <div className="flex justify-center mb-3 sm:mb-4">
        {situation.layout === 'roundabout' ? (
          <RoundaboutSVG situation={situation} />
        ) : (
          <CrossSVG situation={situation} />
        )}
      </div>

      {/* Question */}
      <p className="text-base sm:text-lg font-bold text-gray-800 mb-4 max-w-xs sm:max-w-sm mx-auto">
        {situation.question}
      </p>

      {/* 2-option answer buttons */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-xs sm:max-w-sm mx-auto">
        {shuffledOptions.map((option, index) => {
          let btnClass =
            'bg-white border-2 border-gray-200 text-gray-700 hover:border-sky-400 hover:bg-sky-50';
          if (showFeedback && selected === index) {
            btnClass = option.correct
              ? 'bg-green-500 text-white border-2 border-green-600 scale-[1.02]'
              : 'bg-red-500 text-white border-2 border-red-600';
          }
          return (
            <button
              key={index}
              onClick={() => handleSelect(option, index)}
              disabled={showFeedback}
              className={`p-3 sm:p-4 rounded-xl font-bold text-base sm:text-lg transition-all ${btnClass}`}
              aria-label={`Antwoord: ${option.label}`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {showFeedback && selected !== null && (
        <div
          className={`mt-4 p-3 rounded-xl text-sm sm:text-base ${
            shuffledOptions[selected]?.correct
              ? 'bg-green-100 text-green-800'
              : 'bg-orange-100 text-orange-800'
          }`}
        >
          {shuffledOptions[selected]?.correct ? '🎉 Goed zo!' : '💪 Bijna! Probeer nog eens!'}
        </div>
      )}
    </div>
  );
}

export default VoorrangQuiz;
