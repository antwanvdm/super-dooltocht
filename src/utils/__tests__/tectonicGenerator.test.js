import { describe, it, expect } from 'vitest';
import {
  generateTectonic,
  validateTectonic,
  getHint,
  getRegionCells,
} from '../tectonicGenerator';

describe('generateTectonic', () => {
  it.each(['easy', 'medium', 'hard'])(
    'generates a valid puzzle for level=%s',
    (level) => {
      const { grid, solution, regions, size } = generateTectonic(level);

      expect(grid).toHaveLength(size);
      expect(solution).toHaveLength(size);
      expect(regions).toHaveLength(size);
      grid.forEach((row) => expect(row).toHaveLength(size));

      // Solution should be fully filled and valid
      expect(
        validateTectonic(
          solution.map((r) => [...r]),
          regions,
          size,
        ),
      ).toBe(true);

      // Grid should have empty cells and match solution where filled
      let emptyCells = 0;
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (grid[r][c] === 0) {
            emptyCells++;
          } else {
            expect(grid[r][c]).toBe(solution[r][c]);
          }
        }
      }
      expect(emptyCells).toBeGreaterThan(0);
    },
  );

  it('returns correct dimensions per level', () => {
    expect(generateTectonic('easy').size).toBe(4);
    expect(generateTectonic('medium').size).toBe(5);
    expect(generateTectonic('hard').size).toBe(6);
  });

  it('defaults to easy', () => {
    expect(generateTectonic().size).toBe(4);
  });

  it.each(['easy', 'medium', 'hard'])(
    'regions are valid for level=%s (50 puzzles)',
    (level) => {
      for (let i = 0; i < 50; i++) {
        const { solution, regions, size } = generateTectonic(level);

        const regionSizes = {};
        const regionCells = {};
        for (let r = 0; r < size; r++) {
          for (let c = 0; c < size; c++) {
            const id = regions[r][c];
            regionSizes[id] = (regionSizes[id] || 0) + 1;
            if (!regionCells[id]) regionCells[id] = [];
            regionCells[id].push([r, c]);
          }
        }

        for (const [id, count] of Object.entries(regionSizes)) {
          expect(count, `region ${id} has ${count} cells (too big)`).toBeLessThanOrEqual(5);
          expect(count, `region ${id} has ${count} cells (too small)`).toBeGreaterThanOrEqual(2);
        }

        // No duplicate values within a region
        for (const [id, cells] of Object.entries(regionCells)) {
          const vals = cells.map(([r, c]) => solution[r][c]);
          expect(new Set(vals).size, `region ${id} has duplicate values: [${vals}]`).toBe(vals.length);
        }

        // Values must be in range 1..regionSize
        for (const [id, cells] of Object.entries(regionCells)) {
          for (const [r, c] of cells) {
            expect(solution[r][c], `(${r},${c}) value ${solution[r][c]} out of range for region size ${cells.length}`)
              .toBeGreaterThanOrEqual(1);
            expect(solution[r][c]).toBeLessThanOrEqual(cells.length);
          }
        }

        // No adjacent cells (8-connected) with same value
        for (let r = 0; r < size; r++) {
          for (let c = 0; c < size; c++) {
            for (let dr = -1; dr <= 1; dr++) {
              for (let dc = -1; dc <= 1; dc++) {
                if (dr === 0 && dc === 0) continue;
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
                  expect(
                    solution[r][c] !== solution[nr][nc],
                    `adjacent (${r},${c}) and (${nr},${nc}) both have ${solution[r][c]}`
                  ).toBe(true);
                }
              }
            }
          }
        }

        // Regions must be contiguous (4-connected)
        for (const [id, cells] of Object.entries(regionCells)) {
          const visited = new Set();
          const queue = [cells[0]];
          visited.add(`${cells[0][0]},${cells[0][1]}`);
          while (queue.length > 0) {
            const [cr, cc] = queue.shift();
            for (const [dr, dc] of [[-1,0],[1,0],[0,-1],[0,1]]) {
              const nr = cr + dr, nc = cc + dc;
              const key = `${nr},${nc}`;
              if (nr >= 0 && nr < size && nc >= 0 && nc < size && !visited.has(key) && regions[nr][nc] == id) {
                visited.add(key);
                queue.push([nr, nc]);
              }
            }
          }
          expect(visited.size, `region ${id} is disconnected`).toBe(cells.length);
        }
      }
    },
    30000,
  );
});

describe('getRegionCells', () => {
  it('returns all cells for a given region', () => {
    const { regions, size } = generateTectonic('easy');
    // Region 0 should exist and have cells
    const cells = getRegionCells(regions, 0, size);
    expect(cells.length).toBeGreaterThan(0);
    cells.forEach(([r, c]) => {
      expect(regions[r][c]).toBe(0);
    });
  });
});

describe('getHint', () => {
  it('returns a hint for a grid with empty cells', () => {
    const { grid, solution } = generateTectonic('easy');
    const hint = getHint(grid, solution);
    expect(hint).not.toBeNull();
    expect(hint.value).toBe(solution[hint.row][hint.col]);
    expect(grid[hint.row][hint.col]).toBe(0);
  });

  it('returns null for a fully filled grid', () => {
    const { solution } = generateTectonic('easy');
    expect(getHint(solution, solution)).toBeNull();
  });
});
