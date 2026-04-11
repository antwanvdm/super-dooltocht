export default function VerkeerPanel({ settings, dispatch }) {
  const { verkeerOps, verkeerLevel } = settings;

  const levelSections = [
    {
      key: 'borden',
      show: verkeerOps.borden,
      icon: '🪧',
      label: 'Verkeersborden:',
      options: [
        { key: 'easy', label: 'Makkelijk', desc: 'Basisborden: vormen & kleuren' },
        { key: 'medium', label: 'Gemiddeld', desc: 'Voorrangsborden, haaietanden, snelheid' },
      ],
    },
    {
      key: 'regels',
      show: verkeerOps.regels,
      icon: '📋',
      label: 'Verkeersregels:',
      options: [
        { key: 'easy', label: 'Makkelijk', desc: 'Stoplicht, zebrapad, fietsregels' },
        { key: 'medium', label: 'Gemiddeld', desc: 'Voorrang, rotondes, complexe situaties' },
      ],
    },
  ];

  const visibleSections = levelSections.filter(s => s.show);

  return (
    <>
      {/* Soort oefening */}
      <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-4 sm:p-7 border-2 border-sky-100">
        <h3 className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg font-bold text-gray-700 mb-4 sm:mb-6">
          <span className="text-xl sm:text-2xl">🚲</span> Soort oefening
        </h3>
        <div className="space-y-3 sm:space-y-4">
          {[
            { key: 'borden', label: 'Verkeersborden', icon: '🪧', desc: 'Herken borden en hun betekenis' },
            { key: 'regels', label: 'Verkeersregels', icon: '📋', desc: 'Stoplicht, voorrang, fietsen' },
          ].map(({ key, label, icon, desc }) => (
            <label
              key={key}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                verkeerOps[key]
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-sky-50 border border-gray-200'
              }`}
            >
              <input
                type="checkbox"
                checked={verkeerOps[key]}
                onChange={() => dispatch({ type: 'TOGGLE_VERKEER_OPS', key })}
                className="sr-only"
              />
              <span className="text-xl">{icon}</span>
              <div className="min-w-0">
                <span className="font-semibold">{label}</span>
                <span className={`block text-xs mt-0.5 ${verkeerOps[key] ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
              </div>
              {verkeerOps[key] && <span className="ml-auto text-xl">✓</span>}
            </label>
          ))}
        </div>
        {!verkeerOps.borden && !verkeerOps.regels && (
          <p className="mt-4 text-sm text-red-500 font-medium text-center">
            ⚠️ Kies minstens één soort oefening
          </p>
        )}
      </div>

      {/* Niveau */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 sm:p-7 border-2 border-green-100">
        <h3 className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg font-bold text-gray-700 mb-4 sm:mb-6">
          <span className="text-xl sm:text-2xl">📊</span> Niveau
        </h3>

        {visibleSections.length === 0 && (
          <p className="text-sm text-gray-500 text-center">Selecteer een oefening om het niveau in te stellen</p>
        )}

        {visibleSections.map((section, idx) => (
          <div key={section.key}>
            <p className={`text-sm font-medium text-gray-600 mb-2 ${idx > 0 ? 'mt-4 pt-4 border-t border-gray-300' : ''}`}>
              {section.icon} {section.label}
            </p>
            <div className="space-y-1.5">
              {section.options.map(({ key, label, desc }) => (
                <label
                  key={key}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all text-sm ${
                    verkeerLevel[section.key] === key
                      ? 'bg-sky-500 text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-sky-50 border border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name={`verkeer-${section.key}-level`}
                    value={key}
                    checked={verkeerLevel[section.key] === key}
                    onChange={() => dispatch({ type: 'SET_VERKEER_LEVEL', key: section.key, value: key })}
                    className="sr-only"
                  />
                  <div>
                    <span className="font-medium">{label}</span>
                    <span className={`ml-2 text-xs ${verkeerLevel[section.key] === key ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
                  </div>
                  {verkeerLevel[section.key] === key && <span>✓</span>}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
