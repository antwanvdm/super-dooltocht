import { useState, useEffect } from 'react';
import { generateDigitaalConnectPairs } from '../../utils/digitaalData';

const COLORS = [
  { bg: 'bg-blue-500', text: 'text-white', light: 'bg-blue-100 border-blue-400' },
  { bg: 'bg-green-500', text: 'text-white', light: 'bg-green-100 border-green-400' },
  { bg: 'bg-purple-500', text: 'text-white', light: 'bg-purple-100 border-purple-400' },
  { bg: 'bg-orange-500', text: 'text-white', light: 'bg-orange-100 border-orange-400' },
];

function DigitaalConnect({ onSuccess, onFailure }) {
  const [leftItems, setLeftItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [connections, setConnections] = useState({});
  const [wrongPair, setWrongPair] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [pairs, setPairs] = useState([]);

  useEffect(() => {
    const generatedPairs = generateDigitaalConnectPairs(4);
    setPairs(generatedPairs);
    setLeftItems(generatedPairs.map(p => p.left));
    setRightItems(
      generatedPairs.map((p, i) => ({ text: p.right, correctIndex: i }))
        .sort(() => Math.random() - 0.5)
    );
  }, []);

  const handleLeftClick = (index) => {
    if (completed || connections[index] !== undefined) return;
    setSelectedLeft(index);
    setWrongPair(null);
  };

  const handleRightClick = (rightIndex) => {
    if (completed || selectedLeft === null) return;

    const rightItem = rightItems[rightIndex];
    // Check if already connected
    if (Object.values(connections).includes(rightIndex)) return;

    if (rightItem.correctIndex === selectedLeft) {
      const newConnections = { ...connections, [selectedLeft]: rightIndex };
      setConnections(newConnections);
      setSelectedLeft(null);

      if (Object.keys(newConnections).length === pairs.length) {
        setCompleted(true);
        setTimeout(() => onSuccess(), 1000);
      }
    } else {
      setWrongPair({ left: selectedLeft, right: rightIndex });
      onFailure();
      setTimeout(() => {
        setWrongPair(null);
        setSelectedLeft(null);
      }, 1500);
    }
  };

  return (
    <div>
      <p className="text-base sm:text-xl text-gray-600 text-center mb-4 sm:mb-6">
        Verbind elk woord met de juiste uitleg!
      </p>
      <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-2xl mx-auto">
        {/* Left column - terms */}
        <div className="space-y-2 sm:space-y-3">
          {leftItems.map((item, index) => {
            const isConnected = connections[index] !== undefined;
            const isSelected = selectedLeft === index;
            const isWrong = wrongPair?.left === index;
            const colorClass = isConnected ? COLORS[index % COLORS.length] : null;

            return (
              <button
                key={`left-${index}`}
                onClick={() => handleLeftClick(index)}
                disabled={isConnected}
                className={`w-full p-2 sm:p-3 rounded-xl font-bold text-sm sm:text-base transition-all text-center ${
                  isConnected
                    ? `${colorClass.bg} ${colorClass.text}`
                    : isWrong
                      ? 'bg-red-400 text-white'
                      : isSelected
                        ? 'bg-slate-600 text-white ring-2 ring-slate-400 scale-[1.02]'
                        : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-slate-400'
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* Right column - definitions */}
        <div className="space-y-2 sm:space-y-3">
          {rightItems.map((item, index) => {
            const connectedLeft = Object.entries(connections).find(([, v]) => v === index);
            const isConnected = !!connectedLeft;
            const isWrong = wrongPair?.right === index;
            const colorClass = isConnected ? COLORS[Number(connectedLeft[0]) % COLORS.length] : null;

            return (
              <button
                key={`right-${index}`}
                onClick={() => handleRightClick(index)}
                disabled={isConnected}
                className={`w-full p-2 sm:p-3 rounded-xl font-medium text-xs sm:text-sm transition-all text-left ${
                  isConnected
                    ? `${colorClass.light} border-2`
                    : isWrong
                      ? 'bg-red-400 text-white'
                      : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-slate-400'
                }`}
              >
                {item.text}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DigitaalConnect;
