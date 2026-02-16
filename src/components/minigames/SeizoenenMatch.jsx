import { useState, useEffect } from 'react';
import { generateSeizoenenMatchPairs } from '../../utils/timeAwarenessData';

/**
 * SeizoenenMatch - Verbind kenmerken/activiteiten met het juiste seizoen.
 * Tap-based connect game: tik op een kenmerk, dan op het seizoen.
 */
function SeizoenenMatch({ mathSettings: _mathSettings, onSuccess, onFailure }) {
  const [pairs, setPairs] = useState([]);
  const [kenmerken, setKenmerken] = useState([]);
  const [seizoenen, setSeizoenen] = useState([]);
  const [selectedKenmerk, setSelectedKenmerk] = useState(null);
  const [connections, setConnections] = useState({}); // kenmerkIdx -> seizoenIdx
  const [wrongPair, setWrongPair] = useState(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const generatedPairs = generateSeizoenenMatchPairs(4);
    setPairs(generatedPairs);

    setKenmerken(generatedPairs.map(p => ({ kenmerk: p.kenmerk, emoji: p.emoji })));

    // Maak unieke seizoenen-lijst, geschud
    const seizoenEmojis = { lente: '🌷', zomer: '☀️', herfst: '🍂', winter: '❄️' };
    const uniqueSeasons = [...new Set(generatedPairs.map(p => p.seizoen))].map(naam => ({
      naam,
      emoji: seizoenEmojis[naam] || '🌿',
    }));
    setSeizoenen(uniqueSeasons.sort(() => Math.random() - 0.5));
  }, []);

  const handleKenmerkClick = (index) => {
    if (completed || connections[index] !== undefined) return;
    setSelectedKenmerk(selectedKenmerk === index ? null : index);
    setWrongPair(null);
  };

  const handleSeizoenClick = (seizoenIdx) => {
    if (completed || selectedKenmerk === null) return;

    const kenmerkNaam = kenmerken[selectedKenmerk].kenmerk;
    const seizoenNaam = seizoenen[seizoenIdx].naam;

    // Check of dit een correct paar is
    const isCorrect = pairs.some(
      p => p.kenmerk === kenmerkNaam && p.seizoen === seizoenNaam,
    );

    if (isCorrect) {
      const newConnections = { ...connections, [selectedKenmerk]: seizoenIdx };
      setConnections(newConnections);
      setSelectedKenmerk(null);
      setWrongPair(null);

      if (Object.keys(newConnections).length === pairs.length) {
        setCompleted(true);
        setTimeout(() => onSuccess(), 1200);
      }
    } else {
      setWrongPair({ kenmerkIdx: selectedKenmerk, seizoenIdx });
      onFailure();
      setTimeout(() => {
        setWrongPair(null);
        setSelectedKenmerk(null);
      }, 1500);
    }
  };

  if (kenmerken.length === 0) return null;

  return (
    <div>
      <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 text-center">
        Bij welk seizoen hoort dit?
      </p>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {/* Kenmerken kolom */}
        <div className="space-y-2">
          <h3 className="font-bold text-gray-700 text-sm sm:text-base mb-1">
            Wat gebeurt er?
          </h3>
          {kenmerken.map((item, index) => {
            const isConnected = connections[index] !== undefined;
            const isSelected = selectedKenmerk === index;
            const isWrong = wrongPair?.kenmerkIdx === index;

            let btnClass = 'bg-white border-2 border-gray-200 text-gray-800 hover:border-sky-400';
            if (isConnected) btnClass = 'bg-green-100 border-2 border-green-400 text-green-800';
            else if (isWrong) btnClass = 'bg-red-100 border-2 border-red-400 text-red-800';
            else if (isSelected) btnClass = 'bg-sky-100 border-2 border-sky-500 text-sky-800 ring-2 ring-sky-300';

            return (
              <button
                key={index}
                onClick={() => handleKenmerkClick(index)}
                disabled={isConnected || completed}
                className={`w-full p-3 sm:p-4 rounded-xl font-bold text-sm sm:text-base transition-all text-left ${btnClass}`}
              >
                <span className="mr-1.5">{item.emoji}</span>
                {item.kenmerk}
                {isConnected && <span className="ml-2">✓</span>}
              </button>
            );
          })}
        </div>

        {/* Seizoenen kolom */}
        <div className="space-y-2">
          <h3 className="font-bold text-gray-700 text-sm sm:text-base mb-1">
            🌿 Seizoen
          </h3>
          {seizoenen.map((seizoen, seizoenIdx) => {
            const isWrong = wrongPair?.seizoenIdx === seizoenIdx;

            // Check of alle kenmerken voor dit seizoen al verbonden zijn
            const totalForThis = pairs.filter(p => p.seizoen === seizoen.naam).length;
            const connectedToThis = Object.entries(connections).filter(
              ([, sIdx]) => sIdx === seizoenIdx,
            ).length;
            const allConnected = totalForThis > 0 && connectedToThis >= totalForThis;

            let btnClass = 'bg-white border-2 border-gray-200 text-gray-700 hover:border-green-400';
            if (allConnected) btnClass = 'bg-green-100 border-2 border-green-400 text-green-800';
            else if (isWrong) btnClass = 'bg-red-100 border-2 border-red-400 text-red-800';
            else if (selectedKenmerk !== null) btnClass = 'bg-green-50 border-2 border-green-300 text-green-800 hover:bg-green-100 cursor-pointer';

            return (
              <button
                key={seizoenIdx}
                onClick={() => handleSeizoenClick(seizoenIdx)}
                disabled={completed || selectedKenmerk === null}
                className={`w-full p-3 sm:p-4 rounded-xl font-bold text-sm sm:text-base transition-all ${btnClass}`}
              >
                {seizoen.emoji} {seizoen.naam}
                {allConnected && <span className="ml-2">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Voortgang */}
      <div className="mt-4 text-center">
        <div className="inline-flex items-center gap-2 text-sm text-gray-500">
          <span>Verbonden: {Object.keys(connections).length}/{pairs.length}</span>
          {completed && <span className="text-green-600 font-bold">🎉 Goed gedaan!</span>}
        </div>
      </div>
    </div>
  );
}

export default SeizoenenMatch;
