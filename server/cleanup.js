/**
 * Cleanup script — removes players that haven't been updated in the last 3 months.
 *
 * Usage:
 *   node --env-file=.env cleanup.js            (dry-run, shows what would be deleted)
 *   node --env-file=.env cleanup.js --confirm   (actually deletes the records)
 */

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ Missing MONGODB_URI in .env');
  process.exit(1);
}

const MONTHS = 3;
const dryRun = !process.argv.includes('--confirm');

await mongoose.connect(MONGODB_URI);

const playerSchema = new mongoose.Schema(
  {
    codeKey: { type: String, unique: true, index: true },
    codeSlugs: { type: [String], required: true },
    progress: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true },
);

const Player = mongoose.model('Player', playerSchema);

const cutoff = new Date();
cutoff.setMonth(cutoff.getMonth() - MONTHS);

console.log(
  `🔍 Looking for players not updated since ${cutoff.toISOString()} (${MONTHS} months ago)…\n`,
);

const stalePlayers = await Player.find({ updatedAt: { $lt: cutoff } })
  .select('codeKey updatedAt')
  .lean();

if (stalePlayers.length === 0) {
  console.log('✅ No stale players found. Nothing to clean up.');
} else {
  console.log(`Found ${stalePlayers.length} stale player(s):\n`);
  for (const p of stalePlayers) {
    console.log(
      `  • ${p.codeKey}  (last update: ${p.updatedAt.toISOString()})`,
    );
  }

  if (dryRun) {
    console.log('\n⚠️  Dry-run mode — no records were deleted.');
    console.log('   Run with --confirm to actually delete these players.');
  } else {
    const result = await Player.deleteMany({ updatedAt: { $lt: cutoff } });
    console.log(`\n🗑️  Deleted ${result.deletedCount} player(s).`);
  }
}

await mongoose.disconnect();
console.log('\nDone.');
