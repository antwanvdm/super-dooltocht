/**
 * Import chess puzzles from the Lichess open puzzle database CSV into MongoDB.
 * Filters for child-friendly themes and appropriate rating ranges.
 *
 * CSV source: https://database.lichess.org/#puzzles (CC0 license)
 * Expected CSV columns (no header row):
 *   PuzzleId, FEN, Moves, Rating, RatingDeviation, Popularity, NbPlays, Themes, GameUrl, OpeningTags
 *
 * Usage:
 *   node --env-file=.env scripts/importChessPuzzles.js <path-to-csv>
 *   node --env-file=.env scripts/importChessPuzzles.js ../../lichess_db_puzzle.csv
 */

import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { resolve } from 'path';
import mongoose from 'mongoose';
import ChessPuzzle from '../models/ChessPuzzle.js';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const MAX_RATING = 1800;

/** Themes suitable for 6-10 year olds, mapped to a readable label */
const ALLOWED_THEMES = new Set([
  // Mat-patronen
  'mateIn1',
  'mateIn2',
  'mateIn3',
  'mateIn4',
  'backRankMate',
  'smotheredMate',
  // Tactiek
  'fork',
  'pin',
  'hangingPiece',
  'skewer',
  'discoveredAttack',
  'doubleCheck',
  'sacrifice',
  'trappedPiece',
  // Pion-specials
  'promotion',
  'enPassant',
  // Eenvoudige labels
  'oneMove',
  'short',
  'castling',
]);

/** Primary theme to assign — first matching theme in priority order */
const THEME_PRIORITY = [
  'mateIn1',
  'mateIn2',
  'mateIn3',
  'mateIn4',
  'fork',
  'pin',
  'hangingPiece',
  'skewer',
  'discoveredAttack',
  'doubleCheck',
  'sacrifice',
  'trappedPiece',
  'backRankMate',
  'smotheredMate',
  'promotion',
  'enPassant',
  'castling',
  'oneMove',
  'short',
];

// ---------------------------------------------------------------------------
// MongoDB
// ---------------------------------------------------------------------------

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ Missing MONGODB_URI in .env');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// CSV parsing
// ---------------------------------------------------------------------------

const csvPath = process.argv[2];
if (!csvPath) {
  console.error(
    'Usage: node --env-file=.env scripts/importChessPuzzles.js <path-to-csv>',
  );
  process.exit(1);
}

function parseLine(line) {
  const cols = line.split(',');
  if (cols.length < 8) return null;

  const puzzleId = cols[0];
  const fen = cols[1];
  const moves = cols[2].split(' ');
  const rating = parseInt(cols[3], 10);
  const popularity = parseInt(cols[5], 10);
  const themes = cols[7].split(' ').filter(Boolean);

  if (isNaN(rating) || rating > MAX_RATING) return null;

  // Must have at least one allowed theme
  const matchedThemes = themes.filter((t) => ALLOWED_THEMES.has(t));
  if (matchedThemes.length === 0) return null;

  // Determine primary theme (first match in priority order)
  let primaryTheme = matchedThemes[0];
  for (const t of THEME_PRIORITY) {
    if (matchedThemes.includes(t)) {
      primaryTheme = t;
      break;
    }
  }

  // Player moves only (odd indices: 1st, 3rd, 5th… — the moves array
  // starts with the opponent's last move, so player moves are at index 1, 3, 5…)
  const playerMoveCount = Math.ceil((moves.length - 1) / 2);

  return {
    lichessId: puzzleId,
    fen,
    moves,
    rating,
    popularity,
    themes: matchedThemes,
    primaryTheme,
    moveCount: playerMoveCount,
    random: Math.random(),
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

await mongoose.connect(MONGODB_URI);

console.log(`📂 Reading ${resolve(csvPath)}`);
console.log(
  `🔍 Filter: rating ≤ ${MAX_RATING}, themes: ${[...ALLOWED_THEMES].join(', ')}\n`,
);

const rl = createInterface({
  input: createReadStream(resolve(csvPath), 'utf-8'),
  crlfDelay: Infinity,
});

let lineCount = 0;
let matchCount = 0;
let batch = [];
const BATCH_SIZE = 1000;
const themeCounts = {};

for await (const line of rl) {
  lineCount++;

  // Skip header if present
  if (lineCount === 1 && line.startsWith('PuzzleId')) continue;

  const puzzle = parseLine(line);
  if (!puzzle) continue;

  matchCount++;
  themeCounts[puzzle.primaryTheme] =
    (themeCounts[puzzle.primaryTheme] || 0) + 1;

  batch.push(puzzle);

  if (batch.length >= BATCH_SIZE) {
    await ChessPuzzle.bulkWrite(
      batch.map((p) => ({
        updateOne: {
          filter: { lichessId: p.lichessId },
          update: { $set: p },
          upsert: true,
        },
      })),
    );
    process.stdout.write(
      `\r  Processed ${lineCount.toLocaleString()} lines, imported ${matchCount.toLocaleString()} puzzles…`,
    );
    batch = [];
  }
}

// Flush remaining
if (batch.length > 0) {
  await ChessPuzzle.bulkWrite(
    batch.map((p) => ({
      updateOne: {
        filter: { lichessId: p.lichessId },
        update: { $set: p },
        upsert: true,
      },
    })),
  );
}

console.log(
  `\r  Processed ${lineCount.toLocaleString()} lines, imported ${matchCount.toLocaleString()} puzzles.`,
);

console.log('\n📊 Puzzles per primary theme:');
const sorted = Object.entries(themeCounts).sort((a, b) => b[1] - a[1]);
for (const [theme, count] of sorted) {
  console.log(`  ${theme.padEnd(20)} ${count.toLocaleString()}`);
}

await mongoose.disconnect();
console.log('\n✅ Done!');
