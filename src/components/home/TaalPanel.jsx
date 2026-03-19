export default function TaalPanel({ settings, dispatch, set }) {
  const {
    taalOps, spellingCategories, includeThemeVocabulary, includeThemeReading,
    readingLevel, englishLevel, englishDirection, rijmenLevel, woordsoortenLevel,
  } = settings;

  return (
    <>
      {/* Soort oefening */}
      <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-4 sm:p-7 border-2 border-rose-100">
        <h3 className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg font-bold text-gray-700 mb-4 sm:mb-6">
          <span className="text-xl sm:text-2xl">📝</span> Soort oefening
        </h3>
        <div className="space-y-3 sm:space-y-4">
          {[
            { key: 'spelling', label: 'Spelling', icon: '✏️', desc: 'Oefen spellingcategorieën' },
            { key: 'vocabulary', label: 'Woordenschat', icon: '📖', desc: 'Leer de betekenis van woorden' },
            { key: 'reading', label: 'Begrijpend lezen', icon: '📚', desc: 'Lees teksten en beantwoord vragen' },
            { key: 'woordsoorten', label: 'Woordsoorten', icon: '🏷️', desc: 'Oefen verschillende woordsoorten' },
            { key: 'rijmen', label: 'Rijmen', icon: '🎵', desc: 'Herken rijmwoorden' },
            { key: 'english', label: 'Engels', icon: '🇬🇧', desc: 'Leer Engelse woordjes' },
          ].map(({ key, label, icon, desc }) => (
            <label
              key={key}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                taalOps[key]
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-rose-50 border border-gray-200'
              }`}
            >
              <input
                type="checkbox"
                checked={taalOps[key]}
                onChange={() => dispatch({ type: 'TOGGLE_TAAL_OPS', key })}
                className="sr-only"
              />
              <span className="text-xl">{icon}</span>
              <div className="min-w-0">
                <span className="font-semibold">{label}</span>
                <span className={`block text-xs mt-0.5 ${taalOps[key] ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
              </div>
              {taalOps[key] && <span className="ml-auto text-xl">✓</span>}
            </label>
          ))}
        </div>
        {!taalOps.spelling && !taalOps.vocabulary && !taalOps.reading && !taalOps.english && !taalOps.rijmen && !taalOps.woordsoorten && (
          <p className="mt-4 text-sm text-red-500 font-medium text-center">
            ⚠️ Kies minstens één soort oefening
          </p>
        )}
      </div>

      {/* Opties */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 sm:p-7 border-2 border-green-100">
        <h3 className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg font-bold text-gray-700 mb-4 sm:mb-6">
          <span className="text-xl sm:text-2xl">📊</span> Opties
        </h3>

        {/* Spellingcategorieën */}
        {taalOps.spelling && (
          <>
            <p className="text-sm font-medium text-gray-600 mb-3">✏️ Spellingcategorieën:</p>
            <div className="space-y-1.5 mb-4">
              {[
                { id: 1, label: '🔨 Hakwoord', desc: 'kat' },
                { id: 2, label: '🎵 Zingwoord', desc: 'zing' },
                { id: 3, label: '💨 Luchtwoord', desc: 'lucht' },
                { id: 4, label: '🪵 Plankwoord', desc: 'plank' },
                { id: 5, label: '👂 Eer-oor-eur-eel', desc: 'beer, hoor, geur, geel' },
                { id: 6, label: '🌈 Aai-ooi-oei', desc: 'haai, mooi, loei' },
                { id: 7, label: '🦁 Eeuw-ieuw', desc: 'leeuw, nieuw' },
                { id: 8, label: '📏 Langermaakwoord', desc: 'hart, vind' },
                { id: 9, label: '🐣 Verkleinwoord', desc: 'huisje, bloempje' },
                { id: 10, label: '👥 Meervoud', desc: 'katten, auto\'s' },
              ].map(({ id, label, desc }) => {
                const active = spellingCategories.includes(id);
                return (
                  <label
                    key={id}
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all text-sm ${
                      active
                        ? 'bg-rose-500 text-white shadow-sm'
                        : 'bg-white text-gray-700 hover:bg-rose-50 border border-gray-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={() => dispatch({ type: 'TOGGLE_SPELLING_CATEGORY', id })}
                      className="sr-only"
                    />
                    <div>
                      <span className="font-medium">{label}</span>
                      <span className={`ml-2 text-xs ${active ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
                    </div>
                    {active && <span>✓</span>}
                  </label>
                );
              })}
            </div>
            {spellingCategories.length === 0 && (
              <p className="text-xs text-red-500 mb-3">Kies minstens één categorie</p>
            )}
          </>
        )}

        {/* Woordenschat opties */}
        {taalOps.vocabulary && (
          <>
            <p className={`text-sm font-medium text-gray-600 mb-2 ${taalOps.spelling ? 'mt-4 pt-4 border-t border-gray-300' : ''}`}>📖 Woordenschat:</p>
            <label
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all text-sm mb-2 ${
                includeThemeVocabulary
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200'
              }`}
            >
              <input
                type="checkbox"
                checked={includeThemeVocabulary}
                onChange={() => set('includeThemeVocabulary', !includeThemeVocabulary)}
                className="sr-only"
              />
              <div>
                <span className="font-medium">🌍 Woorden van de gekozen wereld</span>
                <span className={`block text-xs mt-0.5 ${includeThemeVocabulary ? 'text-white/80' : 'text-gray-500'}`}>
                  Thema-woorden worden meegenomen naast de algemene woorden
                </span>
              </div>
              {includeThemeVocabulary && <span className="ml-auto">✓</span>}
            </label>
          </>
        )}

        {/* Begrijpend lezen opties */}
        {taalOps.reading && (
          <>
            <p className={`text-sm font-medium text-gray-600 mb-2 ${taalOps.spelling || taalOps.vocabulary ? 'mt-4 pt-4 border-t border-gray-300' : ''}`}>📚 Begrijpend lezen:</p>
            <label
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all text-sm mb-2 ${
                includeThemeReading
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200'
              }`}
            >
              <input
                type="checkbox"
                checked={includeThemeReading}
                onChange={() => set('includeThemeReading', !includeThemeReading)}
                className="sr-only"
              />
              <div>
                <span className="font-medium">🌍 Teksten van de gekozen wereld</span>
                <span className={`block text-xs mt-0.5 ${includeThemeReading ? 'text-white/80' : 'text-gray-500'}`}>
                  Thema-teksten worden meegenomen naast de algemene teksten
                </span>
              </div>
              {includeThemeReading && <span className="ml-auto">✓</span>}
            </label>
            <p className="text-sm font-medium text-gray-600 mb-2 mt-3">Niveau:</p>
            <div className="space-y-2">
              {[
                { key: 'short', label: 'Korte teksten', desc: '1-2 zinnen' },
                { key: 'long', label: 'Langere teksten', desc: '3-4 zinnen' },
              ].map(({ key, label, desc }) => (
                <label
                  key={key}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all text-sm ${
                    readingLevel === key
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-amber-50 border border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="readingLevel"
                    value={key}
                    checked={readingLevel === key}
                    onChange={(e) => set('readingLevel', e.target.value)}
                    className="sr-only"
                  />
                  <div>
                    <span className="font-medium">{label}</span>
                    <span className={`ml-2 text-xs ${readingLevel === key ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
                  </div>
                  {readingLevel === key && <span>✓</span>}
                </label>
              ))}
            </div>
          </>
        )}

        {/* Woordsoorten opties */}
        {taalOps.woordsoorten && (
          <>
            <p className={`text-sm font-medium text-gray-600 mb-2 ${taalOps.spelling || taalOps.vocabulary || taalOps.reading ? 'mt-4 pt-4 border-t border-gray-300' : ''}`}>🏷️ Woordsoorten — niveau:</p>
            <div className="space-y-1.5 mb-3">
              {[
                { key: 'easy', label: 'Makkelijk', desc: 'Zelfst. naamwoord + werkwoord' },
                { key: 'medium', label: 'Gemiddeld', desc: '+ bijvoeglijk naamwoord' },
                { key: 'hard', label: 'Moeilijk', desc: 'Alle woordsoorten, meer woorden' },
              ].map(({ key, label, desc }) => (
                <label
                  key={key}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all text-sm ${
                    woordsoortenLevel === key
                      ? 'bg-rose-500 text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-rose-50 border border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="woordsoortenLevel"
                    value={key}
                    checked={woordsoortenLevel === key}
                    onChange={(e) => set('woordsoortenLevel', e.target.value)}
                    className="sr-only"
                  />
                  <div>
                    <span className="font-medium">{label}</span>
                    <span className={`ml-2 text-xs ${woordsoortenLevel === key ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
                  </div>
                  {woordsoortenLevel === key && <span>✓</span>}
                </label>
              ))}
            </div>
          </>
        )}

        {/* Rijmen opties */}
        {taalOps.rijmen && (
          <>
            <p className={`text-sm font-medium text-gray-600 mb-2 ${taalOps.spelling || taalOps.vocabulary || taalOps.reading || taalOps.woordsoorten ? 'mt-4 pt-4 border-t border-gray-300' : ''}`}>🎵 Rijmen — niveau:</p>
            <div className="space-y-1.5 mb-3">
              {[
                { key: 'easy', label: 'Makkelijk', desc: 'Korte, bekende woorden (groep 3-4)' },
                { key: 'medium', label: 'Gemiddeld', desc: '+ langere woorden (groep 4-5)' },
                { key: 'hard', label: 'Moeilijk', desc: 'Alle woorden (groep 5-6)' },
              ].map(({ key, label, desc }) => (
                <label
                  key={key}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all text-sm ${
                    rijmenLevel === key
                      ? 'bg-rose-500 text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-rose-50 border border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="rijmenLevel"
                    value={key}
                    checked={rijmenLevel === key}
                    onChange={(e) => set('rijmenLevel', e.target.value)}
                    className="sr-only"
                  />
                  <div>
                    <span className="font-medium">{label}</span>
                    <span className={`ml-2 text-xs ${rijmenLevel === key ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
                  </div>
                  {rijmenLevel === key && <span>✓</span>}
                </label>
              ))}
            </div>
          </>
        )}

        {/* Engels opties */}
        {taalOps.english && (
          <>
            <p className={`text-sm font-medium text-gray-600 mb-2 ${taalOps.spelling || taalOps.vocabulary || taalOps.reading || taalOps.woordsoorten || taalOps.rijmen ? 'mt-4 pt-4 border-t border-gray-300' : ''}`}>🇬🇧 Engels:</p>
            <p className="text-xs text-gray-500 mb-2">Niveau:</p>
            <div className="space-y-1.5 mb-3">
              {[
                { key: 'easy', label: 'Makkelijk', desc: 'Kleuren, dieren, fruit, cijfers' },
                { key: 'medium', label: 'Gemiddeld', desc: '+ weer, school, eten, hobby\'s' },
                { key: 'hard', label: 'Moeilijk', desc: '+ gevoelens, beroepen, reizen' },
              ].map(({ key, label, desc }) => (
                <label
                  key={key}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all text-sm ${
                    englishLevel === key
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="englishLevel"
                    value={key}
                    checked={englishLevel === key}
                    onChange={(e) => set('englishLevel', e.target.value)}
                    className="sr-only"
                  />
                  <div>
                    <span className="font-medium">{label}</span>
                    <span className={`ml-2 text-xs ${englishLevel === key ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
                  </div>
                  {englishLevel === key && <span>✓</span>}
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 mb-2">Richting bij woordspellen:</p>
            <div className="space-y-1.5">
              {[
                { key: 'nl-en', label: 'Nederlands → Engels', desc: 'Je ziet het Nederlandse woord' },
                { key: 'en-nl', label: 'Engels → Nederlands', desc: 'Je ziet het Engelse woord' },
                { key: 'both', label: 'Beide richtingen', desc: 'Afwisselend Nederlands of Engels' },
              ].map(({ key, label, desc }) => (
                <label
                  key={key}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all text-sm ${
                    englishDirection === key
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="englishDirection"
                    value={key}
                    checked={englishDirection === key}
                    onChange={(e) => set('englishDirection', e.target.value)}
                    className="sr-only"
                  />
                  <div>
                    <span className="font-medium">{label}</span>
                    <span className={`block text-xs mt-0.5 ${englishDirection === key ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
                  </div>
                  {englishDirection === key && <span>✓</span>}
                </label>
              ))}
            </div>
          </>
        )}

        {/* Geen opties geselecteerd */}
        {!taalOps.spelling && !taalOps.vocabulary && !taalOps.reading && !taalOps.english && !taalOps.rijmen && !taalOps.woordsoorten && (
          <p className="text-sm text-gray-500 italic">Kies eerst een soort oefening om opties te zien</p>
        )}
      </div>
    </>
  );
}
