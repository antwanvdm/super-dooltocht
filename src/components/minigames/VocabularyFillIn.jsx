import { useState, useEffect } from 'react';
import { generateVocabularyFillInProblem } from '../../utils/languageAdapter';

/**
 * VocabularyFillIn - Vul het ontbrekende woord in de zin aan.
 * Toont een zin met ____, speler kiest het juiste woord uit 4 opties.
 */
function VocabularyFillIn({ mathSettings, onSuccess, onFailure }) {
  const [problem, setProblem] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const p = generateVocabularyFillInProblem(mathSettings);
    const allOptions = [
      { text: p.correctWord, correct: true },
      ...p.wrongWords.map(w => ({ text: w, correct: false })),
    ].sort(() => Math.random() - 0.5);
    setProblem(p);
    setOptions(allOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (option, index) => {
    if (showFeedback) return;
    setSelected(index);
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

  // Vervang het woord in de zin door ____
  const displaySentence = problem.sentence.replace(
    new RegExp(`\\b${problem.correctWord}\\b`, 'i'),
    '____'
  );

  return (
    <div className="text-center">
      {/* De zin met het gat */}
      <div className="mb-4 sm:mb-6">
        <p className="text-gray-500 text-xs sm:text-sm mb-2">Welk woord past in de zin?</p>
        <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-4 sm:p-6 border-2 border-violet-200">
          <p className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-800 leading-relaxed">
            {displaySentence}
          </p>
        </div>
      </div>

      {/* Opties */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-lg mx-auto">
        {options.map((option, index) => {
          let btnClass = 'bg-white border-2 border-gray-200 text-gray-700 hover:border-violet-400 hover:bg-violet-50';
          if (showFeedback && selected === index) {
            btnClass = option.correct
              ? 'bg-green-500 text-white border-2 border-green-600 scale-[1.02]'
              : 'bg-red-500 text-white border-2 border-red-600';
          }

          return (
            <button
              key={index}
              onClick={() => handleSelect(option, index)}
              disabled={showFeedback}
              className={`p-3 sm:p-4 rounded-xl font-bold text-base sm:text-lg transition-all ${btnClass}`}
            >
              {option.text}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {showFeedback && selected !== null && (
        <div className={`mt-4 p-3 rounded-xl text-sm sm:text-base ${
          options[selected]?.correct
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {options[selected]?.correct
            ? '✅ Super goed!'
            : '❌ Jammer, probeer het opnieuw!'
          }
        </div>
      )}
    </div>
  );
}

export default VocabularyFillIn;
