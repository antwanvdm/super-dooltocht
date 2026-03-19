import mongoose from 'mongoose';

const puzzleSchema = new mongoose.Schema(
  {
    lichessId: { type: String, unique: true, index: true },
    fen: { type: String, required: true },
    moves: { type: [String], required: true },
    rating: { type: Number, required: true, index: true },
    popularity: { type: Number },
    themes: { type: [String], index: true },
    primaryTheme: { type: String, index: true },
    moveCount: { type: Number, index: true },
    random: { type: Number, index: true },
  },
  { collection: 'chess_puzzles' },
);

puzzleSchema.index({ primaryTheme: 1, rating: 1, random: 1 });
puzzleSchema.index({ rating: 1, random: 1 });

export default mongoose.model('ChessPuzzle', puzzleSchema);
