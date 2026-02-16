import { useEffect, useRef } from 'react';

const DPAD_BUTTONS = [
  { dir: 'up', emoji: '⬆️', pos: 'absolute top-0 left-1/2 -translate-x-1/2' },
  { dir: 'left', emoji: '⬅️', pos: 'absolute top-1/2 left-0 -translate-y-1/2' },
  { dir: 'right', emoji: '➡️', pos: 'absolute top-1/2 right-0 -translate-y-1/2' },
  { dir: 'down', emoji: '⬇️', pos: 'absolute bottom-0 left-1/2 -translate-x-1/2' },
];

export default function DPad({ move }) {
  const containerRef = useRef(null);
  const intervalRef = useRef(null);
  const usedTouchRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const clearRepeat = () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };

    const startMove = (dir) => {
      clearRepeat();
      move(dir);
      intervalRef.current = setInterval(() => move(dir), 120);
    };

    // Native non-passive listeners — preventDefault() werkt hier gegarandeerd
    const onTouchStart = (e) => {
      e.preventDefault();
      e.stopPropagation();
      usedTouchRef.current = true;
      const btn = e.target.closest('[data-dir]');
      if (btn) startMove(btn.dataset.dir);
    };

    const onTouchEnd = (e) => {
      e.preventDefault();
      clearRepeat();
    };

    const onContextMenu = (e) => e.preventDefault();

    const onMouseDown = (e) => {
      if (usedTouchRef.current) { usedTouchRef.current = false; return; }
      const btn = e.target.closest('[data-dir]');
      if (btn) startMove(btn.dataset.dir);
    };

    const onMouseUp = () => clearRepeat();

    el.addEventListener('touchstart', onTouchStart, { passive: false });
    el.addEventListener('touchend', onTouchEnd, { passive: false });
    el.addEventListener('touchcancel', onTouchEnd, { passive: false });
    el.addEventListener('contextmenu', onContextMenu);
    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('mouseup', onMouseUp);
    el.addEventListener('mouseleave', onMouseUp);

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
      el.removeEventListener('contextmenu', onContextMenu);
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('mouseleave', onMouseUp);
      clearRepeat();
    };
  }, [move]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-16 sm:bottom-20 right-2 sm:right-4 z-30 select-none touch-none scale-90 sm:scale-100"
      style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
    >
      <div className="relative w-36 sm:w-40 h-36 sm:h-40">
        {DPAD_BUTTONS.map(({ dir, emoji, pos }) => (
          <button
            key={dir}
            data-dir={dir}
            className={`${pos} w-12 sm:w-14 h-12 sm:h-14 bg-gray-800/80 hover:bg-gray-700/90 active:bg-gray-600 text-white text-xl sm:text-2xl rounded-xl flex items-center justify-center shadow-lg touch-none select-none`}
            style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
          >
            {emoji}
          </button>
        ))}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 sm:w-10 h-8 sm:h-10 bg-gray-700/60 rounded-full flex items-center justify-center">
          <span className="text-white/60 text-xs sm:text-sm">🎮</span>
        </div>
      </div>
    </div>
  );
}
