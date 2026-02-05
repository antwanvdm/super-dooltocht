import { useState, useEffect } from 'react';
import { generateMathProblem } from '../../utils/difficultyAdapter';

function PlaceValueGame({ mathSettings, onSuccess, onFailure, theme }) {
  const [problem, setProblem] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    // Genereer een placeValue probleem
    const placeValueSettings = {
      ...mathSettings,
      enabledOperations: { placeValue: true },
    };
    const mathProblem = generateMathProblem(placeValueSettings);
    setProblem(mathProblem);

    // Gebruik de plaatswaarden als opties (bijv. 44 -> [4, 40])
    const allOptions = [...mathProblem.allPlaceValues].sort(() => Math.random() - 0.5);
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

  // Bepaal grid layout op basis van aantal opties
  const gridCols = options.length <= 2 ? 'grid-cols-2' : options.length === 3 ? 'grid-cols-3' : 'grid-cols-2';

  return (
    <div className="text-center">
      <div className="mb-4 sm:mb-8">
        <p className="text-gray-600 text-base sm:text-xl mb-2 sm:mb-4">
          Wat is het <span className="font-bold text-purple-600">{problem.positionName}</span> van dit getal?
        </p>
        <div className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-800 mb-4 sm:mb-6 tracking-wider">
          {problem.number.toString().split('').map((digit, index) => (
            <span 
              key={index} 
              className="inline-block mx-0.5 sm:mx-1 bg-gradient-to-b from-blue-100 to-blue-200 px-2 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl shadow-md text-2xl sm:text-4xl md:text-6xl"
            >
              {digit}
            </span>
          ))}
        </div>
      </div>

      <div className={`grid ${gridCols} gap-2 sm:gap-4 max-w-lg mx-auto`}>
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(option)}
            disabled={showFeedback}
            className={`text-2xl sm:text-3xl md:text-4xl font-bold py-4 sm:py-6 px-3 sm:px-6 rounded-xl transition-all transform hover:scale-105 ${
              selected === option
                ? option === problem.answer
                  ? 'bg-green-500 text-white scale-110'
                  : 'bg-red-500 text-white'
                : 'bg-purple-500 text-white hover:bg-purple-600'
            } disabled:cursor-not-allowed`}
          >
            {option}
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className="mt-4 sm:mt-6 text-lg sm:text-2xl font-bold">
          {selected === problem.answer ? (
            <p className="text-green-600">🎉 Helemaal goed! {problem.positionName === 'eenheid' ? 'De' : 'Het'} {problem.positionName} is {problem.answer}!</p>
          ) : (
            <p className="text-orange-600">💪 Bijna! Kijk nog eens goed naar het getal!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default PlaceValueGame;
