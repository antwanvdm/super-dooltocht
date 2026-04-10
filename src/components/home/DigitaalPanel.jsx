export default function DigitaalPanel({ settings, dispatch }) {
  const { digitaalOps } = settings;

  return (
    <>
      {/* Soort oefening */}
      <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-4 sm:p-7 border-2 border-slate-200">
        <h3 className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg font-bold text-gray-700 mb-4 sm:mb-6">
          <span className="text-xl sm:text-2xl">💻</span> Soort oefening
        </h3>
        <div className="space-y-3 sm:space-y-4">
          {[
            { key: 'computerkennis', label: 'Computerkennis', icon: '🖥️', desc: 'Leer computertermen en begrippen' },
            { key: 'veiligheid', label: 'Online veiligheid', icon: '🔒', desc: 'Veilig omgaan met internet' },
            { key: 'mediawijsheid', label: 'Mediawijsheid', icon: '📱', desc: 'Kritisch kijken naar media en reclame' },
          ].map(({ key, label, icon, desc }) => (
            <label
              key={key}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                digitaalOps[key]
                  ? 'bg-slate-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-slate-50 border border-gray-200'
              }`}
            >
              <input
                type="checkbox"
                checked={digitaalOps[key]}
                onChange={() => dispatch({ type: 'TOGGLE_DIGITAAL_OPS', key })}
                className="sr-only"
              />
              <span className="text-xl">{icon}</span>
              <div className="min-w-0">
                <span className="font-semibold">{label}</span>
                <span className={`block text-xs mt-0.5 ${digitaalOps[key] ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
              </div>
              {digitaalOps[key] && <span className="ml-auto text-xl">✓</span>}
            </label>
          ))}
        </div>
        {!digitaalOps.computerkennis && !digitaalOps.veiligheid && !digitaalOps.mediawijsheid && (
          <p className="mt-4 text-sm text-red-500 font-medium text-center">
            ⚠️ Kies minstens één soort oefening
          </p>
        )}
      </div>

      {/* Info section instead of level */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 sm:p-7 border-2 border-blue-100">
        <h3 className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg font-bold text-gray-700 mb-4 sm:mb-6">
          <span className="text-xl sm:text-2xl">ℹ️</span> Over deze categorie
        </h3>
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-start gap-2">
            <span className="text-lg">🖥️</span>
            <p><strong>Computerkennis:</strong> Leer woorden als browser, wifi, downloaden en meer.</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-lg">🔒</span>
            <p><strong>Online veiligheid:</strong> Wat doe je als iemand om je wachtwoord vraagt? Leer veilig internetten.</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-lg">📱</span>
            <p><strong>Mediawijsheid:</strong> Is alles op internet waar? Leer kritisch nadenken over wat je ziet.</p>
          </div>
        </div>
      </div>
    </>
  );
}
