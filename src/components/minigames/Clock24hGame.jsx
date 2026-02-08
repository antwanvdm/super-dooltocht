import { useState, useEffect, useRef } from 'react';
import { generateClockProblem, formatDigital, formatDigital24, dagdeel } from '../../utils/difficultyAdapter';
import AnalogClock from './AnalogClock';

/**
 * Clock24hGame - Hoe laat is het op de 24-uursklok?
 * 
 * Twee richtingen (random):
 * A) Toont analoge klok + dagdeel → typ de 24-uurs tijd
 *    "Het is 's middags" + klok op 3:15 → antwoord: 15:15
 * B) Toont 24-uurs digitale tijd → kies het juiste dagdeel + 12-uurs tijd
 *    "17:45" → antwoord: 05:45 's middags
 */
function Clock24hGame({ mathSettings, onSuccess, onFailure, theme: _theme }) {
  const [problem, setProblem] = useState(null);
  const [direction, setDirection] = useState('to24h'); // 'to24h' of 'to12h'
  const [hoursInput, setHoursInput] = useState('');
  const [minutesInput, setMinutesInput] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const hoursRef = useRef(null);
  const minutesRef = useRef(null);

  useEffect(() => {
    const clockProblem = generateClockProblem(mathSettings);
    setProblem(clockProblem);

    // Kies random richting
    const dir = Math.random() < 0.5 ? 'to24h' : 'to12h';
    setDirection(dir);

    if (dir === 'to12h') {
      // Toon 24h digitale tijd, kies juiste 12h + dagdeel uit opties
      const correct12h = formatDigital(clockProblem.hours, clockProblem.minutes);
      const correctDagdeel = dagdeel(clockProblem.hours24);
      const correctLabel = `${correct12h} ${correctDagdeel}`;

      // Genereer foute opties
      const wrongOptions = [];
      const usedLabels = new Set([correctLabel]);

      // Fout 1: juiste uur maar verkeerd dagdeel
      const altHours24 = clockProblem.hours24 >= 12 
        ? clockProblem.hours24 - 12 
        : clockProblem.hours24 + 12;
      const alt1 = `${correct12h} ${dagdeel(altHours24)}`;
      if (!usedLabels.has(alt1)) {
        wrongOptions.push({ label: alt1, correct: false });
        usedLabels.add(alt1);
      }

      // Fout 2: verkeerd uur (±1) + juist dagdeel
      const wrongHour = clockProblem.hours === 12 ? 1 : clockProblem.hours + 1;
      const alt2Label = `${formatDigital(wrongHour, clockProblem.minutes)} ${correctDagdeel}`;
      if (!usedLabels.has(alt2Label)) {
        wrongOptions.push({ label: alt2Label, correct: false });
        usedLabels.add(alt2Label);
      }

      // Fout 3: verkeerd uur + verkeerd dagdeel
      const wrongHour2 = clockProblem.hours <= 1 ? 11 : clockProblem.hours - 1;
      const alt3Label = `${formatDigital(wrongHour2, clockProblem.minutes)} ${dagdeel(altHours24)}`;
      if (!usedLabels.has(alt3Label)) {
        wrongOptions.push({ label: alt3Label, correct: false });
        usedLabels.add(alt3Label);
      }

      // Vul aan als nodig
      while (wrongOptions.length < 3) {
        const rndH = ((clockProblem.hours + wrongOptions.length + 2) % 12) || 12;
        const rndDagdeel = Math.random() < 0.5 ? correctDagdeel : dagdeel(altHours24);
        const fallback = `${formatDigital(rndH, clockProblem.minutes)} ${rndDagdeel}`;
        if (!usedLabels.has(fallback)) {
          wrongOptions.push({ label: fallback, correct: false });
          usedLabels.add(fallback);
        }
      }

      const allOptions = [
        { label: correctLabel, correct: true },
        ...wrongOptions.slice(0, 3),
      ].sort(() => Math.random() - 0.5);

      setOptions(allOptions);
    }

    setHoursInput('');
    setMinutesInput('');
    setSelectedOption(null);
    setShowFeedback(false);
    setIsCorrect(false);

    if (dir === 'to24h') {
      setTimeout(() => hoursRef.current?.focus(), 100);
    }
  }, [mathSettings]);

  const handleHoursChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    setHoursInput(val);
    if (val.length === 2) {
      minutesRef.current?.focus();
    }
  };

  const handleMinutesChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    setMinutesInput(val);
  };

  const handleSubmitTo24h = (e) => {
    e.preventDefault();
    if (!problem || showFeedback) return;

    const enteredH = parseInt(hoursInput, 10);
    const enteredM = parseInt(minutesInput, 10);
    if (isNaN(enteredH) || isNaN(enteredM)) return;

    const correct = enteredH === problem.hours24 && enteredM === problem.minutes;
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

  const handleSelectTo12h = (option) => {
    setSelectedOption(option);
    setShowFeedback(true);

    if (option.correct) {
      setIsCorrect(true);
      setTimeout(() => onSuccess(), 1500);
    } else {
      setIsCorrect(false);
      onFailure();
      setTimeout(() => {
        setShowFeedback(false);
        setSelectedOption(null);
        setIsCorrect(false);
      }, 2000);
    }
  };

  if (!problem) return null;

  const correctAnswer24 = formatDigital24(problem.hours24, problem.minutes);
  const dagdeelText = problem.dagdeel;

  // Richting A: analoge klok + dagdeel → typ 24h
  if (direction === 'to24h') {
    return (
      <div className="text-center">
        <p className="text-gray-600 text-base sm:text-xl mb-2">
          Hoe laat is het op de 24-uursklok?
        </p>
        <p className="text-lg sm:text-2xl font-semibold text-indigo-600 mb-4">
          Het is {dagdeelText}
        </p>

        <div className="flex justify-center mb-4 sm:mb-6">
          <AnalogClock
            hours={problem.hours}
            minutes={problem.minutes}
            size={160}
            className="drop-shadow-lg sm:w-[200px] sm:h-[200px]"
          />
        </div>

        <form onSubmit={handleSubmitTo24h} className="flex flex-col items-center gap-4">
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
              aria-label="Uren (24-uurs)"
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
              🎉 Goed zo! {problem.digital} {dagdeelText} = {correctAnswer24}
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

  // Richting B: 24h digitale tijd → kies 12h + dagdeel
  return (
    <div className="text-center">
      <p className="text-gray-600 text-base sm:text-xl mb-3">
        Welke tijd hoort bij deze 24-uursklok?
      </p>

      <div className="mb-6">
        <span className="inline-block bg-gray-800 text-green-400 font-mono text-3xl sm:text-5xl font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg">
          {problem.digital24}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelectTo12h(option)}
            disabled={showFeedback}
            className={`text-sm sm:text-lg font-bold py-3 sm:py-5 px-2 sm:px-4 rounded-xl transition-all transform hover:scale-105 ${
              selectedOption === option
                ? option.correct
                  ? 'bg-green-500 text-white scale-110'
                  : 'bg-red-500 text-white shake'
                : showFeedback && option.correct
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className="mt-4 sm:mt-6 text-lg sm:text-2xl font-bold">
          {selectedOption?.correct ? (
            <p className="text-green-600">🎉 Super! Je hebt het goed!</p>
          ) : (
            <p className="text-orange-600">💪 Bijna! Probeer nog eens!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Clock24hGame;
