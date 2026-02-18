function FriendsWarningModal({ friendsWarningModal, theme, modalInteractionReady, onSearchForFriends, onLeaveWithoutFriends }) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl p-4 sm:p-8 w-full max-w-full sm:max-w-lg shadow-2xl text-center relative">
        {!modalInteractionReady && <div className="absolute inset-0 z-10 rounded-2xl" />}
        <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">😢</div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">Wacht even!</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
          {theme.story?.warningLeave || `Er zijn nog ${friendsWarningModal.uncollected.length} verdwaalde vriendjes in het doolhof!`}
        </p>
        <div className="flex justify-center gap-2 mb-4 sm:mb-6">
          {friendsWarningModal.uncollected.map((f, i) => (
            <span key={i} className="text-3xl sm:text-4xl animate-bounce" style={{ animationDelay: `${i * 100}ms` }}>
              {f.emoji}
            </span>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button
            onClick={onSearchForFriends}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors text-sm sm:text-base"
          >
            🔍 Vriendjes zoeken
          </button>
          <button
            onClick={onLeaveWithoutFriends}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-400 hover:bg-gray-500 text-white font-bold rounded-lg transition-colors text-sm sm:text-base"
          >
            🚪 Toch vertrekken
          </button>
        </div>
      </div>
    </div>
  );
}

export default FriendsWarningModal;
