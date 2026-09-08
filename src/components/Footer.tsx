"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Mail, MapPin, Whatsapp } from "./Icons";

export default function Footer() {
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
    window.open(`https://wa.me/message/N3PW46LKUALOK1?text=${text}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };
  return (
    <footer id="contacto" className="bg-surface-elevated border-t border-border">
      <div className="w-full">
        <motion.div
          initial={anim ? { opacity: 0, y: 24 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full overflow-hidden"
        >
          <div className="w-full px-6 md:px-16 py-12 md:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-start">
              <div className="lg:col-span-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-8 h-px bg-border" />
                  <span className="text-muted text-[10px] tracking-[0.2em] uppercase">Contacto</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gold tracking-[-0.04em] leading-[0.95]">¿Tienes un proyecto en mente?</h3>
                <p className="text-secondary text-sm leading-relaxed mt-2">Hablemos y creemos algo increíble juntos. Respuesta en menos de 2 horas.</p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  <a href="mailto:biyumdis@gmail.com" className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors"><Mail size={14} /> biyumdis@gmail.com</a>
                  <span className="hidden sm:inline text-border">·</span>
                  <span className="inline-flex items-center gap-2 text-muted"><MapPin size={14} /> Riobamba, Ecuador</span>
                </div>
                <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 items-end" aria-label="Formulario de contacto">
                  <div className="sm:col-span-2 grid sm:grid-cols-2 gap-3">
                    <label htmlFor="c-name" className="sr-only">Tu nombre</label>
                    <input id="c-name" name="name" required placeholder="Tu nombre" autoComplete="name" className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-placeholder focus:outline-none focus:border-foreground/20 transition-colors" />
                    <label htmlFor="c-msg" className="sr-only">Cuéntanos tu idea</label>
                    <input id="c-msg" name="message" required placeholder="Cuéntanos tu idea..." className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-placeholder focus:outline-none focus:border-foreground/20 transition-colors" />
                  </div>
                  <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden opacity-0" />
                  <button type="submit" className={`sm:col-span-2 inline-flex items-center justify-center gap-2 text-sm rounded-full px-6 py-3 transition-all hover:scale-[1.02] active:scale-[0.98] ${sent ? "bg-gold text-on-gold" : "bg-gold hover:bg-gold-light text-on-gold"}`}>{sent ? "Enviando..." : "Enviar por WhatsApp"}</button>
                </form>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-6">
                <div>
                  <p className="text-muted text-xs tracking-widest uppercase mb-4">Navegación</p>
                  <div className="flex flex-col gap-2">
                    {[{ label: "Inicio", href: "/" }, { label: "Portafolio", href: "/#portafolio" }, { label: "Contacto", href: "/#contacto" }, { label: "Chimbuceros", href: "/chimbuceros" }].map((item) => (
                      <a key={item.label} href={item.href} className="text-secondary hover:text-foreground text-sm transition-colors">{item.label}</a>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center gap-3">
                    <img src="/logo.svg" alt="Biyum" className="logo-theme h-6 w-auto" />
                    <p className="text-muted text-xs leading-relaxed">Desde 2020<br />Diseño · Foto · Video</p>
                  </div>
                </div>
                <div>
                  <p className="text-muted text-xs tracking-widest uppercase mb-4">Servicios</p>
                  <div className="flex flex-col gap-2">
                    {[{ label: "Diseño y Logos", href: "/#portafolio" }, { label: "Videos", href: "/#video" }, { label: "Foto Gastronómica", href: "/#gastronomica" }, { label: "Ver Más Servicios", href: "/#servicios" }].map((item) => (
                      <a key={item.label} href={item.href} className="text-secondary hover:text-foreground text-sm transition-colors">{item.label}</a>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="text-muted text-xs tracking-widest uppercase mb-4">Síguenos</p>
                  <div className="flex gap-2.5">
                    <a href="https://www.facebook.com/profile.php?id=61590844183641" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-surface border border-border text-muted hover:text-foreground hover:border-foreground/20 flex items-center justify-center transition-all hover:scale-105"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg></a>
                    <a href="https://www.instagram.com/alejandro_veloz_vera/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-surface border border-border text-muted hover:text-foreground hover:border-foreground/20 flex items-center justify-center transition-all hover:scale-105"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg></a>
                    <a href="https://wa.me/message/N3PW46LKUALOK1" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-9 h-9 rounded-full bg-gold text-on-gold flex items-center justify-center shadow-sm hover:scale-105 transition-all"><Whatsapp size={14} /></a>
                  </div>
                  <div className="mt-5 rounded-2xl bg-gold text-on-gold p-4">
                    <p className="text-sm font-semibold leading-tight">¿Listo para tu proyecto?</p>
                    <a href="https://wa.me/message/N3PW46LKUALOK1" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center justify-center w-full text-sm bg-white text-[#1C1463] rounded-full px-5 py-2.5 font-semibold hover:scale-[1.02] active:scale-[0.98] transition-transform">Chatea por WhatsApp</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-6 md:px-16 py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-muted text-xs border-t border-border">
            <span className="flex flex-wrap items-center gap-2">Biyum © {new Date().getFullYear()} — Hecho con ♥ en Riobamba <span className="hidden md:inline opacity-30">·</span> <a href="/privacidad" className="hover:text-foreground underline underline-offset-4">Privacidad</a> <a href="/terminos" className="hover:text-foreground underline underline-offset-4">Términos</a></span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Disponible para nuevos proyectos</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
