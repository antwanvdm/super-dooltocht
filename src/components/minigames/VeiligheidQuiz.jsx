import { useState, useEffect } from 'react';
import { generateVeiligheidQuestion, generateMediawijsheidQuestion } from '../../utils/digitaalData';

function VeiligheidQuiz({ mathSettings, onSuccess, onFailure }) {
  const [problem, setProblem] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const hasVeiligheid = mathSettings?.enabledOperations?.veiligheid ?? true;
    const hasMediawijsheid = mathSettings?.enabledOperations?.mediawijsheid ?? true;

    let q;
    if (hasVeiligheid && hasMediawijsheid) {
      q = Math.random() < 0.5 ? generateVeiligheidQuestion() : generateMediawijsheidQuestion();
    } else if (hasMediawijsheid) {
      q = generateMediawijsheidQuestion();
    } else {
      q = generateVeiligheidQuestion();
    }

    const allOptions = [
      { text: q.correctAnswer, correct: true },
      ...q.wrongAnswers.map(a => ({ text: a, correct: false })),
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
        <p className="text-gray-600 text-sm sm:text-lg mb-2">🔒 Online veiligheid</p>
        <div className="inline-block bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl px-4 sm:px-8 py-4 sm:py-6 border-2 border-amber-200">
          <p className="text-base sm:text-xl font-bold text-gray-800">{problem.question}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 max-w-xl mx-auto">
        {options.map((option, index) => {
          let btnClass = 'bg-white border-2 border-gray-200 text-gray-700 hover:border-amber-400 hover:bg-amber-50';
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
              className={`p-3 sm:p-4 rounded-xl font-medium text-sm sm:text-base transition-all text-left ${btnClass}`}
            >
              {option.text}
            </button>
          );
        })}
      </div>

      {showFeedback && selected !== null && (
        <div className={`mt-4 p-3 rounded-xl text-sm sm:text-base ${
          options[selected]?.correct ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
        }`}>
          {options[selected]?.correct
            ? '🎉 Super! Dat is inderdaad het veiligst.'
            : '💪 Bijna! Probeer nog eens!'}
        </div>
      )}
    </div>
  );
}

export default VeiligheidQuiz;
