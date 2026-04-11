export default function TopografiePanel({ settings, dispatch }) {
  const { topoOps, topoLevel } = settings;

  const levelSections = [
    {
      key: 'nederland',
      show: topoOps.nederland,
      icon: '🇳🇱',
      label: 'Nederland:',
      options: [
        { key: 'easy', label: 'Makkelijk', desc: 'Steden, rivieren, landmarks' },
        { key: 'medium', label: 'Gemiddeld', desc: 'Provincies & hun hoofdsteden' },
      ],
    },
    {
      key: 'europa',
      show: topoOps.europa,
      icon: '🇪🇺',
      label: 'Europa:',
      options: [
        { key: 'easy', label: 'Makkelijk', desc: 'Bekende landen (West- & Zuid-Europa)' },
        { key: 'medium', label: 'Gemiddeld', desc: 'Alle Europese landen' },
      ],
    },
    {
      key: 'wereld',
      show: topoOps.wereld,
      icon: '🌍',
      label: 'De wereld:',
      options: [
        { key: 'easy', label: 'Makkelijk', desc: 'Continenten, oceanen, bekende landen' },
        { key: 'medium', label: 'Gemiddeld', desc: 'Europese hoofdsteden, buurlanden' },
      ],
    },
  ];

  const visibleSections = levelSections.filter(s => s.show);

  return (
    <>
      {/* Soort oefening */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 sm:p-7 border-2 border-amber-100">
        <h3 className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg font-bold text-gray-700 mb-4 sm:mb-6">
          <span className="text-xl sm:text-2xl">🗺️</span> Soort oefening
        </h3>
        <div className="space-y-3 sm:space-y-4">
          {[
            { key: 'nederland', label: 'Nederland', icon: '🇳🇱', desc: 'Steden, rivieren, polders en landmarks' },
            { key: 'europa', label: 'Europa', icon: '🇪🇺', desc: 'Landen van Europa op de kaart' },
            { key: 'wereld', label: 'De wereld', icon: '🌍', desc: 'Continenten, oceanen en landen' },
          ].map(({ key, label, icon, desc }) => (
            <label
              key={key}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                topoOps[key]
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-amber-50 border border-gray-200'
              }`}
            >
              <input
                type="checkbox"
                checked={topoOps[key]}
                onChange={() => dispatch({ type: 'TOGGLE_TOPO_OPS', key })}
                className="sr-only"
              />
              <span className="text-xl">{icon}</span>
              <div className="min-w-0">
                <span className="font-semibold">{label}</span>
                <span className={`block text-xs mt-0.5 ${topoOps[key] ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
              </div>
              {topoOps[key] && <span className="ml-auto text-xl">✓</span>}
            </label>
          ))}
        </div>
        {!topoOps.nederland && !topoOps.europa && !topoOps.wereld && (
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
                    topoLevel[section.key] === key
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-amber-50 border border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name={`topo-${section.key}-level`}
                    value={key}
                    checked={topoLevel[section.key] === key}
                    onChange={() => dispatch({ type: 'SET_TOPO_LEVEL', key: section.key, value: key })}
                    className="sr-only"
                  />
                  <div>
                    <span className="font-medium">{label}</span>
                    <span className={`ml-2 text-xs ${topoLevel[section.key] === key ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
                  </div>
                  {topoLevel[section.key] === key && <span>✓</span>}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
