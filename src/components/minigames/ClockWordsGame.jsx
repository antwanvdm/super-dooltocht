import { useState, useEffect, useRef } from 'react';
import { generateClockProblem, timeToWords, formatDigital } from '../../utils/clockAdapter';
import AnalogClock from './AnalogClock';

/**
 * ClockWordsGame - Schrijf de tijd in woorden
 * 
 * Toont een analoge klok (of soms digitale tijd), het kind typt de tijd
 * in woorden, bijv. "kwart over vijf" of "half drie".
 * 
 * Accepteert zowel "één" als "een" (streepjes niet verplicht).
 */
function ClockWordsGame({ mathSettings, onSuccess, onFailure, theme: _theme }) {
  const [problem, setProblem] = useState(null);
  const [showDigital, setShowDigital] = useState(false);
  const [input, setInput] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const clockProblem = generateClockProblem(mathSettings);
    setProblem(clockProblem);
    // Soms digitale tijd tonen in plaats van analoge klok (30% kans)
    setShowDigital(Math.random() < 0.3);
    setInput('');
    setShowFeedback(false);
    setIsCorrect(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [mathSettings]);

  /**
   * Normaliseer tekst voor vergelijking:
   * - Alles lowercase
   * - Trim whitespace
   * - Verwijder dubbele spaties
   * - Verwijder streepjes op "één" → accepteer "een"
   */
  const normalize = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/[éè]/g, 'e')
      .replace(/ë/g, 'e');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!problem || showFeedback || !input.trim()) return;

    const correctWords = timeToWords(problem.hours, problem.minutes);
    const normalizedInput = normalize(input);
    const normalizedCorrect = normalize(correctWords);

    const correct = normalizedInput === normalizedCorrect;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setTimeout(() => onSuccess(), 1500);
    } else {
      onFailure();
      setTimeout(() => {
        setShowFeedback(false);
        setIsCorrect(false);
        setInput('');
        inputRef.current?.focus();
      }, 3000);
    }
  };

  if (!problem) return null;

  return (
    <div className="text-center">
      <p className="text-gray-600 text-base sm:text-xl mb-4">
        Schrijf de tijd in woorden!
      </p>

      {showDigital ? (
        <div className="mb-4 sm:mb-6">
          <span className="inline-block bg-gray-800 text-green-400 font-mono text-3xl sm:text-5xl font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg">
            {formatDigital(problem.hours, problem.minutes)}
          </span>
        </div>
      ) : (
        <div className="flex justify-center mb-4 sm:mb-6">
          <AnalogClock
            hours={problem.hours}
            minutes={problem.minutes}
            size={160}
            className="drop-shadow-lg sm:w-[200px] sm:h-[200px]"
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <p className="text-gray-400 text-sm sm:text-base mb-1">bijvoorbeeld: kwart over drie</p>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="bv: kwart over drie"
          disabled={showFeedback}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
          className={`w-full max-w-sm text-center text-lg sm:text-2xl font-semibold py-3 px-4 rounded-xl border-2 outline-none transition-colors ${
            showFeedback
              ? isCorrect
                ? 'border-green-500 bg-green-50'
                : 'border-red-500 bg-red-50'
              : 'border-gray-300 focus:border-blue-500'
          }`}
          aria-label="Typ de tijd in woorden"
        />

        {showFeedback && isCorrect && (
          <p className="text-green-600 font-semibold text-lg sm:text-2xl">
            🎉 Super! Je hebt het goed!
          </p>
        )}

        {showFeedback && !isCorrect && (
          <p className="text-orange-600 font-semibold text-lg sm:text-2xl">
            💪 Bijna! Probeer nog eens!
          </p>
        )}

        {!showFeedback && (
          <button
            type="submit"
            disabled={!input.trim()}
            className={`px-8 py-3 text-lg font-bold rounded-xl transition-all ${
              input.trim()
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

export default ClockWordsGame;
