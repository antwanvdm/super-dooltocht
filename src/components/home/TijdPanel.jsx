export default function TijdPanel({ settings, dispatch, set }) {
  const {
    tijdOps, clockLevel, clock24h, clockWords,
    timeAwarenessDagen, timeAwarenessMaanden, timeAwarenessSeizoen,
    timeCalcLevel, timeCalc24h,
  } = settings;

  return (
    <>
      {/* Soort oefening */}
      <div className="bg-gradient-to-br from-sky-50 to-cyan-50 rounded-2xl p-4 sm:p-7 border-2 border-sky-100">
        <h3 className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg font-bold text-gray-700 mb-4 sm:mb-6">
          <span className="text-xl sm:text-2xl">⏰</span> Soort oefening
        </h3>
        <div className="space-y-3 sm:space-y-4">
          {[
            { key: 'clock', label: 'Klokkijken', icon: '🕐', desc: 'Analoge en digitale klok aflezen' },
            { key: 'timeAwareness', label: 'Tijdsbesef', icon: '📅', desc: 'Dagen, maanden en seizoenen' },
            { key: 'timeCalculation', label: 'Rekenen met tijd', icon: '⏱️', desc: 'Tijd optellen, aftrekken en omrekenen' },
          ].map(({ key, label, icon, desc }) => (
            <label
              key={key}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                tijdOps[key]
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-sky-50 border border-gray-200'
              }`}
            >
              <input
                type="checkbox"
                checked={tijdOps[key]}
                onChange={() => dispatch({ type: 'TOGGLE_TIJD_OPS', key })}
                className="sr-only"
              />
              <span className="text-xl">{icon}</span>
              <div className="min-w-0">
                <span className="font-semibold">{label}</span>
                <span className={`block text-xs mt-0.5 ${tijdOps[key] ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
              </div>
              {tijdOps[key] && <span className="ml-auto text-xl">✓</span>}
            </label>
          ))}
        </div>
        {!tijdOps.clock && !tijdOps.timeAwareness && !tijdOps.timeCalculation && (
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

        {/* Klokkijken niveau */}
        {tijdOps.clock && (
          <>
            <p className="text-sm font-medium text-gray-600 mb-3">🕐 Klokkijken niveau:</p>
            <div className="space-y-2 mb-3">
              {[
                { key: 'hours', label: 'Hele uren', desc: '03:00, 07:00' },
                { key: 'halfHours', label: 'Halve uren', desc: '03:00, 03:30' },
                { key: 'quarters', label: 'Kwartieren', desc: '03:00, 03:15, 03:30, 03:45' },
                { key: 'fiveMinutes', label: '5 minuten', desc: '03:05, 03:10, 03:25...' },
                { key: 'minutes', label: '1 minuut', desc: '03:07, 03:42...' },
              ].map(({ key, label, desc }) => (
                <label
                  key={key}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all text-sm ${
                    clockLevel === key
                      ? 'bg-green-500 text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-green-50 border border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="clockLevel"
                    value={key}
                    checked={clockLevel === key}
                    onChange={(e) => set('clockLevel', e.target.value)}
                    className="sr-only"
                  />
                  <div>
                    <span className="font-medium">{label}</span>
                    <span className={`ml-2 text-xs ${clockLevel === key ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
                  </div>
                  {clockLevel === key && <span>✓</span>}
                </label>
              ))}
            </div>

            <p className="text-sm font-medium text-gray-600 mb-2 mt-3">Extra opties:</p>
            <div className="space-y-1.5 mb-3">
              <label
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all text-sm ${
                  clockWords
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-sky-50 border border-gray-200'
                }`}
              >
                <input
                  type="checkbox"
                  checked={clockWords}
                  onChange={() => set('clockWords', !clockWords)}
                  className="sr-only"
                />
                <div>
                  <span className="font-medium">💬 Woorden</span>
                  <span className={`block text-xs mt-0.5 ${clockWords ? 'text-white/80' : 'text-gray-500'}`}>Kwart over drie, half vijf</span>
                </div>
                {clockWords && <span className="ml-auto">✓</span>}
              </label>
              <label
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all text-sm ${
                  clock24h
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-sky-50 border border-gray-200'
                }`}
              >
                <input
                  type="checkbox"
                  checked={clock24h}
                  onChange={() => set('clock24h', !clock24h)}
                  className="sr-only"
                />
                <div>
                  <span className="font-medium">🔄 24-uurs notatie</span>
                  <span className={`block text-xs mt-0.5 ${clock24h ? 'text-white/80' : 'text-gray-500'}`}>05:45 → 17:45</span>
                </div>
                {clock24h && <span className="ml-auto">✓</span>}
              </label>
            </div>
          </>
        )}

        {/* Tijdsbesef opties */}
        {tijdOps.timeAwareness && (
          <>
            <p className={`text-sm font-medium text-gray-600 mb-3 ${tijdOps.clock ? 'mt-4 pt-4 border-t border-gray-300' : ''}`}>📅 Tijdsbesef onderwerpen:</p>
            <div className="space-y-1.5">
              {[
                { key: 'dagen', label: '📅 Dagen van de week', desc: 'Volgorde, gisteren/morgen', checked: timeAwarenessDagen, onChange: () => set('timeAwarenessDagen', !timeAwarenessDagen) },
                { key: 'maanden', label: '🗓️ Maanden van het jaar', desc: 'Volgorde, aantal dagen', checked: timeAwarenessMaanden, onChange: () => set('timeAwarenessMaanden', !timeAwarenessMaanden) },
                { key: 'seizoenen', label: '🌿 Seizoenen', desc: 'Volgorde, kenmerken', checked: timeAwarenessSeizoen, onChange: () => set('timeAwarenessSeizoen', !timeAwarenessSeizoen) },
              ].map(({ key, label, desc, checked, onChange }) => (
                <label
                  key={key}
                  className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all text-sm ${
                    checked
                      ? 'bg-cyan-500 text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-cyan-50 border border-gray-200'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="sr-only"
                  />
                  <div>
                    <span className="font-medium">{label}</span>
                    <span className={`block text-xs mt-0.5 ${checked ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
                  </div>
                  {checked && <span className="ml-auto">✓</span>}
                </label>
              ))}
            </div>
            {!timeAwarenessDagen && !timeAwarenessMaanden && !timeAwarenessSeizoen && (
              <p className="text-xs text-red-500 mt-2">Kies minstens één onderwerp</p>
            )}
          </>
        )}

        {/* Rekenen met tijd niveau */}
        {tijdOps.timeCalculation && (
          <>
            <p className={`text-sm font-medium text-gray-600 mb-3 ${tijdOps.clock || tijdOps.timeAwareness ? 'mt-4 pt-4 border-t border-gray-300' : ''}`}>⏱️ Rekenen met tijd niveau:</p>
            <div className="space-y-1.5">
              {[
                { key: 'wholeHours', label: 'Hele uren', desc: '03:00 + 2 uur' },
                { key: 'halfHours', label: 'Halve uren', desc: '03:30 + 1,5 uur' },
                { key: 'quarters', label: 'Kwartieren', desc: '03:15 + 45 min' },
                { key: 'minutes', label: 'Minuten', desc: '03:22 + 20 min' },
                { key: 'daysWeeks', label: 'Dagen & weken', desc: '2 weken = ... dagen' },
              ].map(({ key, label, desc }) => (
                <label
                  key={key}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all text-sm ${
                    timeCalcLevel === key
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-amber-50 border border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="timeCalcLevel"
                    value={key}
                    checked={timeCalcLevel === key}
                    onChange={(e) => set('timeCalcLevel', e.target.value)}
                    className="sr-only"
                  />
                  <div>
                    <span className="font-medium">{label}</span>
                    <span className={`ml-2 text-xs ${timeCalcLevel === key ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
                  </div>
                  {timeCalcLevel === key && <span>✓</span>}
                </label>
              ))}
            </div>

            {timeCalcLevel !== 'daysWeeks' && (
              <>
                <p className="text-sm font-medium text-gray-600 mb-2 mt-3">Extra optie:</p>
                <label
                  className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all text-sm ${
                    timeCalc24h
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-amber-50 border border-gray-200'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={timeCalc24h}
                    onChange={() => set('timeCalc24h', !timeCalc24h)}
                    className="sr-only"
                  />
                  <div>
                    <span className="font-medium">🔄 24-uurs notatie</span>
                    <span className={`block text-xs mt-0.5 ${timeCalc24h ? 'text-white/80' : 'text-gray-500'}`}>03:00 → 15:00</span>
                  </div>
                  {timeCalc24h && <span className="ml-auto">✓</span>}
                </label>
              </>
            )}
          </>
        )}

        {/* Geen opties geselecteerd */}
        {!tijdOps.clock && !tijdOps.timeAwareness && !tijdOps.timeCalculation && (
          <p className="text-sm text-gray-500 italic">Kies eerst een soort oefening om opties te zien</p>
        )}
      </div>
    </>
  );
}
