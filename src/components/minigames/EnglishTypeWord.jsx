import { useState, useEffect, useRef } from 'react';
import { generateEnglishTypeWord } from '../../utils/languageAdapter';

/**
 * EnglishTypeWord - Toon het Nederlandse woord, typ de Engelse vertaling.
 * Geen hints. Toont NIET het goede antwoord bij een fout.
 */
function EnglishTypeWord({ mathSettings, onSuccess, onFailure }) {
  const [problem, setProblem] = useState(null);
  const [typedWord, setTypedWord] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setProblem(generateEnglishTypeWord(mathSettings));
    setTimeout(() => inputRef.current?.focus(), 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!typedWord.trim() || showFeedback) return;

    const normalizedTyped = typedWord.trim().toLowerCase();
    const normalizedCorrect = problem.answer.toLowerCase();

    if (normalizedTyped === normalizedCorrect) {
      setIsCorrect(true);
      setShowFeedback(true);
      setTimeout(() => onSuccess(), 1500);
    } else {
      setIsCorrect(false);
      setShowFeedback(true);
      onFailure();
      setTimeout(() => {
        setShowFeedback(false);
        setTypedWord('');
        inputRef.current?.focus();
      }, 2000);
    }
  };

  if (!problem) return null;

  const instructionText =
    problem.promptLang === 'nl'
      ? 'Typ de Engelse vertaling van dit woord:'
      : 'Typ de Nederlandse vertaling van dit woord:';

  const placeholderText =
    problem.answerLang === 'en' ? 'Type in English...' : 'Typ in het Nederlands...';

  return (
    <div className="text-center">
      {/* Het woord */}
      <div className="mb-4 sm:mb-6">
        <p className="text-gray-600 text-sm sm:text-lg mb-2">
          {instructionText}
        </p>
        <div className="inline-block bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl px-6 sm:px-10 py-4 sm:py-6 border-2 border-orange-200">
          <p className="text-3xl sm:text-5xl font-bold text-gray-800">{problem.prompt}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={typedWord}
            onChange={(e) => setTypedWord(e.target.value)}
            placeholder={placeholderText}
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            className={`w-full text-center text-2xl sm:text-3xl font-bold p-3 sm:p-4 border-2 rounded-xl outline-none transition-colors ${
              showFeedback
                ? isCorrect
                  ? 'border-green-400 bg-green-50'
                  : 'border-red-400 bg-red-50'
                : 'border-gray-300 focus:border-blue-500'
            }`}
          />
        </div>
        <button
          type="submit"
          disabled={!typedWord.trim() || showFeedback}
          className={`w-full mt-3 py-3 rounded-xl font-bold text-base sm:text-lg transition-all ${
            typedWord.trim() && !showFeedback
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Controleer ✓
        </button>
      </form>

      {/* Feedback */}
      {showFeedback && (
        <div
          className={`mt-4 p-3 rounded-xl text-sm sm:text-base ${
            isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {isCorrect ? '✅ Great job!' : '❌ Dat klopt niet, probeer het opnieuw!'}
        </div>
      )}
    </div>
  );
}

export default EnglishTypeWord;
