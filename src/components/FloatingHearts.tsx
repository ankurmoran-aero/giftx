import React, { useEffect, useState } from 'react';

interface FloatingItem {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  type: 'emoji' | 'orb';
  content?: string;
  isAlt?: boolean;
}

const ICONS = ['💗', '🌸', '✨', '💕', '💌', '☁️', '💖'];

export const FloatingHearts: React.FC = () => {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    // 10 lightweight ambient items for 60fps performance
    const generated: FloatingItem[] = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      x: 6 + i * 9.5, // spread across viewport width
      size: i % 3 === 0 ? 14 : i % 3 === 1 ? 20 : 16,
      duration: 13 + (i % 4) * 2.5,
      delay: (i * 1.8) % 12,
      type: i % 4 === 0 ? 'orb' : 'emoji',
      content: ICONS[i % ICONS.length],
      isAlt: i % 2 === 1,
    }));
    setItems(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {items.map((item) => {
        if (item.type === 'orb') {
          return (
            <div
              key={item.id}
              className={`absolute bottom-[-40px] rounded-full bg-pink-300/25 blur-sm select-none will-change-transform ${
                item.isAlt ? 'animate-float-gentle-alt' : 'animate-float-gentle'
              }`}
              style={{
                left: `${item.x}vw`,
                width: `${item.size * 1.5}px`,
                height: `${item.size * 1.5}px`,
                animationDuration: `${item.duration}s`,
                animationDelay: `${item.delay}s`,
              }}
            />
          );
        }

        return (
          <span
            key={item.id}
            className={`absolute bottom-[-30px] select-none will-change-transform ${
              item.isAlt ? 'animate-float-gentle-alt' : 'animate-float-gentle'
            }`}
            style={{
              left: `${item.x}vw`,
              fontSize: `${item.size}px`,
              animationDuration: `${item.duration}s`,
              animationDelay: `${item.delay}s`,
            }}
          >
            {item.content}
          </span>
        );
      })}
    </div>
  );
};
