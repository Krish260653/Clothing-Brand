import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Lock } from 'lucide-react';

const PERKS = [
  {
    icon: Truck,
    title: "FAST DELIVERY",
    desc: "Quick & safe delivery nationwide"
  },
  {
    icon: RotateCcw,
    title: "EASY RETURNS",
    desc: "Within 15 days, no questions asked"
  },
  {
    icon: ShieldCheck,
    title: "QUALITY ASSURED",
    desc: "Best fashion, curated textiles"
  },
  {
    icon: Lock,
    title: "SECURE PAYMENT",
    desc: "100% encrypted & verified checkout"
  }
];

export default function PerksSection() {
  return (
    <section className="bg-[#F6F6F4] border-b border-[#E0E0DC] py-10 md:py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
        {PERKS.map((perk, idx) => {
          const Icon = perk.icon;
          return (
            <div
              key={idx}
              className="flex items-center space-x-4 p-2 group hover:translate-y-[-2px] transition-transform duration-200"
            >
              <div className="w-12 h-12 rounded-full bg-[#EAEAE7] flex items-center justify-center shrink-0 border border-black/5 group-hover:border-black/20 group-hover:bg-white transition-all">
                <Icon className="w-5 h-5 text-[#222222] stroke-[1.6]" />
              </div>
              <div>
                <h4 className="text-[11px] md:text-[12px] font-bold tracking-[0.14em] text-[#111111] uppercase mb-0.5">
                  {perk.title}
                </h4>
                <p className="text-[11px] text-[#666666] font-normal leading-tight">
                  {perk.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
