"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const items = [
  { id: 1, url: "https://picsum.photos/seed/gallery1/1200/800", title: "Fotografía Publicitaria", w: "w-[300px] sm:w-[400px] md:w-[500px]" },
  { id: 2, url: "https://picsum.photos/seed/gallery2/1200/800", title: "Producción Audiovisual", w: "w-[250px] sm:w-[350px] md:w-[450px]" },
  { id: 3, url: "https://picsum.photos/seed/gallery3/1200/800", title: "Branding", w: "w-[350px] sm:w-[450px] md:w-[550px]" },
  { id: 4, url: "https://picsum.photos/seed/gallery4/1200/800", title: "Fotografía Gastronómica", w: "w-[280px] sm:w-[380px] md:w-[480px]" },
  { id: 5, url: "https://picsum.photos/seed/gallery5/1200/800", title: "Social Media", w: "w-[320px] sm:w-[420px] md:w-[520px]" },
  { id: 6, url: "https://picsum.photos/seed/gallery6/1200/800", title: "Diseño Gráfico", w: "w-[270px] sm:w-[370px] md:w-[470px]" },
];

export default function HorizontalGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-55%"]);

  return (
    <section ref={sectionRef} className="py-32 md:py-40 bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 mb-14">
        <p className="text-[#525252] text-[10px] tracking-[0.2em] uppercase mb-3">Galería</p>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-[-0.04em] leading-[0.92] font-display">
          Trabajos destacados
        </h2>
      </div>

      <div className="relative h-[400px] sm:h-[500px] md:h-[600px]">
        <motion.div className="absolute inset-0 flex items-center" style={{ x }}>
          <div className="flex gap-4 md:gap-6 pl-6 md:pl-16">
            {items.map((item) => (
              <div
                key={item.id}
                className={`${item.w} shrink-0 aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden bg-[#141414] relative group`}
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <p className="text-white text-sm md:text-base font-semibold">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
