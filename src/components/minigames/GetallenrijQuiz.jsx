import { useState, useEffect } from 'react';
import { generateGetallenrijQuestion } from '../../utils/getallenrijData';

function GetallenrijQuiz({ mathSettings, onSuccess, onFailure }) {
  const [problem, setProblem] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const level = mathSettings?.getallenrijLevel || 'easy';
    const q = generateGetallenrijQuestion(level);
    const allOptions = [
      { value: q.correctAnswer, correct: true },
      ...q.wrongAnswers.map((w) => ({ value: w, correct: false })),
    ].sort(() => Math.random() - 0.5);
    setProblem(q);
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
      <div className="mb-4 sm:mb-6">
        <p className="text-gray-600 text-sm sm:text-base mb-3">Getallenrij</p>

        {/* Sequence display */}
        <div className="flex items-center justify-center flex-wrap gap-1 sm:gap-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl px-3 sm:px-8 py-4 sm:py-6 border-2 border-blue-100">
          {problem.sequence.map((n, i) => (
            <div key={i} className="flex items-center gap-1 sm:gap-2">
              {i > 0 && (
                <span className="text-gray-400 text-base sm:text-xl font-bold">,</span>
              )}
              <div
                className={`w-11 h-11 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center font-bold text-base sm:text-2xl shadow-sm ${
                  n === null
                    ? 'bg-yellow-300 text-yellow-900 border-2 border-yellow-500 animate-pulse'
                    : 'bg-white text-gray-800 border-2 border-blue-200'
                }`}
              >
                {n === null ? '?' : n}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-base sm:text-xl font-bold text-gray-800">
          {problem.question}
        </p>
      </div>

      {/* 4-button answer grid */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-xs sm:max-w-sm mx-auto">
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
              className={`p-3 sm:p-4 rounded-xl font-bold text-xl sm:text-2xl transition-all ${btnClass}`}
              aria-label={`Antwoord: ${option.value}`}
            >
              {option.value}
            </button>
          );
        })}
      </div>

      {showFeedback && selected !== null && (
        <div
          className={`mt-4 p-3 rounded-xl text-sm sm:text-base ${
            options[selected]?.correct
              ? 'bg-green-100 text-green-800'
              : 'bg-orange-100 text-orange-800'
          }`}
        >
          {options[selected]?.correct ? '🎉 Goed zo!' : '💪 Bijna! Probeer nog eens!'}
        </div>
      )}
    </div>
  );
}

export default GetallenrijQuiz;
