import React, { useState } from 'react';
import { Letter } from '../types';
import { EnvelopeCard } from './EnvelopeCard';
import { ChevronLeft, ChevronRight, Mail, Sparkles, LayoutList } from 'lucide-react';

interface FocusedLetterViewProps {
  letters: Letter[];
  openedLetterIds: string[];
  onOpenLetter: (letter: Letter) => void;
  onViewAllLetters: () => void;
}

export const FocusedLetterView: React.FC<FocusedLetterViewProps> = ({
  letters,
  openedLetterIds,
  onOpenLetter,
  onViewAllLetters,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentLetter = letters[currentIndex] || letters[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : letters.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < letters.length - 1 ? prev + 1 : 0));
  };

  if (!currentLetter) return null;

  const isOpened = openedLetterIds.includes(currentLetter.id);

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-between min-h-[70vh] py-4 select-none animate-fade-in">
      
      {/* 1. Minimal Header Counter */}
      <div className="w-full flex items-center justify-between px-2 mb-4">
        <span className="text-xs font-serif italic text-black/70">
          Letter {currentIndex + 1} of {letters.length}
        </span>

        <button
          onClick={onViewAllLetters}
          className="text-[11px] font-bold text-black/80 hover:text-black flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/10 active:bg-black/20 transition-colors"
        >
          <LayoutList className="w-3 h-3" />
          <span>All ({letters.length})</span>
        </button>
      </div>

      {/* 2. Center Stage: The Envelope with Left/Right Navigation */}
      <div className="w-full relative my-auto">
        {/* Floating Left Arrow on mobile edge */}
        <button
          onClick={handlePrev}
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/80 text-[#F4C2C2] flex items-center justify-center shadow-md active:scale-90 transition-transform"
          aria-label="Previous Letter"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* The Envelope */}
        <div className="px-1">
          <EnvelopeCard
            letter={currentLetter}
            isOpened={isOpened}
            onOpen={() => onOpenLetter(currentLetter)}
          />
        </div>

        {/* Floating Right Arrow on mobile edge */}
        <button
          onClick={handleNext}
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/80 text-[#F4C2C2] flex items-center justify-center shadow-md active:scale-90 transition-transform"
          aria-label="Next Letter"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 3. Bottom Action: One primary thumb button & subtle pagination */}
      <div className="w-full mt-6 space-y-4 text-center">
        {/* Primary Unseal Button */}
        <button
          onClick={() => onOpenLetter(currentLetter)}
          className="w-full py-3.5 px-6 rounded-2xl bg-black text-[#F4C2C2] font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          {isOpened ? (
            <>
              <Sparkles className="w-4 h-4 text-[#F4C2C2]" />
              <span>Read Again</span>
            </>
          ) : (
            <>
              <Mail className="w-4 h-4 text-[#F4C2C2]" />
              <span>Shake or Tap to Unseal</span>
            </>
          )}
        </button>

        {/* Minimal dot indicators */}
        <div className="flex justify-center gap-1.5 pt-1">
          {letters.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentIndex
                  ? 'bg-black w-5'
                  : 'bg-black/25 w-1.5'
              }`}
              aria-label={`Go to letter ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
