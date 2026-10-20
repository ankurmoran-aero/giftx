import React from 'react';
import { Category, RecipientType } from '../types';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';

interface GiftFilterProps {
  selectedCategory: Category;
  selectedRecipient: RecipientType;
  searchQuery: string;
  maxPrice: number;
  onSelectCategory: (cat: Category) => void;
  onSelectRecipient: (rec: RecipientType) => void;
  onSearchChange: (q: string) => void;
  onMaxPriceChange: (p: number) => void;
  onReset: () => void;
}

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'all', label: 'All Gifts' },
  { id: 'tech', label: 'Tech & Gadgets' },
  { id: 'luxury', label: 'Luxury & Style' },
  { id: 'wellness', label: 'Wellness & Zen' },
  { id: 'experiences', label: 'Experiences' },
  { id: 'personalized', label: 'Personalized' },
  { id: 'lifestyle', label: 'Home & Living' },
];

const RECIPIENTS: { id: RecipientType; label: string }[] = [
  { id: 'anyone', label: 'All Recipients' },
  { id: 'partner', label: 'For Partner' },
  { id: 'parents', label: 'For Parents' },
  { id: 'friends', label: 'For Friends' },
  { id: 'colleagues', label: 'For Colleagues' },
  { id: 'kids', label: 'For Kids' },
];

export const GiftFilter: React.FC<GiftFilterProps> = ({
  selectedCategory,
  selectedRecipient,
  searchQuery,
  maxPrice,
  onSelectCategory,
  onSelectRecipient,
  onSearchChange,
  onMaxPriceChange,
  onReset,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-5">
      {/* Search & Price Row */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search gifts, occasions, or tags..."
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all bg-slate-50/50"
          />
        </div>

        {/* Max Price Range Slider */}
        <div className="w-full md:w-72 flex items-center gap-3">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
          <div className="flex-1">
            <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
              <span>Max Price</span>
              <span className="text-rose-600">${maxPrice}</span>
            </div>
            <input
              type="range"
              min="25"
              max="300"
              step="5"
              value={maxPrice}
              onChange={(e) => onMaxPriceChange(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
            />
          </div>

          <button
            onClick={onReset}
            title="Reset Filters"
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Categories Tabs */}
      <div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/30'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recipient Filter Chips */}
      <div className="pt-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap mr-1">
          Recipient:
        </span>
        {RECIPIENTS.map((rec) => (
          <button
            key={rec.id}
            onClick={() => onSelectRecipient(rec.id)}
            className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedRecipient === rec.id
                ? 'bg-purple-100 text-purple-700 font-bold border border-purple-200'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {rec.label}
          </button>
        ))}
      </div>
    </div>
  );
};
