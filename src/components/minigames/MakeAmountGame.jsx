import { useState, useEffect } from 'react';
import { generateMathProblem, formatMoney, findOptimalCombination } from '../../utils/difficultyAdapter';
import { Bill, Coin } from './MoneyDisplay';

// Genereer foute combinaties die dicht bij het juiste bedrag liggen
const generateWrongCombinations = (targetAmount, currency, correctCombination) => {
  const wrong = [];
  const sorted = [...currency].sort((a, b) => b - a);
  
  // Fout 1: iets te veel
  const tooMuch = targetAmount + sorted[Math.floor(Math.random() * 3)];
  const combo1 = findOptimalCombination(tooMuch, currency);
  if (combo1 && JSON.stringify(combo1) !== JSON.stringify(correctCombination)) {
    wrong.push(combo1);
  }
  
  // Fout 2: iets te weinig
  const tooLittle = targetAmount - sorted[sorted.length - 1 - Math.floor(Math.random() * 3)];
  if (tooLittle > 0) {
    const combo2 = findOptimalCombination(tooLittle, currency);
    if (combo2 && JSON.stringify(combo2) !== JSON.stringify(correctCombination)) {
      wrong.push(combo2);
    }
  }
  
  // Fout 3: random ander bedrag
  const randomAmount = Math.round(targetAmount * (0.7 + Math.random() * 0.5));
  const combo3 = findOptimalCombination(randomAmount, currency);
  if (combo3 && JSON.stringify(combo3) !== JSON.stringify(correctCombination)) {
    wrong.push(combo3);
  }
  
  return wrong.slice(0, 3);
};

// Maak het bedrag - welke combinatie is juist?
function MakeAmountGame({ mathSettings, onSuccess, onFailure }) {
  const [problem, setProblem] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    // Genereer een makeAmount probleem
    const moneySettings = {
      ...mathSettings,
      enabledOperations: { money: true },
    };
    
    let attempts = 0;
    let mathProblem;
    do {
      mathProblem = generateMathProblem(moneySettings);
      attempts++;
    } while (mathProblem.moneyType !== 'makeAmount' && attempts < 20);
    
    setProblem(mathProblem);
    
    // Genereer antwoordopties (correct + 2-3 fout)
    const correct = mathProblem.correctCombination;
    const wrongOptions = generateWrongCombinations(mathProblem.amount, mathProblem.currency, correct);
    
    const allOptions = [
      { combination: correct, isCorrect: true },
      ...wrongOptions.map(c => ({ combination: c, isCorrect: false }))
    ].sort(() => Math.random() - 0.5);
    
    setOptions(allOptions);
  }, [mathSettings]);

  const handleSelect = (option) => {
    setSelected(option);
    setShowFeedback(true);

    if (option.isCorrect) {
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

  if (!problem || options.length === 0) return null;

  return (
    <div className="text-center">
      <div className="mb-4 sm:mb-6">
        <p className="text-gray-600 text-base sm:text-lg mb-1 sm:mb-2">Welke combinatie maakt precies dit bedrag?</p>
        <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-emerald-600 mb-2 sm:mb-4">
          {problem.amountFormatted}
        </p>
      </div>

      <div className="space-y-2 sm:space-y-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(option)}
            disabled={showFeedback}
            className={`w-full p-2 sm:p-4 rounded-xl transition-all ${
              selected === option
                ? option.isCorrect
                  ? 'bg-green-100 ring-4 ring-green-500'
                  : 'bg-red-100 ring-4 ring-red-500'
                : 'bg-gray-50 hover:bg-gray-100 border-2 border-gray-200'
            } disabled:cursor-not-allowed`}
          >
            <div className="flex flex-wrap gap-1 sm:gap-2 justify-center items-center">
              {option.combination.map((value, i) => (
                value >= 500 ? (
                  <Bill key={i} value={value / 100} size="sm" />
                ) : (
                  <Coin key={i} value={value} size="sm" />
                )
              ))}
            </div>
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className="mt-4 sm:mt-6 text-lg sm:text-2xl font-bold">
          {selected?.isCorrect ? (
            <p className="text-green-600">🎉 Super! Dat is precies {problem.amountFormatted}!</p>
          ) : (
            <p className="text-orange-600">💪 Bijna! Tel nog eens goed!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default MakeAmountGame;
