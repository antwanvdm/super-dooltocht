import { useState, useEffect } from 'react';
import { generateKalenderQuizQuestion } from '../../utils/timeAwarenessData';

/**
 * KalenderQuiz - Multiple choice quiz over dagen, maanden en seizoenen.
 * Toont een vraag met 4 antwoordopties.
 */
function KalenderQuiz({ mathSettings, onSuccess, onFailure }) {
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const taOptions = {
      dagen: mathSettings?.timeAwarenessDagen ?? true,
      maanden: mathSettings?.timeAwarenessMaanden ?? true,
      seizoenen: mathSettings?.timeAwarenessSeizoen ?? true,
    };
    const q = generateKalenderQuizQuestion(taOptions);

    const allOptions = [
      { label: q.answer, correct: true },
      ...q.wrongAnswers.map(w => ({ label: w, correct: false })),
    ].sort(() => Math.random() - 0.5);

    setQuestion(q);
    setOptions(allOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (option) => {
    if (showFeedback) return;
    setSelected(option.label);
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

  if (!question) return null;

  const categoryEmoji = {
    dagen: '📅',
    maanden: '🗓️',
    seizoenen: '🌿',
  }[question.category] || '📅';

  return (
    <div className="text-center">
      {/* Vraag */}
      <div className="mb-6 sm:mb-8">
        <div className="text-4xl sm:text-5xl mb-3">{categoryEmoji}</div>
        <p className="text-lg sm:text-2xl font-bold text-gray-800 px-2">
          {question.question}
        </p>
      </div>

      {/* Opties */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-lg mx-auto">
        {options.map((option, index) => {
          let btnClass = 'bg-white border-2 border-gray-200 text-gray-800 hover:border-sky-400 hover:bg-sky-50';

          if (showFeedback && selected === option.label) {
            btnClass = option.correct
              ? 'bg-green-100 border-2 border-green-500 text-green-800 scale-105'
              : 'bg-red-100 border-2 border-red-500 text-red-800 scale-95';
          }

          return (
            <button
              key={index}
              onClick={() => handleSelect(option)}
              disabled={showFeedback}
              className={`p-3 sm:p-4 rounded-xl font-bold text-base sm:text-lg transition-all ${btnClass}`}
            >
              {option.label}
              {showFeedback && selected === option.label && (
                <span className="ml-2">{option.correct ? '✅' : '❌'}</span>
              )}
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <div className="mt-4 sm:mt-6 text-lg sm:text-2xl font-bold">
          {options.find(o => o.label === selected)?.correct ? (
            <p className="text-green-600">🎉 Goed zo!</p>
          ) : (
            <p className="text-orange-600">💪 Probeer nog eens!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default KalenderQuiz;
