import React, { useState } from 'react';
import { GiftItem } from '../types';
import { X, Heart, Trash2, ShoppingBag, Share2, Check } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  wishlist: GiftItem[];
  onClose: () => void;
  onRemove: (gift: GiftItem) => void;
  onAddToCart: (gift: GiftItem) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  wishlist,
  onClose,
  onRemove,
  onAddToCart,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const totalValue = wishlist.reduce((acc, item) => acc + item.price, 0);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin + '?wishlist=shared');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-rose-50 rounded-xl text-rose-500">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Your Wishlist</h3>
                <p className="text-xs text-slate-500">{wishlist.length} saved treasures</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <Heart className="w-12 h-12 stroke-1 text-slate-300 mb-3" />
                <p className="text-sm font-semibold text-slate-700">Your wishlist is empty</p>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  Browse gifts and click the heart icon to save items for birthdays, holidays, or exchanges.
                </p>
              </div>
            ) : (
              wishlist.map((gift) => (
                <div
                  key={gift.id}
                  className="flex gap-3.5 p-3 rounded-2xl border border-slate-200/80 hover:border-rose-200 bg-white transition-all group"
                >
                  <img
                    src={gift.imageUrl}
                    alt={gift.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{gift.title}</h4>
                    <span className="text-xs font-extrabold text-slate-800">${gift.price}</span>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => {
                          onAddToCart(gift);
                          onRemove(gift);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-[11px] font-semibold"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Bag</span>
                      </button>
                      <button
                        onClick={() => onRemove(gift)}
                        className="p-1 text-slate-400 hover:text-rose-500"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlist.length > 0 && (
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 space-y-3">
              <div className="flex justify-between text-xs font-semibold text-slate-600">
                <span>Total Value</span>
                <span className="text-slate-900 font-extrabold text-sm">${totalValue}</span>
              </div>

              <button
                onClick={handleShare}
                className="w-full inline-flex items-center justify-center gap-2 py-3 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs border border-slate-200 shadow-sm transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? 'Share Link Copied!' : 'Share Public Wishlist Link'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
