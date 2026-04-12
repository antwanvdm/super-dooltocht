import { useState, useEffect } from 'react';
import { generateWindrichtingenQuestion } from '../../utils/topografieData';

const DIRECTION_POSITIONS = {
  Noord:     { top: '2%',  left: '50%', tx: '-50%', ty: '0' },
  Noordoost: { top: '12%', left: '85%', tx: '-50%', ty: '0' },
  Oost:      { top: '50%', left: '98%', tx: '-100%', ty: '-50%' },
  Zuidoost:  { top: '85%', left: '85%', tx: '-50%', ty: '-100%' },
  Zuid:       { top: '98%', left: '50%', tx: '-50%', ty: '-100%' },
  Zuidwest:  { top: '85%', left: '15%', tx: '-50%', ty: '-100%' },
  West:      { top: '50%', left: '2%',  tx: '0', ty: '-50%' },
  Noordwest: { top: '12%', left: '15%', tx: '-50%', ty: '0' },
};

const SHORT_LABELS = {
  Noord: 'N', Noordoost: 'NO', Oost: 'O', Zuidoost: 'ZO',
  Zuid: 'Z', Zuidwest: 'ZW', West: 'W', Noordwest: 'NW',
};

function WindrichtingenKompas({ mathSettings, onSuccess, onFailure }) {
  const level = mathSettings?.topoLevel?.windrichtingen || 'easy';
  const [problem, setProblem] = useState(null);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Labels: easy = all, medium = only N, hard = none
  const getLabel = (dir) => {
    if (level === 'easy') return SHORT_LABELS[dir];
    if (level === 'medium' && dir === 'Noord') return 'N';
    return '';
  };

  useEffect(() => {
    setProblem(generateWindrichtingenQuestion(level));
  }, [level]);

  const handleSelect = (direction) => {
    if (showFeedback) return;
    setSelected(direction);
    setShowFeedback(true);

    if (direction === problem.answer) {
      setTimeout(() => onSuccess(), 1500);
    } else {
      onFailure();
      setTimeout(() => {
        setShowFeedback(false);
        setSelected(null);
      }, 2000);
    }
  };

  if (!problem) return null;

  const isCorrect = selected === problem.answer;

  return (
    <div className="text-center">
      <div className="mb-3 sm:mb-5">
        <p className="text-gray-600 text-sm sm:text-lg mb-2">🧭 Windrichtingen</p>
        <div className="inline-block bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl px-4 sm:px-8 py-3 sm:py-5 border-2 border-amber-200">
          <p className="text-base sm:text-xl font-bold text-gray-800">{problem.question}</p>
        </div>
      </div>

      {/* Compass rose */}
      <div className="relative mx-auto w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80">
        {/* Circle background */}
        <div className="absolute inset-4 sm:inset-6 rounded-full bg-gradient-to-br from-amber-50 to-orange-50 border-4 border-amber-200 shadow-inner" />

        {/* Cross lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <line x1="50" y1="15" x2="50" y2="85" stroke="#d4a574" strokeWidth="0.5" strokeDasharray="2,2" />
          <line x1="15" y1="50" x2="85" y2="50" stroke="#d4a574" strokeWidth="0.5" strokeDasharray="2,2" />
          {problem.directions.length > 4 && (
            <>
              <line x1="25" y1="25" x2="75" y2="75" stroke="#d4a574" strokeWidth="0.3" strokeDasharray="2,2" />
              <line x1="75" y1="25" x2="25" y2="75" stroke="#d4a574" strokeWidth="0.3" strokeDasharray="2,2" />
            </>
          )}
        </svg>

        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-amber-400 rounded-full border-2 border-amber-600 z-10" />

        {/* Start direction arrow for draai questions */}
        {problem.startAngleDeg != null && (
          <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 100 100">
            <g transform={`rotate(${problem.startAngleDeg}, 50, 50)`}>
              <line x1="50" y1="50" x2="50" y2="22" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" />
              <polygon points="50,18 46,26 54,26" fill="#7c3aed" />
            </g>
          </svg>
        )}

        {/* Direction buttons */}
        {problem.directions.map((dir) => {
          const pos = DIRECTION_POSITIONS[dir];
          const isMain = !dir.includes('oost') && !dir.includes('west') || dir === 'Oost' || dir === 'West';
          const isMainDirection = ['Noord', 'Oost', 'Zuid', 'West'].includes(dir);

          let btnClass = isMainDirection
            ? 'bg-white border-2 border-amber-300 text-amber-900 hover:bg-amber-100 hover:border-amber-500 shadow-md font-bold'
            : 'bg-white/90 border-2 border-amber-200 text-amber-800 hover:bg-amber-50 hover:border-amber-400 shadow-sm font-semibold';

          if (showFeedback && selected === dir) {
            btnClass = isCorrect
              ? 'bg-green-500 text-white border-2 border-green-600 scale-110 shadow-lg font-bold'
              : 'bg-red-500 text-white border-2 border-red-600 font-bold';
          }

          const size = isMainDirection
            ? 'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-sm sm:text-base md:text-lg'
            : 'w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 text-xs sm:text-sm md:text-base';

          return (
            <button
              key={dir}
              onClick={() => handleSelect(dir)}
              disabled={showFeedback}
              aria-label={dir}
              className={`absolute rounded-full ${size} flex items-center justify-center transition-all z-20 ${btnClass}`}
              style={{
                top: pos.top,
                left: pos.left,
                transform: `translate(${pos.tx}, ${pos.ty})`,
              }}
            >
              {getLabel(dir) || '•'}
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <div className={`mt-4 p-3 rounded-xl text-sm sm:text-base ${
          isCorrect ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
        }`}>
          {isCorrect ? '🎉 Goed zo! Jij kent je windrichtingen!' : '💪 Bijna! Probeer nog eens!'}
        </div>
      )}
    </div>
  );
}

export default WindrichtingenKompas;
