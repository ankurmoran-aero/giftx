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
  // 0: Sealed with ribbon, 1: Ribbon torn (flap closed), 2: Flap open (letter inside), 3: Letter slides out
  const [step, setStep] = useState<number>(0);
  const [isShakingAnim, setIsShakingAnim] = useState<boolean>(false);

  // Reset step whenever a new letter is opened
  useEffect(() => {
    if (isOpen) {
      setStep(0);
    }
  }, [isOpen, letter]);

  const advanceStep = useCallback(() => {
    setIsShakingAnim(true);
    setTimeout(() => setIsShakingAnim(false), 500);

    setStep((currentStep) => {
      const next = currentStep + 1;

      if (next === 1) {
        // Step 1: Ribbon tears
        confetti({
          particleCount: 30,
          spread: 45,
          origin: { y: 0.6 },
          colors: ['#F4C2C2', '#ffffff', '#fb7185'],
        });
      } else if (next === 2) {
        // Step 2: Flap pops open
        confetti({
          particleCount: 40,
          spread: 55,
          origin: { y: 0.55 },
          colors: ['#F4C2C2', '#ffffff', '#000000'],
        });
      } else if (next === 3) {
        // Step 3: Letter comes out
        confetti({
          particleCount: 80,
          spread: 75,
          origin: { y: 0.5 },
          colors: ['#F4C2C2', '#ffffff', '#000000', '#fb7185'],
        });
        setTimeout(() => {
          if (letter) {
            onFullyOpened(letter);
          }
        }, 800);
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
      if (curTime - lastUpdate > 250) {
        const diffTime = curTime - lastUpdate;
        lastUpdate = curTime;

        const x = current.x || 0;
        const y = current.y || 0;
        const z = current.z || 0;

        const speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 10000;

        // Shake threshold
        if (speed > 850) {
          advanceStep();
        }

        lastX = x;
        lastY = y;
        lastZ = z;
      }
    };

    // Request permission on iOS 13+ if supported
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
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-700 z-30"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="max-w-md w-full text-center flex flex-col items-center">
        
        {/* Step Counter Indicator */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-[#F4C2C2]/40 text-[#F4C2C2] text-xs font-bold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#F4C2C2]" />
          <span>Shake to Open • Step {Math.min(step + 1, 3)} of 3</span>
        </div>

        {/* Dynamic Instructional Title */}
        <h2 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight leading-tight mb-2">
          {step === 0 && 'Shake 1: Tear The Ribbon 🎀'}
          {step === 1 && 'Shake 2: Pop The Seal 💌'}
          {step === 2 && 'Shake 3: Pull Your Letter Out ✨'}
          {step >= 3 && 'Unsealing your letter... ❤️'}
        </h2>

        <p className="text-xs sm:text-sm text-zinc-400 font-serif italic mb-8 max-w-xs">
          {step === 0 && 'Shake your phone (or tap the button) to tear the gift ribbon.'}
          {step === 1 && 'Shake again to break the wax seal and lift the envelope flap.'}
          {step === 2 && 'One last shake and your private letter will slide out!'}
          {step >= 3 && 'Here it comes...'}
        </p>

        {/* Interactive Envelope Graphic with 3-Stage Transformation */}
        <div 
          onClick={step < 3 ? advanceStep : undefined}
          className={`relative w-72 sm:w-80 h-48 sm:h-52 bg-black rounded-2xl border-2 border-[#F4C2C2]/60 shadow-2xl p-4 flex flex-col justify-between cursor-pointer select-none transition-transform duration-300 ${
            isShakingAnim ? 'animate-bounce' : 'hover:scale-105'
          }`}
        >
          {/* Top Flap Graphic */}
          <div className="absolute top-0 left-0 right-0 h-14 pointer-events-none flex justify-center overflow-hidden">
            <div 
              className={`w-0 h-0 border-l-[150px] border-l-transparent border-r-[150px] border-r-transparent border-t-[44px] transition-all duration-500 origin-top ${
                step >= 2 
                  ? 'border-t-zinc-800 transform -rotate-180 -translate-y-2 opacity-50' 
                  : 'border-t-zinc-900'
              }`}
            />
          </div>

          {/* Letter Peeking / Sliding Out on Step 2 & 3 */}
          <div
            className={`absolute inset-x-4 bg-zinc-950 border border-[#F4C2C2]/40 rounded-xl p-3 text-left transition-all duration-700 shadow-2xl z-20 ${
              step >= 2
                ? step >= 3
                  ? '-translate-y-36 opacity-100 scale-105'
                  : '-translate-y-12 opacity-95'
                : 'translate-y-16 opacity-0 pointer-events-none'
            }`}
          >
            <div className="h-1.5 w-16 bg-[#F4C2C2] rounded-full mb-2" />
            <p className="text-[11px] font-cursive text-[#F4C2C2]">To: My Favorite Girl</p>
            <p className="text-xs font-serif font-bold text-white truncate">{letter.title}</p>
          </div>

          {/* Ribbon & Seal Wrap on Step 0 */}
          {step === 0 && (
            <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none animate-fade-in">
              {/* Vertical Pink Ribbon */}
              <div className="absolute h-full w-7 bg-gradient-to-r from-pink-300 via-[#F4C2C2] to-pink-400 shadow-lg" />
              {/* Horizontal Pink Ribbon */}
              <div className="absolute w-full h-7 bg-gradient-to-b from-pink-300 via-[#F4C2C2] to-pink-400 shadow-lg" />
              {/* Center Bow / Seal */}
              <div className="w-14 h-14 rounded-full bg-[#F4C2C2] text-black border-2 border-white flex items-center justify-center text-xl shadow-2xl animate-pulse">
                <span>🎀</span>
              </div>
            </div>
          )}

          {/* Wax Seal on Step 1 (After ribbon is torn) */}
          {step === 1 && (
            <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-[#F4C2C2] text-black border-2 border-white/80 flex items-center justify-center text-lg shadow-xl animate-pulse">
                <span>{letter.sealEmoji || '💌'}</span>
              </div>
            </div>
          )}

          {/* Envelope Front Details */}
          <div className="relative z-10 flex justify-between items-center text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
            <span className="text-[#F4C2C2]">{letter.categoryLabel}</span>
            <span>≋≋ POST</span>
          </div>

          <div className="relative z-10 text-center my-auto">
            <h3 className="font-serif font-bold text-white text-base truncate">{letter.title}</h3>
            <p className="text-[11px] text-zinc-400 font-serif italic truncate">"{letter.subtitle}"</p>
          </div>

          <div className="relative z-10 text-[10px] text-zinc-400 text-center font-mono">
            {step === 0 && '🔒 Ribbon Sealed'}
            {step === 1 && '✂️ Ribbon Torn • Seal Closed'}
            {step === 2 && '🔓 Flap Opened • Letter Ready'}
            {step >= 3 && '✨ Unsealed!'}
          </div>
        </div>

        {/* Shake Action Trigger Button (Works via Click/Tap or Physical Shake) */}
        <div className="mt-8 space-y-3 w-full">
          <button
            onClick={advanceStep}
            disabled={step >= 3}
            className="w-full py-4 px-6 rounded-2xl bg-[#F4C2C2] hover:bg-white text-black font-extrabold text-sm shadow-xl shadow-pink-900/30 flex items-center justify-center gap-2.5 active:scale-95 transition-all transform hover:-translate-y-0.5"
          >
            <Smartphone className="w-5 h-5 animate-bounce" />
            <span>
              {step === 0 && 'Shake Phone (or Tap) to Tear Ribbon'}
              {step === 1 && 'Shake Phone (or Tap) to Pop Seal'}
              {step === 2 && 'Shake Phone (or Tap) to Pull Out Letter'}
              {step >= 3 && 'Opening...'}
            </span>
          </button>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 pt-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  step > i
                    ? 'bg-[#F4C2C2] scale-110 shadow-sm'
                    : step === i
                    ? 'bg-[#F4C2C2] animate-pulse ring-2 ring-white/40'
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
