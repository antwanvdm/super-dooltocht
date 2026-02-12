import { useState, useEffect } from 'react';
import { generateReadingTrueFalseProblem } from '../../utils/languageAdapter';

/**
 * ReadingTrueFalse - Lees een tekst en beoordeel 3 stellingen als waar of niet waar.
 * Alle 3 correct = succes.
 */
function ReadingTrueFalse({ mathSettings, onSuccess, onFailure }) {
  const [problem, setProblem] = useState(null);
  const [answers, setAnswers] = useState({}); // { 0: true/false, 1: true/false, 2: true/false }
  const [showFeedback, setShowFeedback] = useState(false);
  const [results, setResults] = useState(null); // { 0: correct/wrong, ... }

  useEffect(() => {
    const p = generateReadingTrueFalseProblem(mathSettings);
    setProblem(p);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAnswer = (statementIndex, answer) => {
    if (showFeedback) return;
    setAnswers((prev) => ({ ...prev, [statementIndex]: answer }));
  };

  const handleCheck = () => {
    if (!problem || Object.keys(answers).length < problem.statements.length) return;

    const res = {};
    let allCorrect = true;

    problem.statements.forEach((s, i) => {
      const correct = answers[i] === s.isTrue;
      res[i] = correct;
      if (!correct) allCorrect = false;
    });

    setResults(res);
    setShowFeedback(true);

    if (allCorrect) {
      setTimeout(() => onSuccess(), 1500);
    } else {
      onFailure();
      setTimeout(() => {
        setShowFeedback(false);
        setResults(null);
        setAnswers({});
      }, 2500);
    }
  };

  if (!problem) return null;

  const allAnswered = Object.keys(answers).length === problem.statements.length;

  return (
    <div>
      {/* De tekst */}
      <div className="mb-4 sm:mb-6">
        <p className="text-gray-500 text-xs sm:text-sm mb-2 flex items-center gap-1">
          📖 Lees de tekst:
        </p>
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-4 sm:p-6 border-2 border-amber-200">
          <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed">
            {problem.text}
          </p>
        </div>
      </div>

      {/* Stellingen */}
      <div className="mb-4 sm:mb-5">
        <p className="text-gray-600 text-sm sm:text-base font-semibold mb-3 flex items-center gap-2">
          <span className="text-lg">🤔</span> Waar of niet waar?
        </p>

        <div className="space-y-3">
          {problem.statements.map((statement, index) => {
            const answered = answers[index] !== undefined;
            const result = results?.[index];

            return (
              <div
                key={index}
                className={`rounded-xl p-3 sm:p-4 border-2 transition-all ${
                  answered
                    ? 'border-blue-300 bg-blue-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <p className="text-sm sm:text-base text-gray-800 mb-2 font-medium">
                  {statement.text}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAnswer(index, true)}
                    disabled={showFeedback}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm sm:text-base font-bold transition-all ${
                      answers[index] === true
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-blue-100'
                    }`}
                    aria-label={`${statement.text} - Waar`}
                  >
                    ✅ Waar
                  </button>
                  <button
                    onClick={() => handleAnswer(index, false)}
                    disabled={showFeedback}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm sm:text-base font-bold transition-all ${
                      answers[index] === false
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-blue-100'
                    }`}
                    aria-label={`${statement.text} - Niet waar`}
                  >
                    ❌ Niet waar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controleer knop */}
      {!showFeedback && (
        <button
          onClick={handleCheck}
          disabled={!allAnswered}
          className={`w-full py-3 sm:py-4 rounded-xl text-base sm:text-lg font-bold transition-all ${
            allAnswered
              ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Controleer! ✨
        </button>
      )}

      {/* Feedback */}
      {showFeedback && results && (
        <div className={`mt-4 p-3 rounded-xl text-sm sm:text-base ${
          Object.values(results).every(r => r)
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {Object.values(results).every(r => r)
            ? '✅ Super goed!'
            : '❌ Jammer, probeer het opnieuw!'
          }
        </div>
      )}
    </div>
  );
}

export default ReadingTrueFalse;
