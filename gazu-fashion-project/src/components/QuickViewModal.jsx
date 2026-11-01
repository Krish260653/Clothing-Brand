import React, { useState } from 'react';
import { X, Heart, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) {
  if (!isOpen || !product) return null;

  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [activeImg, setActiveImg] = useState(product.image);

  const handleAdd = () => {
    onAddToCart(product, selectedSize);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-[#F6F6F4] rounded-xl overflow-hidden shadow-2xl z-10 border border-black/10 max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-black flex items-center justify-center transition-all cursor-pointer shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Visual Gallery */}
        <div className="md:w-1/2 bg-[#ECECE9] p-6 flex flex-col justify-between">
          <div className="aspect-[3/4] w-full rounded-lg overflow-hidden bg-white/50 mb-4 shadow-sm">
            <img
              src={activeImg}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Alternate angle thumbnails */}
          <div className="flex space-x-3">
            {[product.image, product.secondaryImage].filter(Boolean).map((imgUrl, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(imgUrl)}
                className={`w-16 h-20 rounded overflow-hidden border-2 transition-all cursor-pointer ${
                  activeImg === imgUrl ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Spec & Action Controls */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-bold tracking-[0.2em] text-[#777777] uppercase mb-2">
              <span>GAZU ARCHIVES</span>
              <span>•</span>
              <span>{product.category}</span>
            </div>

            <h2 className="font-display font-bold text-2xl md:text-3xl tracking-tight text-black mb-3">
              {product.name}
            </h2>

            {/* Price display */}
            <div className="flex items-baseline space-x-3 mb-6">
              <span className="text-2xl font-extrabold text-black">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                SAVE 35%
              </span>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-xs font-bold tracking-wider uppercase text-black">Select Size</span>
                <span className="text-[11px] text-gray-500 underline cursor-pointer">Size Guide</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2.5 text-xs font-bold tracking-wider rounded border transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-black text-white border-black shadow-sm'
                        : 'bg-white text-gray-800 border-gray-300 hover:border-black'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Assurance pills */}
            <div className="space-y-2 py-4 border-t border-b border-black/10 text-[11px] text-gray-600">
              <div className="flex items-center space-x-2">
                <Truck className="w-3.5 h-3.5 text-black" />
                <span>Express Dispatch within 24 hours</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-black" />
                <span>100% Guaranteed Authentic GAZU Garment</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex space-x-3 pt-6">
            <button
              onClick={handleAdd}
              className="flex-1 bg-[#111111] hover:bg-black text-white py-3.5 px-6 rounded text-xs font-semibold tracking-[0.16em] uppercase flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-lg active:scale-98"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>ADD TO BAG • ₹{product.price.toLocaleString('en-IN')}</span>
            </button>

            <button
              onClick={() => onToggleWishlist(product.id)}
              className="w-12 h-12 rounded border border-gray-300 bg-white hover:border-black flex items-center justify-center transition-colors cursor-pointer"
              title="Wishlist"
            >
              <Heart
                className={`w-5 h-5 ${
                  isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-700'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
