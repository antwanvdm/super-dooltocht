import { useState, useEffect } from 'react';
import { loadEmojiCategories, getEmojiCategories, getCategoryLabels, emojisToCode, codeToEmojis } from '../utils/emojiCode';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function CodeInputModal({ 
  onCodeValidated, 
  onNewAdventure,
  prefillCode = null,
  isOpen = true,
  serverError = '',
}) {
  const [categories, setCategories] = useState([]);
  const [categoryLabels, setCategoryLabels] = useState([]);
  const [selectedEmojis, setSelectedEmojis] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNewAdventure, setShowNewAdventure] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  // Laad emoji categorieën van server
  useEffect(() => {
    const loadCategories = async () => {
      setCategoriesLoading(true);
      const data = await loadEmojiCategories();
      setCategories(data.categories || []);
      setCategoryLabels(data.labels || []);
      
      // Zet prefillCode (slugs) om naar emojis voor display
      if (prefillCode) {
        setSelectedEmojis(codeToEmojis(prefillCode));
      } else {
        setSelectedEmojis(new Array(data.categories?.length || 4).fill(''));
      }
      setCategoriesLoading(false);
    };
    loadCategories();
  }, [prefillCode]);

  const handleEmojiSelect = (categoryIndex, emoji) => {
    const newEmojis = [...selectedEmojis];
    newEmojis[categoryIndex] = emoji;
    setSelectedEmojis(newEmojis);
    setError('');
  };

  const handleSubmitCode = async (e) => {
    e.preventDefault();
    
    // Check of alle categorieën een selectie hebben
    if (selectedEmojis.some(emoji => !emoji)) {
      setError(`Kies alle ${categories.length} emoji's!`);
      return;
    }

    // Zet emojis om naar slugs voor de server
    const code = emojisToCode(selectedEmojis);
    
    if (code.includes(null)) {
      setError('Er ging iets fout. Probeer opnieuw.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/players/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        setError('Deze code ken ik niet. Probeer het opnieuw!');
        return;
      }

      const data = await response.json();
      onCodeValidated({
        code: data.code,
        progress: data.progress || {},
      });
    } catch (err) {
      setError('Oeps! Er ging iets fout. Probeer het opnieuw.');
      console.error('Code validation error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  if (categoriesLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-6 shadow-xl">
          <p className="text-lg text-gray-600">Even laden... ⏳</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full shadow-xl">
        {!showNewAdventure ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-2 text-blue-600">
              Welkom! 👋
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Kies je 4 emoji's om verder te spelen
            </p>

            <form onSubmit={handleSubmitCode} className="space-y-4">
              {/* Huidige selectie */}
              <div className="flex justify-center gap-4 text-5xl mb-4 p-4 bg-gray-50 rounded-lg">
                {selectedEmojis.map((emoji, i) => (
                  <span key={i} className={emoji ? '' : 'opacity-30'}>
                    {emoji || '❓'}
                  </span>
                ))}
              </div>

              {/* Emoji keuze per categorie */}
              {categories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="space-y-2">
                  <p className="text-sm text-gray-500 text-center">
                    {categoryLabels[categoryIndex] || `Categorie ${categoryIndex + 1}:`}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {category.map((item) => (
                      <button
                        key={item.slug}
                        type="button"
                        onClick={() => handleEmojiSelect(categoryIndex, item.emoji)}
                        disabled={loading}
                        className={`text-3xl p-2 rounded-lg transition-all ${
                          selectedEmojis[categoryIndex] === item.emoji
                            ? 'bg-blue-500 scale-110 shadow-lg'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {item.emoji}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {error && (
                <p className="text-red-500 text-center text-sm font-medium">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || selectedEmojis.some(emoji => !emoji)}
                className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
              >
                {loading ? 'Even geduld...' : 'Dit is mijn code! ✓'}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">of</span>
              </div>
            </div>

            <button
              onClick={() => setShowNewAdventure(true)}
              className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              Start nieuw avontuur 🎮
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-6 text-green-600">
              Nieuw avontuur? 🚀
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Je krijgt 4 emoji's als code. Onthoud ze goed of schrijf ze op!
            </p>
            
            {serverError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-600 text-sm font-medium text-center">
                  ⚠️ {serverError}
                </p>
              </div>
            )}
            
            <button
              onClick={onNewAdventure}
              disabled={loading}
              className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 disabled:bg-gray-400 transition-colors"
            >
              {loading ? 'Code wordt gemaakt...' : 'Maak mijn code! 🎯'}
            </button>
            <button
              onClick={() => {
                setShowNewAdventure(false);
                setError('');
              }}
              disabled={loading}
              className="w-full mt-3 bg-gray-300 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-400 disabled:bg-gray-200 transition-colors"
            >
              Terug
            </button>
          </>
        )}
      </div>
    </div>
  );
}
