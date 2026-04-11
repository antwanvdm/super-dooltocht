import { useState, useEffect } from 'react';
import { generateBordenMemoryPairs } from '../../utils/verkeerData';
import TrafficSignSVG from './TrafficSignSVG';

function VerkeerBordenMemory({ mathSettings, onSuccess, onFailure }) {
  const level = mathSettings?.verkeerLevel?.borden || 'easy';
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [wrongPair, setWrongPair] = useState([]);
  const [canFlip, setCanFlip] = useState(true);

  useEffect(() => {
    const pairs = generateBordenMemoryPairs(4, level);
    const allCards = pairs.flatMap((pair, i) => [
      { id: i * 2, pairId: i, svg: pair.svg, type: 'sign' },
      { id: i * 2 + 1, pairId: i, content: pair.right, type: 'meaning' },
    ]).sort(() => Math.random() - 0.5);
    setCards(allCards);
  }, [level]);

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
        🪧 Zoek het bord bij de betekenis!
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
              className={`aspect-square rounded-xl font-bold text-[10px] sm:text-xs transition-all flex items-center justify-center p-1 ${
                isMatched
                  ? 'bg-green-400 text-white scale-95'
                  : isWrong
                    ? 'bg-red-400 text-white'
                    : isFlipped
                      ? 'bg-sky-100 text-gray-800 border-2 border-sky-400'
                      : 'bg-sky-500 text-white hover:bg-sky-600 cursor-pointer'
              }`}
            >
              {isFlipped || isMatched ? (
                card.svg
                  ? <div className="w-[90%] h-[90%]"><TrafficSignSVG sign={card.svg} size={80} className="w-full h-full" /></div>
                  : <span className="text-center leading-tight overflow-hidden">{card.content}</span>
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

export default VerkeerBordenMemory;
