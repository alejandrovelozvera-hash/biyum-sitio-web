"use client";

import { useState, useEffect } from "react";
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

const PREVIEW_MS = 15000;

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
  const [progress, setProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState("Todos");

  const categories = ["Todos", ...Array.from(new Set(videos.map((v) => v.category || "Otros")))];
  const filtered = category === "Todos" ? videos : videos.filter((v) => (v.category || "Otros") === category);
  const filteredCount = filtered.length;

  const openVideo = (i: number) => {
    setActive(i);
    setModalOpen(true);
    setLoading(true);
    setProgress(0);
  };

  const selectCategory = (c: string) => {
    setCategory(c);
    setActive(0);
    setProgress(0);
  };

  const closeModal = () => {
    setModalOpen(false);
    setLoading(false);
    setProgress(0);
  };

  useEffect(() => {
    if (filteredCount <= 1 || modalOpen) return;
    const start = performance.now();
    let raf = 0;
    let timer = 0;
    const tick = (t: number) => {
      const p = (t - start) / PREVIEW_MS;
      setProgress(Math.min(p, 1));
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
    };
  }, [active, category, modalOpen, filteredCount]);

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
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gold tracking-[-0.04em] leading-[0.92]">
            Videos
          </h2>
        </motion.div>
      </div>

      {/* Category filter */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 mb-8 md:mb-10 flex gap-2 md:gap-3 flex-wrap">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => selectCategory(c)}
            className={`text-[10px] md:text-xs tracking-[0.15em] uppercase rounded-full px-4 md:px-5 py-2 border transition-all ${
              category === c
                ? "bg-gold text-on-gold border-gold"
                : "text-muted border-gold/20 hover:text-gold hover:border-gold/50"
            }`}
          >
            {c}
            <span className="opacity-70 ml-1.5">({countFor(videos, c)})</span>
          </button>
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-5">
          {/* Featured / Main video */}
          <div className="lg:w-[65%]">
            <motion.div
              key={current.id}
              initial={anim ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-surface cursor-pointer group ring-1 ring-gold/20"
              onClick={() => openVideo(active)}
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
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full glass-strong flex items-center justify-center ring-1 ring-gold/30 shadow-[0_0_40px_rgba(201,168,76,0.25)] group-hover:shadow-[0_0_60px_rgba(201,168,76,0.45)] transition-shadow duration-500"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white ml-1">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </motion.div>
                </div>
                {filteredCount > 1 && progress > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10">
                    <div
                      className="h-full bg-gold origin-left transition-transform duration-100 linear"
                      style={{ transform: `scaleX(${progress})` }}
                    />
                  </div>
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-[#737373] text-[10px] tracking-[0.15em] uppercase mb-1.5">
                  {current.category || "Audiovisual"}
                </p>
                <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-bold tracking-[-0.02em]">
                  {current.title}
                </h3>
              </div>
            </motion.div>
          </div>

          {/* Sidebar / row of other videos */}
          <div
            className="lg:w-[35%] flex lg:flex-col gap-3 md:gap-4 overflow-x-auto lg:overflow-y-auto lg:max-h-[calc((100vw-16rem)*0.5625)] pb-2 lg:pb-0"
            style={{ scrollbarWidth: "none" }}
          >
            {filtered.map((video, i) =>
              i === active ? null : (
                <motion.button
                  key={video.id}
                  initial={anim ? { opacity: 0, x: 20 } : false}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  onClick={() => openVideo(i)}
                  className="group flex-shrink-0 w-[70vw] sm:w-[45vw] lg:w-full text-left cursor-pointer focus:outline-none"
                >
                  <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-surface flex flex-row lg:flex-col">
                    <div className="w-[40%] lg:w-full aspect-video lg:aspect-video relative overflow-hidden">
                      <YtThumb
                        id={video.youtubeId}
                        alt={video.title}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/60 flex items-center justify-center group-hover:bg-gold/80 transition-colors">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-white ml-0.5">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 p-3 md:p-4 flex flex-col justify-center lg:p-3">
                      <p className="text-muted text-[9px] tracking-[0.15em] uppercase mb-0.5 lg:hidden">
                        {video.category || "Audiovisual"}
                      </p>
                      <h4 className="text-gold-dark text-xs md:text-sm font-semibold tracking-tight line-clamp-2 leading-snug">
                        {video.title}
                      </h4>
                      <p className="text-secondary text-[10px] mt-1 leading-relaxed line-clamp-1 hidden lg:block">
                        {video.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              )
            )}

            {/* Empty state / CTA when the category has only one video */}
            {filteredCount <= 1 && (
              <div className="hidden lg:flex flex-1 flex-col items-center justify-center text-center rounded-xl bg-surface/60 border border-gold/10 p-6">
                <p className="text-muted text-[10px] tracking-[0.2em] uppercase mb-3">¿Tienes un proyecto audiovisual?</p>
                <p className="text-secondary text-xs leading-relaxed mb-4">
                  Cuéntanos tu idea y creemos el video que tu marca necesita.
                </p>
                <a
                  href="https://wa.me/message/N3PW46LKUALOK1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] tracking-[0.15em] uppercase text-gold hover:text-gold-light border border-gold/30 hover:border-gold/60 rounded-full px-5 py-2 transition-all"
                >
                  Escríbenos
                </a>
              </div>
            )}
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