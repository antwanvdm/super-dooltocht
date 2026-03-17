import { useState } from 'react';
import { generateFractionProblem } from '../../utils/difficultyAdapter';
import { FractionBar, FractionText } from './FractionBar';

function FractionCompare({ onSuccess, onFailure, theme, mathSettings }) {
  const [data] = useState(() => {
    const level = mathSettings?.fractionLevel || 'easy';
    const p = generateFractionProblem({ level, forceType: 'compare' });
    const options = [
      { key: 'left', fraction: p.left, correct: p.answer === 'left' },
      { key: 'right', fraction: p.right, correct: p.answer === 'right' },
    ];
    return { problem: p, options };
  });
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const primary = theme?.colors?.primary || '#6366f1';
  const { problem, options } = data;

  const COMPARE_COLORS = ['#6366f1', '#e11d48'];

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
      <p className="text-sm sm:text-base text-gray-600 text-center">
        Welke breuk is groter? Tik op de grootste.
      </p>

      <div className="grid grid-cols-2 gap-4 w-full">
        {options.map((opt, i) => {
          const isSelected = selected === opt;
          const isCorrect = opt.correct;
          let ring = 'border-2 border-gray-200';
          if (showFeedback && isCorrect) ring = 'border-2 border-green-500 ring-2 ring-green-300';
          else if (showFeedback && isSelected && !isCorrect) ring = 'border-2 border-red-400';
          else if (isSelected) ring = 'border-2 border-indigo-400';

          return (
            <button
              key={opt.key}
              onClick={() => handleSelect(opt)}
              disabled={showFeedback}
              aria-label={`${opt.fraction.numerator}/${opt.fraction.denominator}`}
              className={`flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl bg-white transition-all ${ring} ${
                showFeedback ? 'cursor-default' : 'active:scale-95 hover:bg-gray-50'
              }`}
            >
              <FractionText
                numerator={opt.fraction.numerator}
                denominator={opt.fraction.denominator}
                className="text-xl sm:text-2xl font-bold"
              />
              <FractionBar
                numerator={opt.fraction.numerator}
                denominator={opt.fraction.denominator}
                color={isSelected || (showFeedback && isCorrect) ? primary : COMPARE_COLORS[i]}
                size="sm"
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
            numerator={problem.answerFraction.numerator}
            denominator={problem.answerFraction.denominator}
            className="text-sm font-bold inline-flex"
          />
        </p>
      )}
    </div>
  );
}

export default FractionCompare;
