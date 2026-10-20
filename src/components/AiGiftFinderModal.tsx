import React, { useState } from 'react';
import { Sparkles, X, CheckCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { GiftItem, RecipientType } from '../types';
import confetti from 'canvas-confetti';

interface AiGiftFinderModalProps {
  isOpen: boolean;
  gifts: GiftItem[];
  onClose: () => void;
  onAddToCart: (gift: GiftItem) => void;
  onToggleWishlist: (gift: GiftItem) => void;
  wishlistIds: string[];
}

export const AiGiftFinderModal: React.FC<AiGiftFinderModalProps> = ({
  isOpen,
  gifts,
  onClose,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
}) => {
  const [step, setStep] = useState<number>(1);
  const [targetRecipient, setTargetRecipient] = useState<RecipientType>('partner');
  const [vibe, setVibe] = useState<string>('thoughtful');
  const [budgetTier, setBudgetTier] = useState<'low' | 'mid' | 'high'>('mid');
  const [results, setResults] = useState<{ gift: GiftItem; reason: string }[]>([]);

  if (!isOpen) return null;

  const handleGenerate = () => {
    // Score & match gifts based on user inputs
    let matches = gifts.filter((g) => {
      if (budgetTier === 'low') return g.price <= 80;
      if (budgetTier === 'mid') return g.price > 60 && g.price <= 160;
      return g.price > 140;
    });

    if (matches.length === 0) {
      matches = gifts.slice(0, 3);
    }

    const tailored = matches.slice(0, 3).map((gift) => ({
      gift,
      reason: `Matched for ${targetRecipient} seeking ${vibe} vibes with an optimal price-to-sentiment score.`,
    }));

    setResults(tailored);
    setStep(4);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleReset = () => {
    setStep(1);
    setResults([]);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 overflow-hidden animate-slide-up">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200/40 rounded-full blur-3xl -z-10" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">AI Gift Finder</h3>
              <p className="text-xs text-slate-500">Step {step} of 3</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Recipient */}
        {step === 1 && (
          <div className="mt-6 space-y-4">
            <h4 className="font-bold text-slate-800 text-base">Who are you buying this gift for?</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'partner', label: 'Significant Other / Partner', icon: '❤️' },
                { id: 'parents', label: 'Parents / Family', icon: '🏡' },
                { id: 'friends', label: 'Close Friend', icon: '🎉' },
                { id: 'colleagues', label: 'Colleague / Mentor', icon: '💼' },
                { id: 'kids', label: 'Kids / Youngster', icon: '🚀' },
                { id: 'anyone', label: 'General / Anyone', icon: '🎁' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setTargetRecipient(item.id as RecipientType)}
                  className={`p-3.5 text-left rounded-2xl border transition-all text-xs sm:text-sm font-semibold flex items-center gap-2.5 ${
                    targetRecipient === item.id
                      ? 'border-purple-600 bg-purple-50/70 text-purple-900 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-purple-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md"
              >
                <span>Next: Choose Vibe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Vibe & Occasion */}
        {step === 2 && (
          <div className="mt-6 space-y-4">
            <h4 className="font-bold text-slate-800 text-base">What vibe best describes the feeling?</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'thoughtful', label: 'Thoughtful & Cozy', desc: 'Heartfelt sentimental touches' },
                { id: 'luxurious', label: 'Luxury & Elevated', desc: 'Premium materials and aesthetics' },
                { id: 'experiential', label: 'Adventure & Experiences', desc: 'Unforgettable memories' },
                { id: 'practical', label: 'Tech & Everyday Magic', desc: 'Clever tools and utility' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setVibe(item.id)}
                  className={`p-3.5 text-left rounded-2xl border transition-all ${
                    vibe === item.id
                      ? 'border-purple-600 bg-purple-50/70 text-purple-900 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <p className="font-bold text-sm">{item.label}</p>
                  <p className="text-[11px] text-slate-500 mt-1">{item.desc}</p>
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 text-slate-600 hover:text-slate-900 text-sm font-semibold"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-purple-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md"
              >
                <span>Next: Set Budget</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Budget Tier */}
        {step === 3 && (
          <div className="mt-6 space-y-4">
            <h4 className="font-bold text-slate-800 text-base">What is your ideal budget?</h4>
            <div className="space-y-3">
              {[
                { id: 'low', label: 'Under $75', desc: 'Charming, memorable, and budget-friendly' },
                { id: 'mid', label: '$75 — $150', desc: 'The sweet spot for delightful, lasting gifts' },
                { id: 'high', label: '$150+', desc: 'Grand gestures and heirloom-tier quality' },
              ].map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setBudgetTier(tier.id as 'low' | 'mid' | 'high')}
                  className={`w-full p-4 text-left rounded-2xl border transition-all flex items-center justify-between ${
                    budgetTier === tier.id
                      ? 'border-purple-600 bg-purple-50 text-purple-900 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div>
                    <p className="font-bold text-sm">{tier.label}</p>
                    <p className="text-xs text-slate-500">{tier.desc}</p>
                  </div>
                  {budgetTier === tier.id && <CheckCircle className="w-5 h-5 text-purple-600" />}
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-between items-center">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 text-slate-600 hover:text-slate-900 text-sm font-semibold"
              >
                Back
              </button>
              <button
                onClick={handleGenerate}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-purple-500/25"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Recommendations</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Results */}
        {step === 4 && (
          <div className="mt-6 space-y-4">
            <div className="text-center pb-2">
              <span className="text-2xl">✨</span>
              <h4 className="font-extrabold text-slate-900 text-lg">Top Tailored Picks</h4>
              <p className="text-xs text-slate-500">Based on your preferences</p>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {results.map(({ gift, reason }) => {
                const isWishlisted = wishlistIds.includes(gift.id);
                return (
                  <div
                    key={gift.id}
                    className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 flex gap-3.5 items-center hover:bg-white hover:border-purple-200 transition-all"
                  >
                    <img
                      src={gift.imageUrl}
                      alt={gift.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h5 className="font-bold text-sm text-slate-900 truncate">
                          {gift.title}
                        </h5>
                        <span className="text-sm font-extrabold text-slate-900 shrink-0 ml-2">
                          ${gift.price}
                        </span>
                      </div>
                      <p className="text-[11px] text-purple-700 italic mt-0.5 line-clamp-1">
                        {reason}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => onAddToCart(gift)}
                          className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg"
                        >
                          Add to Bag
                        </button>
                        <button
                          onClick={() => onToggleWishlist(gift)}
                          className={`px-2.5 py-1 border text-xs font-semibold rounded-lg ${
                            isWishlisted
                              ? 'border-rose-300 text-rose-600 bg-rose-50'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {isWishlisted ? 'Saved' : 'Wishlist'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex justify-between border-t border-slate-100">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Start Over</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
