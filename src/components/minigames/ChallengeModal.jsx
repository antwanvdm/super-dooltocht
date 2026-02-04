import { useState, useEffect } from 'react';
import MultipleChoice from './MultipleChoice';
import MemoryGame from './MemoryGame';
import MathPuzzle from './MathPuzzle';
import DartsGame from './DartsGame';
import PlaceValueGame from './PlaceValueGame';
import LovingHeartsGame from './LovingHeartsGame';
import Confetti from '../Confetti';

// Standaard minigames voor reguliere sommen (add/sub/mul)
const STANDARD_GAMES = ['multiple-choice', 'memory', 'puzzle', 'darts'];

const GAME_NAMES = {
  'multiple-choice': 'Kies het antwoord',
  'memory': 'Memory',
  'puzzle': 'Sommenblad',
  'darts': 'Darts',
  'placeValue': 'Begripsoefening',
  'lovingHearts': 'Verliefde harten',
};

function ChallengeModal({ challenge, theme, mathSettings, onComplete, onClose }) {
  const [gameType, setGameType] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Bepaal welke game types beschikbaar zijn op basis van instellingen
    const enabled = mathSettings?.enabledOperations || {};
    const hasStandardOps = enabled.add || enabled.sub || enabled.mul;
    const hasPlaceValue = enabled.placeValue;
    const hasLovingHearts = enabled.lovingHearts;

    // Bouw pool van beschikbare game types
    const availableTypes = [];
    
    if (hasStandardOps) {
      availableTypes.push(...STANDARD_GAMES);
    }
    if (hasPlaceValue) {
      availableTypes.push('placeValue');
    }
    if (hasLovingHearts) {
      availableTypes.push('lovingHearts');
    }

    // Fallback naar multiple-choice als niets beschikbaar
    if (availableTypes.length === 0) {
      availableTypes.push('multiple-choice');
    }

    const randomType = availableTypes[Math.floor(Math.random() * availableTypes.length)];
    setGameType(randomType);
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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className={`relative rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden`}>
        {/* Thema-gekleurde header */}
        <div className={`${theme.colors.primary} px-8 py-6`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{theme.emoji}</span>
              <div>
                <h2 className="text-3xl font-bold text-white drop-shadow">
                  Uitdaging: {gameName}
                </h2>
                <p className="text-white/80 font-medium">Los de opgave op om verder te gaan</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-3xl text-white/80 hover:text-white hover:scale-110 transition-all"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className="bg-white p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            {gameType === 'multiple-choice' && (
              <MultipleChoice
                mathSettings={mathSettings}
                onSuccess={handleSuccess}
                onFailure={handleFailure}
                theme={theme}
              />
            )}

            {gameType === 'memory' && (
              <MemoryGame
                mathSettings={mathSettings}
                onSuccess={handleSuccess}
                theme={theme}
              />
            )}

            {gameType === 'puzzle' && (
              <MathPuzzle
                mathSettings={mathSettings}
                onSuccess={handleSuccess}
                onFailure={handleFailure}
                theme={theme}
              />
            )}

            {gameType === 'darts' && (
              <DartsGame
                mathSettings={mathSettings}
                onSuccess={handleSuccess}
                onFailure={handleFailure}
                theme={theme}
              />
            )}

            {gameType === 'placeValue' && (
              <PlaceValueGame
                mathSettings={mathSettings}
                onSuccess={handleSuccess}
                onFailure={handleFailure}
                theme={theme}
              />
            )}

            {gameType === 'lovingHearts' && (
              <LovingHeartsGame
                mathSettings={mathSettings}
                onSuccess={handleSuccess}
                onFailure={handleFailure}
                theme={theme}
              />
            )}
          </div>
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
