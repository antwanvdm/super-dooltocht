export default function MeetkundePanel({ settings, dispatch }) {
  const { meetkundeOps, meetkundeLevel } = settings;

  const levelSections = [
    {
      key: 'vormen',
      show: meetkundeOps.vormen,
      icon: '🔶',
      label: 'Vormen:',
      options: [
        { key: 'easy', label: 'Makkelijk', desc: 'Basisvormen (driehoek, vierkant, cirkel)' },
        { key: 'medium', label: 'Gemiddeld', desc: 'Meer vormen + 3D (ruit, kubus, kegel…)' },
      ],
    },
    {
      key: 'symmetrie',
      show: meetkundeOps.symmetrie,
      icon: '🪞',
      label: 'Symmetrie:',
      options: [
        { key: 'easy', label: 'Makkelijk', desc: 'Ja/nee: is deze vorm symmetrisch?' },
        { key: 'medium', label: 'Gemiddeld', desc: 'Ook: hoeveel symmetrielijnen?' },
      ],
    },
    {
      key: 'omtrekOppervlakte',
      show: meetkundeOps.omtrekOppervlakte,
      icon: '📏',
      label: 'Omtrek & oppervlakte:',
      options: [
        { key: 'easy', label: 'Makkelijk', desc: 'Ronde getallen, eenvoudige vormen' },
        { key: 'medium', label: 'Gemiddeld', desc: 'Lastigere vormen en berekeningen' },
      ],
    },
    {
      key: 'eenheden',
      show: meetkundeOps.eenheden,
      icon: '⚖️',
      label: 'Eenheden omrekenen:',
      options: [
        { key: 'easy', label: 'Makkelijk', desc: 'Ronde getallen, bekende eenheden' },
        { key: 'medium', label: 'Gemiddeld', desc: 'Lastigere omrekeningen' },
      ],
    },
  ];

  const visibleSections = levelSections.filter(s => s.show);

  return (
    <>
      {/* Soort oefening */}
      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-4 sm:p-7 border-2 border-teal-100">
        <h3 className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg font-bold text-gray-700 mb-4 sm:mb-6">
          <span className="text-xl sm:text-2xl">📐</span> Soort oefening
        </h3>
        <div className="space-y-3 sm:space-y-4">
          {[
            { key: 'vormen', label: 'Vormen', icon: '🔶', desc: 'Herken vormen en hun eigenschappen' },
            { key: 'symmetrie', label: 'Symmetrie', icon: '🪞', desc: 'Symmetrielijnen en spiegeling' },
            { key: 'omtrekOppervlakte', label: 'Omtrek & oppervlakte', icon: '📏', desc: 'Bereken omtrek en oppervlakte' },
            { key: 'eenheden', label: 'Eenheden omrekenen', icon: '⚖️', desc: 'cm/m/km, g/kg, ml/L' },
          ].map(({ key, label, icon, desc }) => (
            <label
              key={key}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                meetkundeOps[key]
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-teal-50 border border-gray-200'
              }`}
            >
              <input
                type="checkbox"
                checked={meetkundeOps[key]}
                onChange={() => dispatch({ type: 'TOGGLE_MEETKUNDE_OPS', key })}
                className="sr-only"
              />
              <span className="text-xl">{icon}</span>
              <div className="min-w-0">
                <span className="font-semibold">{label}</span>
                <span className={`block text-xs mt-0.5 ${meetkundeOps[key] ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
              </div>
              {meetkundeOps[key] && <span className="ml-auto text-xl">✓</span>}
            </label>
          ))}
        </div>
        {!meetkundeOps.vormen && !meetkundeOps.symmetrie && !meetkundeOps.omtrekOppervlakte && !meetkundeOps.eenheden && (
          <p className="mt-4 text-sm text-red-500 font-medium text-center">
            ⚠️ Kies minstens één soort oefening
          </p>
        )}
      </div>

      {/* Niveau – always visible */}
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
                    meetkundeLevel[section.key] === key
                      ? 'bg-teal-500 text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-teal-50 border border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name={`meetkunde-${section.key}-level`}
                    value={key}
                    checked={meetkundeLevel[section.key] === key}
                    onChange={() => dispatch({ type: 'SET_MEETKUNDE_LEVEL', key: section.key, value: key })}
                    className="sr-only"
                  />
                  <div>
                    <span className="font-medium">{label}</span>
                    <span className={`ml-2 text-xs ${meetkundeLevel[section.key] === key ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
                  </div>
                  {meetkundeLevel[section.key] === key && <span>✓</span>}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
