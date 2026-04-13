import { useEffect } from 'react';

/**
 * EenhedenReferenceCard - Shows unit abbreviations, conversion steps and optionally formulas.
 * Popup reference card ("spiekkaart") for unit conversion minigames.
 */
function EenhedenReferenceCard({ onClose, theme, showFormulas = false }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className={`${theme?.colors?.primary || 'bg-teal-600'} px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between flex-shrink-0`}>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📋</span>
            <h2 className="text-lg sm:text-xl font-bold text-white">Spiekkaart</h2>
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
        <div className="overflow-y-auto flex-1 p-3 sm:p-5 space-y-3 sm:space-y-4 text-center">

          {/* Section 1: Abbreviations */}
          <div className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-200">
            <h3 className="font-bold text-gray-800 text-sm sm:text-base mb-2">📝 Afkortingen</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-teal-700 mb-1">📏 Lengte</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-xs sm:text-sm">
                  <span><span className="font-bold text-gray-800">mm</span> = millimeter</span>
                  <span><span className="font-bold text-gray-800">cm</span> = centimeter</span>
                  <span><span className="font-bold text-gray-800">dm</span> = decimeter</span>
                  <span><span className="font-bold text-gray-800">m</span> = meter</span>
                  <span><span className="font-bold text-gray-800">km</span> = kilometer</span>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-teal-700 mb-1">⚖️ Gewicht</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-xs sm:text-sm">
                  <span><span className="font-bold text-gray-800">g</span> = gram</span>
                  <span><span className="font-bold text-gray-800">kg</span> = kilogram</span>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-teal-700 mb-1">🥛 Inhoud</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-xs sm:text-sm">
                  <span><span className="font-bold text-gray-800">ml</span> = milliliter</span>
                  <span><span className="font-bold text-gray-800">cl</span> = centiliter</span>
                  <span><span className="font-bold text-gray-800">dl</span> = deciliter</span>
                  <span><span className="font-bold text-gray-800">L</span> = liter</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Conversion ladder */}
          <div className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-200">
            <h3 className="font-bold text-gray-800 text-sm sm:text-base mb-2">🪜 Omrekentrap</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-teal-700 mb-1">📏 Lengte</p>
                <div className="flex items-center justify-center gap-1 text-xs sm:text-sm flex-wrap">
                  <span className="font-bold bg-teal-100 px-1.5 py-0.5 rounded">km</span>
                  <span className="text-gray-400">×1000</span>
                  <span className="font-bold bg-teal-100 px-1.5 py-0.5 rounded">m</span>
                  <span className="text-gray-400">×10</span>
                  <span className="font-bold bg-teal-100 px-1.5 py-0.5 rounded">dm</span>
                  <span className="text-gray-400">×10</span>
                  <span className="font-bold bg-teal-100 px-1.5 py-0.5 rounded">cm</span>
                  <span className="text-gray-400">×10</span>
                  <span className="font-bold bg-teal-100 px-1.5 py-0.5 rounded">mm</span>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-teal-700 mb-1">⚖️ Gewicht</p>
                <div className="flex items-center justify-center gap-1 text-xs sm:text-sm">
                  <span className="font-bold bg-teal-100 px-1.5 py-0.5 rounded">kg</span>
                  <span className="text-gray-400">×1000</span>
                  <span className="font-bold bg-teal-100 px-1.5 py-0.5 rounded">g</span>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-teal-700 mb-1">🥛 Inhoud</p>
                <div className="flex items-center justify-center gap-1 text-xs sm:text-sm">
                  <span className="font-bold bg-teal-100 px-1.5 py-0.5 rounded">L</span>
                  <span className="text-gray-400">×10</span>
                  <span className="font-bold bg-teal-100 px-1.5 py-0.5 rounded">dl</span>
                  <span className="text-gray-400">×10</span>
                  <span className="font-bold bg-teal-100 px-1.5 py-0.5 rounded">cl</span>
                  <span className="text-gray-400">×10</span>
                  <span className="font-bold bg-teal-100 px-1.5 py-0.5 rounded">ml</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center">⬅️ groter · kleiner ➡️</p>
            </div>
          </div>

          {/* Section 3: Formulas (optional, for OmtrekOppervlakteQuiz) */}
          {showFormulas && (
            <div className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-200">
              <h3 className="font-bold text-gray-800 text-sm sm:text-base mb-2">📐 Formules</h3>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="bg-white rounded-lg px-3 py-2 border border-gray-100">
                  <p className="font-semibold text-gray-700">Rechthoek</p>
                  <p className="text-gray-600">Omtrek = 2 × (breedte + hoogte)</p>
                  <p className="text-gray-600">Oppervlakte = breedte × hoogte</p>
                </div>
                <div className="bg-white rounded-lg px-3 py-2 border border-gray-100">
                  <p className="font-semibold text-gray-700">Vierkant</p>
                  <p className="text-gray-600">Omtrek = 4 × zijde</p>
                  <p className="text-gray-600">Oppervlakte = zijde × zijde</p>
                </div>
                <div className="bg-white rounded-lg px-3 py-2 border border-gray-100">
                  <p className="font-semibold text-gray-700">Driehoek</p>
                  <p className="text-gray-600">Omtrek = zijde + zijde + zijde</p>
                </div>
              </div>
            </div>
          )}
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

export default EenhedenReferenceCard;
