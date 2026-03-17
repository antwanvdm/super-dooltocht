import { useState } from 'react';
import { RIJM_SETS } from '../../utils/languageData';
import SpeakButton from './SpeakButton';

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const generateRijmData = (level) => {
  // Filter clusters by level: easy=0-14, medium=0-24, hard=all
  const maxIndex = level === 'hard' ? RIJM_SETS.length
    : level === 'medium' ? Math.min(25, RIJM_SETS.length)
    : Math.min(15, RIJM_SETS.length);
  const pool = RIJM_SETS.slice(0, maxIndex);

  const clusterIndex = Math.floor(Math.random() * pool.length);
  const cluster = pool[clusterIndex];
  const shuffled = shuffle(cluster);
  const target = shuffled[0];
  const correct = shuffled[1];

  const distractors = [];
  const otherIndices = Array.from({ length: pool.length }, (_, i) => i)
    .filter(i => i !== clusterIndex);
  const shuffledIndices = shuffle(otherIndices);
  for (let i = 0; i < 3 && i < shuffledIndices.length; i++) {
    const otherCluster = pool[shuffledIndices[i]];
    distractors.push(otherCluster[Math.floor(Math.random() * otherCluster.length)]);
  }

  return {
    target,
    options: shuffle([
      { word: correct, correct: true },
      ...distractors.map(w => ({ word: w, correct: false })),
    ]),
  };
};

/**
 * RijmMatch – "Welk woord rijmt op …?"
 * Kiest een doelwoord, toont 4 opties (1 correct rijmwoord + 3 afleiders).
 */
function RijmMatch({ onSuccess, onFailure, theme, mathSettings }) {
  const [data] = useState(() => generateRijmData(mathSettings?.rijmenLevel || 'easy'));
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const { target: targetWord, options } = data;

  const handleSelect = (option) => {
    if (showFeedback) return;
    setSelected(option);
    setShowFeedback(true);

    if (option.correct) {
      setTimeout(() => onSuccess(), 1200);
    } else {
      setTimeout(() => onFailure(), 1800);
    }
  };

  const primary = theme?.colors?.primary || '#6366f1';

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6 w-full max-w-md mx-auto px-2">
      <div className="text-center">
        <p className="text-sm sm:text-base text-gray-600 mb-2">Welk woord rijmt op:</p>
        <div className="flex items-center justify-center gap-2">
          <span
            className="text-2xl sm:text-3xl font-extrabold"
            style={{ color: primary }}
          >
            {targetWord}
          </span>
          <SpeakButton text={targetWord} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full">
        {options.map((option, i) => {
          const isSelected = selected === option;
          const isCorrect = option.correct;
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
              key={i}
              onClick={() => handleSelect(option)}
              disabled={showFeedback}
              className={`p-3 sm:p-4 rounded-xl text-base sm:text-lg font-bold transition-all ${bg} ${
                showFeedback ? 'cursor-default' : 'active:scale-95'
              }`}
            >
              {option.word}
              {showFeedback && isCorrect && ' ✓'}
              {showFeedback && isSelected && !isCorrect && ' ✗'}
            </button>
          );
        })}
      </div>

      {showFeedback && selected?.correct && (
        <p className="text-green-600 font-bold text-sm sm:text-base animate-bounce">
          🎉 Goed! &quot;{targetWord}&quot; rijmt op &quot;{selected.word}&quot;!
        </p>
      )}
      {showFeedback && selected && !selected.correct && (
        <p className="text-red-500 font-medium text-sm sm:text-base">
          Helaas! Het goede antwoord was &quot;{options.find(o => o.correct).word}&quot;
        </p>
      )}
    </div>
  );
}

export default RijmMatch;
