"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { ChevronRight, Chat, PenTool, Calendar } from "./Icons";

const PHASE_MS = 4600;

const phases = [
  {
    index: 0,
    icon: Chat,
    step: "01",
    title: "Contacto",
    caption: "Escríbenos por WhatsApp. Agendamos una llamada y definimos alcance, plazos y presupuesto.",
  },
  {
    index: 1,
    icon: PenTool,
    step: "02",
    title: "Briefing",
    caption: "Te enviamos una breve encuesta para conocer tu marca, tu público y tus objetivos. Con eso empezamos a bocetar.",
  },
  {
    index: 2,
    icon: Calendar,
    step: "03",
    title: "Propuestas en 7 días",
    caption: "Recibes propuestas de logotipo y branding en una semana laborable. Iteramos juntos hasta que sea perfecto.",
  },
];

function Sparkle({ x, y, size = 14 }: { x: number; y: number; size?: number }) {
  return (
    <motion.path
      d="M0 -12 C3 -3 3 -3 12 0 C3 3 3 3 0 12 C-3 3 -3 3 -12 0 C-3 -3 -3 -3 0 -12 Z"
      transform={`translate(${x} ${y}) scale(${size / 12})`}
      fill="var(--gold)"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 1, 0], scale: [0, 1.4, 1.2, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.2, times: [0, 0.2, 0.7, 1] }}
    />
  );
}

function LogoDemo({ phase }: { phase: number }) {
  const ticks = Array.from({ length: 8 });
  const draw = (t: number) => ({
    pathLength: phase >= t ? 1 : 0,
  });
  const fillOpts = (t: number) => ({
    opacity: phase >= t ? 1 : 0,
  });

  return (
    <svg viewBox="0 0 400 280" className="w-full h-full" role="img" aria-label="Construcción de un logotipo">
      {/* Construction grid (briefing) */}
      <motion.g
        initial={false}
        animate={fillOpts(1)}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <motion.line x1="200" y1="-20" x2="200" y2="300" stroke="var(--gold)" strokeWidth="0.6" opacity="0.18" />
        <motion.line x1="-20" y1="140" x2="420" y2="140" stroke="var(--gold)" strokeWidth="0.6" opacity="0.18" />
        <motion.rect
          x="131"
          y="71"
          width="138"
          height="138"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="0.8"
          opacity="0.22"
        />
        <motion.circle cx="200" cy="140" r="97" fill="none" stroke="var(--gold)" strokeWidth="0.8" opacity="0.12" />
        <motion.circle cx="200" cy="140" r="49" fill="none" stroke="var(--gold)" strokeWidth="0.8" opacity="0.16" />
        <motion.line x1="141" y1="81" x2="259" y2="81" stroke="var(--gold)" strokeWidth="0.6" opacity="0.4" />
        <motion.path d="M140 120 L200 40 L260 120 L200 200 Z" fill="none" stroke="var(--gold)" strokeWidth="0.8" opacity="0.2" />
      </motion.g>

      {/* Corner construction markers */}
      {[[143, 83], [257, 83], [143, 197], [257, 197]].map(([cx, cy], i) => (
        <motion.circle
          key={`m-${i}`}
          cx={cx}
          cy={cy}
          r="3"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1.2"
          initial={false}
          animate={fillOpts(1)}
          transition={{ duration: 0.6, delay: 0.6 }}
        />
      ))}

      {/* Sketch (contacto) */}
      <motion.circle
        cx="200"
        cy="140"
        r="76"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="1.8"
        strokeDasharray="5 7"
        initial={{ pathLength: 0 }}
        animate={draw(0)}
        transition={{ pathLength: { duration: 1.6, ease: [0.16, 1, 0.3, 1] } }}
      />
      <motion.path
        d="M166 92 C186 78 218 78 234 94"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="1.4"
        strokeDasharray="4 6"
        opacity="0.5"
        initial={{ pathLength: 0 }}
        animate={draw(0)}
        transition={{ pathLength: { duration: 1.2, ease: "easeOut", delay: 0.35 } }}
      />
      <motion.path
        d="M160 196 C180 208 220 208 240 194"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="1.4"
        strokeDasharray="4 6"
        opacity="0.5"
        initial={{ pathLength: 0 }}
        animate={draw(0)}
        transition={{ pathLength: { duration: 1.2, ease: "easeOut", delay: 0.5 } }}
      />

      {/* Dial ticks */}
      {ticks.map((_, i) => (
        <motion.line
          key={`t-${i}`}
          x1="200"
          y1="48"
          x2="200"
          y2="58"
          stroke="var(--gold)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={draw(0)}
          transition={{ pathLength: { duration: 0.5, ease: "easeOut", delay: 0.1 + i * 0.08 } }}
          transform={`rotate(${i * 45} 200 140)`}
        />
      ))}

      {/* Solid ring (briefing) */}
      <motion.circle
        cx="200"
        cy="140"
        r="58"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="1.8"
        initial={{ pathLength: 0 }}
        animate={draw(1)}
        transition={{ pathLength: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 } }}
      />

      {/* Core diamond fill (propuesta) */}
      <motion.g
        initial={false}
        animate={fillOpts(2)}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <path
          d="M200 88 L244 140 L200 192 L156 140 Z"
          fill="var(--background)"
          stroke="var(--gold)"
          strokeWidth="2"
        />
        <circle cx="200" cy="140" r="20" fill="var(--gold)" />
        <circle cx="200" cy="140" r="20" fill="none" stroke="var(--gold)" strokeWidth="2" opacity="0.4" />
      </motion.g>

      {/* Shine sweep (propuesta) */}
      <motion.defs>
        <motion.linearGradient id="shine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--gold)" stopOpacity="0" />
          <stop offset="0.5" stopColor="var(--gold)" stopOpacity="0.6" />
          <stop offset="1" stopColor="var(--gold)" stopOpacity="0" />
        </motion.linearGradient>
      </motion.defs>
      <clipPath id="markClip">
        <rect x="126" y="66" width="148" height="148" rx="4" />
      </clipPath>
      <motion.rect
        x="-80"
        y="66"
        width="70"
        height="148"
        fill="url(#shine)"
        clipPath="url(#markClip)"
        initial={{ x: -80, opacity: 0 }}
        animate={phase >= 2 ? { x: 240, opacity: [0, 1, 1, 0] } : { x: -80, opacity: 0 }}
        transition={{ duration: 1.6, ease: "easeInOut", delay: 0.5 }}
      />

      <Sparkle x={122} y={70} />
      <Sparkle x={285} y={112} size={10} />
      <Sparkle x={258} y={215} size={12} />

      {/* Entregado seal (propuesta) */}
      <motion.g
        initial={false}
        animate={fillOpts(2)}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <rect
          x="286"
          y="222"
          width="86"
          height="30"
          rx="15"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1.4"
          opacity="0.9"
        />
        <motion.path
          d="M299 238 L305 244 L318 231"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: phase >= 2 ? 1 : 0 }}
          transition={{ pathLength: { duration: 0.5, ease: "easeOut", delay: 1.1 } }}
        />
        <text
          x="308"
          y="241"
          fill="var(--gold)"
          fontSize="11"
          letterSpacing="2"
          fontFamily="var(--font-sans)"
        >
          PROPUESTA
        </text>
      </motion.g>
    </svg>
  );
}

export default function BrandingProcess() {
  const reduce = useReducedMotion();
  const anim = !reduce;
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setPhase((p) => (p + 1) % phases.length), PHASE_MS);
    return () => clearTimeout(t);
  }, [phase, reduce]);

  const current = phases[phase];

  return (
    <section id="proceso" className="py-24 md:py-32 bg-section-alt">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="mb-14">
          <motion.div
            initial={anim ? { clipPath: "inset(0 100% 0 0)" } : false}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-3">
              <span className="w-8 h-px bg-gradient-to-r from-gold/60 to-transparent" />
              <p className="text-muted text-[10px] tracking-[0.2em] uppercase">¿Cómo trabajamos?</p>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gold tracking-[-0.04em] leading-[0.92]">
              Tu marca, paso a paso
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {/* Logo demo canvas */}
          <motion.div
            initial={anim ? { opacity: 0, y: 32 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-surface-elevated rounded-2xl md:rounded-3xl ring-1 ring-gold/10 hover:ring-gold/30 transition-shadow duration-500 overflow-hidden p-2 md:p-3"
          >
            <div className="relative aspect-[400/280] md:aspect-auto md:h-[520px]">
              <LogoDemo phase={reduce ? 2 : phase} />
            </div>

            {/* Phase progress dots */}
            <div className="absolute bottom-4 right-6 flex items-center gap-3">
              {phases.map((p) => (
                <span
                  key={p.index}
                  className={`w-2 h-2 rounded-full transition-colors duration-500 ${
                    (reduce ? 2 : phase) === p.index ? "bg-gold" : "bg-gold/20"
                  }`}
                  aria-hidden
                />
              ))}
            </div>
          </motion.div>

          {/* Step caption */}
          <motion.div
            initial={anim ? { opacity: 0, y: 32 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between gap-10"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-[10px] tracking-[0.2em] uppercase text-muted">
                <motion.span
                  key={`step-${phase}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-gold tabular-nums"
                >
                  Paso {current.step}
                </motion.span>
                <span className="w-6 h-px bg-gold/20" />
                <span>{phase + 1} de 3</span>
              </div>

              <div className="flex items-center gap-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.index}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-gold/10 text-gold ring-1 ring-gold/15"
                  >
                    <current.icon size={22} />
                  </motion.div>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={`t-${current.index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="text-gold-dark text-2xl md:text-3xl font-bold tracking-tight"
                  >
                    {current.title}
                  </motion.h3>
                </AnimatePresence>
              </div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={`c-${current.index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                  className="text-secondary text-sm md:text-base leading-relaxed max-w-md"
                >
                  {current.caption}
                </motion.p>
              </AnimatePresence>

              {/* Phase step pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {phases.map((p) => {
                  const active = (reduce ? 2 : phase) === p.index;
                  const done = (reduce ? 2 : phase) > p.index;
                  return (
                    <span
                      key={p.index}
                      className={`text-[10px] tracking-[0.15em] uppercase rounded-full px-4 py-2 border transition-all duration-500 ${
                        active
                          ? "bg-gold text-on-gold border-gold"
                          : done
                            ? "text-gold-dark border-gold/25"
                            : "text-muted border-gold/15"
                      }`}
                    >
                      {p.title}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-surface-elevated rounded-2xl border border-gold/10 p-6 md:p-8">
              <div>
                <p className="text-muted text-[10px] tracking-[0.2em] uppercase mb-2">Paquetes a medida</p>
                <h3 className="text-gold-dark text-xl md:text-2xl font-bold tracking-tight">
                  Consulta nuestros planes de branding
                </h3>
                <p className="text-secondary text-sm mt-2">
                  Desde un logotipo hasta la identidad completa. Precios claros, sin sorpresas.
                </p>
              </div>
              <a
                href={`https://wa.me/message/N3PW46LKUALOK1?text=${encodeURIComponent("Hola Biyum, quiero conocer sus planes de branding")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-on-gold bg-gold hover:bg-gold-light rounded-full px-6 py-3 font-medium transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
              >
                Ver planes
                <ChevronRight size={14} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}