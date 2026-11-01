import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { subscribeNewsletter } from '../services/supabaseService';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (email.trim()) {
      await subscribeNewsletter(email.trim());
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#111111] text-white pt-20 pb-12 px-6 md:px-12 border-t border-black">
      <div className="max-w-7xl mx-auto">
        {/* Top grid: Brand story & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="lg:col-span-5 space-y-4">
            <span className="font-display text-3xl font-extrabold tracking-tight">GAZU</span>
            <p className="text-sm text-gray-400 font-normal leading-relaxed max-w-sm">
              Fashion that moves with you. Built on principles of architectural silhouettes, uncompromised textile integrity, and modern streetwear luxury.
            </p>
            <div className="pt-2 text-xs text-gray-400 tracking-widest uppercase">
              NEW DELHI • TOKYO • PARIS • NEW YORK
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="max-w-md">
              <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-white mb-2">
                JOIN THE GAZU ATELIER LIST
              </h4>
              <p className="text-xs text-gray-400 mb-4">
                Be the first to access limited season drops, archival restocks, and private studio events.
              </p>

              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border border-white/20 px-4 py-3 text-xs text-white placeholder:text-gray-500 rounded-l focus:outline-none focus:border-white flex-1"
                />
                <button
                  type="submit"
                  className="bg-white text-black px-5 py-3 text-xs font-bold tracking-widest uppercase rounded-r hover:bg-gray-200 transition-colors flex items-center space-x-1 cursor-pointer"
                >
                  {subscribed ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>SUBSCRIBED</span>
                    </>
                  ) : (
                    <>
                      <span>JOIN</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Link navigation columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-white/10 text-xs">
          <div>
            <h5 className="font-bold tracking-[0.16em] uppercase text-white mb-4">COLLECTIONS</h5>
            <ul className="space-y-2.5 text-gray-400 font-normal">
              <li><a href="#collection" className="hover:text-white transition-colors">Autumn / Winter 2024</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Heavyweight Basics</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Volume Trench Series</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">New Season Vibes</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Archival Releases</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold tracking-[0.16em] uppercase text-white mb-4">CLIENT SERVICES</h5>
            <ul className="space-y-2.5 text-gray-400 font-normal">
              <li><a href="#track" className="hover:text-white transition-colors">Track Order</a></li>
              <li><a href="#returns" className="hover:text-white transition-colors">15-Day Easy Returns</a></li>
              <li><a href="#shipping" className="hover:text-white transition-colors">Shipping & Delivery</a></li>
              <li><a href="#care" className="hover:text-white transition-colors">Garment Care Guide</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Customer Support</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold tracking-[0.16em] uppercase text-white mb-4">ATELIER</h5>
            <ul className="space-y-2.5 text-gray-400 font-normal">
              <li><a href="#about" className="hover:text-white transition-colors">About GAZU</a></li>
              <li><a href="#sustainability" className="hover:text-white transition-colors">Material Ethics</a></li>
              <li><a href="#press" className="hover:text-white transition-colors">Press & Media</a></li>
              <li><a href="#careers" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold tracking-[0.16em] uppercase text-white mb-4">LEGAL</h5>
            <ul className="space-y-2.5 text-gray-400 font-normal">
              <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#cookie" className="hover:text-white transition-colors">Cookie Preferences</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & giant background watermark */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <p>© 2024–2026 GAZU CLOTHING CO. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center space-x-6">
            <span>CURRENCY: <strong>INR (₹)</strong></span>
            <span>SHIPPING TO: <strong>INDIA</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
