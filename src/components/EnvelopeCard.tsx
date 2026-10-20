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
      className={`group relative cursor-pointer select-none rounded-2xl bg-black text-white border-2 border-zinc-800 hover:border-[#F4C2C2] p-4 sm:p-5 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden min-h-[175px] max-h-[195px] ${
        letter.isSpecial ? 'ring-2 ring-[#F4C2C2] ring-offset-2 ring-offset-[#F4C2C2]' : ''
      }`}
    >
      {/* Postal Envelope Fold Lines (Subtle geometric seam lines) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {/* Diagonal envelope crease lines */}
        <div className="absolute top-0 left-0 w-full h-[60px] border-b border-[#F4C2C2]/40 transform -skew-y-3" />
        <div className="absolute top-0 right-0 w-full h-[60px] border-b border-[#F4C2C2]/40 transform skew-y-3" />
      </div>

      {/* Top Header Row: Category Badge on left, Postal Stamp on right */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-[#F4C2C2]/40 text-[#F4C2C2] bg-zinc-950 tracking-wider uppercase">
            {letter.categoryLabel}
          </span>
          {letter.isSpecial && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-[#F4C2C2] text-black shadow-sm animate-pulse">
              <Sparkles className="w-2.5 h-2.5 text-black" />
              <span>Priority</span>
            </span>
          )}
        </div>

        {/* Vintage Postal Stamp Badge with Wavy Postmark */}
        <div className="flex items-center gap-1.5">
          {/* Postmark Waves */}
          <span className="text-[10px] text-zinc-500 font-mono tracking-tighter opacity-70 hidden sm:inline select-none">
            ≋≋≋
          </span>
          {/* Postage Stamp Box */}
          <div className="px-2 py-1 rounded bg-zinc-900/90 border border-dashed border-[#F4C2C2]/60 flex items-center gap-1 text-[10px] font-bold text-[#F4C2C2]">
            <span>{letter.sealEmoji || '💌'}</span>
            <span className="text-[8px] uppercase tracking-wider text-zinc-400">Post</span>
          </div>
        </div>
      </div>

      {/* Center: Recipient address line & Letter Title */}
      <div className="relative z-10 my-auto py-1">
        <p className="text-[12px] font-cursive text-[#F4C2C2]/90 tracking-wide select-none">
          To: My Favorite Girl ❤️
        </p>
        <h3 className="font-serif font-bold text-white text-base sm:text-lg group-hover:text-[#F4C2C2] transition-colors leading-tight line-clamp-1 mt-0.5">
          {letter.title}
        </h3>
        <p className="text-[11px] text-zinc-400 font-serif italic line-clamp-1 mt-0.5">
          "{letter.subtitle}"
        </p>
      </div>

      {/* Bottom Envelope Footer: Wax Seal + Status / Unseal link */}
      <div className="relative z-10 pt-2 border-t border-zinc-850 flex items-center justify-between">
        {/* Compact Wax Seal */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#F4C2C2] text-black text-xs font-bold flex items-center justify-center shadow-md shadow-black group-hover:scale-110 transition-transform">
            <span className="transform -rotate-6">{letter.sealEmoji || '💌'}</span>
          </div>
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
            {letter.previewSnippet.slice(0, 22)}...
          </span>
        </div>

        {/* Status / Prompt */}
        <div className="flex items-center gap-1">
          {isOpened ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800">
              <Check className="w-2.5 h-2.5" />
              <span>Read</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#F4C2C2] group-hover:underline underline-offset-2">
              <Mail className="w-3 h-3 text-[#F4C2C2]" />
              <span>Unseal ➔</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
