"use client";

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

export default function GastronomicSection() {
  const reduce = useReducedMotion();
  const anim = !reduce;
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
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gold tracking-[-0.04em] leading-[0.92] pb-[0.12em] mb-[-0.12em]">
            Sabores que se ven
          </h2>
          <p className="text-secondary text-sm md:text-base leading-relaxed mt-5 max-w-xl">
            Cada plato cuenta una historia. Capturamos texturas, vapor y color para que tu carta provoque antojo antes del primer bocado. $15 por plato · 6 fotos desde distintas perspectivas.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-4">
          {photos.map((src, i) => {
            const span =
              i === 0
                ? "col-span-2 md:col-span-8"
                : i === 1
                ? "col-span-1 md:col-span-4"
                : i === 2
                ? "col-span-1 md:col-span-4"
                : i === 3
                ? "col-span-2 md:col-span-5"
                : i === 4
                ? "col-span-1 md:col-span-7"
                : i === 5
                ? "col-span-1 md:col-span-6"
                : i === 6
                ? "col-span-1 md:col-span-6"
                : i === 7
                ? "col-span-2 md:col-span-5"
                : "col-span-2 md:col-span-7";
            return (
              <motion.div
                key={`${src}-${i}`}
                initial={anim ? { opacity: 0, y: 16 } : false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className={`relative overflow-hidden rounded-2xl bg-surface ring-1 ring-gold/5 group aspect-[4/3] ${span}`}
              >
                <Image
                  src={src}
                  alt={`Fotografía gastronómica ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <a
            href="https://wa.me/message/N3PW46LKUALOK1?text=Hola%20Biyum,%20me%20interesa%20fotografia%20gastronomica%20$15%20por%20plato"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-on-gold bg-gold hover:bg-gold-light rounded-full px-7 py-3 font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Cotizar gastronomía
          </a>
          <span className="text-muted text-xs">Entrega en 5–7 días · Sesión en tu local</span>
        </div>
      </div>
    </section>
  );
}
