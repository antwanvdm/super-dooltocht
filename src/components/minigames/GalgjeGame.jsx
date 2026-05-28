import { useState, useEffect, useCallback } from 'react';
import { GENERAL_VOCABULARY } from '../../utils/languageData/vocabularyData';

const MAX_WRONG = 7;

// Volgorde van verdwijnen per wrong-guess-teller
const PART_HIDDEN_AT = {
  antenna: 1,
  rightArm: 2,
  leftArm: 3,
  rightLeg: 4,
  leftLeg: 5,
  // wrongCount=6 → hoofd beschadigd (rook), wrongCount=7 → explosie
};

function RobotSVG({ wrongCount }) {
  const hidden = (part) => wrongCount >= PART_HIDDEN_AT[part];
  const exploded = wrongCount >= MAX_WRONG;
  const headDamaged = wrongCount === 6;

  if (exploded) {
    return (
      <div className="flex flex-col items-center justify-center h-44">
        <span className="text-7xl animate-bounce">💥</span>
        <span className="text-sm text-orange-600 font-bold mt-2">BOOM!</span>
      </div>
    );
  }

  return (
    <svg viewBox="0 0 120 180" className="w-28 h-36 sm:w-32 sm:h-44 mx-auto" aria-hidden="true">
      {/* Antenne */}
      {!hidden('antenna') && (
        <g>
          <line x1="60" y1="23" x2="60" y2="7" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
          <circle cx="60" cy="4" r="4.5" fill="#ef4444" />
        </g>
      )}

      {/* Hoofd */}
      <g opacity={headDamaged ? 0.7 : 1}>
        <rect x="27" y="22" width="66" height="50" rx="12" fill="#93c5fd" stroke="#3b82f6" strokeWidth="2.5" />
        {/* Ogen */}
        <circle cx="44" cy="41" r="8" fill="white" />
        <circle cx="76" cy="41" r="8" fill="white" />
        <circle cx={headDamaged ? 43 : 45} cy="42" r="4.5" fill="#1e3a5f" />
        <circle cx={headDamaged ? 75 : 77} cy="42" r="4.5" fill="#1e3a5f" />
        {/* Mond — blij of bezorgd */}
        {headDamaged ? (
          <path d="M42 62 Q60 56 78 62" stroke="#1d4ed8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        ) : (
          <path d="M42 60 Q60 68 78 60" stroke="#1d4ed8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        )}
      </g>

      {/* Rook bij beschadigd hoofd */}
      {headDamaged && (
        <g>
          <circle cx="38" cy="19" r="4" fill="#d1d5db" opacity="0.9" />
          <circle cx="54" cy="13" r="5" fill="#d1d5db" opacity="0.8" />
          <circle cx="72" cy="10" r="6" fill="#9ca3af" opacity="0.7" />
        </g>
      )}

      {/* Romp */}
      <rect x="21" y="75" width="78" height="54" rx="10" fill="#60a5fa" stroke="#3b82f6" strokeWidth="2.5" />
      {/* Romp-knoppen */}
      <circle cx="46" cy="95" r="5.5" fill="#1d4ed8" />
      <circle cx="74" cy="95" r="5.5" fill="#1d4ed8" />
      <rect x="41" y="110" width="38" height="9" rx="4.5" fill="#1d4ed8" />

      {/* Rechterarm */}
      {!hidden('rightArm') && (
        <rect x="99" y="77" width="18" height="15" rx="6" fill="#93c5fd" stroke="#3b82f6" strokeWidth="2" />
      )}

      {/* Linkerarm */}
      {!hidden('leftArm') && (
        <rect x="3" y="77" width="18" height="15" rx="6" fill="#93c5fd" stroke="#3b82f6" strokeWidth="2" />
      )}

      {/* Rechterbeen */}
      {!hidden('rightLeg') && (
        <rect x="65" y="129" width="19" height="46" rx="7" fill="#93c5fd" stroke="#3b82f6" strokeWidth="2" />
      )}

      {/* Linkerbeen */}
      {!hidden('leftLeg') && (
        <rect x="36" y="129" width="19" height="46" rx="7" fill="#93c5fd" stroke="#3b82f6" strokeWidth="2" />
      )}
    </svg>
  );
}

export default function GalgjeGame({ mathSettings, onSuccess, onFailure, theme }) {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [guessed, setGuessed] = useState(new Set());
  const [wrongCount, setWrongCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const pickNewWord = () => {
    const entry = GENERAL_VOCABULARY[Math.floor(Math.random() * GENERAL_VOCABULARY.length)];
    setWord(entry.word.toUpperCase());
    setDefinition(entry.definition);
    setGuessed(new Set());
    setWrongCount(0);
    setGameOver(false);
    setWon(false);
  };

  useEffect(() => {
    pickNewWord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGuess = useCallback((letter) => {
    if (gameOver || won || guessed.has(letter) || !word) return;

    const newGuessed = new Set(guessed);
    newGuessed.add(letter);
    setGuessed(newGuessed);

    const isCorrect = word.includes(letter);
    if (!isCorrect) {
      const newWrong = wrongCount + 1;
      setWrongCount(newWrong);
      if (newWrong >= MAX_WRONG) {
        setGameOver(true);
        onFailure();
        setTimeout(() => pickNewWord(), 2000);
      }
    } else {
      const allGuessed = word.split('').every(l => newGuessed.has(l));
      if (allGuessed) {
        setWon(true);
        setTimeout(() => onSuccess(), 1000);
      }
    }
  }, [word, guessed, wrongCount, gameOver, won, onSuccess, onFailure]); // eslint-disable-line react-hooks/exhaustive-deps

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="flex flex-col items-center gap-3 px-2 py-1">

      {/* Robot + foutenteller */}
      <div className="flex flex-col items-center">
        <RobotSVG wrongCount={wrongCount} />
        <div className="flex gap-1 mt-1">
          {Array.from({ length: MAX_WRONG }).map((_, i) => (
            <div
              key={i}
              className={`w-4 h-2 rounded-full transition-colors ${
                i < wrongCount ? 'bg-orange-400' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Aanwijzing */}
      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl px-4 py-2 text-center w-full max-w-sm">
        <p className="text-xs font-semibold text-yellow-700 mb-0.5">💡 Welk woord is dit?</p>
        <p className="text-sm text-gray-700 leading-snug">{definition}</p>
      </div>

      {/* Woordweergave */}
      <div className="flex gap-1.5 flex-wrap justify-center min-h-[2.5rem]">
        {word.split('').map((letter, i) => (
          <div key={i} className="flex flex-col items-center w-7">
            <span className="text-lg font-bold text-center h-7 leading-7 text-gray-800">
              {guessed.has(letter) ? letter : '\u00A0'}
            </span>
            <div className="w-full h-0.5 bg-gray-400 rounded" />
          </div>
        ))}
      </div>

      {/* Feedback */}
      {won && (
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-xl font-semibold text-sm text-center">
          🎉 Super! Je hebt het goed!
        </div>
      )}
      {gameOver && (
        <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-xl font-semibold text-sm text-center">
          💪 Bijna! Probeer nog eens!
        </div>
      )}

      {/* Lettertoetsenbord */}
      {!won && !gameOver && (
        <div className="flex flex-wrap justify-center gap-1 max-w-[18rem]">
          {alphabet.map(letter => {
            const used = guessed.has(letter);
            const correct = used && word.includes(letter);
            const wrong = used && !word.includes(letter);
            return (
              <button
                key={letter}
                onClick={() => handleGuess(letter)}
                disabled={used}
                aria-label={`Letter ${letter}`}
                className={`w-9 h-9 rounded-lg text-sm font-bold transition-all select-none ${
                  correct
                    ? 'bg-green-200 text-green-700 cursor-not-allowed'
                    : wrong
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600 active:scale-95 cursor-pointer'
                }`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
