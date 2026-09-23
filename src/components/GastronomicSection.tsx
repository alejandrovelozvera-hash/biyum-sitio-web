"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

const photos = [
  "https://wp.biyum.agency/wp-content/uploads/2024/07/DSC01744-1-scaled.jpg",
  "https://wp.biyum.agency/wp-content/uploads/2024/07/DSC09352-scaled.jpg",
  "https://wp.biyum.agency/wp-content/uploads/2024/07/DSC03925-scaled.jpg",
  "https://wp.biyum.agency/wp-content/uploads/2024/07/DSC05606-scaled.jpg",
  "https://wp.biyum.agency/wp-content/uploads/2024/07/DSC03081-1-scaled.jpg",
  "https://wp.biyum.agency/wp-content/uploads/2024/07/DSC06920-scaled.jpg",
  "https://wp.biyum.agency/wp-content/uploads/2024/07/DSC04074-scaled.jpg",
  "https://wp.biyum.agency/wp-content/uploads/2024/07/DSC02412-scaled.jpg",
  "https://wp.biyum.agency/wp-content/uploads/2024/07/DSC02527-scaled.jpg",
];
const perPage = 3;
const pages = Array.from({ length: Math.ceil(photos.length / perPage) }, (_, i) => photos.slice(i * perPage, (i + 1) * perPage));

export default function GastronomicSection() {
  const reduce = useReducedMotion();
  const anim = !reduce;
  const [current, setCurrent] = React.useState(0);
  const pageCount = pages.length;
  React.useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setCurrent((p) => (p + 1) % pageCount), 4000);
    return () => clearInterval(id);
  }, [reduce, pageCount]);
  const next = () => setCurrent((p) => (p + 1) % pageCount);
  const prev = () => setCurrent((p) => (p - 1 + pageCount) % pageCount);
  return (
    <section id="gastronomica" className="py-20 md:py-24 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <motion.div initial={anim ? { clipPath: "inset(0 100% 0 0)" } : false} whileInView={{ clipPath: "inset(0 0% 0 0)" }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mb-8 md:mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="w-8 h-px bg-gradient-to-r from-border to-transparent" />
              <p className="text-muted text-[10px] tracking-[0.2em] uppercase">Fotografía Gastronómica</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gold tracking-[-0.04em] leading-[0.92]">Sabores que se ven</h2>
            <p className="text-secondary text-sm md:text-[15px] leading-relaxed mt-4 max-w-xl">Capturamos textura, vapor y color para que tu carta provoque antojo. $15 por plato · 6 fotos · sesión en tu local.</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden md:flex gap-1.5 mr-2">
              {pages.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} aria-label={`Ir ${i + 1}`} className={`h-1 rounded-full transition-all ${i === current ? "w-5 bg-foreground" : "w-1 bg-border hover:bg-muted"}`} />
              ))}
            </div>
            <button onClick={prev} aria-label="Anterior" className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-foreground/20 transition-colors"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 18l-6-6 6-6" /></svg></button>
            <button onClick={next} aria-label="Siguiente" className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-foreground/20 transition-colors"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 18l6-6-6-6" /></svg></button>
          </div>
        </motion.div>

        <div className="overflow-hidden rounded-2xl">
          <motion.div className="flex" animate={{ x: `-${(current * 100) / pageCount}%` }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} style={{ width: `${pageCount * 100}%` }}>
            {pages.map((page, pi) => (
              <div key={pi} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 shrink-0" style={{ width: `${100 / pageCount}%` }}>
                {page.map((src, i) => (
                  <div key={src + i} className="relative overflow-hidden rounded-2xl bg-surface ring-1 ring-border shadow-sm group">
                    <Image src={src} alt={`Gastronomía ${pi * perPage + i + 1}`} width={800} height={800} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="w-full aspect-[4/3] object-cover block group-hover:scale-[1.03] transition-transform duration-700" unoptimized />
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
        <div className="md:hidden flex gap-1.5 justify-center mt-4">
          {pages.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`h-1 rounded-full transition-all ${i === current ? "w-5 bg-foreground" : "w-1 bg-border"}`} />
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <a href="https://wa.me/message/N3PW46LKUALOK1?text=Hola%20Biyum,%20me%20interesa%20fotografia%20gastronomica%20$15%20por%20plato" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-on-gold bg-gold hover:bg-gold-light rounded-full px-7 py-3 font-medium transition-colors">Cotizar foto gastronómica</a>
          <span className="text-muted text-xs">Entrega 5–7 días · Sesión en tu local · Props incluidos</span>
        </div>
      </div>
    </section>
  );
}
