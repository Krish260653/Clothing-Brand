import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  items = [],
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) {
  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 999;
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const diffToFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer content */}
      <div className="relative w-full max-w-md bg-[#F6F6F4] h-full shadow-2xl flex flex-col z-10 border-l border-black/10">
        {/* Header */}
        <div className="p-6 border-b border-black/10 flex justify-between items-center bg-[#F6F6F4]">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-black" />
            <h2 className="font-display font-bold text-lg tracking-[0.04em] uppercase text-black">
              YOUR BAG ({items.reduce((sum, i) => sum + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-black/5 text-gray-700 hover:text-black cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="px-6 py-3.5 bg-[#EAEAE7] border-b border-black/5 text-xs">
          {diffToFree === 0 ? (
            <p className="font-semibold text-emerald-800 flex items-center space-x-1.5">
              <span>🎉 You unlocked FREE delivery on this order!</span>
            </p>
          ) : (
            <p className="text-gray-700 font-medium">
              Add <span className="font-bold text-black">₹{diffToFree.toLocaleString('en-IN')}</span> more for FREE delivery
            </p>
          )}
          <div className="w-full h-1.5 bg-black/10 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-black transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 py-12">
              <ShoppingBag className="w-12 h-12 stroke-[1] mb-3 text-gray-400" />
              <p className="font-display text-base uppercase font-semibold text-gray-800">Your bag is empty</p>
              <p className="text-xs text-gray-500 max-w-xs mt-1">
                Explore the latest GAZU drops and build your contemporary silhouette.
              </p>
              <button
                onClick={onClose}
                className="mt-6 bg-black text-white text-xs font-semibold tracking-widest uppercase px-6 py-3 rounded cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.id}-${item.selectedSize}`}
                className="flex space-x-4 pb-5 border-b border-black/5 items-start"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-24 object-cover rounded bg-[#E5E5E2] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xs font-semibold text-black truncate pr-2">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => onRemoveItem(item.id, item.selectedSize)}
                      className="text-gray-400 hover:text-black cursor-pointer p-0.5"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-[11px] text-gray-500 mt-0.5">Size: {item.selectedSize}</p>
                  <p className="text-xs font-bold text-black mt-1">₹{item.price.toLocaleString('en-IN')}</p>

                  {/* Quantity controls */}
                  <div className="flex items-center space-x-3 mt-3">
                    <div className="flex items-center border border-black/20 rounded bg-white">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                        className="px-2 py-1 text-gray-600 hover:text-black cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-semibold min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                        className="px-2 py-1 text-gray-600 hover:text-black cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with totals */}
        {items.length > 0 && (
          <div className="p-6 bg-[#ECECE9] border-t border-black/10 space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span>{diffToFree === 0 ? 'FREE' : '₹149'}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-black pt-2 border-t border-black/10">
                <span>Estimated Total</span>
                <span>₹{(subtotal + (diffToFree === 0 ? 0 : 149)).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="w-full bg-[#111111] hover:bg-black text-white py-4 rounded text-xs font-semibold tracking-[0.16em] uppercase flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-lg active:scale-98"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-center text-gray-500 uppercase tracking-widest">
              Complimentary Returns & 100% Encrypted Checkout
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
