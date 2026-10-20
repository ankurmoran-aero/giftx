import React, { useState } from 'react';
import { Heart, Sparkles, BookOpen, ArrowRight, X, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CuteDashboardProps {
  partnerName: string;
  senderName: string;
  totalLetters: number;
  onEnterVault: () => void;
}

export const CuteDashboard: React.FC<CuteDashboardProps> = ({
  partnerName,
  senderName,
  totalLetters,
  onEnterVault,
}) => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [hugSent, setHugSent] = useState(false);

  const handleLoveShower = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#F4C2C2', '#ffffff', '#fb7185', '#000000'],
    });
  };

  const handleSendHug = () => {
    setHugSent(true);
    confetti({
      particleCount: 75,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#F4C2C2', '#ffffff', '#f43f5e', '#fbcfe8'],
    });
    setTimeout(() => setHugSent(false), 3000);
  };

  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 pt-6 pb-20">

      {/* Top Greeting: "Hey Love :)" */}
      <div className="text-center mb-6 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black text-[#F4C2C2] text-xs font-bold mb-3 shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-[#F4C2C2]" />
          <span>Made strictly for your eyes only</span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-cursive font-bold text-black tracking-tight select-none">
          Hey Love :)
        </h1>
        <p className="mt-1.5 text-sm sm:text-base text-black/80 font-serif italic max-w-xs mx-auto">
          Welcome to your private little sanctuary of words, memories, and sealed surprises.
        </p>
      </div>

      {/* Main Black Card (Hardware-accelerated 60fps, no heavy blurs) */}
      <div className="relative bg-[#09090b] rounded-[32px] border border-[#F4C2C2]/40 p-5 sm:p-8 shadow-2xl text-white overflow-hidden transform-gpu">
        
        <div className="flex flex-col items-center text-center space-y-6">
          
          {/* Mascot Image with Clean Dark Frame */}
          <div className="relative shrink-0 group">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden bg-black p-2 border border-[#F4C2C2]/40 shadow-xl">
              <img
                src="/assets/images/cat-love-letter.jpg"
                alt="Cute Cat with Love Letter"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            {/* Floating sticker badge */}
            <div className="absolute -top-2.5 -left-2 bg-[#F4C2C2] text-black font-extrabold text-[10px] px-2.5 py-0.5 rounded-full shadow-md border border-black transform -rotate-6">
              Official Postcat 💌
            </div>
          </div>

          {/* Welcome Message & Intro */}
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-widest font-bold text-[#F4C2C2] block">
              Most Minimalist Gift from {senderName}
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-black text-white">
              Your Personal "Open When" Box
            </h2>

            <p className="text-xs sm:text-sm text-zinc-300 font-serif leading-relaxed max-w-sm mx-auto">
              Whenever the world gets too busy, distance feels too far, or you simply need to smile — 
              I have written letters for each of those moments. Each envelope is sealed until the exact moment calls for it.
            </p>

            {/* Metrics Widgets */}
            <div className="grid grid-cols-3 gap-2 pt-2 max-w-xs mx-auto">
              <div className="bg-zinc-900 rounded-xl p-2.5 border border-zinc-800 text-center">
                <p className="text-lg sm:text-xl font-black text-[#F4C2C2] font-serif">∞</p>
                <p className="text-[9px] text-zinc-400 font-semibold uppercase tracking-wider mt-0.5 leading-tight">
                  Thought of you
                </p>
              </div>

              <div className="bg-zinc-900 rounded-xl p-2.5 border border-zinc-800 text-center">
                <p className="text-lg sm:text-xl font-black text-white font-serif">{totalLetters}</p>
                <p className="text-[9px] text-zinc-400 font-semibold uppercase tracking-wider mt-0.5 leading-tight">
                  Sealed Letters
                </p>
              </div>

              <div className="bg-zinc-900 rounded-xl p-2.5 border border-zinc-800 text-center">
                <p className="text-lg sm:text-xl font-black text-[#F4C2C2] font-serif">∞</p>
                <p className="text-[9px] text-zinc-400 font-semibold uppercase tracking-wider mt-0.5 leading-tight">
                  Hugs Ready
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-xs mx-auto">
              <button
                onClick={onEnterVault}
                className="w-full py-3.5 px-5 rounded-xl bg-[#F4C2C2] text-black font-extrabold text-xs shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <span>Enter Your Letters Vault</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setShowInfoModal(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 text-white font-bold text-xs border border-zinc-800 flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#F4C2C2]" />
                <span>About This Website</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Hug Trigger */}
        <div className="mt-6 pt-4 border-t border-zinc-850 flex items-center justify-between text-[11px] text-zinc-400">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Ready for {partnerName}</span>
          </div>

          <button
            onClick={handleSendHug}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-900 text-[#F4C2C2] border border-zinc-800 active:scale-95 transition-transform"
          >
            {hugSent ? (
              <>
                <Heart className="w-3 h-3 fill-[#F4C2C2]" />
                <span className="text-white font-bold text-[10px]">Hug Sent! ✨</span>
              </>
            ) : (
              <>
                <Send className="w-3 h-3" />
                <span>Send a Hug</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Information / "About The Web" Glassmorphic Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="relative w-full max-w-lg bg-black/95 text-white rounded-[32px] border-2 border-[#F4C2C2]/50 p-6 sm:p-8 shadow-2xl">
            {/* Top Pink Line */}
            <div className="absolute top-0 left-12 right-12 h-1 bg-[#F4C2C2] rounded-b-full shadow-sm" />

            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#F4C2C2] text-black flex items-center justify-center font-bold">
                  💌
                </div>
                <div>
                  <h3 className="font-serif font-black text-lg text-white">About Your Website</h3>
                  <p className="text-[11px] text-[#F4C2C2]">The Story & Rules of Your Letters</p>
                </div>
              </div>
              <button
                onClick={() => setShowInfoModal(false)}
                className="p-1.5 rounded-full bg-zinc-900 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-5 space-y-4 font-serif text-sm text-zinc-300 leading-relaxed">
              <p>
                <strong className="text-white not-italic font-sans">Why this was made:</strong> I wanted you to have a physical-feeling, private digital space filled with love, even when we are apart.
              </p>

              <div className="bg-white/5 rounded-2xl p-4 border border-white/10 space-y-2 text-xs">
                <p className="font-bold text-[#F4C2C2] font-sans uppercase tracking-wider text-[10px]">
                  ✨ The 3 Gentle Rules:
                </p>
                <div className="flex items-start gap-2">
                  <span>1.</span>
                  <span><strong>Start with "Open First"</strong> — It introduces your rules and how the box functions.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>2.</span>
                  <span><strong>Only open when the moment matches</strong> — Save the "Open When You Can't Sleep" letter for that exact 2:00 AM silence.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>3.</span>
                  <span><strong>Scratch the secret P.S.</strong> — Every letter has a hidden message at the bottom just for you.</span>
                </div>
              </div>

              <p className="text-xs text-zinc-400 italic">
                You can revisit any letter anytime after unsealing it. It will always remain here for you.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-between items-center">
              <button
                onClick={handleLoveShower}
                className="text-xs font-bold text-[#F4C2C2] hover:underline"
              >
                Shower with Hearts 💖
              </button>

              <button
                onClick={() => {
                  setShowInfoModal(false);
                  onEnterVault();
                }}
                className="px-5 py-2.5 rounded-xl bg-[#F4C2C2] text-black font-extrabold text-xs hover:bg-white transition-colors"
              >
                Go to Letters ➔
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
