import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Gift, Shuffle } from 'lucide-react';

interface HeroProps {
  onOpenAiFinder: () => void;
  onOpenSecretSanta: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAiFinder, onOpenSecretSanta }) => {
  return (
    <div className="relative overflow-hidden pt-8 pb-14 lg:pt-16 lg:pb-20 bg-gradient-to-b from-rose-50/50 via-white to-slate-50">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-rose-200/30 via-purple-200/20 to-amber-100/30 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-rose-700 text-xs font-semibold mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-rose-600 animate-spin" />
            <span>AI-Powered Recommendations • Deployed on Vercel</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Unwrap Joy with <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Intelligent Gifting
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
            Eliminate the guesswork of finding the perfect present. Discover curated luxury items, create personal wishlists, and run hassle-free Secret Santa exchanges.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={onOpenAiFinder}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 text-white font-semibold shadow-lg shadow-rose-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sparkles className="w-5 h-5" />
              <span>Launch AI Gift Assistant</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>

            <button
              onClick={onOpenSecretSanta}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold border border-slate-200 shadow-sm transition-all"
            >
              <Shuffle className="w-4 h-4 text-purple-600" />
              <span>Host Secret Santa Exchange</span>
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="mt-12 pt-8 border-t border-slate-200/70 grid grid-cols-2 md:grid-cols-3 gap-4 text-left">
            <div className="flex items-center gap-3 p-2">
              <div className="w-9 h-9 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Curated Catalog</h4>
                <p className="text-xs text-slate-500">Handpicked premium goods</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Edge Optimized</h4>
                <p className="text-xs text-slate-500">Sub-second Vercel edge delivery</p>
              </div>
            </div>

            <div className="col-span-2 md:col-span-1 flex items-center gap-3 p-2 justify-center md:justify-start">
              <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Zero Spam Policy</h4>
                <p className="text-xs text-slate-500">Private & encrypted wishlists</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
