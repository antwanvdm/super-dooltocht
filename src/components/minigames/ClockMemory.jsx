import { useState, useEffect } from 'react';
import { generateUniqueClockProblems, formatDigital, formatDigital24, timeToWords, to24h } from '../../utils/clockAdapter';
import AnalogClock from './AnalogClock';

/**
 * ClockMemory - Koppel analoge klokken aan digitale/woordtijden
 * Memory-spel: koppel analoog ↔ digitaal (of woorden)
 */
function ClockMemory({ mathSettings, onSuccess, theme }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [wrongPair, setWrongPair] = useState([]);
  const [canFlip, setCanFlip] = useState(true);

  useEffect(() => {
    // Genereer 4 unieke kloktijden
    const problems = generateUniqueClockProblems(mathSettings, 4);
    const can24h = mathSettings?.clock24h || false;
    const canWords = mathSettings?.clockWords || false;

    const pairs = [];
    problems.forEach((problem, pairIndex) => {
      // Kies per paar een weergavemodus: woorden (alleen als ingeschakeld), 12h, of 24h
      const rand = Math.random();
      const mode = (canWords && rand < 0.3) ? 'words' : (can24h && rand < 0.55) ? '24h' : '12h';

      let textLabel;
      if (mode === 'words') {
        textLabel = timeToWords(problem.hours, problem.minutes);
      } else if (mode === '24h') {
        textLabel = formatDigital24(to24h(problem.hours), problem.minutes);
      } else {
        textLabel = formatDigital(problem.hours, problem.minutes);
      }

      // Analoge kaart
      pairs.push({
        id: pairIndex * 2,
        pairId: pairIndex,
        type: 'analog',
        hours: problem.hours,
        minutes: problem.minutes,
        content: null, // wordt als klok gerenderd
      });

      // Digitale/woorden kaart
      pairs.push({
        id: pairIndex * 2 + 1,
        pairId: pairIndex,
        type: 'text',
        hours: problem.hours,
        minutes: problem.minutes,
        content: textLabel,
      });
    });

    // Shuffle
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
        Koppel de klok aan de juiste tijd!
      </p>

      <div className="grid grid-cols-4 gap-1.5 sm:gap-3">
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(index);
          const isMatched = matched.includes(index);
          const isWrong = wrongPair.includes(index);

          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(index)}
              className={`aspect-square rounded-lg transition-all transform flex items-center justify-center p-0.5 sm:p-1 ${
                isFlipped
                  ? isMatched
                    ? 'bg-green-500 text-white'
                    : isWrong
                      ? 'bg-red-500 text-white'
                      : 'bg-blue-50 text-gray-800'
                  : 'bg-gradient-to-br from-purple-500 to-pink-500 hover:scale-105'
              } ${!canFlip && 'cursor-not-allowed'}`}
              disabled={!canFlip && !isFlipped}
            >
              {isFlipped ? (
                card.type === 'analog' ? (
                  <div className="w-[90%] h-[90%]">
                    <AnalogClock
                      hours={card.hours}
                      minutes={card.minutes}
                      size={80}
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  <span className="text-xs sm:text-base md:text-lg font-bold p-0.5 leading-tight">
                    {card.content}
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

export default ClockMemory;
