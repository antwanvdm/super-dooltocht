import { useState, useMemo, useEffect } from 'react';
import { generateBinary, validateBinary, getHint, getViolations } from '../../utils/binaryGenerator';
import PuzzleRulesCard from './PuzzleRulesCard';

function BinaryGame({ mathSettings, onSuccess }) {
  const pl = mathSettings?.puzzleLevel;
  const level = (typeof pl === 'object' ? pl?.binary : pl) || 'easy';

  const { puzzle, solution, size } = useMemo(() => {
    const data = generateBinary(level);
    return { puzzle: data.grid.map(r => [...r]), solution: data.solution, size: data.size };
  }, [level]);

  const [grid, setGrid] = useState(() => puzzle.map(r => [...r]));
  const [given] = useState(() => puzzle.map(r => r.map(v => v !== -1)));
  const [hintCell, setHintCell] = useState(null);
  const [checked, setChecked] = useState(false);
  const [violations, setViolations] = useState(() => Array.from({ length: size }, () => Array(size).fill(false)));
  const [checkMessage, setCheckMessage] = useState(null);
  const [showRules, setShowRules] = useState(false);

  useEffect(() => {
    if (!hintCell) return;
    const t = setTimeout(() => setHintCell(null), 3000);
    return () => clearTimeout(t);
  }, [hintCell]);

  const handleCellClick = (r, c) => {
    if (given[r][c]) return;

    const newGrid = grid.map(row => [...row]);
    // Cycle: -1 → 0 → 1 → -1
    const val = newGrid[r][c];
    newGrid[r][c] = val === -1 ? 0 : val === 0 ? 1 : -1;
    setGrid(newGrid);
    setHintCell(null);
    if (checked) {
      setChecked(false);
      setViolations(Array.from({ length: size }, () => Array(size).fill(false)));
      setCheckMessage(null);
    }
  };

  const handleCheck = () => {
    const full = grid.every(row => row.every(v => v !== -1));
    if (!full) {
      setCheckMessage('Vul eerst alle vakjes in!');
      return;
    }
    // Use validateBinary to accept any valid solution (not just the stored one)
    if (validateBinary(grid.map(r => [...r]), size)) {
      onSuccess();
      return;
    }
    // Highlight cells with rule violations
    const v = Array.from({ length: size }, () => Array(size).fill(false));
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (grid[r][c] !== -1 && getViolations(grid, r, c, size).length > 0) {
          v[r][c] = true;
        }
      }
    }
    setViolations(v);
    setChecked(true);
    setCheckMessage('Er zitten nog foutjes in! Kijk nog eens goed. 🔍');
  };

  const handleHint = () => {
    const hint = getHint(grid, solution);
    if (hint) {
      const newGrid = grid.map(row => [...row]);
      newGrid[hint.row][hint.col] = hint.value;
      setGrid(newGrid);
      setHintCell([hint.row, hint.col]);
      if (checked) {
        setChecked(false);
        setViolations(Array.from({ length: size }, () => Array(size).fill(false)));
        setCheckMessage(null);
      }
    }
  };

  const cellSize = size <= 6 ? 'w-11 h-11 sm:w-14 sm:h-14 text-xl sm:text-2xl' :
    size <= 8 ? 'w-9 h-9 sm:w-12 sm:h-12 text-lg sm:text-xl' :
      'w-7 h-7 sm:w-10 sm:h-10 text-sm sm:text-lg';

  return (
    <div className="text-center">
      <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
        Vul het raster met nullen en enen. Gebruik de uitlegknop als je het spel nog niet kent.
      </p>

      {/* Grid */}
      <div className="inline-block border-2 border-gray-800 rounded-lg overflow-hidden mb-3 sm:mb-4">
        {grid.map((row, r) => (
          <div key={r} className="flex">
            {row.map((val, c) => {
              const isGiven = given[r][c];
              const isViolation = checked && violations[r][c];
              const isHint = hintCell && hintCell[0] === r && hintCell[1] === c;

              return (
                <button
                  key={c}
                  onClick={() => handleCellClick(r, c)}
                  className={`${cellSize} flex items-center justify-center font-bold transition-all border border-gray-300 ${
                    isHint ? 'bg-yellow-100 animate-pulse' :
                    isViolation ? 'bg-red-100' :
                    isGiven ? 'bg-gray-100' :
                    'bg-white hover:bg-gray-50'
                  } ${isGiven ? 'cursor-default' : 'cursor-pointer'} ${
                    val === 0 ? 'text-blue-600' : val === 1 ? 'text-orange-600' : 'text-gray-300'
                  }`}
                  aria-label={`Rij ${r + 1}, kolom ${c + 1}${val !== -1 ? `, waarde ${val}` : ', leeg'}`}
                >
                  {val === -1 ? '·' : val}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 sm:gap-6 mb-3 sm:mb-4 text-sm sm:text-base text-gray-600">
        <span>Tik om te wisselen: <span className="text-gray-400">·</span> → <span className="text-blue-600 font-bold">0</span> → <span className="text-orange-600 font-bold">1</span> → <span className="text-gray-400">·</span></span>
      </div>

      {/* Hint + Rules + Check buttons */}
      <div className="flex justify-center gap-3 sm:gap-4">
        <button
          onClick={handleHint}
          className="px-4 sm:px-6 py-2 sm:py-2.5 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold rounded-xl shadow-md transition-all hover:scale-105 text-sm sm:text-base"
          aria-label="Hint: vul één cel in"
        >
          💡 Hint
        </button>
        <button
          onClick={() => setShowRules(true)}
          className="px-4 sm:px-6 py-2 sm:py-2.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold rounded-xl shadow-md transition-all hover:scale-105 text-sm sm:text-base"
          aria-label="Uitleg over de regels"
        >
          ❓ Uitleg
        </button>
        <button
          onClick={handleCheck}
          className="px-4 sm:px-6 py-2 sm:py-2.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-md transition-all hover:scale-105 text-sm sm:text-base"
          aria-label="Controleer je antwoorden"
        >
          ✅ Controleer
        </button>
      </div>

      {checkMessage && (
        <p className={`mt-3 font-medium text-sm sm:text-base ${checked ? 'text-red-500' : 'text-amber-600'}`}>
          {checkMessage}
        </p>
      )}

      {showRules && <PuzzleRulesCard puzzleType="binary" onClose={() => setShowRules(false)} />}
    </div>
  );
}

export default BinaryGame;
