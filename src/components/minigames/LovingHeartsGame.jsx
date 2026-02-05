import { useState, useEffect } from 'react';

function LovingHeartsGame({ mathSettings, onSuccess, onFailure, theme }) {
  const [firstNumber, setFirstNumber] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    // Kies een getal van 1-9
    const a = Math.floor(Math.random() * 9) + 1;
    const correctAnswer = 10 - a;
    setFirstNumber(a);

    // Genereer foute antwoorden (andere getallen 1-9 die niet correct zijn)
    const wrongAnswers = [];
    while (wrongAnswers.length < 3) {
      const wrong = Math.floor(Math.random() * 9) + 1;
      if (wrong !== correctAnswer && !wrongAnswers.includes(wrong)) {
        wrongAnswers.push(wrong);
      }
    }

    const allOptions = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
  }, [mathSettings]);

  const handleSelect = (answer) => {
    const correctAnswer = 10 - firstNumber;
    setSelected(answer);
    setShowFeedback(true);

    if (answer === correctAnswer) {
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

  if (firstNumber === null) return null;

  const correctAnswer = 10 - firstNumber;

  return (
    <div className="text-center">
      <div className="mb-4 sm:mb-8">
        <p className="text-gray-600 text-base sm:text-xl mb-2 sm:mb-4">
          Verliefde harten maken samen 10! 💕
        </p>
        
        {/* Hart animatie met getallen */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6 flex-wrap">
          <div className="relative">
            <span className="text-5xl sm:text-6xl md:text-8xl">💗</span>
            <span className="absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
              {firstNumber}
            </span>
          </div>
          <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-pink-500">+</span>
          <div className="relative">
            <span className="text-5xl sm:text-6xl md:text-8xl">💗</span>
            <span className="absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
              ?
            </span>
          </div>
          <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-pink-500">=</span>
          <div className="relative">
            <span className="text-5xl sm:text-6xl md:text-8xl">❤️</span>
            <span className="absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
              10
            </span>
          </div>
        </div>
        
        <p className="text-xl sm:text-2xl font-bold text-gray-700">
          {firstNumber} + ? = 10
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-4 max-w-md mx-auto">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(option)}
            disabled={showFeedback}
            className={`text-3xl sm:text-4xl md:text-5xl font-bold py-4 sm:py-6 px-4 sm:px-8 rounded-xl transition-all transform hover:scale-105 ${
              selected === option
                ? option === correctAnswer
                  ? 'bg-green-500 text-white scale-110'
                  : 'bg-red-500 text-white'
                : 'bg-pink-500 text-white hover:bg-pink-600'
            } disabled:cursor-not-allowed`}
          >
            {option}
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className="mt-4 sm:mt-6 text-lg sm:text-2xl font-bold">
          {selected === correctAnswer ? (
            <p className="text-green-600">🎉 Geweldig! {firstNumber} + {correctAnswer} = 10! 💕</p>
          ) : (
            <p className="text-orange-600">💪 Bijna! Welk getal maakt samen met {firstNumber} precies 10?</p>
          )}
        </div>
      )}
    </div>
  );
}

export default LovingHeartsGame;
