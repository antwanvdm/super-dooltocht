import { THEMES } from '../../utils/themes';

export default function ThemeSelector({ selectedTheme, setSelectedTheme }) {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-center gap-4 mb-8">
        <span className="text-4xl">🌍</span>
        <h3 className="text-xl md:text-2xl font-bold text-gray-800">Kies je wereld</h3>
      </div>

      <div data-testid="theme-selector" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {Object.values(THEMES).map((theme) => (
          <button
            key={theme.id}
            onClick={() => setSelectedTheme(theme.id)}
            className={`group relative overflow-hidden rounded-2xl p-4 transition-all duration-200 ${
              selectedTheme === theme.id
                ? 'bg-gradient-to-br from-yellow-100 to-orange-100 ring-4 ring-orange-400 shadow-lg scale-105'
                : 'bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
              {theme.emoji}
            </div>
            <p className={`text-xs font-bold ${selectedTheme === theme.id ? 'text-orange-700' : 'text-gray-700'}`}>
              {theme.name.replace(/^[^\s]+\s/, '')}
            </p>
            {selectedTheme === theme.id && (
              <div className="absolute top-2 right-2 text-sm">✓</div>
            )}
          </button>
        ))}
      </div>
      {!selectedTheme && (
        <p className="mt-4 text-sm text-gray-500 text-center">
          Klik op een wereld om deze te selecteren
        </p>
      )}
    </div>
  );
}
