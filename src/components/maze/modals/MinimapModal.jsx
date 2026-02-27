import Minimap from '../Minimap';

function MinimapModal({ maze, playerPos, challenges, theme, onClose, floors = null, currentFloor = 0, isMultiFloor = false }) {
  return (
    <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-[90vw] max-h-[90vh] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 text-xl sm:text-2xl hover:scale-110 transition-transform z-10 bg-white/80 rounded-full p-1"
        >
          ❌
        </button>
        <Minimap
          maze={maze}
          playerPos={playerPos}
          challenges={challenges}
          theme={theme}
          maxHeight="70vh"
          floors={floors}
          currentFloor={currentFloor}
          isMultiFloor={isMultiFloor}
        />
      </div>
    </div>
  );
}

export default MinimapModal;
