import { useState, useEffect } from 'react';
import { generateKalenderMemoryPairs } from '../../utils/timeAwarenessData';

/**
 * KalenderMemory - Memory game: koppel dagen/maanden aan hun volgnummer,
 * of seizoenen aan hun startmaand.
 */
function KalenderMemory({ mathSettings, onSuccess }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [wrongPair, setWrongPair] = useState([]);
  const [canFlip, setCanFlip] = useState(true);

  useEffect(() => {
    const taOptions = {
      dagen: mathSettings?.timeAwarenessDagen ?? true,
      maanden: mathSettings?.timeAwarenessMaanden ?? true,
      seizoenen: mathSettings?.timeAwarenessSeizoen ?? true,
    };
    const pairs = generateKalenderMemoryPairs(taOptions, 4);

    const memoryCards = [];
    pairs.forEach((pair, pairIndex) => {
      // Hoofdkaart (bijv. "maandag")
      memoryCards.push({
        id: pairIndex * 2,
        pairId: pairIndex,
        type: 'primary',
        content: pair.content,
        category: pair.category,
      });
      // Match-kaart (bijv. "dag 1")
      memoryCards.push({
        id: pairIndex * 2 + 1,
        pairId: pairIndex,
        type: 'match',
        content: pair.matchContent,
        category: pair.category,
      });
    });

    // Shuffle
    setCards(memoryCards.sort(() => Math.random() - 0.5));
  }, [mathSettings]);

  const handleCardClick = (card) => {
    if (!canFlip) return;
    if (flipped.includes(card.id)) return;
    if (matched.includes(card.pairId)) return;

    const newFlipped = [...flipped, card.id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setCanFlip(false);
      const [first, second] = newFlipped.map(id => cards.find(c => c.id === id));

      if (first.pairId === second.pairId) {
        // Match!
        const newMatched = [...matched, first.pairId];
        setMatched(newMatched);
        setTimeout(() => {
          setFlipped([]);
          setCanFlip(true);
          if (newMatched.length === 4) {
            setTimeout(() => onSuccess(), 600);
          }
        }, 800);
      } else {
        // Geen match
        setWrongPair(newFlipped);
        setTimeout(() => {
          setWrongPair([]);
          setFlipped([]);
          setCanFlip(true);
        }, 1200);
      }
    }
  };

  const categoryEmoji = {
    dagen: '📅',
    maanden: '🗓️',
    seizoenen: '🌿',
  };

  return (
    <div>
      <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 text-center">
        Vind de juiste paren! Koppel elk item aan het juiste nummer of seizoen.
      </p>

      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {cards.map((card) => {
          const isFlipped = flipped.includes(card.id);
          const isMatched = matched.includes(card.pairId);
          const isWrong = wrongPair.includes(card.id);

          let cardClass = 'bg-gradient-to-br from-sky-400 to-cyan-500 text-white cursor-pointer hover:scale-105';
          if (isMatched) {
            cardClass = 'bg-green-100 border-2 border-green-400 text-green-800';
          } else if (isWrong) {
            cardClass = 'bg-red-100 border-2 border-red-400 text-red-800';
          } else if (isFlipped) {
            cardClass = 'bg-white border-2 border-sky-400 text-gray-800';
          }

          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card)}
              disabled={isMatched}
              className={`aspect-square rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center p-1 sm:p-2 ${cardClass}`}
            >
              {isFlipped || isMatched || isWrong ? (
                <div className="text-center">
                  <span className="capitalize leading-tight break-words text-[10px] sm:text-xs">{card.content}</span>
                </div>
              ) : (
                <span className="text-2xl sm:text-3xl">❓</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Voortgang */}
      <div className="mt-3 sm:mt-4 text-center">
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-500">
          <span>Gevonden: {matched.length}/4</span>
          {matched.length === 4 && <span className="text-green-600 font-bold">🎉 Alle paren gevonden!</span>}
        </div>
      </div>
    </div>
  );
}

export default KalenderMemory;
