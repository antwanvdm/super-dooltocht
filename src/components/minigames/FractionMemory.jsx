import { useState, useEffect } from 'react';
import { generateFractionProblem } from '../../utils/difficultyAdapter';
import { FractionBar } from './FractionBar';

/**
 * FractionMemory – Koppel breukbalken aan hun getal-notatie.
 * Memory-spel met 4 paren (8 kaarten): visuele balk ↔ breuknotatie.
 */
function FractionMemory({ mathSettings, onSuccess, theme }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [wrongPair, setWrongPair] = useState([]);
  const [canFlip, setCanFlip] = useState(true);

  const primary = theme?.colors?.primary || '#6366f1';

  useEffect(() => {
    const level = mathSettings?.fractionLevel || 'easy';
    const pairs = [];
    const usedFractions = new Set();
    let attempts = 0;

    while (pairs.length < 8 && attempts < 100) {
      attempts++;
      const p = generateFractionProblem({ level, forceType: 'identify' });
      const key = `${p.numerator}/${p.denominator}`;
      if (usedFractions.has(key)) continue;
      usedFractions.add(key);

      const pairIndex = pairs.length / 2;
      // Visual bar card
      pairs.push({
        id: pairIndex * 2,
        pairId: pairIndex,
        type: 'bar',
        numerator: p.numerator,
        denominator: p.denominator,
      });
      // Text fraction card
      pairs.push({
        id: pairIndex * 2 + 1,
        pairId: pairIndex,
        type: 'text',
        numerator: p.numerator,
        denominator: p.denominator,
      });
    }

    setCards(pairs.sort(() => Math.random() - 0.5));
  }, [mathSettings]);

  useEffect(() => {
    if (flipped.length === 2) {
      setCanFlip(false);
      const [first, second] = flipped;
      const firstCard = cards[first];
      const secondCard = cards[second];

      const isMatch =
        first !== second &&
        firstCard.pairId === secondCard.pairId &&
        firstCard.type !== secondCard.type;

      if (isMatch) {
        const newMatched = [...matched, first, second];
        setMatched(newMatched);
        setFlipped([]);
        setCanFlip(true);

        if (newMatched.length === cards.length) {
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
    setFlipped([...flipped, index]);
  };

  return (
    <div>
      <p className="text-base sm:text-xl text-gray-600 text-center mb-4 sm:mb-6">
        Koppel de balk aan de juiste breuk!
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
              className={`aspect-square rounded-lg transition-all transform flex items-center justify-center p-1 ${
                isFlipped
                  ? isMatched
                    ? 'bg-green-500'
                    : isWrong
                      ? 'bg-red-500'
                      : 'bg-blue-50'
                  : 'bg-gradient-to-br from-purple-500 to-pink-500 hover:scale-105'
              } ${!canFlip && 'cursor-not-allowed'}`}
              disabled={!canFlip && !isFlipped}
            >
              {isFlipped ? (
                card.type === 'bar' ? (
                  <div className="w-[90%] bg-white rounded-md p-0.5">
                    <FractionBar
                      numerator={card.numerator}
                      denominator={card.denominator}
                      color={primary}
                      size="sm"
                    />
                  </div>
                ) : (
                  <span className={`text-lg sm:text-2xl font-bold ${isMatched || isWrong ? 'text-white' : 'text-gray-800'}`}>
                    <span className="inline-flex flex-col items-center leading-none">
                      <span className="border-b border-current px-1">{card.numerator}</span>
                      <span className="px-1">{card.denominator}</span>
                    </span>
                  </span>
                )
              ) : (
                <span className="text-lg sm:text-2xl md:text-4xl">
                  {theme.emoji}
                </span>
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

export default FractionMemory;
