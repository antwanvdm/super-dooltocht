import { useState, useEffect } from 'react';
import { generateEnglishConnectPairs } from '../../utils/languageAdapter';

/**
 * EnglishConnect - Verbind Nederlandse woorden met Engelse vertalingen.
 * Tap-based: tik op een NL woord, dan op het EN woord.
 * Toont NIET het goede antwoord bij een fout.
 */
function EnglishConnect({ mathSettings, onSuccess, onFailure }) {
  const [nlWords, setNlWords] = useState([]);
  const [enWords, setEnWords] = useState([]);
  const [selectedNl, setSelectedNl] = useState(null);
  const [connections, setConnections] = useState({}); // nlIndex -> enIndex
  const [wrongPair, setWrongPair] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [pairs, setPairs] = useState([]);

  useEffect(() => {
    const generatedPairs = generateEnglishConnectPairs(mathSettings, 4);
    setPairs(generatedPairs);

    // Maak gescheiden lijsten en shuffle de EN kolom
    setNlWords(generatedPairs.map((p) => p.dutch));
    const shuffledEn = [...generatedPairs.map((p) => p.english)].sort(
      () => Math.random() - 0.5,
    );
    setEnWords(shuffledEn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNlClick = (index) => {
    if (completed || connections[index] !== undefined) return;
    setSelectedNl(selectedNl === index ? null : index);
    setWrongPair(null);
  };

  const handleEnClick = (enIndex) => {
    if (completed || selectedNl === null) return;

    const nlWord = nlWords[selectedNl];
    const enWord = enWords[enIndex];

    // Zoek of dit een correct paar is
    const isCorrect = pairs.some(
      (p) => p.dutch === nlWord && p.english === enWord,
    );

    if (isCorrect) {
      const newConnections = { ...connections, [selectedNl]: enIndex };
      setConnections(newConnections);
      setSelectedNl(null);
      setWrongPair(null);

      // Check of alles verbonden is
      if (Object.keys(newConnections).length === pairs.length) {
        setCompleted(true);
        setTimeout(() => onSuccess(), 1200);
      }
    } else {
      setWrongPair({ nlIndex: selectedNl, enIndex });
      onFailure();
      setTimeout(() => {
        setWrongPair(null);
        setSelectedNl(null);
      }, 1500);
    }
  };

  if (nlWords.length === 0) return null;

  // Welke EN indices zijn al verbonden?
  const connectedEnIndices = new Set(Object.values(connections));

  return (
    <div>
      <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 text-center">
        Verbind elk Nederlands woord met de juiste Engelse vertaling
      </p>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {/* NL kolom */}
        <div className="space-y-2">
          <h3 className="font-bold text-gray-700 text-sm sm:text-base mb-1">
            Nederlands
          </h3>
          {nlWords.map((word, index) => {
            const isConnected = connections[index] !== undefined;
            const isSelected = selectedNl === index;
            const isWrong = wrongPair?.nlIndex === index;

            let btnClass =
              'bg-white border-2 border-gray-200 text-gray-800 hover:border-orange-400';
            if (isConnected)
              btnClass =
                'bg-green-100 border-2 border-green-400 text-green-800';
            else if (isWrong)
              btnClass = 'bg-red-100 border-2 border-red-400 text-red-800';
            else if (isSelected)
              btnClass =
                'bg-orange-100 border-2 border-orange-500 text-orange-800 ring-2 ring-orange-300';

            return (
              <button
                key={index}
                onClick={() => handleNlClick(index)}
                disabled={isConnected || completed}
                className={`w-full p-3 sm:p-4 rounded-xl font-bold text-lg sm:text-xl transition-all ${btnClass}`}
              >
                {word}
                {isConnected && <span className="ml-2">✓</span>}
              </button>
            );
          })}
        </div>

        {/* EN kolom */}
        <div className="space-y-2">
          <h3 className="font-bold text-gray-700 text-sm sm:text-base mb-1">
            English
          </h3>
          {enWords.map((word, enIndex) => {
            const isConnected = connectedEnIndices.has(enIndex);
            const isWrong = wrongPair?.enIndex === enIndex;

            let btnClass =
              'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-400';
            if (isConnected)
              btnClass =
                'bg-green-100 border-2 border-green-400 text-green-800';
            else if (isWrong)
              btnClass = 'bg-red-100 border-2 border-red-400 text-red-800';
            else if (selectedNl !== null)
              btnClass =
                'bg-blue-50 border-2 border-blue-300 text-blue-800 hover:bg-blue-100 cursor-pointer';

            return (
              <button
                key={enIndex}
                onClick={() => handleEnClick(enIndex)}
                disabled={completed || selectedNl === null || isConnected}
                className={`w-full p-3 sm:p-4 rounded-xl font-bold text-lg sm:text-xl transition-all ${btnClass}`}
              >
                {word}
                {isConnected && <span className="ml-2">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Voortgang */}
      <div className="mt-4 text-center">
        <div className="inline-flex items-center gap-2 text-sm text-gray-500">
          <span>
            Verbonden: {Object.keys(connections).length}/{pairs.length}
          </span>
          {completed && (
            <span className="text-green-600 font-bold">🎉 Great job!</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default EnglishConnect;
