import { useState, useEffect } from 'react';
import { generateReadingProblem } from '../../utils/languageAdapter';

/**
 * ReadingComprehension - Tekst lezen + vraag beantwoorden.
 * Multiple choice met 4 opties.
 */
function ReadingComprehension({ mathSettings, onSuccess, onFailure }) {
  const [problem, setProblem] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const p = generateReadingProblem(mathSettings);
    const allOptions = [
      { text: p.answer, correct: true },
      ...p.wrongAnswers.map(a => ({ text: a, correct: false })),
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
    <div>
      {/* De tekst */}
      <div className="mb-4 sm:mb-6">
        <p className="text-gray-500 text-xs sm:text-sm mb-2 flex items-center gap-1">
          📖 Lees de tekst:
        </p>
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-4 sm:p-6 border-2 border-amber-200">
          <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed">
            {problem.text}
          </p>
        </div>
      </div>

      {/* De vraag */}
      <div className="mb-4 sm:mb-5">
        <div className="bg-blue-50 rounded-xl p-3 sm:p-4 border border-blue-200">
          <p className="text-base sm:text-lg font-bold text-blue-800 flex items-center gap-2">
            <span className="text-xl">❓</span> {problem.question}
          </p>
        </div>
      </div>

      {/* Antwoord opties */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        {options.map((option, index) => {
          let btnClass = 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-400 hover:bg-blue-50';
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
              className={`p-3 sm:p-4 rounded-xl font-semibold text-sm sm:text-base transition-all text-left ${btnClass}`}
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

export default ReadingComprehension;
