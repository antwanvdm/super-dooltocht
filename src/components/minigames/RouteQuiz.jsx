import { useState, useEffect } from 'react';
import { generateRouteQuestion, COLUMN_LABELS } from '../../utils/coordinatenData';

function RouteGrid({ grid, gridCols, gridRows, highlightCells }) {
  const highlights = highlightCells || [];
  return (
    <div className="inline-block">
      {/* Column headers */}
      <div className="flex">
        <div className="w-6 sm:w-8" />
        {COLUMN_LABELS.slice(0, gridCols).map((label) => (
          <div key={label} className="w-7 sm:w-10 text-center text-xs sm:text-sm font-bold text-teal-700">
            {label}
          </div>
        ))}
      </div>
      {/* Grid rows */}
      {grid.map((row, rowIdx) => (
        <div key={rowIdx} className="flex">
          <div className="w-6 sm:w-8 flex items-center justify-center text-xs sm:text-sm font-bold text-teal-700">
            {rowIdx + 1}
          </div>
          {row.map((cell, colIdx) => {
            const isHighlight = highlights.some((h) => h.col === colIdx && h.row === rowIdx);
            return (
              <div
                key={colIdx}
                className={`w-7 h-7 sm:w-10 sm:h-10 border border-teal-200 flex items-center justify-center text-sm sm:text-lg ${
                  isHighlight ? 'bg-yellow-100 ring-2 ring-yellow-400' : 'bg-white'
                }`}
              >
                {cell || ''}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function RouteQuiz({ mathSettings, onSuccess, onFailure }) {
  const [problem, setProblem] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const level = mathSettings?.meetkundeLevel?.coordinaten || 'easy';
    const q = generateRouteQuestion(level);
    const allOptions = [
      { text: q.correctAnswer, correct: true },
      ...q.wrongAnswers.map((a) => ({ text: a, correct: false })),
    ].sort(() => Math.random() - 0.5);
    setProblem(q);
    setOptions(allOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (option, index) => {
    if (showFeedback) return;
    setSelected(index);
    setShowFeedback(true);

    if (option.correct) {
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

  return (
    <div className="text-center">
      <div className="mb-4 sm:mb-6">
        <p className="text-gray-600 text-sm sm:text-lg mb-2">Route</p>
        <div className="inline-flex flex-col items-center gap-3 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl px-4 sm:px-8 py-4 sm:py-6 border-2 border-teal-200">
          <RouteGrid
            grid={problem.grid}
            gridCols={problem.gridCols}
            gridRows={problem.gridRows}
            highlightCells={problem.highlightCells}
          />
          <p className="text-base sm:text-xl font-bold text-gray-800 max-w-sm">{problem.question}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-lg mx-auto">
        {options.map((option, index) => {
          let btnClass = 'bg-white border-2 border-gray-200 text-gray-700 hover:border-teal-400 hover:bg-teal-50';
          if (showFeedback && selected === index) {
            btnClass = option.correct
              ? 'bg-green-500 text-white border-2 border-green-600 scale-[1.02]'
              : 'bg-red-500 text-white border-2 border-red-600';
          }

          return (
            <button
              key={index}
              onClick={() => handleSelect(option, index)}
              disabled={showFeedback}
              className={`p-3 sm:p-4 rounded-xl font-medium text-sm sm:text-base transition-all ${btnClass}`}
              aria-label={`Antwoord: ${option.text}`}
            >
              {option.text}
            </button>
          );
        })}
      </div>

      {showFeedback && selected !== null && (
        <div className={`mt-4 p-3 rounded-xl text-sm sm:text-base ${
          options[selected]?.correct ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
        }`}>
          {options[selected]?.correct ? '🎉 Goed zo!' : '💪 Bijna! Probeer nog eens!'}
        </div>
      )}
    </div>
  );
}

export default RouteQuiz;
