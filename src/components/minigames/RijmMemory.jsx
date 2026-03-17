import { useState, useEffect } from 'react';
import { RIJM_SETS } from '../../utils/languageData';

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

function buildCards(level) {
  const maxIndex = level === 'hard' ? RIJM_SETS.length
    : level === 'medium' ? Math.min(25, RIJM_SETS.length)
    : Math.min(15, RIJM_SETS.length);
  const pool = RIJM_SETS.slice(0, maxIndex);

  // Pick 4 different clusters, take 2 words from each → 4 rhyme pairs
  const clusters = shuffle(pool).slice(0, 4);
  const cards = [];

  clusters.forEach((cluster, i) => {
    const pair = shuffle(cluster).slice(0, 2);
    cards.push(
      { id: i * 2, pairId: i, content: pair[0] },
      { id: i * 2 + 1, pairId: i, content: pair[1] },
    );
  });

  return shuffle(cards);
}

/**
 * RijmMemory – Memory spel: koppel rijmende woorden aan elkaar.
 * 4 paren (8 kaarten): zoek de twee woorden die rijmen.
 */
function RijmMemory({ mathSettings, onSuccess, theme }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [wrongPair, setWrongPair] = useState([]);
  const [canFlip, setCanFlip] = useState(true);

  useEffect(() => {
    setCards(buildCards(mathSettings?.rijmenLevel || 'easy'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (flipped.length === 2) {
      setCanFlip(false);
      const [first, second] = flipped;
      const firstCard = cards[first];
      const secondCard = cards[second];

      const isMatch =
        first !== second &&
        firstCard.pairId === secondCard.pairId;

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

  return (
    <div>
      <p className="text-base sm:text-xl text-gray-600 text-center mb-4 sm:mb-6">
        Zoek de twee woorden die rijmen!
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
              className={`aspect-square rounded-lg text-xs sm:text-sm md:text-base font-bold transition-all transform ${
                isFlipped
                  ? isMatched
                    ? 'bg-green-500 text-white'
                    : isWrong
                      ? 'bg-red-500 text-white'
                      : 'bg-blue-500 text-white'
                  : 'bg-gradient-to-br from-purple-500 to-pink-500 hover:scale-105'
              } ${!canFlip ? 'cursor-not-allowed' : ''}`}
              disabled={!canFlip && !isFlipped}
              aria-label={isFlipped ? card.content : 'Kaart omdraaien'}
            >
              {isFlipped ? (
                <div className="flex items-center justify-center h-full p-1 sm:p-2 text-center leading-tight">
                  <span className="text-xs sm:text-sm md:text-base">{card.content}</span>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-xl sm:text-2xl md:text-4xl">
                  {theme.emoji}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 sm:mt-6 text-center">
        <p className="text-base sm:text-lg text-gray-600">
          Gevonden: {matched.length / 2} / {cards.length / 2}
        </p>
      </div>
    </div>
  );
}

export default RijmMemory;
