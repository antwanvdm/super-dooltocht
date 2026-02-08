import { useState, useEffect } from 'react';
import { generateMathProblem, generateWrongAnswers } from '../../utils/difficultyAdapter';

function MultipleChoice({ mathSettings, onSuccess, onFailure, theme }) {
  const [problem, setProblem] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    // Force alleen standard operations voor MultipleChoice
    const standardSettings = {
      ...mathSettings,
      enabledOperations: {
        add: mathSettings?.enabledOperations?.add || false,
        sub: mathSettings?.enabledOperations?.sub || false,
        mul: mathSettings?.enabledOperations?.mul || false,
        // Exclude special types that have different formats
        placeValue: false,
        lovingHearts: false,
        money: false,
      },
    };
    
    // Fallback to add if no standard ops enabled
    if (!standardSettings.enabledOperations.add && 
        !standardSettings.enabledOperations.sub && 
        !standardSettings.enabledOperations.mul) {
      standardSettings.enabledOperations.add = true;
    }
    
    const mathProblem = generateMathProblem(standardSettings);
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
      <div className="mb-4 sm:mb-8">
        <p className="text-gray-600 text-base sm:text-xl mb-2">Klik op het goede antwoord!</p>
        <p className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4 sm:mb-6">
          {problem.question}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(option)}
            disabled={showFeedback}
            className={`text-2xl sm:text-3xl md:text-4xl font-bold py-4 sm:py-6 md:py-8 px-3 sm:px-6 rounded-xl transition-all transform hover:scale-105 ${
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
        <div className="mt-4 sm:mt-6 text-lg sm:text-2xl font-bold">
          {selected === problem.answer ? (
            <p className="text-green-600">🎉 Super! Je hebt het goed!</p>
          ) : (
            <p className="text-orange-600">💪 Bijna! Probeer nog eens!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default MultipleChoice;
