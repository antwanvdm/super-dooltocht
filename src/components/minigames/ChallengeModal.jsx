import { useState, useEffect, lazy, Suspense } from 'react';
import { pickRandomGameType, GAME_NAMES } from '../../utils/gameSelection';
import Confetti from '../Confetti';

// Lazy-loaded component registry – components are only fetched when first rendered
const GAME_COMPONENTS = {
  'multiple-choice': lazy(() => import('./MultipleChoice')),
  'memory': lazy(() => import('./MemoryGame')),
  'puzzle': lazy(() => import('./MathPuzzle')),
  'darts': lazy(() => import('./DartsGame')),
  'placeValue': lazy(() => import('./PlaceValueGame')),
  'lovingHearts': lazy(() => import('./LovingHeartsGame')),
  'makeAmount': lazy(() => import('./MakeAmountGame')),
  'countMoney': lazy(() => import('./CountMoneyGame')),
  'smartPay': lazy(() => import('./SmartPayGame')),
  'change': lazy(() => import('./ChangeGame')),
  'clockMultipleChoice': lazy(() => import('./ClockMultipleChoice')),
  'clockMemory': lazy(() => import('./ClockMemory')),
  'clockInput': lazy(() => import('./ClockInput')),
  'clockMatchAnalog': lazy(() => import('./ClockMatchAnalog')),
  'clock24h': lazy(() => import('./Clock24hGame')),
  'clockWords': lazy(() => import('./ClockWordsGame')),
  'spellingCategoryMatch': lazy(() => import('./SpellingCategoryMatch')),
  'spellingConnect': lazy(() => import('./SpellingConnect')),
  'spellingTypeWord': lazy(() => import('./SpellingTypeWord')),
  'vocabularyMatch': lazy(() => import('./VocabularyMatch')),
  'vocabularyMemory': lazy(() => import('./VocabularyMemory')),
  'vocabularyFillIn': lazy(() => import('./VocabularyFillIn')),
  'readingComprehension': lazy(() => import('./ReadingComprehension')),
  'readingTrueFalse': lazy(() => import('./ReadingTrueFalse')),
  'englishMultipleChoice': lazy(() => import('./EnglishMultipleChoice')),
  'englishMemory': lazy(() => import('./EnglishMemory')),
  'englishTypeWord': lazy(() => import('./EnglishTypeWord')),
  'englishFillIn': lazy(() => import('./EnglishFillIn')),
  'englishConnect': lazy(() => import('./EnglishConnect')),
  'kalenderQuiz': lazy(() => import('./KalenderQuiz')),
  'volgordeSorteer': lazy(() => import('./VolgordeSorteer')),
  'seizoenenMatch': lazy(() => import('./SeizoenenMatch')),
  'kalenderMemory': lazy(() => import('./KalenderMemory')),
  'klokVooruit': lazy(() => import('./KlokVooruit')),
  'tijdsduurQuiz': lazy(() => import('./TijdsduurQuiz')),
  'omrekenMemory': lazy(() => import('./OmrekenMemory')),
  'tijdRekenen': lazy(() => import('./TijdRekenen')),
  'klokRekenen': lazy(() => import('./KlokRekenen')),
};

function ChallengeModal({ challenge, theme, mathSettings, onComplete, onClose }) {
  const [gameType, setGameType] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [interactionReady, setInteractionReady] = useState(false);

  // Korte delay voordat de modal interactief wordt, zodat een vinger die
  // al op het scherm lag niet per ongeluk meteen een antwoord selecteert.
  useEffect(() => {
    const timer = setTimeout(() => setInteractionReady(true), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setGameType(pickRandomGameType(mathSettings));
  }, [challenge, mathSettings]);

  const handleSuccess = () => {
    // Toon confetti!
    setShowConfetti(true);
    // Wacht even zodat de speler de confetti kan zien
    setTimeout(() => {
      onComplete(challenge.id);
    }, 1500);
  };

  const handleFailure = () => {
    // Bij fout blijven we positief - gewoon nog een keer proberen
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
