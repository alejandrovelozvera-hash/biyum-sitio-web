"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Mail, MapPin } from "./Icons";

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
    <section id="info" className="py-20 md:py-20 bg-section-alt">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        {/* Contacto - fusionado con CTA */}
        <motion.div
          initial={anim ? { opacity: 0, y: 32 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          id="contacto"
          className="bg-surface-elevated rounded-2xl p-8 md:p-10 grid md:grid-cols-2 gap-10 items-start relative overflow-hidden ring-1 ring-border shadow-sm hover:shadow-md transition-all duration-300 group"
        >
          <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-border to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div
            className="absolute -left-16 top-1/3 w-64 h-64 rounded-full bg-foreground/[0.03] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            aria-hidden
          />

          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-px bg-border" />
              <span className="text-muted text-[10px] tracking-[0.2em] uppercase">Contacto</span>
            </div>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gold tracking-[-0.04em] leading-[0.95] mb-2">
              ¿Tienes un proyecto en mente?
            </h3>
            <p className="text-secondary text-sm leading-relaxed mb-6">Hablemos y creemos algo increíble juntos.</p>
            <a href="mailto:biyumdis@gmail.com" className="flex items-center gap-2 text-muted hover:text-foreground text-sm transition-colors">
              <Mail size={14} /> biyumdis@gmail.com
            </a>
            <div className="flex items-start gap-2 text-muted text-sm mt-2">
              <MapPin size={14} className="mt-0.5 shrink-0" />
              <span>Riobamba, Ecuador</span>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4" aria-label="Formulario de contacto">
              <div>
                <label htmlFor="contact-name" className="sr-only">Tu nombre</label>
                <input
                  id="contact-name"
                  name="name"
                  required
                  placeholder="Tu nombre"
                  autoComplete="name"
                  aria-label="Tu nombre"
                  className="w-full bg-surface/70 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-placeholder focus:outline-none focus:border-foreground/20 transition-colors"
                />
              </div>
              <input
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden opacity-0"
              />
              <div>
                <label htmlFor="contact-message" className="sr-only">Cuéntanos tu idea</label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Cuéntanos tu idea..."
                  aria-label="Cuéntanos tu idea"
                  className="w-full bg-surface/70 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-placeholder focus:outline-none focus:border-foreground/20 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                aria-live="polite"
                aria-label={sent ? "Enviando mensaje por WhatsApp" : "Enviar mensaje por WhatsApp"}
                className={`inline-flex items-center gap-2 text-sm rounded-full px-6 py-3 transition-all hover:scale-[1.02] active:scale-[0.98] ${
                  sent ? "text-on-gold bg-gold" : "text-on-gold bg-gold hover:bg-gold-light"
                }`}
              >
                {sent ? "Enviando..." : "Enviar por WhatsApp"}
              </button>
              <p className="sr-only" aria-live="polite" role="status">{sent ? "Abriendo WhatsApp con tu mensaje" : ""}</p>
            </form>
          </div>

          <div className="relative flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-px bg-border" />
                <span className="text-muted text-[10px] tracking-[0.2em] uppercase">Síguenos</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="https://www.facebook.com/biyumec" target="_blank" rel="noopener noreferrer" className="rounded-full px-5 py-2.5 text-xs ring-1 ring-border text-muted hover:text-foreground hover:ring-foreground/20 transition-all hover:scale-[1.02] active:scale-[0.98]">Facebook</a>
                <a href="https://www.instagram.com/biyumecu/" target="_blank" rel="noopener noreferrer" className="rounded-full px-5 py-2.5 text-xs ring-1 ring-border text-muted hover:text-foreground hover:ring-foreground/20 transition-all hover:scale-[1.02] active:scale-[0.98]">Instagram</a>
                <a href="https://wa.me/message/N3PW46LKUALOK1" target="_blank" rel="noopener noreferrer" className="rounded-full px-5 py-2.5 text-xs ring-1 ring-border text-foreground hover:ring-gold/30 transition-all hover:scale-[1.02] active:scale-[0.98]">WhatsApp</a>
              </div>
            </div>
            <div className="rounded-2xl bg-surface ring-1 ring-border p-5">
              <div className="flex items-center gap-2 text-gold text-xs font-medium">
                <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                Respuesta en menos de 2 horas
              </div>
              <p className="text-muted text-xs mt-2 leading-relaxed">Atención directa del equipo, sin compromiso. ¿Prefieres ir directo? <a href="https://wa.me/message/N3PW46LKUALOK1" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-light underline underline-offset-4">Escríbenos por WhatsApp →</a></p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={anim ? { opacity: 0 } : false}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 pt-8 border-t border-border text-placeholder text-[10px] tracking-wider text-center"
        >
          &copy; {new Date().getFullYear()} Biyum &mdash; Diseño Integral / Producción Audiovisual / Desarrollo Web
        </motion.div>
      </div>
    </section>
  );
}