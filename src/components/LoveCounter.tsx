import React, { useMemo } from 'react';
import { Heart, Calendar, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LoveCounterProps {
  startDate: string; // YYYY-MM-DD
  partnerName: string;
}

export const LoveCounter: React.FC<LoveCounterProps> = ({ startDate, partnerName }) => {
  const daysLoved = useMemo(() => {
    const start = new Date(startDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - start.getTime());
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }, [startDate]);

  const triggerLoveExplosion = () => {
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.2 },
      colors: ['#F4C2C2', '#ffffff', '#000000', '#fbcfe8'],
    });
  };

  return (
    <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-black text-white rounded-2xl border border-black shadow-lg hover:shadow-xl transition-all group">
      <div 
        onClick={triggerLoveExplosion}
        className="w-8 h-8 rounded-xl bg-[#F4C2C2] text-black flex items-center justify-center cursor-pointer active:scale-95 transition-transform shadow-md"
        title="Click for love shower!"
      >
        <Heart className="w-4 h-4 fill-black animate-pulse" />
      </div>

      <div className="text-left">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#F4C2C2]">
          <Calendar className="w-3 h-3 text-[#F4C2C2]" />
          <span>Loving {partnerName}</span>
        </div>
        <p className="text-xs sm:text-sm font-extrabold text-white">
          <span className="text-[#F4C2C2] font-black">{daysLoved}</span> days & counting
        </p>
      </div>

      <button
        onClick={triggerLoveExplosion}
        className="p-1 text-[#F4C2C2] hover:text-white transition-colors"
        title="Sparks"
      >
        <Sparkles className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
