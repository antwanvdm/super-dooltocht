import { useState, useEffect } from 'react';
import { generateMathProblem } from '../../utils/difficultyAdapter';

function DartsGame({ mathSettings, onSuccess, onFailure, theme }) {
  const [problem, setProblem] = useState(null);
  const [targetScore, setTargetScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [dartPositions, setDartPositions] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    // Force alleen standard operations voor DartsGame
    const standardSettings = {
      ...mathSettings,
      enabledOperations: {
        add: mathSettings?.enabledOperations?.add || false,
        sub: mathSettings?.enabledOperations?.sub || false,
        mul: mathSettings?.enabledOperations?.mul || false,
        placeValue: false,
        lovingHearts: false,
        money: false,
      },
    };
    
    // Fallback to add if no standard ops enabled
    if (!standardSettings.enabledOperations.add && 
        !standardSettings.enabledOperations.sub && 
        !standardSettings.enabledOperations.mul) {
      standardSettings.enabledOperations.add = true;
    }
    
    const mathProblem = generateMathProblem(standardSettings);
    setProblem(mathProblem);
    setTargetScore(mathProblem.answer);
  }, [mathSettings]);

  const handleDartboardClick = (value) => {
    if (showFeedback) return;
    
    const newScore = currentScore + value;
    setCurrentScore(newScore);
    setDartPositions([...dartPositions, value]);

    if (newScore === targetScore) {
      setShowFeedback(true);
      setWon(true);
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } else if (newScore > targetScore) {
      setShowFeedback(true);
      onFailure();
      setTimeout(() => {
        setCurrentScore(0);
        setDartPositions([]);
        setShowFeedback(false);
        setWon(false);
      }, 2000);
    }
  };

  const handleReset = () => {
    setCurrentScore(0);
    setDartPositions([]);
    setShowFeedback(false);
    setWon(false);
  };

  if (!problem) return null;

  // Dartboard waardes: altijd 1,2,3 voor fijnafstemming + grotere waarden geschaald op maxValue
  const maxVal = mathSettings?.maxValue || 50;
  let bigValues = [];
  if (maxVal >= 500) {
    bigValues = [25, 50, 100, 150, 200, 250];
  } else if (maxVal >= 200) {
    bigValues = [10, 20, 30, 50, 75, 100];
  } else if (maxVal >= 100) {
    bigValues = [5, 10, 15, 20, 30, 50];
  } else if (maxVal >= 50) {
    bigValues = [5, 8, 10, 12, 15, 20];
  } else {
    bigValues = [4, 5, 6, 7, 8, 10];
  }
  // Altijd kleine waarden voor fijnafstemming (1, 2, 3) + grotere waarden
  const dartValues = [1, 2, 3, ...bigValues].slice(0, 10);

  return (
    <div className="text-center max-h-[70vh] overflow-y-auto">
      <div className="mb-3">
        <p className="text-gray-600 text-base mb-2">Gooi pijltjes tot je precies op het antwoord uitkomt!</p>
        <p className="text-3xl font-bold text-gray-800 mb-2">
          {problem.question} = ?
        </p>
        <div className="flex items-center justify-center gap-4 text-xl font-bold">
          <span className="text-gray-500">Jij hebt: {currentScore}</span>
          <span className="text-blue-600">Doel: {won ? targetScore : '???'}</span>
        </div>
      </div>

      <div className="relative w-64 h-64 mx-auto mb-3">
        {/* Dartboard cirkels */}
        <svg viewBox="0 0 400 400" className="w-full h-full">
          {/* Achtergrond */}
          <circle cx="200" cy="200" r="195" fill="#1f2937" stroke="#000" strokeWidth="2" />
          
          {/* Dartboard segmenten */}
          {dartValues.map((value, index) => {
            const angle = (index / dartValues.length) * 2 * Math.PI;
            const nextAngle = ((index + 1) / dartValues.length) * 2 * Math.PI;
            const innerRadius = 60;
            const outerRadius = 190;
            
            // Bereken coordinaten voor het segment
            const x1 = 200 + Math.cos(angle) * innerRadius;
            const y1 = 200 + Math.sin(angle) * innerRadius;
            const x2 = 200 + Math.cos(angle) * outerRadius;
            const y2 = 200 + Math.sin(angle) * outerRadius;
            const x3 = 200 + Math.cos(nextAngle) * outerRadius;
            const y3 = 200 + Math.sin(nextAngle) * outerRadius;
            const x4 = 200 + Math.cos(nextAngle) * innerRadius;
            const y4 = 200 + Math.sin(nextAngle) * innerRadius;
            
            const color = index % 2 === 0 ? '#ef4444' : '#22c55e';
            const midAngle = (angle + nextAngle) / 2;
            const labelX = 200 + Math.cos(midAngle) * 130;
            const labelY = 200 + Math.sin(midAngle) * 130;
            
            return (
              <g key={value}>
                <path
                  d={`M ${x1} ${y1} L ${x2} ${y2} A ${outerRadius} ${outerRadius} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 0 0 ${x1} ${y1}`}
                  fill={color}
                  stroke="#000"
                  strokeWidth="1"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => handleDartboardClick(value)}
                />
                <text
                  x={labelX}
                  y={labelY}
                  fill="white"
                  fontSize="24"
                  fontWeight="bold"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="pointer-events-none"
                >
                  {value}
                </text>
              </g>
            );
          })}
          
          {/* Center bulls-eye */}
          <circle cx="200" cy="200" r="30" fill="#fbbf24" stroke="#000" strokeWidth="2" />
          <circle cx="200" cy="200" r="15" fill="#dc2626" stroke="#000" strokeWidth="1" />
        </svg>
      </div>

      <div className="flex items-center justify-center gap-2 mb-2 flex-wrap">
        <span className="text-sm text-gray-600">Gegooid:</span>
        {dartPositions.map((value, index) => (
          <span key={index} className="text-lg font-bold text-blue-600">
            {value}{index < dartPositions.length - 1 && ' +'}
          </span>
        ))}
      </div>

      <button
        onClick={handleReset}
        className="px-4 py-1 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors mb-2"
      >
        🔄 Opnieuw beginnen
      </button>

      {showFeedback && (
        <div className="mt-2 text-lg font-bold">
          {currentScore === targetScore ? (
            <p className="text-green-600">🎯 Raak! Perfecte worp!</p>
          ) : (
            <p className="text-orange-600">💪 Te veel! Probeer het opnieuw!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default DartsGame;
