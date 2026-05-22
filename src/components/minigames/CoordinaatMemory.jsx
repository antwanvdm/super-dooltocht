import { useState, useEffect } from 'react';
import { generateCoordinaatMemoryPairs, COLUMN_LABELS } from '../../utils/coordinatenData';

function CoordinaatMemory({ mathSettings, onSuccess }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [wrongPair, setWrongPair] = useState([]);
  const [canFlip, setCanFlip] = useState(true);
  const [gridData, setGridData] = useState(null);

  useEffect(() => {
    const level = mathSettings?.meetkundeLevel?.coordinaten || 'easy';
    const { pairs, grid, gridCols, gridRows } = generateCoordinaatMemoryPairs(level);
    setGridData({ grid, gridCols, gridRows });
    const allCards = pairs.flatMap((pair, i) => [
      { id: i * 2, pairId: i, content: pair.a, type: 'coord' },
      { id: i * 2 + 1, pairId: i, content: pair.b, type: 'icon' },
    ]).sort(() => Math.random() - 0.5);
    setCards(allCards);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (flipped.length === 2) {
      setCanFlip(false);
      const [first, second] = flipped;
      const firstCard = cards[first];
      const secondCard = cards[second];

      const isMatch = first !== second && firstCard.pairId === secondCard.pairId && firstCard.type !== secondCard.type;

      if (isMatch) {
        setMatched((prev) => [...prev, first, second]);
        setFlipped([]);
        setCanFlip(true);
        if (matched.length + 2 === cards.length) {
          setTimeout(() => onSuccess(), 1000);
        }
      } else {
        setWrongPair([first, second]);
        setTimeout(() => {
          setFlipped([]);
          setWrongPair([]);
          setCanFlip(true);
        }, 1500);
      }
    }
  }, [flipped, cards, matched, onSuccess]);

  const handleCardClick = (index) => {
    if (!canFlip || flipped.includes(index) || matched.includes(index)) return;
    setFlipped((prev) => [...prev, index]);
  };

  if (!gridData) return null;

  const gridColCount = cards.length <= 8 ? 4 : cards.length <= 12 ? 4 : 4;

  return (
    <div>
      <p className="text-base sm:text-xl text-gray-600 text-center mb-3 sm:mb-4">
        Zoek de coördinaat bij het plaatje!
      </p>

      {/* Reference grid */}
      <div className="flex justify-center mb-3 sm:mb-5">
        <div className="inline-block bg-teal-50 rounded-xl p-2 sm:p-3 border border-teal-200">
          <div className="flex">
            <div className="w-5 sm:w-7" />
            {COLUMN_LABELS.slice(0, gridData.gridCols).map((label) => (
              <div key={label} className="w-7 sm:w-9 text-center text-xs font-bold text-teal-700">
                {label}
              </div>
            ))}
          </div>
          {gridData.grid.map((row, rowIdx) => (
            <div key={rowIdx} className="flex">
              <div className="w-5 sm:w-7 flex items-center justify-center text-xs font-bold text-teal-700">
                {rowIdx + 1}
              </div>
              {row.map((cell, colIdx) => (
                <div
                  key={colIdx}
                  className="w-7 h-7 sm:w-9 sm:h-9 border border-teal-200 bg-white flex items-center justify-center text-sm sm:text-base"
                >
                  {cell || ''}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Memory cards */}
      <div className={`grid grid-cols-${gridColCount} gap-2 sm:gap-3`}>
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(index);
          const isMatched = matched.includes(index);
          const isWrong = wrongPair.includes(index);

          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(index)}
              aria-label={isFlipped ? card.content : 'Gedraaide kaart'}
              className={`aspect-square rounded-xl font-bold text-sm sm:text-base transition-all flex items-center justify-center p-1 ${
                isMatched
                  ? 'bg-green-400 text-white scale-95'
                  : isWrong
                    ? 'bg-red-400 text-white'
                    : isFlipped
                      ? 'bg-teal-100 text-gray-800 border-2 border-teal-400'
                      : 'bg-teal-500 text-white hover:bg-teal-600 cursor-pointer'
              }`}
            >
              {isFlipped || isMatched ? (
                <span className={card.type === 'icon' ? 'text-2xl sm:text-3xl' : 'text-sm sm:text-base font-mono'}>
                  {card.content}
                </span>
              ) : (
                <span className="text-2xl sm:text-3xl">?</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CoordinaatMemory;
