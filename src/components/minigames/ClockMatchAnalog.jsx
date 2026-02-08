import { useState, useEffect } from 'react';
import { generateClockProblem, generateWrongClockTimes, formatDigital, formatDigital24, timeToWords, to24h } from '../../utils/difficultyAdapter';
import AnalogClock from './AnalogClock';

/**
 * ClockMatchAnalog - Welke klok past erbij?
 * Toont een digitale tijd (of in woorden), kies de juiste analoge klok uit 4 opties.
 */
function ClockMatchAnalog({ mathSettings, onSuccess, onFailure, theme: _theme }) {
  const [problem, setProblem] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [displayMode, setDisplayMode] = useState('12h');

  useEffect(() => {
    const clockProblem = generateClockProblem(mathSettings);
    setProblem(clockProblem);

    // Kies weergavemodus: woorden (alleen als ingeschakeld), 12h, of 24h
    const can24h = clockProblem.use24h;
    const canWords = mathSettings?.clockWords || false;
    const rand = Math.random();
    const mode = (canWords && rand < 0.35) ? 'words' : (can24h && rand < 0.6) ? '24h' : '12h';
    setDisplayMode(mode);

    const wrongTimes = generateWrongClockTimes(
      clockProblem.hours,
      clockProblem.minutes,
      clockProblem.level,
      3,
    );

    const correctOption = {
      hours: clockProblem.hours,
      minutes: clockProblem.minutes,
      correct: true,
    };

    const wrongOptions = wrongTimes.map((t) => ({
      hours: t.hours,
      minutes: t.minutes,
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

  const displayTime = displayMode === 'words'
    ? timeToWords(problem.hours, problem.minutes)
    : displayMode === '24h'
      ? problem.digital24
      : problem.digital;

  return (
    <div className="text-center">
      <p className="text-gray-600 text-base sm:text-xl mb-3">Welke klok past bij deze tijd?</p>

      <div className="mb-4 sm:mb-6">
        <span className="inline-block bg-gray-800 text-green-400 font-mono text-2xl sm:text-5xl font-bold px-4 sm:px-8 py-2 sm:py-4 rounded-xl shadow-lg">
          {displayTime}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(option)}
            disabled={showFeedback}
            className={`p-2 sm:p-4 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center ${
              selected === option
                ? option.correct
                  ? 'bg-green-100 ring-4 ring-green-500 scale-110'
                  : 'bg-red-100 ring-4 ring-red-500 shake'
                : showFeedback && option.correct
                  ? 'bg-green-100 ring-4 ring-green-500'
                  : 'bg-white border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50'
            }`}
          >
            <AnalogClock
              hours={option.hours}
              minutes={option.minutes}
              size={90}
              className="sm:w-[120px] sm:h-[120px]"
            />
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

export default ClockMatchAnalog;
