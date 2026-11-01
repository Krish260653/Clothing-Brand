import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function CategorySection({ onCategoryClick }) {
  return (
    <section className="bg-[#111111] text-white py-12 md:py-16 px-6 md:px-12 border-t border-b border-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              onClick={() => onCategoryClick && onCategoryClick(cat.title)}
              className="group flex items-center space-x-5 cursor-pointer p-3 rounded-lg hover:bg-white/[0.04] transition-all"
            >
              {/* Category Portrait Thumbnail */}
              <div className="relative w-20 h-24 md:w-24 md:h-28 overflow-hidden rounded-sm bg-[#1F1F1F] shrink-0 border border-white/10 group-hover:border-white/30 transition-all">
                <img
                  src={cat.image}
                  alt={cat.title}
                  onError={(e) => {
                    e.currentTarget.src = cat.fallback;
                  }}
                  className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                />
              </div>

              {/* Category Typography & Action */}
              <div className="flex flex-col justify-center space-y-1">
                <h3 className="font-display text-lg md:text-xl font-bold tracking-[0.06em] text-white uppercase group-hover:text-gray-100 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-[#8E8E93] font-normal leading-relaxed tracking-wide">
                  {cat.subtitle}
                </p>
                <div className="pt-2 flex items-center space-x-2 text-[11px] font-semibold tracking-[0.14em] text-white uppercase">
                  <span className="border-b border-transparent group-hover:border-white transition-all pb-0.5">
                    {cat.action}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
