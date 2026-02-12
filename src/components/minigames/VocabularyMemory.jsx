import { useState, useEffect } from 'react';
import { generateUniqueVocabularyProblems } from '../../utils/languageAdapter';

/**
 * VocabularyMemory - Memory spel: koppel woorden aan hun betekenis.
 * 4 paren (8 kaarten): woord ↔ definitie.
 */
function VocabularyMemory({ mathSettings, onSuccess, theme }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [wrongPair, setWrongPair] = useState([]);
  const [canFlip, setCanFlip] = useState(true);

  useEffect(() => {
    const problems = generateUniqueVocabularyProblems(mathSettings, 4);
    const pairs = [];

    problems.forEach((p, i) => {
      pairs.push(
        {
          id: i * 2,
          pairId: i,
          content: p.word,
          type: 'question',
        },
        {
          id: i * 2 + 1,
          pairId: i,
          content: p.definition,
          type: 'answer',
        }
      );
    });

    // Shuffle
    setCards(pairs.sort(() => Math.random() - 0.5));
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
          setTimeout(() => {
            onSuccess();
          }, 1000);
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
        Zoek het woord bij de juiste betekenis!
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
                    : 'bg-teal-500 text-white'
                  : 'bg-gradient-to-br from-emerald-500 to-teal-500 hover:scale-105'
              } ${!canFlip && 'cursor-not-allowed'}`}
              disabled={!canFlip && !isFlipped}
              aria-label={isFlipped ? card.content : 'Kaart omdraaien'}
            >
              {isFlipped ? (
                <div className="flex items-center justify-center h-full p-1 sm:p-2 text-center leading-tight text-[10px] sm:text-sm md:text-base">
                  {card.content}
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

export default VocabularyMemory;
