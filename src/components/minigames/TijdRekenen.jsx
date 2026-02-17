import { useState, useEffect, useRef } from 'react';
import { generateTijdRekenenProblems } from '../../utils/timeCalculationData';

/**
 * TijdRekenen - Invuloefening: vul het ontbrekende getal in bij tijdberekeningen.
 * Antwoord is altijd een getal (uren, minuten, dagen of weken).
 */
function TijdRekenen({ mathSettings, onSuccess, onFailure }) {
  const [problems, setProblems] = useState([]);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const inputRefs = useRef([]);

  useEffect(() => {
    const level = mathSettings?.timeCalcLevel || 'wholeHours';
    const use24h = mathSettings?.timeCalc24h || false;
    const newProblems = generateTijdRekenenProblems(level, 4, use24h);
    setProblems(newProblems);
    setAnswers({});
    setFeedback({});
  }, [mathSettings]);

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

    const allFilled = problems.every((_, idx) => answers[idx] !== undefined && answers[idx] !== '');
    if (!allFilled) return;

    const newFeedback = {};
    let allCorrect = true;

    problems.forEach((problem, idx) => {
      const numValue = parseInt(answers[idx], 10);
      const correct = numValue === problem.answer;
      newFeedback[idx] = correct ? 'correct' : 'wrong';
      if (!correct) allCorrect = false;
    });

    setFeedback(newFeedback);

    if (allCorrect) {
      setTimeout(onSuccess, 600);
    } else {
      onFailure();
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
      <p className="text-gray-600 text-sm sm:text-base text-center mb-3 sm:mb-4">
        Vul het ontbrekende getal in!
      </p>

      <div className="space-y-2 sm:space-y-3">
        {problems.map((problem, index) => {
          // Split de vraag op ___ om het invoerveld ertussen te plaatsen
          const parts = problem.question.split('___');

          return (
            <div
              key={index}
              className={`flex items-center p-2 sm:p-3 rounded-lg text-sm sm:text-lg font-bold ${
                feedback[index] === 'correct'
                  ? 'bg-green-100'
                  : feedback[index] === 'wrong'
                  ? 'bg-red-100'
                  : 'bg-gray-100'
              }`}
            >
              <span className="text-gray-800">{parts[0]}</span>
              <input
                ref={el => inputRefs.current[index] = el}
                type="number"
                className="w-14 sm:w-20 text-sm sm:text-lg font-bold text-center rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none px-1 py-0.5 mx-1"
                onChange={(e) => handleInputChange(index, e.target.value)}
                value={answers[index] || ''}
              />
              <span className="text-gray-800">{parts[1] || ''}</span>
              {feedback[index] === 'correct' && <span className="ml-auto text-lg sm:text-2xl">✅</span>}
              {feedback[index] === 'wrong' && <span className="ml-auto text-lg sm:text-2xl">❌</span>}
            </div>
          );
        })}
      </div>

      <div className="mt-3 sm:mt-4 flex flex-col items-center gap-2">
        <button
          onClick={handleCheckAnswers}
          disabled={!problems.every((_, idx) => answers[idx] !== undefined && answers[idx] !== '')}
          className="px-4 py-2 sm:px-5 sm:py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white text-sm sm:text-base font-bold rounded-lg shadow transition-colors"
        >
          Controleer antwoorden
        </button>
        <p className="text-sm text-gray-500">
          Ingevuld: {Object.values(answers).filter(a => a !== '').length} / {problems.length}
        </p>
      </div>
    </div>
  );
}

export default TijdRekenen;
