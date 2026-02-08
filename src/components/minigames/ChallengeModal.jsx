import { useState, useEffect } from 'react';
import MultipleChoice from './MultipleChoice';
import MemoryGame from './MemoryGame';
import MathPuzzle from './MathPuzzle';
import DartsGame from './DartsGame';
import PlaceValueGame from './PlaceValueGame';
import LovingHeartsGame from './LovingHeartsGame';
import MakeAmountGame from './MakeAmountGame';
import CountMoneyGame from './CountMoneyGame';
import SmartPayGame from './SmartPayGame';
import ChangeGame from './ChangeGame';
import ClockMultipleChoice from './ClockMultipleChoice';
import ClockMemory from './ClockMemory';
import ClockInput from './ClockInput';
import ClockMatchAnalog from './ClockMatchAnalog';
import Clock24hGame from './Clock24hGame';
import ClockWordsGame from './ClockWordsGame';
import Confetti from '../Confetti';

// Standaard minigames voor reguliere sommen (add/sub/mul)
const STANDARD_GAMES = ['multiple-choice', 'memory', 'puzzle', 'darts'];

// Money minigames
const MONEY_GAMES = ['makeAmount', 'countMoney', 'smartPay', 'change'];

// Clock minigames
const CLOCK_GAMES = ['clockMultipleChoice', 'clockMemory', 'clockInput', 'clockMatchAnalog'];

const GAME_NAMES = {
  'multiple-choice': 'Kies het antwoord',
  'memory': 'Memory',
  'puzzle': 'Sommenblad',
  'darts': 'Darts',
  'placeValue': 'Getallen begrijpen',
  'lovingHearts': 'Verliefde harten',
  'makeAmount': 'Maak het bedrag',
  'countMoney': 'Tel het geld',
  'smartPay': 'Slim betalen',
  'change': 'Wisselgeld',
  'clockMultipleChoice': 'Hoe laat is het?',
  'clockMemory': 'Klok Memory',
  'clockInput': 'Typ de tijd',
  'clockMatchAnalog': 'Welke klok?',
  'clock24h': '24-uursklok',
  'clockWords': 'Schrijf de tijd',
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
    const hasMoney = enabled.money;
    const hasClock = enabled.clock;

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
    if (hasMoney) {
      availableTypes.push(...MONEY_GAMES);
    }
    if (hasClock) {
      availableTypes.push(...CLOCK_GAMES);
      if (mathSettings?.clock24h) {
        availableTypes.push('clock24h');
      }
      if (mathSettings?.clockWords) {
        availableTypes.push('clockWords');
      }
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
        <div className="bg-white p-4 sm:p-8 overflow-y-auto flex-1">
          <div className="space-y-4 sm:space-y-6">
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

            {gameType === 'makeAmount' && (
              <MakeAmountGame
                mathSettings={mathSettings}
                onSuccess={handleSuccess}
                onFailure={handleFailure}
                theme={theme}
              />
            )}

            {gameType === 'countMoney' && (
              <CountMoneyGame
                mathSettings={mathSettings}
                onSuccess={handleSuccess}
                onFailure={handleFailure}
                theme={theme}
              />
            )}

            {gameType === 'smartPay' && (
              <SmartPayGame
                mathSettings={mathSettings}
                onSuccess={handleSuccess}
                onFailure={handleFailure}
                theme={theme}
              />
            )}

            {gameType === 'change' && (
              <ChangeGame
                mathSettings={mathSettings}
                onSuccess={handleSuccess}
                onFailure={handleFailure}
                theme={theme}
              />
            )}

            {gameType === 'clockMultipleChoice' && (
              <ClockMultipleChoice
                mathSettings={mathSettings}
                onSuccess={handleSuccess}
                onFailure={handleFailure}
                theme={theme}
              />
            )}

            {gameType === 'clockMemory' && (
              <ClockMemory
                mathSettings={mathSettings}
                onSuccess={handleSuccess}
                theme={theme}
              />
            )}

            {gameType === 'clockInput' && (
              <ClockInput
                mathSettings={mathSettings}
                onSuccess={handleSuccess}
                onFailure={handleFailure}
                theme={theme}
              />
            )}

            {gameType === 'clockMatchAnalog' && (
              <ClockMatchAnalog
                mathSettings={mathSettings}
                onSuccess={handleSuccess}
                onFailure={handleFailure}
                theme={theme}
              />
            )}

            {gameType === 'clock24h' && (
              <Clock24hGame
                mathSettings={mathSettings}
                onSuccess={handleSuccess}
                onFailure={handleFailure}
                theme={theme}
              />
            )}

            {gameType === 'clockWords' && (
              <ClockWordsGame
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
