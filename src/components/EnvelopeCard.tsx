import React from 'react';
import { Letter } from '../types';
import { Mail, Check, Sparkles } from 'lucide-react';

interface EnvelopeCardProps {
  letter: Letter;
  isOpened: boolean;
  onOpen: (letter: Letter) => void;
}

export const EnvelopeCard: React.FC<EnvelopeCardProps> = ({
  letter,
  isOpened,
  onOpen,
}) => {
  return (
    <div
      onClick={() => onOpen(letter)}
      className={`group relative cursor-pointer select-none rounded-3xl bg-[#000000] text-white border-2 border-black hover:border-[#F4C2C2] p-6 sm:p-7 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between overflow-hidden ${
        letter.isSpecial ? 'ring-2 ring-[#F4C2C2] ring-offset-2 ring-offset-[#F4C2C2]' : ''
      }`}
    >
      {/* Top Envelope Flap Triangle Graphic in Black & Baby Pink Line */}
      <div className="absolute top-0 left-0 right-0 h-10 pointer-events-none flex justify-center overflow-hidden">
        <div className="w-0 h-0 border-l-[140px] border-l-transparent border-r-[140px] border-r-transparent border-t-[34px] border-t-zinc-900 group-hover:border-t-zinc-800 transition-colors" />
        <div className="absolute top-0 w-32 h-[1px] bg-[#F4C2C2]/40" />
      </div>

      {/* Top Status & Mood */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <span className="px-3 py-1 rounded-full text-[11px] font-bold border border-[#F4C2C2]/50 text-[#F4C2C2] bg-zinc-950/80 tracking-wide backdrop-blur-sm">
          {letter.categoryLabel}
        </span>

        {letter.isSpecial ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#F4C2C2] text-black shadow-md shadow-pink-900/30 animate-pulse">
            <Sparkles className="w-3 h-3 text-black" />
            <span>Read First</span>
          </span>
        ) : isOpened ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400">
            <Check className="w-3.5 h-3.5" />
            <span>Read</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-400">
            <Mail className="w-3 h-3 text-zinc-400" />
            <span>Sealed</span>
          </span>
        )}
      </div>

      {/* Center Wax Seal in Baby Pink with Black Emoji */}
      <div className="relative z-10 my-4 flex justify-center">
        <div className="relative">
          {/* Circular wax seal */}
          <div className="w-14 h-14 rounded-full bg-[#F4C2C2] text-black flex items-center justify-center text-xl shadow-lg shadow-black/80 group-hover:scale-110 transition-transform duration-300 border-2 border-white/40">
            <span className="transform -rotate-6">{letter.sealEmoji || '💌'}</span>
          </div>

          {/* Stamp ring effect */}
          <div className="absolute -inset-1 rounded-full border border-dashed border-[#F4C2C2]/60 pointer-events-none animate-spin-slow opacity-60 group-hover:opacity-100" />
        </div>
      </div>

      {/* Letter Title & Description */}
      <div className="relative z-10 text-center mt-2 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif font-bold text-white text-lg sm:text-xl group-hover:text-[#F4C2C2] transition-colors leading-snug">
            {letter.title}
          </h3>
          <p className="mt-2 text-xs text-zinc-400 line-clamp-1 italic font-serif">
            "{letter.subtitle}"
          </p>
        </div>

        {/* Snippet / Open Prompt */}
        <div className="mt-6 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs font-semibold text-zinc-400 group-hover:text-[#F4C2C2] transition-colors">
          <span className="truncate max-w-[170px] text-[11px] font-normal text-zinc-500 group-hover:text-zinc-300">
            {letter.previewSnippet}
          </span>
          <span className="font-bold underline decoration-[#F4C2C2] underline-offset-4 shrink-0 ml-2 text-[#F4C2C2]">
            Unseal ➔
          </span>
        </div>
      </div>
    </div>
  );
};
