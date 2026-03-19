import { describe, it, expect } from 'vitest';
import {
  getRandomPuzzle,
  createGame,
  getLegalMoves,
  makeMove,
  isCheckmate,
  getBoard,
  getTurn,
  getHint,
  isCorrectMove,
  getOpponentResponse,
  getPlayerMoveCount,
  getPromotion,
} from '../chessGenerator';

// Sample puzzles for testing (from Lichess open database, CC0)
const EASY_PUZZLE = {
  fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4',
  solution: ['h5f7'],
  rating: 500,
  primaryTheme: 'mateIn1',
};

const MEDIUM_PUZZLE = {
  fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4',
  solution: ['h5f7'],
  rating: 900,
  primaryTheme: 'mateIn1',
};

const HARD_PUZZLE = {
  fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4',
  solution: ['h5f7'],
  rating: 1200,
  primaryTheme: 'mateIn1',
};

// Helper: fresh pool (getRandomPuzzle mutates the array via splice)
const easyPool = () => [{ ...EASY_PUZZLE }];
const mediumPool = () => [{ ...MEDIUM_PUZZLE }];
const hardPool = () => [{ ...HARD_PUZZLE }];

describe('chessGenerator', () => {
  describe('getRandomPuzzle', () => {
    it('returns a puzzle with fen and solution from a pool', () => {
      const puzzle = getRandomPuzzle(easyPool());
      expect(puzzle).toHaveProperty('fen');
      expect(puzzle).toHaveProperty('solution');
      expect(puzzle.solution.length).toBeGreaterThan(0);
    });

    it('returns undefined for empty pool', () => {
      const puzzle = getRandomPuzzle([]);
      expect(puzzle).toBeUndefined();
    });

    it('removes the chosen puzzle from the pool', () => {
      const pool = [
        { ...EASY_PUZZLE },
        { ...MEDIUM_PUZZLE },
        { ...HARD_PUZZLE },
      ];
      const puzzle = getRandomPuzzle(pool);
      expect(pool).toHaveLength(2);
      expect(pool).not.toContain(puzzle);
    });
  });

  describe('createGame', () => {
    it('creates a Chess instance from a puzzle FEN', () => {
      const puzzle = getRandomPuzzle(easyPool());
      const game = createGame(puzzle);
      expect(getBoard(game)).toHaveLength(8);
      expect(getBoard(game)[0]).toHaveLength(8);
    });
  });

  describe('getLegalMoves', () => {
    it('returns legal moves for a piece', () => {
      const puzzle = getRandomPuzzle(easyPool());
      const game = createGame(puzzle);
      const from = puzzle.solution[0].slice(0, 2);
      const moves = getLegalMoves(game, from);
      expect(moves.length).toBeGreaterThan(0);
      expect(moves[0]).toHaveProperty('from');
      expect(moves[0]).toHaveProperty('to');
    });

    it('returns empty array for empty square', () => {
      const puzzle = getRandomPuzzle(easyPool());
      const game = createGame(puzzle);
      // Find an empty square
      const board = getBoard(game);
      let emptySquare = null;
      const files = 'abcdefgh';
      for (let r = 0; r < 8 && !emptySquare; r++) {
        for (let c = 0; c < 8; c++) {
          if (!board[r][c]) {
            emptySquare = files[c] + (8 - r);
            break;
          }
        }
      }
      if (emptySquare) {
        expect(getLegalMoves(game, emptySquare)).toEqual([]);
      }
    });
  });

  describe('getTurn', () => {
    it('returns w or b', () => {
      const game = createGame(getRandomPuzzle(easyPool()));
      expect(['w', 'b']).toContain(getTurn(game));
    });
  });

  describe('makeMove + isCheckmate', () => {
    it('easy puzzles reach checkmate in 1 move', () => {
      const puzzle = getRandomPuzzle(easyPool());
      const game = createGame(puzzle);
      const move = puzzle.solution[0];
      expect(makeMove(game, move.slice(0, 2), move.slice(2, 4))).toBe(true);
      expect(isCheckmate(game)).toBe(true);
    });

    it('returns false for an invalid move', () => {
      const game = createGame(getRandomPuzzle(easyPool()));
      expect(makeMove(game, 'a1', 'h8')).toBe(false);
    });
  });

  describe('isCorrectMove', () => {
    it('returns true for the correct solution move', () => {
      const puzzle = getRandomPuzzle(easyPool());
      const move = puzzle.solution[0];
      expect(isCorrectMove(puzzle, 0, move.slice(0, 2), move.slice(2, 4))).toBe(
        true,
      );
    });

    it('returns true for promotion moves (compares first 4 chars)', () => {
      const puzzle = { solution: ['e7e8q'] };
      expect(isCorrectMove(puzzle, 0, 'e7', 'e8')).toBe(true);
    });

    it('returns false for an incorrect move', () => {
      const puzzle = getRandomPuzzle(easyPool());
      expect(isCorrectMove(puzzle, 0, 'a1', 'a2')).toBe(false);
    });
  });

  describe('getPromotion', () => {
    it('returns promotion piece for a promotion move', () => {
      const puzzle = { solution: ['e7e8q'] };
      expect(getPromotion(puzzle, 0)).toBe('q');
    });

    it('returns undefined for a regular move', () => {
      const puzzle = { solution: ['e2e4'] };
      expect(getPromotion(puzzle, 0)).toBeUndefined();
    });
  });

  describe('getHint', () => {
    it('returns the source square of the next player move', () => {
      const puzzle = getRandomPuzzle(easyPool());
      const hint = getHint(puzzle, 0);
      expect(hint).toBe(puzzle.solution[0].slice(0, 2));
    });

    it('returns null for out-of-range moveIndex', () => {
      const puzzle = getRandomPuzzle(easyPool());
      expect(getHint(puzzle, 99)).toBeNull();
    });
  });

  describe('getOpponentResponse', () => {
    it('returns null when no opponent response exists (1-move puzzle)', () => {
      const puzzle = getRandomPuzzle(easyPool());
      expect(getOpponentResponse(puzzle, 0)).toBeNull();
    });
  });

  describe('getPlayerMoveCount', () => {
    it('returns 1 for a 1-move puzzle', () => {
      const puzzle = getRandomPuzzle(easyPool());
      expect(getPlayerMoveCount(puzzle)).toBe(1);
    });
  });
});
