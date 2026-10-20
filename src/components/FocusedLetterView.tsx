import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Smoothly scroll the container to center a specific letter card
  const scrollToLetter = useCallback((index: number) => {
    const target = cardRefs.current[index];
    if (target && scrollContainerRef.current) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
      setActiveIndex(index);
    }
  }, []);

  const handlePrev = () => {
    const prev = activeIndex > 0 ? activeIndex - 1 : letters.length - 1;
    scrollToLetter(prev);
  };

  const handleNext = () => {
    const next = activeIndex < letters.length - 1 ? activeIndex + 1 : 0;
    scrollToLetter(next);
  };

  // Track active card while scrolling horizontally
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    cardRefs.current.forEach((card, idx) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  // Center initial card on mount
  useEffect(() => {
    scrollToLetter(0);
  }, [scrollToLetter]);

  const currentLetter = letters[activeIndex] || letters[0];
  const isOpened = currentLetter ? openedLetterIds.includes(currentLetter.id) : false;

  return (
    <div className="w-full max-w-md mx-auto flex flex-col justify-between min-h-[74vh] py-4 select-none animate-fade-in">
      
      {/* 1. Header Counter & All Letters Button */}
      <div className="w-full flex items-center justify-between px-4 mb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-black/60 animate-ping" />
          <span className="text-xs font-serif font-bold text-black/80">
            Letter {activeIndex + 1} of {letters.length}
          </span>
        </div>

        <button
          onClick={onViewAllLetters}
          className="text-[11px] font-bold text-black/90 hover:text-black flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/10 active:scale-95 active:bg-black/20 transition-all shadow-sm"
        >
          <LayoutList className="w-3.5 h-3.5" />
          <span>All Letters ({letters.length})</span>
        </button>
      </div>

      {/* 
        2. Center Stage: Horizontal Smooth Swipeable Track 
        Natural swipe with touch momentum + scroll-snap!
      */}
      <div className="relative w-full my-auto py-2">
        
        {/* Floating Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-1 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/85 text-[#F4C2C2] flex items-center justify-center shadow-lg active:scale-90 transition-transform backdrop-blur-sm"
          aria-label="Previous Letter"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Scroll Track */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="w-full flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar px-[8vw] py-3 items-center scroll-smooth transform-gpu"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {letters.map((letter, idx) => {
            const letterOpened = openedLetterIds.includes(letter.id);
            const isActive = idx === activeIndex;

            return (
              <div
                key={letter.id}
                ref={(el) => (cardRefs.current[idx] = el)}
                onClick={() => {
                  if (isActive) {
                    onOpenLetter(letter);
                  } else {
                    scrollToLetter(idx);
                  }
                }}
                className={`snap-center shrink-0 w-[84vw] max-w-[340px] transition-transform duration-300 ease-out cursor-pointer ${
                  isActive ? 'scale-100 z-10' : 'scale-[0.94] opacity-75'
                }`}
              >
                <EnvelopeCard
                  letter={letter}
                  isOpened={letterOpened}
                  isActive={isActive}
                  onOpen={() => onOpenLetter(letter)}
                />
              </div>
            );
          })}
        </div>

        {/* Floating Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-1 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/85 text-[#F4C2C2] flex items-center justify-center shadow-lg active:scale-90 transition-transform backdrop-blur-sm"
          aria-label="Next Letter"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* 
        3. Bottom Action: Thumb button & Interactive dot track
      */}
      <div className="w-full px-4 mt-4 space-y-4 text-center">
        
        {/* Swipe / Scroll Hint */}
        <p className="text-[11px] text-black/60 font-serif italic">
          ← Swipe to browse letters →
        </p>

        {/* Primary Unseal / Read Button */}
        {currentLetter && (
          <button
            onClick={() => onOpenLetter(currentLetter)}
            className="w-full py-4 px-6 rounded-[22px] bg-black text-[#F4C2C2] font-black text-sm shadow-xl flex items-center justify-center gap-2.5 active:scale-95 transition-all duration-200 border border-[#F4C2C2]/30"
          >
            {isOpened ? (
              <>
                <Sparkles className="w-4 h-4 text-[#F4C2C2]" />
                <span>Read Again</span>
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 text-[#F4C2C2]" />
                <span>Shake or Tap to Unseal Letter</span>
              </>
            )}
          </button>
        )}

        {/* Smooth Dot Indicators */}
        <div className="flex justify-center items-center gap-1.5 pt-1">
          {letters.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToLetter(idx)}
              className={`h-2 rounded-full transition-all duration-300 active:scale-90 ${
                idx === activeIndex
                  ? 'bg-black w-6 shadow-sm'
                  : 'bg-black/25 w-2 hover:bg-black/40'
              }`}
              aria-label={`Go to letter ${idx + 1}`}
            />
          ))}
        </div>
      </div>

    </div>
  );
};
