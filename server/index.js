import express from 'express';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import ChessPuzzle from './models/ChessPuzzle.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// Serve audio files with aggressive caching (files rarely change)
app.use(
  '/sounds',
  express.static(join(__dirname, 'public/sounds'), {
    maxAge: '30d',
    immutable: true,
  }),
);

app.use(express.json({ limit: '1mb' }));

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Missing MONGODB_URI in .env');
  process.exit(1);
}

await mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 3000,
  connectTimeoutMS: 3000,
  socketTimeoutMS: 3000,
});

const playerSchema = new mongoose.Schema(
  {
    codeKey: { type: String, unique: true, index: true },
    codeSlugs: { type: [String], required: true },
    progress: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Player = mongoose.model('Player', playerSchema);

const CATEGORY_1 = [
  { emoji: '🐶', slug: 'dog' },
  { emoji: '🐱', slug: 'cat' },
  { emoji: '🦁', slug: 'lion' },
  { emoji: '🐯', slug: 'tiger' },
  { emoji: '🐸', slug: 'frog' },
  { emoji: '🐵', slug: 'monkey' },
  { emoji: '🐰', slug: 'rabbit' },
  { emoji: '🐻', slug: 'bear' },
  { emoji: '🦊', slug: 'fox' },
  { emoji: '🐼', slug: 'panda' },
];

const CATEGORY_2 = [
  { emoji: '❤️', slug: 'heart_red' },
  { emoji: '🧡', slug: 'heart_orange' },
  { emoji: '💛', slug: 'heart_yellow' },
  { emoji: '💚', slug: 'heart_green' },
  { emoji: '💙', slug: 'heart_blue' },
  { emoji: '💜', slug: 'heart_purple' },
  { emoji: '🖤', slug: 'heart_black' },
  { emoji: '🤍', slug: 'heart_white' },
  { emoji: '🤎', slug: 'heart_brown' },
  { emoji: '💗', slug: 'heart_pink' },
];

const CATEGORY_3 = [
  { emoji: '⭐', slug: 'star' },
  { emoji: '🌙', slug: 'moon' },
  { emoji: '⚡', slug: 'lightning' },
  { emoji: '🔔', slug: 'bell' },
  { emoji: '🎵', slug: 'music' },
  { emoji: '☀️', slug: 'sun' },
  { emoji: '🌈', slug: 'rainbow' },
  { emoji: '🍀', slug: 'clover' },
  { emoji: '🎈', slug: 'balloon' },
  { emoji: '🔥', slug: 'fire' },
];

const CATEGORY_4 = [
  { emoji: '0️⃣', slug: 'zero' },
  { emoji: '1️⃣', slug: 'one' },
  { emoji: '2️⃣', slug: 'two' },
  { emoji: '3️⃣', slug: 'three' },
  { emoji: '4️⃣', slug: 'four' },
  { emoji: '5️⃣', slug: 'five' },
  { emoji: '6️⃣', slug: 'six' },
  { emoji: '7️⃣', slug: 'seven' },
  { emoji: '8️⃣', slug: 'eight' },
  { emoji: '9️⃣', slug: 'nine' },
];

const EMOJI_CATEGORIES = [CATEGORY_1, CATEGORY_2, CATEGORY_3, CATEGORY_4];

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const buildCode = () => {
  const a = randomFrom(CATEGORY_1);
  const b = randomFrom(CATEGORY_2);
  const c = randomFrom(CATEGORY_3);
  const d = randomFrom(CATEGORY_4);
  return {
    codeSlugs: [a.slug, b.slug, c.slug, d.slug],
    codeEmojis: [a.emoji, b.emoji, c.emoji, d.emoji],
    codeKey: `${a.slug}-${b.slug}-${c.slug}-${d.slug}`,
  };
};

// Endpoint om emoji categorieën op te halen
app.get('/api/emoji-categories', (_req, res) => {
  res.json({
    categories: EMOJI_CATEGORIES,
    labels: [
      'Kies een dier:',
      'Kies een hart:',
      'Kies een symbool:',
      'Kies een nummer:',
    ],
  });
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/players', async (_req, res) => {
  try {
    let attempt = 0;
    let code;

    while (attempt < 25) {
      code = buildCode();
      const exists = await Player.exists({ codeKey: code.codeKey });
      if (!exists) break;
      attempt += 1;
    }

    if (!code || attempt >= 25) {
      return res.status(409).json({ error: 'Could not generate unique code' });
    }

    const player = await Player.create({
      codeKey: code.codeKey,
      codeSlugs: code.codeSlugs,
      progress: {},
    });

    return res.status(201).json({
      code: code.codeSlugs,
      emojis: code.codeEmojis,
      playerId: player._id,
    });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({ error: 'Code already exists' });
    }
    return res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/players/validate', async (req, res) => {
  const { code } = req.body || {};
  const codeSlugs = Array.isArray(code) ? code : null;

  if (!codeSlugs || codeSlugs.length !== 4) {
    return res.status(400).json({ error: 'Invalid code' });
  }

  try {
    const codeKey = codeSlugs.join('-');
    const player = await Player.findOne({ codeKey }).lean();

    if (!player) {
      return res.status(404).json({ error: 'Code not found' });
    }

    return res.json({
      code: player.codeSlugs,
      progress: player.progress || {},
      createdAt: player.createdAt,
      updatedAt: player.updatedAt,
    });
  } catch (error) {
    console.error('Validate error:', error.message);
    return res.status(503).json({ error: 'Service unavailable' });
  }
});

app.post('/api/players/:codeKey/progress', async (req, res) => {
  const { codeKey } = req.params;
  const { progress } = req.body || {};

  if (!codeKey || codeKey === 'undefined') {
    return res.status(400).json({ error: 'Missing code' });
  }

  if (
    progress === undefined ||
    progress === null ||
    typeof progress !== 'object'
  ) {
    return res.status(400).json({ error: 'Invalid progress object' });
  }

  try {
    const player = await Player.findOneAndUpdate(
      { codeKey },
      { $set: { progress } },
      { new: true },
    ).lean();

    if (!player) {
      return res.status(404).json({ error: 'Code not found' });
    }

    return res.json({ ok: true, updatedAt: player.updatedAt });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update progress' });
  }
});

// ── Chess puzzles ──────────────────────────────────────────────

app.get('/api/chess-puzzles', async (req, res) => {
  try {
    const themes = req.query.themes; // comma-separated list
    const minRating = Math.max(parseInt(req.query.minRating, 10) || 0, 0);
    const maxRating = Math.min(parseInt(req.query.maxRating, 10) || 1400, 1800);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 5, 1), 50);

    const rnd = Math.random();
    const projection = {
      _id: 0,
      lichessId: 1,
      fen: 1,
      moves: 1,
      rating: 1,
      primaryTheme: 1,
      themes: 1,
      moveCount: 1,
    };

    const themeList = themes
      ? themes
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    // When multiple themes are selected, fetch per theme to ensure even distribution
    if (themeList.length > 1) {
      const perTheme = Math.max(Math.ceil(limit / themeList.length), 1);
      const fetches = themeList.map(async (theme) => {
        const filter = {
          rating: { $gte: minRating, $lte: maxRating },
          primaryTheme: theme,
          random: { $gte: rnd },
        };
        let results = await ChessPuzzle.find(filter)
          .select(projection)
          .sort({ random: 1 })
          .limit(perTheme)
          .lean();
        if (results.length < perTheme) {
          filter.random = { $lt: rnd };
          const extra = await ChessPuzzle.find(filter)
            .select(projection)
            .sort({ random: 1 })
            .limit(perTheme - results.length)
            .lean();
          results = results.concat(extra);
        }
        return results;
      });
      const groups = await Promise.all(fetches);
      // Interleave results so themes are mixed, then trim to limit
      const puzzles = [];
      const maxLen = Math.max(...groups.map((g) => g.length));
      for (let i = 0; i < maxLen && puzzles.length < limit; i++) {
        for (const group of groups) {
          if (i < group.length && puzzles.length < limit)
            puzzles.push(group[i]);
        }
      }
      return res.json(puzzles);
    }

    // Single theme or no theme filter — original logic
    const filter = {
      rating: { $gte: minRating, $lte: maxRating },
      random: { $gte: rnd },
    };
    if (themeList.length === 1) filter.primaryTheme = themeList[0];

    let puzzles = await ChessPuzzle.find(filter)
      .select(projection)
      .sort({ random: 1 })
      .limit(limit)
      .lean();

    // Wrap around if not enough results (random was near 1.0)
    if (puzzles.length < limit) {
      filter.random = { $lt: rnd };
      const extra = await ChessPuzzle.find(filter)
        .select(projection)
        .sort({ random: 1 })
        .limit(limit - puzzles.length)
        .lean();
      puzzles = puzzles.concat(extra);
    }

    return res.json(puzzles);
  } catch (error) {
    return res.status(500).json({ error: `Failed to fetch puzzles: ${error}` });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
