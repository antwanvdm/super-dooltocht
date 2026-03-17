import { useState, useEffect, lazy, Suspense } from 'react';
import { GAME_NAMES } from '../../utils/gameSelection';
import { useAudio } from '../../context/AudioProvider';
import { lazyRetry } from '../../utils/lazyRetry';
import Confetti from '../Confetti';

// Lazy-loaded component registry – components are only fetched when first rendered
const GAME_COMPONENTS = {
  'multiple-choice': lazy(() => lazyRetry(() => import('./MultipleChoice'))),
  'memory': lazy(() => lazyRetry(() => import('./MemoryGame'))),
  'puzzle': lazy(() => lazyRetry(() => import('./MathPuzzle'))),
  'darts': lazy(() => lazyRetry(() => import('./DartsGame'))),
  'placeValue': lazy(() => lazyRetry(() => import('./PlaceValueGame'))),
  'lovingHearts': lazy(() => lazyRetry(() => import('./LovingHeartsGame'))),
  'makeAmount': lazy(() => lazyRetry(() => import('./MakeAmountGame'))),
  'countMoney': lazy(() => lazyRetry(() => import('./CountMoneyGame'))),
  'smartPay': lazy(() => lazyRetry(() => import('./SmartPayGame'))),
  'change': lazy(() => lazyRetry(() => import('./ChangeGame'))),
  'clockMultipleChoice': lazy(() => lazyRetry(() => import('./ClockMultipleChoice'))),
  'clockMemory': lazy(() => lazyRetry(() => import('./ClockMemory'))),
  'clockInput': lazy(() => lazyRetry(() => import('./ClockInput'))),
  'clockMatchAnalog': lazy(() => lazyRetry(() => import('./ClockMatchAnalog'))),
  'clock24h': lazy(() => lazyRetry(() => import('./Clock24hGame'))),
  'clockWords': lazy(() => lazyRetry(() => import('./ClockWordsGame'))),
  'spellingCategoryMatch': lazy(() => lazyRetry(() => import('./SpellingCategoryMatch'))),
  'spellingConnect': lazy(() => lazyRetry(() => import('./SpellingConnect'))),
  'spellingTypeWord': lazy(() => lazyRetry(() => import('./SpellingTypeWord'))),
  'spellingTransform': lazy(() => lazyRetry(() => import('./SpellingTransform'))),
  'vocabularyMatch': lazy(() => lazyRetry(() => import('./VocabularyMatch'))),
  'vocabularyMemory': lazy(() => lazyRetry(() => import('./VocabularyMemory'))),
  'vocabularyFillIn': lazy(() => lazyRetry(() => import('./VocabularyFillIn'))),
  'readingComprehension': lazy(() => lazyRetry(() => import('./ReadingComprehension'))),
  'readingTrueFalse': lazy(() => lazyRetry(() => import('./ReadingTrueFalse'))),
  'englishMultipleChoice': lazy(() => lazyRetry(() => import('./EnglishMultipleChoice'))),
  'englishMemory': lazy(() => lazyRetry(() => import('./EnglishMemory'))),
  'englishTypeWord': lazy(() => lazyRetry(() => import('./EnglishTypeWord'))),
  'englishFillIn': lazy(() => lazyRetry(() => import('./EnglishFillIn'))),
  'englishConnect': lazy(() => lazyRetry(() => import('./EnglishConnect'))),
  'kalenderQuiz': lazy(() => lazyRetry(() => import('./KalenderQuiz'))),
  'volgordeSorteer': lazy(() => lazyRetry(() => import('./VolgordeSorteer'))),
  'seizoenenMatch': lazy(() => lazyRetry(() => import('./SeizoenenMatch'))),
  'kalenderMemory': lazy(() => lazyRetry(() => import('./KalenderMemory'))),
  'klokVooruit': lazy(() => lazyRetry(() => import('./KlokVooruit'))),
  'tijdsduurQuiz': lazy(() => lazyRetry(() => import('./TijdsduurQuiz'))),
  'omrekenMemory': lazy(() => lazyRetry(() => import('./OmrekenMemory'))),
  'tijdRekenen': lazy(() => lazyRetry(() => import('./TijdRekenen'))),
  'klokRekenen': lazy(() => lazyRetry(() => import('./KlokRekenen'))),
  'sudoku': lazy(() => lazyRetry(() => import('./SudokuGame'))),
  'tectonic': lazy(() => lazyRetry(() => import('./TectonicGame'))),
  'binary': lazy(() => lazyRetry(() => import('./BinaryGame'))),
  'chess': lazy(() => lazyRetry(() => import('./ChessGame'))),
  'rijmMatch': lazy(() => lazyRetry(() => import('./RijmMatch'))),
  'rijmMemory': lazy(() => lazyRetry(() => import('./RijmMemory'))),
  'woordsoortKies': lazy(() => lazyRetry(() => import('./WoordsoortKies'))),
  'woordsoortSorteer': lazy(() => lazyRetry(() => import('./WoordsoortSorteer'))),
  'woordsoortMemory': lazy(() => lazyRetry(() => import('./WoordsoortMemory'))),
  'fractionIdentify': lazy(() => lazyRetry(() => import('./FractionIdentify'))),
  'fractionCompare': lazy(() => lazyRetry(() => import('./FractionCompare'))),
  'fractionMemory': lazy(() => lazyRetry(() => import('./FractionMemory'))),
};

function ChallengeModal({ challenge, theme, mathSettings, gameType, onComplete, onClose }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [interactionReady, setInteractionReady] = useState(false);
  const { playSound } = useAudio();

  // Korte delay voordat de modal interactief wordt, zodat een vinger die
  // al op het scherm lag niet per ongeluk meteen een antwoord selecteert.
  useEffect(() => {
    const timer = setTimeout(() => setInteractionReady(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const handleSuccess = () => {
    // Speel success geluid direct bij goed antwoord
    playSound('success');
    // Toon confetti!
    setShowConfetti(true);
    // Wacht even zodat de speler de confetti kan zien
    setTimeout(() => {
      onComplete(challenge.id);
    }, 1500);
  };

  const handleFailure = () => {
    // Bij fout blijven we positief - gewoon nog een keer proberen
    playSound('wrong');
  };

  if (!gameType) {
    return null;
  }

  const gameName = GAME_NAMES[gameType] || 'Spel';

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className={`relative rounded-3xl shadow-2xl max-w-full sm:max-w-3xl w-full max-h-[95vh] overflow-hidden flex flex-col`}>
        {/* Thema-gekleurde header */}
        <div className={`${theme.colors.primary} px-4 sm:px-8 py-4 sm:py-6 flex-shrink-0`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="text-3xl sm:text-5xl">{theme.emoji}</span>
              <div>
                <h2 className="text-xl sm:text-3xl font-bold text-white drop-shadow">
                  Uitdaging: {gameName}
                </h2>
                <p className="text-white/80 font-medium text-xs sm:text-base">Los de opgave op om verder te gaan</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-2xl sm:text-3xl text-white/80 hover:text-white hover:scale-110 transition-all flex-shrink-0"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className="bg-white p-4 sm:p-8 overflow-y-auto flex-1 relative">
          {!interactionReady && (
            <div className="absolute inset-0 z-10" />
          )}
          <Suspense fallback={
            <div className="flex justify-center items-center p-8">
              <span className="text-4xl animate-bounce">🎮</span>
            </div>
          }>
            {(() => {
              const GameComponent = GAME_COMPONENTS[gameType];
              if (!GameComponent) return null;
              return (
                <GameComponent
                  mathSettings={mathSettings}
                  onSuccess={handleSuccess}
                  onFailure={handleFailure}
                  theme={theme}
                />
              );
            })()}
          </Suspense>
        </div>

        {/* Decoratieve rand onderaan in themakleur */}
        <div className={`${theme.colors.secondary || theme.colors.primary} h-2`} />
      </div>
      
      {/* Confetti bij succes! */}
      {showConfetti && <Confetti duration={2000} />}
    </div>
  );
}

export default ChallengeModal;
