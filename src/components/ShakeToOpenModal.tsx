import React, { useState, useEffect, useCallback } from 'react';
import { Letter } from '../types';
import { Sparkles, Smartphone, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ShakeToOpenModalProps {
  letter: Letter | null;
  isOpen: boolean;
  onClose: () => void;
  onFullyOpened: (letter: Letter) => void;
}

export const ShakeToOpenModal: React.FC<ShakeToOpenModalProps> = ({
  letter,
  isOpen,
  onClose,
  onFullyOpened,
}) => {
  // 0: Sealed with ribbon, 1: Ribbon torn, 2: Flap open, 3: Letter slides out
  const [step, setStep] = useState<number>(0);
  const [isShakingAnim, setIsShakingAnim] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setStep(0);
    }
  }, [isOpen, letter]);

  const advanceStep = useCallback(() => {
    setIsShakingAnim(true);
    setTimeout(() => setIsShakingAnim(false), 350);

    setStep((currentStep) => {
      const next = currentStep + 1;

      if (next === 1) {
        confetti({
          particleCount: 25,
          spread: 40,
          origin: { y: 0.6 },
          colors: ['#F4C2C2', '#ffffff', '#fb7185'],
        });
      } else if (next === 2) {
        confetti({
          particleCount: 30,
          spread: 50,
          origin: { y: 0.55 },
          colors: ['#F4C2C2', '#ffffff', '#000000'],
        });
      } else if (next === 3) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.5 },
          colors: ['#F4C2C2', '#ffffff', '#000000', '#fb7185'],
        });
        setTimeout(() => {
          if (letter) {
            onFullyOpened(letter);
          }
        }, 650);
      }
      return next;
    });
  }, [letter, onFullyOpened]);

  // Accelerometer Shake Detection
  useEffect(() => {
    if (!isOpen || step >= 3) return;

    let lastX = 0;
    let lastY = 0;
    let lastZ = 0;
    let lastUpdate = 0;

    const handleDeviceMotion = (event: DeviceMotionEvent) => {
      const current = event.accelerationIncludingGravity;
      if (!current) return;

      const curTime = Date.now();
      if (curTime - lastUpdate > 200) {
        const diffTime = curTime - lastUpdate;
        lastUpdate = curTime;

        const x = current.x || 0;
        const y = current.y || 0;
        const z = current.z || 0;

        const speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 10000;

        if (speed > 750) {
          advanceStep();
        }

        lastX = x;
        lastY = y;
        lastZ = z;
      }
    };

    const reqPerm = typeof (DeviceMotionEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === 'function';
    if (reqPerm) {
      (DeviceMotionEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission!()
        .then((res: string) => {
          if (res === 'granted') {
            window.addEventListener('devicemotion', handleDeviceMotion);
          }
        })
        .catch(() => {});
    } else {
      window.addEventListener('devicemotion', handleDeviceMotion);
    }

    return () => {
      window.removeEventListener('devicemotion', handleDeviceMotion);
    };
  }, [isOpen, step, advanceStep]);

  if (!isOpen || !letter) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-700 z-30"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="max-w-xs w-full text-center flex flex-col items-center">
        
        {/* Step Indicator */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-[#F4C2C2]/40 text-[#F4C2C2] text-[11px] font-bold mb-4">
          <Sparkles className="w-3 h-3 text-[#F4C2C2]" />
          <span>Step {Math.min(step + 1, 3)} of 3</span>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-serif font-black text-white tracking-tight leading-snug mb-1">
          {step === 0 && 'Shake 1: Tear Ribbon 🎀'}
          {step === 1 && 'Shake 2: Pop Seal 💌'}
          {step === 2 && 'Shake 3: Slide Out Letter ✨'}
          {step >= 3 && 'Unsealing letter... ❤️'}
        </h2>

        <p className="text-xs text-zinc-400 font-serif italic mb-6">
          {step === 0 && 'Shake phone or tap to tear the ribbon.'}
          {step === 1 && 'Shake again to break the wax seal.'}
          {step === 2 && 'One last shake and your letter slides out!'}
          {step >= 3 && 'Here it comes...'}
        </p>

        {/* Envelope Graphic */}
        <div 
          onClick={step < 3 ? advanceStep : undefined}
          className={`relative w-64 h-40 bg-zinc-950 rounded-2xl border-2 border-[#F4C2C2]/50 shadow-2xl p-3 flex flex-col justify-between cursor-pointer select-none transition-transform duration-200 transform-gpu ${
            isShakingAnim ? 'scale-105' : 'active:scale-95'
          }`}
        >
          {/* Top Flap */}
          <div className="absolute top-0 left-0 right-0 h-12 pointer-events-none flex justify-center overflow-hidden">
            <div 
              className={`w-0 h-0 border-l-[130px] border-l-transparent border-r-[130px] border-r-transparent border-t-[38px] transition-all duration-300 origin-top ${
                step >= 2 
                  ? 'border-t-zinc-800 transform -rotate-180 -translate-y-2 opacity-40' 
                  : 'border-t-zinc-900'
              }`}
            />
          </div>

          {/* Letter Peek */}
          <div
            className={`absolute inset-x-3 bg-black border border-[#F4C2C2]/40 rounded-xl p-2.5 text-left transition-all duration-500 z-20 ${
              step >= 2
                ? step >= 3
                  ? '-translate-y-28 opacity-100 scale-105'
                  : '-translate-y-10 opacity-95'
                : 'translate-y-12 opacity-0 pointer-events-none'
            }`}
          >
            <div className="h-1 w-12 bg-[#F4C2C2] rounded-full mb-1.5" />
            <p className="text-[10px] font-cursive text-[#F4C2C2]">To: My Favorite Girl</p>
            <p className="text-xs font-serif font-bold text-white truncate">{letter.title}</p>
          </div>

          {/* Ribbon on Step 0 */}
          {step === 0 && (
            <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
              <div className="absolute h-full w-5 bg-gradient-to-r from-pink-300 via-[#F4C2C2] to-pink-400" />
              <div className="absolute w-full h-5 bg-gradient-to-b from-pink-300 via-[#F4C2C2] to-pink-400" />
              <div className="w-10 h-10 rounded-full bg-[#F4C2C2] text-black border-2 border-white flex items-center justify-center text-sm shadow-xl">
                <span>🎀</span>
              </div>
            </div>
          )}

          {/* Seal on Step 1 */}
          {step === 1 && (
            <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
              <div className="w-10 h-10 rounded-full bg-[#F4C2C2] text-black border-2 border-white/80 flex items-center justify-center text-sm shadow-xl">
                <span>{letter.sealEmoji || '💌'}</span>
              </div>
            </div>
          )}

          {/* Info */}
          <div className="relative z-10 flex justify-between items-center text-[9px] text-zinc-500 font-bold uppercase">
            <span className="text-[#F4C2C2]">{letter.categoryLabel}</span>
            <span>POST</span>
          </div>

          <div className="relative z-10 text-center my-auto">
            <h3 className="font-serif font-bold text-white text-sm truncate">{letter.title}</h3>
          </div>

          <div className="relative z-10 text-[9px] text-zinc-400 text-center font-mono">
            {step === 0 && '🔒 Ribbon Sealed'}
            {step === 1 && '✂️ Ribbon Torn'}
            {step === 2 && '🔓 Flap Open'}
            {step >= 3 && '✨ Opening...'}
          </div>
        </div>

        {/* Shake / Tap Button */}
        <div className="mt-6 space-y-3 w-full">
          <button
            onClick={advanceStep}
            disabled={step >= 3}
            className="w-full py-3.5 px-4 rounded-xl bg-[#F4C2C2] text-black font-extrabold text-xs shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <Smartphone className="w-4 h-4" />
            <span>
              {step === 0 && 'Shake or Tap to Tear Ribbon'}
              {step === 1 && 'Shake or Tap to Pop Seal'}
              {step === 2 && 'Shake or Tap to Slide Letter'}
              {step >= 3 && 'Opening...'}
            </span>
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-1.5 pt-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  step > i
                    ? 'bg-[#F4C2C2]'
                    : step === i
                    ? 'bg-[#F4C2C2] ring-2 ring-white/40'
                    : 'bg-zinc-800'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
