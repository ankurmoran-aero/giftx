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
      className={`group relative cursor-pointer select-none rounded-2xl bg-[#09090b] text-white border-2 border-zinc-800 hover:border-[#F4C2C2] p-4 sm:p-5 shadow-xl transition-transform duration-200 active:scale-[0.98] transform-gpu flex flex-col justify-between overflow-hidden h-[175px] w-full max-w-sm mx-auto ${
        letter.isSpecial ? 'ring-2 ring-[#F4C2C2] ring-offset-2 ring-offset-[#F4C2C2]' : ''
      }`}
    >
      {/* Postal Envelope Crease Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-[55px] border-b border-[#F4C2C2]/40 transform -skew-y-3" />
        <div className="absolute top-0 right-0 w-full h-[55px] border-b border-[#F4C2C2]/40 transform skew-y-3" />
      </div>

      {/* Top Row: Category Label & Postage Stamp */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-[#F4C2C2]/40 text-[#F4C2C2] bg-black tracking-wider uppercase">
            {letter.categoryLabel}
          </span>
          {letter.isSpecial && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-[#F4C2C2] text-black">
              <Sparkles className="w-2.5 h-2.5 text-black" />
              <span>Priority</span>
            </span>
          )}
        </div>

        {/* Postage Stamp Box */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-zinc-500 font-mono tracking-tighter opacity-70 select-none">
            ≋≋
          </span>
          <div className="px-2 py-0.5 rounded bg-black border border-dashed border-[#F4C2C2]/60 flex items-center gap-1 text-[10px] font-bold text-[#F4C2C2]">
            <span>{letter.sealEmoji || '💌'}</span>
            <span className="text-[8px] uppercase tracking-wider text-zinc-400">Post</span>
          </div>
        </div>
      </div>

      {/* Center: Recipient address line & Title */}
      <div className="relative z-10 my-auto py-1">
        <p className="text-[12px] font-cursive text-[#F4C2C2] tracking-wide select-none">
          To: My Favorite Girl ❤️
        </p>
        <h3 className="font-serif font-bold text-white text-base sm:text-lg group-hover:text-[#F4C2C2] transition-colors leading-tight line-clamp-1 mt-0.5">
          {letter.title}
        </h3>
        <p className="text-[11px] text-zinc-400 font-serif italic line-clamp-1 mt-0.5">
          "{letter.subtitle}"
        </p>
      </div>

      {/* Bottom Envelope Footer */}
      <div className="relative z-10 pt-2 border-t border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#F4C2C2] text-black text-[11px] font-bold flex items-center justify-center shadow-sm">
            <span className="transform -rotate-6">{letter.sealEmoji || '💌'}</span>
          </div>
          <span className="text-[10px] text-zinc-400 truncate max-w-[140px]">
            {letter.previewSnippet}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {isOpened ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
              <Check className="w-2.5 h-2.5" />
              <span>Read</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#F4C2C2]">
              <Mail className="w-3 h-3 text-[#F4C2C2]" />
              <span>Open ➔</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
