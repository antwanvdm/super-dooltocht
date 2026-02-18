import { SPELLING_CATEGORIES } from '../../../utils/languageData';

function SettingsModal({ mathSettings, playerEmoji, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-full sm:max-w-2xl max-h-[90vh] flex flex-col relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-xl sm:text-2xl hover:scale-110 transition-transform z-10"
        >
          ❌
        </button>
        <div className="p-4 sm:p-6 pt-3 sm:pt-4 overflow-y-auto">
          <div className="text-center text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
            <span className="text-2xl sm:text-3xl mr-2">{playerEmoji}</span> Speler Keuzes
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {mathSettings.enabledOperations.add && (
              <div className="bg-blue-50 rounded-xl p-4">
                <h4 className="font-bold text-blue-800 mb-2">➕ Optellen</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>Niveau: tot <strong>{mathSettings.maxValue}</strong></p>
                  {mathSettings.addSubMode && (
                    <p>
                      Modus: <strong>
                        {mathSettings.addSubMode === 'within' && 'Binnen tiental'}
                        {mathSettings.addSubMode === 'beyond' && 'Over tiental'}
                      </strong>
                    </p>
                  )}
                  {mathSettings.beyondDigits && mathSettings.addSubMode === 'beyond' && (
                    <p>
                      Cijfers: <strong>
                        {mathSettings.beyondDigits === 'units' && 'Eenheden'}
                        {mathSettings.beyondDigits === 'tens' && 'Met tiental'}
                        {mathSettings.beyondDigits === 'hundreds' && 'Met honderdtal'}
                      </strong>
                    </p>
                  )}
                </div>
              </div>
            )}
            {mathSettings.enabledOperations.sub && (
              <div className="bg-blue-50 rounded-xl p-4">
                <h4 className="font-bold text-blue-800 mb-2">➖ Aftrekken</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>Niveau: tot <strong>{mathSettings.maxValue}</strong></p>
                  {mathSettings.addSubMode && (
                    <p>
                      Modus: <strong>
                        {mathSettings.addSubMode === 'within' && 'Binnen tiental'}
                        {mathSettings.addSubMode === 'beyond' && 'Over tiental'}
                      </strong>
                    </p>
                  )}
                  {mathSettings.beyondDigits && mathSettings.addSubMode === 'beyond' && (
                    <p>
                      Cijfers: <strong>
                        {mathSettings.beyondDigits === 'units' && 'Eenheden'}
                        {mathSettings.beyondDigits === 'tens' && 'Met tiental'}
                        {mathSettings.beyondDigits === 'hundreds' && 'Met honderdtal'}
                      </strong>
                    </p>
                  )}
                </div>
              </div>
            )}
            {mathSettings.enabledOperations.mul && (
              <div className="bg-green-50 rounded-xl p-4">
                <h4 className="font-bold text-green-800 mb-2">✖️ Vermenigvuldigen</h4>
                <p className="text-sm text-green-700">
                  {mathSettings.mulTables === 'easy' && 'Tafels: 1, 2, 5, 10'}
                  {mathSettings.mulTables === 'medium' && 'Tafels: 3, 4, 6, 7, 8, 9'}
                  {mathSettings.mulTables === 'hard' && 'Tafels: 11, 12'}
                  {mathSettings.mulTables === 'expert' && 'Tafels: 13 t/m 20'}
                  {mathSettings.mulTables === 'all' && 'Tafels: 1 t/m 12'}
                  {mathSettings.mulTables === 'allplus' && 'Tafels: 1 t/m 20'}
                </p>
              </div>
            )}
            {mathSettings.enabledOperations.placeValue && (
              <div className="bg-amber-50 rounded-xl p-4">
                <h4 className="font-bold text-amber-800 mb-2">🔢 Getallen begrijpen</h4>
                <p className="text-sm text-amber-700">
                  Niveau: <strong>
                    {mathSettings.placeValueLevel === 'tens' && 'Tientallen'}
                    {mathSettings.placeValueLevel === 'hundreds' && 'Honderdtallen'}
                    {mathSettings.placeValueLevel === 'thousands' && 'Duizendtallen'}
                  </strong>
                </p>
              </div>
            )}
            {mathSettings.enabledOperations.lovingHearts && (
              <div className="bg-pink-50 rounded-xl p-4">
                <h4 className="font-bold text-pink-800 mb-2">💕 Verliefde Harten</h4>
                <p className="text-sm text-pink-700">Hart-getallen tot 10</p>
              </div>
            )}
            {mathSettings.enabledOperations.money && (
              <div className="bg-yellow-50 rounded-xl p-4">
                <h4 className="font-bold text-yellow-800 mb-2">💰 Rekenen met Geld</h4>
                <div className="text-sm text-yellow-700 space-y-1">
                  <p>Bedrag: tot €{(mathSettings.moneyMaxAmount || 2000) / 100}</p>
                  <p>Centen: <strong>{mathSettings.moneyIncludeCents ? 'Ja' : 'Nee'}</strong></p>
                </div>
              </div>
            )}
            {mathSettings.enabledOperations.clock && (
              <div className="bg-indigo-50 rounded-xl p-4">
                <h4 className="font-bold text-indigo-800 mb-2">🕐 Klokkijken</h4>
                <div className="text-sm text-indigo-700 space-y-1">
                  <p>Niveau: <strong>
                    {mathSettings.clockLevel === 'hours' && 'Hele uren'}
                    {mathSettings.clockLevel === 'halfHours' && 'Halve uren'}
                    {mathSettings.clockLevel === 'quarters' && 'Kwartieren'}
                    {mathSettings.clockLevel === 'fiveMinutes' && '5 minuten'}
                    {mathSettings.clockLevel === 'minutes' && '1 minuut'}
                  </strong></p>
                  <p>24-uursklok: <strong>{mathSettings.clock24h ? 'Aan' : 'Uit'}</strong></p>
                  {mathSettings.clockWords && <p>Tijd in woorden: <strong>Aan</strong></p>}
                </div>
              </div>
            )}
            {mathSettings.enabledOperations.timeAwareness && (
              <div className="bg-cyan-50 rounded-xl p-4">
                <h4 className="font-bold text-cyan-800 mb-2">📅 Tijdsbesef</h4>
                <div className="text-sm text-cyan-700 space-y-1">
                  {mathSettings.timeAwarenessDagen && <p>📅 Dagen van de week</p>}
                  {mathSettings.timeAwarenessMaanden && <p>🗓️ Maanden van het jaar</p>}
                  {mathSettings.timeAwarenessSeizoen && <p>🌿 Seizoenen</p>}
                </div>
              </div>
            )}
            {mathSettings.enabledOperations.timeCalculation && (
              <div className="bg-amber-50 rounded-xl p-4">
                <h4 className="font-bold text-amber-800 mb-2">⏱️ Rekenen met tijd</h4>
                <div className="text-sm text-amber-700 space-y-1">
                  <p>Niveau: <strong>
                    {mathSettings.timeCalcLevel === 'wholeHours' && 'Hele uren'}
                    {mathSettings.timeCalcLevel === 'halfHours' && 'Halve uren'}
                    {mathSettings.timeCalcLevel === 'quarters' && 'Kwartieren'}
                    {mathSettings.timeCalcLevel === 'minutes' && 'Minuten'}
                    {mathSettings.timeCalcLevel === 'daysWeeks' && 'Dagen & weken'}
                  </strong></p>
                  {mathSettings.timeCalcLevel !== 'daysWeeks' && <p>24-uursklok: <strong>{mathSettings.timeCalc24h ? 'Aan' : 'Uit'}</strong></p>}
                </div>
              </div>
            )}
            {mathSettings.enabledOperations.spelling && (
              <div className="bg-rose-50 rounded-xl p-4">
                <h4 className="font-bold text-rose-800 mb-2">✏️ Spelling</h4>
                <div className="grid grid-cols-2 gap-1 text-sm text-rose-700">
                  {(mathSettings.spellingCategories || []).map(id => {
                    const cat = SPELLING_CATEGORIES.find(c => c.id === id);
                    return <span key={id}>{cat ? cat.name : `Cat ${id}`}</span>;
                  })}
                </div>
              </div>
            )}
            {mathSettings.enabledOperations.vocabulary && (
              <div className="bg-emerald-50 rounded-xl p-4">
                <h4 className="font-bold text-emerald-800 mb-2">📖 Woordenschat</h4>
                <div className="text-sm text-emerald-700 space-y-1">
                  <p>Themawoorden: <strong>{mathSettings.includeThemeVocabulary ? 'Aan' : 'Uit'}</strong></p>
                </div>
              </div>
            )}
            {mathSettings.enabledOperations.reading && (
              <div className="bg-amber-50 rounded-xl p-4">
                <h4 className="font-bold text-amber-800 mb-2">📚 Begrijpend lezen</h4>
                <div className="text-sm text-amber-700 space-y-1">
                  <p>Niveau: <strong>{mathSettings.readingLevel === 'short' ? 'Korte teksten' : 'Langere teksten'}</strong></p>
                  <p>Themateksten: <strong>{mathSettings.includeThemeReading ? 'Aan' : 'Uit'}</strong></p>
                </div>
              </div>
            )}
            {mathSettings.enabledOperations.english && (
              <div className="bg-blue-50 rounded-xl p-4">
                <h4 className="font-bold text-blue-800 mb-2">🇬🇧 Engels</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>Niveau: <strong>
                    {mathSettings.englishLevel === 'easy' && 'Makkelijk'}
                    {mathSettings.englishLevel === 'medium' && 'Gemiddeld'}
                    {mathSettings.englishLevel === 'hard' && 'Moeilijk'}
                  </strong></p>
                  <p>Richting bij woordspellen: <strong>
                    {mathSettings.englishDirection === 'nl-en' && 'Nederlands → Engels'}
                    {mathSettings.englishDirection === 'en-nl' && 'Engels → Nederlands'}
                    {mathSettings.englishDirection === 'both' && 'Beide richtingen'}
                  </strong></p>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="mt-4 sm:mt-6 w-full px-4 py-2 sm:py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors text-sm sm:text-base"
          >
            🚀 Terug naar het doolhof
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
