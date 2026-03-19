export default function RekenPanel({ settings, dispatch, set, canStart }) {
  const {
    ops, maxValue, mulTables, addSubMode, beyondDigits,
    placeValueLevel, moneyMaxAmount, moneyIncludeCents, fractionLevel,
  } = settings;

  return (
    <>
      {/* Soort oefening */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 sm:p-7 border-2 border-blue-100">
        <h3 className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg font-bold text-gray-700 mb-4 sm:mb-6">
          <span className="text-xl sm:text-2xl">🔢</span> Soort oefening
        </h3>
        <div className="space-y-3 sm:space-y-4">
          {[
            { key: 'add', label: 'Plussommen', icon: '➕' },
            { key: 'sub', label: 'Minsommen', icon: '➖' },
            { key: 'mul', label: 'Keersommen', icon: '✖️' },
            { key: 'div', label: 'Deelsommen', icon: '➗' },
            { key: 'fractions', label: 'Breuken', icon: '🍕' },
            { key: 'lovingHearts', label: 'Verliefde harten', icon: '💕' },
            { key: 'placeValue', label: 'Getallen begrijpen', icon: '🧮' },
            { key: 'money', label: 'Rekenen met geld', icon: '💶' },
          ].map(({ key, label, icon }) => (
            <label
              key={key}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                ops[key]
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
              }`}
            >
              <input
                type="checkbox"
                checked={ops[key]}
                onChange={() => dispatch({ type: 'TOGGLE_OPS', key })}
                className="sr-only"
              />
              <span className="text-xl">{icon}</span>
              <span className="font-semibold">{label}</span>
              {ops[key] && <span className="ml-auto text-xl">✓</span>}
            </label>
          ))}
        </div>
        {!canStart && (
          <p className="mt-4 text-sm text-red-500 font-medium text-center">
            ⚠️ Kies minstens één soort oefening
          </p>
        )}
      </div>

      {/* Niveau */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-7 border-2 border-green-100">
        <h3 className="flex items-center gap-3 text-lg font-bold text-gray-700 mb-6">
          <span className="text-2xl">📊</span> Niveau
        </h3>

        {/* Plus/Min niveau */}
        {(ops.add || ops.sub) && (
          <>
            <p className="text-sm font-medium text-gray-600 mb-3">{ops.add && ops.sub ? '➕➖' : ops.add ? '➕' : '➖'} {ops.add && ops.sub ? 'Plus- & minsommen' : ops.add ? 'Plussommen' : 'Minsommen'} tot:</p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[20, 50, 100, 200, 500, 1000].map((val) => (
                <label
                  key={val}
                  className={`flex items-center justify-center p-2 rounded-xl cursor-pointer transition-all font-bold text-sm ${
                    Number(maxValue) === val
                      ? 'bg-green-500 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-green-50 border border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="level"
                    value={val}
                    checked={Number(maxValue) === val}
                    onChange={(e) => set('maxValue', Number(e.target.value))}
                    className="sr-only"
                  />
                  {val}
                </label>
              ))}
            </div>

            {/* Binnen/Buiten tiental */}
            <p className="text-sm font-medium text-gray-600 mb-2">Binnen of buiten het tiental:</p>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {[
                { key: 'within', label: 'Binnen tiental', desc: '45+4, 56-3' },
                { key: 'beyond', label: 'Over tiental', desc: '47+5, 52-8' },
              ].map(({ key, label, desc }) => (
                <label
                  key={key}
                  className={`flex flex-col p-2 rounded-lg cursor-pointer transition-all text-sm ${
                    addSubMode === key
                      ? 'bg-teal-500 text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-teal-50 border border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="addSubMode"
                    value={key}
                    checked={addSubMode === key}
                    onChange={(e) => set('addSubMode', e.target.value)}
                    className="sr-only"
                  />
                  <span className="font-medium">{label}</span>
                  <span className={`text-xs ${addSubMode === key ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
                </label>
              ))}
            </div>

            {/* Opties voor buiten het tiental */}
            {addSubMode === 'beyond' && (
              <>
                <p className="text-sm font-medium text-gray-600 mb-2">Rekenen met:</p>
                <div className="space-y-2">
                  {[
                    { key: 'units', label: 'Alleen eenheden', desc: '78+3, 61-9' },
                    { key: 'tens', label: 'Met tientallen', desc: '78+13, 61-39' },
                    ...(maxValue >= 200 ? [{ key: 'hundreds', label: 'Met honderdtallen', desc: '178+123, 461-239' }] : []),
                  ].map(({ key, label, desc }) => (
                    <label
                      key={key}
                      className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all text-sm ${
                        beyondDigits === key
                          ? 'bg-cyan-500 text-white shadow-sm'
                          : 'bg-white text-gray-700 hover:bg-cyan-50 border border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="beyondDigits"
                        value={key}
                        checked={beyondDigits === key}
                        onChange={(e) => set('beyondDigits', e.target.value)}
                        className="sr-only"
                      />
                      <div>
                        <span className="font-medium">{label}</span>
                        <span className={`ml-2 text-xs ${beyondDigits === key ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
                      </div>
                      {beyondDigits === key && <span>✓</span>}
                    </label>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* Tafel selectie */}
        {(ops.mul || ops.div) && (
          <>
            <p className={`text-sm font-medium text-gray-600 mb-3 ${(ops.add || ops.sub) ? 'mt-4 pt-4 border-t border-gray-300' : ''}`}>{ops.mul && ops.div ? '✖️➗' : ops.mul ? '✖️' : '➗'} {ops.mul && ops.div ? 'Keer- & deelsommen' : ops.mul ? 'Keersommen' : 'Deelsommen'} tafels:</p>
            <div className="space-y-2">
              {[
                { key: 'easy', label: 'Tafels van 1, 2, 5, 10' },
                { key: 'medium', label: 'Tafels van 3, 4, 6, 7, 8, 9' },
                { key: 'all', label: 'Tafels van 1 t/m 10' },
                { key: 'hard', label: 'Tafels van 11 en 12' },
                { key: 'expert', label: 'Tafels van 13 t/m 20' },
                { key: 'allplus', label: 'Tafels van 1 t/m 20' },
              ].map(({ key, label }) => (
                <label
                  key={key}
                  className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all text-sm ${
                    mulTables === key
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="mulTables"
                    value={key}
                    checked={mulTables === key}
                    onChange={(e) => set('mulTables', e.target.value)}
                    className="sr-only"
                  />
                  <span className="font-medium">{label}</span>
                  {mulTables === key && <span className="ml-auto">✓</span>}
                </label>
              ))}
            </div>
          </>
        )}

        {/* Breuken niveau */}
        {ops.fractions && (
          <>
            <p className={`text-sm font-medium text-gray-600 mb-2 ${(ops.add || ops.sub || ops.mul || ops.div) ? 'mt-4 pt-4 border-t border-gray-300' : ''}`}>🍕 Breuken — niveau:</p>
            <div className="space-y-1.5 mb-3">
              {[
                { key: 'easy', label: 'Makkelijk', desc: 'Herkennen en vergelijken (noemers 2-4)' },
                { key: 'medium', label: 'Gemiddeld', desc: '+ vereenvoudigen (noemers 2-6)' },
                { key: 'hard', label: 'Moeilijk', desc: '+ gelijkwaardig (noemers 2-8)' },
              ].map(({ key, label, desc }) => (
                <label
                  key={key}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all text-sm ${
                    fractionLevel === key
                      ? 'bg-indigo-500 text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-indigo-50 border border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="fractionLevel"
                    value={key}
                    checked={fractionLevel === key}
                    onChange={(e) => set('fractionLevel', e.target.value)}
                    className="sr-only"
                  />
                  <div>
                    <span className="font-medium">{label}</span>
                    <span className={`ml-2 text-xs ${fractionLevel === key ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
                  </div>
                  {fractionLevel === key && <span>✓</span>}
                </label>
              ))}
            </div>
          </>
        )}

        {/* Verliefde harten heeft geen extra niveau opties */}
        {ops.lovingHearts && (
          <p className={`text-sm text-gray-500 italic ${(ops.add || ops.sub || ops.mul || ops.div || ops.fractions) ? 'mt-4 pt-4 border-t border-gray-300' : ''}`}>💕 Verliefde harten: oefen getallenparen die samen 10 maken</p>
        )}

        {/* Getallen begrijpen niveau */}
        {ops.placeValue && (
          <>
            <p className={`text-sm font-medium text-gray-600 mb-3 ${(ops.add || ops.sub || ops.mul || ops.div || ops.fractions || ops.lovingHearts) ? 'mt-4 pt-4 border-t border-gray-300' : ''}`}>🧮 Getallen begrijpen niveau:</p>
            <div className="space-y-2">
              {[
                { key: 'tens', label: 'Tientallen', desc: 'Getallen 10-99' },
                { key: 'hundreds', label: 'Honderdtallen', desc: 'Getallen 100-999' },
                { key: 'thousands', label: 'Duizendtallen', desc: 'Getallen 1000-9999' },
              ].map(({ key, label, desc }) => (
                <label
                  key={key}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all text-sm ${
                    placeValueLevel === key
                      ? 'bg-purple-500 text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-purple-50 border border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="placeValueLevel"
                    value={key}
                    checked={placeValueLevel === key}
                    onChange={(e) => set('placeValueLevel', e.target.value)}
                    className="sr-only"
                  />
                  <div>
                    <span className="font-medium">{label}</span>
                    <span className={`ml-2 text-xs ${placeValueLevel === key ? 'text-white/80' : 'text-gray-500'}`}>{desc}</span>
                  </div>
                  {placeValueLevel === key && <span>✓</span>}
                </label>
              ))}
            </div>
          </>
        )}

        {/* Geld instellingen */}
        {ops.money && (
          <>
            <p className={`text-sm font-medium text-gray-600 mb-3 ${(ops.add || ops.sub || ops.mul || ops.div || ops.fractions || ops.lovingHearts || ops.placeValue) ? 'mt-4 pt-4 border-t border-gray-300' : ''}`}>💶 Rekenen met geld:</p>

            <p className="text-xs text-gray-500 mb-2">Bedrag tot:</p>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {[
                { key: 2000, label: 'Tot €20' },
                { key: 10000, label: 'Tot €100' },
                { key: 50000, label: 'Tot €500' },
                { key: 100000, label: 'Tot €1000' },
              ].map(({ key, label }) => (
                <label
                  key={key}
                  className={`flex items-center justify-center p-2 rounded-lg cursor-pointer transition-all text-sm ${
                    moneyMaxAmount === key
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="moneyMaxAmount"
                    value={key}
                    checked={moneyMaxAmount === key}
                    onChange={(e) => set('moneyMaxAmount', Number(e.target.value))}
                    className="sr-only"
                  />
                  <span className="font-medium">{label}</span>
                </label>
              ))}
            </div>

            <label
              className={`flex items-center justify-center gap-3 p-2 rounded-lg cursor-pointer transition-all text-sm ${
                moneyIncludeCents
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-amber-50 border border-gray-200'
              }`}
            >
              <input
                type="checkbox"
                checked={moneyIncludeCents}
                onChange={() => set('moneyIncludeCents', !moneyIncludeCents)}
                className="sr-only"
              />
              <span className="font-medium">Met centen (5c, 10c, 20c, 50c)</span>
              {moneyIncludeCents && <span>✓</span>}
            </label>
          </>
        )}

        {/* Geen opties geselecteerd */}
        {!ops.add && !ops.sub && !ops.mul && !ops.div && !ops.placeValue && !ops.lovingHearts && !ops.money && !ops.fractions && (
          <p className="text-sm text-gray-500 italic">Kies eerst een soort som om niveau-opties te zien</p>
        )}
      </div>
    </>
  );
}
