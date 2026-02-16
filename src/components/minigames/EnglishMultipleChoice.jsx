import { useState, useEffect } from 'react';
import { generateEnglishMultipleChoice } from '../../utils/languageAdapter';

/**
 * EnglishMultipleChoice - Vertaal het woord, kies uit 4 opties.
 * Richting (NL→EN of EN→NL) wordt bepaald door mathSettings.englishDirection.
 * Toont NIET het goede antwoord bij een fout.
 */
function EnglishMultipleChoice({ mathSettings, onSuccess, onFailure }) {
  const [problem, setProblem] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const p = generateEnglishMultipleChoice(mathSettings);
    const allOptions = [
      { text: p.answer, correct: true },
      ...p.wrongAnswers.map((w) => ({ text: w, correct: false })),
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

  const directionLabel =
    problem.questionLang === 'nl'
      ? 'Wat is dit in het Engels?'
      : 'Wat is dit in het Nederlands?';

  return (
    <div className="text-center">
      {/* Het woord */}
      <div className="mb-4 sm:mb-6">
        <p className="text-gray-600 text-sm sm:text-lg mb-2">{directionLabel}</p>
        <div className="inline-block bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl px-6 sm:px-10 py-4 sm:py-6 border-2 border-blue-200">
          <p className="text-3xl sm:text-5xl font-bold text-gray-800">{problem.question}</p>
        </div>
      </div>

      {/* Opties */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-lg mx-auto">
        {options.map((option, index) => {
          let btnClass =
            'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-400 hover:bg-blue-50';
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
              className={`p-3 sm:p-4 rounded-xl font-medium text-base sm:text-lg transition-all ${btnClass}`}
            >
              {option.text}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {showFeedback && selected !== null && (
        <div
          className={`mt-4 p-3 rounded-xl text-sm sm:text-base ${
            options[selected]?.correct
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {options[selected]?.correct ? '✅ Great job!' : '❌ Dat klopt niet, probeer het opnieuw!'}
        </div>
      )}
    </div>
  );
}

export default EnglishMultipleChoice;
