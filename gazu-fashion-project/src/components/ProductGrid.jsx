import React, { useState } from 'react';
import { Heart, Plus, Eye, Check } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function ProductGrid({
  onAddToCart,
  onToggleWishlist,
  wishlistIds = [],
  onOpenQuickView,
  selectedCategory = 'ALL'
}) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [addedAnimationId, setAddedAnimationId] = useState(null);

  const filteredProducts =
    selectedCategory === 'ALL'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category.toUpperCase() === selectedCategory.toUpperCase());

  const handleQuickAdd = (product, e) => {
    e.stopPropagation();
    onAddToCart(product, product.sizes[0] || 'M');
    setAddedAnimationId(product.id);
    setTimeout(() => setAddedAnimationId(null), 1200);
  };

  return (
    <section id="collection" className="bg-[#F6F6F4] py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-baseline mb-10 pb-4 border-b border-black/10">
          <div>
            <span className="text-[10px] tracking-[0.24em] font-semibold text-[#777777] uppercase block mb-1">
              CURATED SELECTION
            </span>
            <h2 className="font-display font-extrabold text-2xl md:text-4xl tracking-[-0.03em] text-[#111111] uppercase">
              BEST OF GAZU
            </h2>
          </div>

          <a
            href="#all"
            className="group text-[11px] md:text-[12px] font-semibold tracking-[0.16em] text-[#111111] uppercase pb-1 relative"
          >
            <span>VIEW ALL ({PRODUCTS.length})</span>
            <span className="block w-full h-[1.5px] bg-[#111111] transition-transform origin-left group-hover:scale-x-75" />
          </a>
        </div>

        {/* Product Cards Grid - 4 columns on large screens */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            const isJustAdded = addedAnimationId === product.id;

            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredCard(product.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => onOpenQuickView(product)}
                className="group flex flex-col cursor-pointer select-none"
              >
                {/* Image Showcase Container */}
                <div className="relative aspect-[3/4] w-full bg-[#E5E5E2] rounded-md overflow-hidden mb-3.5">
                  <img
                    src={hoveredCard === product.id ? product.secondaryImage : product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Badge */}
                  {product.tag && (
                    <div className="absolute top-3 left-3 bg-[#111111] text-white text-[9px] font-bold tracking-[0.14em] uppercase px-2 py-1 rounded-sm">
                      {product.tag}
                    </div>
                  )}

                  {/* Wishlist Heart Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-black hover:scale-110 active:scale-95 transition-all shadow-sm cursor-pointer z-10"
                    title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isWishlisted ? 'fill-red-500 text-red-500' : 'text-[#222222]'
                      }`}
                    />
                  </button>

                  {/* Quick Action Overlay on Hover - Clean Non-AI buttons */}
                  <div className="absolute inset-x-2 bottom-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={(e) => handleQuickAdd(product, e)}
                      className={`flex-1 flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded text-[11px] font-semibold tracking-[0.12em] uppercase transition-all shadow-md active:scale-95 cursor-pointer ${
                        isJustAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#111111] text-white hover:bg-black'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>ADDED</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>QUICK ADD</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenQuickView(product);
                      }}
                      className="w-10 bg-white/90 hover:bg-white text-black flex items-center justify-center rounded shadow-md cursor-pointer transition-colors"
                      title="Quick View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Product Metadata & Clean Typography */}
                <div className="flex flex-col space-y-1">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-xs md:text-sm font-semibold tracking-[-0.01em] text-[#111111] group-hover:text-black line-clamp-1">
                      {product.name}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-2 text-xs">
                    <span className="font-bold text-[#111111]">₹{product.price.toLocaleString('en-IN')}</span>
                    {product.originalPrice && (
                      <span className="text-[#888888] line-through text-[11px]">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  {/* Available size indicators */}
                  <div className="flex items-center space-x-1 pt-1 opacity-70 group-hover:opacity-100 transition-opacity">
                    {product.sizes.map((sz) => (
                      <span
                        key={sz}
                        className="text-[9px] uppercase font-medium text-[#555555] bg-[#EAEAE7] px-1.5 py-0.5 rounded-sm"
                      >
                        {sz}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
