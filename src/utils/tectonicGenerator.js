// Tectonic (Suguru) puzzle generator.
// Generates a grid with irregular regions; each region of size N
// must contain the numbers 1..N. Adjacent cells (incl. diagonal)
// may not have the same number.

/**
 * @param {'easy'|'medium'|'hard'} level
 * @returns {{ grid: number[][], solution: number[][], regions: number[][], size: number }}
 */
export function generateTectonic(level = 'easy') {
  const config = {
    easy: { size: 4, minRegion: 2, maxRegion: 4, givens: 7 },
    medium: { size: 5, minRegion: 2, maxRegion: 5, givens: 10 },
  };
  const { size, minRegion, maxRegion, givens } = config[level] || config.easy;

  let regions, solution;
  let attempts = 0;
  // Retry if we can't fill the grid (rare but possible with unlucky regions)
  do {
    regions = generateRegions(size, minRegion, maxRegion);
    solution = createEmptyGrid(size);
    attempts++;
  } while (!fillTectonic(solution, regions, size) && attempts < 100);

  const grid = solution.map((row) => [...row]);
  removeCells(grid, size, size * size - givens);

  return { grid, solution, regions, size };
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

/**
 * Generate irregular regions using a flood-fill approach.
 * Returns a 2D array where regions[r][c] is the region ID (0-based).
 */
function generateRegions(size, minRegion, maxRegion) {
  const regions = Array.from({ length: size }, () => Array(size).fill(-1));
  const cells = shuffle(
    Array.from({ length: size * size }, (_, i) => [
      Math.floor(i / size),
      i % size,
    ]),
  );

  let regionId = 0;
  for (const [startR, startC] of cells) {
    if (regions[startR][startC] !== -1) continue;

    const targetSize =
      minRegion + Math.floor(Math.random() * (maxRegion - minRegion + 1));
    const region = [[startR, startC]];
    regions[startR][startC] = regionId;

    let frontier = getNeighbors4(startR, startC, size).filter(
      ([r, c]) => regions[r][c] === -1,
    );

    while (region.length < targetSize && frontier.length > 0) {
      shuffle(frontier);
      const [nr, nc] = frontier.pop();
      if (regions[nr][nc] !== -1) {
        frontier = frontier.filter(([r, c]) => regions[r][c] === -1);
        continue;
      }
      regions[nr][nc] = regionId;
      region.push([nr, nc]);
      for (const [r, c] of getNeighbors4(nr, nc, size)) {
        if (
          regions[r][c] === -1 &&
          !frontier.some(([fr, fc]) => fr === r && fc === c)
        ) {
          frontier.push([r, c]);
        }
      }
    }
    regionId++;
  }

  // Merge regions smaller than minRegion into an adjacent region
  const regionSizes = {};
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      regionSizes[regions[r][c]] = (regionSizes[regions[r][c]] || 0) + 1;
    }
  }
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (regionSizes[regions[r][c]] < minRegion) {
        const oldId = regions[r][c];
        // Find adjacent region to merge into
        for (const [nr, nc] of getNeighbors4(r, c, size)) {
          if (regions[nr][nc] !== oldId) {
            const newId = regions[nr][nc];
            // Reassign all cells of oldId to newId
            for (let row = 0; row < size; row++) {
              for (let col = 0; col < size; col++) {
                if (regions[row][col] === oldId) regions[row][col] = newId;
              }
            }
            regionSizes[newId] += regionSizes[oldId];
            regionSizes[oldId] = 0;
            break;
          }
        }
      }
    }
  }

  return regions;
}

function getNeighbors4(r, c, size) {
  return [
    [r - 1, c],
    [r + 1, c],
    [r, c - 1],
    [r, c + 1],
  ].filter(([nr, nc]) => nr >= 0 && nr < size && nc >= 0 && nc < size);
}

function getNeighbors8(r, c, size) {
  const result = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
        result.push([nr, nc]);
      }
    }
  }
  return result;
}

/**
 * Get the size of a region (number of cells).
 */
function getRegionSize(regions, regionId, size) {
  let count = 0;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (regions[r][c] === regionId) count++;
    }
  }
  return count;
}

function isValidTectonic(grid, regions, r, c, num, size) {
  // Check: no same number in adjacent cells (8-connected)
  for (const [nr, nc] of getNeighbors8(r, c, size)) {
    if (grid[nr][nc] === num) return false;
  }
  // Check: no duplicate in same region
  const regionId = regions[r][c];
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (
        regions[row][col] === regionId &&
        grid[row][col] === num &&
        (row !== r || col !== c)
      ) {
        return false;
      }
    }
  }
  return true;
}

function fillTectonic(grid, regions, size) {
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === 0) {
        const regionSize = getRegionSize(regions, regions[r][c], size);
        const nums = shuffle(
          Array.from({ length: regionSize }, (_, i) => i + 1),
        );
        for (const n of nums) {
          if (isValidTectonic(grid, regions, r, c, n, size)) {
            grid[r][c] = n;
            if (fillTectonic(grid, regions, size)) return true;
            grid[r][c] = 0;
          }
        }
        return false;
      }
    }
  }
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
    if (grid[r][c] !== 0) {
      grid[r][c] = 0;
      removed++;
    }
  }
}

/**
 * Validate a completed tectonic grid.
 */
export function validateTectonic(grid, regions, size) {
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === 0) return false;
      const num = grid[r][c];
      grid[r][c] = 0;
      const valid = isValidTectonic(grid, regions, r, c, num, size);
      grid[r][c] = num;
      if (!valid) return false;
    }
  }
  return true;
}

/**
 * Find one empty cell to hint.
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

/**
 * Get all cells belonging to a specific region.
 */
export function getRegionCells(regions, regionId, size) {
  const cells = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (regions[r][c] === regionId) cells.push([r, c]);
    }
  }
  return cells;
}
