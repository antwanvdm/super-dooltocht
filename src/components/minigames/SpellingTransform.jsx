import { useState, useEffect } from 'react';
import { generateSpellingProblem, generateWrongTransforms } from '../../utils/languageAdapter';
import SpeakButton from './SpeakButton';

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/**
 * SpellingTransform – "Wat is het meervoud / verkleinwoord van dit woord?"
 * Toont een basiswoord, 4 antwoordopties (1 correct + 3 foute varianten).
 * Alleen beschikbaar als categorie 9 (verkleinwoord) of 10 (meervoud) actief is.
 */
function SpellingTransform({ mathSettings, onSuccess, onFailure, theme }) {
  const [problem, setProblem] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    // Forceer alleen cat 9/10 woorden
    const transformCats = (mathSettings?.spellingCategories || [])
      .map(Number)
      .filter(c => c === 9 || c === 10);
    const settings = {
      ...mathSettings,
      spellingCategories: transformCats.length > 0 ? transformCats : [10],
    };

    const p = generateSpellingProblem(settings);
    const wrongs = generateWrongTransforms(p, 3);
    const allOptions = shuffle([
      { label: p.answer, correct: true },
      ...wrongs.map(w => ({ label: w, correct: false })),
    ]);
    setProblem(p);
    setOptions(allOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (option, index) => {
    if (showFeedback) return;
    setSelected(index);
    setShowFeedback(true);

    if (option.correct) {
      setTimeout(() => onSuccess(), 1200);
    } else {
      setTimeout(() => onFailure(), 1800);
    }
  };

  if (!problem) return null;

  const questionText = problem.subtype === 'verkleinwoord'
    ? 'Wat is het verkleinwoord van dit woord?'
    : 'Wat is het meervoud van dit woord?';

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6 w-full max-w-md mx-auto px-2">
      <div className="text-center">
        <p className="text-sm sm:text-base text-gray-600 mb-2">{questionText}</p>
        <div className="inline-flex items-center gap-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl px-6 sm:px-10 py-4 sm:py-6 border-2 border-indigo-200">
          <p className="text-3xl sm:text-5xl font-bold text-gray-800">{problem.word}</p>
          <SpeakButton text={problem.word} lang="nl-NL" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full">
        {options.map((option, index) => {
          const isSelected = selected === index;
          const isCorrect = option.correct;
          let bg = 'bg-white hover:bg-gray-50 border-2 border-gray-200';
          if (showFeedback && isCorrect) {
            bg = 'bg-green-100 border-2 border-green-500 ring-2 ring-green-300';
          } else if (showFeedback && isSelected && !isCorrect) {
            bg = 'bg-red-100 border-2 border-red-400';
          } else if (isSelected) {
            bg = 'border-2 border-indigo-400 bg-indigo-50';
          }

          return (
            <button
              key={index}
              onClick={() => handleSelect(option, index)}
              disabled={showFeedback}
              className={`p-3 sm:p-4 rounded-xl text-base sm:text-lg font-bold transition-all ${bg} ${
                showFeedback ? 'cursor-default' : 'active:scale-95'
              }`}
            >
              {option.label}
              {showFeedback && isCorrect && ' ✓'}
              {showFeedback && isSelected && !isCorrect && ' ✗'}
            </button>
          );
        })}
      </div>

      {showFeedback && selected !== null && options[selected]?.correct && (
        <p className="text-green-600 font-bold text-sm sm:text-base animate-bounce">
          🎉 Goed gedaan!
        </p>
      )}
      {showFeedback && selected !== null && !options[selected]?.correct && (
        <p className="text-red-500 font-medium text-sm sm:text-base">
          Helaas! Het juiste antwoord was &quot;{problem.answer}&quot;
        </p>
      )}
    </div>
  );
}

export default SpellingTransform;
