"use client";

import { motion, useReducedMotion } from "motion/react";
import { ChevronRight, Chat, PenTool, Calendar } from "./Icons";

const steps = [
  {
    icon: Chat,
    num: "01",
    title: "Contacto",
    desc: "Escríbenos por WhatsApp y cuéntanos sobre tu marca o proyecto. Respondemos en menos de 24 horas.",
  },
  {
    icon: PenTool,
    num: "02",
    title: "Briefing",
    desc: "Una breve encuesta nos permite conocer tu negocio, tu público y tus objetivos. Es la base de una identidad que sí conecta.",
  },
  {
    icon: Calendar,
    num: "03",
    title: "7 días laborables",
    desc: "En una semana recibes las propuestas de logotipo y branding. Iteramos juntos hasta que sea perfecto.",
  },
];

export default function BrandingProcess() {
  const reduce = useReducedMotion();
  const anim = !reduce;

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

        <div className="relative">
          <motion.div
            initial={anim ? { scaleX: 0 } : false}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="hidden md:block absolute top-[52px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-gold/15 via-gold/40 to-gold/15 origin-left"
            aria-hidden
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.num}
                  initial={anim ? { opacity: 0, y: 32 } : false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="relative bg-surface-elevated rounded-2xl md:rounded-3xl p-8 md:p-10 ring-1 ring-gold/10 hover:ring-gold/30 shadow-[0_10px_40px_-20px_rgba(28,20,99,0.18)] transition-shadow duration-500 group"
                >
                  <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-gold/0 via-gold to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="flex items-center justify-between mb-6">
                    <motion.div
                      whileHover={!reduce ? { rotate: -6, scale: 1.05 } : undefined}
                      className="w-12 h-12 flex items-center justify-center rounded-xl bg-gold/10 text-gold ring-1 ring-gold/15 transition-colors duration-500 group-hover:bg-gold group-hover:text-on-gold"
                    >
                      <Icon size={22} />
                    </motion.div>
                    <span className="text-gold/30 text-[11px] tracking-[0.2em] uppercase font-bold tabular-nums">
                      Paso {s.num}
                    </span>
                  </div>
                  <h3 className="text-gold-dark text-xl md:text-2xl font-bold tracking-tight mb-3">
                    {s.title}
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={anim ? { opacity: 0, y: 24 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 bg-surface-elevated rounded-2xl md:rounded-3xl p-8 md:p-10 ring-1 ring-gold/10 hover:ring-gold/30 transition-shadow duration-500"
        >
          <div>
            <p className="text-muted text-[10px] tracking-[0.2em] uppercase mb-2">Paquetes a medida</p>
            <h3 className="text-gold-dark text-2xl md:text-3xl font-bold tracking-tight">
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
            className="inline-flex items-center gap-2 text-sm text-on-gold bg-gold hover:bg-gold-light rounded-full px-7 py-3 font-medium transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
          >
            Ver planes de branding
            <ChevronRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}