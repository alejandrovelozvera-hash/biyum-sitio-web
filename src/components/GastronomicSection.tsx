"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

const photos = [
  "https://wp.biyum.agency/wp-content/uploads/2024/07/DSC01744-1-scaled.jpg",
  "https://wp.biyum.agency/wp-content/uploads/2024/07/DSC09352-scaled.jpg",
  "https://wp.biyum.agency/wp-content/uploads/2024/07/DSC03925-scaled.jpg",
  "https://wp.biyum.agency/wp-content/uploads/2024/07/DSC01744-scaled.jpg",
  "https://wp.biyum.agency/wp-content/uploads/2024/07/DSC05606-scaled.jpg",
  "https://wp.biyum.agency/wp-content/uploads/2024/07/DSC03081-1-scaled.jpg",
  "https://wp.biyum.agency/wp-content/uploads/2024/07/DSC06920-scaled.jpg",
  "https://wp.biyum.agency/wp-content/uploads/2024/07/DSC04074-scaled.jpg",
  "https://wp.biyum.agency/wp-content/uploads/2024/07/DSC02412-scaled.jpg",
  "https://wp.biyum.agency/wp-content/uploads/2024/07/DSC02527-scaled.jpg",
];

function chunk<T>(arr: T[], n: number): T[][] {
  const r: T[][] = [];
  for (let i = 0; i < arr.length; i += n) r.push(arr.slice(i, i + n));
  return r;
}

export default function GastronomicSection() {
  const reduce = useReducedMotion();
  const anim = !reduce;
  const [page, setPage] = React.useState(0);
  const [pageM, setPageM] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [pausedM, setPausedM] = React.useState(false);
  const pages = React.useMemo(() => chunk(photos, 3), []);
  const pagesM = React.useMemo(() => chunk(photos, 4), []);
  const pageCount = pages.length;
  const pageCountM = pagesM.length;
  const next = () => setPage((p) => (p + 1) % pageCount);
  const prev = () => setPage((p) => (p - 1 + pageCount) % pageCount);
  const nextM = () => setPageM((p) => (p + 1) % pageCountM);
  const prevM = () => setPageM((p) => (p - 1 + pageCountM) % pageCountM);
  React.useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(next, 3000);
    return () => clearInterval(id);
  }, [reduce, paused, pageCount]);
  React.useEffect(() => {
    if (reduce || pausedM) return;
    const id = setInterval(nextM, 3000);
    return () => clearInterval(id);
  }, [reduce, pausedM, pageCountM]);
  return (
    <section id="gastronomica" className="py-24 md:py-32 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <motion.div
          initial={anim ? { clipPath: "inset(0 100% 0 0)" } : false}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 md:mb-14"
        >
          <div className="flex items-center gap-4 mb-3">
            <span className="w-8 h-px bg-gradient-to-r from-gold/60 to-transparent" />
            <p className="text-muted text-[10px] tracking-[0.2em] uppercase">Fotografía Gastronómica</p>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gold tracking-[-0.04em] leading-[0.92] pb-[0.12em] mb-[-0.12em]">Sabores que se ven</h2>
          <p className="text-secondary text-sm md:text-base leading-relaxed mt-5 max-w-xl">
            Cada plato cuenta una historia. Capturamos texturas, vapor y color para que tu carta provoque antojo antes del primer bocado. $15 por plato · 6 fotos desde distintas perspectivas.
          </p>
        </motion.div>

        <div className="md:hidden relative" onTouchStart={() => setPausedM(true)} onTouchEnd={() => setPausedM(false)}>
          <div className="overflow-hidden rounded-2xl">
            <motion.div className="flex" animate={{ x: `-${pageM * 100}%` }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} style={{ width: `${pageCountM * 100}%` }}>
              {pagesM.map((pg, pi) => (
                <div key={pi} className="grid grid-cols-2 gap-3 shrink-0 p-0.5" style={{ width: `${100 / pageCountM}%` }}>
                  {pg.map((src, i) => (
                    <div key={`${src}-${i}`} className="relative overflow-hidden rounded-2xl bg-surface ring-1 ring-gold/5">
                      <Image src={src} alt={`Fotografía gastronómica ${pi * 4 + i + 1}`} width={600} height={600} sizes="50vw" className="w-full h-auto block" />
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-1.5">
              {Array.from({ length: pageCountM }).map((_, i) => (
                <button key={i} onClick={() => setPageM(i)} aria-label={`Ir a grupo ${i + 1}`} className={`h-1.5 rounded-full transition-all ${i === pageM ? "w-6 bg-gold" : "w-1.5 bg-gold/20 hover:bg-gold/40"}`} />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={prevM} aria-label="Anterior" className="w-8 h-8 rounded-full bg-surface border border-gold/10 flex items-center justify-center text-gold hover:bg-gold hover:text-on-gold transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <button onClick={nextM} aria-label="Siguiente" className="w-8 h-8 rounded-full bg-surface border border-gold/10 flex items-center justify-center text-gold hover:bg-gold hover:text-on-gold transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>
          </div>
        </div>

        <div className="hidden md:block relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="overflow-hidden rounded-2xl">
            <motion.div className="flex" animate={{ x: `-${page * 100}%` }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} style={{ width: `${pageCount * 100}%` }}>
              {pages.map((pg, pi) => (
                <div key={pi} className="grid grid-cols-3 gap-4 shrink-0" style={{ width: `${100 / pageCount}%` }}>
                  {pg.map((src, i) => (
                    <div key={`${src}-${i}`} className="relative overflow-hidden rounded-2xl bg-surface ring-1 ring-gold/5">
                      <Image src={src} alt={`Fotografía gastronómica ${pi * 3 + i + 1}`} width={800} height={800} sizes="33vw" className="w-full h-auto block" />
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-1.5">
              {Array.from({ length: pageCount }).map((_, i) => (
                <button key={i} onClick={() => setPage(i)} aria-label={`Ir a grupo ${i + 1}`} className={`h-1.5 rounded-full transition-all ${i === page ? "w-6 bg-gold" : "w-1.5 bg-gold/20 hover:bg-gold/40"}`} />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={prev} aria-label="Anterior" className="w-8 h-8 rounded-full bg-surface border border-gold/10 flex items-center justify-center text-gold hover:bg-gold hover:text-on-gold transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <button onClick={next} aria-label="Siguiente" className="w-8 h-8 rounded-full bg-surface border border-gold/10 flex items-center justify-center text-gold hover:bg-gold hover:text-on-gold transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <a href="https://wa.me/message/N3PW46LKUALOK1?text=Hola%20Biyum,%20me%20interesa%20fotografia%20gastronomica%20$15%20por%20plato" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-on-gold bg-gold hover:bg-gold-light rounded-full px-7 py-3 font-medium transition-all hover:scale-[1.02] active:scale-[0.98]">
            Cotizar gastronomía
          </a>
          <span className="text-muted text-xs">Entrega en 5–7 días · Sesión en tu local</span>
        </div>
      </div>
    </section>
  );
}
