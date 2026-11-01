import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CategorySection from './components/CategorySection';
import NewVibesSection from './components/NewVibesSection';
import PerksSection from './components/PerksSection';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import AtelierDummySection from './components/AtelierDummySection';
import Footer from './components/Footer';
import { PRODUCTS } from './data/products';
import { createOrder } from './services/supabaseService';
import { Check, Heart, ShoppingBag } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState([
    {
      id: "gazu-01",
      name: "Heavyweight Washed Charcoal Tee",
      price: 1499,
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
      selectedSize: "L",
      quantity: 1
    }
  ]);
  const [wishlistIds, setWishlistIds] = useState(["gazu-02"]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [toastMessage, setToastMessage] = useState(null);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Toast notification helper
  const showToast = (message, icon = null) => {
    setToastMessage({ message, icon });
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Cart operations
  const handleAddToCart = (product, size = 'M') => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            selectedSize: size,
            quantity: 1
          }
        ];
      }
    });
    showToast(`Added ${product.name} (${size}) to Bag`, 'bag');
  };

  const handleUpdateQuantity = (id, size, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(id, size);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.selectedSize === size ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id, size) => {
    setCartItems((prev) => prev.filter((item) => !(item.id === id && item.selectedSize === size)));
  };

  // Wishlist operations
  const handleToggleWishlist = (productId) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      const product = PRODUCTS.find((p) => p.id === productId);
      if (exists) {
        showToast(`Removed from Wishlist`, 'heart-off');
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`Saved to Wishlist`, 'heart-on');
        return [...prev, productId];
      }
    });
  };

  // Smooth scroll helpers
  const scrollToCollection = () => {
    document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToNewVibes = () => {
    document.getElementById('new-vibes')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategoryFilter = (catName) => {
    setSelectedCategory(catName);
    scrollToCollection();
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F6F6F4] text-[#111111] font-sans relative">
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#111111] text-white px-5 py-3 rounded-full shadow-2xl flex items-center space-x-2 text-xs font-semibold tracking-wider uppercase border border-white/10 animate-bounce">
          {toastMessage.icon === 'bag' && <ShoppingBag className="w-4 h-4 text-emerald-400" />}
          {toastMessage.icon === 'heart-on' && <Heart className="w-4 h-4 fill-red-500 text-red-500" />}
          <span>{toastMessage.message}</span>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => {
          showToast(`${wishlistIds.length} items saved in your Wishlist`, 'heart-on');
          scrollToCollection();
        }}
        onSelectCategory={handleCategoryFilter}
        activeCategory={selectedCategory}
      />

      <main>
        {/* 1. Hero Section with dynamic scroll parallax on walking model */}
        <HeroSection
          onShopNow={scrollToCollection}
          onExploreNew={scrollToNewVibes}
        />

        {/* 2. Category showcase (MEN, WOMEN, KIDS) */}
        <CategorySection onCategoryClick={handleCategoryFilter} />

        {/* 3. New Season / New Vibes with Scroll-Scrubbed 4-Photos Pop-up */}
        <NewVibesSection
          onExplore={scrollToCollection}
          onAddToCart={handleAddToCart}
          onQuickViewHeroItem={() => {
            const overshirt = PRODUCTS.find((p) => p.id === 'gazu-06') || PRODUCTS[0];
            setQuickViewProduct(overshirt);
          }}
        />

        {/* 4. Brand Perks Bar */}
        <PerksSection />

        {/* 5. Atelier Mannequin — Brand Story + Dummy Dressing on Scroll */}
        <AtelierDummySection onAddToCart={handleAddToCart} />

        {/* 6. Best of GAZU Product Grid */}
        <ProductGrid
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          onOpenQuickView={(product) => setQuickViewProduct(product)}
          selectedCategory={selectedCategory}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={async () => {
          setIsCartOpen(false);
          const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
          const orderNum = `GZ-${Math.floor(1000 + Math.random() * 9000)}`;
          await createOrder({
            orderNumber: orderNum,
            items: cartItems,
            totalAmount: totalAmount,
            customerEmail: 'guest@gazu.in'
          });
          setOrderConfirmed(true);
        }}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Simulated Order Confirmation Modal */}
      {orderConfirmed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#F6F6F4] p-8 rounded-xl max-w-md w-full text-center space-y-4 border border-black/10 shadow-2xl">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-black">
              ORDER PLACED • GAZU ATELIER
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Thank you for ordering with GAZU. Order #GZ-8942 has been confirmed and is being hand-packed at our atelier with express dispatch.
            </p>
            <div className="p-3 bg-white rounded border border-black/5 text-xs text-gray-700 font-mono">
              Delivery to: New Delhi (Free Express Delivery)
            </div>
            <button
              onClick={() => {
                setCartItems([]);
                setOrderConfirmed(false);
              }}
              className="w-full bg-black text-white py-3 rounded text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-gray-900 transition-colors"
            >
              Back to Store
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
