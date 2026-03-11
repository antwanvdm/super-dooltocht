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
} from '../chessGenerator';

describe('chessGenerator', () => {
  describe('getRandomPuzzle', () => {
    it('returns a puzzle with fen and solution for each level', () => {
      for (const level of ['easy', 'medium', 'hard']) {
        const puzzle = getRandomPuzzle(level);
        expect(puzzle).toHaveProperty('fen');
        expect(puzzle).toHaveProperty('solution');
        expect(puzzle.solution.length).toBeGreaterThan(0);
      }
    });

    it('defaults to easy when given unknown level', () => {
      const puzzle = getRandomPuzzle('unknown');
      expect(puzzle).toHaveProperty('fen');
    });
  });

  describe('createGame', () => {
    it('creates a Chess instance from a puzzle FEN', () => {
      const puzzle = getRandomPuzzle('easy');
      const game = createGame(puzzle);
      expect(getBoard(game)).toHaveLength(8);
      expect(getBoard(game)[0]).toHaveLength(8);
    });
  });

  describe('getLegalMoves', () => {
    it('returns legal moves for a piece', () => {
      const puzzle = getRandomPuzzle('easy');
      const game = createGame(puzzle);
      const from = puzzle.solution[0].slice(0, 2);
      const moves = getLegalMoves(game, from);
      expect(moves.length).toBeGreaterThan(0);
      expect(moves[0]).toHaveProperty('from');
      expect(moves[0]).toHaveProperty('to');
    });

    it('returns empty array for empty square', () => {
      const puzzle = getRandomPuzzle('easy');
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
      const game = createGame(getRandomPuzzle('easy'));
      expect(['w', 'b']).toContain(getTurn(game));
    });
  });

  describe('makeMove + isCheckmate', () => {
    it('easy puzzles reach checkmate in 1 move', () => {
      const puzzle = getRandomPuzzle('easy');
      const game = createGame(puzzle);
      const move = puzzle.solution[0];
      expect(makeMove(game, move.slice(0, 2), move.slice(2, 4))).toBe(true);
      expect(isCheckmate(game)).toBe(true);
    });

    it('medium puzzles reach checkmate after full solution', () => {
      const puzzle = getRandomPuzzle('medium');
      const game = createGame(puzzle);
      for (const move of puzzle.solution) {
        expect(makeMove(game, move.slice(0, 2), move.slice(2, 4))).toBe(true);
      }
      expect(isCheckmate(game)).toBe(true);
    });

    it('hard puzzles reach checkmate after full solution', () => {
      const puzzle = getRandomPuzzle('hard');
      const game = createGame(puzzle);
      for (const move of puzzle.solution) {
        expect(makeMove(game, move.slice(0, 2), move.slice(2, 4))).toBe(true);
      }
      expect(isCheckmate(game)).toBe(true);
    });

    it('returns false for an invalid move', () => {
      const game = createGame(getRandomPuzzle('easy'));
      expect(makeMove(game, 'a1', 'h8')).toBe(false);
    });
  });

  describe('isCorrectMove', () => {
    it('returns true for the correct solution move', () => {
      const puzzle = getRandomPuzzle('easy');
      const move = puzzle.solution[0];
      expect(isCorrectMove(puzzle, 0, move.slice(0, 2), move.slice(2, 4))).toBe(
        true,
      );
    });

    it('returns false for an incorrect move', () => {
      const puzzle = getRandomPuzzle('easy');
      expect(isCorrectMove(puzzle, 0, 'a1', 'a2')).toBe(false);
    });
  });

  describe('getHint', () => {
    it('returns the source square of the next player move', () => {
      const puzzle = getRandomPuzzle('easy');
      const hint = getHint(puzzle, 0);
      expect(hint).toBe(puzzle.solution[0].slice(0, 2));
    });

    it('returns null for out-of-range moveIndex', () => {
      const puzzle = getRandomPuzzle('easy');
      expect(getHint(puzzle, 99)).toBeNull();
    });
  });

  describe('getOpponentResponse', () => {
    it('returns the opponent move for medium/hard puzzles', () => {
      const puzzle = getRandomPuzzle('medium');
      const response = getOpponentResponse(puzzle, 0);
      expect(response).not.toBeNull();
      expect(response.from).toBe(puzzle.solution[1].slice(0, 2));
      expect(response.to).toBe(puzzle.solution[1].slice(2, 4));
    });

    it('returns null when no opponent response exists', () => {
      const puzzle = getRandomPuzzle('easy');
      expect(getOpponentResponse(puzzle, 0)).toBeNull();
    });
  });

  describe('getPlayerMoveCount', () => {
    it('returns 1 for easy puzzles', () => {
      const puzzle = getRandomPuzzle('easy');
      expect(getPlayerMoveCount(puzzle)).toBe(1);
    });

    it('returns 2 for medium puzzles', () => {
      const puzzle = getRandomPuzzle('medium');
      expect(getPlayerMoveCount(puzzle)).toBe(2);
    });

    it('returns 3 for hard puzzles', () => {
      const puzzle = getRandomPuzzle('hard');
      expect(getPlayerMoveCount(puzzle)).toBe(3);
    });
  });
});
