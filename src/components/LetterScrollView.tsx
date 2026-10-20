import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Letter } from '../types';
import { Mail, Sparkles, LayoutList, ChevronUp } from 'lucide-react';

interface LetterScrollViewProps {
  letters: Letter[];
  openedLetterIds: string[];
  onOpenLetter: (letter: Letter) => void;
  onViewAll: () => void;
}

export const LetterScrollView: React.FC<LetterScrollViewProps> = ({
  letters,
  openedLetterIds,
  onOpenLetter,
  onViewAll,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const scrolling = useRef(false);

  const scrollTo = useCallback((index: number) => {
    const el = sectionRefs.current[index];
    if (!el || scrolling.current) return;
    scrolling.current = true;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveIndex(index);
    setTimeout(() => { scrolling.current = false; }, 600);
  }, []);

  // IntersectionObserver — whichever section is ≥50% visible becomes active
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (scrolling.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.findIndex((r) => r === entry.target);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.55 }
    );
    sectionRefs.current.forEach((r) => r && obs.observe(r));
    return () => obs.disconnect();
  }, [letters.length]);

  return (
    <div ref={containerRef} className="relative w-full">

      {/* ── Sticky side progress rail ── */}
      <div className="fixed right-3 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-1.5">
        {letters.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Jump to letter ${i + 1}`}
            className={`rounded-full transition-all duration-300 active:scale-75 ${
              i === activeIndex
                ? 'w-2 h-6 bg-black shadow-md'
                : 'w-1.5 h-1.5 bg-black/30 hover:bg-black/60'
            }`}
          />
        ))}
      </div>

      {/* ── One full-screen section per letter ── */}
      {letters.map((letter, idx) => {
        const isActive = idx === activeIndex;
        const isOpened = openedLetterIds.includes(letter.id);

        return (
          <section
            key={letter.id}
            ref={(el) => (sectionRefs.current[idx] = el as HTMLDivElement | null)}
            className="min-h-[100dvh] flex flex-col items-center justify-center px-5 py-8 snap-start"
          >
            {/* Letter number hint */}
            <p
              className={`text-[11px] font-bold uppercase tracking-widest mb-3 transition-all duration-500 ${
                isActive ? 'text-black/70' : 'text-black/30'
              }`}
            >
              {idx + 1} / {letters.length}
            </p>

            {/* ── The Envelope Card ── */}
            <div
              onClick={() => isActive && onOpenLetter(letter)}
              className={`w-full max-w-[340px] relative cursor-pointer select-none transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                isActive
                  ? 'scale-100 opacity-100 translate-y-0'
                  : 'scale-[0.88] opacity-40 translate-y-4'
              }`}
            >
              {/* Card body */}
              <div
                className={`rounded-[28px] overflow-hidden border transition-all duration-500 ${
                  isActive
                    ? 'border-[#F4C2C2]/50 shadow-[0_20px_60px_rgba(0,0,0,0.25),0_0_30px_rgba(244,194,194,0.15)]'
                    : 'border-zinc-800/60 shadow-lg'
                } bg-gradient-to-br from-[#1e1720] via-[#14101a] to-[#0d0b10]`}
              >
                {/* Thin top accent bar */}
                <div className={`h-1 transition-all duration-500 ${isActive ? 'bg-[#F4C2C2]' : 'bg-zinc-800'}`} />

                <div className="p-5 space-y-4">
                  {/* Top row */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold border border-[#F4C2C2]/30 text-[#F4C2C2] bg-black/50 tracking-widest uppercase">
                      {letter.categoryLabel}
                    </span>
                    <div className="flex items-center gap-1.5 border border-dashed border-[#F4C2C2]/40 rounded-xl px-2.5 py-1">
                      <span className="text-sm">{letter.sealEmoji || '💌'}</span>
                      <span className="text-[8px] uppercase tracking-wider text-zinc-500 font-bold">Airmail</span>
                    </div>
                  </div>

                  {/* Address & title */}
                  <div className="pt-1">
                    <p className="font-cursive text-[13px] text-[#F4C2C2] tracking-wide">
                      To: My Favorite Girl ❤️
                    </p>
                    <h3 className="mt-1 font-serif font-black text-white text-lg leading-snug">
                      {letter.title}
                    </h3>
                    <p className="mt-0.5 text-[11px] text-zinc-400 font-serif italic line-clamp-1">
                      "{letter.subtitle}"
                    </p>
                  </div>

                  {/* Postmark row */}
                  <div className="flex items-center justify-between border-t border-zinc-800/70 pt-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#F4C2C2] flex items-center justify-center text-[11px] shadow">
                        {letter.sealEmoji || '💌'}
                      </div>
                      <span className="text-[10px] text-zinc-500 truncate max-w-[130px]">
                        {isOpened ? letter.previewSnippet : '🔒 Shake to unseal'}
                      </span>
                    </div>

                    {isOpened ? (
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded-full">
                        Read ✓
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-[#F4C2C2] border border-[#F4C2C2]/30 px-2 py-0.5 rounded-full">
                        Sealed
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Visible-only-when-active: ghost peek from next card */}
              {isActive && idx < letters.length - 1 && (
                <div className="absolute -bottom-6 left-4 right-4 h-6 rounded-b-[24px] bg-gradient-to-br from-[#18141c] to-[#100d14] border border-zinc-800/50 opacity-50 z-[-1]" />
              )}
            </div>

            {/* ── CTA below card, only for active ── */}
            <div
              className={`mt-6 w-full max-w-[340px] transition-all duration-500 ${
                isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              <button
                onClick={() => onOpenLetter(letter)}
                className="w-full py-4 rounded-2xl bg-black text-[#F4C2C2] font-black text-sm border border-[#F4C2C2]/30 shadow-xl flex items-center justify-center gap-2.5 active:scale-95 transition-all duration-200"
              >
                {isOpened ? (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Read Again
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    Shake or Tap to Unseal
                  </>
                )}
              </button>

              {/* Scroll hint */}
              {idx < letters.length - 1 && (
                <p className="text-center text-[11px] text-black/50 font-serif italic mt-3 flex items-center justify-center gap-1">
                  scroll for next letter
                  <span className="inline-block animate-bounce">↓</span>
                </p>
              )}
            </div>
          </section>
        );
      })}

      {/* ── Footer: View All & Back to Top ── */}
      <section className="min-h-[50dvh] flex flex-col items-center justify-center px-5 py-10 gap-4">
        <p className="font-cursive text-2xl text-black/70">That's all of them 💌</p>
        <button
          onClick={onViewAll}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-black text-[#F4C2C2] font-bold text-sm active:scale-95 transition-all shadow-lg"
        >
          <LayoutList className="w-4 h-4" />
          Browse All Letters
        </button>
        <button
          onClick={() => scrollTo(0)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-black/10 text-black font-bold text-xs active:scale-95 transition-all"
        >
          <ChevronUp className="w-3.5 h-3.5" />
          Back to top
        </button>
      </section>

    </div>
  );
};
