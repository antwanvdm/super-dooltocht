import { useState, useEffect } from 'react';
import { generateVormenMemoryPairs } from '../../utils/meetkundeData';
import ShapeSVG from './ShapeSVG';

function VormenMemory({ mathSettings, onSuccess, onFailure }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [wrongPair, setWrongPair] = useState([]);
  const [canFlip, setCanFlip] = useState(true);

  useEffect(() => {
    const level = mathSettings?.meetkundeLevel?.vormen || 'easy';
    const pairs = generateVormenMemoryPairs(4, level);
    const allCards = pairs.flatMap((pair, i) => [
      { id: i * 2, pairId: i, content: pair.left, svg: pair.svg, type: 'left' },
      { id: i * 2 + 1, pairId: i, content: pair.right, type: 'right' },
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
        setMatched(prev => [...prev, first, second]);
        setFlipped([]);
        setCanFlip(true);
        if (matched.length + 2 === cards.length) {
          setTimeout(() => onSuccess(), 1000);
        }
      } else {
        setWrongPair([first, second]);
        onFailure();
        setTimeout(() => {
          setFlipped([]);
          setWrongPair([]);
          setCanFlip(true);
        }, 1500);
      }
    }
  }, [flipped, cards, matched, onSuccess, onFailure]);

  const handleCardClick = (index) => {
    if (!canFlip || flipped.includes(index) || matched.includes(index)) return;
    setFlipped(prev => [...prev, index]);
  };

  return (
    <div>
      <p className="text-base sm:text-xl text-gray-600 text-center mb-4 sm:mb-6">
        Zoek de vorm bij het juiste aantal zijden!
      </p>
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(index);
          const isMatched = matched.includes(index);
          const isWrong = wrongPair.includes(index);

          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(index)}
              className={`aspect-square rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center p-1 ${
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
                <span className="text-center leading-tight flex flex-col items-center gap-1">
                  {card.svg && <ShapeSVG shape={card.svg} size={32} />}
                  <span>{card.content}</span>
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

export default VormenMemory;
