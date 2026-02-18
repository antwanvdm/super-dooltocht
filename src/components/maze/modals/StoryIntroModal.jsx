import { getCompletedMazes } from '../../../utils/localStorage';

function StoryIntroModal({ theme, friendlies, onClose, setShowOnboarding }) {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className={`${theme.colors.secondary || theme.colors.primary} rounded-3xl shadow-2xl max-w-full sm:max-w-lg w-full overflow-hidden`}>
        <div className="p-4 sm:p-8 text-center">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg">
            {theme.name}
          </h2>
          <div className="bg-white/95 rounded-2xl p-4 sm:p-6 shadow-inner mb-4 sm:mb-6">
            <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
              {theme.story.intro}
            </p>
          </div>
          <div className="mb-4 sm:mb-6">
            <p className="text-white font-semibold mb-2 sm:mb-3 drop-shadow text-sm sm:text-base">
              Vind deze verdwaalde vriendjes:
            </p>
            <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
              {friendlies.map((f, i) => (
                <span
                  key={i}
                  className="text-3xl sm:text-4xl animate-bounce bg-white/20 rounded-full p-1.5 sm:p-2"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  {f.emoji}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={() => {
              onClose();
              // Toon onboarding voor nieuwe spelers na story intro
              if (getCompletedMazes() === 0) {
                setShowOnboarding(true);
              }
            }}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-green-500 hover:bg-green-600 text-white text-lg sm:text-xl font-bold rounded-xl shadow-lg transition-all hover:scale-105"
          >
            🚀 Ga aan de slag!
          </button>
        </div>
      </div>
    </div>
  );
}

export default StoryIntroModal;
