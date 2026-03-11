import { useState, useMemo, useEffect } from 'react';
import { generateTectonic, validateTectonic, getHint } from '../../utils/tectonicGenerator';
import PuzzleRulesCard from './PuzzleRulesCard';

// Pastel colors for regions
const REGION_COLORS = [
  'bg-blue-50', 'bg-pink-50', 'bg-green-50', 'bg-yellow-50',
  'bg-purple-50', 'bg-orange-50', 'bg-teal-50', 'bg-red-50',
  'bg-indigo-50', 'bg-lime-50', 'bg-cyan-50', 'bg-amber-50',
  'bg-rose-50', 'bg-emerald-50', 'bg-sky-50', 'bg-fuchsia-50',
];

function TectonicGame({ mathSettings, onSuccess, theme }) {
  const pl = mathSettings?.puzzleLevel;
  const level = (typeof pl === 'object' ? pl?.tectonic : pl) || 'easy';

  const { puzzle, solution, regions, size } = useMemo(() => {
    const data = generateTectonic(level);
    return { puzzle: data.grid.map(r => [...r]), solution: data.solution, regions: data.regions, size: data.size };
  }, [level]);

  const [grid, setGrid] = useState(() => puzzle.map(r => [...r]));
  const [given] = useState(() => puzzle.map(r => r.map(v => v !== 0)));
  const [selected, setSelected] = useState(null);
  const [hintCell, setHintCell] = useState(null);
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState(() => Array.from({ length: size }, () => Array(size).fill(false)));
  const [checkMessage, setCheckMessage] = useState(null);
  const [showRules, setShowRules] = useState(false);

  useEffect(() => {
    if (!hintCell) return;
    const t = setTimeout(() => setHintCell(null), 3000);
    return () => clearTimeout(t);
  }, [hintCell]);

  // Compute max number per region
  const regionMaxNum = useMemo(() => {
    const maxMap = {};
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const id = regions[r][c];
        maxMap[id] = (maxMap[id] || 0) + 1;
      }
    }
    return maxMap;
  }, [regions, size]);

  const selectedRegionMax = selected ? regionMaxNum[regions[selected[0]][selected[1]]] : 0;

  const handleCellClick = (r, c) => {
    if (given[r][c]) return;
    setSelected([r, c]);
  };

  const handleNumberInput = (num) => {
    if (!selected) return;
    const [r, c] = selected;
    if (given[r][c]) return;

    const newGrid = grid.map(row => [...row]);
    newGrid[r][c] = newGrid[r][c] === num ? 0 : num;
    setGrid(newGrid);
    setHintCell(null);
    if (checked) {
      setChecked(false);
      setErrors(Array.from({ length: size }, () => Array(size).fill(false)));
      setCheckMessage(null);
    }
  };

  const handleCheck = () => {
    const full = grid.every(row => row.every(v => v !== 0));
    if (!full) {
      setCheckMessage('Vul eerst alle vakjes in!');
      return;
    }
    if (validateTectonic(grid.map(r => [...r]), regions, size)) {
      onSuccess();
      return;
    }
    const errs = Array.from({ length: size }, () => Array(size).fill(false));
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (grid[r][c] !== 0 && grid[r][c] !== solution[r][c]) {
          errs[r][c] = true;
        }
      }
    }
    setErrors(errs);
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
        setErrors(Array.from({ length: size }, () => Array(size).fill(false)));
        setCheckMessage(null);
      }
    }
  };

  // Determine border style per cell (thick borders between different regions)
  const getBorderClasses = (r, c) => {
    const id = regions[r][c];
    const classes = [];
    if (r === 0 || regions[r - 1][c] !== id) classes.push('border-t-2 border-t-gray-700');
    else classes.push('border-t border-t-gray-200');
    if (r === size - 1 || regions[r + 1][c] !== id) classes.push('border-b-2 border-b-gray-700');
    else classes.push('border-b border-b-gray-200');
    if (c === 0 || regions[r][c - 1] !== id) classes.push('border-l-2 border-l-gray-700');
    else classes.push('border-l border-l-gray-200');
    if (c === size - 1 || regions[r][c + 1] !== id) classes.push('border-r-2 border-r-gray-700');
    else classes.push('border-r border-r-gray-200');
    return classes.join(' ');
  };

  const cellSize = size <= 4 ? 'w-14 h-14 sm:w-16 sm:h-16 text-xl sm:text-2xl' :
    size <= 5 ? 'w-12 h-12 sm:w-14 sm:h-14 text-lg sm:text-xl' :
      'w-10 h-10 sm:w-12 sm:h-12 text-base sm:text-lg';

  return (
    <div className="text-center">
      <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
        Vul elke kleur aan met getallen. Gebruik de uitlegknop als je het spel nog niet kent.
      </p>

      {/* Grid */}
      <div className="inline-block rounded-lg overflow-hidden mb-3 sm:mb-4">
        {grid.map((row, r) => (
          <div key={r} className="flex">
            {row.map((val, c) => {
              const isSelected = selected && selected[0] === r && selected[1] === c;
              const isGiven = given[r][c];
              const isError = checked && errors[r][c];
              const isHint = hintCell && hintCell[0] === r && hintCell[1] === c;
              const regionColor = REGION_COLORS[regions[r][c] % REGION_COLORS.length];
              const borderClasses = getBorderClasses(r, c);

              return (
                <button
                  key={c}
                  onClick={() => handleCellClick(r, c)}
                  className={`${cellSize} flex items-center justify-center font-bold transition-all ${borderClasses} ${
                    isSelected ? 'bg-indigo-200 ring-2 ring-indigo-500 z-10' :
                    isHint ? 'bg-yellow-100 animate-pulse' :
                    isError ? 'bg-red-100 text-red-600' :
                    isGiven ? `${regionColor} text-gray-800` :
                    `${regionColor} text-indigo-700 hover:brightness-95`
                  } ${isGiven ? 'cursor-default' : 'cursor-pointer'}`}
                  aria-label={`Rij ${r + 1}, kolom ${c + 1}${val ? `, waarde ${val}` : ', leeg'}`}
                >
                  {val || ''}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Number input */}
      <div className="flex justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        {Array.from({ length: selectedRegionMax || Math.max(...Object.values(regionMaxNum)) }, (_, i) => i + 1).map(num => (
          <button
            key={num}
            onClick={() => handleNumberInput(num)}
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl font-bold text-lg sm:text-xl transition-all ${
              theme?.colors?.primary || 'bg-indigo-600'
            } text-white hover:scale-110 shadow-md active:scale-95`}
            aria-label={`Getal ${num}`}
          >
            {num}
          </button>
        ))}
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

      {showRules && <PuzzleRulesCard puzzleType="tectonic" onClose={() => setShowRules(false)} theme={theme} />}
    </div>
  );
}

export default TectonicGame;
