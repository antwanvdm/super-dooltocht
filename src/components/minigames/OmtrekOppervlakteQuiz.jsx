import { useState, useEffect } from 'react';
import { generateOmtrekOppervlakteQuestion } from '../../utils/meetkundeData';
import EenhedenReferenceCard from './EenhedenReferenceCard';

function OmtrekOppervlakteQuiz({ mathSettings, onSuccess, onFailure, theme }) {
  const [problem, setProblem] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showReference, setShowReference] = useState(false);

  useEffect(() => {
    const level = mathSettings?.meetkundeLevel?.omtrekOppervlakte || 'easy';
    const q = generateOmtrekOppervlakteQuestion(level);
    const allOptions = [
      { text: `${q.answer} ${q.unit}`, correct: true, value: q.answer },
      ...q.wrongAnswers.map(a => ({ text: `${a} ${q.unit}`, correct: false, value: a })),
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

  // Simple shape visualization
  const renderShape = () => {
    if (problem.shape === 'rechthoek') {
      return (
        <div className="relative inline-block border-4 border-teal-500 rounded-md bg-teal-50 my-2"
          style={{ width: `${Math.min(problem.width * 12, 180)}px`, height: `${Math.min(problem.height * 12, 120)}px` }}>
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs sm:text-sm font-bold text-teal-700">{problem.width} cm</span>
          <span className="absolute -right-10 top-1/2 -translate-y-1/2 text-xs sm:text-sm font-bold text-teal-700 rotate-90">{problem.height} cm</span>
        </div>
      );
    }
    if (problem.shape === 'vierkant') {
      const size = Math.min(problem.side * 12, 150);
      return (
        <div className="relative inline-block border-4 border-teal-500 rounded-md bg-teal-50 my-2"
          style={{ width: `${size}px`, height: `${size}px` }}>
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs sm:text-sm font-bold text-teal-700">{problem.side} cm</span>
        </div>
      );
    }
    // Triangle — just show text
    if (problem.shape === 'driehoek' && problem.sides) {
      return (
        <div className="text-4xl sm:text-6xl my-2">🔺</div>
      );
    }
    return null;
  };

  return (
    <div className="text-center">
      <div className="mb-4 sm:mb-6">
        <div className="flex justify-end mb-2">
          <button
            onClick={() => setShowReference(true)}
            className="text-xs sm:text-sm bg-teal-100 hover:bg-teal-200 text-teal-700 px-3 py-1.5 rounded-lg font-medium transition-colors"
          >
            📋 Spiekkaart
          </button>
        </div>
        <p className="text-gray-600 text-sm sm:text-lg mb-2">
          {problem.type === 'perimeter' ? '📏 Bereken de omtrek' : '📐 Bereken de oppervlakte'}
        </p>

        <div className="flex flex-col items-center gap-2 mb-4">
          {renderShape()}
        </div>

        <div className="inline-block bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl px-4 sm:px-8 py-3 sm:py-4 border-2 border-teal-200 mt-4">
          <p className="text-base sm:text-xl font-bold text-gray-800">{problem.question}</p>
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
              className={`p-3 sm:p-4 rounded-xl font-bold text-base sm:text-xl transition-all ${btnClass}`}
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
          {options[selected]?.correct
            ? '🎉 Super! Je hebt het goed!'
            : '💪 Bijna! Probeer nog eens!'}
        </div>
      )}

      {showReference && <EenhedenReferenceCard onClose={() => setShowReference(false)} theme={theme} showFormulas />}
    </div>
  );
}

export default OmtrekOppervlakteQuiz;
