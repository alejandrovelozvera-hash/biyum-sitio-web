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
  const draw = (t: number) => ({ pathLength: phase >= t ? 1 : 0 });
  const exclusive = (p: number) => ({ opacity: phase === p ? 1 : 0 });

  return (
    <svg viewBox="0 0 400 280" className="w-full h-full" role="img" aria-label="Construcción de un logotipo">
      {/* ---- FASE 1 · CONTACTO: mensaje del cliente ---- */}
      <motion.g
        initial={false}
        animate={exclusive(0)}
        transition={{ duration: 0.6 }}
      >
        {/* Globo de mensaje */}
        <motion.g
          initial={{ opacity: 0, scale: 0.85, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.path
            d="M104 178 L126 178 L108 195 Z"
            fill="var(--surface)"
            stroke="var(--gold)"
            strokeWidth="1.2"
          />
          <motion.rect
            x="90"
            y="92"
            width="220"
            height="86"
            rx="22"
            fill="var(--surface)"
            stroke="var(--gold)"
            strokeWidth="1.2"
          />
        </motion.g>
        {/* Texto del mensaje */}
        <motion.text
          x="200"
          y="128"
          textAnchor="middle"
          fill="var(--gold)"
          fontSize="16"
          fontWeight="600"
          fontFamily="var(--font-sans)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          Hola,
        </motion.text>
        <motion.text
          x="200"
          y="154"
          textAnchor="middle"
          fill="var(--gold)"
          fontSize="15"
          fontFamily="var(--font-sans)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          necesito un logo
        </motion.text>
        {/* Doble check entregado */}
        <motion.path
          d="M280 165 L284 169 L291 160"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ pathLength: { duration: 0.35, delay: 0.95 } }}
        />
        <motion.path
          d="M266 165 L270 169 L277 160"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ pathLength: { duration: 0.35, delay: 1.1 } }}
        />
      </motion.g>

      {/* ---- FASE 2 · BRIEFING: documento llenándose ---- */}
      <motion.g
        initial={false}
        animate={exclusive(1)}
        transition={{ duration: 0.6 }}
      >
        <motion.g
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.rect
            x="115"
            y="72"
            width="170"
            height="136"
            rx="14"
            fill="var(--surface)"
            fillOpacity="0.35"
            stroke="var(--gold)"
            strokeWidth="1"
          />
        </motion.g>

        {/* Encabezado */}
        <motion.text
          x="200"
          y="96"
          textAnchor="middle"
          fill="var(--gold)"
          fontSize="11"
          letterSpacing="2.5"
          fontWeight="600"
          fontFamily="var(--font-sans)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          BRIEFING
        </motion.text>
        <motion.line
          x1="134"
          y1="103"
          x2="266"
          y2="103"
          stroke="var(--gold)"
          strokeWidth="0.8"
          initial={{ pathLength: 0 }}
          animate={draw(1)}
          transition={{ pathLength: { duration: 0.5, ease: "easeOut", delay: 0.35 } }}
        />

        {/* Campos que se llenan */}
        {[
          { y: 129, label: "Objetivos" },
          { y: 155, label: "Estilo y referencias" },
          { y: 181, label: "Plazo y presupuesto" },
        ].map((row, i) => (
          <motion.g
            key={row.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.45 + i * 0.45 }}
          >
            <text
              x="132"
              y={row.y}
              fill="var(--gold)"
              fontSize="11"
              fontFamily="var(--font-sans)"
            >
              {row.label}
            </text>
            <motion.line
              x1="132"
              y1={row.y + 6}
              x2="266"
              y2={row.y + 6}
              stroke="var(--gold)"
              strokeWidth="1"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ pathLength: { duration: 0.5, ease: "easeOut", delay: 0.55 + i * 0.45 } }}
            />
            {/* Cursor de escritura */}
            <motion.rect
              x={266 - 2}
              y={row.y + 3.5}
              width="2"
              height="7"
              rx="1"
              fill="var(--gold)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0, 1] }}
              transition={{ duration: 0.9, times: [0, 0.2, 0.5, 1], delay: 0.55 + i * 0.45 }}
            />
          </motion.g>
        ))}

        {/* Barra de progreso al pie del documento */}
        <motion.line
          x1="132"
          y1="194"
          x2="266"
          y2="194"
          stroke="var(--gold)"
          strokeOpacity="0.2"
          strokeWidth="2"
          strokeLinecap="round"
          initial={false}
        />
        <motion.line
          x1="132"
          y1="194"
          x2="266"
          y2="194"
          stroke="var(--gold)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ pathLength: { duration: 0.7, ease: "easeInOut", delay: 1.85 } }}
        />
      </motion.g>

      {/* ---- FASE 3 · PROPUESTA: logo minimalista final ---- */}
      <motion.g
        initial={false}
        animate={exclusive(2)}
        transition={{ duration: 0.6 }}
      >
        {/* Reticula de construccion con puntos (unida al diametro del anillo) */}
        {[142, 171, 200, 229, 258].map((x) =>
          [82, 111, 140, 169, 198].map((y) => (
            <motion.circle
              key={`g-${x}-${y}`}
              cx={x}
              cy={y}
              r="2"
              fill="var(--gold)"
              initial={false}
              animate={{ opacity: 0.15 }}
              transition={{ duration: 0.4, delay: 0.05 + (x + y) / 900 }}
            />
          ))
        )}
        {/* Anillo bold */}
        <motion.circle
          cx="200"
          cy="140"
          r="58"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={draw(2)}
          transition={{ pathLength: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 } }}
        />
        {/* Anillo exterior fino */}
        <motion.circle
          cx="200"
          cy="140"
          r="38"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1.2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        />
        {/* Punto central */}
        <motion.circle
          cx="200"
          cy="140"
          r="12"
          fill="var(--gold)"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "200px 140px" }}
        />

        {/* Shine sweep */}
        <motion.rect
          x="-80"
          y="66"
          width="70"
          height="148"
          fill="url(#shine)"
          clipPath="url(#markClip)"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 240, opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.4, ease: "easeInOut", delay: 0.6 }}
        />

        <Sparkle x={122} y={70} />
        <Sparkle x={285} y={112} size={10} />
        <Sparkle x={258} y={215} size={12} />

        {/* Sello */}
        <motion.g
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.35 }}
        >
          <motion.rect
            x="128"
            y="222"
            width="144"
            height="30"
            rx="15"
            fill="var(--gold)"
            fillOpacity="0.08"
            stroke="var(--gold)"
            strokeWidth="1.4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ duration: 0.5, delay: 1.35 }}
          />
          <motion.circle
            cx="146"
            cy="237"
            r="7"
            fill="var(--gold)"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "146px 237px" }}
          />
          <motion.path
            d="M143 237.5 L145.5 240 L150.5 234.5"
            fill="none"
            stroke="var(--on-gold)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ pathLength: { duration: 0.4, ease: "easeOut", delay: 1.55 } }}
          />
          <motion.text
            x="212"
            y="242"
            textAnchor="middle"
            fill="var(--gold)"
            fontSize="10.5"
            letterSpacing="1.6"
            fontFamily="var(--font-sans)"
            fontWeight="600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.6 }}
          >
            PROPUESTA
          </motion.text>
        </motion.g>
      </motion.g>

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