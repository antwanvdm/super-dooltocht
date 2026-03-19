export default function ContinueModal({ continueModal, onContinue, onStartNew }) {
  if (!continueModal) return null;

  let totalChallenges = 7, totalFriends = 4;
  switch (continueModal.adventureLength) {
    case 'short':
      totalChallenges = 4; totalFriends = 2; break;
    case 'long':
      totalChallenges = 10; totalFriends = 6; break;
    case 'xl':
      totalChallenges = 16; totalFriends = 10; break;
    case 'medium':
    default:
      totalChallenges = 7; totalFriends = 4;
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl text-center max-h-[90vh] overflow-y-auto overscroll-contain">
        <div className="text-7xl mb-4">{continueModal.themeEmoji}</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Welkom terug! 👋
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Je hebt een lopend avontuur in <strong>{continueModal.themeName}</strong>!
        </p>

        <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">⭐ Uitdagingen:</span>
            <span className="font-bold text-gray-800">{continueModal.completedCount}/{totalChallenges}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">🤝 Geredde vriendjes:</span>
            <span className="font-bold text-gray-800">{continueModal.collectedFriends}/{totalFriends}</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onContinue}
            className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-lg rounded-xl transition-all hover:scale-105 shadow-lg"
          >
            ▶️ Ga verder
          </button>
          <button
            onClick={onStartNew}
            className="w-full px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-colors"
          >
            🔄 Start opnieuw
          </button>
        </div>
      </div>
    </div>
  );
}
