import React, { useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingBag, X } from 'lucide-react';

export default function Navbar({
  cartCount = 0,
  wishlistCount = 0,
  onOpenCart,
  onOpenWishlist,
  onSelectCategory,
  activeCategory
}) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['MEN', 'WOMEN', 'KIDS', 'BEAUTY'];

  return (
    <>
      {/* Top Banner / Utility Bar */}
      <div className="bg-[#111111] text-[#E0E0E0] text-[10px] md:text-[11px] font-medium tracking-[0.14em] py-2 px-4 md:px-12 flex justify-between items-center transition-all">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse"></span>
          <span>FREE DELIVERY ON ORDERS ABOVE ₹999</span>
        </div>
        <div className="hidden sm:flex items-center space-x-6 text-[#999999]">
          <a href="#app" className="hover:text-white transition-colors">DOWNLOAD APP</a>
          <span className="text-[#333333]">|</span>
          <a href="#track" className="hover:text-white transition-colors">TRACK ORDER</a>
          <span className="text-[#333333]">|</span>
          <a href="#help" className="hover:text-white transition-colors">HELP</a>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#F6F6F4]/90 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)] py-3'
            : 'bg-[#F6F6F4] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-10 flex items-center justify-between">
          {/* Left Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-[12px] font-semibold tracking-[0.12em] text-[#111111]">
            {navLinks.map((item) => (
              <button
                key={item}
                onClick={() => onSelectCategory && onSelectCategory(item)}
                className={`relative py-1 transition-colors hover:text-black uppercase cursor-pointer ${
                  activeCategory === item ? 'text-black font-bold' : 'text-[#555555]'
                }`}
              >
                {item}
                {activeCategory === item && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Icon Placeholder / Category trigger */}
          <div className="lg:hidden flex items-center space-x-3">
            <span className="text-[12px] font-bold tracking-widest uppercase">GAZU</span>
          </div>

          {/* Center Brand Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <a
              href="#"
              className="font-display font-extrabold text-2xl md:text-3xl tracking-[-0.04em] text-[#111111] hover:opacity-90 transition-opacity"
            >
              GAZU
            </a>
          </div>

          {/* Right Utilities */}
          <div className="flex items-center space-x-5 md:space-x-7 text-[11px] md:text-[12px] font-medium tracking-[0.12em] text-[#111111]">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center space-x-1.5 hover:text-black transition-colors cursor-pointer"
              title="Search collection"
            >
              <Search className="w-3.5 h-3.5 stroke-[2]" />
              <span className="hidden sm:inline uppercase text-[11px] font-semibold tracking-[0.12em]">Search</span>
            </button>

            {/* Login */}
            <button
              onClick={() => alert("GAZU Member Portal: Sign-in or Register for exclusive drop access.")}
              className="hidden sm:flex items-center space-x-1.5 hover:text-black transition-colors cursor-pointer"
            >
              <User className="w-3.5 h-3.5 stroke-[2]" />
              <span className="uppercase text-[11px] font-semibold tracking-[0.12em]">Login</span>
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="relative flex items-center space-x-1.5 hover:text-black transition-colors cursor-pointer"
              title="Wishlist"
            >
              <Heart className={`w-3.5 h-3.5 stroke-[2] ${wishlistCount > 0 ? 'fill-black' : ''}`} />
              <span className="hidden sm:inline uppercase text-[11px] font-semibold tracking-[0.12em]">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="bg-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center ml-0.5">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={onOpenCart}
              className="flex items-center space-x-1.5 bg-[#111111] text-white hover:bg-black px-3 py-1.5 rounded-full transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5 stroke-[2]" />
              <span className="text-[10px] md:text-[11px] font-semibold tracking-[0.14em]">CART ({cartCount})</span>
            </button>
          </div>
        </div>
      </header>

      {/* Instant Search Drawer Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 px-4 transition-all">
          <div className="bg-[#F6F6F4] w-full max-w-2xl rounded-2xl p-6 shadow-2xl border border-black/10">
            <div className="flex items-center justify-between pb-4 border-b border-black/10">
              <div className="flex items-center space-x-3 w-full">
                <Search className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search oversized tees, coats, carpenter denim..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-lg font-medium focus:outline-none placeholder:text-gray-400 font-sans"
                />
              </div>
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 hover:bg-black/5 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="pt-4">
              <div className="text-[11px] uppercase tracking-widest text-gray-500 font-semibold mb-2">
                Popular Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {['Volume Trench', 'Washed Charcoal', 'Boxy Black Tee', 'Oversized Ivory', 'Carpenter Denim'].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="text-xs bg-[#ECECE9] hover:bg-black hover:text-white px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
