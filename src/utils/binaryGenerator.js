// Binary (Binair / Takuzu) puzzle generator.
// Rules: fill with 0/1, no three consecutive same in row/col,
// equal count of 0s and 1s per row/col, all rows unique, all cols unique.

/**
 * @param {'easy'|'medium'|'hard'} level
 * @returns {{ grid: number[][], solution: number[][], size: number }}
 */
export function generateBinary(level = 'easy') {
  const config = {
    easy: { size: 6, givens: 16 },
    medium: { size: 8, givens: 26 },
    hard: { size: 10, givens: 40 },
  };
  const { size, givens } = config[level] || config.easy;

  let solution;
  let attempts = 0;
  do {
    solution = createEmptyGrid(size);
    attempts++;
  } while (!fillBinary(solution, size) && attempts < 50);

  const grid = solution.map((row) => [...row]);
  removeCells(grid, size, size * size - givens);

  return { grid, solution, size };
}

function createEmptyGrid(size) {
  // Use -1 for empty (since 0 is a valid value)
  return Array.from({ length: size }, () => Array(size).fill(-1));
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function isValidBinary(grid, row, col, num, size) {
  // Check no three consecutive in row
  grid[row][col] = num;

  // Row: three consecutive
  for (let c = 0; c <= size - 3; c++) {
    if (
      grid[row][c] !== -1 &&
      grid[row][c] === grid[row][c + 1] &&
      grid[row][c] === grid[row][c + 2]
    ) {
      grid[row][col] = -1;
      return false;
    }
  }

  // Col: three consecutive
  for (let r = 0; r <= size - 3; r++) {
    if (
      grid[r][col] !== -1 &&
      grid[r][col] === grid[r + 1][col] &&
      grid[r][col] === grid[r + 2][col]
    ) {
      grid[row][col] = -1;
      return false;
    }
  }

  // Count in row: no more than size/2 of each
  const half = size / 2;
  let rowZeros = 0,
    rowOnes = 0;
  for (let c = 0; c < size; c++) {
    if (grid[row][c] === 0) rowZeros++;
    if (grid[row][c] === 1) rowOnes++;
  }
  if (rowZeros > half || rowOnes > half) {
    grid[row][col] = -1;
    return false;
  }

  // Count in col: no more than size/2 of each
  let colZeros = 0,
    colOnes = 0;
  for (let r = 0; r < size; r++) {
    if (grid[r][col] === 0) colZeros++;
    if (grid[r][col] === 1) colOnes++;
  }
  if (colZeros > half || colOnes > half) {
    grid[row][col] = -1;
    return false;
  }

  grid[row][col] = -1;
  return true;
}

function fillBinary(grid, size) {
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === -1) {
        const nums = shuffle([0, 1]);
        for (const n of nums) {
          if (isValidBinary(grid, r, c, n, size)) {
            grid[r][c] = n;
            if (fillBinary(grid, size)) {
              // After complete fill, check row/col uniqueness
              if (r === size - 1 && c === size - 1) {
                return hasUniqueRowsAndCols(grid, size);
              }
              return true;
            }
            grid[r][c] = -1;
          }
        }
        return false;
      }
    }
  }
  return hasUniqueRowsAndCols(grid, size);
}

function hasUniqueRowsAndCols(grid, size) {
  // Check unique rows
  const rows = grid.map((row) => row.join(''));
  if (new Set(rows).size !== size) return false;

  // Check unique cols
  const cols = [];
  for (let c = 0; c < size; c++) {
    cols.push(grid.map((row) => row[c]).join(''));
  }
  if (new Set(cols).size !== size) return false;

  return true;
}

function removeCells(grid, size, toRemove) {
  const positions = shuffle(
    Array.from({ length: size * size }, (_, i) => [
      Math.floor(i / size),
      i % size,
    ]),
  );
  let removed = 0;
  for (const [r, c] of positions) {
    if (removed >= toRemove) break;
    if (grid[r][c] !== -1) {
      grid[r][c] = -1;
      removed++;
    }
  }
}

/**
 * Validate a completed binary grid.
 */
export function validateBinary(grid, size) {
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === -1) return false;
    }
  }

  // No three consecutive
  for (let r = 0; r < size; r++) {
    for (let c = 0; c <= size - 3; c++) {
      if (grid[r][c] === grid[r][c + 1] && grid[r][c] === grid[r][c + 2])
        return false;
    }
  }
  for (let c = 0; c < size; c++) {
    for (let r = 0; r <= size - 3; r++) {
      if (grid[r][c] === grid[r + 1][c] && grid[r][c] === grid[r + 2][c])
        return false;
    }
  }

  // Equal count
  const half = size / 2;
  for (let r = 0; r < size; r++) {
    if (grid[r].filter((v) => v === 0).length !== half) return false;
  }
  for (let c = 0; c < size; c++) {
    if (grid.map((row) => row[c]).filter((v) => v === 0).length !== half)
      return false;
  }

  return hasUniqueRowsAndCols(grid, size);
}

/**
 * Find one empty cell to hint.
 */
export function getHint(grid, solution) {
  const emptyCells = [];
  const wrongCells = [];
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === -1) {
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

/**
 * Check if a specific placement violates binary rules (for real-time feedback).
 * Returns array of violation descriptions.
 */
export function getViolations(grid, row, col, size) {
  const violations = [];
  const val = grid[row][col];
  if (val === -1) return violations;

  // Three consecutive in row
  for (let c = Math.max(0, col - 2); c <= Math.min(size - 3, col); c++) {
    if (
      grid[row][c] !== -1 &&
      grid[row][c] === grid[row][c + 1] &&
      grid[row][c] === grid[row][c + 2]
    ) {
      violations.push('row-triple');
      break;
    }
  }

  // Three consecutive in col
  for (let r = Math.max(0, row - 2); r <= Math.min(size - 3, row); r++) {
    if (
      grid[r][col] !== -1 &&
      grid[r][col] === grid[r + 1][col] &&
      grid[r][col] === grid[r + 2][col]
    ) {
      violations.push('col-triple');
      break;
    }
  }

  // Too many of one value in row
  const half = size / 2;
  const rowCount = grid[row].filter((v) => v === val).length;
  if (rowCount > half) violations.push('row-count');

  // Too many of one value in col
  const colCount = grid.map((r) => r[col]).filter((v) => v === val).length;
  if (colCount > half) violations.push('col-count');

  return violations;
}
