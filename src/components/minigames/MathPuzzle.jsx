import { useState, useEffect, useRef } from 'react';
import { generateMathProblem } from '../../utils/difficultyAdapter';

function MathPuzzle({ mathSettings, onSuccess, onFailure, theme }) {
  const [problems, setProblems] = useState([]);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const inputRefs = useRef([]);

  useEffect(() => {
    const newProblems = Array(4).fill(null).map(() => generateMathProblem(mathSettings));
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
      <p className="text-xl text-gray-600 text-center mb-6">
        Vul bij elke som het goede antwoord in!
      </p>
      
      <div className="space-y-4">
        {problems.map((problem, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-4 rounded-lg ${
              feedback[index] === 'correct'
                ? 'bg-green-100'
                : feedback[index] === 'wrong'
                ? 'bg-red-100'
                : 'bg-gray-100'
            }`}
          >
            <span className="text-3xl font-bold text-gray-800 flex-1">
              {problem.question} =
            </span>
            <input
              ref={el => inputRefs.current[index] = el}
              type="number"
              className="w-24 text-3xl font-bold text-center rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none px-2 py-1"
              onChange={(e) => handleInputChange(index, e.target.value)}
              value={answers[index] || ''}
            />
            {feedback[index] === 'correct' && (
              <span className="ml-4 text-3xl">✅</span>
            )}
            {feedback[index] === 'wrong' && (
              <span className="ml-4 text-3xl">❌</span>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex flex-col items-center gap-2">
        <button
          onClick={handleCheckAnswers}
          className="px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow"
        >
          Controleer antwoorden
        </button>
        <p className="text-lg text-gray-600">
          Ingevuld: {Object.values(answers).filter(a => a !== '').length} / {problems.length}
        </p>
      </div>
    </div>
  );
}

export default MathPuzzle;
