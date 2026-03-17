import { useState, lazy, Suspense } from 'react';
import { pickRandomGameType, GAME_NAMES } from '../../../utils/gameSelection';
import { lazyRetry } from '../../../utils/lazyRetry';
import Confetti from '../../Confetti';

// Re-use the same GAME_COMPONENTS registry from ChallengeModal
const GAME_COMPONENTS = {
  'multiple-choice': lazy(() => lazyRetry(() => import('../../minigames/MultipleChoice'))),
  'memory': lazy(() => lazyRetry(() => import('../../minigames/MemoryGame'))),
  'puzzle': lazy(() => lazyRetry(() => import('../../minigames/MathPuzzle'))),
  'darts': lazy(() => lazyRetry(() => import('../../minigames/DartsGame'))),
  'placeValue': lazy(() => lazyRetry(() => import('../../minigames/PlaceValueGame'))),
  'lovingHearts': lazy(() => lazyRetry(() => import('../../minigames/LovingHeartsGame'))),
  'makeAmount': lazy(() => lazyRetry(() => import('../../minigames/MakeAmountGame'))),
  'countMoney': lazy(() => lazyRetry(() => import('../../minigames/CountMoneyGame'))),
  'smartPay': lazy(() => lazyRetry(() => import('../../minigames/SmartPayGame'))),
  'change': lazy(() => lazyRetry(() => import('../../minigames/ChangeGame'))),
  'clockMultipleChoice': lazy(() => lazyRetry(() => import('../../minigames/ClockMultipleChoice'))),
  'clockMemory': lazy(() => lazyRetry(() => import('../../minigames/ClockMemory'))),
  'clockInput': lazy(() => lazyRetry(() => import('../../minigames/ClockInput'))),
  'clockMatchAnalog': lazy(() => lazyRetry(() => import('../../minigames/ClockMatchAnalog'))),
  'clock24h': lazy(() => lazyRetry(() => import('../../minigames/Clock24hGame'))),
  'clockWords': lazy(() => lazyRetry(() => import('../../minigames/ClockWordsGame'))),
  'spellingCategoryMatch': lazy(() => lazyRetry(() => import('../../minigames/SpellingCategoryMatch'))),
  'spellingConnect': lazy(() => lazyRetry(() => import('../../minigames/SpellingConnect'))),
  'spellingTypeWord': lazy(() => lazyRetry(() => import('../../minigames/SpellingTypeWord'))),
  'spellingTransform': lazy(() => lazyRetry(() => import('../../minigames/SpellingTransform'))),
  'vocabularyMatch': lazy(() => lazyRetry(() => import('../../minigames/VocabularyMatch'))),
  'vocabularyMemory': lazy(() => lazyRetry(() => import('../../minigames/VocabularyMemory'))),
  'vocabularyFillIn': lazy(() => lazyRetry(() => import('../../minigames/VocabularyFillIn'))),
  'readingComprehension': lazy(() => lazyRetry(() => import('../../minigames/ReadingComprehension'))),
  'readingTrueFalse': lazy(() => lazyRetry(() => import('../../minigames/ReadingTrueFalse'))),
  'englishMultipleChoice': lazy(() => lazyRetry(() => import('../../minigames/EnglishMultipleChoice'))),
  'englishMemory': lazy(() => lazyRetry(() => import('../../minigames/EnglishMemory'))),
  'englishTypeWord': lazy(() => lazyRetry(() => import('../../minigames/EnglishTypeWord'))),
  'englishFillIn': lazy(() => lazyRetry(() => import('../../minigames/EnglishFillIn'))),
  'englishConnect': lazy(() => lazyRetry(() => import('../../minigames/EnglishConnect'))),
  'kalenderQuiz': lazy(() => lazyRetry(() => import('../../minigames/KalenderQuiz'))),
  'volgordeSorteer': lazy(() => lazyRetry(() => import('../../minigames/VolgordeSorteer'))),
  'seizoenenMatch': lazy(() => lazyRetry(() => import('../../minigames/SeizoenenMatch'))),
  'kalenderMemory': lazy(() => lazyRetry(() => import('../../minigames/KalenderMemory'))),
  'klokVooruit': lazy(() => lazyRetry(() => import('../../minigames/KlokVooruit'))),
  'tijdsduurQuiz': lazy(() => lazyRetry(() => import('../../minigames/TijdsduurQuiz'))),
  'omrekenMemory': lazy(() => lazyRetry(() => import('../../minigames/OmrekenMemory'))),
  'tijdRekenen': lazy(() => lazyRetry(() => import('../../minigames/TijdRekenen'))),
  'klokRekenen': lazy(() => lazyRetry(() => import('../../minigames/KlokRekenen'))),
  'sudoku': lazy(() => lazyRetry(() => import('../../minigames/SudokuGame'))),
  'tectonic': lazy(() => lazyRetry(() => import('../../minigames/TectonicGame'))),
  'binary': lazy(() => lazyRetry(() => import('../../minigames/BinaryGame'))),
  'chess': lazy(() => lazyRetry(() => import('../../minigames/ChessGame'))),
  'rijmMatch': lazy(() => lazyRetry(() => import('../../minigames/RijmMatch'))),
  'rijmMemory': lazy(() => lazyRetry(() => import('../../minigames/RijmMemory'))),
  'woordsoortKies': lazy(() => lazyRetry(() => import('../../minigames/WoordsoortKies'))),
  'woordsoortSorteer': lazy(() => lazyRetry(() => import('../../minigames/WoordsoortSorteer'))),
  'woordsoortMemory': lazy(() => lazyRetry(() => import('../../minigames/WoordsoortMemory'))),
  'fractionIdentify': lazy(() => lazyRetry(() => import('../../minigames/FractionIdentify'))),
  'fractionCompare': lazy(() => lazyRetry(() => import('../../minigames/FractionCompare'))),
  'fractionMemory': lazy(() => lazyRetry(() => import('../../minigames/FractionMemory'))),
};

/**
 * BossBattleModal – Multi-round boss fight at the maze exit.
 * Shows intro → rounds of challenges → boss explodes on victory.
 *
 * Props:
 * - theme: current theme object
 * - mathSettings: current game settings
 * - totalRounds: number of rounds to win (2 for short/medium, 3 for long/xl)
 * - onVictory: called when boss is defeated
 * - playedGameTypes: ref to played game types for round-robin
 * - playSound: sound effect function
 */
function BossBattleModal({ theme, mathSettings, totalRounds, onVictory, playedGameTypes, playSound }) {
  const [phase, setPhase] = useState('intro');
  const [currentRound, setCurrentRound] = useState(0);
  const [gameType, setGameType] = useState(null);
  const [roundKey, setRoundKey] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [bossScale, setBossScale] = useState(1);
  const [bossOpacity, setBossOpacity] = useState(1);
  const [phaseMessage, setPhaseMessage] = useState('');

  const bossEmoji = theme?.colors?.challenge || '👾';
  const primary = theme?.colors?.primary || '#6366f1';

  const BOSS_TAUNTS = [
    'Haha, fout! Dat was makkelijk!',
    'Oeps! Ik ben nog lang niet verslagen!',
    'Mis! Durf je het nog een keer?',
    'Bijna… maar niet goed genoeg!',
    'Nee hoor! Probeer maar opnieuw!',
  ];

  const BOSS_CHEERS = [
    'Goed zo! Dat deed pijn! 💥',
    'Au! Je bent sterk! 🌟',
    'Wow, goed gedaan! 🔥',
    'Oef! Dat was een rake! ⚡',
    'Netjes! Maar ik geef niet op! 😤',
  ];

  const startBattle = () => {
    const type = pickRandomGameType(mathSettings, playedGameTypes || []);
    setGameType(type);
    setPhase('battle');
  };

  const handleRoundSuccess = () => {
    const nextRound = currentRound + 1;
    // Track the played game type
    if (playedGameTypes && gameType) {
      playedGameTypes.push(gameType);
    }
    if (nextRound >= totalRounds) {
      // Boss defeated!
      setPhase('victory');
      setShowConfetti(true);
      playSound?.('victory');
      // Boss explodes: scale up + fade out
      let scale = 1;
      let opacity = 1;
      const explodeInterval = setInterval(() => {
        scale += 0.15;
        opacity -= 0.05;
        setBossScale(scale);
        setBossOpacity(Math.max(0, opacity));
        if (opacity <= 0) {
          clearInterval(explodeInterval);
          // Wait a moment then trigger victory
          setTimeout(() => onVictory(), 1800);
        }
      }, 50);
    } else {
      // Show success celebration before next round
      setCurrentRound(nextRound);
      setPhaseMessage(BOSS_CHEERS[Math.floor(Math.random() * BOSS_CHEERS.length)]);
      setPhase('success');
      playSound?.('challenge-complete');
      setTimeout(() => {
        const type = pickRandomGameType(mathSettings, playedGameTypes || []);
        setGameType(type);
        setRoundKey(k => k + 1);
        setPhase('battle');
      }, 2000);
    }
  };

  const handleRoundFailure = () => {
    // Show taunt screen before retrying
    setPhaseMessage(BOSS_TAUNTS[Math.floor(Math.random() * BOSS_TAUNTS.length)]);
    setPhase('taunt');
    playSound?.('challenge-fail');
    setTimeout(() => {
      const type = pickRandomGameType(mathSettings, playedGameTypes || []);
      setGameType(type);
      setRoundKey(k => k + 1);
      setPhase('battle');
    }, 3000);
  };

  const GameComponent = gameType ? GAME_COMPONENTS[gameType] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <style>{`
        @keyframes boss-shake {
          0%, 100% { transform: translateX(0) scale(${bossScale}); }
          25% { transform: translateX(-8px) scale(${bossScale}); }
          75% { transform: translateX(8px) scale(${bossScale}); }
        }
      `}</style>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-5 sm:p-8">

        {/* Boss emoji + progress dots — side by side */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <div
            className="text-5xl sm:text-6xl transition-all duration-300"
            style={{
              transform: `scale(${bossScale})`,
              opacity: bossOpacity,
              filter: phase === 'victory' ? 'hue-rotate(90deg)' : 'none',
              animation: phase === 'success' ? 'boss-shake 0.4s ease-in-out 3' : 'none',
            }}
          >
            {bossEmoji}
          </div>

          {/* Progress dots */}
          {phase !== 'intro' && (
            <div className="flex gap-2">
              {Array.from({ length: totalRounds }, (_, i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-full transition-all ${
                    i < currentRound - 1 || (i === currentRound - 1 && phase !== 'success')
                      ? 'bg-green-500 scale-110'
                      : i === currentRound - 1 && phase === 'success'
                        ? 'bg-green-400 scale-125 animate-bounce'
                        : i === currentRound && phase === 'success'
                          ? 'bg-yellow-300'
                          : i === currentRound && phase === 'taunt'
                            ? 'bg-red-400 animate-pulse'
                            : i === currentRound && phase === 'battle'
                              ? 'bg-yellow-400 animate-pulse'
                              : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Intro phase */}
        {phase === 'intro' && (
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800 mb-3">
              ⚔️ Baasgevecht!
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              De bewaker van het doolhof staat in de weg! Versla hem door {totalRounds} uitdagingen op te lossen!
            </p>
            <button
              onClick={startBattle}
              className="px-8 py-3 rounded-xl font-bold text-base sm:text-lg transition-all active:scale-95 shadow-lg hover:shadow-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
            >
              Aan de slag! 💪
            </button>
          </div>
        )}

        {/* Battle phase */}
        {phase === 'battle' && GameComponent && (
          <div>
            <div className="text-center mb-4">
              <p className="text-xs sm:text-sm text-gray-500">
                Ronde {currentRound + 1} van {totalRounds} — {GAME_NAMES[gameType] || gameType}
              </p>
            </div>
            <Suspense fallback={
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin text-4xl">⏳</div>
              </div>
            }>
              <GameComponent
                key={`${gameType}-${currentRound}-${roundKey}`}
                mathSettings={mathSettings}
                theme={theme}
                onSuccess={handleRoundSuccess}
                onFailure={handleRoundFailure}
              />
            </Suspense>
          </div>
        )}

        {/* Success phase — celebrate between rounds */}
        {phase === 'success' && (
          <div className="text-center py-4">
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4 sm:p-6 mb-4">
              <p className="text-3xl sm:text-4xl mb-2">💥</p>
              <p className="text-base sm:text-lg font-bold text-green-700">
                {phaseMessage}
              </p>
            </div>
            <p className="text-sm text-gray-500 animate-pulse">
              Volgende ronde komt eraan…
            </p>
          </div>
        )}

        {/* Taunt phase — boss mocks after a wrong answer */}
        {phase === 'taunt' && (
          <div className="text-center py-4">
            <div className="text-5xl sm:text-6xl mb-3 animate-bounce">
              {bossEmoji}
            </div>
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 sm:p-6 mb-4">
              <p className="text-base sm:text-lg font-bold text-red-700">
                {phaseMessage}
              </p>
            </div>
            <p className="text-sm text-gray-500 animate-pulse">
              Volgende poging komt eraan… 💪
            </p>
          </div>
        )}

        {/* Victory phase */}
        {phase === 'victory' && (
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-extrabold text-green-600 mb-3 animate-bounce">
              🎉 De bewaker is verslagen!
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              De weg is vrij!
            </p>
          </div>
        )}

        {showConfetti && <Confetti />}
      </div>
    </div>
  );
}

export default BossBattleModal;
