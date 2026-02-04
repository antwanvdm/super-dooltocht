import { useState, useEffect } from 'react';
import { generateMathProblem, formatMoney } from '../../utils/difficultyAdapter';
import { Bill, Coin } from './MoneyDisplay';

// Tel het geld - hoeveel is dit bij elkaar?
function CountMoneyGame({ mathSettings, onSuccess, onFailure }) {
  const [problem, setProblem] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    // Genereer een countMoney probleem
    const moneySettings = {
      ...mathSettings,
      enabledOperations: { money: true },
    };
    
    let attempts = 0;
    let mathProblem;
    do {
      mathProblem = generateMathProblem(moneySettings);
      attempts++;
    } while (mathProblem.moneyType !== 'countMoney' && attempts < 20);
    
    setProblem(mathProblem);
    setInputValue('');
  }, [mathSettings]);

  // Parse input naar centen
  const parseInput = (input) => {
    // Verwijder spaties en vervang punt door komma
    const cleaned = input.trim().replace('.', ',').replace('€', '');
    
    // Check voor komma (euro's en centen)
    if (cleaned.includes(',')) {
      const parts = cleaned.split(',');
      const euros = parseInt(parts[0]) || 0;
      let cents = parseInt(parts[1]) || 0;
      // Als er maar 1 cijfer na de komma staat, vermenigvuldig met 10
      if (parts[1] && parts[1].length === 1) {
        cents *= 10;
      }
      return euros * 100 + cents;
    }
    
    // Alleen hele euro's
    return (parseInt(cleaned) || 0) * 100;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userAnswer = parseInput(inputValue);
    setShowFeedback(true);

    if (userAnswer === problem.answer) {
      setIsCorrect(true);
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } else {
      setIsCorrect(false);
      onFailure();
      setTimeout(() => {
        setShowFeedback(false);
        setInputValue('');
      }, 2000);
    }
  };

  if (!problem) return null;

  const hasCents = mathSettings?.moneyIncludeCents;

  return (
    <div className="text-center">
      <div className="mb-6">
        <p className="text-gray-600 text-lg mb-4">Hoeveel geld zie je hier?</p>
        
        {/* Geld weergave */}
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border-2 border-amber-200 mb-6">
          <div className="flex flex-wrap gap-3 justify-center items-center">
            {problem.money.map((value, i) => (
              value >= 500 ? (
                <Bill key={i} value={value / 100} size="md" />
              ) : (
                <Coin key={i} value={value} size="md" />
              )
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-2">
            Typ het totaalbedrag:
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400">€</span>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={hasCents ? "bijv. 12,50" : "bijv. 12"}
              disabled={showFeedback}
              className={`w-full text-2xl font-bold py-4 pl-12 pr-4 rounded-xl border-2 text-center ${
                showFeedback
                  ? isCorrect
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : 'border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
              } outline-none transition-all disabled:cursor-not-allowed`}
              autoFocus
            />
          </div>
          {hasCents && (
            <p className="text-sm text-gray-500 mt-2">
              💡 Tip: Gebruik een komma (,) om euro's en centen te scheiden
            </p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={showFeedback || !inputValue.trim()}
          className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xl rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ✓ Controleer
        </button>
      </form>

      {showFeedback && (
        <div className="mt-6 text-2xl font-bold">
          {isCorrect ? (
            <p className="text-green-600">🎉 Goed geteld! Het is {problem.amountFormatted}!</p>
          ) : (
            <p className="text-orange-600">💪 Bijna! Tel nog eens rustig!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default CountMoneyGame;
