import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Letter } from '../types';
import { Sparkles, Smartphone, X, Check } from 'lucide-react';
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
  // Step 0: Ribbon Wrapped Gift Layer
  // Step 1: Sealed Envelope with Wax Seal Layer
  // Step 2: Flap Open with Letter Stationery Peeking Layer
  // Step 3: Letter Sliding Out completely
  const [step, setStep] = useState<number>(0);
  const [isWiggling, setIsWiggling] = useState<boolean>(false);
  const isTransitioningRef = useRef<boolean>(false);

  // Reset step whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(0);
      isTransitioningRef.current = false;
    }
  }, [isOpen, letter]);

  // Haptic feedback helper
  const triggerHaptic = (pattern: number[]) => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // Ignore vibration errors
      }
    }
  };

  const advanceStep = useCallback(() => {
    if (isTransitioningRef.current) return;

    // Request iOS motion permission if requested during user interaction
    const maybeDeviceMotion = window.DeviceMotionEvent as unknown as {
      requestPermission?: () => Promise<string>;
    };
    if (typeof maybeDeviceMotion?.requestPermission === 'function') {
      maybeDeviceMotion.requestPermission().catch(() => {});
    }

    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 400);

    setStep((currentStep) => {
      const next = currentStep + 1;

      if (next === 1) {
        // Step 1: Ribbon unties!
        triggerHaptic([40, 50, 40]);
        confetti({
          particleCount: 30,
          spread: 45,
          origin: { y: 0.6 },
          colors: ['#F4C2C2', '#ffffff', '#fb7185'],
        });
      } else if (next === 2) {
        // Step 2: Wax seal cracks & flap opens!
        triggerHaptic([50, 60, 50]);
        confetti({
          particleCount: 40,
          spread: 55,
          origin: { y: 0.55 },
          colors: ['#F4C2C2', '#ffffff', '#e08b8b', '#000000'],
        });
      } else if (next >= 3) {
        // Step 3: Letter slides out!
        isTransitioningRef.current = true;
        triggerHaptic([60, 80, 100]);
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.5 },
          colors: ['#F4C2C2', '#ffffff', '#000000', '#fb7185', '#ffd700'],
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
    let shakeCooldown = 0;

    const handleDeviceMotion = (event: DeviceMotionEvent) => {
      const current = event.accelerationIncludingGravity;
      if (!current) return;

      const now = Date.now();
      if (now - shakeCooldown < 600) return; // Prevent double trigger

      if (now - lastUpdate > 150) {
        const diffTime = now - lastUpdate;
        lastUpdate = now;

        const x = current.x || 0;
        const y = current.y || 0;
        const z = current.z || 0;

        const speed = (Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime) * 10000;

        // Threshold for a genuine shake gesture
        if (speed > 680) {
          shakeCooldown = now;
          advanceStep();
        }

        lastX = x;
        lastY = y;
        lastZ = z;
      }
    };

    window.addEventListener('devicemotion', handleDeviceMotion);
    return () => {
      window.removeEventListener('devicemotion', handleDeviceMotion);
    };
  }, [isOpen, step, advanceStep]);

  if (!isOpen || !letter) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-between p-4 sm:p-6 overflow-y-auto select-none">
      
      {/* Top Bar: Close button & step counter */}
      <div className="w-full max-w-sm flex items-center justify-between pt-2">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((s) => {
            const isDone = step > s;
            const isCurrent = step === s;
            return (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isDone
                    ? 'w-6 bg-emerald-400'
                    : isCurrent
                    ? 'w-7 bg-[#F4C2C2] ring-2 ring-white/50'
                    : 'w-3 bg-zinc-800'
                }`}
              />
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 active:scale-90 transition-transform"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Center Stage: Title + Physical Multi-Layer Envelope */}
      <div className="w-full max-w-sm my-auto flex flex-col items-center text-center py-2">
        
        {/* Step Badge & Prompt */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/90 border border-[#F4C2C2]/30 text-[#F4C2C2] text-[11px] font-bold mb-2 animate-pop-in">
          <Sparkles className="w-3 h-3 text-[#F4C2C2]" />
          <span>
            {step === 0 && 'Layer 1: Ribbon Sealed'}
            {step === 1 && 'Layer 2: Wax Sealed'}
            {step === 2 && 'Layer 3: Flap Open'}
            {step >= 3 && 'Unsealing...'}
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-serif font-black text-white tracking-tight leading-snug mb-1">
          {step === 0 && 'Shake 1: Untie Ribbon 🎀'}
          {step === 1 && 'Shake 2: Crack Wax Seal 💌'}
          {step === 2 && 'Shake 3: Slide Out Letter ✨'}
          {step >= 3 && 'Unfolding Letter... ❤️'}
        </h2>

        <p className="text-xs text-zinc-400 font-serif italic mb-6 max-w-xs">
          {step === 0 && 'Shake your phone or tap the gift below to untie the ribbon.'}
          {step === 1 && 'Shake again to break the royal wax seal holding it closed.'}
          {step === 2 && 'One final shake to draw the letter out of the envelope!'}
          {step >= 3 && 'Here it comes...'}
        </p>

        {/* 
          ==================================================
          PHYSICAL ENVELOPE (Strictly layered by step)
          ==================================================
        */}
        <div
          onClick={step < 3 ? advanceStep : undefined}
          className={`relative w-[290px] h-[185px] sm:w-[320px] sm:h-[200px] cursor-pointer select-none transition-transform duration-300 transform-gpu ${
            isWiggling ? 'animate-wiggle' : 'active:scale-95'
          }`}
        >

          {/* LAYER A: Base Envelope Backplate (Interior Lining) */}
          <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-[#1a1518] via-[#120f12] to-[#0c0a0c] border border-[#F4C2C2]/40 shadow-2xl overflow-hidden">
            {/* Subtle silk lining pattern */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#F4C2C2_1px,transparent_1px)] [background-size:12px_12px]" />
          </div>

          {/* 
            LAYER B: The Black Letter Stationery (Inside the pouch)
            STRICT RULE: Only appears at Step 2 and Step 3!
            Step 0 and Step 1 CANNOT see or peek at this letter at all.
          */}
          {step >= 2 && (
            <div
              className={`absolute inset-x-3.5 bg-black border-2 border-[#F4C2C2]/60 rounded-xl p-3.5 shadow-2xl text-left transition-all duration-700 ease-out z-10 ${
                step >= 3
                  ? '-translate-y-36 scale-105 opacity-100'
                  : '-translate-y-12 opacity-95'
              }`}
            >
              <div className="flex items-center justify-between border-b border-[#F4C2C2]/30 pb-1.5 mb-2">
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#F4C2C2]">
                  Strictly Confidential
                </span>
                <span className="text-xs">❤️</span>
              </div>
              <p className="text-[11px] font-cursive text-[#F4C2C2]">To: My Favorite Girl</p>
              <h4 className="font-serif font-black text-white text-sm sm:text-base leading-snug truncate">
                {letter.title}
              </h4>
              <p className="text-[10px] text-zinc-400 font-serif italic truncate mt-0.5">
                "{letter.subtitle}"
              </p>
              <div className="mt-2 flex items-center justify-between text-[9px] text-[#F4C2C2] font-bold">
                <span>{step >= 3 ? 'Unfolding...' : '↑ Shake to draw out'}</span>
                <span>✨</span>
              </div>
            </div>
          )}

          {/* 
            LAYER C: The Front Envelope Pocket (SVG)
            Covers the lower half of the envelope and tucks the letter inside.
          */}
          <svg
            viewBox="0 0 320 200"
            className="absolute inset-0 w-full h-full pointer-events-none z-20"
            preserveAspectRatio="none"
          >
            {/* Left folding triangle */}
            <polygon
              points="0,0 0,200 160,115"
              fill="#09090b"
              stroke="#F4C2C2"
              strokeOpacity="0.2"
              strokeWidth="1"
            />
            {/* Right folding triangle */}
            <polygon
              points="320,0 320,200 160,115"
              fill="#09090b"
              stroke="#F4C2C2"
              strokeOpacity="0.2"
              strokeWidth="1"
            />
            {/* Bottom main pocket triangle */}
            <polygon
              points="0,200 320,200 160,95"
              fill="#0c0c0e"
              stroke="#F4C2C2"
              strokeOpacity="0.4"
              strokeWidth="1.5"
            />
          </svg>

          {/* Postal stamp marks on the pocket front */}
          <div className="absolute bottom-2.5 left-3.5 z-25 text-[9px] font-serif italic text-zinc-500 pointer-events-none">
            Special Delivery
          </div>
          <div className="absolute bottom-2.5 right-3.5 z-25 text-[8px] font-mono uppercase tracking-widest text-[#F4C2C2]/70 border border-dashed border-[#F4C2C2]/40 px-1.5 py-0.5 rounded pointer-events-none">
            AIR MAIL ✈️
          </div>

          {/* 
            LAYER D: The Triangular Top Flap
            Step 0: Closed DOWN (points down to y=105)
            Step 1: Closed DOWN (wax seal on the tip)
            Step 2+: Flipped OPEN UPWARDS (points up to y=-75)
          */}
          <svg
            viewBox="0 0 320 200"
            className="absolute inset-0 w-full h-full pointer-events-none z-30 transition-transform duration-500 origin-top"
          >
            {step < 2 ? (
              /* Flap Closed DOWN */
              <polygon
                points="0,0 320,0 160,105"
                fill="#18181b"
                stroke="#F4C2C2"
                strokeOpacity="0.5"
                strokeWidth="1.5"
                className="filter drop-shadow-md"
              />
            ) : (
              /* Flap Flipped UPWARDS */
              <polygon
                points="0,0 320,0 160,-80"
                fill="#141416"
                stroke="#F4C2C2"
                strokeOpacity="0.25"
                strokeWidth="1.5"
                className="filter drop-shadow-sm"
              />
            )}
          </svg>

          {/*
            LAYER E: The Royal Wax Seal
            STRICT RULE: ONLY visible during Step 1!
            Does NOT show in Step 0 (hidden under ribbon).
            Does NOT show in Step 2+ (broken and removed).
          */}
          {step === 1 && (
            <div className="absolute left-1/2 top-[95px] -translate-x-1/2 -translate-y-1/2 z-35 animate-pop-in pointer-events-none">
              <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-pink-300 via-[#e08b8b] to-rose-700 border-2 border-white shadow-2xl flex items-center justify-center">
                {/* Wax drip rim */}
                <div className="absolute inset-0 rounded-full border border-pink-200/60 animate-ping opacity-25" />
                <span className="text-xl transform -rotate-6 select-none">
                  {letter.sealEmoji || '💌'}
                </span>
              </div>
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[8px] font-bold uppercase tracking-widest text-[#F4C2C2] whitespace-nowrap bg-black/80 px-1.5 py-0.5 rounded-full border border-[#F4C2C2]/40">
                Sealed
              </span>
            </div>
          )}

          {/*
            LAYER F: The Gift Ribbon Wrap & Luggage Tag
            STRICT RULE: ONLY visible during Step 0!
            Does NOT show during Step 1, 2, or 3.
          */}
          {step === 0 && (
            <div className="absolute inset-0 z-40 rounded-[28px] overflow-hidden pointer-events-none animate-pop-in">
              {/* Vertical Silk Ribbon */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-pink-300 via-[#F4C2C2] to-pink-400 shadow-xl border-x border-pink-200/50" />
              {/* Horizontal Silk Ribbon */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-8 bg-gradient-to-b from-pink-300 via-[#F4C2C2] to-pink-400 shadow-xl border-y border-pink-200/50" />

              {/* Center Bow */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#F4C2C2] text-black border-2 border-white shadow-2xl flex items-center justify-center text-2xl z-45">
                <span>🎀</span>
              </div>

              {/* Luggage Gift Tag */}
              <div className="absolute bottom-2.5 right-2.5 z-45 bg-zinc-950/95 border border-[#F4C2C2] rounded-xl p-2.5 shadow-2xl max-w-[190px] text-left transform rotate-2">
                <span className="text-[9px] uppercase tracking-wider text-[#F4C2C2] font-black block">
                  💌 Gift Tag
                </span>
                <p className="text-xs font-serif font-bold text-white truncate">
                  {letter.title}
                </p>
                <p className="text-[10px] font-cursive text-zinc-400">
                  For My Favorite Girl ❤️
                </p>
              </div>
            </div>
          )}

        </div>

        {/* 
          Bottom Action: Prominent Shake or Tap Button
        */}
        <div className="mt-7 w-full space-y-3">
          <button
            onClick={step < 3 ? advanceStep : undefined}
            disabled={step >= 3}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#F4C2C2] text-black font-extrabold text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <Smartphone className="w-4 h-4 animate-bounce" />
            <span>
              {step === 0 && 'Shake Phone (or Tap) to Untie Ribbon'}
              {step === 1 && 'Shake Phone (or Tap) to Break Wax Seal'}
              {step === 2 && 'Shake Phone (or Tap) to Slide Out Letter'}
              {step >= 3 && 'Unfolding Letter...'}
            </span>
          </button>

          {/* Micro status helper */}
          <div className="flex items-center justify-center gap-4 text-[11px] text-zinc-400 font-serif">
            <span className="flex items-center gap-1">
              {step > 0 ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <span className="text-[#F4C2C2]">1.</span>
              )}
              Ribbon
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              {step > 1 ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <span className="text-[#F4C2C2]">2.</span>
              )}
              Wax Seal
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              {step > 2 ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <span className="text-[#F4C2C2]">3.</span>
              )}
              Stationery
            </span>
          </div>
        </div>

      </div>

      {/* Bottom padding spacer */}
      <div className="h-2" />
    </div>
  );
};
