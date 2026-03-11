// Sudoku puzzle generator with three difficulty levels.
// Generates valid, solvable puzzles via backtracking.

/**
 * @param {'easy'|'medium'|'hard'} level
 * @returns {{ grid: number[][], solution: number[][], size: number, blockRows: number, blockCols: number }}
 */
export function generateSudoku(level = 'easy') {
  const config = {
    easy: { size: 4, blockRows: 2, blockCols: 2, givens: 7 },
    medium: { size: 6, blockRows: 2, blockCols: 3, givens: 16 },
    hard: { size: 9, blockRows: 3, blockCols: 3, givens: 30 },
  };
  const { size, blockRows, blockCols, givens } = config[level] || config.easy;

  const solution = createEmptyGrid(size);
  fillGrid(solution, size, blockRows, blockCols);

  const grid = solution.map((row) => [...row]);
  removeClues(grid, size, size * size - givens);

  return { grid, solution, size, blockRows, blockCols };
}

function createEmptyGrid(size) {
  return Array.from({ length: size }, () => Array(size).fill(0));
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function isValid(grid, row, col, num, size, blockRows, blockCols) {
  for (let i = 0; i < size; i++) {
    if (grid[row][i] === num || grid[i][col] === num) return false;
  }
  const startRow = Math.floor(row / blockRows) * blockRows;
  const startCol = Math.floor(col / blockCols) * blockCols;
  for (let r = startRow; r < startRow + blockRows; r++) {
    for (let c = startCol; c < startCol + blockCols; c++) {
      if (grid[r][c] === num) return false;
    }
  }
  return true;
}

function fillGrid(grid, size, blockRows, blockCols) {
  const nums = Array.from({ length: size }, (_, i) => i + 1);
  function solve() {
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (grid[r][c] === 0) {
          for (const n of shuffle([...nums])) {
            if (isValid(grid, r, c, n, size, blockRows, blockCols)) {
              grid[r][c] = n;
              if (solve()) return true;
              grid[r][c] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }
  solve();
}

function removeClues(grid, size, toRemove) {
  const positions = shuffle(
    Array.from({ length: size * size }, (_, i) => [
      Math.floor(i / size),
      i % size,
    ]),
  );
  let removed = 0;
  for (const [r, c] of positions) {
    if (removed >= toRemove) break;
    if (grid[r][c] !== 0) {
      grid[r][c] = 0;
      removed++;
    }
  }
}

/**
 * Check if a completed grid is valid.
 * @param {number[][]} grid
 * @param {number} size
 * @param {number} blockRows
 * @param {number} blockCols
 * @returns {boolean}
 */
export function validateSudoku(grid, size, blockRows, blockCols) {
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === 0) return false;
      const num = grid[r][c];
      // Temporarily clear to reuse isValid
      grid[r][c] = 0;
      const valid = isValid(grid, r, c, num, size, blockRows, blockCols);
      grid[r][c] = num;
      if (!valid) return false;
    }
  }
  return true;
}

/**
 * Find one empty cell that can be filled (for hint system).
 * @returns {{ row: number, col: number, value: number } | null}
 */
export function getHint(grid, solution) {
  const emptyCells = [];
  const wrongCells = [];
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === 0) {
        emptyCells.push({ row: r, col: c, value: solution[r][c] });
      } else if (grid[r][c] !== solution[r][c]) {
        wrongCells.push({ row: r, col: c, value: solution[r][c] });
      }
    }
  }
  const candidates = emptyCells.length > 0 ? emptyCells : wrongCells;
  if (candidates.length === 0) return null;
  return candidates[Math.floor(Math.random() * candidates.length)];
}
