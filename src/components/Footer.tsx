import React from 'react';
import { Gift, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white shadow-sm">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-extrabold text-slate-900">
                Gift<span className="text-rose-600">X</span>
              </span>
              <p className="text-xs text-slate-500">
                Modern Intelligent Gifting & Wishlists
              </p>
            </div>
          </div>

          {/* Vercel Badge & Status */}
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-semibold text-slate-700">Vercel Ready</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <span>Built with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>for thoughtful moments</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} GiftX. Developed by ankurmoran-aero.</p>
          <div className="flex gap-4">
            <a href="https://github.com/ankurmoran-aero/giftx" target="_blank" rel="noreferrer" className="hover:text-slate-600 transition-colors">
              GitHub Repository
            </a>
            <a href="https://vercel.com" target="_blank" rel="noreferrer" className="hover:text-slate-600 transition-colors">
              Deploy on Vercel
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
