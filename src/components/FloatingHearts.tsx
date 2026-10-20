import React, { useEffect, useState } from 'react';

interface HeartParticle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

const EMOJIS = ['❤️', '💖', '✨', '🌸', '💌', '💕', '🌷'];

export const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);

  useEffect(() => {
    // Generate initial floating particles
    const initialHearts: HeartParticle[] = Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      x: Math.random() * 95, // 0 to 95vw
      size: Math.random() * 12 + 14, // 14px to 26px
      duration: Math.random() * 8 + 12, // 12s to 20s
      delay: Math.random() * 8,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    }));
    setHearts(initialHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute bottom-[-40px] opacity-25 select-none animate-float-heart"
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
