import { useEffect } from 'react';
import { SPELLING_CATEGORIES } from '../../utils/languageData';

/**
 * SpellingReferenceCard - Toont alle spellingcategorieën met regels en voorbeelden.
 * Kan als popup worden getoond vanuit spelling-oefeningen.
 */
function SpellingReferenceCard({ onClose, theme }) {
  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className={`${theme?.colors?.primary || 'bg-indigo-600'} px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between flex-shrink-0`}>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📋</span>
            <h2 className="text-lg sm:text-xl font-bold text-white">Categoriekaart</h2>
          </div>
          <button
            onClick={onClose}
            className="text-2xl text-white/80 hover:text-white transition-colors"
            aria-label="Sluiten"
          >
            ✕
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 p-3 sm:p-5 space-y-2 sm:space-y-3">
          {SPELLING_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-200"
            >
              <div className="flex items-start gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl flex-shrink-0 mt-0.5">{cat.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-gray-800 text-sm sm:text-base">{cat.name}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">{cat.rule}</p>
                  <p className="text-xs text-indigo-600 font-medium mt-1">
                    Voorbeeld: <span className="italic">{cat.example}</span>
                  </p>

                  {/* Subcategorieën voor categorie 5 */}
                  {cat.subcategories && (
                    <div className="mt-2 space-y-1.5 pl-2 border-l-2 border-indigo-200">
                      {cat.subcategories.map((sub) => (
                        <div key={sub.id} className="text-xs sm:text-sm">
                          <span className="font-semibold text-gray-700">{sub.name}:</span>{' '}
                          <span className="text-gray-600">{sub.rule}</span>{' '}
                          <span className="text-indigo-600 italic">({sub.example})</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-4 py-3 flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors text-sm sm:text-base"
          >
            Sluiten
          </button>
        </div>
      </div>
    </div>
  );
}

export default SpellingReferenceCard;
