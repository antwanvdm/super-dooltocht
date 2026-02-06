import { useState, useEffect } from 'react';
import { loadEmojiCategories, codeToEmojis } from '../utils/emojiCode';

export default function CodeDisplayModal({ 
  code, 
  onConfirm,
  isOpen = true 
}) {
  const [confirmed, setConfirmed] = useState(false);
  const [emojis, setEmojis] = useState(['❓', '❓', '❓', '❓']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAndConvert = async () => {
      if (!code) return;
      setLoading(true);
      await loadEmojiCategories(); // Ensure categories are loaded
      setEmojis(codeToEmojis(code));
      setLoading(false);
    };
    loadAndConvert();
  }, [code]);

  useEffect(() => {
    if (!isOpen || !code) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen, code]);

  if (!isOpen || !code) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 sm:p-8 max-w-md w-full shadow-xl text-center max-h-[90vh] overflow-y-auto overscroll-contain">
        <h2 className="text-2xl font-bold mb-2 text-green-600">
          Je nieuwe code! 🎉
        </h2>
        <p className="text-gray-600 mb-4">
          Dit zijn jouw 4 emoji's. Onthoud ze goed!
        </p>

        {/* Emojis groot display */}
        <div className="flex justify-center gap-4 text-6xl sm:text-7xl mb-6 py-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl">
          {loading ? (
            <span className="text-2xl text-gray-400">Laden...</span>
          ) : (
            emojis.map((emoji, i) => (
              <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                {emoji}
              </span>
            ))
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-gray-700 font-medium">
              📝 Teken of schrijf deze emoji's op een papiertje!<br/>
              <span className="text-sm text-gray-500">Vraag je juf of ouders om te helpen.</span>
            </p>
          </div>

          <button
            onClick={() => {
              setConfirmed(true);
              setTimeout(() => onConfirm(), 500);
            }}
            disabled={confirmed || loading}
            className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 disabled:bg-gray-400 transition-colors"
          >
            {confirmed ? 'Even geduld...' : 'Ik heb ze onthouden! ✓'}
          </button>
        </div>
      </div>
    </div>
  );
}
