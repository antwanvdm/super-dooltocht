import { useState, useEffect } from 'react';
import { generateMathProblem, formatMoney } from '../../utils/difficultyAdapter';
import { Bill, Coin } from './MoneyDisplay';

// Slim betalen - betaal met zo min mogelijk biljetten/munten
function SmartPayGame({ mathSettings, onSuccess, onFailure }) {
  const [problem, setProblem] = useState(null);
  const [selectedMoney, setSelectedMoney] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState(null);

  useEffect(() => {
    // Genereer een smartPay probleem
    const moneySettings = {
      ...mathSettings,
      enabledOperations: { money: true },
    };
    
    let attempts = 0;
    let mathProblem;
    do {
      mathProblem = generateMathProblem(moneySettings);
      attempts++;
    } while (mathProblem.moneyType !== 'smartPay' && attempts < 20);
    
    setProblem(mathProblem);
    setSelectedMoney([]);
  }, [mathSettings]);

  const toggleMoney = (index) => {
    if (showFeedback) return;
    
    setSelectedMoney(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const calculateTotal = () => {
    return selectedMoney.reduce((sum, index) => sum + problem.wallet[index], 0);
  };

  const handleCheck = () => {
    const total = calculateTotal();
    setShowFeedback(true);

    if (total === problem.amount) {
      setFeedbackType('correct');
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } else if (total < problem.amount) {
      setFeedbackType('tooLittle');
      onFailure();
      setTimeout(() => {
        setShowFeedback(false);
        setFeedbackType(null);
      }, 2000);
    } else {
      setFeedbackType('tooMuch');
      onFailure();
      setTimeout(() => {
        setShowFeedback(false);
        setFeedbackType(null);
      }, 2000);
    }
  };

  const handleReset = () => {
    setSelectedMoney([]);
    setShowFeedback(false);
    setFeedbackType(null);
  };

  if (!problem) return null;

  const total = calculateTotal();

  return (
    <div className="text-center">
      <div className="mb-4">
        <p className="text-gray-600 text-lg mb-2">Betaal precies dit bedrag!</p>
        <p className="text-5xl font-bold text-emerald-600 mb-2">
          {problem.amountFormatted}
        </p>
        <p className="text-sm text-gray-500">Klik op het geld dat je wilt gebruiken</p>
      </div>

      {/* Portemonnee */}
      <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-4 border-2 border-amber-300 mb-4">
        <p className="text-sm font-medium text-amber-800 mb-3">💼 Jouw portemonnee:</p>
        <div className="flex flex-wrap gap-2 justify-center items-center">
          {problem.wallet.map((value, index) => (
            <div 
              key={index}
              onClick={() => toggleMoney(index)}
              className={`cursor-pointer transition-all ${
                selectedMoney.includes(index) 
                  ? 'opacity-30 scale-90' 
                  : 'hover:scale-105'
              }`}
            >
              {value >= 500 ? (
                <Bill value={value / 100} size="sm" />
              ) : (
                <Coin value={value} size="sm" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Geselecteerd geld */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border-2 border-green-200 mb-4 min-h-[100px]">
        <p className="text-sm font-medium text-green-800 mb-3">🛒 Jouw betaling:</p>
        {selectedMoney.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-2 justify-center items-center mb-2">
              {selectedMoney.map((index) => {
                const value = problem.wallet[index];
                return value >= 500 ? (
                  <Bill key={index} value={value / 100} size="sm" />
                ) : (
                  <Coin key={index} value={value} size="sm" />
                );
              })}
            </div>
            <p className={`text-lg font-bold ${
              total === problem.amount ? 'text-green-600' :
              total < problem.amount ? 'text-orange-600' : 'text-red-600'
            }`}>
              = {formatMoney(total)}
              {total < problem.amount && ` (nog ${formatMoney(problem.amount - total)} nodig)`}
              {total > problem.amount && ` (${formatMoney(total - problem.amount)} teveel)`}
            </p>
          </>
        ) : (
          <p className="text-gray-400 italic">Klik op geld om te selecteren</p>
        )}
      </div>

      {/* Knoppen */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={handleReset}
          disabled={showFeedback || selectedMoney.length === 0}
          className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          🔄 Opnieuw
        </button>
        <button
          onClick={handleCheck}
          disabled={showFeedback || selectedMoney.length === 0}
          className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ✓ Controleer
        </button>
      </div>

      {showFeedback && (
        <div className="mt-6 text-2xl font-bold">
          {feedbackType === 'correct' && (
            <p className="text-green-600">🎉 Perfect betaald!</p>
          )}
          {feedbackType === 'tooLittle' && (
            <p className="text-orange-600">💪 Dat is te weinig! Je hebt nog {formatMoney(problem.amount - total)} nodig.</p>
          )}
          {feedbackType === 'tooMuch' && (
            <p className="text-orange-600">💪 Dat is teveel! Je geeft {formatMoney(total - problem.amount)} teveel.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SmartPayGame;
