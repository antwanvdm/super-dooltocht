import { useState, useEffect } from 'react';
import { generateEnglishMemoryPairs } from '../../utils/languageAdapter';

/**
 * EnglishMemory - Memory spel: koppel Nederlandse woorden aan Engelse vertalingen.
 * 4 paren (8 kaarten): NL ↔ EN.
 */
function EnglishMemory({ mathSettings, onSuccess, theme }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [wrongPair, setWrongPair] = useState([]);
  const [canFlip, setCanFlip] = useState(true);

  useEffect(() => {
    const pairs = generateEnglishMemoryPairs(mathSettings, 4);
    const cardList = [];

    pairs.forEach((p, i) => {
      // Altijd NL ↔ EN paren voor memory (ongeacht direction)
      cardList.push(
        {
          id: i * 2,
          pairId: i,
          content: p.questionLang === 'nl' ? p.question : p.answer,
          type: 'nl',
        },
        {
          id: i * 2 + 1,
          pairId: i,
          content: p.questionLang === 'en' ? p.question : p.answer,
          type: 'en',
        },
      );
    });

    // Shuffle
    setCards(cardList.sort(() => Math.random() - 0.5));
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
        firstCard.pairId === secondCard.pairId &&
        firstCard.type !== secondCard.type;

      if (isMatch) {
        setMatched((prev) => [...prev, first, second]);
        setFlipped([]);
        setCanFlip(true);

        // Check of alles gevonden is
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
    if (!canFlip || flipped.includes(index) || matched.includes(index)) {
      return;
    }
    setFlipped((prev) => [...prev, index]);
  };

  return (
    <div>
      <p className="text-base sm:text-xl text-gray-600 text-center mb-4 sm:mb-6">
        Zoek de Nederlandse en Engelse vertaling bij elkaar!
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
                  : 'bg-gradient-to-br from-blue-500 to-indigo-500 hover:scale-105'
              } ${!canFlip && 'cursor-not-allowed'}`}
              disabled={!canFlip && !isFlipped}
              aria-label={isFlipped ? card.content : 'Kaart omdraaien'}
            >
              {isFlipped ? (
                <div className="flex flex-col items-center justify-center h-full p-1 sm:p-2 text-center leading-tight">
                  <span className="text-[10px] sm:text-sm md:text-base">{card.content}</span>
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

export default EnglishMemory;
