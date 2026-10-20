import React from 'react';
import { DailyMailEntry } from '../types';
import { Mail, Sparkles, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MailAlertModalProps {
  mail: DailyMailEntry | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenMailbox: () => void;
}

export const MailAlertModal: React.FC<MailAlertModalProps> = ({
  mail,
  isOpen,
  onClose,
  onOpenMailbox,
}) => {
  if (!isOpen || !mail) return null;

  const handleOpen = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#F4C2C2', '#000000', '#ffffff', '#fb7185'],
    });
    onOpenMailbox();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-fade-in backdrop-blur-sm select-none">
      <div className="relative w-full max-w-sm bg-gradient-to-br from-[#1c171a] via-[#140f13] to-[#0c0a0c] text-white rounded-[32px] border-2 border-[#F4C2C2]/60 p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(244,194,194,0.18)] text-center animate-pop-in">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 active:scale-90 transition-transform"
          aria-label="Close alert"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Animated Bouncing Mail Stamp */}
        <div className="mx-auto w-16 h-16 rounded-full bg-[#F4C2C2] text-black flex items-center justify-center text-3xl shadow-xl mb-4 animate-bounce">
          <span>{mail.emoji || '📬'}</span>
        </div>

        {/* Glowing Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-[#F4C2C2]/40 text-[#F4C2C2] text-[10px] font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3 h-3 text-[#F4C2C2]" />
          <span>New Letter Delivered!</span>
        </div>

        {/* Sender Name */}
        <h3 className="font-serif font-black text-xl text-white tracking-tight">
          {mail.authorLabel} ❤️
        </h3>

        <p className="text-xs text-zinc-400 font-serif italic mt-0.5">
          A new letter just arrived in your Daily Mailbox!
        </p>

        {/* Preview Card */}
        <div className="my-4 p-3.5 rounded-2xl bg-black/60 border border-zinc-800/80 text-left space-y-1 shadow-inner">
          <span className="text-[9px] font-mono uppercase tracking-widest text-[#F4C2C2] block">
            Subject
          </span>
          <h4 className="font-serif font-bold text-white text-sm truncate">
            {mail.subject}
          </h4>
          <p className="text-[11px] text-zinc-400 font-serif italic truncate">
            "{mail.body[0] || 'A personal note for you...'}"
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <button
            onClick={handleOpen}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#F4C2C2] text-black font-black text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <Mail className="w-4 h-4 text-black" />
            <span>Open Mailbox & Read ➔</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            I'll read it in a bit
          </button>
        </div>

      </div>
    </div>
  );
};
