import React from 'react';
import { Gift, Heart, ShoppingBag, Sparkles, Users } from 'lucide-react';

interface NavbarProps {
  wishlistCount: number;
  cartCount: number;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  onOpenAiFinder: () => void;
  onOpenSecretSanta: () => void;
  onNavigateHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  wishlistCount,
  cartCount,
  onOpenWishlist,
  onOpenCart,
  onOpenAiFinder,
  onOpenSecretSanta,
  onNavigateHome,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div 
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
              <Gift className="w-5 h-5 transition-transform group-hover:rotate-12" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-rose-900 to-rose-600 bg-clip-text text-transparent">
                Gift<span className="text-rose-500">X</span>
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-rose-50 text-rose-600 rounded-full border border-rose-200">
                v1.0
              </span>
            </div>
          </div>

          {/* Quick Actions & Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            <button
              onClick={onOpenAiFinder}
              className="flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors border border-purple-200/60"
            >
              <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
              <span>AI Gift Finder</span>
            </button>
            <button
              onClick={onOpenSecretSanta}
              className="flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 rounded-xl transition-colors"
            >
              <Users className="w-4 h-4 text-rose-500" />
              <span>Secret Santa</span>
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
              title="View Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center animate-bounce shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-medium transition-all shadow-sm shadow-slate-900/10 active:scale-95"
              aria-label="Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              {cartCount > 0 && (
                <span className="bg-rose-500 text-white px-1.5 py-0.2 text-xs font-bold rounded-md">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
