import { useNavigate } from 'react-router-dom';
import Confetti from '../../Confetti';

function WinScreen({ theme, friendlies, collectedFriends, modalInteractionReady }) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Confetti duration={5000} />
      <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-2xl max-w-lg mx-4 relative">
        {!modalInteractionReady && <div className="absolute inset-0 z-10 rounded-2xl" />}
        <div className="text-7xl md:text-8xl mb-4">{theme.emoji}</div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          {collectedFriends.length === friendlies.length ? '🎉 Geweldig!' : 'Goed gedaan!'}
        </h2>

        {/* Story ending */}
        {theme.story && (
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <p className="text-lg text-gray-700 leading-relaxed">
              {collectedFriends.length === friendlies.length
                ? theme.story.endingComplete
                : theme.story.endingIncomplete}
            </p>
          </div>
        )}

        {/* Collected friends display */}
        {collectedFriends.length > 0 && (
          <div className="bg-green-50 rounded-xl p-4 mb-4">
            <p className="text-lg text-green-700 font-semibold mb-2">
              🤝 Je hebt {collectedFriends.length} van de {friendlies.length} vriendjes gered!
            </p>
            <div className="flex justify-center gap-2 flex-wrap">
              {collectedFriends.map((f) => (
                <span key={f.id} className="text-3xl">{f.emoji}</span>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => navigate('/')}
          className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xl font-bold rounded-xl shadow-lg transition-all hover:scale-105"
        >
          🚀 Begin een nieuw avontuur!
        </button>
      </div>
    </div>
  );
}

export default WinScreen;
