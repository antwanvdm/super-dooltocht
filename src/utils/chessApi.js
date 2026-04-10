const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
import { Chess } from 'chess.js';

const CHESS_LEVEL_RATING = {
  easy: { minRating: 1, maxRating: 800 },
  medium: { minRating: 801, maxRating: 1100 },
  hard: { minRating: 1101, maxRating: 1400 },
  wizard: { minRating: 1401, maxRating: 1800 },
};

/**
 * Fetch chess puzzles from the server API.
 * @param {{ chessLevel: string, chessThemes: string[] }} options
 * @param {number} [limit=10]
 * @returns {Promise<Array<{ fen: string, moves: string[], rating: number, primaryTheme: string }>>}
 */
export async function fetchChessPuzzles(
  { chessLevel = 'easy', chessThemes = [] } = {},
  limit = 10,
) {
  const { minRating, maxRating } =
    CHESS_LEVEL_RATING[chessLevel] || CHESS_LEVEL_RATING.easy;

  const params = new URLSearchParams({
    minRating: String(minRating),
    maxRating: String(maxRating),
    limit: String(limit),
  });
  // Send all enabled themes so the API returns a mix
  if (chessThemes.length > 0) params.set('themes', chessThemes.join(','));

  let response;
  for (let attempt = 0; attempt < 3; attempt++) {
    response = await fetch(`${API_URL}/api/chess-puzzles?${params}`);
    if (response.ok || response.status < 500) break;
    // Server error — wait before retrying
    if (attempt < 2)
      await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
  }
  if (!response.ok) throw new Error(`Chess API error: ${response.status}`);

  const puzzles = await response.json();

  // Transform to match existing puzzle format: { fen, solution, rating, primaryTheme }
  // The API moves array starts with the opponent's setup move — apply it to get
  // the starting position the player sees, then use the remaining moves as solution.
  return puzzles.map((p) => {
    const setupMove = p.moves[0];
    const game = new Chess(p.fen);
    game.move({
      from: setupMove.slice(0, 2),
      to: setupMove.slice(2, 4),
      promotion: setupMove[4] || undefined,
    });
    return {
      fen: game.fen(),
      solution: p.moves.slice(1),
      rating: p.rating,
      primaryTheme: p.primaryTheme,
    };
  });
}
