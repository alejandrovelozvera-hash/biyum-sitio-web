"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Camera, Video, Palette, Megaphone, Code, ChevronRight } from "./Icons";
import BrandingProcess from "./BrandingProcess";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const Food = ({ size = 20, className, ...rest }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
    <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
  </svg>
);

const services = [
  {
    kind: "food",
    title: "Fotografía Gastronómica",
    desc: "Menús que provocan antojo. Estilismo de alimentos, vapor y texturas capturadas para que tu carta venda sola.",
    deliverables: ["Aprox. 6 fotos por plato", "Distintas perspectivas", "Styling + props"],
    ideal: "Restaurantes, cafés, delivery",
    price: "$15 por plato",
    size: "small" as const,
  },
  {
    kind: "video",
    title: "Producción de Video",
    desc: "Spots, reels, documentales y cobertura de eventos. Guion, rodaje y edición listos para publicar.",
    deliverables: ["Grabación 4K", "Edición + color + audio", "Entrega 7-12 días"],
    ideal: "Lanzamientos, redes, ads",
    price: "Precio según tu idea",
    size: "small" as const,
  },
  {
    kind: "palette",
    title: "Color Grading",
    desc: "Etalonaje cinematográfico para unificar tono y emoción. Corrección primaria y secundaria con look a medida.",
    deliverables: ["Corrección de color", "Look cinematográfico", "Entrega según metraje"],
    ideal: "Videoclips, spots, documental",
    price: "Precio según tu metraje",
    size: "small" as const,
  },
  {
    kind: "branding",
    title: "Branding",
    desc: "De la idea al manual. Logotipo, paleta, tipografía y aplicaciones que hacen tu marca reconocible y coherente.",
    deliverables: ["3 propuestas", "Manual básico", "Manual completo", "Papelería esencial"],
    ideal: "Emprendimientos, rebranding",
    price: "Desde $150",
    size: "large" as const,
  },
  {
    kind: "social",
    title: "Social Media",
    desc: "Parrilla, copy y diseño para que tu feed no pare. Pauta segmentada para llegar a quien sí compra.",
    deliverables: ["8 a 12 piezas/mes", "Copy + calendario", "Reporte mensual"],
    ideal: "Negocios locales, marcas",
    price: "Desde $96",
    note: "Artes individuales $15 - incluye post + historia. Pago a fin de mes según posts realizados.",
    size: "small" as const,
  },
  {
    kind: "web",
    title: "Diseño Web",
    desc: "Landing pages y webs rápidas que cargan en menos de 2s y convierten visitas en contactos reales.",
    deliverables: ["Diseño responsive", "SEO básico", "Entrega 10-15 días"],
    ideal: "Servicios, reservas, ventas",
    price: "Desde $200",
    size: "small" as const,
  },
  {
    kind: "drone",
    title: "Servicio de Drone",
    desc: "Foto y video aéreo profesional para tu marca, evento o propiedad.",
    deliverables: ["Foto y video 4K", "Desde $40 por vuelo", "Dentro de Riobamba"],
    ideal: "Eventos, inmobiliaria, turismo",
    price: "Desde $40 por vuelo",
    size: "small" as const,
  },
];

function CameraVisual({ size, className }: any) {
  const reduce = useReducedMotion();
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <motion.circle cx="12" cy="13" r="4" animate={reduce ? undefined : { scale: [1, 0.72, 1] }} transition={{ duration: 0.45, times: [0, 0.5, 1], repeat: Infinity, repeatDelay: 2.4, ease: [0.3, 0.4, 0.4, 1] }} style={{ transformOrigin: "12px 13px" }} />
      <motion.circle cx="12" cy="13" r="4" fill="currentColor" stroke="none" opacity="0.14" animate={reduce ? undefined : { opacity: [0, 0.45, 0] }} transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 2.4, ease: "easeOut" }} />
    </svg>
  );
}

function FoodVisual({ size, className }: any) {
  const reduce = useReducedMotion();
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
      {[0, 1, 2].map((i) => (
        <motion.path key={i} d={i === 0 ? "M7 1q2 1.6 0 3.2" : i === 1 ? "M10.4 0.6q2 1.6 0 3.2" : "M13.8 1q2 1.6 0 3.2"} fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.5" animate={reduce ? undefined : { opacity: [0, 0.55, 0], y: [0, -3] }} transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 0.6, delay: i * 0.55, ease: "easeInOut" }} />
      ))}
    </svg>
  );
}

function VideoVisual({ size, className }: any) {
  const reduce = useReducedMotion();
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="8 5.5 19 12 8 18.5 8 5.5" fill="currentColor" stroke="none" />
      <motion.rect x="2" y="3.5" width="2" height="17" rx="1" fill="currentColor" stroke="none" opacity="0.25" animate={reduce ? undefined : { height: [6, 17, 6] }} transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.4, ease: "easeInOut" }} />
      <motion.rect x="20" y="3.5" width="2" height="17" rx="1" fill="currentColor" stroke="none" opacity="0.25" animate={reduce ? undefined : { height: [17, 6, 17] }} transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.4, ease: "easeInOut" }} />
    </svg>
  );
}

function BrandingVisual({ size, className }: any) {
  const reduce = useReducedMotion();
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a7 7 0 000 14 7 7 0 010-14z" />
      <motion.circle cx="12" cy="6" r="1.6" fill="currentColor" stroke="none" animate={reduce ? undefined : { cx: [12, 15, 12, 9, 12], cy: [6, 9.5, 13, 9.5, 6] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} />
    </svg>
  );
}

function SocialVisual({ size, className }: any) {
  const reduce = useReducedMotion();
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      {[0, 1, 2].map((i) => (
        <motion.path key={i} d={`M8 ${12 + i * 0.6}c${2 + i * 1.5},${-1.6 - i * 1.2} ${2 + i * 1.5},${1.6 + i * 1.2} 0,0`} fill="none" opacity="0.4" animate={reduce ? undefined : { opacity: [0, 0.5, 0], scale: [0.9, 1.15, 0.9] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.3, delay: i * 0.5, ease: "easeOut" }} style={{ transformOrigin: "8px 12px" }} />
      ))}
    </svg>
  );
}

function WebVisual({ size, className }: any) {
  const reduce = useReducedMotion();
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 6l-6 6 6 6M16 6l6 6-6 6" />
      <motion.rect x="11.5" y="5" width="1.6" height="14" rx="0.8" fill="currentColor" stroke="none" animate={reduce ? undefined : { opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }} />
    </svg>
  );
}

function DroneVisual({ size, className }: any) {
  const reduce = useReducedMotion();
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="8" r="3" />
      <path d="M6 12l-2 2M18 12l2 2M8 14l-2 3M16 14l2 3M9 8l-3-2M15 8l3-2" />
      <motion.circle cx="5" cy="10" r="1" fill="currentColor" animate={reduce ? undefined : { scale: [1, 1.4, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
      <motion.circle cx="19" cy="10" r="1" fill="currentColor" animate={reduce ? undefined : { scale: [1, 1.4, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }} />
      <motion.circle cx="7" cy="16" r="1" fill="currentColor" animate={reduce ? undefined : { scale: [1, 1.4, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }} />
      <motion.circle cx="17" cy="16" r="1" fill="currentColor" animate={reduce ? undefined : { scale: [1, 1.4, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.45 }} />
    </svg>
  );
}

function ServiceVisual({ kind, size, className }: { kind: string; size: number; className?: string }) {
  switch (kind) {
    case "camera": return <CameraVisual size={size} className={className} />;
    case "food": return <FoodVisual size={size} className={className} />;
    case "video": return <VideoVisual size={size} className={className} />;
    case "palette": return <Palette size={size} className={className} />;
    case "branding": return <BrandingVisual size={size} className={className} />;
    case "social": return <SocialVisual size={size} className={className} />;
    case "web": return <WebVisual size={size} className={className} />;
    case "drone": return <DroneVisual size={size} className={className} />;
    default: return <Camera size={size} className={className} />;
  }
}

function ServiceCard({ s, i, onBranding }: { s: (typeof services)[number]; i: number; onBranding?: () => void }) {
  const reduce = useReducedMotion();
  const isBranding = s.kind === "branding";
  const serviceKeyMap: Record<string, import("@/lib/whatsapp").ServiceKey> = {
    food: "gastronomica",
    video: "video",
    palette: "color-grading",
    branding: "branding",
    social: "social",
    web: "web",
    drone: "drone",
  };
  const waLink = getWhatsAppUrl(serviceKeyMap[s.kind] || "general");
  return (
    <motion.a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      onClick={isBranding ? (e) => { e.preventDefault(); onBranding?.(); } : undefined}
      initial={!reduce ? { opacity: 0, y: 32 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={!reduce ? { y: -4 } : undefined}
      transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={`bg-surface-elevated rounded-2xl p-7 md:p-8 group relative overflow-hidden ring-1 ring-border shadow-sm hover:shadow-md transition-all duration-300 flex flex-col ${s.size === "large" ? "md:min-h-[340px]" : "md:min-h-[320px]"}`}
    >
      <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-border to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute left-0 top-1/3 w-48 h-48 rounded-full bg-foreground/[0.03] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" aria-hidden />
      <div className="absolute right-0 bottom-0 text-[120px] text-foreground/[0.02] transition-colors duration-500 group-hover:text-foreground/[0.04]" aria-hidden style={{ transform: "translate(25%, 25%)" }}>
        <ServiceVisual kind={s.kind} size={120} />
      </div>
      <div className="relative flex flex-col flex-1">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-surface ring-1 ring-border text-muted group-hover:text-foreground transition-colors duration-500 shrink-0 mt-0.5">
            <ServiceVisual kind={s.kind} size={20} />
          </div>
          <div className="flex-1 min-w-0 glass rounded-2xl px-4 py-3 flex flex-col gap-2">
            <h3 className="text-[16px] md:text-[17px] font-semibold tracking-[-0.01em] text-foreground leading-tight break-words">{s.title}</h3>
            <span className="self-start inline-flex items-baseline gap-1 bg-white ring-1 ring-border px-3.5 py-1 rounded-full shadow-sm">
              {s.price.toLowerCase().startsWith("desde") ? (
                <>
                  <span className="text-[11px] tracking-[0.04em] font-semibold text-[#1C1463]">desde</span>
                  <span className="text-[12px] font-bold tracking-[-0.01em] text-[#1C1463]">{s.price.replace(/^Desde\s*/i, "")}</span>
                </>
              ) : (
                <span className="text-[11px] tracking-[0.04em] font-bold text-[#1C1463]">{s.price}</span>
              )}
            </span>
          </div>
        </div>
        <p className="text-secondary text-[13px] leading-relaxed">{s.desc}</p>
        <ul className="mt-4 space-y-1.5">
          {s.deliverables.map((d) => (
            <li key={d} className="flex items-center gap-2 text-[11px] text-muted">
              <span className="w-1 h-1 rounded-full bg-muted/40 shrink-0" />
              {d}
            </li>
          ))}
        </ul>
        {(s as any).note && <p className="text-[10px] leading-relaxed text-muted bg-surface ring-1 ring-border rounded-lg px-3 py-2 mt-3">{(s as any).note}</p>}
        <p className="text-[10px] tracking-[0.14em] uppercase text-muted/60 mt-3">Ideal: {s.ideal}</p>
        <div className="mt-auto pt-5 flex items-center justify-between">
          <span className="text-gold text-[11px] tracking-[0.14em] uppercase inline-flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
            {isBranding ? "Ver proceso" : "Cotizar"}
            <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-300" />
          </span>
          <span className="text-muted text-[10px]">{isBranding ? "→ Proceso" : "→ WhatsApp"}</span>
        </div>
      </div>
    </motion.a>
  );
}

export default function ServicesSection() {
  const reduce = useReducedMotion();
  const anim = !reduce;
  const [procesoOpen, setProcesoOpen] = useState(false);
  React.useEffect(() => {
    if (!procesoOpen) return;
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setProcesoOpen(false);
    document.addEventListener("keydown", onEsc);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = prev;
    };
  }, [procesoOpen]);
  return (
    <section id="servicios" className="py-20 md:py-24 bg-section-alt">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <motion.div initial={anim ? { clipPath: "inset(0 100% 0 0)" } : false} whileInView={{ clipPath: "inset(0 0% 0 0)" }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="w-8 h-px bg-gradient-to-r from-border to-transparent" />
              <p className="text-muted text-[10px] tracking-[0.2em] uppercase">Qué hacemos</p>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gold tracking-[-0.04em] leading-[0.92]">Servicios</h2>
            <motion.p initial={anim ? { opacity: 0 } : false} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} className="text-secondary text-sm md:text-base leading-relaxed mt-5 max-w-md">Todo lo que tu marca necesita para destacar: del disparo a la pantalla, de la idea a la identidad.</motion.p>
          </div>
          <motion.a initial={anim ? { opacity: 0, y: 12 } : false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }} href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-on-gold bg-gold hover:bg-gold-light rounded-full px-7 py-3 font-medium transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0">Cotizar proyecto<ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-300" /></motion.a>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {services.map((s, i) => (
            <ServiceCard key={s.title} s={s} i={i} onBranding={() => setProcesoOpen(true)} />
          ))}
        </div>
      </div>
      <AnimatePresence>
        {procesoOpen && (
          <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setProcesoOpen(false)}>
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.97, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97, y: 12 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-auto bg-white rounded-3xl shadow-2xl ring-1 ring-border flex flex-col" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-xl border-b border-border px-6 md:px-8 py-4 flex items-center justify-between">
                <div>
                  <p className="text-[#1C1463] text-[10px] tracking-[0.2em] uppercase font-bold">Proceso</p>
                  <h3 className="text-[#1C1463] text-lg font-bold tracking-tight">Tu marca, paso a paso</h3>
                </div>
                <button onClick={() => setProcesoOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-muted hover:text-foreground ring-1 ring-border shadow-sm transition-colors shrink-0" aria-label="Cerrar">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="flex-1 overflow-auto bg-surface px-6 md:px-8 py-6 space-y-6">
                <div className="bg-surface-elevated rounded-2xl ring-1 ring-border p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-px bg-[#1C1463]/30" />
                    <h4 className="text-foreground font-semibold text-[13px] tracking-[0.1em] uppercase">Antes de diseñar — Briefing obligatorio</h4>
                  </div>
                  <p className="text-foreground text-[14px] leading-relaxed font-semibold">Es un documento con preguntas que debes responder con tus propias palabras, sin IA.</p>
                  <p className="text-secondary text-[13px] leading-relaxed mt-2">Nos da el concepto, tono y referencias exactas para que tu logo nazca con dirección correcta. <span className="text-foreground font-semibold">Una respuesta mal contestada desvía todo el rumbo de tu marca.</span></p>
                </div>
                <div className="scale-[0.85] origin-top -mb-10">
                  <BrandingProcess />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-surface-elevated rounded-2xl ring-1 ring-border p-6 flex flex-col group relative overflow-hidden hover:ring-border transition-all">
                    <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-border to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <p className="text-gold text-[11px] tracking-[0.14em] uppercase font-bold mb-1 relative">Emprendedor</p>
                    <p className="text-foreground font-bold text-[22px] tracking-tight leading-none relative">$150</p>
                    <p className="text-muted text-[11px] mt-1 mb-3 relative">Briefing previo incluido</p>
                    <ul className="space-y-2 text-[13px] leading-relaxed text-secondary font-medium relative">
                      <li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Diseño de Logo</li>
                      <li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Manual básico</li>
                      <li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Concepto, Color, Tipografía</li>
                      <li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Logo color, blanco y negro</li>
                    </ul>
                    <a href={getWhatsAppUrl("branding")} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center justify-center gap-2 text-[13px] font-bold text-on-gold bg-gold hover:bg-gold-light rounded-full px-6 py-3 transition-all relative">Contratar plan</a>
                  </div>
                  <div className="bg-surface-elevated rounded-2xl ring-2 ring-gold p-6 flex flex-col shadow-md group relative overflow-hidden">
                    <span className="absolute inset-x-0 top-0 h-[2px] bg-gold/40" />
                    <div className="flex items-center justify-between mb-1 relative">
                      <p className="text-gold text-[11px] tracking-[0.14em] uppercase font-bold">Emprendedor Plus</p>
                      <span className="text-[10px] font-bold tracking-[0.1em] uppercase bg-gold text-on-gold px-2.5 py-1 rounded-full">Recomendado</span>
                    </div>
                    <p className="text-foreground font-bold text-[22px] tracking-tight leading-none relative">$250</p>
                    <p className="text-muted text-[11px] mt-1 mb-3 relative">Briefing previo incluido</p>
                    <ul className="space-y-2 text-[13px] leading-relaxed text-secondary font-medium relative">
                      <li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Diseño de Logo</li>
                      <li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Manual básico</li>
                      <li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Concepto, Color, Tipografía</li>
                      <li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Logo color, blanco y negro</li>
                      <li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Tarjeta + Hoja tipo</li>
                    </ul>
                    <a href={getWhatsAppUrl("branding")} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center justify-center gap-2 text-[13px] font-bold text-on-gold bg-gold hover:bg-gold-light rounded-full px-6 py-3 transition-all shadow-md relative">Contratar plan</a>
                  </div>
                  <div className="bg-surface-elevated rounded-2xl ring-1 ring-border p-6 flex flex-col group relative overflow-hidden hover:ring-border transition-all">
                    <div className="flex items-center justify-between mb-1 relative">
                      <p className="text-gold text-[11px] tracking-[0.14em] uppercase font-bold">Profesional</p>
                      <span className="text-[10px] tracking-[0.12em] uppercase bg-foreground text-background font-bold px-2.5 py-1 rounded-full">Más completo</span>
                    </div>
                    <p className="text-foreground font-bold text-[22px] tracking-tight leading-none relative">$400</p>
                    <p className="text-muted text-[11px] mt-1 mb-3 relative">Briefing previo incluido</p>
                    <ul className="space-y-2 text-[13px] leading-relaxed text-secondary font-medium relative">
                      <li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Diseño de Logo</li>
                      <li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Manual de Identidad completo</li>
                      <li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Concepto, Construcción, Color, Tipografía, Ubicación Relativa</li>
                      <li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Logo color, blanco y negro</li>
                      <li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Papelería: hoja, tarjetas, carta</li>
                      <li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Línea gráfica redes</li>
                      <li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Animación claqueta intro</li>
                    </ul>
                    <a href={getWhatsAppUrl("branding")} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center justify-center gap-2 text-[13px] font-bold text-on-gold bg-gold hover:bg-gold-light rounded-full px-6 py-3 transition-all relative">Contratar plan</a>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-2 pt-2 text-[11px] font-medium text-muted">
                  <span className="inline-flex items-center gap-1.5 bg-white ring-1 ring-border rounded-full px-3 py-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />7 días</span>
                  <span className="inline-flex items-center gap-1.5 bg-white ring-1 ring-border rounded-full px-3 py-1.5"><span className="w-1.5 h-1.5 rounded-full bg-gold" />2 revisiones</span>
                  <span className="inline-flex items-center gap-1.5 bg-white ring-1 ring-border rounded-full px-3 py-1.5"><span className="w-1.5 h-1.5 rounded-full bg-gold" />50% anticipo</span>
                </div>
                <div className="flex justify-center pt-2">
                  <a href={getWhatsAppUrl("branding")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light border border-gold/20 hover:border-gold/40 rounded-full px-7 py-3 transition-all">Pide más información</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
