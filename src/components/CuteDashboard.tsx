import React, { useState } from 'react';
import { Heart, Sparkles, BookOpen, ArrowRight, X, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CuteDashboardProps {
  partnerName: string;
  senderName: string;
  daysLoved: number;
  totalLetters: number;
  onEnterVault: () => void;
}

export const CuteDashboard: React.FC<CuteDashboardProps> = ({
  partnerName,
  senderName,
  daysLoved,
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
      
      {/* Corner Decorative Sakura Branches */}
      <img
        src="/assets/images/sakura-branch-left.jpg"
        alt="Sakura"
        className="fixed top-0 left-0 w-36 sm:w-56 opacity-40 pointer-events-none -z-10 mix-blend-multiply"
      />
      <img
        src="/assets/images/sakura-branch-right.jpg"
        alt="Sakura"
        className="fixed top-0 right-0 w-36 sm:w-56 opacity-40 pointer-events-none -z-10 mix-blend-multiply"
      />

      {/* Top Greeting: "Hey Love :)" */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[#F4C2C2] text-xs font-bold mb-4 shadow-lg animate-pulse-subtle">
          <Sparkles className="w-3.5 h-3.5 text-[#F4C2C2]" />
          <span>Made strictly for your eyes only</span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-cursive font-bold text-black tracking-tight drop-shadow-sm select-none">
          Hey Love :)
        </h1>
        <p className="mt-2 text-base sm:text-lg text-black/80 font-serif italic max-w-md mx-auto">
          Welcome to your private little sanctuary of words, memories, and sealed surprises.
        </p>
      </div>

      {/* Main Glassmorphic Black Card */}
      <div className="relative bg-black/90 backdrop-blur-2xl rounded-[36px] border border-white/15 p-6 sm:p-10 shadow-2xl text-white overflow-hidden">
        {/* Subtle Ambient Glow Behind Card */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#F4C2C2]/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#F4C2C2]/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-10">
          
          {/* Mascot Image with Glassmorphic Frame */}
          <div className="relative shrink-0 group">
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden bg-zinc-950 p-2.5 border-2 border-[#F4C2C2]/40 shadow-2xl group-hover:scale-105 transition-transform duration-300">
              <img
                src="/assets/images/cat-love-letter.jpg"
                alt="Cute Cat with Love Letter"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute bottom-4 right-4 p-2 rounded-full bg-black/80 backdrop-blur-md border border-[#F4C2C2]/50 text-white shadow-md">
                <Heart className="w-4 h-4 fill-[#F4C2C2] text-[#F4C2C2] animate-pulse" />
              </div>
            </div>

            {/* Little floating sticker badge */}
            <div className="absolute -top-3 -left-3 bg-[#F4C2C2] text-black font-extrabold text-[11px] px-3 py-1 rounded-full shadow-lg border border-black transform -rotate-6">
              Official Postcat 💌
            </div>
          </div>

          {/* Welcome Message & Intro */}
          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="inline-block">
              <span className="text-xs uppercase tracking-widest font-bold text-[#F4C2C2]">
                A Digital Gift From {senderName}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-white mt-1">
                Your Personal "Open When" Box
              </h2>
            </div>

            <p className="text-sm sm:text-base text-zinc-300 font-serif leading-relaxed">
              Whenever the world gets too busy, distance feels too far, or you simply need to smile — 
              I have written letters for each of those moments. Each envelope is sealed until the exact moment calls for it.
            </p>

            {/* Glassmorphic Metrics Widgets */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 pt-2">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
                <p className="text-xl sm:text-2xl font-black text-[#F4C2C2] font-serif">{daysLoved}</p>
                <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider mt-0.5">Days Loved</p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
                <p className="text-xl sm:text-2xl font-black text-white font-serif">{totalLetters}</p>
                <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider mt-0.5">Letters Sealed</p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
                <p className="text-xl sm:text-2xl font-black text-[#F4C2C2] font-serif">∞</p>
                <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider mt-0.5">Hugs Ready</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
              {/* Primary: Go to letters */}
              <button
                onClick={onEnterVault}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#F4C2C2] hover:bg-white text-black font-extrabold text-sm shadow-xl shadow-pink-900/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Enter Your Letters Vault</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              {/* Secondary: Information modal button */}
              <button
                onClick={() => setShowInfoModal(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 backdrop-blur-md transition-all"
              >
                <BookOpen className="w-4 h-4 text-[#F4C2C2]" />
                <span>About This Website</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Footer Hug Trigger */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Vault Status: Ready & waiting for {partnerName}</span>
          </div>

          <button
            onClick={handleSendHug}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#F4C2C2] border border-white/10 transition-colors"
          >
            {hugSent ? (
              <>
                <Heart className="w-3.5 h-3.5 fill-[#F4C2C2]" />
                <span className="text-white font-bold">Hug Dispatched! ✨</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Send {senderName} a Quick Hug</span>
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
