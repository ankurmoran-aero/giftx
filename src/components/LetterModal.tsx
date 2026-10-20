import React, { useState } from 'react';
import { Letter } from '../types';
import { X, Heart, Eye, Camera, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LetterModalProps {
  letter: Letter | null;
  onClose: () => void;
}

export const LetterModal: React.FC<LetterModalProps> = ({ letter, onClose }) => {
  const [showSecret, setShowSecret] = useState(false);
  const [hugSent, setHugSent] = useState(false);

  if (!letter) return null;

  const handleSendHug = () => {
    setHugSent(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#F4C2C2', '#ffffff', '#fb7185', '#000000'],
    });
    setTimeout(() => setHugSent(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 flex items-center justify-center p-3 sm:p-5">
      
      {/* Real Letter Stationery in Soft Velvet Black */}
      <div className="relative w-full max-w-lg bg-gradient-to-br from-[#181417] via-[#120f12] to-[#0c0a0c] text-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.3),0_0_30px_rgba(244,194,194,0.12)] border border-[#F4C2C2]/40 overflow-hidden my-4 max-h-[92vh] flex flex-col">
        
        {/* Baby Pink Top Stationery Line */}
        <div className="h-1.5 bg-[#F4C2C2] shrink-0" />

        {/* Top Header Row with Close Button */}
        <div className="p-4 sm:p-6 pb-3 border-b border-zinc-800/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-[#F4C2C2] text-black font-bold flex items-center justify-center text-xs shadow-sm">
              {letter.sealEmoji || '💌'}
            </span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#F4C2C2]">
              {letter.categoryLabel}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/60 text-zinc-400 hover:text-white border border-zinc-800 active:scale-90 transition-transform"
            aria-label="Close letter"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Letter Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 flex-1">
          
          {/* Salutation & Title in Special Serif Font */}
          <div>
            <p className="font-cursive text-lg text-[#F4C2C2] tracking-wide">
              Dearest Love,
            </p>
            <h2 className="text-xl sm:text-2xl font-serif font-black text-white tracking-tight mt-0.5 leading-snug">
              {letter.title}
            </h2>
            <p className="text-[11px] text-zinc-400 font-serif italic mt-0.5">
              ~ {letter.subtitle} ~
            </p>
          </div>

          {/* Letter Content Paragraphs */}
          <div className="space-y-4 font-serif text-zinc-200 text-sm sm:text-base leading-relaxed">
            {letter.content.map((paragraph, idx) => (
              <p 
                key={idx} 
                className="first-letter:text-2xl first-letter:font-bold first-letter:text-[#F4C2C2] first-letter:mr-0.5"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Cleanly Cropped Polaroid Memory Photo */}
          {letter.polaroid && (
            <div className="pt-2 flex justify-center">
              <div 
                className="bg-[#121214] p-2.5 pb-4 rounded-xl shadow-xl border border-zinc-800 max-w-[220px]"
                style={{ transform: `rotate(${letter.polaroid.rotationDeg || 0}deg)` }}
              >
                {/* Baby Pink Washi Tape Header */}
                <div className="w-12 h-3 bg-[#F4C2C2] mx-auto -mt-4 mb-2 rounded-sm opacity-90" />
                
                {/* Photo */}
                <div className="overflow-hidden rounded-lg aspect-square w-full bg-zinc-950">
                  <img
                    src={letter.polaroid.url}
                    alt={letter.polaroid.caption}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
                
                {/* Caption */}
                <div className="flex items-center justify-center gap-1 mt-2 text-[11px] text-[#F4C2C2] font-cursive">
                  <Camera className="w-3 h-3 text-[#F4C2C2]" />
                  <span>{letter.polaroid.caption}</span>
                </div>
              </div>
            </div>
          )}

          {/* Handwritten Sign Off in Caveat Font */}
          <div className="pt-4 border-t border-zinc-850 flex flex-col items-end text-right">
            <p className="text-xs text-zinc-400 font-serif italic">{letter.signOff || 'With all my love,'}</p>
            <p className="text-xl sm:text-2xl font-cursive font-bold text-[#F4C2C2] mt-0.5 select-none">
              {letter.senderName || 'Ankur'}
            </p>
          </div>

          {/* Secret P.S. Scratch Note in Black & Baby Pink */}
          {letter.secretNote && (
            <div>
              {!showSecret ? (
                <button
                  onClick={() => setShowSecret(true)}
                  className="w-full py-2.5 px-3 rounded-xl bg-zinc-900 border border-dashed border-[#F4C2C2]/50 text-[#F4C2C2] text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Eye className="w-3.5 h-3.5 text-[#F4C2C2]" />
                  <span>Tap to reveal secret P.S. note</span>
                </button>
              ) : (
                <div className="p-3 rounded-xl bg-zinc-900 border border-[#F4C2C2]/60 text-white text-xs font-serif italic flex items-start gap-2">
                  <span>💌</span>
                  <div className="flex-1">
                    <span className="font-bold not-italic text-[#F4C2C2] uppercase text-[9px] tracking-wider block">
                      Secret Note
                    </span>
                    <p>{letter.secretNote}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Actions: Hug & Put Back */}
        <div className="p-4 border-t border-zinc-800/80 bg-black/60 flex items-center justify-between gap-2.5 shrink-0">
          <button
            onClick={handleSendHug}
            className={`flex-1 inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-2xl text-xs font-black active:scale-95 transition-all shadow-md ${
              hugSent
                ? 'bg-emerald-500 text-white'
                : 'bg-[#F4C2C2] text-black hover:bg-pink-300'
            }`}
          >
            {hugSent ? (
              <>
                <Heart className="w-3.5 h-3.5 fill-white" />
                <span>Hug Sent! ❤️</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Send a Virtual Hug</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="px-4 py-3 rounded-2xl text-xs text-zinc-400 hover:text-white bg-black/40 border border-zinc-800 active:scale-95 transition-all"
          >
            Put back
          </button>
        </div>
      </div>
    </div>
  );
};
