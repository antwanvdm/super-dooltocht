import { Chess } from 'chess.js';
import { CHESS_PUZZLES } from './chessData';

/**
 * Pick a random chess puzzle for the given level.
 * @param {'easy'|'medium'|'hard'} level - Puzzle difficulty
 * @returns {{ fen: string, solution: string[], rating: number }}
 */
export function getRandomPuzzle(level = 'easy') {
  const puzzles = CHESS_PUZZLES[level] || CHESS_PUZZLES.easy;
  return puzzles[Math.floor(Math.random() * puzzles.length)];
}

/**
 * Create a chess game instance from a puzzle.
 * @param {{ fen: string, solution: string[] }} puzzle
 * @returns {Chess}
 */
export function createGame(puzzle) {
  return new Chess(puzzle.fen);
}

/**
 * Get all legal moves for a given square.
 * @param {Chess} game
 * @param {string} square - e.g. 'e4'
 * @returns {{ from: string, to: string }[]}
 */
export function getLegalMoves(game, square) {
  return game
    .moves({ square, verbose: true })
    .map((m) => ({ from: m.from, to: m.to }));
}

/**
 * Try to make a move. Returns true if the move was valid.
 * @param {Chess} game
 * @param {string} from
 * @param {string} to
 * @returns {boolean}
 */
export function makeMove(game, from, to) {
  try {
    game.move({ from, to });
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if the current position is checkmate.
 * @param {Chess} game
 * @returns {boolean}
 */
export function isCheckmate(game) {
  return game.isCheckmate();
}

/**
 * Get the board as an 8×8 array of { type, color } | null.
 * Row 0 = rank 8, row 7 = rank 1 (as displayed).
 * @param {Chess} game
 * @returns {(object|null)[][]}
 */
export function getBoard(game) {
  return game.board();
}

/**
 * Whose turn is it? 'w' or 'b'.
 * @param {Chess} game
 * @returns {'w'|'b'}
 */
export function getTurn(game) {
  return game.turn();
}

/**
 * Get a hint: returns the source square of the next solution move.
 * @param {{ solution: string[] }} puzzle
 * @param {number} moveIndex - How many player moves have been made (0-based)
 * @returns {string|null} square like 'e4', or null if no hint available
 */
export function getHint(puzzle, moveIndex) {
  // In the solution array, player moves are at even indices (0, 2, 4, ...)
  // and opponent responses are at odd indices (1, 3, ...)
  const solutionIndex = moveIndex * 2;
  const move = puzzle.solution[solutionIndex];
  if (!move) return null;
  return move.slice(0, 2); // source square
}

/**
 * Check if a player move matches the expected solution move.
 * @param {{ solution: string[] }} puzzle
 * @param {number} moveIndex - 0-based player move index
 * @param {string} from
 * @param {string} to
 * @returns {boolean}
 */
export function isCorrectMove(puzzle, moveIndex, from, to) {
  const solutionIndex = moveIndex * 2;
  const expected = puzzle.solution[solutionIndex];
  if (!expected) return false;
  return expected === from + to;
}

/**
 * Get the opponent's response move (auto-play).
 * @param {{ solution: string[] }} puzzle
 * @param {number} moveIndex - 0-based player move index (just completed)
 * @returns {{ from: string, to: string }|null}
 */
export function getOpponentResponse(puzzle, moveIndex) {
  const solutionIndex = moveIndex * 2 + 1;
  const move = puzzle.solution[solutionIndex];
  if (!move) return null;
  return { from: move.slice(0, 2), to: move.slice(2, 4) };
}

/**
 * How many moves the player needs to make for this puzzle.
 * @param {{ solution: string[] }} puzzle
 * @returns {number}
 */
export function getPlayerMoveCount(puzzle) {
  return Math.ceil(puzzle.solution.length / 2);
}
