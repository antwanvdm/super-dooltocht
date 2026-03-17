import { useState } from 'react';
import { WOORDSOORTEN_DATA, WOORDSOORT_LABELS, WOORDSOORT_ICONS, WOORDSOORTEN_LEVEL_TYPES } from '../../utils/languageData';

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const pickItem = (level) => {
  const types = WOORDSOORTEN_LEVEL_TYPES[level] || WOORDSOORTEN_LEVEL_TYPES.medium;
  const filtered = WOORDSOORTEN_DATA.filter(d => types.includes(d.type));
  return shuffle(filtered)[0];
};

/**
 * WoordsoortKies – "Wat voor woord is …?"
 * Toont een zin met een gemarkeerd woord (vetgedrukt).
 * Kind kiest uit de woordsoorten die bij het niveau horen.
 */
function WoordsoortKies({ onSuccess, onFailure, theme, mathSettings }) {
  const level = mathSettings?.woordsoortenLevel || 'easy';
  const types = WOORDSOORTEN_LEVEL_TYPES[level] || WOORDSOORTEN_LEVEL_TYPES.medium;
  const [item] = useState(() => pickItem(level));
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelect = (type) => {
    if (showFeedback) return;
    setSelected(type);
    setShowFeedback(true);

    if (type === item.type) {
      setTimeout(() => onSuccess(), 1200);
    } else {
      setTimeout(() => onFailure(), 1800);
    }
  };

  // Render zin met het gemarkeerde woord vetgedrukt
  const parts = item.sentence.split(/\*\*(.*?)\*\*/);
  const primary = theme?.colors?.primary || '#6366f1';

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6 w-full max-w-md mx-auto px-2">
      <p className="text-sm sm:text-base text-gray-600">Wat voor soort woord is het dikgedrukte woord?</p>

      <div className="bg-white rounded-xl p-4 sm:p-6 border-2 border-gray-200 w-full text-center">
        <p className="text-base sm:text-lg leading-relaxed">
          {parts.map((part, i) =>
            i % 2 === 1 ? (
              <span
                key={i}
                className="font-extrabold underline decoration-2 decoration-wavy"
                style={{ color: primary, textDecorationColor: primary }}
              >
                {part}
              </span>
            ) : (
              <span key={i}>{part}</span>
            ),
          )}
        </p>
      </div>

      <div className="flex flex-col gap-3 w-full">
        {types.map((type) => {
          const isSelected = selected === type;
          const isCorrect = type === item.type;
          let bg = 'bg-white hover:bg-gray-50 border-2 border-gray-200';
          if (showFeedback && isCorrect) {
            bg = 'bg-green-100 border-2 border-green-500 ring-2 ring-green-300';
          } else if (showFeedback && isSelected && !isCorrect) {
            bg = 'bg-red-100 border-2 border-red-400';
          } else if (isSelected) {
            bg = 'border-2 border-indigo-400 bg-indigo-50';
          }

          return (
            <button
              key={type}
              onClick={() => handleSelect(type)}
              disabled={showFeedback}
              className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl text-left transition-all ${bg} ${
                showFeedback ? 'cursor-default' : 'active:scale-95'
              }`}
            >
              <span className="text-2xl">{WOORDSOORT_ICONS[type]}</span>
              <span className="font-bold text-sm sm:text-base">{WOORDSOORT_LABELS[type]}</span>
              {showFeedback && isCorrect && <span className="ml-auto text-green-600 font-bold">✓</span>}
              {showFeedback && isSelected && !isCorrect && <span className="ml-auto text-red-500 font-bold">✗</span>}
            </button>
          );
        })}
      </div>

      {showFeedback && selected === item.type && (
        <p className="text-green-600 font-bold text-sm sm:text-base animate-bounce">
          🎉 Goed! &quot;{item.word}&quot; is een {WOORDSOORT_LABELS[item.type].toLowerCase()}!
        </p>
      )}
      {showFeedback && selected && selected !== item.type && (
        <p className="text-red-500 font-medium text-sm sm:text-base">
          Helaas! &quot;{item.word}&quot; is een {WOORDSOORT_LABELS[item.type].toLowerCase()}
        </p>
      )}
    </div>
  );
}

export default WoordsoortKies;
