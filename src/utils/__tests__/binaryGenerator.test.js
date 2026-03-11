import { describe, it, expect } from 'vitest';
import {
  generateBinary,
  validateBinary,
  getHint,
  getViolations,
} from '../binaryGenerator';

describe('generateBinary', () => {
  it.each(['easy', 'medium', 'hard'])(
    'generates a valid puzzle for level=%s',
    (level) => {
      const { grid, solution, size } = generateBinary(level);

      expect(grid).toHaveLength(size);
      expect(solution).toHaveLength(size);
      grid.forEach((row) => expect(row).toHaveLength(size));

      // Solution should be fully filled and valid
      expect(
        validateBinary(
          solution.map((r) => [...r]),
          size,
        ),
      ).toBe(true);

      // Grid should have empty cells (-1) and match solution where filled
      let emptyCells = 0;
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (grid[r][c] === -1) {
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
    expect(generateBinary('easy').size).toBe(6);
    expect(generateBinary('medium').size).toBe(8);
    expect(generateBinary('hard').size).toBe(10);
  });

  it('defaults to easy', () => {
    expect(generateBinary().size).toBe(6);
  });

  it('solution only contains 0s and 1s', () => {
    const { solution, size } = generateBinary('easy');
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        expect([0, 1]).toContain(solution[r][c]);
      }
    }
  });
});

describe('getViolations', () => {
  it('returns empty array for valid placement', () => {
    const { solution, size } = generateBinary('easy');
    // Solution is valid so no violations anywhere
    const violations = getViolations(solution, 0, 0, size);
    expect(violations).toEqual([]);
  });

  it('detects triple in a row', () => {
    const grid = [
      [0, 0, 0, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1],
    ];
    const violations = getViolations(grid, 0, 1, 6);
    expect(violations).toContain('row-triple');
  });
});

describe('getHint', () => {
  it('returns a hint for a grid with empty cells', () => {
    const { grid, solution } = generateBinary('easy');
    const hint = getHint(grid, solution);
    expect(hint).not.toBeNull();
    expect(hint.value).toBe(solution[hint.row][hint.col]);
    expect(grid[hint.row][hint.col]).toBe(-1);
  });

  it('returns null for a fully filled grid', () => {
    const { solution } = generateBinary('easy');
    expect(getHint(solution, solution)).toBeNull();
  });
});
