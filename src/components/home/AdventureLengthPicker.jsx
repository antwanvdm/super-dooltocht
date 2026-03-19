const LENGTHS = [
  { key: 'short', label: 'Kort', icon: '⚡', desc: 'Red 2 vriendjes + 4 uitdagingen' },
  { key: 'medium', label: 'Medium', icon: '🎯', desc: 'Red 4 vriendjes + 7 uitdagingen' },
  { key: 'long', label: 'Lang', icon: '🏔️', desc: 'Red 6 vriendjes + 10 uitdagingen' },
  { key: 'xl', label: 'XL', icon: '🏰', desc: '2 verdiepingen! Red 10 vriendjes + 16 uitdagingen' },
];

export default function AdventureLengthPicker({ adventureLength, set }) {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-7 border-2 border-amber-100">
      <h3 className="flex items-center gap-3 text-lg font-bold text-gray-700 mb-6">
        <span className="text-2xl">⏱️</span> Lengte
      </h3>
      <div className="space-y-3">
        {LENGTHS.map(({ key, label, icon, desc }) => (
          <label
            key={key}
            className={`flex flex-col gap-1 p-3 rounded-xl cursor-pointer transition-all ${
              adventureLength === key
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-amber-50 border border-gray-200'
            }`}
          >
            <input
              type="radio"
              name="adventureLength"
              value={key}
              checked={adventureLength === key}
              onChange={(e) => set('adventureLength', e.target.value)}
              className="sr-only"
            />
            <div className="flex items-center gap-2">
              <span className="text-xl">{icon}</span>
              <span className="font-semibold">{label}</span>
              {adventureLength === key && <span className="ml-auto text-xl">✓</span>}
            </div>
            <span className={`text-xs ml-7 ${
              adventureLength === key ? 'text-white/90' : 'text-gray-500'
            }`}>{desc}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
