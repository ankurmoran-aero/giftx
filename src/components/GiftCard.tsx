import React from 'react';
import { GiftItem } from '../types';
import { Heart, Star, Plus, Check } from 'lucide-react';

interface GiftCardProps {
  gift: GiftItem;
  isWishlisted: boolean;
  isInCart: boolean;
  onToggleWishlist: (gift: GiftItem) => void;
  onAddToCart: (gift: GiftItem) => void;
}

export const GiftCard: React.FC<GiftCardProps> = ({
  gift,
  isWishlisted,
  isInCart,
  onToggleWishlist,
  onAddToCart,
}) => {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={gift.imageUrl}
          alt={gift.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(gift);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            isWishlisted
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-white/80 text-slate-600 hover:bg-white hover:text-rose-500'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Tag / Category Badge */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {gift.featured && (
            <span className="px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider bg-rose-600 text-white rounded-md shadow-sm">
              Staff Pick
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Rating and Category */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          <span className="capitalize font-semibold text-rose-600 tracking-wide">
            {gift.category}
          </span>
          <div className="flex items-center gap-1 text-slate-700">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="font-bold">{gift.rating}</span>
            <span className="text-slate-400">({gift.reviewsCount})</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-slate-900 group-hover:text-rose-600 transition-colors line-clamp-1 text-base">
          {gift.title}
        </h3>

        {/* Description */}
        <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed flex-1">
          {gift.description}
        </p>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-1">
          {gift.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Footer: Price & Add to Bag */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold text-slate-900">
                ${gift.price}
              </span>
              {gift.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ${gift.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold">Free Express Shipping</span>
          </div>

          <button
            onClick={() => onAddToCart(gift)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              isInCart
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-slate-900 hover:bg-rose-600 text-white shadow-sm'
            }`}
          >
            {isInCart ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
