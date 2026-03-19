export default function PuzzelPanel({ settings, dispatch }) {
  const { puzzelOps, puzzleLevel } = settings;

  return (
    <>
      {/* Soort puzzel */}
      <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-2xl p-4 sm:p-7 border-2 border-violet-100">
        <h3 className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg font-bold text-gray-700 mb-4 sm:mb-6">
          <span className="text-xl sm:text-2xl">🧠</span> Soort puzzel
        </h3>
        <div className="space-y-3 sm:space-y-4">
          {[
            { key: 'sudoku', label: 'Sudoku', icon: '🔢', desc: 'Vul het rooster met cijfers' },
            { key: 'tectonic', label: 'Tectonic', icon: '🧱', desc: 'Vul gebieden zonder herhalingen' },
            { key: 'binary', label: 'Binair', icon: '0️⃣', desc: 'Vul rijen met nullen en enen' },
            { key: 'chess', label: 'Schaken', icon: '♟️', desc: 'Zet de koning schaakmat' },
          ].map(({ key, label, icon, desc }) => (
            <label
              key={key}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                puzzelOps[key]
                  ? 'bg-violet-500 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-violet-50 border border-gray-200'
              }`}
            >
              <input
                type="checkbox"
                checked={puzzelOps[key]}
                onChange={() => dispatch({ type: 'TOGGLE_PUZZEL_OPS', key })}
                className="sr-only"
              />
              <span className="text-xl">{icon}</span>
              <div className="min-w-0">
                <span className="font-semibold">{label}</span>
                <span className={`block text-xs mt-0.5 ${puzzelOps[key] ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
              </div>
              {puzzelOps[key] && <span className="ml-auto text-xl">✓</span>}
            </label>
          ))}
        </div>
        {!puzzelOps.sudoku && !puzzelOps.tectonic && !puzzelOps.binary && !puzzelOps.chess && (
          <p className="mt-4 text-sm text-red-500 font-medium text-center">
            ⚠️ Kies minstens één soort puzzel
          </p>
        )}
      </div>

      {/* Niveau */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 sm:p-7 border-2 border-green-100">
        <h3 className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg font-bold text-gray-700 mb-4 sm:mb-6">
          <span className="text-xl sm:text-2xl">📊</span> Niveau
        </h3>

        {puzzelOps.sudoku && (
          <>
            <p className="text-sm font-medium text-gray-600 mb-2">🔢 Sudoku:</p>
            <div className="space-y-1.5 mb-4">
              {[
                { key: 'easy', label: 'Makkelijk', desc: '4×4 rooster' },
                { key: 'medium', label: 'Gemiddeld', desc: '6×6 rooster' },
                { key: 'hard', label: 'Moeilijk', desc: '9×9 rooster' },
              ].map(({ key, label, desc }) => (
                <label
                  key={key}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all text-sm ${
                    puzzleLevel.sudoku === key
                      ? 'bg-violet-500 text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-violet-50 border border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="sudokuLevel"
                    value={key}
                    checked={puzzleLevel.sudoku === key}
                    onChange={() => dispatch({ type: 'SET_PUZZLE_LEVEL', key: 'sudoku', value: key })}
                    className="sr-only"
                  />
                  <div>
                    <span className="font-medium">{label}</span>
                    <span className={`ml-2 text-xs ${puzzleLevel.sudoku === key ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
                  </div>
                  {puzzleLevel.sudoku === key && <span>✓</span>}
                </label>
              ))}
            </div>
          </>
        )}

        {puzzelOps.tectonic && (
          <>
            <p className={`text-sm font-medium text-gray-600 mb-2 ${puzzelOps.sudoku ? 'mt-4 pt-4 border-t border-gray-300' : ''}`}>🧱 Tectonic:</p>
            <div className="space-y-1.5 mb-4">
              {[
                { key: 'easy', label: 'Makkelijk', desc: '4×4 rooster' },
                { key: 'medium', label: 'Gemiddeld', desc: '5×5 rooster' },
                { key: 'hard', label: 'Moeilijk', desc: '6×6 rooster' },
              ].map(({ key, label, desc }) => (
                <label
                  key={key}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all text-sm ${
                    puzzleLevel.tectonic === key
                      ? 'bg-violet-500 text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-violet-50 border border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="tectonicLevel"
                    value={key}
                    checked={puzzleLevel.tectonic === key}
                    onChange={() => dispatch({ type: 'SET_PUZZLE_LEVEL', key: 'tectonic', value: key })}
                    className="sr-only"
                  />
                  <div>
                    <span className="font-medium">{label}</span>
                    <span className={`ml-2 text-xs ${puzzleLevel.tectonic === key ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
                  </div>
                  {puzzleLevel.tectonic === key && <span>✓</span>}
                </label>
              ))}
            </div>
          </>
        )}

        {puzzelOps.binary && (
          <>
            <p className={`text-sm font-medium text-gray-600 mb-2 ${puzzelOps.sudoku || puzzelOps.tectonic ? 'mt-4 pt-4 border-t border-gray-300' : ''}`}>0️⃣ Binair:</p>
            <div className="space-y-1.5">
              {[
                { key: 'easy', label: 'Makkelijk', desc: '6×6 rooster' },
                { key: 'medium', label: 'Gemiddeld', desc: '8×8 rooster' },
                { key: 'hard', label: 'Moeilijk', desc: '10×10 rooster' },
              ].map(({ key, label, desc }) => (
                <label
                  key={key}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all text-sm ${
                    puzzleLevel.binary === key
                      ? 'bg-violet-500 text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-violet-50 border border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="binaryLevel"
                    value={key}
                    checked={puzzleLevel.binary === key}
                    onChange={() => dispatch({ type: 'SET_PUZZLE_LEVEL', key: 'binary', value: key })}
                    className="sr-only"
                  />
                  <div>
                    <span className="font-medium">{label}</span>
                    <span className={`ml-2 text-xs ${puzzleLevel.binary === key ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
                  </div>
                  {puzzleLevel.binary === key && <span>✓</span>}
                </label>
              ))}
            </div>
          </>
        )}

        {puzzelOps.chess && (
          <>
            <p className={`text-sm font-medium text-gray-600 mb-2 ${puzzelOps.sudoku || puzzelOps.tectonic || puzzelOps.binary ? 'mt-4 pt-4 border-t border-gray-300' : ''}`}>♟️ Schaken:</p>
            <div className="space-y-1.5">
              {[
                { key: 'easy', label: 'Schaakmat in 1', desc: '1 zet' },
                { key: 'medium', label: 'Schaakmat in 2', desc: '2 zetten' },
                { key: 'hard', label: 'Schaakmat in 3', desc: '3 zetten' },
              ].map(({ key, label, desc }) => (
                <label
                  key={key}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all text-sm ${
                    puzzleLevel.chess === key
                      ? 'bg-violet-500 text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-violet-50 border border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="chessLevel"
                    value={key}
                    checked={puzzleLevel.chess === key}
                    onChange={() => dispatch({ type: 'SET_PUZZLE_LEVEL', key: 'chess', value: key })}
                    className="sr-only"
                  />
                  <div>
                    <span className="font-medium">{label}</span>
                    <span className={`ml-2 text-xs ${puzzleLevel.chess === key ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
                  </div>
                  {puzzleLevel.chess === key && <span>✓</span>}
                </label>
              ))}
            </div>
          </>
        )}

        {!puzzelOps.sudoku && !puzzelOps.tectonic && !puzzelOps.binary && !puzzelOps.chess && (
          <p className="text-sm text-gray-500 italic">Kies eerst een soort puzzel om niveau-opties te zien</p>
        )}
      </div>
    </>
  );
}
