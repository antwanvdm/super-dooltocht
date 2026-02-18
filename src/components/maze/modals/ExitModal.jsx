function ExitModal({ exitModal, modalInteractionReady, renderKeyProgress, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl p-4 sm:p-8 w-full max-w-full sm:max-w-xl shadow-2xl text-center relative">
        {!modalInteractionReady && <div className="absolute inset-0 z-10 rounded-2xl" />}
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-3">Bijna bij de deur!</h3>
        <p className="text-lg sm:text-xl text-gray-700 mb-3 sm:mb-4">
          Je mist nog {exitModal.remaining} {exitModal.remaining === 1 ? 'uitdaging' : 'uitdagingen'} om de sleutel compleet te maken.
        </p>
        <div className="flex justify-center mb-4 sm:mb-6">{renderKeyProgress()}</div>
        <button
          onClick={onClose}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg text-sm sm:text-base"
        >
          Verder zoeken
        </button>
      </div>
    </div>
  );
}

export default ExitModal;
