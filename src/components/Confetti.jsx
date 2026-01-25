import { useEffect, useState } from 'react';

function Confetti({ duration = 3000 }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3', '#f38181', '#a8e6cf', '#dcedc1', '#ffd3b6'];
    const emojis = ['🎉', '⭐', '🌟', '✨', '🎊', '💫', '🏆', '👏'];
    
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      emoji: Math.random() > 0.7 ? emojis[Math.floor(Math.random() * emojis.length)] : null,
      size: 8 + Math.random() * 12,
      rotation: Math.random() * 360,
    }));
    
    setParticles(newParticles);
    
    const timer = setTimeout(() => {
      setParticles([]);
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${p.x}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        >
          {p.emoji ? (
            <span className="text-2xl">{p.emoji}</span>
          ) : (
            <div
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                transform: `rotate(${p.rotation}deg)`,
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Confetti;
