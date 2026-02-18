function FriendlyDialog({ activeFriendly, theme, modalInteractionReady, onClose }) {
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
              "{activeFriendly.message}"
            </p>
          </div>
          <button
            onClick={onClose}
            className="mt-4 sm:mt-6 px-6 sm:px-8 py-2.5 sm:py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg transition-all hover:scale-105 text-sm sm:text-base"
          >
            🤝 Neem mee!
          </button>
        </div>
      </div>
    </div>
  );
}

export default FriendlyDialog;
