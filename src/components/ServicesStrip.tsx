"use client";

import { motion } from "motion/react";
import { Camera, Video, Palette, Megaphone } from "./Icons";

const Food = ({ size = 20, ...rest }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...rest}>
    <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
  </svg>
);

const items = [
  { icon: Camera, label: "Fotografía Publicitaria" },
  { icon: Food, label: "Fotografía Gastronómica" },
  { icon: Video, label: "Producción de Video" },
  { icon: Palette, label: "Branding" },
  { icon: Megaphone, label: "Social Media" },
];

export default function ServicesStrip() {
  return (
    <section className="py-16 md:py-20 bg-[#0A0A0A]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass rounded-full px-4 py-2.5 md:px-5 md:py-3 flex items-center gap-2 hover:bg-white/[0.07] transition-colors cursor-default"
            >
              <item.icon size={13} className="text-[#737373]" />
              <span className="text-white text-xs md:text-sm font-medium whitespace-nowrap">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
