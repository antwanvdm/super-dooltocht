export default function EmojiPicker({ playerEmoji, set, emojis }) {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-7 border-2 border-purple-100">
      <h3 className="flex items-center gap-3 text-lg font-bold text-gray-700 mb-6">
        <span className="text-2xl">🎭</span> Jouw karakter
      </h3>
      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 gap-2">
        {emojis.map((emoji) => (
          <button
            key={emoji}
            onClick={() => set('playerEmoji', emoji)}
            className={`text-2xl p-2 rounded-xl transition-all aspect-square flex items-center justify-center ${
              playerEmoji === emoji
                ? 'bg-purple-500 shadow-md scale-110 ring-2 ring-purple-300'
                : 'bg-white hover:bg-purple-50 border border-gray-200 hover:scale-105'
            }`}
            aria-label={`kies ${emoji}`}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
