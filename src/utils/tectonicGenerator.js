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
    hard: { size: 6, minRegion: 2, maxRegion: 5, givens: 13 },
  };
  const { size, minRegion, maxRegion, givens } = config[level] || config.easy;

  // For hard (6×6), use a step limit per solve attempt to bail on slow layouts
  const stepLimit = size >= 6 ? 10000 : 0;

  let regions = null;
  let solution = null;
  for (let attempt = 0; attempt < 500; attempt++) {
    const r = generateRegions(size, minRegion, maxRegion);
    if (!r) continue; // Invalid region layout, try again
    const s = createEmptyGrid(size);
    const steps = stepLimit ? { count: 0, limit: stepLimit } : null;
    if (fillTectonic(s, r, size, buildRegionMaps(r, size), steps)) {
      regions = r;
      solution = s;
      break;
    }
  }

  // Should never happen, but guard: use a trivial 2×2-block region layout
  if (!solution || !regions) {
    regions = createFallbackRegions(size);
    solution = createEmptyGrid(size);
    fillTectonic(solution, regions, size, buildRegionMaps(regions, size), null);
  }

  const grid = solution.map((row) => [...row]);
  removeCells(grid, size, size * size - givens);

  return { grid, solution, regions, size };
}

/**
 * Fallback: create a region layout of 2×2 blocks.
 * These are always solvable because each 4-cell region has values 1-4,
 * giving the solver enough room to satisfy 8-connected adjacency.
 */
function createFallbackRegions(size) {
  const regions = Array.from({ length: size }, () => Array(size).fill(0));
  let id = 0;
  for (let r = 0; r < size; r += 2) {
    for (let c = 0; c < size; c += 2) {
      regions[r][c] = id;
      if (c + 1 < size) regions[r][c + 1] = id;
      if (r + 1 < size) regions[r + 1][c] = id;
      if (r + 1 < size && c + 1 < size) regions[r + 1][c + 1] = id;
      id++;
    }
  }
  return regions;
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
 * Returns a 2D array where regions[r][c] is the region ID (0-based),
 * or null if a valid layout could not be produced.
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
  // (prefer the smallest neighbor to maximise merge success)
  const regionSizes = {};
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      regionSizes[regions[r][c]] = (regionSizes[regions[r][c]] || 0) + 1;
    }
  }

  let changed = true;
  while (changed) {
    changed = false;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const curId = regions[r][c];
        if (regionSizes[curId] >= minRegion) continue;

        // Collect unique neighbor region IDs with their sizes
        const neighbors = [];
        for (const [nr, nc] of getNeighbors4(r, c, size)) {
          const nId = regions[nr][nc];
          if (nId !== curId && !neighbors.some(n => n.id === nId)) {
            neighbors.push({ id: nId, size: regionSizes[nId] });
          }
        }
        // Sort: prefer smallest neighbor (best chance of staying under maxRegion)
        neighbors.sort((a, b) => a.size - b.size);

        for (const { id: newId, size: nSize } of neighbors) {
          if (nSize + regionSizes[curId] <= maxRegion) {
            for (let row = 0; row < size; row++) {
              for (let col = 0; col < size; col++) {
                if (regions[row][col] === curId) regions[row][col] = newId;
              }
            }
            regionSizes[newId] += regionSizes[curId];
            regionSizes[curId] = 0;
            changed = true;
            break;
          }
        }
      }
    }
  }

  // Validate: all regions must be within [minRegion, maxRegion]
  for (const sz of Object.values(regionSizes)) {
    if (sz > 0 && (sz < minRegion || sz > maxRegion)) return null;
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

/**
 * Precompute lookup maps for region sizes and region cell lists.
 * Avoids O(n²) scans on every backtracking call.
 */
function buildRegionMaps(regions, size) {
  const regionSizeMap = {};
  const regionCellsMap = {};
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const id = regions[r][c];
      regionSizeMap[id] = (regionSizeMap[id] || 0) + 1;
      if (!regionCellsMap[id]) regionCellsMap[id] = [];
      regionCellsMap[id].push([r, c]);
    }
  }
  return { regionSizeMap, regionCellsMap };
}

function isValidTectonic(grid, regions, r, c, num, size, regionMaps) {
  // Check: no same number in adjacent cells (8-connected)
  for (const [nr, nc] of getNeighbors8(r, c, size)) {
    if (grid[nr][nc] === num) return false;
  }
  // Check: no duplicate in same region
  const regionId = regions[r][c];
  if (regionMaps) {
    for (const [row, col] of regionMaps.regionCellsMap[regionId]) {
      if (grid[row][col] === num && (row !== r || col !== c)) {
        return false;
      }
    }
  } else {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (regions[row][col] === regionId && grid[row][col] === num && (row !== r || col !== c)) {
          return false;
        }
      }
    }
  }
  return true;
}

/**
 * Get valid candidates for a cell.
 */
function getCandidates(grid, regions, r, c, size, regionMaps) {
  const regionSize = regionMaps.regionSizeMap[regions[r][c]];
  const candidates = [];
  for (let n = 1; n <= regionSize; n++) {
    if (isValidTectonic(grid, regions, r, c, n, size, regionMaps)) {
      candidates.push(n);
    }
  }
  return candidates;
}

function fillTectonic(grid, regions, size, regionMaps, steps) {
  // MRV heuristic: pick empty cell with fewest valid candidates
  let bestR = -1, bestC = -1, bestCandidates = null;
  let minCount = Infinity;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === 0) {
        const cands = getCandidates(grid, regions, r, c, size, regionMaps);
        if (cands.length === 0) return false; // Dead end: no valid values
        if (cands.length < minCount) {
          minCount = cands.length;
          bestR = r;
          bestC = c;
          bestCandidates = cands;
          if (minCount === 1) break; // Can't do better than 1
        }
      }
    }
    if (minCount === 1) break;
  }
  if (bestR === -1) return true; // All cells filled

  shuffle(bestCandidates);
  for (const n of bestCandidates) {
    if (steps && ++steps.count > steps.limit) return false; // Bail on slow region layout
    grid[bestR][bestC] = n;
    if (fillTectonic(grid, regions, size, regionMaps, steps)) return true;
    grid[bestR][bestC] = 0;
  }
  return false;
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
