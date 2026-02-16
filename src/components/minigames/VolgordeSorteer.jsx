import { useState, useEffect, useCallback } from 'react';
import { generateVolgordeChallenge } from '../../utils/timeAwarenessData';

/**
 * VolgordeSorteer - Zet dagen/maanden/seizoenen in de juiste volgorde.
 * Tap-based: tik op items in de juiste volgorde.
 */
function VolgordeSorteer({ mathSettings, onSuccess, onFailure }) {
  const [challenge, setChallenge] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null); // Voor cyclische volgorde
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [wrongIndex, setWrongIndex] = useState(null);

  useEffect(() => {
    const taOptions = {
      dagen: mathSettings?.timeAwarenessDagen ?? true,
      maanden: mathSettings?.timeAwarenessMaanden ?? true,
      seizoenen: mathSettings?.timeAwarenessSeizoen ?? true,
    };
    setChallenge(generateVolgordeChallenge(taOptions));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleItemClick = useCallback((item) => {
    if (showFeedback || !challenge) return;
    if (selectedOrder.includes(item)) return;

    const nextIndex = selectedOrder.length;

    // Bij cyclische challenges (seizoenen): elk startpunt is geldig
    if (challenge.cyclical && nextIndex === 0) {
      const idx = challenge.correctOrder.indexOf(item);
      if (idx >= 0) {
        // Roteer de correcte volgorde zodat deze begint bij het gekozen item
        const rotated = [
          ...challenge.correctOrder.slice(idx),
          ...challenge.correctOrder.slice(0, idx),
        ];
        setActiveOrder(rotated);
        setSelectedOrder([item]);
        setWrongIndex(null);
        return;
      }
    }

    const order = activeOrder || challenge.correctOrder;
    const expectedItem = order[nextIndex];

    if (item === expectedItem) {
      const newOrder = [...selectedOrder, item];
      setSelectedOrder(newOrder);
      setWrongIndex(null);

      // Check of alles compleet is
      if (newOrder.length === challenge.correctOrder.length) {
        setIsCorrect(true);
        setShowFeedback(true);
        setTimeout(() => onSuccess(), 1500);
      }
    } else {
      // Fout! Toon feedback en reset
      setWrongIndex(challenge.items.indexOf(item));
      onFailure();
      setTimeout(() => {
        setWrongIndex(null);
        setSelectedOrder([]);
        setActiveOrder(null);
      }, 1500);
    }
  }, [challenge, selectedOrder, activeOrder, showFeedback, onSuccess, onFailure]);

  if (!challenge) return null;

  const categoryEmoji = {
    dagen: '📅',
    maanden: '🗓️',
    seizoenen: '🌿',
  }[challenge.category] || '📅';

  return (
    <div className="text-center">
      {/* Instructie */}
      <div className="mb-4 sm:mb-6">
        <div className="text-4xl sm:text-5xl mb-3">{categoryEmoji}</div>
        <p className="text-base sm:text-xl font-bold text-gray-800 px-2">
          {challenge.label}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Tik de items aan in de juiste volgorde
        </p>
      </div>

      {/* Geselecteerde volgorde */}
      {selectedOrder.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-4 sm:mb-6 min-h-[3rem]">
          {selectedOrder.map((item, idx) => (
            <div
              key={idx}
              className="bg-green-100 border-2 border-green-400 text-green-800 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl font-bold text-sm sm:text-base flex items-center gap-1"
            >
              <span className="text-xs text-green-600 font-normal">{idx + 1}.</span>
              {item}
              <span className="text-green-500">✓</span>
            </div>
          ))}
          {!showFeedback && (
            <div className="border-2 border-dashed border-gray-300 text-gray-400 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-sm sm:text-base">
              {selectedOrder.length + 1}. ?
            </div>
          )}
        </div>
      )}

      {/* Items om te kiezen */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-sm mx-auto">
        {challenge.items.map((item, index) => {
          const alreadySelected = selectedOrder.includes(item);
          const isWrong = wrongIndex === index;

          let btnClass = 'bg-white border-2 border-gray-200 text-gray-800 hover:border-sky-400 hover:bg-sky-50';
          if (alreadySelected) {
            btnClass = 'bg-gray-100 border-2 border-gray-200 text-gray-400 cursor-not-allowed';
          } else if (isWrong) {
            btnClass = 'bg-red-100 border-2 border-red-500 text-red-800 scale-95';
          }

          return (
            <button
              key={index}
              onClick={() => handleItemClick(item)}
              disabled={alreadySelected || showFeedback}
              className={`p-3 sm:p-4 rounded-xl font-bold text-sm sm:text-lg transition-all ${btnClass}`}
            >
              {item}
              {isWrong && <span className="ml-1">❌</span>}
            </button>
          );
        })}
      </div>

      {/* Succes bericht */}
      {isCorrect && (
        <div className="mt-4 sm:mt-6 text-green-600 font-bold text-lg sm:text-xl animate-bounce">
          🎉 Goed zo! Dat is de juiste volgorde!
        </div>
      )}

      {/* Voortgang */}
      <div className="mt-4 text-center">
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-500">
          <span>{selectedOrder.length} / {challenge.correctOrder.length} geplaatst</span>
        </div>
      </div>
    </div>
  );
}

export default VolgordeSorteer;
