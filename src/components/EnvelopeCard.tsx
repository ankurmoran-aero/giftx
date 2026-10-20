import React from 'react';
import { Letter } from '../types';
import { Mail, Check, Sparkles } from 'lucide-react';

interface EnvelopeCardProps {
  letter: Letter;
  isOpened: boolean;
  isActive?: boolean;
  onOpen: (letter: Letter) => void;
}

export const EnvelopeCard: React.FC<EnvelopeCardProps> = ({
  letter,
  isOpened,
  isActive = true,
  onOpen,
}) => {
  return (
    <div
      onClick={() => onOpen(letter)}
      className={`group relative cursor-pointer select-none rounded-[28px] text-white p-5 shadow-2xl transition-all duration-300 transform-gpu flex flex-col justify-between overflow-hidden h-[180px] w-full mx-auto border active:scale-[0.97] ${
        isActive
          ? 'bg-gradient-to-br from-[#1c171a] via-[#130f13] to-[#0c0a0c] border-[#F4C2C2]/40 shadow-[0_12px_36px_rgba(0,0,0,0.2),0_0_24px_rgba(244,194,194,0.12)] scale-100 opacity-100'
          : 'bg-[#120e12]/90 border-zinc-800/80 scale-[0.96] opacity-75'
      } ${
        letter.isSpecial ? 'ring-2 ring-[#F4C2C2]/60 ring-offset-2 ring-offset-[#F4C2C2]' : ''
      }`}
    >
      {/* Soft embossed paper fold texture */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#F4C2C2]/5 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-1/2 border-b border-[#F4C2C2]/20 rounded-b-[40px]" />
      </div>

      {/* Top Row: Category Label & Postage Stamp */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold border border-[#F4C2C2]/35 text-[#F4C2C2] bg-black/60 tracking-wider uppercase shadow-sm">
            {letter.categoryLabel}
          </span>
          {letter.isSpecial && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider bg-[#F4C2C2] text-black shadow-sm">
              <Sparkles className="w-2.5 h-2.5 text-black" />
              <span>Special</span>
            </span>
          )}
        </div>

        {/* Soft Postage Stamp */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-zinc-500 font-mono tracking-tighter opacity-60 select-none">
            ≋≋
          </span>
          <div className="px-2.5 py-1 rounded-xl bg-black/70 border border-dashed border-[#F4C2C2]/50 flex items-center gap-1 text-[10px] font-bold text-[#F4C2C2] shadow-sm">
            <span>{letter.sealEmoji || '💌'}</span>
            <span className="text-[8px] uppercase tracking-wider text-zinc-400">Airmail</span>
          </div>
        </div>
      </div>

      {/* Center: Recipient address line & Title */}
      <div className="relative z-10 my-auto py-1">
        <p className="text-[13px] font-cursive text-[#F4C2C2] tracking-wide select-none">
          To: My Favorite Girl ❤️
        </p>
        <h3 className="font-serif font-black text-white text-base sm:text-lg group-hover:text-[#F4C2C2] transition-colors leading-tight line-clamp-1 mt-0.5">
          {letter.title}
        </h3>
        <p className="text-[11px] text-zinc-400 font-serif italic line-clamp-1 mt-0.5">
          "{letter.subtitle}"
        </p>
      </div>

      {/* Bottom Envelope Footer */}
      <div className="relative z-10 pt-2 border-t border-zinc-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#F4C2C2] text-black text-[11px] font-bold flex items-center justify-center shadow-md">
            <span className="transform -rotate-6">{letter.sealEmoji || '💌'}</span>
          </div>
          <span className="text-[10px] font-medium text-zinc-400 truncate max-w-[150px]">
            {isOpened ? (letter.previewSnippet || 'Read letter') : '🔒 3-Stage Shake to Open'}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {isOpened ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-700/60 shadow-sm">
              <Check className="w-2.5 h-2.5" />
              <span>Read</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#F4C2C2] bg-zinc-900/90 px-2.5 py-1 rounded-full border border-[#F4C2C2]/30 shadow-sm group-hover:bg-[#F4C2C2] group-hover:text-black transition-colors">
              <Mail className="w-3 h-3" />
              <span>Open ➔</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
