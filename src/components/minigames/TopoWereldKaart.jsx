import { useState, useCallback, useMemo } from 'react';
import WorldMap, { CONTINENT_NAMES, ALL_CONTINENTS } from './WorldMap';

function pickTarget() {
  return ALL_CONTINENTS[Math.floor(Math.random() * ALL_CONTINENTS.length)];
}

/**
 * TopoWereldKaart – "Klik op het juiste continent" minigame.
 */
function TopoWereldKaart({ onSuccess, onFailure }) {
  const target = useMemo(() => pickTarget(), []);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleClick = useCallback((key) => {
    if (showFeedback) return;

    setSelected(key);
    const right = key === target;
    setIsCorrect(right);
    setShowFeedback(true);

    if (right) {
      setTimeout(() => onSuccess(), 1200);
    } else {
      onFailure();
      setTimeout(() => {
        setSelected(null);
        setShowFeedback(false);
      }, 1500);
    }
  }, [showFeedback, target, onSuccess, onFailure]);

  return (
    <div className="text-center flex flex-col items-center">
      <p className="text-gray-600 text-xs sm:text-base mb-1">🌍 Klik op het juiste continent!</p>

      <div className="inline-block bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl px-4 sm:px-6 py-1.5 sm:py-2 border-2 border-emerald-300 mb-2">
        <p className="text-base sm:text-xl font-bold text-gray-800">
          {CONTINENT_NAMES[target]}
        </p>
      </div>

      <WorldMap
        selected={selected}
        isCorrect={isCorrect}
        onClick={handleClick}
      />

      {showFeedback && (
        <div className={`mt-2 p-1.5 rounded-xl text-sm sm:text-base ${
          isCorrect ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
        }`}>
          {isCorrect ? '🎉 Goed zo!' : '💪 Bijna! Probeer nog eens!'}
        </div>
      )}
    </div>
  );
}

export default TopoWereldKaart;
