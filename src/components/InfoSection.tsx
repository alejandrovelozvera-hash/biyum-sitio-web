"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Mail, MapPin, ChevronRight } from "./Icons";
import MagneticButton from "./MagneticButton";

export default function InfoSection() {
  const reduce = useReducedMotion();
  const anim = !reduce;
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = fd.get("name");
    const message = fd.get("message");
    if (fd.get("website")) return;
    const text = encodeURIComponent(`Hola Biyum, soy ${name}.%0A${message}`);
    const url = `https://wa.me/message/N3PW46LKUALOK1?text=${text}`;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    window.open(url, "_blank");
  };

  return (
    <section id="info" className="py-24 md:py-32 bg-section-alt">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        {/* CTA ¿Tienes un proyecto en mente? */}
        <motion.a
          href="https://wa.me/message/N3PW46LKUALOK1"
          target="_blank"
          rel="noopener noreferrer"
          initial={anim ? { opacity: 0, y: 32 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          whileHover={!reduce ? { y: -6 } : undefined}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="block bg-surface-elevated rounded-2xl md:rounded-3xl p-8 md:p-10 group relative overflow-hidden ring-1 ring-gold/10 hover:ring-gold/30 shadow-[0_10px_40px_-20px_rgba(28,20,99,0.18)] transition-shadow duration-500 mb-6"
        >
          <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-gold/0 via-gold to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <span
            className="absolute -right-4 -top-10 text-[140px] leading-none font-bold text-gold/[0.05] group-hover:text-gold/[0.1] transition-colors duration-500 tabular-nums select-none"
            aria-hidden
          >
            01
          </span>

          <div
            className="absolute -left-16 top-1/3 w-64 h-64 rounded-full bg-gold/[0.05] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            aria-hidden
          />

          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-px bg-gold/25" />
                <span className="text-gold text-[10px] tracking-[0.2em] uppercase">Inicio</span>
              </div>
              <p className="text-gold-dark text-2xl md:text-4xl font-semibold tracking-tight">
                ¿Tienes un proyecto en mente?
              </p>
              <p className="text-secondary text-sm mt-2">Hablemos y creemos algo increíble juntos.</p>
            </div>
            <MagneticButton>
              <span className="inline-flex items-center gap-2 text-sm text-on-gold bg-gold group-hover:bg-gold-light hover:ring-1 hover:ring-gold/40 rounded-full px-6 py-3 transition-all hover:scale-[1.02] active:scale-[0.98]">
                Empezar proyecto
                <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-300" />
              </span>
            </MagneticButton>
          </div>
        </motion.a>

        {/* Contacto */}
        <motion.div
          initial={anim ? { opacity: 0, y: 32 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          id="contacto"
          className="bg-surface-elevated rounded-2xl md:rounded-3xl p-8 md:p-10 grid md:grid-cols-2 gap-10 relative overflow-hidden ring-1 ring-gold/10 hover:ring-gold/30 shadow-[0_10px_40px_-20px_rgba(28,20,99,0.18)] transition-shadow duration-500 group"
        >
          <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-gold/0 via-gold to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <span
            className="absolute -right-4 -top-10 text-[140px] leading-none font-bold text-gold/[0.05] group-hover:text-gold/[0.1] transition-colors duration-500 tabular-nums select-none"
            aria-hidden
          >
            02
          </span>

          <div
            className="absolute -left-16 top-1/3 w-64 h-64 rounded-full bg-gold/[0.05] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            aria-hidden
          />

          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-px bg-gold/25" />
              <span className="text-gold text-[10px] tracking-[0.2em] uppercase">Contacto</span>
            </div>
            <a href="mailto:biyumdis@gmail.com" className="flex items-center gap-2 text-gold-dark/70 hover:text-gold text-sm transition-colors">
              <Mail size={14} /> biyumdis@gmail.com
            </a>
            <div className="flex items-start gap-2 text-gold-dark/70 text-sm mt-2">
              <MapPin size={14} className="mt-0.5 shrink-0" />
              <span>Riobamba, Ecuador</span>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <input
                name="name"
                required
                placeholder="Tu nombre"
                className="w-full bg-surface/70 border border-gold/15 rounded-xl px-4 py-3 text-sm text-gold-dark placeholder:text-placeholder focus:outline-none focus:border-gold/50 transition-colors"
              />
              <input
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden opacity-0"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Tu email"
                className="w-full bg-surface/70 border border-gold/15 rounded-xl px-4 py-3 text-sm text-gold-dark placeholder:text-placeholder focus:outline-none focus:border-gold/50 transition-colors"
              />
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Cuéntanos tu idea..."
                className="w-full bg-surface/70 border border-gold/15 rounded-xl px-4 py-3 text-sm text-gold-dark placeholder:text-placeholder focus:outline-none focus:border-gold/50 transition-colors resize-none"
              />
              <button
                type="submit"
                className={`inline-flex items-center gap-2 text-sm rounded-full px-6 py-3 transition-all hover:scale-[1.02] active:scale-[0.98] ${
                  sent ? "text-on-gold bg-gold" : "text-on-gold bg-gold hover:bg-gold-light"
                }`}
              >
                {sent ? "Enviando..." : "Enviar por WhatsApp"}
              </button>
            </form>
          </div>

          <div className="relative flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-px bg-gold/25" />
                <span className="text-gold text-[10px] tracking-[0.2em] uppercase">Síguenos</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="https://www.facebook.com/biyumec" target="_blank" rel="noopener noreferrer" className="rounded-full px-5 py-2.5 text-xs ring-1 ring-gold/15 text-gold-dark/70 hover:text-gold hover:ring-gold/40 transition-all hover:scale-[1.02] active:scale-[0.98]">Facebook</a>
                <a href="https://www.instagram.com/biyumecu/" target="_blank" rel="noopener noreferrer" className="rounded-full px-5 py-2.5 text-xs ring-1 ring-gold/15 text-gold-dark/70 hover:text-gold hover:ring-gold/40 transition-all hover:scale-[1.02] active:scale-[0.98]">Instagram</a>
                <a href="https://wa.me/message/N3PW46LKUALOK1" target="_blank" rel="noopener noreferrer" className="rounded-full px-5 py-2.5 text-xs ring-1 ring-gold/15 text-gold hover:text-gold-light hover:ring-gold/40 transition-all hover:scale-[1.02] active:scale-[0.98]">WhatsApp</a>
              </div>
            </div>
            <div className="flex gap-10 mt-10 text-4xl md:text-5xl font-bold text-gold/5 tracking-[-0.04em] leading-none select-none">
              <span>BIYUM</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={anim ? { opacity: 0 } : false}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 pt-8 border-t border-gold/10 text-placeholder text-[10px] tracking-wider text-center"
        >
          &copy; {new Date().getFullYear()} Biyum &mdash; Diseño, Fotografía &amp; Branding
        </motion.div>
      </div>
    </section>
  );
}