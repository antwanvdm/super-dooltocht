import { useState, useEffect } from 'react';
import { generateClockProblem, generateWrongClockTimes, formatDigital, formatDigital24, timeToWords, to24h } from '../../utils/difficultyAdapter';
import AnalogClock from './AnalogClock';

/**
 * ClockMultipleChoice - Hoe laat is het?
 * Toont een analoge klok, kies de juiste digitale tijd uit 4 opties.
 */
function ClockMultipleChoice({ mathSettings, onSuccess, onFailure, theme: _theme }) {
  const [problem, setProblem] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const clockProblem = generateClockProblem(mathSettings);
    setProblem(clockProblem);

    const wrongTimes = generateWrongClockTimes(
      clockProblem.hours,
      clockProblem.minutes,
      clockProblem.level,
      3,
    );

    const can24h = clockProblem.use24h;
    const canWords = mathSettings?.clockWords || false;

    // Kies weergavemodus: woorden (alleen als ingeschakeld), 12h digitaal, of 24h digitaal
    const rand = Math.random();
    const mode = (canWords && rand < 0.25) ? 'words' : (can24h && rand < 0.55) ? '24h' : '12h';

    const formatLabel = (hours, minutes) => {
      if (mode === 'words') return timeToWords(hours, minutes);
      if (mode === '24h') return formatDigital24(to24h(hours), minutes);
      return formatDigital(hours, minutes);
    };

    const correctOption = {
      hours: clockProblem.hours,
      minutes: clockProblem.minutes,
      label: formatLabel(clockProblem.hours, clockProblem.minutes),
      correct: true,
    };

    const wrongOptions = wrongTimes.map((t) => ({
      hours: t.hours,
      minutes: t.minutes,
      label: formatLabel(t.hours, t.minutes),
      correct: false,
    }));

    setOptions([correctOption, ...wrongOptions].sort(() => Math.random() - 0.5));
  }, [mathSettings]);

  const handleSelect = (option) => {
    setSelected(option);
    setShowFeedback(true);

    if (option.correct) {
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

  return (
    <div className="text-center">
      <p className="text-gray-600 text-base sm:text-xl mb-4">Hoe laat is het?</p>

      <div className="flex justify-center mb-4 sm:mb-6">
        <AnalogClock
          hours={problem.hours}
          minutes={problem.minutes}
          size={160}
          className="drop-shadow-lg sm:w-[200px] sm:h-[200px]"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(option)}
            disabled={showFeedback}
            className={`text-sm sm:text-2xl font-bold py-3 sm:py-6 px-2 sm:px-6 rounded-xl transition-all transform hover:scale-105 ${
              selected === option
                ? option.correct
                  ? 'bg-green-500 text-white scale-110'
                  : 'bg-red-500 text-white shake'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className="mt-4 sm:mt-6 text-lg sm:text-2xl font-bold">
          {selected?.correct ? (
            <p className="text-green-600">🎉 Super! Je hebt het goed!</p>
          ) : (
            <p className="text-orange-600">💪 Bijna! Probeer nog eens!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ClockMultipleChoice;
