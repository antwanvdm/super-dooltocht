import { describe, it, expect } from 'vitest';
import {
  generateTectonic,
  validateTectonic,
  getHint,
  getRegionCells,
} from '../tectonicGenerator';

describe('generateTectonic', () => {
  it.each(['easy', 'medium'])(
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
  });

  it('defaults to easy', () => {
    expect(generateTectonic().size).toBe(4);
  });
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
