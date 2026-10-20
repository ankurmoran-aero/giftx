import React, { useEffect, useState } from 'react';

interface HeartParticle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

const EMOJIS = ['❤️', '✨', '💌', '🌸', '💕'];

export const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);

  useEffect(() => {
    // Keep it lightweight (only 6 particles) for 60fps mobile performance
    const initialHearts: HeartParticle[] = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      x: 10 + i * 16, // evenly distributed across screen width
      size: 16 + (i % 3) * 4,
      duration: 14 + (i % 4) * 2,
      delay: i * 2.2,
      emoji: EMOJIS[i % EMOJIS.length],
    }));
    setHearts(initialHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute bottom-[-30px] opacity-25 select-none animate-float-heart will-change-transform"
          style={{
            left: `${heart.x}vw`,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  );
};
