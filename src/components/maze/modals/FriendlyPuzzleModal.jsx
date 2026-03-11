import { useState, lazy, Suspense } from 'react';
import { lazyRetry } from '../../../utils/lazyRetry';

const PUZZLE_COMPONENTS = {
  sudoku: lazy(() => lazyRetry(() => import('../../minigames/SudokuGame'))),
  tectonic: lazy(() => lazyRetry(() => import('../../minigames/TectonicGame'))),
};

const PUZZLE_NAMES = {
  sudoku: 'Sudoku',
  tectonic: 'Tectonic',
};

const PUZZLE_TYPES = ['sudoku', 'tectonic'];

const COMPLIMENTS = [
  'Wauw, je bent een echte puzzelkampioen!',
  'Geweldig opgelost, nu kunnen we door!',
  'Knap gedaan, slimmerik!',
  'Hoera, ik ben vrij! Dankjewel!',
];

function FriendlyPuzzleModal({ activeFriendly, theme, modalInteractionReady, onComplete, onClose }) {
  const [puzzleType] = useState(() => {
    const chosen = PUZZLE_TYPES[Math.floor(Math.random() * PUZZLE_TYPES.length)];
    return chosen;
  });
  const [phase, setPhase] = useState('puzzle'); // 'puzzle' | 'complete'
  const [compliment] = useState(() => COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)]);

  const PuzzleComponent = PUZZLE_COMPONENTS[puzzleType];

  // Always use easy level for friend puzzles
  const puzzleSettings = { puzzleLevel: 'easy' };

  const handleSuccess = () => {
    setTimeout(() => setPhase('complete'), 600);
  };

  if (phase === 'complete') {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-2 sm:p-4">
        <div className="rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden">
          <div className={`${theme.colors.primary} px-6 sm:px-8 py-8 sm:py-10 text-center`}>
            <span className="text-6xl sm:text-8xl block mb-4">{activeFriendly.emoji}</span>
            <p className="text-white text-lg sm:text-xl font-bold mb-2">{compliment}</p>
            <button
              onClick={onComplete}
              className="mt-4 px-6 sm:px-8 py-3 bg-white text-gray-800 font-bold rounded-xl shadow-lg hover:scale-105 transition-all text-base sm:text-lg"
            >
              Neem mee! 🤝
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="relative rounded-3xl shadow-2xl max-w-full sm:max-w-3xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        {!modalInteractionReady && <div className="absolute inset-0 z-10 rounded-3xl" />}
        {/* Header */}
        <div className={`${theme.colors.primary} px-4 sm:px-8 py-3 sm:py-5 flex-shrink-0`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="text-3xl sm:text-5xl">{activeFriendly.emoji}</span>
              <div>
                <h2 className="text-lg sm:text-2xl font-bold text-white drop-shadow">
                  {PUZZLE_NAMES[puzzleType] || 'Puzzel'}
                </h2>
                <p className="text-white/80 font-medium text-xs sm:text-base">Los de puzzel op om mij te bevrijden!</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-2xl sm:text-3xl text-white/80 hover:text-white hover:scale-110 transition-all flex-shrink-0"
              aria-label="Sluiten"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Puzzle content */}
        <div className="overflow-y-auto flex-1 bg-white p-4 sm:p-8">
          <Suspense fallback={
            <div className="flex items-center justify-center p-12">
              <span className="text-4xl animate-spin">🧠</span>
            </div>
          }>
            <PuzzleComponent
              mathSettings={puzzleSettings}
              onSuccess={handleSuccess}
              onFailure={() => {}}
              theme={theme}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default FriendlyPuzzleModal;
