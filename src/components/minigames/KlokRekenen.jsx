import { useState, useEffect } from 'react';
import { generateKlokRekenenQuestion } from '../../utils/timeCalculationData';
import AnalogClock from './AnalogClock';

/**
 * KlokRekenen - Analoge klok + tijd optellen/aftrekken (MC).
 * Toont een analoge klok met de starttijd en vraagt:
 * "Hoe laat is het over X minuten?" of "Hoe laat was het X minuten geleden?"
 * met 4 multiple choice antwoorden.
 */
function KlokRekenen({ mathSettings, onSuccess, onFailure }) {
  const [problem, setProblem] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const level = mathSettings?.timeCalcLevel || 'wholeHours';
    const use24h = mathSettings?.timeCalc24h || false;
    const q = generateKlokRekenenQuestion(level, use24h);
    setProblem(q);

    const allOptions = [q.answer, ...q.wrongAnswers]
      .sort(() => Math.random() - 0.5);
    setOptions(allOptions);
  }, [mathSettings]);

  const handleSelect = (answer) => {
    setSelected(answer);
    setShowFeedback(true);

    if (answer === problem.answer) {
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

  const questionText = problem.isForward
    ? `Hoe laat is het over ${problem.durationText}?`
    : `Hoe laat was het ${problem.durationText} geleden?`;

  return (
    <div className="text-center">
      <div className="flex justify-center mb-3 sm:mb-4">
        <AnalogClock
          hours={problem.startH}
          minutes={problem.startM}
          size={160}
          className="drop-shadow-lg sm:w-[200px] sm:h-[200px]"
        />
      </div>

      <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 font-medium">
        {questionText}
      </p>

      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(option)}
            disabled={showFeedback}
            className={`text-base sm:text-xl font-bold py-3 sm:py-5 px-2 sm:px-4 rounded-xl transition-all transform hover:scale-105 ${
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
        <div className="mt-3 sm:mt-4 text-base sm:text-xl font-bold">
          {selected === problem.answer ? (
            <p className="text-green-600">🎉 Goed zo!</p>
          ) : (
            <p className="text-orange-600">💪 Probeer nog eens!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default KlokRekenen;
