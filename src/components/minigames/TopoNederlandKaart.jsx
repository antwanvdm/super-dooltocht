import { useState, useCallback, useMemo } from 'react';
import NetherlandsMap, { PROVINCE_NAMES } from './NetherlandsMap';

const ALL_KEYS = Object.keys(PROVINCE_NAMES);

function pickTarget() {
  return ALL_KEYS[Math.floor(Math.random() * ALL_KEYS.length)];
}

/**
 * TopoNederlandKaart – "Klik op de provincie" minigame.
 * Shows a map of the Netherlands and asks the player to click the correct province.
 * Easy: labels visible. Medium: no labels.
 */
function TopoNederlandKaart({ mathSettings, onSuccess, onFailure }) {
  const level = mathSettings?.topoLevel?.nederland || 'easy';
  const showLabels = level === 'easy';

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
      <p className="text-gray-600 text-xs sm:text-base mb-1">🇳🇱 Klik op de juiste provincie!</p>

      {/* Province name being asked */}
      <div className="inline-block bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl px-4 sm:px-6 py-1.5 sm:py-2 border-2 border-amber-300 mb-2">
        <p className="text-base sm:text-xl font-bold text-gray-800">
          {PROVINCE_NAMES[target]}
        </p>
      </div>

      {/* Map */}
      <NetherlandsMap
        target={target}
        selected={selected}
        isCorrect={isCorrect}
        correct={[]}
        onClick={handleClick}
        showLabels={showLabels}
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

export default TopoNederlandKaart;
