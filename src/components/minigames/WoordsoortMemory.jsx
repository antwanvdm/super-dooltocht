import { useState, useEffect } from 'react';
import { WOORDSOORTEN_DATA, WOORDSOORT_LABELS, WOORDSOORT_ICONS, WOORDSOORTEN_LEVEL_TYPES } from '../../utils/languageData';

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const LEVEL_PAIR_COUNT = { easy: 4, medium: 4, hard: 4 };

function buildCards(level) {
  const types = WOORDSOORTEN_LEVEL_TYPES[level] || WOORDSOORTEN_LEVEL_TYPES.medium;
  const count = LEVEL_PAIR_COUNT[level] || 4;

  // Verdeel eerlijk over de beschikbare woordsoorten
  const byType = {};
  for (const t of types) {
    byType[t] = shuffle(WOORDSOORTEN_DATA.filter(d => d.type === t));
  }
  const items = [];
  let typeIdx = 0;
  while (items.length < count) {
    const t = types[typeIdx % types.length];
    const word = byType[t].pop();
    if (word) items.push(word);
    typeIdx++;
  }

  const cards = [];
  items.forEach((item, i) => {
    cards.push({
      id: i * 2,
      pairId: i,
      type: 'word',
      display: item.word,
      wordType: item.type,
    });
    cards.push({
      id: i * 2 + 1,
      pairId: i,
      type: 'label',
      display: `${WOORDSOORT_ICONS[item.type]} ${WOORDSOORT_LABELS[item.type]}`,
      wordType: item.type,
    });
  });

  return shuffle(cards);
}

/**
 * WoordsoortMemory – Memory spel: match woord ↔ woordsoort.
 * Draai twee kaarten om. Een woordkaart past bij de bijbehorende woordsoortkaart.
 */
function WoordsoortMemory({ onSuccess, theme, mathSettings }) {
  const level = mathSettings?.woordsoortenLevel || 'easy';
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [wrongPair, setWrongPair] = useState([]);
  const [canFlip, setCanFlip] = useState(true);

  useEffect(() => {
    setCards(buildCards(level));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (flipped.length === 2) {
      setCanFlip(false);
      const [first, second] = flipped;
      const a = cards[first];
      const b = cards[second];

      const isMatch = first !== second && a.type !== b.type && a.wordType === b.wordType;

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

  const handleClick = (index) => {
    if (!canFlip || flipped.includes(index) || matched.includes(index)) return;
    setFlipped((prev) => [...prev, index]);
  };

  const pairCount = cards.length / 2;
  const gridCols = cards.length <= 6 ? 'grid-cols-3' : cards.length <= 8 ? 'grid-cols-4' : 'grid-cols-5';

  return (
    <div>
      <p className="text-base sm:text-xl text-gray-600 text-center mb-4 sm:mb-6">
        Zoek het woord bij de juiste woordsoort!
      </p>

      <div className={`grid ${gridCols} gap-2 sm:gap-3`}>
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(index);
          const isMatched = matched.includes(index);
          const isWrong = wrongPair.includes(index);

          return (
            <button
              key={card.id}
              onClick={() => handleClick(index)}
              disabled={!canFlip && !isFlipped}
              aria-label={isFlipped ? card.display : 'Kaart omdraaien'}
              className={`aspect-square rounded-lg font-bold transition-all transform flex items-center justify-center p-0.5 sm:p-1 ${
                isFlipped
                  ? isMatched
                    ? 'bg-green-500 text-white'
                    : isWrong
                      ? 'bg-red-500 text-white'
                      : 'bg-blue-500 text-white'
                  : 'bg-gradient-to-br from-purple-500 to-pink-500 hover:scale-105'
              } ${!canFlip ? 'cursor-not-allowed' : ''}`}
            >
              {isFlipped ? (
                <div className="flex flex-col items-center justify-center h-full p-1 sm:p-2 text-center leading-tight">
                  <span className={`${card.type === 'word' ? 'text-xs sm:text-sm md:text-base' : 'text-[10px] sm:text-xs md:text-sm'}`}>
                    {card.display}
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-xl sm:text-2xl md:text-4xl">
                  {theme?.emoji || '❓'}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 sm:mt-6 text-center">
        <p className="text-base sm:text-lg text-gray-600">
          Gevonden: {matched.length / 2} / {pairCount}
        </p>
      </div>
    </div>
  );
}

export default WoordsoortMemory;
