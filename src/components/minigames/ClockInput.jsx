import { useState, useEffect, useRef } from 'react';
import { generateClockProblem } from '../../utils/difficultyAdapter';
import AnalogClock from './AnalogClock';

/**
 * ClockInput - Typ de tijd
 * Toont een analoge klok, de speler vult de digitale tijd in (HH:MM).
 */
function ClockInput({ mathSettings, onSuccess, onFailure, theme: _theme }) {
  const [problem, setProblem] = useState(null);
  const [hoursInput, setHoursInput] = useState('');
  const [minutesInput, setMinutesInput] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const hoursRef = useRef(null);
  const minutesRef = useRef(null);

  useEffect(() => {
    const clockProblem = generateClockProblem(mathSettings);
    setProblem(clockProblem);
    setHoursInput('');
    setMinutesInput('');
    setShowFeedback(false);
    setIsCorrect(false);
    // Focus het uren-veld
    setTimeout(() => hoursRef.current?.focus(), 100);
  }, [mathSettings]);

  const handleHoursChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    setHoursInput(val);
    // Auto-tab naar minuten als 2 cijfers zijn ingevuld
    if (val.length === 2) {
      minutesRef.current?.focus();
    }
  };

  const handleMinutesChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    setMinutesInput(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!problem || showFeedback) return;

    const enteredH = parseInt(hoursInput, 10);
    const enteredM = parseInt(minutesInput, 10);

    if (isNaN(enteredH) || isNaN(enteredM)) return;

    // Check correctheid: accepteer zowel 12-uurs als 24-uurs invoer
    const correctH = problem.hours;
    const correctM = problem.minutes;
    const isHourCorrect =
      enteredH === correctH ||
      enteredH === correctH + 12 ||
      (correctH === 12 && enteredH === 0);
    const isMinuteCorrect = enteredM === correctM;

    const correct = isHourCorrect && isMinuteCorrect;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setTimeout(() => onSuccess(), 1500);
    } else {
      onFailure();
      setTimeout(() => {
        setShowFeedback(false);
        setIsCorrect(false);
        setHoursInput('');
        setMinutesInput('');
        hoursRef.current?.focus();
      }, 2500);
    }
  };

  if (!problem) return null;

  return (
    <div className="text-center">
      <p className="text-gray-600 text-base sm:text-xl mb-4">Hoe laat is het? Typ de tijd!</p>

      <div className="flex justify-center mb-4 sm:mb-6">
        <AnalogClock
          hours={problem.hours}
          minutes={problem.minutes}
          size={160}
          className="drop-shadow-lg sm:w-[200px] sm:h-[200px]"
        />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <input
            ref={hoursRef}
            type="text"
            inputMode="numeric"
            value={hoursInput}
            onChange={handleHoursChange}
            placeholder="uu"
            maxLength={2}
            disabled={showFeedback}
            className={`w-16 sm:w-20 text-center text-3xl sm:text-4xl font-bold py-3 rounded-xl border-2 outline-none transition-colors ${
              showFeedback
                ? isCorrect
                  ? 'border-green-500 bg-green-50'
                  : 'border-red-500 bg-red-50'
                : 'border-gray-300 focus:border-blue-500'
            }`}
            aria-label="Uren"
          />
          <span className="text-3xl sm:text-4xl font-bold text-gray-700">:</span>
          <input
            ref={minutesRef}
            type="text"
            inputMode="numeric"
            value={minutesInput}
            onChange={handleMinutesChange}
            placeholder="mm"
            maxLength={2}
            disabled={showFeedback}
            className={`w-16 sm:w-20 text-center text-3xl sm:text-4xl font-bold py-3 rounded-xl border-2 outline-none transition-colors ${
              showFeedback
                ? isCorrect
                  ? 'border-green-500 bg-green-50'
                  : 'border-red-500 bg-red-50'
                : 'border-gray-300 focus:border-blue-500'
            }`}
            aria-label="Minuten"
          />
        </div>

        {showFeedback && !isCorrect && (
          <p className="text-orange-600 font-semibold text-lg">
            💪 Bijna! Probeer nog eens!
          </p>
        )}

        {showFeedback && isCorrect && (
          <p className="text-green-600 font-semibold text-lg">
            🎉 Goed zo!
          </p>
        )}

        {!showFeedback && (
          <button
            type="submit"
            disabled={!hoursInput || !minutesInput}
            className={`px-8 py-3 text-lg font-bold rounded-xl transition-all ${
              hoursInput && minutesInput
                ? 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Controleer ✓
          </button>
        )}
      </form>
    </div>
  );
}

export default ClockInput;
