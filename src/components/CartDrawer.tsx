import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, ShoppingBag, Plus, Minus, Trash2, Gift, Check, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  cart: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  cart,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [includeGiftWrap, setIncludeGiftWrap] = useState(true);
  const [giftNote, setGiftNote] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const itemsSubtotal = cart.reduce((sum, item) => sum + item.gift.price * item.quantity, 0);
  const giftWrapTotal = includeGiftWrap ? cart.reduce((sum, item) => sum + item.quantity * 5, 0) : 0;
  const grandTotal = itemsSubtotal + giftWrapTotal;

  const handleCheckout = () => {
    setIsSuccess(true);
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.5 },
    });
    setTimeout(() => {
      onClearCart();
      setIsSuccess(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-slate-900 rounded-xl text-white">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Your Gift Bag</h3>
                <p className="text-xs text-slate-500">
                  {cart.reduce((s, i) => s + i.quantity, 0)} items ready for giving
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-extrabold text-slate-900">Order Placed!</h4>
                <p className="text-xs text-slate-500 max-w-xs">
                  Your gifts are prepared with luxury gift wrapping and dispatched immediately.
                </p>
              </div>
            ) : cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <ShoppingBag className="w-12 h-12 stroke-1 text-slate-300 mb-3" />
                <p className="text-sm font-semibold text-slate-700">Your bag is empty</p>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  Select wonderful gifts from the collection to get started.
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.gift.id}
                      className="flex gap-3.5 p-3 rounded-2xl border border-slate-200/80 bg-white"
                    >
                      <img
                        src={item.gift.imageUrl}
                        alt={item.gift.title}
                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                            {item.gift.title}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.gift.id)}
                            className="text-slate-400 hover:text-rose-500 ml-1 p-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-xs font-extrabold text-slate-800">
                          ${item.gift.price * item.quantity}
                        </span>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center border border-slate-200 rounded-lg">
                            <button
                              onClick={() => onUpdateQuantity(item.gift.id, -1)}
                              className="p-1 hover:bg-slate-100 text-slate-600 rounded-l-lg"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold text-slate-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.gift.id, 1)}
                              className="p-1 hover:bg-slate-100 text-slate-600 rounded-r-lg"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-[10px] text-slate-400">
                            (${item.gift.price} ea)
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Gift Wrap & Message Option */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <label className="flex items-center justify-between p-3 rounded-xl bg-rose-50/60 border border-rose-100 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Gift className="w-4 h-4 text-rose-500" />
                      <div>
                        <p className="text-xs font-bold text-slate-800">Premium Gift Wrapping</p>
                        <p className="text-[10px] text-slate-500">Ribbon, silk paper & seal (+$5/item)</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={includeGiftWrap}
                      onChange={(e) => setIncludeGiftWrap(e.target.checked)}
                      className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
                    />
                  </label>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">
                      Personal Greeting Note (Optional)
                    </label>
                    <textarea
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      placeholder="Write a sweet message to appear on the handwritten card..."
                      rows={2}
                      className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Checkout Footer */}
          {cart.length > 0 && !isSuccess && (
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 space-y-3">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${itemsSubtotal}</span>
                </div>
                {includeGiftWrap && (
                  <div className="flex justify-between text-rose-600">
                    <span>Luxury Gift Wrap</span>
                    <span>+${giftWrapTotal}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-slate-800 text-sm pt-2 border-t border-slate-200">
                  <span>Estimated Total</span>
                  <span className="text-base font-extrabold text-slate-900">${grandTotal}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 text-white font-bold rounded-xl text-sm shadow-md shadow-rose-500/20 transition-all"
              >
                <span>Complete Gift Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
