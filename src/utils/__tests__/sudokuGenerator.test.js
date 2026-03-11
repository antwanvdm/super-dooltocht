import { describe, it, expect } from 'vitest';
import { generateSudoku, validateSudoku, getHint } from '../sudokuGenerator';

describe('generateSudoku', () => {
  it.each(['easy', 'medium', 'hard'])(
    'generates a valid puzzle for level=%s',
    (level) => {
      const { grid, solution, size, blockRows, blockCols } =
        generateSudoku(level);

      expect(grid).toHaveLength(size);
      expect(solution).toHaveLength(size);
      grid.forEach((row) => expect(row).toHaveLength(size));
      solution.forEach((row) => expect(row).toHaveLength(size));

      // Solution should be fully filled and valid
      expect(
        validateSudoku(
          solution.map((r) => [...r]),
          size,
          blockRows,
          blockCols,
        ),
      ).toBe(true);

      // Grid should have some empty cells (0) and match solution where filled
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
    expect(generateSudoku('easy').size).toBe(4);
    expect(generateSudoku('medium').size).toBe(6);
    expect(generateSudoku('hard').size).toBe(9);
  });

  it('defaults to easy', () => {
    expect(generateSudoku().size).toBe(4);
  });
});

describe('getHint', () => {
  it('returns a hint for a grid with empty cells', () => {
    const { grid, solution } = generateSudoku('easy');
    const hint = getHint(grid, solution);
    expect(hint).not.toBeNull();
    expect(hint.value).toBe(solution[hint.row][hint.col]);
    expect(grid[hint.row][hint.col]).toBe(0);
  });

  it('returns null for a fully filled grid', () => {
    const { solution } = generateSudoku('easy');
    expect(getHint(solution, solution)).toBeNull();
  });
});
