import { useState, useEffect } from 'react';
import { generateVocabularyProblem } from '../../utils/languageAdapter';

/**
 * VocabularyMatch - Woord getoond, kies de juiste betekenis uit 4 opties.
 */
function VocabularyMatch({ mathSettings, onSuccess, onFailure }) {
  const [problem, setProblem] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const p = generateVocabularyProblem(mathSettings);
    const allOptions = [
      { text: p.definition, correct: true },
      ...p.wrongDefinitions.map(d => ({ text: d, correct: false })),
    ].sort(() => Math.random() - 0.5);
    setProblem(p);
    setOptions(allOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (option, index) => {
    if (showFeedback) return;
    setSelected(index);
    setShowFeedback(true);

    if (option.correct) {
      setTimeout(() => onSuccess(), 1500);
    } else {
      onFailure();
      setTimeout(() => {
        setShowFeedback(false);
        setSelected(null);
      }, 2000);
    }
  };

  if (!problem) return null;

  return (
    <div className="text-center">
      {/* Het woord */}
      <div className="mb-4 sm:mb-6">
        <p className="text-gray-600 text-sm sm:text-lg mb-2">Wat betekent dit woord?</p>
        <div className="inline-block bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl px-6 sm:px-10 py-4 sm:py-6 border-2 border-emerald-200">
          <p className="text-3xl sm:text-5xl font-bold text-gray-800">{problem.word}</p>
        </div>
      </div>

      {/* Opties */}
      <div className="space-y-2 sm:space-y-3 max-w-lg mx-auto">
        {options.map((option, index) => {
          let btnClass = 'bg-white border-2 border-gray-200 text-gray-700 hover:border-teal-400 hover:bg-teal-50';
          if (showFeedback && selected === index) {
            btnClass = option.correct
              ? 'bg-green-500 text-white border-2 border-green-600 scale-[1.02]'
              : 'bg-red-500 text-white border-2 border-red-600';
          }

          return (
            <button
              key={index}
              onClick={() => handleSelect(option, index)}
              disabled={showFeedback}
              className={`w-full p-3 sm:p-4 rounded-xl font-medium text-sm sm:text-base transition-all text-left ${btnClass}`}
            >
              {option.text}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {showFeedback && selected !== null && (
        <div className={`mt-4 p-3 rounded-xl text-sm sm:text-base ${
          options[selected]?.correct
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {options[selected]?.correct
            ? '✅ Super goed!'
            : '❌ Jammer, probeer het opnieuw!'
          }
        </div>
      )}
    </div>
  );
}

export default VocabularyMatch;
