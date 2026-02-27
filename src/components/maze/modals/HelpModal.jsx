function HelpModal({ mazeConfig, theme, onClose, isMultiFloor = false }) {
  return (
    <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-full sm:max-w-lg max-h-[90vh] flex flex-col relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-xl sm:text-2xl hover:scale-110 transition-transform z-10"
        >
          ❌
        </button>
        <div className="p-4 sm:p-6 pt-3 sm:pt-4 overflow-y-auto">
          <div className="text-center text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">❓ Hoe werkt het?</div>
          <div className="space-y-3 sm:space-y-3 sm:space-y-4">
            <div className="bg-blue-50 rounded-xl p-3 sm:p-4">
              <h4 className="font-bold text-blue-800 mb-1 sm:mb-2 text-sm sm:text-base">⌨️ Bewegen</h4>
              <p className="text-blue-700 text-xs sm:text-sm">Gebruik de <strong>pijltjestoetsen</strong> op je toetsenbord om door het doolhof te lopen. Houd een toets ingedrukt om snel te bewegen!</p>
              <p className="text-blue-700 text-xs sm:text-sm mt-2">Op een <strong>mobiel of tablet</strong> gebruik je de <strong>🎮 besturing</strong> rechtsonder in beeld.</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-3 sm:p-4">
              <h4 className="font-bold text-amber-800 mb-1 sm:mb-2 text-sm sm:text-base">🔑 Sleutel & Uitdagingen</h4>
              <p className="text-amber-700 text-xs sm:text-sm">Vind alle <strong>{mazeConfig.challenges} uitdagingen</strong> ({theme.colors.challenge}) en los de uitdagingen op. Elke uitdaging geeft een stukje sleutel. Met een complete sleutel kun je door de deur!</p>
            </div>
            <div className="bg-green-50 rounded-xl p-3 sm:p-4">
              <h4 className="font-bold text-green-800 mb-1 sm:mb-2 text-sm sm:text-base">🤝 Vriendjes redden</h4>
              <p className="text-green-700 text-xs sm:text-sm">Er zijn <strong>{mazeConfig.friendlies} verdwaalde vriendjes</strong> in het doolhof. Vind ze en neem ze mee naar de uitgang om ze te redden!</p>
            </div>
            {isMultiFloor && (
              <div className="bg-indigo-50 rounded-xl p-3 sm:p-4">
                <h4 className="font-bold text-indigo-800 mb-1 sm:mb-2 text-sm sm:text-base">🪜 Verdiepingen & Trappen</h4>
                <p className="text-indigo-700 text-xs sm:text-sm">Dit doolhof heeft een <strong>benedenverdieping</strong> en een <strong>bovenverdieping</strong>! Loop op een <strong>🪜 trap</strong> om naar de andere verdieping te gaan. Trappen werken in beide richtingen.</p>
                <p className="text-indigo-700 text-xs sm:text-sm mt-1">Uitdagingen en vriendjes zijn verdeeld over beide verdiepingen. De <strong>🚪 uitgang</strong> is beneden.</p>
              </div>
            )}
            <div className="bg-purple-50 rounded-xl p-3 sm:p-4">
              <h4 className="font-bold text-purple-800 mb-1 sm:mb-2 text-sm sm:text-base">🗺️ Hulpmiddelen</h4>
              <p className="text-purple-700 text-xs sm:text-sm">Druk op <strong>K</strong> voor kaart, <strong>H</strong> voor help, <strong>S</strong> voor speler-info, en <strong>ESC</strong> om vensters te sluiten.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-full mt-4 sm:mt-6 px-4 py-2 sm:py-3 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-lg transition-colors text-sm sm:text-base"
          >
            👍 Begrepen!
          </button>
        </div>
      </div>
    </div>
  );
}

export default HelpModal;
