import { useState, useEffect } from 'react';
import { generateMathProblem, formatMoney } from '../../utils/difficultyAdapter';
import { Bill, Coin } from './MoneyDisplay';

// Genereer foute wisselgeld bedragen
const generateChangeWrongAnswers = (correct, includeCents) => {
  const wrong = new Set();
  const step = includeCents ? 5 : 100;
  
  // Typische fouten bij wisselgeld
  const offsets = [step, -step, step * 2, -step * 2, step * 10, -step * 10];
  
  for (const offset of offsets) {
    const wrongAnswer = correct + offset;
    if (wrongAnswer > 0 && wrongAnswer !== correct) {
      wrong.add(wrongAnswer);
    }
    if (wrong.size >= 3) break;
  }
  
  return Array.from(wrong).slice(0, 3);
};

// Wisselgeld - hoeveel krijg je terug?
function ChangeGame({ mathSettings, onSuccess, onFailure }) {
  const [problem, setProblem] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    // Genereer een change probleem
    const moneySettings = {
      ...mathSettings,
      enabledOperations: { money: true },
    };
    
    let attempts = 0;
    let mathProblem;
    do {
      mathProblem = generateMathProblem(moneySettings);
      attempts++;
    } while (mathProblem.moneyType !== 'change' && attempts < 20);
    
    setProblem(mathProblem);
    
    // Genereer antwoordopties
    const correctAnswer = mathProblem.change;
    const wrongAnswers = generateChangeWrongAnswers(correctAnswer, mathSettings?.moneyIncludeCents);
    
    const allOptions = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
  }, [mathSettings]);

  const handleSelect = (answer) => {
    setSelected(answer);
    setShowFeedback(true);

    if (answer === problem.change) {
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

  // Bepaal welk briefje/munt werd betaald
  const paidValue = problem.paid;

  return (
    <div className="text-center">
      <div className="mb-6">
        <p className="text-gray-600 text-lg mb-4">Hoeveel wisselgeld krijg je terug?</p>
        
        {/* Scenario */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border-2 border-blue-200 mb-4">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {/* Betaald */}
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Je betaalt met:</p>
              {paidValue >= 500 ? (
                <Bill value={paidValue / 100} size="lg" />
              ) : (
                <Coin value={paidValue} size="lg" />
              )}
            </div>
            
            <div className="text-4xl">➡️</div>
            
            {/* Prijs */}
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Voor iets van:</p>
              <div className="bg-white rounded-xl p-4 border-2 border-gray-200 shadow-sm">
                <span className="text-3xl">🏷️</span>
                <p className="text-2xl font-bold text-gray-800">{problem.priceFormatted}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-gray-600 mb-3">Hoeveel krijg je terug?</p>
      
      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(option)}
            disabled={showFeedback}
            className={`text-2xl font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 ${
              selected === option
                ? option === problem.change
                  ? 'bg-green-500 text-white scale-110'
                  : 'bg-red-500 text-white'
                : 'bg-amber-500 text-white hover:bg-amber-600'
            } disabled:cursor-not-allowed`}
          >
            {formatMoney(option)}
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className="mt-6 text-2xl font-bold">
          {selected === problem.change ? (
            <p className="text-green-600">🎉 Klopt! Je krijgt {problem.changeFormatted} terug!</p>
          ) : (
            <p className="text-orange-600">💪 Bijna! Reken nog eens: {problem.paidFormatted} - {problem.priceFormatted}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ChangeGame;
