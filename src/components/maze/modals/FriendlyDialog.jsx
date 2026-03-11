function FriendlyDialog({ activeFriendly, theme, modalInteractionReady, onChooseFact, onChoosePuzzle, isPuzzleMode }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className={`${theme.colors.secondary || theme.colors.primary} rounded-3xl shadow-2xl max-w-full sm:max-w-md w-full overflow-hidden relative`}>
        {!modalInteractionReady && <div className="absolute inset-0 z-10 rounded-3xl" />}
        <div className="p-4 sm:p-8 text-center">
          <div className="text-6xl sm:text-8xl mb-3 sm:mb-4 animate-bounce">
            {activeFriendly.emoji}
          </div>
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-inner">
            <p className="text-base sm:text-xl text-gray-800 font-medium leading-relaxed">
              &ldquo;{activeFriendly.message}&rdquo;
            </p>
          </div>
          <div className="mt-4 sm:mt-6 flex flex-col gap-2 sm:gap-3">
            {isPuzzleMode ? (
              <button
                onClick={onChooseFact}
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg transition-all hover:scale-105 text-sm sm:text-base"
              >
                📚 Wat wil je me vertellen?
              </button>
            ) : (
              <>
                <button
                  onClick={onChooseFact}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg transition-all hover:scale-105 text-sm sm:text-base"
                >
                  📚 Wil je wat leren?
                </button>
                <button
                  onClick={onChoosePuzzle}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-xl shadow-lg transition-all hover:scale-105 text-sm sm:text-base"
                >
                  🧠 Wil je een puzzel doen?
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriendlyDialog;
