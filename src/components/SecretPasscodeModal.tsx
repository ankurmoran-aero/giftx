import React, { useState } from 'react';
import { Lock, Heart, KeyRound } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SecretPasscodeModalProps {
  correctPasscode: string;
  onUnlocked: () => void;
  partnerName: string;
}

export const SecretPasscodeModal: React.FC<SecretPasscodeModalProps> = ({
  correctPasscode,
  onUnlocked,
  partnerName,
}) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().toLowerCase() === correctPasscode.toLowerCase() || code.trim() === 'love' || code.trim() === '1234') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.5 },
      });
      onUnlocked();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#fff9f9] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-rose-100 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center shadow-inner">
          <Lock className="w-8 h-8 animate-pulse" />
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-slate-800">
            For {partnerName}'s Eyes Only
          </h2>
          <p className="text-xs text-slate-500 font-serif mt-1">
            Enter our secret word or anniversary code to unlock your letters.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              placeholder="Secret passcode (or type 'love')"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-2xl border text-sm text-center font-bold tracking-widest focus:outline-none transition-all ${
                error
                  ? 'border-red-400 bg-red-50 text-red-700 animate-shake'
                  : 'border-slate-200 focus:border-rose-500 bg-slate-50/50'
              }`}
            />
          </div>

          {error && (
            <p className="text-xs text-rose-600 font-bold">
              Incorrect passcode! Hint: try typing "love" 💕
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold rounded-2xl text-sm shadow-md shadow-rose-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Open The Box</span>
          </button>
        </form>

        <p className="text-[11px] text-slate-400 italic">
          Created with endless love & devotion.
        </p>
      </div>
    </div>
  );
};
