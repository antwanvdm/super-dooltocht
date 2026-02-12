import { useState, useEffect, useRef } from 'react';
import { generateSpellingProblem, getMainCategoryId } from '../../utils/languageAdapter';
import { SPELLING_CATEGORIES } from '../../utils/languageData';
import SpellingReferenceCard from './SpellingReferenceCard';

/**
 * SpellingTypeWord - Typ het woord en kies de juiste categorie.
 * Het woord wordt getoond, het kind typt het over en selecteert het categorie-nummer.
 */
function SpellingTypeWord({ mathSettings, onSuccess, onFailure, theme }) {
  const [problem, setProblem] = useState(null);
  const [typedWord, setTypedWord] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [step, setStep] = useState('type'); // 'type' | 'category'
  const inputRef = useRef(null);

  useEffect(() => {
    setProblem(generateSpellingProblem(mathSettings));
    setTimeout(() => inputRef.current?.focus(), 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleWordSubmit = (e) => {
    e.preventDefault();
    if (!typedWord.trim()) return;

    const normalizedTyped = typedWord.trim().toLowerCase();
    const normalizedCorrect = problem.word.toLowerCase();

    if (normalizedTyped === normalizedCorrect) {
      setStep('category');
    } else {
      // Woord fout getypt
      setShowFeedback(true);
      setIsCorrect(false);
      onFailure();
      setTimeout(() => {
        setShowFeedback(false);
        setTypedWord('');
        inputRef.current?.focus();
      }, 2000);
    }
  };

  const handleCategorySelect = (catId) => {
    if (showFeedback) return;
    setSelectedCategory(catId);
    setShowFeedback(true);

    const correctMainId = getMainCategoryId(problem.categoryId);
    if (catId === correctMainId) {
      setIsCorrect(true);
      setTimeout(() => onSuccess(), 1500);
    } else {
      setIsCorrect(false);
      onFailure();
      setTimeout(() => {
        setShowFeedback(false);
        setSelectedCategory(null);
      }, 2000);
    }
  };

  if (!problem) return null;

  return (
    <div className="text-center">
      {/* Reference card button */}
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setShowReference(true)}
          className="text-xs sm:text-sm bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1"
          aria-label="Categoriekaart openen"
        >
          📋 Categoriekaart
        </button>
      </div>

      {step === 'type' ? (
        <>
          {/* Stap 1: Typ het woord over */}
          <div className="mb-4 sm:mb-6">
            <p className="text-gray-600 text-sm sm:text-lg mb-3">Typ dit woord over:</p>
            <div className="inline-block bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl px-6 sm:px-10 py-4 sm:py-6 border-2 border-amber-200 mb-4">
              <p className="text-3xl sm:text-5xl font-bold text-gray-800">{problem.word}</p>
            </div>
          </div>

          <form onSubmit={handleWordSubmit} className="max-w-sm mx-auto">
            <input
              ref={inputRef}
              type="text"
              value={typedWord}
              onChange={(e) => setTypedWord(e.target.value)}
              placeholder="Typ het woord..."
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              className={`w-full text-center text-2xl sm:text-3xl font-bold p-3 sm:p-4 border-2 rounded-xl outline-none transition-colors ${
                showFeedback && !isCorrect
                  ? 'border-red-400 bg-red-50'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            <button
              type="submit"
              disabled={!typedWord.trim()}
              className={`w-full mt-3 py-3 rounded-xl font-bold text-base sm:text-lg transition-all ${
                typedWord.trim()
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Controleer ✓
            </button>
          </form>

          {showFeedback && !isCorrect && (
            <p className="mt-3 text-red-600 font-medium text-sm sm:text-base">
              ❌ Dat is niet goed geschreven. Probeer het opnieuw!
            </p>
          )}
        </>
      ) : (
        <>
          {/* Stap 2: Kies de categorie */}
          <div className="mb-4 sm:mb-6">
            <p className="text-gray-600 text-sm sm:text-lg mb-2">Goed geschreven! ✅</p>
            <p className="text-gray-600 text-sm sm:text-lg mb-3">Welke categorie hoort bij <strong className="text-gray-800">{problem.word}</strong>?</p>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-lg mx-auto">
            {SPELLING_CATEGORIES.map((cat) => {
              let btnClass = 'bg-white border-2 border-gray-200 text-gray-700 hover:border-purple-400 hover:bg-purple-50';
              if (showFeedback && selectedCategory === cat.id) {
                const correctMainId = getMainCategoryId(problem.categoryId);
                btnClass = cat.id === correctMainId
                  ? 'bg-green-500 text-white border-2 border-green-600'
                  : 'bg-red-500 text-white border-2 border-red-600';
              }

              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  disabled={showFeedback}
                  className={`p-2.5 sm:p-3 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center gap-1.5 sm:gap-2 ${btnClass}`}
                >
                  <span className="text-base sm:text-lg">{cat.icon}</span>
                  <span className="text-left">{cat.name}</span>
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div className={`mt-4 p-3 rounded-xl text-sm sm:text-base ${
              isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {isCorrect
                ? '✅ Super goed!'
                : '❌ Jammer, probeer het opnieuw!'
              }
            </div>
          )}
        </>
      )}

      {/* Reference card modal */}
      {showReference && (
        <SpellingReferenceCard
          onClose={() => setShowReference(false)}
          theme={theme}
        />
      )}
    </div>
  );
}

export default SpellingTypeWord;
