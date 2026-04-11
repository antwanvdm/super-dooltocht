import { useState, useCallback, useMemo } from 'react';
import EuropeMap, { COUNTRY_NAMES, EASY_COUNTRIES, ALL_COUNTRIES } from './EuropeMap';

function pickTarget(pool) {
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * TopoEuropaKaart – "Klik op het juiste land" minigame.
 * Easy: only well-known western/southern European countries.
 * Medium: all European countries.
 */
function TopoEuropaKaart({ mathSettings, onSuccess, onFailure }) {
  const level = mathSettings?.topoLevel?.europa || 'easy';
  const pool = level === 'easy' ? EASY_COUNTRIES : ALL_COUNTRIES;

  const target = useMemo(() => pickTarget(pool), [pool]);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleClick = useCallback((key) => {
    if (showFeedback) return;
    if (!pool.includes(key)) return;

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
  }, [showFeedback, target, pool, onSuccess, onFailure]);

  return (
    <div className="text-center flex flex-col items-center">
      <p className="text-gray-600 text-xs sm:text-base mb-1">🇪🇺 Klik op het juiste land!</p>

      <div className="inline-block bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl px-4 sm:px-6 py-1.5 sm:py-2 border-2 border-blue-300 mb-2">
        <p className="text-base sm:text-xl font-bold text-gray-800">
          {COUNTRY_NAMES[target]}
        </p>
      </div>

      <EuropeMap
        selected={selected}
        isCorrect={isCorrect}
        onClick={handleClick}
        clickableKeys={pool}
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

export default TopoEuropaKaart;
