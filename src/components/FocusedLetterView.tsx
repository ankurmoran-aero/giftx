import React, { useState } from 'react';
import { Letter } from '../types';
import { EnvelopeCard } from './EnvelopeCard';
import { ChevronLeft, ChevronRight, LayoutGrid, Sparkles } from 'lucide-react';

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
    <div className="max-w-2xl mx-auto px-4 pt-4 pb-12 flex flex-col items-center animate-fade-in">
      
      {/* Top Controls: Letter Counter & "View All" Button */}
      <div className="w-full flex items-center justify-between mb-6">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black text-[#F4C2C2] text-xs font-bold shadow-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>
            Letter {currentIndex + 1} of {letters.length}
          </span>
        </div>

        <button
          onClick={onViewAllLetters}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/85 hover:bg-black text-white hover:text-[#F4C2C2] text-xs font-bold shadow-md transition-all border border-black/80"
        >
          <LayoutGrid className="w-3.5 h-3.5 text-[#F4C2C2]" />
          <span>View All Envelopes</span>
        </button>
      </div>

      {/* Main Single Envelope Presentation */}
      <div className="w-full relative group">
        <EnvelopeCard
          letter={currentLetter}
          isOpened={isOpened}
          onOpen={() => onOpenLetter(currentLetter)}
        />
      </div>

      {/* Navigation Controls: Previous / Next & Stepper Dots */}
      <div className="mt-8 flex items-center justify-between w-full max-w-sm">
        <button
          onClick={handlePrev}
          className="flex items-center gap-1 px-4 py-2 rounded-2xl bg-black text-[#F4C2C2] hover:bg-zinc-900 text-xs font-bold shadow-md transition-all active:scale-95"
          aria-label="Previous Letter"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        {/* Dots */}
        <div className="flex gap-1.5">
          {letters.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                idx === currentIndex
                  ? 'bg-black w-6 shadow-sm'
                  : 'bg-black/25 hover:bg-black/50'
              }`}
              aria-label={`Go to letter ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="flex items-center gap-1 px-4 py-2 rounded-2xl bg-black text-[#F4C2C2] hover:bg-zinc-900 text-xs font-bold shadow-md transition-all active:scale-95"
          aria-label="Next Letter"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Hint */}
      <p className="mt-6 text-xs text-black/75 font-serif italic text-center">
        Tap the envelope above to enter the 3-shake unsealing experience.
      </p>
    </div>
  );
};
