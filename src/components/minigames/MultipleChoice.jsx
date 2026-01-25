import { useState, useEffect } from 'react';
import { generateMathProblem, generateWrongAnswers } from '../../utils/difficultyAdapter';

function MultipleChoice({ mathSettings, onSuccess, onFailure, theme }) {
  const [problem, setProblem] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const mathProblem = generateMathProblem(mathSettings);
    setProblem(mathProblem);

    const wrongAnswers = generateWrongAnswers(mathProblem.answer, 3);
    const allOptions = [mathProblem.answer, ...wrongAnswers]
      .sort(() => Math.random() - 0.5);
    setOptions(allOptions);
  }, [mathSettings]);

  const handleSelect = (answer) => {
    setSelected(answer);
    setShowFeedback(true);

    if (answer === problem.answer) {
      setTimeout(() => {
        onSuccess();
      }, 1500);
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
      <div className="mb-8">
        <p className="text-gray-600 text-xl mb-2">Klik op het goede antwoord!</p>
        <p className="text-6xl font-bold text-gray-800 mb-6">
          {problem.question}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(option)}
            disabled={showFeedback}
            className={`text-4xl font-bold py-8 px-6 rounded-xl transition-all transform hover:scale-105 ${
              selected === option
                ? option === problem.answer
                  ? 'bg-green-500 text-white scale-110'
                  : 'bg-red-500 text-white shake'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            } disabled:cursor-not-allowed`}
          >
            {option}
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className="mt-6 text-2xl font-bold">
          {selected === problem.answer ? (
            <p className="text-green-600">🎉 Super goed! Je hebt het goed!</p>
          ) : (
            <p className="text-orange-600">💪 Bijna! Probeer nog eens!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default MultipleChoice;
