import { useState, useEffect } from 'react';
import { WOORDSOORTEN_DATA, WOORDSOORT_LABELS, WOORDSOORT_ICONS, WOORDSOORTEN_LEVEL_TYPES } from '../../utils/languageData';

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const LEVEL_WORD_COUNT = { easy: 4, medium: 5, hard: 6 };

function pickWords(level) {
  const types = WOORDSOORTEN_LEVEL_TYPES[level] || WOORDSOORTEN_LEVEL_TYPES.medium;
  const count = LEVEL_WORD_COUNT[level] || 5;
  const filtered = WOORDSOORTEN_DATA.filter(d => types.includes(d.type));

  // Ensure at least 1 word per type, then fill randomly
  const byType = {};
  for (const t of types) byType[t] = shuffle(filtered.filter(d => d.type === t));

  const picked = [];
  const used = new Set();
  for (const t of types) {
    if (byType[t].length > 0) {
      const item = byType[t].pop();
      picked.push(item);
      used.add(item.word);
    }
  }

  const remaining = shuffle(filtered.filter(d => !used.has(d.word)));
  while (picked.length < count && remaining.length > 0) {
    picked.push(remaining.pop());
  }

  return shuffle(picked);
}

/**
 * WoordsoortSorteer – Sorteer woorden in de juiste kolommen.
 * Tik op een woord en dan op de juiste woordsoort-kolom.
 */
function WoordsoortSorteer({ onSuccess, onFailure, theme, mathSettings }) {
  const level = mathSettings?.woordsoortenLevel || 'easy';
  const types = WOORDSOORTEN_LEVEL_TYPES[level] || WOORDSOORTEN_LEVEL_TYPES.medium;

  const [words, setWords] = useState([]);
  const [selected, setSelected] = useState(null);
  const [sorted, setSorted] = useState({}); // index → type
  const [wrongPair, setWrongPair] = useState(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setWords(pickWords(level));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleWordClick = (index) => {
    if (completed || sorted[index] !== undefined) return;
    setSelected(selected === index ? null : index);
    setWrongPair(null);
  };

  const handleColumnClick = (type) => {
    if (completed || selected === null) return;

    const word = words[selected];
    if (word.type === type) {
      const next = { ...sorted, [selected]: type };
      setSorted(next);
      setSelected(null);
      setWrongPair(null);

      if (Object.keys(next).length === words.length) {
        setCompleted(true);
        setTimeout(() => onSuccess(), 1200);
      }
    } else {
      setWrongPair({ wordIndex: selected, type });
      onFailure();
      setTimeout(() => {
        setWrongPair(null);
        setSelected(null);
      }, 1500);
    }
  };

  if (words.length === 0) return null;

  const primary = theme?.colors?.primary || '#6366f1';

  return (
    <div className="flex flex-col items-center gap-3 sm:gap-4 w-full max-w-lg mx-auto px-2">
      <p className="text-sm sm:text-base text-gray-600 text-center">
        Tik op een woord en sorteer het in de juiste kolom
      </p>

      {/* Woorden */}
      <div className="flex flex-wrap justify-center gap-2 w-full">
        {words.map((w, i) => {
          const isSorted = sorted[i] !== undefined;
          const isSelected = selected === i;
          const isWrong = wrongPair?.wordIndex === i;

          let cls = 'bg-white border-2 border-gray-200 text-gray-800 hover:border-blue-400';
          if (isSorted) cls = 'bg-green-100 border-2 border-green-400 text-green-800';
          else if (isWrong) cls = 'bg-red-100 border-2 border-red-400';
          else if (isSelected) cls = 'bg-blue-100 border-2 border-blue-500 ring-2 ring-blue-300';

          return (
            <button
              key={i}
              onClick={() => handleWordClick(i)}
              disabled={isSorted || completed}
              className={`px-3 py-2 sm:px-4 sm:py-3 rounded-xl font-bold text-sm sm:text-base transition-all ${cls} ${
                isSorted ? 'opacity-60 cursor-default' : 'active:scale-95'
              }`}
            >
              {w.word}
              {isSorted && <span className="ml-1">✓</span>}
            </button>
          );
        })}
      </div>

      {/* Kolommen */}
      <div className={`grid gap-3 w-full ${types.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
        {types.map((type) => {
          const isTarget = wrongPair?.type === type;
          const sortedWords = words.filter((_, i) => sorted[i] === type);
          const highlight = selected !== null && !completed;

          let colCls = 'bg-gray-50 border-2 border-gray-200';
          if (isTarget) colCls = 'bg-red-50 border-2 border-red-400';
          else if (highlight) colCls = 'bg-purple-50 border-2 border-purple-300 hover:bg-purple-100 cursor-pointer';

          return (
            <button
              key={type}
              onClick={() => handleColumnClick(type)}
              disabled={completed || selected === null}
              className={`rounded-xl p-3 sm:p-4 transition-all min-h-[120px] flex flex-col items-center ${colCls}`}
            >
              <span className="text-2xl mb-1">{WOORDSOORT_ICONS[type]}</span>
              <span className="font-bold text-xs sm:text-sm text-gray-700 mb-2">{WOORDSOORT_LABELS[type]}</span>
              <div className="flex flex-col gap-1 w-full">
                {sortedWords.map((w, j) => (
                  <span
                    key={j}
                    className="text-xs sm:text-sm bg-white rounded-lg px-2 py-1 font-medium"
                    style={{ color: primary }}
                  >
                    {w.word}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* Voortgang */}
      <div className="text-center">
        <span className="text-sm text-gray-500">
          Gesorteerd: {Object.keys(sorted).length}/{words.length}
        </span>
        {completed && <span className="ml-2 text-green-600 font-bold">🎉 Alles goed!</span>}
      </div>
    </div>
  );
}

export default WoordsoortSorteer;
