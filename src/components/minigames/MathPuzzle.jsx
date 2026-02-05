import { useState, useEffect, useRef } from 'react';
import { generateMathProblem } from '../../utils/difficultyAdapter';

function MathPuzzle({ mathSettings, onSuccess, onFailure, theme }) {
  const [problems, setProblems] = useState([]);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const inputRefs = useRef([]);

  useEffect(() => {
    // Force alleen standard operations voor MathPuzzle
    const standardSettings = {
      ...mathSettings,
      enabledOperations: {
        add: mathSettings?.enabledOperations?.add || false,
        sub: mathSettings?.enabledOperations?.sub || false,
        mul: mathSettings?.enabledOperations?.mul || false,
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
    
    const newProblems = Array(4).fill(null).map(() => generateMathProblem(standardSettings));
    setProblems(newProblems);
    setAnswers({});
    setFeedback({});
  }, [mathSettings]);

  // Autofocus eerste input
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [problems]);

  const handleInputChange = (index, value) => {
    setAnswers(prev => ({ ...prev, [index]: value }));
    setFeedback(prev => ({ ...prev, [index]: null }));
  };

  const handleCheckAnswers = () => {
    if (!problems.length) return;

    // Check of alle velden zijn ingevuld
    const allFilled = problems.every((_, idx) => answers[idx] !== undefined && answers[idx] !== '');
    if (!allFilled) {
      alert('Vul alstublieft alle antwoorden in!');
      return;
    }

    const newFeedback = {};
    let allCorrect = true;

    problems.forEach((problem, idx) => {
      const given = answers[idx];
      const numValue = given !== undefined && given !== '' ? parseInt(given, 10) : NaN;
      const correct = numValue === problem.answer;
      newFeedback[idx] = correct ? 'correct' : 'wrong';
      
      if (!correct) {
        allCorrect = false;
      }
    });

    setFeedback(newFeedback);

    if (allCorrect) {
      setTimeout(onSuccess, 600);
    } else {
      onFailure();
      // Focus op eerste foute veld
      setTimeout(() => {
        const firstWrongIndex = problems.findIndex((_, idx) => newFeedback[idx] === 'wrong');
        if (firstWrongIndex >= 0 && inputRefs.current[firstWrongIndex]) {
          inputRefs.current[firstWrongIndex].focus();
        }
      }, 100);
    }
  };

  return (
    <div>
      <p className="text-base sm:text-xl text-gray-600 text-center mb-4 sm:mb-6">
        Vul bij elke som het goede antwoord in!
      </p>
      
      <div className="space-y-2 sm:space-y-4">
        {problems.map((problem, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-2 sm:p-4 rounded-lg ${
              feedback[index] === 'correct'
                ? 'bg-green-100'
                : feedback[index] === 'wrong'
                ? 'bg-red-100'
                : 'bg-gray-100'
            }`}
          >
            <span className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-800 flex-1">
              {problem.question} =
            </span>
            <input
              ref={el => inputRefs.current[index] = el}
              type="number"
              className="w-16 sm:w-24 text-lg sm:text-2xl md:text-3xl font-bold text-center rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none px-1 sm:px-2 py-1"
              onChange={(e) => handleInputChange(index, e.target.value)}
              value={answers[index] || ''}
            />
            {feedback[index] === 'correct' && (
              <span className="ml-2 sm:ml-4 text-xl sm:text-3xl">✅</span>
            )}
            {feedback[index] === 'wrong' && (
              <span className="ml-2 sm:ml-4 text-xl sm:text-3xl">❌</span>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-4 sm:mt-6 flex flex-col items-center gap-2">
        <button
          onClick={handleCheckAnswers}
          className="px-4 sm:px-5 py-2 sm:py-3 bg-blue-500 hover:bg-blue-600 text-white text-base sm:text-lg font-bold rounded-lg shadow"
        >
          Controleer antwoorden
        </button>
        <p className="text-base sm:text-lg text-gray-600">
          Ingevuld: {Object.values(answers).filter(a => a !== '').length} / {problems.length}
        </p>
      </div>
    </div>
  );
}

export default MathPuzzle;
