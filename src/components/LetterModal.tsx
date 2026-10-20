import React, { useState } from 'react';
import { Letter } from '../types';
import { X, Heart, Sparkles, Eye, Camera, Send } from 'lucide-react';
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
      particleCount: 80,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#F4C2C2', '#ffffff', '#fb7185', '#000000'],
    });
    setTimeout(() => setHugSent(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      
      {/* Real Letter Stationery in Jet Black with Baby Pink Rim */}
      <div className="relative w-full max-w-2xl bg-[#09090b] text-white rounded-[32px] shadow-2xl border-2 border-[#F4C2C2]/50 overflow-hidden my-6">
        
        {/* Baby Pink Top Stationery Line */}
        <div className="h-2 bg-[#F4C2C2]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors z-20 border border-zinc-750"
          aria-label="Close letter"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Letter Body */}
        <div className="p-6 sm:p-10 relative">
          
          {/* Subtle Black Letter Paper Lines Effect */}
          <div className="absolute inset-x-8 inset-y-12 pointer-events-none opacity-[0.05] bg-[repeating-linear-gradient(transparent,transparent_30px,#F4C2C2_30px,#F4C2C2_31px)]" />

          {/* Letter Head with Date & Stamp */}
          <div className="flex items-center justify-between pb-6 border-b border-zinc-850">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#F4C2C2] text-black font-bold flex items-center justify-center text-sm shadow-md">
                {letter.sealEmoji || '💌'}
              </span>
              <div className="text-left">
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#F4C2C2] block">
                  {letter.categoryLabel} Letter
                </span>
                <span className="text-xs text-zinc-400 font-mono">Special Delivery</span>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-900 border border-[#F4C2C2]/40 text-[#F4C2C2] text-xs font-bold">
                <Sparkles className="w-3 h-3" />
                <span>Private & Confidential</span>
              </span>
            </div>
          </div>

          {/* Salutation & Title in Special Serif Font */}
          <div className="mt-8">
            <p className="font-cursive text-xl text-[#F4C2C2] tracking-wide">
              Dearest Love,
            </p>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight mt-1 leading-snug">
              {letter.title}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-serif italic mt-1">
              ~ {letter.subtitle} ~
            </p>
          </div>

          {/* Letter Content Paragraphs in Black Stationery with Baby Pink Accents */}
          <div className="mt-8 space-y-5 font-serif text-zinc-200 text-base sm:text-lg leading-relaxed sm:leading-loose">
            {letter.content.map((paragraph, idx) => (
              <p 
                key={idx} 
                className="first-letter:text-3xl first-letter:font-bold first-letter:text-[#F4C2C2] first-letter:mr-1"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Cleanly Cropped Polaroid Memory Photo Attachment */}
          {letter.polaroid && (
            <div className="mt-10 flex justify-center">
              <div 
                className="bg-[#121214] p-3 pb-5 rounded-2xl shadow-2xl border border-zinc-800 max-w-xs transform hover:rotate-0 transition-transform duration-300 group"
                style={{ transform: `rotate(${letter.polaroid.rotationDeg || 0}deg)` }}
              >
                {/* Baby Pink Washi Tape Header */}
                <div className="w-16 h-4 bg-[#F4C2C2] mx-auto -mt-5 mb-2.5 rounded-sm shadow-md opacity-90" />
                
                {/* Photo with rounded crop and aspect ratio */}
                <div className="overflow-hidden rounded-xl border border-zinc-800 aspect-square w-64 bg-zinc-950">
                  <img
                    src={letter.polaroid.url}
                    alt={letter.polaroid.caption}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Handwritten Caption */}
                <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-[#F4C2C2] font-cursive text-sm">
                  <Camera className="w-3.5 h-3.5 text-[#F4C2C2]" />
                  <span>{letter.polaroid.caption}</span>
                </div>
              </div>
            </div>
          )}

          {/* Handwritten Sign Off in Caveat Font */}
          <div className="mt-10 pt-6 border-t border-zinc-850 flex flex-col items-end text-right">
            <p className="text-sm text-zinc-400 font-serif italic">{letter.signOff || 'With all my love,'}</p>
            <p className="text-2xl sm:text-3xl font-cursive font-bold text-[#F4C2C2] mt-1 select-none">
              {letter.senderName || 'Ankur'}
            </p>
          </div>

          {/* Secret P.S. Scratch Note in Black & Baby Pink */}
          {letter.secretNote && (
            <div className="mt-8">
              {!showSecret ? (
                <button
                  onClick={() => setShowSecret(true)}
                  className="w-full py-3 px-4 rounded-2xl bg-zinc-900/90 hover:bg-zinc-850 border border-dashed border-[#F4C2C2]/50 text-[#F4C2C2] text-xs font-bold transition-all flex items-center justify-center gap-2 group"
                >
                  <Eye className="w-4 h-4 text-[#F4C2C2] group-hover:scale-110 transition-transform" />
                  <span>Tap to scratch & reveal the secret P.S. note</span>
                </button>
              ) : (
                <div className="p-4 rounded-2xl bg-zinc-900 border border-[#F4C2C2]/60 text-white text-xs sm:text-sm font-serif italic animate-fade-in flex items-start gap-2.5">
                  <span className="text-lg">💌</span>
                  <div className="flex-1">
                    <span className="font-bold not-italic text-[#F4C2C2] uppercase text-[10px] tracking-wider block mb-0.5">
                      Secret Note
                    </span>
                    <p>{letter.secretNote}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Bottom Actions: Hug & Put Back */}
          <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={handleSendHug}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-lg ${
                hugSent
                  ? 'bg-emerald-500 text-white'
                  : 'bg-[#F4C2C2] hover:bg-white text-black shadow-pink-900/20 active:scale-95'
              }`}
            >
              {hugSent ? (
                <>
                  <Heart className="w-4 h-4 fill-white animate-bounce" />
                  <span>Virtual Hug Sent! ❤️</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send a Virtual Hug Back</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors py-2"
            >
              Put letter back into envelope
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
