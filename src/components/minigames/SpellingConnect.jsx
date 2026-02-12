import { useState, useEffect } from 'react';
import { generateProblemsFromDifferentCategories, getMainCategoryId } from '../../utils/languageAdapter';
import { SPELLING_CATEGORIES } from '../../utils/languageData';
import SpellingReferenceCard from './SpellingReferenceCard';

/**
 * SpellingConnect - Verbind woorden met de juiste categorie.
 * Tap-based: tik op een woord, dan op de categorie.
 * Elk woord komt uit een andere categorie.
 * Aantal woorden = min(geselecteerde categorieën, 4).
 */
function SpellingConnect({ mathSettings, onSuccess, onFailure, theme }) {
  const [words, setWords] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [connections, setConnections] = useState({}); // wordIndex -> catId
  const [wrongPair, setWrongPair] = useState(null);
  const [showReference, setShowReference] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const activeCount = (mathSettings?.spellingCategories || [1, 2, 3, 4, 5, 6, 7, 8]).length;
    const wordCount = Math.min(activeCount, 4);

    const problems = generateProblemsFromDifferentCategories(mathSettings, wordCount);

    // Bouw categorieën op basis van de gekozen woorden (altijd exact 1 per woord)
    const cats = problems.map(p => {
      const mainId = getMainCategoryId(p.categoryId);
      const cat = SPELLING_CATEGORIES.find(c => c.id === mainId);
      return { id: mainId, name: cat.name, icon: cat.icon };
    }).sort(() => Math.random() - 0.5);

    setWords(problems);
    setCategories(cats);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleWordClick = (index) => {
    if (completed || connections[index] !== undefined) return;
    setSelectedWord(selectedWord === index ? null : index);
    setWrongPair(null);
  };

  const handleCategoryClick = (catId) => {
    if (completed || selectedWord === null) return;

    const word = words[selectedWord];
    const correctCatId = getMainCategoryId(word.categoryId);

    if (correctCatId === catId) {
      // Correct!
      const newConnections = { ...connections, [selectedWord]: catId };
      setConnections(newConnections);
      setSelectedWord(null);
      setWrongPair(null);

      // Check of alles verbonden is
      if (Object.keys(newConnections).length === words.length) {
        setCompleted(true);
        setTimeout(() => onSuccess(), 1200);
      }
    } else {
      // Fout
      setWrongPair({ wordIndex: selectedWord, catId });
      onFailure();
      setTimeout(() => {
        setWrongPair(null);
        setSelectedWord(null);
      }, 1500);
    }
  };

  if (words.length === 0) return null;

  return (
    <div>
      {/* Reference card button */}
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <p className="text-gray-600 text-sm sm:text-base">Tik op een woord en dan op de juiste categorie</p>
        <button
          onClick={() => setShowReference(true)}
          className="text-xs sm:text-sm bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-2.5 py-1.5 rounded-lg font-medium transition-colors flex-shrink-0"
          aria-label="Categoriekaart openen"
        >
          📋
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {/* Woorden kolom */}
        <div className="space-y-2">
          <h3 className="font-bold text-gray-700 text-sm sm:text-base mb-1">Woorden</h3>
          {words.map((word, index) => {
            const isConnected = connections[index] !== undefined;
            const isSelected = selectedWord === index;
            const isWrong = wrongPair?.wordIndex === index;

            let btnClass = 'bg-white border-2 border-gray-200 text-gray-800 hover:border-blue-400';
            if (isConnected) btnClass = 'bg-green-100 border-2 border-green-400 text-green-800';
            else if (isWrong) btnClass = 'bg-red-100 border-2 border-red-400 text-red-800';
            else if (isSelected) btnClass = 'bg-blue-100 border-2 border-blue-500 text-blue-800 ring-2 ring-blue-300';

            return (
              <button
                key={index}
                onClick={() => handleWordClick(index)}
                disabled={isConnected || completed}
                className={`w-full p-3 sm:p-4 rounded-xl font-bold text-lg sm:text-xl transition-all ${btnClass}`}
              >
                {word.word}
                {isConnected && <span className="ml-2">✓</span>}
              </button>
            );
          })}
        </div>

        {/* Categorieën kolom */}
        <div className="space-y-2">
          <h3 className="font-bold text-gray-700 text-sm sm:text-base mb-1">Categorieën</h3>
          {categories.map((cat) => {
            const isWrong = wrongPair?.catId === cat.id;
            // Check if this category already has all its words connected
            const connectedToThis = Object.entries(connections).filter(([, cId]) => cId === cat.id).length;
            const totalForThis = words.filter(w => getMainCategoryId(w.categoryId) === cat.id).length;
            const allConnected = totalForThis > 0 && connectedToThis >= totalForThis;

            let btnClass = 'bg-white border-2 border-gray-200 text-gray-700 hover:border-purple-400';
            if (allConnected) btnClass = 'bg-green-100 border-2 border-green-400 text-green-800';
            else if (isWrong) btnClass = 'bg-red-100 border-2 border-red-400 text-red-800';
            else if (selectedWord !== null) btnClass = 'bg-purple-50 border-2 border-purple-300 text-purple-800 hover:bg-purple-100 cursor-pointer';

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                disabled={completed || selectedWord === null}
                className={`w-full p-3 sm:p-4 rounded-xl font-semibold text-sm sm:text-base transition-all flex items-center gap-2 ${btnClass}`}
              >
                <span className="text-lg sm:text-xl">{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Voortgang */}
      <div className="mt-4 text-center">
        <div className="inline-flex items-center gap-2 text-sm text-gray-500">
          <span>Verbonden: {Object.keys(connections).length}/{words.length}</span>
          {completed && <span className="text-green-600 font-bold">🎉 Alles goed!</span>}
        </div>
      </div>

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

export default SpellingConnect;
