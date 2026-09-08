"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { Spinner } from "./Icons";

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  category?: string;
}

const PREVIEW_MS = 5000;

function YtThumb({ id, alt, className, eager = false }: { id: string; alt: string; className?: string; eager?: boolean }) {
  const [src, setSrc] = useState(`https://img.youtube.com/vi/${id}/maxresdefault.jpg`);
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 1024px) 40vw, (max-width: 768px) 70vw, 35vw"
      priority={eager}
      className={className}
      onError={() => {
        if (src.includes("maxresdefault")) {
          setSrc(`https://img.youtube.com/vi/${id}/hqdefault.jpg`);
        }
      }}
    />
  );
}

function countFor(videos: VideoItem[], c: string) {
  return c === "Todos" ? videos.length : videos.filter((v) => (v.category || "Otros") === c).length;
}

export default function VideoSection({ videos }: { videos: VideoItem[] }) {
  const reduce = useReducedMotion();
  const anim = !reduce;
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState("Todos");
  const [isHovered, setIsHovered] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const categories = ["Todos", ...Array.from(new Set(videos.map((v) => v.category || "Otros")))];
  const filtered = category === "Todos" ? videos : videos.filter((v) => (v.category || "Otros") === category);
  const filteredCount = filtered.length;

  const openVideo = (i: number) => {
    setActive(i);
    setModalOpen(true);
    setLoading(true);
  };

  const selectCategory = (c: string) => {
    setCategory(c);
    setActive(0);
  };

  const closeModal = () => {
    setModalOpen(false);
    setLoading(false);
  };

  useEffect(() => {
    if (filteredCount <= 1 || modalOpen || isHovered) return;
    const bar = progressBarRef.current;
    const start = performance.now();
    let raf = 0;
    let timer = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / PREVIEW_MS, 1);
      if (bar) {
        bar.style.transform = `scaleX(${p})`;
      }
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        timer = window.setTimeout(() => {
          setActive((a) => (a + 1) % filteredCount);
        }, 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      if (bar) {
        bar.style.transform = "scaleX(0)";
      }
    };
  }, [active, category, modalOpen, filteredCount, isHovered]);

  if (videos.length === 0) return null;

  const current = filtered[active];

  return (
    <section id="video" className="py-24 md:py-32 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 mb-10 md:mb-14">
        <motion.div
          initial={anim ? { clipPath: "inset(0 100% 0 0)" } : false}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-3">
            <span className="w-8 h-px bg-gradient-to-r from-gold/60 to-transparent" />
            <p className="text-muted text-[10px] tracking-[0.2em] uppercase">Audiovisual</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gold tracking-[-0.04em] leading-[0.92]">Videos</h2>
        </motion.div>
      </div>

      {/* Category filter */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 mb-8 md:mb-10 flex gap-2 md:gap-3 flex-wrap" role="group" aria-label="Filtrar videos por categoría">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => selectCategory(c)}
            aria-pressed={category === c}
            className={`text-[10px] md:text-xs tracking-[0.15em] uppercase rounded-full px-4 md:px-5 py-2 border transition-all hover:scale-[1.02] active:scale-[0.98] ${
              category === c
                ? "bg-gold text-on-gold border-gold"
                : "bg-surface text-muted border-gold/15 hover:text-gold hover:border-gold/30"
            }`}
          >
            {c}
            <span className="opacity-60 ml-1.5">({countFor(videos, c)})</span>
          </button>
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="flex flex-col gap-6 md:gap-8">
          <motion.div
            key={current.id}
            initial={anim ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-surface cursor-pointer group ring-1 ring-gold/15 hover:ring-gold/30 transition-all duration-500"
            onClick={() => openVideo(active)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="aspect-video relative">
              <YtThumb
                id={current.youtubeId}
                alt={current.title}
                eager
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gold/90 group-hover:bg-gold flex items-center justify-center ring-1 ring-gold/20 shadow-[0_0_40px_rgba(201,168,76,0.25)] group-hover:shadow-[0_0_60px_rgba(201,168,76,0.45)] transition-all duration-500"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-on-gold ml-1">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </motion.div>
              </div>
              {filteredCount > 1 && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold/10">
                  <div ref={progressBarRef} className="h-full bg-gold/60 origin-left" style={{ transform: "scaleX(0)" }} />
                </div>
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p className="text-[#737373] text-[10px] tracking-[0.15em] uppercase mb-1.5">{current.category || "Audiovisual"}</p>
              <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-bold tracking-[-0.02em]">{current.title}</h3>
            </div>
          </motion.div>

          <div className="relative">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <p className="text-muted text-[10px] tracking-[0.2em] uppercase">Más videos · {filteredCount - 1} disponibles</p>
              {filteredCount > 2 && (
                <div className="hidden md:flex gap-2">
                  <button
                    onClick={() => document.getElementById("video-scroller")?.scrollBy({ left: -360, behavior: "smooth" })}
                    aria-label="Anterior"
                    className="w-8 h-8 rounded-full bg-surface border border-gold/10 flex items-center justify-center text-gold hover:bg-gold hover:text-on-gold transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 18l-6-6 6-6" /></svg>
                  </button>
                  <button
                    onClick={() => document.getElementById("video-scroller")?.scrollBy({ left: 360, behavior: "smooth" })}
                    aria-label="Siguiente"
                    className="w-8 h-8 rounded-full bg-surface border border-gold/10 flex items-center justify-center text-gold hover:bg-gold hover:text-on-gold transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 18l6-6-6-6" /></svg>
                  </button>
                </div>
              )}
            </div>
            <div
              id="video-scroller"
              className="flex gap-3 md:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3 -mx-6 px-6 md:mx-0 md:px-0"
              style={{ scrollbarWidth: "none" }}
            >
              {filtered.map((video, i) =>
                i === active ? null : (
                  <motion.button
                    key={video.id}
                    initial={anim ? { opacity: 0, y: 12 } : false}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                    onClick={() => openVideo(i)}
                    className="group text-left cursor-pointer focus:outline-none shrink-0 snap-start w-[78%] sm:w-[44%] md:w-[32%] lg:w-[24%] xl:w-[22%]"
                  >
                    <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-surface flex flex-col ring-1 ring-gold/5 group-hover:ring-gold/15 transition-all duration-300">
                      <div className="w-full aspect-video relative overflow-hidden">
                        <YtThumb id={video.youtubeId} alt={video.title} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gold/90 group-hover:bg-gold flex items-center justify-center shadow-lg ring-1 ring-gold/20 transition-all">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-on-gold ml-0.5"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                          </div>
                        </div>
                        <span className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white text-[10px] tracking-wider px-1.5 py-0.5 rounded">HD</span>
                      </div>
                      <div className="p-3 md:p-4 flex flex-col justify-center">
                        <p className="text-muted text-[9px] tracking-[0.15em] uppercase mb-0.5">{video.category || "Audiovisual"}</p>
                        <h4 className="text-gold-dark text-xs md:text-sm font-semibold tracking-tight line-clamp-2 leading-snug">{video.title}</h4>
                        <p className="text-secondary text-[10px] mt-1 leading-relaxed line-clamp-1 hidden md:block">{video.description}</p>
                      </div>
                    </div>
                  </motion.button>
                )
              )}
              {filteredCount <= 1 && (
                <div className="shrink-0 w-[78%] sm:w-[44%] md:w-[32%] flex flex-col items-center justify-center text-center rounded-xl bg-surface/60 border border-gold/10 p-6 aspect-video md:aspect-auto md:min-h-[180px]">
                  <p className="text-muted text-[10px] tracking-[0.2em] uppercase mb-2">¿Proyecto audiovisual?</p>
                  <p className="text-secondary text-xs leading-relaxed mb-3">Cuéntanos tu idea.</p>
                  <a href="https://wa.me/message/N3PW46LKUALOK1" target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[0.15em] uppercase text-gold border border-gold/30 rounded-full px-5 py-2">Escríbenos</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Player modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={closeModal}>
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-5xl glass-strong rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={closeModal} className="absolute top-4 right-4 z-20 glass rounded-full w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-all hover:scale-105">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
              <div className="aspect-video relative bg-black">
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                    <Spinner size={30} className="text-gold" />
                  </div>
                )}
                <iframe
                  key={current.youtubeId}
                  src={`https://www.youtube.com/embed/${current.youtubeId}?autoplay=1`}
                  title={current.title}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  onLoad={() => {
                    setLoading(false);
                  }}
                />
              </div>
              <div className="p-6 md:p-8">
                <p className="text-[#737373] text-[10px] tracking-[0.15em] uppercase mb-1">{current.category || "Audiovisual"}</p>
                <h3 className="text-white text-xl md:text-2xl font-bold tracking-[-0.02em]">{current.title}</h3>
                {current.description && <p className="text-[#525252] text-sm mt-2 leading-relaxed">{current.description}</p>}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}