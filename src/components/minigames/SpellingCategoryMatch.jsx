import { useState, useEffect } from 'react';
import { generateSpellingProblem, generateWrongCategories, getMainCategoryId } from '../../utils/languageAdapter';
import { SPELLING_CATEGORIES } from '../../utils/languageData';
import SpellingReferenceCard from './SpellingReferenceCard';
import SpeakButton from './SpeakButton';

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/**
 * SpellingCategoryMatch - Woord getoond, kies de juiste spellingcategorie.
 * Bij verkleinwoord/meervoud (cat 9/10): toon de vervoegde vorm zodat het kind
 * de categorie kan herkennen.
 * 4 opties (1 correct + 3 fout).
 */
function SpellingCategoryMatch({ mathSettings, onSuccess, onFailure, theme }) {
  const [problem, setProblem] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showReference, setShowReference] = useState(false);

  useEffect(() => {
    const p = generateSpellingProblem(mathSettings);

    // Voor cat 9/10: toon de vervoegde vorm als displaywoord
    const displayWord = p.answer || p.word;

    const mainId = getMainCategoryId(p.categoryId);
    const correctCat = SPELLING_CATEGORIES.find(c => c.id === mainId);
    const wrongs = generateWrongCategories(p.categoryId, 3);
    const allOptions = shuffle([
      { id: mainId, name: correctCat.name, icon: correctCat.icon, correct: true },
      ...wrongs.map(w => ({ ...w, correct: false })),
    ]);
    setProblem({ ...p, displayWord });
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

  return (
    <div className="text-center">
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setShowReference(true)}
          className="text-xs sm:text-sm bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1"
          aria-label="Categoriekaart openen"
        >
          📋 Categoriekaart
        </button>
      </div>

      {/* Het woord */}
      <div className="mb-4 sm:mb-6">
        <p className="text-gray-600 text-sm sm:text-lg mb-2">Welke categorie hoort bij dit woord?</p>
        <div className="inline-flex items-center gap-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl px-6 sm:px-10 py-4 sm:py-6 border-2 border-indigo-200">
          <p className="text-3xl sm:text-5xl font-bold text-gray-800">{problem.displayWord}</p>
          <SpeakButton text={problem.displayWord} lang="nl-NL" />
        </div>
      </div>

      {/* Opties */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        {options.map((option, index) => {
          let btnClass = 'bg-blue-500 text-white hover:bg-blue-600';
          if (showFeedback && selected === index) {
            btnClass = option.correct
              ? 'bg-green-500 text-white scale-105'
              : 'bg-red-500 text-white';
          }

          return (
            <button
              key={index}
              onClick={() => handleSelect(option, index)}
              disabled={showFeedback}
              className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl font-semibold text-sm sm:text-base transition-all ${btnClass}`}
            >
              <span className="text-xl sm:text-2xl">{option.icon}</span>
              <div className="text-left min-w-0">
                <span className="block font-bold">{option.name}</span>
              </div>
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

export default SpellingCategoryMatch;
