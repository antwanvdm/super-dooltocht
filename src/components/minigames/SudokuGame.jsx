import { useState, useMemo, useEffect } from 'react';
import { generateSudoku, validateSudoku, getHint } from '../../utils/sudokuGenerator';
import PuzzleRulesCard from './PuzzleRulesCard';

function SudokuGame({ mathSettings, onSuccess, theme }) {
  const pl = mathSettings?.puzzleLevel;
  const level = (typeof pl === 'object' ? pl?.sudoku : pl) || 'easy';

  const { puzzle, solution, size, blockRows, blockCols } = useMemo(() => {
    const data = generateSudoku(level);
    return { puzzle: data.grid.map(r => [...r]), solution: data.solution, size: data.size, blockRows: data.blockRows, blockCols: data.blockCols };
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
    // Clear check state when player edits
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
    // Use validateSudoku for proper validation
    if (validateSudoku(grid.map(r => [...r]), size, blockRows, blockCols)) {
      onSuccess();
      return;
    }
    // Show which cells differ from solution
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

  const cellSize = size <= 4 ? 'w-14 h-14 sm:w-16 sm:h-16 text-xl sm:text-2xl' :
    size <= 6 ? 'w-11 h-11 sm:w-13 sm:h-13 text-lg sm:text-xl' :
      'w-8 h-8 sm:w-9 sm:h-9 text-sm sm:text-base';

  return (
    <div className="text-center">
      <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
        Vul de getallen 1-{size} in. Gebruik de uitlegknop als je het spel nog niet kent.
      </p>

      {/* Grid */}
      <div className="inline-block border-2 border-gray-800 rounded-lg overflow-hidden mb-3 sm:mb-4">
        {grid.map((row, r) => (
          <div key={r} className="flex">
            {row.map((val, c) => {
              const isSelected = selected && selected[0] === r && selected[1] === c;
              const isGiven = given[r][c];
              const isError = checked && errors[r][c];
              const isHint = hintCell && hintCell[0] === r && hintCell[1] === c;

              // Block borders
              const borderRight = (c + 1) % blockCols === 0 && c < size - 1 ? 'border-r-2 border-r-gray-800' : 'border-r border-r-gray-300';
              const borderBottom = (r + 1) % blockRows === 0 && r < size - 1 ? 'border-b-2 border-b-gray-800' : 'border-b border-b-gray-300';

              return (
                <button
                  key={c}
                  onClick={() => handleCellClick(r, c)}
                  className={`${cellSize} flex items-center justify-center font-bold transition-all ${borderRight} ${borderBottom} ${
                    isSelected ? 'bg-indigo-200 ring-2 ring-indigo-500' :
                    isHint ? 'bg-yellow-100 animate-pulse' :
                    isError ? 'bg-red-100 text-red-600' :
                    isGiven ? 'bg-gray-100 text-gray-800' :
                    'bg-white text-indigo-700 hover:bg-indigo-50'
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

      {/* Number input buttons */}
      <div className="flex justify-center flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4">
        {Array.from({ length: size }, (_, i) => i + 1).map(num => (
          <button
            key={num}
            onClick={() => handleNumberInput(num)}
            className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl font-bold text-base sm:text-xl transition-all ${
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

      {showRules && <PuzzleRulesCard puzzleType="sudoku" onClose={() => setShowRules(false)} theme={theme} />}
    </div>
  );
}

export default SudokuGame;
