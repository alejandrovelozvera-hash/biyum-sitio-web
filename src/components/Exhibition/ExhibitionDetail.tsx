"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "@/types";

interface Props {
  project: Project;
  onClose: () => void;
}

export default function ExhibitionDetail({ project, onClose }: Props) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [active, setActive] = useState(0);

  const slides = [
    ...(project.cover_image_url ? [{ url: project.cover_image_url, alt: project.title }] : []),
    ...project.images.map((i) => ({ url: i.url, alt: i.alt })),
  ];

  if (slides.length === 0) return null;

  const prev = () => setActive((a) => (a - 1 + slides.length) % slides.length);
  const next = () => setActive((a) => (a + 1) % slides.length);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, slides.length]);

  const mainImage = slides[active]?.url;

  return (
    <motion.div
      initial={{ clipPath: "circle(0% at 50% 50%)" }}
      animate={{ clipPath: "circle(100% at 50% 50%)" }}
      exit={{ clipPath: "circle(0% at 50% 50%)" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-background"
      onClick={onClose}
    >
      <div className="absolute inset-0" onClick={(e) => e.stopPropagation()}>
        {mainImage && (
          <>
            <img
              src={mainImage}
              alt={project.title}
              className={`w-full h-full object-contain transition-opacity duration-700 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setImageLoaded(true)}
            />
          </>
        )}
      </div>

      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-20 glass rounded-full w-12 h-12 flex items-center justify-center text-gold-dark/70 hover:text-gold transition-all hover:scale-105 active:scale-95"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {slides.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 glass rounded-full w-12 h-12 flex items-center justify-center text-gold-dark/70 hover:text-gold transition-all hover:scale-105 active:scale-95"
            aria-label="Anterior"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 glass rounded-full w-12 h-12 flex items-center justify-center text-gold-dark/70 hover:text-gold transition-all hover:scale-105 active:scale-95"
            aria-label="Siguiente"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <div className="absolute bottom-40 md:bottom-44 left-0 right-0 z-20 flex justify-center gap-2 px-8" onClick={(e) => e.stopPropagation()}>
            {slides.map((s, i) => (
              <button
                key={s.url + i}
                onClick={() => { setActive(i); setImageLoaded(false); }}
                className={`w-14 h-14 md:w-16 md:h-16 overflow-hidden rounded-lg border transition-all ${
                  i === active ? "border-gold scale-105" : "border-white/10 opacity-60 hover:opacity-100"
                }`}
                aria-label={`Imagen ${i + 1}`}
              >
                <img src={s.url} alt={s.alt || `${project.title} ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <p className="absolute bottom-28 md:bottom-32 left-0 right-0 z-20 text-center text-muted text-[10px] tracking-[0.2em] uppercase">
            {active + 1} / {slides.length}
          </p>
        </>
      )}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 z-10 p-8 md:p-16 max-w-[1400px]"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-gold text-[10px] tracking-[0.2em] uppercase mb-2">{project.category}</p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gold tracking-[-0.04em] leading-[0.92]">
              {project.title}
            </h2>
            <p className="text-secondary text-sm md:text-base mt-4 leading-relaxed max-w-lg">
              {project.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            {project.client && (
              <div className="glass rounded-xl px-5 py-3">
                <p className="text-muted text-[9px] tracking-[0.15em] uppercase">Cliente</p>
                <p className="text-gold-dark text-sm font-medium mt-0.5">{project.client}</p>
              </div>
            )}
            {project.year && (
              <div className="glass rounded-xl px-5 py-3">
                <p className="text-muted text-[9px] tracking-[0.15em] uppercase">Año</p>
                <p className="text-gold-dark text-sm font-medium mt-0.5">{project.year}</p>
              </div>
            )}
          </div>
        </div>

        {project.services && project.services.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {project.services.map((s) => (
              <span key={s} className="text-muted text-[10px] px-3 py-1.5 rounded-full border border-gold/20">
                {s}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
