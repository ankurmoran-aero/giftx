import React from 'react';
import { MoodCategory } from '../types';
import { Heart, Sparkles, Smile, Coffee, PartyPopper } from 'lucide-react';
import { LoveCounter } from './LoveCounter';

interface HeaderProps {
  partnerName: string;
  senderName: string;
  anniversaryDate: string;
  selectedCategory: MoodCategory;
  onSelectCategory: (cat: MoodCategory) => void;
  lettersCount: number;
  openedCount: number;
}

const MOOD_FILTERS: { id: MoodCategory; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'All Letters', icon: <Heart className="w-3.5 h-3.5 text-[#F4C2C2]" /> },
  { id: 'special', label: 'Start Here', icon: <Sparkles className="w-3.5 h-3.5 text-[#F4C2C2]" /> },
  { id: 'love', label: 'Love & Romance', icon: <Heart className="w-3.5 h-3.5 fill-[#F4C2C2] text-[#F4C2C2]" /> },
  { id: 'comfort', label: 'Warm Hugs & Comfort', icon: <Coffee className="w-3.5 h-3.5 text-[#F4C2C2]" /> },
  { id: 'fun', label: 'Laughter & Smiles', icon: <Smile className="w-3.5 h-3.5 text-[#F4C2C2]" /> },
  { id: 'celebration', label: 'Celebrations', icon: <PartyPopper className="w-3.5 h-3.5 text-[#F4C2C2]" /> },
];

export const Header: React.FC<HeaderProps> = ({
  partnerName,
  anniversaryDate,
  selectedCategory,
  onSelectCategory,
  lettersCount,
  openedCount,
}) => {
  return (
    <div className="relative pt-8 pb-10 sm:pt-14 sm:pb-14 text-center max-w-4xl mx-auto px-4">
      {/* Love Days Badge */}
      <div className="mb-6 flex justify-center">
        <LoveCounter startDate={anniversaryDate} partnerName={partnerName} />
      </div>

      {/* Main Title */}
      <div className="inline-block relative">
        <h1 className="text-4xl sm:text-6xl font-serif font-black tracking-tight text-black leading-tight drop-shadow-sm">
          Open When...
        </h1>
        <div className="absolute -top-2 -right-7 sm:-right-9 text-2xl sm:text-3xl animate-bounce">
          💌
        </div>
      </div>

      {/* Subtitle */}
      <p className="mt-4 text-base sm:text-lg text-black/85 font-serif max-w-xl mx-auto leading-relaxed">
        A private digital collection of sealed letters written for every feeling, every moment, and whenever you need a reminder of how much you mean to me.
      </p>

      {/* Read Progress Counter */}
      <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black text-[#F4C2C2] text-xs font-bold border border-black shadow-md">
        <span className="w-2 h-2 rounded-full bg-[#F4C2C2] animate-pulse" />
        <span>
          {openedCount} of {lettersCount} letters unsealed
        </span>
      </div>

      {/* Category / Mood Filter Pills */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 max-w-2xl mx-auto">
        {MOOD_FILTERS.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onSelectCategory(filter.id)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
              selectedCategory === filter.id
                ? 'bg-black text-[#F4C2C2] shadow-lg shadow-black/25 scale-105 border-2 border-[#F4C2C2]'
                : 'bg-black/90 hover:bg-black text-white hover:text-[#F4C2C2] border border-black/80 shadow-md'
            }`}
          >
            {filter.icon}
            <span>{filter.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
