import { useState, useEffect } from 'react';
import { generateMathProblem } from '../../utils/difficultyAdapter';

function MemoryGame({ mathSettings, onSuccess, theme }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [wrongPair, setWrongPair] = useState([]); // Voor rode feedback
  const [canFlip, setCanFlip] = useState(true);

  useEffect(() => {
    // Force alleen standard operations voor MemoryGame
    const standardSettings = {
      ...mathSettings,
      enabledOperations: {
        add: mathSettings?.enabledOperations?.add || false,
        sub: mathSettings?.enabledOperations?.sub || false,
        mul: mathSettings?.enabledOperations?.mul || false,
        placeValue: false,
        lovingHearts: false,
        money: false,
      },
    };
    
    // Fallback to add if no standard ops enabled
    if (!standardSettings.enabledOperations.add && 
        !standardSettings.enabledOperations.sub && 
        !standardSettings.enabledOperations.mul) {
      standardSettings.enabledOperations.add = true;
    }
    
    // Genereer 4 paren (8 kaarten totaal) met unieke antwoorden
    const pairs = [];
    const usedAnswers = new Set();
    const usedQuestions = new Set(); // Ook bijhouden welke vragen we al hebben
    let attempts = 0;
    const maxAttempts = 200; // Verhoogd voor meer kans op unieke antwoorden
    const targetPairs = 4; // We willen 4 paren
    
    while (pairs.length < targetPairs * 2 && attempts < maxAttempts) {
      attempts++;
      const problem = generateMathProblem(standardSettings);
      
      // Skip als dit antwoord OF deze vraag al gebruikt is
      if (usedAnswers.has(problem.answer) || usedQuestions.has(problem.question)) {
        continue;
      }
      
      usedAnswers.add(problem.answer);
      usedQuestions.add(problem.question);
      const pairIndex = pairs.length / 2;
      
      pairs.push(
        {
          id: pairIndex * 2,
          pairId: pairIndex,
          content: problem.question,
          answer: problem.answer,
          type: 'question',
        },
        {
          id: pairIndex * 2 + 1,
          pairId: pairIndex,
          content: problem.answer,
          answer: problem.answer,
          type: 'answer',
        }
      );
    }
    
    // Als we minder dan 4 paren hebben (minimum 2 nodig voor een spel),
    // probeer duplicaat-antwoorden toe te staan met unieke vragen
    if (pairs.length < 4 && pairs.length >= 2) {
      // Minimaal 2 paren is nog speelbaar
      console.warn(`Memory game: Kon slechts ${pairs.length / 2} unieke paren genereren`);
    } else if (pairs.length < 4) {
      // Noodoplossing: genereer paren zonder uniekheidscontrole
      while (pairs.length < 4) {
        const problem = generateMathProblem(mathSettings);
        const pairIndex = pairs.length / 2;
        pairs.push(
          {
            id: pairIndex * 2,
            pairId: pairIndex,
            content: problem.question,
            answer: problem.answer,
            type: 'question',
          },
          {
            id: pairIndex * 2 + 1,
            pairId: pairIndex,
            content: problem.answer,
            answer: problem.answer,
            type: 'answer',
          }
        );
      }
    }
    
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
        // Match!
        setMatched([...matched, first, second]);
        setFlipped([]);
        setCanFlip(true);
        
        // Check of alles gevonden is (4 paren = 8 kaarten)
        if (matched.length + 2 === cards.length) {
          setTimeout(() => {
            onSuccess();
          }, 1000);
        }
      } else {
        // Geen match - toon rood en laat langer zien
        setWrongPair([first, second]);
        setTimeout(() => {
          setFlipped([]);
          setWrongPair([]);
          setCanFlip(true);
        }, 1500); // Langer in beeld (1.5 sec)
      }
    }
  }, [flipped, cards, matched, onSuccess]);

  const handleCardClick = (index) => {
    if (!canFlip || flipped.includes(index) || matched.includes(index)) {
      return;
    }
    
    setFlipped([...flipped, index]);
  };

  return (
    <div>
      <p className="text-base sm:text-xl text-gray-600 text-center mb-4 sm:mb-6">
        Zoek de som bij het goede antwoord!
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
              className={`aspect-square rounded-lg text-base sm:text-lg md:text-2xl font-bold transition-all transform ${
                isFlipped
                  ? isMatched
                    ? 'bg-green-500 text-white'
                    : isWrong
                    ? 'bg-red-500 text-white'
                    : 'bg-blue-500 text-white'
                  : 'bg-gradient-to-br from-purple-500 to-pink-500 hover:scale-105'
              } ${!canFlip && 'cursor-not-allowed'}`}
              disabled={!canFlip && !isFlipped}
            >
              {isFlipped ? (
                <div className="flex items-center justify-center h-full p-0.5 sm:p-1">
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

export default MemoryGame;
