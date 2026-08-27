"use client";

import { Fragment, useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { ChevronLeft, ChevronRight, Play } from "./Icons";
import Link from "next/link";

interface Slide {
  image_url: string;
  title: string;
  subtitle: string;
  cta_text?: string;
  cta_link?: string;
  video_url?: string;
  video_id?: string;
  is_video?: boolean;
  video_start?: number;
  video_end?: number;
}

const fallback: Slide[] = [
  {
    image_url: "https://biyum.agency/wp-content/uploads/2023/06/DSC01381-2-scaled.jpg",
    title: "Foto Publicitaria",
    subtitle: "Imágenes que hablan por sí solas.",
  },
  {
    image_url: "https://biyum.agency/wp-content/uploads/2023/09/papeleria-1-scaled.jpg",
    title: "Branding",
    subtitle: "Identidades visuales que conectan.",
  },
  {
    image_url: "https://biyum.agency/wp-content/uploads/2024/07/DSC02412-scaled.jpg",
    title: "Fotografía Gastronómica",
    subtitle: "Deliciosas imágenes que abren el apetito.",
  },
];

const services = [
  "Fotografía Publicitaria",
  "Fotografía Gastronómica",
  "Producción de Video",
  "Branding",
  "Social Media",
  "Diseño Web",
];

const TITLE_DURATION = 10;

function KineticTitle({ text }: { text: string }) {
  return (
    <span className="inline-block" aria-label={text}>
      {text.split(" ").map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((char, ci) => (
            <span key={ci} className="inline-block overflow-hidden align-bottom pb-[0.32em] mb-[-0.32em]">
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 + (wi * 4 + ci) * 0.035, ease: [0.16, 1, 0.3, 1] }}
              >
                {char}
              </motion.span>
            </span>
          ))}
          {wi < text.split(" ").length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

export default function HeroSlider({ slides = fallback }: { slides?: Slide[] }) {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const bar = progressBarRef.current;
    const start = performance.now();
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min((t - start) / (TITLE_DURATION * 1000), 1);
      if (bar) {
        bar.style.transform = `scaleX(${p})`;
      }
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const timeout = setTimeout(next, TITLE_DURATION * 1000 + 150);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
      if (bar) {
        bar.style.transform = "scaleX(0)";
      }
    };
  }, [next, slides.length, current]);

  const s = slides[current];
  const vid = s?.video_id || s?.image_url?.match(/\/vi\/([^/]+)\//)?.[1] || null;
  const vStart = s?.video_start ?? 10;

  return (
    <section ref={sectionRef} className="relative h-dvh w-full overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
          style={{ y: parallaxY }}
        >
          {vid ? (
            <div className="absolute inset-0 overflow-hidden bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${vid}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&playlist=${vid}&iv_load_policy=3&disablekb=1&fs=0&start=${vStart}`}
                className="absolute top-1/2 left-1/2 w-[177.77vh] h-[56.25vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                allow="autoplay; encrypted-media"
                title={s.title}
              />
            </div>
          ) : s?.image_url ? (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${s.image_url})` }}
            />
          ) : null}
          {(s?.image_url || vid) && (
            <>
              <div className="absolute inset-0 bg-background/35" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-background/10 to-transparent" />
            </>
          )}
        </motion.div>
      </AnimatePresence>



      {/* Availability stamp */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="hidden lg:flex items-center gap-2 absolute top-24 right-6 md:right-16 z-10"
      >
        <span className="relative flex w-2 h-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold/40" />
          <span className="relative inline-flex rounded-full w-2 h-2 bg-gold" />
        </span>
        <span className="text-gold-dark text-[9px] tracking-wider uppercase">Disponible</span>
      </motion.div>



      <div className="relative h-full flex items-center px-4 sm:px-6 md:px-16 max-w-[1400px] mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={`c-${current}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full relative ${current % 3 === 0 ? "flex justify-center" : current % 3 === 1 ? "flex justify-center sm:justify-start" : "flex justify-center sm:justify-end"}`}
          >
            <div className={`relative flex items-center ${
              current % 3 === 0
                ? "flex-col text-center max-w-xl sm:max-w-2xl"
                : current % 3 === 1
                  ? "flex-col items-center text-center sm:flex-row sm:items-center sm:text-left gap-6 md:gap-14"
                  : "flex-col items-center text-center sm:flex-row-reverse sm:items-center sm:text-left gap-6 md:gap-14"
            }`}>
              <div className={current % 3 === 0 ? "" : "max-w-lg sm:max-w-xl"}>
                <p className={`flex items-center gap-3 text-muted text-[10px] tracking-[0.2em] uppercase mb-3 md:mb-4 ${current % 3 === 0 ? "justify-center" : "justify-center sm:justify-start"}`}>
                  <span className="text-gold">N° {String(current + 1).padStart(2, "0")}</span>
                  <span className="w-6 h-px bg-gold/20" />
                  <span>Galería de Diseño</span>
                </p>
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-gold tracking-[-0.04em] leading-[0.92]">
                  <KineticTitle text={s?.title || ""} />
                </h1>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`block h-[2px] w-16 md:w-24 mt-4 md:mt-6 bg-gradient-to-r from-gold to-gold/0 origin-left ${current % 3 === 0 ? "mx-auto" : "mx-auto sm:mx-0"}`}
                />
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className={`text-secondary text-base sm:text-lg md:text-xl mt-3 md:mt-5 max-w-lg leading-relaxed ${current % 3 === 0 ? "mx-auto" : "mx-auto sm:mx-0"}`}
                >
                  {s?.subtitle
                    ? s.subtitle.split("imágenes").map((part, i) => (
                        <Fragment key={i}>
                          {i > 0 && (
                            <>
                              imágenes
                              <br />
                            </>
                          )}
                          {part}
                        </Fragment>
                      ))
                    : null}
                </motion.p>
              </div>
               <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.85 }}
                className={`flex flex-col sm:flex-row gap-3 md:gap-4 mt-6 md:mt-8 ${current % 3 === 0 ? "justify-center" : "justify-center shrink-0 sm:justify-start sm:mt-0"}`}
              >
                {(s?.is_video || s?.image_url?.includes('youtube.com')) ? (
                  <>
                    <Link
                      href="/#video"
                      onClick={(e) => {
                        if (window.location.pathname === "/") {
                          e.preventDefault();
                          const el = document.getElementById("video");
                          if (el) {
                            const y = el.getBoundingClientRect().top + window.scrollY - 80;
                            window.scrollTo({ top: y, behavior: "smooth" });
                          }
                        }
                      }}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm text-on-gold bg-gold hover:bg-gold-light rounded-full px-5 sm:px-7 py-2.5 sm:py-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Play size={14} className="text-on-gold" />
                      Ver Video
                    </Link>
                    <Link
                      href="/#portafolio"
                      onClick={(e) => {
                        if (window.location.pathname === "/") {
                          e.preventDefault();
                          const el = document.getElementById("portafolio");
                          if (el) {
                            const y = el.getBoundingClientRect().top + window.scrollY - 80;
                            window.scrollTo({ top: y, behavior: "smooth" });
                          }
                        }
                      }}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm text-gold-dark hover:text-gold border border-gold/25 hover:border-gold/50 rounded-full px-5 sm:px-6 py-2.5 sm:py-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Ver Portafolio
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/#portafolio"
                      onClick={(e) => {
                        if (window.location.pathname === "/") {
                          e.preventDefault();
                          const el = document.getElementById("portafolio");
                          if (el) {
                            const y = el.getBoundingClientRect().top + window.scrollY - 80;
                            window.scrollTo({ top: y, behavior: "smooth" });
                          }
                        }
                      }}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm text-on-gold bg-gold hover:bg-gold-light rounded-full px-5 sm:px-7 py-2.5 sm:py-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Ver Portafolio
                    </Link>
                    <a
                      href="https://wa.me/message/N3PW46LKUALOK1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs sm:text-sm text-gold-dark hover:text-gold border border-gold/25 hover:border-gold/50 rounded-full px-5 sm:px-6 py-2.5 sm:py-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Escríbenos
                    </a>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Marquee services strip */}
      <div className="absolute bottom-24 md:bottom-28 left-0 right-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex whitespace-nowrap"
          style={{ animation: "marquee 24s linear infinite" }}
        >
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {services.map((label) => (
                <span key={`${dup}-${label}`} className="flex items-center">
                  <span className="text-gold-dark/60 text-[11px] md:text-xs uppercase tracking-[0.3em]">{label}</span>
                  <span className="mx-6 md:mx-10 text-gold/40">*</span>
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-8 left-6 md:left-16 flex items-center gap-8">
          <span className="text-gold-dark/50 text-[10px] tracking-[0.2em] tabular-nums">
            {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="glass rounded-full w-9 h-9 flex items-center justify-center text-muted hover:text-gold transition-all hover:scale-105 active:scale-95"
              aria-label="Anterior"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={next}
              className="glass rounded-full w-9 h-9 flex items-center justify-center text-muted hover:text-gold transition-all hover:scale-105 active:scale-95"
              aria-label="Siguiente"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold/10">
        <div
          ref={progressBarRef}
          className="h-full bg-gold origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </section>
  );
}
