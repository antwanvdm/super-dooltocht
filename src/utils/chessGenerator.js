import { Chess } from 'chess.js';

/**
 * Pick a random chess puzzle from the provided pool.
 * @param {Array<{ fen: string, solution: string[], rating: number }>} puzzlePool
 * @returns {{ fen: string, solution: string[], rating: number }}
 */
export function getRandomPuzzle(puzzlePool) {
  return puzzlePool[Math.floor(Math.random() * puzzlePool.length)];
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
    .map((m) => ({ from: m.from, to: m.to, promotion: m.promotion }));
}

/**
 * Try to make a move. Returns true if the move was valid.
 * @param {Chess} game
 * @param {string} from
 * @param {string} to
 * @returns {boolean}
 */
export function makeMove(game, from, to, promotion) {
  try {
    game.move({ from, to, promotion });
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
  // Compare first 4 chars (from+to). Promotion char (5th) is handled separately.
  return expected.slice(0, 4) === from + to;
}

/**
 * Get the promotion piece for a solution move (e.g. 'q' for queen).
 * @param {{ solution: string[] }} puzzle
 * @param {number} moveIndex
 * @returns {string|undefined}
 */
export function getPromotion(puzzle, moveIndex) {
  const solutionIndex = moveIndex * 2;
  const move = puzzle.solution[solutionIndex];
  return move?.[4] || undefined;
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
  return {
    from: move.slice(0, 2),
    to: move.slice(2, 4),
    promotion: move[4] || undefined,
  };
}

/**
 * How many moves the player needs to make for this puzzle.
 * @param {{ solution: string[] }} puzzle
 * @returns {number}
 */
export function getPlayerMoveCount(puzzle) {
  return Math.ceil(puzzle.solution.length / 2);
}
