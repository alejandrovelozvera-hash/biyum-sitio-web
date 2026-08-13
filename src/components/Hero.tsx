"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "./Icons";
import { motion, AnimatePresence } from "motion/react";

interface Slide {
  image_url: string;
  title: string;
  subtitle: string;
  cta_text: string;
  cta_link: string;
}

const fallback: Slide[] = [
  {
    image_url: "https://picsum.photos/seed/biyum1/1920/1080",
    title: "Fotografía Publicitaria",
    subtitle: "Destaca tu marca con imágenes que hablan por sí solas.",
    cta_text: "Escríbenos",
    cta_link: "https://wa.me/message/N3PW46LKUALOK1",
  },
  {
    image_url: "https://picsum.photos/seed/biyum2/1920/1080",
    title: "Fotografía Gastronómica",
    subtitle: "Potencia tu menú con imágenes de alta calidad.",
    cta_text: "Escríbenos",
    cta_link: "https://wa.me/message/N3PW46LKUALOK1",
  },
  {
    image_url: "https://picsum.photos/seed/biyum3/1920/1080",
    title: "Branding & Diseño",
    subtitle: "Creamos identidades visuales que conectan con tu audiencia.",
    cta_text: "Ver Portafolio",
    cta_link: "/#portafolio",
  },
];

export default function Hero({ slides = fallback }: { slides?: Slide[] }) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next, slides.length]);

  const s = slides[current];

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-[#0A0A0A]">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          {s?.image_url && (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${s.image_url})` }}
            />
          )}
          {s?.image_url && (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/90 via-[#0A0A0A]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-[#0A0A0A]/10" />
            </>
          )}
          {!s?.image_url && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#111] to-[#0A0A0A]" />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="relative min-h-[100dvh] flex items-center px-8 max-w-[1400px] mx-auto">
        <div className="glass rounded-2xl p-8 md:p-12 max-w-2xl pt-24 md:pt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${current}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[#737373] text-sm mb-6 tracking-wide">
                Biyum &mdash; Agencia de Diseño
              </p>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.92] tracking-tighter">
                {s?.title}
              </h1>
              <p className="text-lg md:text-xl text-[#737373] mt-6 max-w-lg leading-relaxed">
                {s?.subtitle}
              </p>
              <a
                href={s?.cta_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-10 text-sm text-white hover:text-gold transition-colors group"
              >
                <span className="w-12 h-px bg-white/30 group-hover:bg-gold transition-colors" />
                {s?.cta_text}
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-10 left-8 md:left-12 flex items-center gap-6">
          <button
            onClick={prev}
            className="text-[#737373] hover:text-white transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-px transition-all duration-500 ${
                  i === current ? "w-10 bg-white" : "w-6 bg-white/20"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="text-[#737373] hover:text-white transition-colors"
            aria-label="Siguiente"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </section>
  );
}
