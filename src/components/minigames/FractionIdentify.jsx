import { useState } from 'react';
import { generateFractionProblem, generateWrongFractions } from '../../utils/difficultyAdapter';
import { FractionBar, FractionText } from './FractionBar';

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const TYPES_BY_LEVEL = {
  easy: ['identify'],
  medium: ['identify', 'simplify'],
  hard: ['identify', 'simplify', 'equivalent'],
};

const initFraction = (level) => {
  const allowed = TYPES_BY_LEVEL[level] || TYPES_BY_LEVEL.hard;
  const forceType = allowed[Math.floor(Math.random() * allowed.length)];
  const p = generateFractionProblem({ level, forceType });
  const wrongs = generateWrongFractions(p.answer, 3);
  const opts = shuffle([
    { fraction: p.answer, correct: true },
    ...wrongs.map(w => ({ fraction: w, correct: false })),
  ]);
  return { problem: p, options: opts };
};

function FractionIdentify({ onSuccess, onFailure, theme, mathSettings }) {
  const [data] = useState(() => initFraction(mathSettings?.fractionLevel || 'easy'));
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const primary = theme?.colors?.primary || '#6366f1';
  const { problem, options } = data;

  const handleSelect = (option) => {
    if (showFeedback) return;
    setSelected(option);
    setShowFeedback(true);

    if (option.correct) {
      setTimeout(() => onSuccess(), 1200);
    } else {
      setTimeout(() => onFailure(), 1800);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6 w-full max-w-md mx-auto px-2">
      {problem.type === 'identify' && (
        <>
          <p className="text-sm sm:text-base text-gray-600 text-center">
            Welke breuk is gekleurd?
          </p>
          <div className="w-full max-w-xs">
            <FractionBar
              numerator={problem.numerator}
              denominator={problem.denominator}
              color={primary}
              size="lg"
            />
          </div>
        </>
      )}

      {problem.type === 'simplify' && (
        <>
          <p className="text-sm sm:text-base text-gray-600 text-center">
            Vereenvoudig deze breuk:
          </p>
          <div className="flex items-center gap-3">
            <FractionText
              numerator={problem.numerator}
              denominator={problem.denominator}
              className="text-2xl sm:text-3xl font-bold"
            />
            <span className="text-xl sm:text-2xl text-gray-400">=</span>
            <span className="text-xl sm:text-2xl text-gray-400">?</span>
          </div>
          <div className="w-full max-w-xs">
            <FractionBar
              numerator={problem.numerator}
              denominator={problem.denominator}
              color={primary}
              size="md"
            />
          </div>
        </>
      )}

      {problem.type === 'equivalent' && (
        <>
          <p className="text-sm sm:text-base text-gray-600 text-center">
            Welke breuk is gelijk aan:
          </p>
          <div className="flex items-center gap-3">
            <FractionText
              numerator={problem.numerator}
              denominator={problem.denominator}
              className="text-2xl sm:text-3xl font-bold"
            />
            <span className="text-xl sm:text-2xl text-gray-400">=</span>
            <span className="text-xl sm:text-2xl text-gray-400">?</span>
          </div>
          <div className="w-full max-w-xs">
            <FractionBar
              numerator={problem.numerator}
              denominator={problem.denominator}
              color={primary}
              size="md"
            />
          </div>
        </>
      )}

      {/* Opties – 4 breuken als tekst */}
      <div className="grid grid-cols-2 gap-3 w-full">
        {options.map((opt, i) => {
          const isSelected = selected === opt;
          const isCorrect = opt.correct;
          let bg = 'bg-white hover:bg-gray-50 border-2 border-gray-200';
          if (showFeedback && isCorrect) bg = 'bg-green-100 border-2 border-green-500 ring-2 ring-green-300';
          else if (showFeedback && isSelected && !isCorrect) bg = 'bg-red-100 border-2 border-red-400';
          else if (isSelected) bg = 'border-2 border-indigo-400 bg-indigo-50';

          return (
            <button
              key={i}
              onClick={() => handleSelect(opt)}
              disabled={showFeedback}
              aria-label={`${opt.fraction.numerator}/${opt.fraction.denominator}`}
              className={`flex items-center justify-center gap-2 p-3 sm:p-4 rounded-xl transition-all ${bg} ${
                showFeedback ? 'cursor-default' : 'active:scale-95'
              }`}
            >
              <FractionText
                numerator={opt.fraction.numerator}
                denominator={opt.fraction.denominator}
                className="text-lg sm:text-xl font-bold"
              />
              {showFeedback && isCorrect && <span className="text-green-600 font-bold">✓</span>}
              {showFeedback && isSelected && !isCorrect && <span className="text-red-500 font-bold">✗</span>}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {showFeedback && selected?.correct && (
        <p className="text-green-600 font-bold text-sm sm:text-base animate-bounce">
          🎉 Goed gedaan!
        </p>
      )}
      {showFeedback && selected && !selected.correct && (
        <p className="text-red-500 font-medium text-sm sm:text-base">
          Helaas! Het juiste antwoord was{' '}
          <FractionText
            numerator={problem.answer.numerator}
            denominator={problem.answer.denominator}
            className="text-sm font-bold inline-flex"
          />
        </p>
      )}
    </div>
  );
}

export default FractionIdentify;
