import { useState, useMemo } from 'react';
import { MOCK_GIFTS } from './data/mockGifts';
import { Category, GiftItem, RecipientType, CartItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GiftFilter } from './components/GiftFilter';
import { GiftCard } from './components/GiftCard';
import { AiGiftFinderModal } from './components/AiGiftFinderModal';
import { SecretSantaModal } from './components/SecretSantaModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { Sparkles, PackageOpen } from 'lucide-react';

export function App() {
  const [gifts] = useState<GiftItem[]>(MOCK_GIFTS);
  const [wishlist, setWishlist] = useState<GiftItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Modals state
  const [isAiFinderOpen, setIsAiFinderOpen] = useState(false);
  const [isSecretSantaOpen, setIsSecretSantaOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Filters state
  const [category, setCategory] = useState<Category>('all');
  const [recipient, setRecipient] = useState<RecipientType>('anyone');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(300);

  // Filtered gifts computation
  const filteredGifts = useMemo(() => {
    return gifts.filter((gift) => {
      // Category filter
      if (category !== 'all' && gift.category !== category) {
        return false;
      }
      // Recipient filter
      if (recipient !== 'anyone' && !gift.recipient.includes(recipient)) {
        return false;
      }
      // Price filter
      if (gift.price > maxPrice) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = gift.title.toLowerCase().includes(query);
        const matchesDesc = gift.description.toLowerCase().includes(query);
        const matchesTag = gift.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesTag) {
          return false;
        }
      }
      return true;
    });
  }, [gifts, category, recipient, maxPrice, searchQuery]);

  // Wishlist handler
  const handleToggleWishlist = (gift: GiftItem) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === gift.id);
      if (exists) {
        return prev.filter((item) => item.id !== gift.id);
      }
      return [...prev, gift];
    });
  };

  // Cart handlers
  const handleAddToCart = (gift: GiftItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.gift.id === gift.id);
      if (existing) {
        return prev.map((item) =>
          item.gift.id === gift.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { gift, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.gift.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.gift.id !== id));
  };

  const handleClearCart = () => setCart([]);

  const handleResetFilters = () => {
    setCategory('all');
    setRecipient('anyone');
    setSearchQuery('');
    setMaxPrice(300);
  };

  const wishlistIds = useMemo(() => wishlist.map((w) => w.id), [wishlist]);
  const cartGiftIds = useMemo(() => cart.map((c) => c.gift.id), [cart]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-rose-500 selection:text-white">
      {/* Sticky Navigation */}
      <Navbar
        wishlistCount={wishlist.length}
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAiFinder={() => setIsAiFinderOpen(true)}
        onOpenSecretSanta={() => setIsSecretSantaOpen(true)}
        onNavigateHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      <main className="flex-1">
        {/* Hero Banner */}
        <Hero
          onOpenAiFinder={() => setIsAiFinderOpen(true)}
          onOpenSecretSanta={() => setIsSecretSantaOpen(true)}
        />

        {/* Collection Section */}
        <div id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          {/* Filters Bar */}
          <GiftFilter
            selectedCategory={category}
            selectedRecipient={recipient}
            searchQuery={searchQuery}
            maxPrice={maxPrice}
            onSelectCategory={setCategory}
            onSelectRecipient={setRecipient}
            onSearchChange={setSearchQuery}
            onMaxPriceChange={setMaxPrice}
            onReset={handleResetFilters}
          />

          {/* Catalog Header */}
          <div className="mt-8 mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Curated Collection
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Showing {filteredGifts.length} {filteredGifts.length === 1 ? 'gift idea' : 'gift ideas'}
              </p>
            </div>

            <button
              onClick={() => setIsAiFinderOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold rounded-xl border border-purple-200/80 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Ask AI Matcher</span>
            </button>
          </div>

          {/* Gifts Grid */}
          {filteredGifts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredGifts.map((gift) => (
                <GiftCard
                  key={gift.id}
                  gift={gift}
                  isWishlisted={wishlistIds.includes(gift.id)}
                  isInCart={cartGiftIds.includes(gift.id)}
                  onToggleWishlist={handleToggleWishlist}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center max-w-lg mx-auto shadow-sm my-8">
              <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 mx-auto flex items-center justify-center mb-4">
                <PackageOpen className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-900">No gifts match your filter</h3>
              <p className="text-xs text-slate-500 mt-1">
                Try widening your price range or resetting the recipient and category filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-5 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-rose-600 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-over Drawers and Modals */}
      <AiGiftFinderModal
        isOpen={isAiFinderOpen}
        gifts={gifts}
        onClose={() => setIsAiFinderOpen(false)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        wishlistIds={wishlistIds}
      />

      <SecretSantaModal
        isOpen={isSecretSantaOpen}
        onClose={() => setIsSecretSantaOpen(false)}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        wishlist={wishlist}
        onClose={() => setIsWishlistOpen(false)}
        onRemove={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />
    </div>
  );
}

export default App;
