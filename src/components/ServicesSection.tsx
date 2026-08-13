"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Camera, Video, Palette, Megaphone, Code, ChevronRight } from "./Icons";

const Food = ({ size = 20, className, ...rest }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
    <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
  </svg>
);

const services = [
  { kind: "camera", title: "Fotografía Publicitaria", desc: "Imágenes profesionales que potencian tu marca y comunican tu mensaje con impacto visual.", size: "large" as const },
  { kind: "food", title: "Fotografía Gastronómica", desc: "Deliciosas imágenes que despiertan los sentidos y abren el apetito.", size: "small" as const },
  { kind: "video", title: "Producción de Video", desc: "Contenido audiovisual moderno: spots, documentales y material para redes.", size: "small" as const },
  { kind: "branding", title: "Branding", desc: "Identidad visual estratégica: logotipo, papelería, manual de marca y más.", size: "large" as const },
  { kind: "social", title: "Social Media", desc: "Estrategias de contenido, diseño gráfico y pauta digital para tus redes.", size: "small" as const },
  { kind: "web", title: "Diseño Web", desc: "Sitios web modernos, tiendas online y experiencias digitales a medida.", size: "small" as const },
];

function CameraVisual({ size, className }: any) {
  const reduce = useReducedMotion();
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <motion.circle
        cx="12"
        cy="13"
        r="4"
        animate={reduce ? undefined : { scale: [1, 0.72, 1] }}
        transition={{ duration: 0.45, times: [0, 0.5, 1], repeat: Infinity, repeatDelay: 2.4, ease: [0.3, 0.4, 0.4, 1] }}
        style={{ transformOrigin: "12px 13px" }}
      />
      <motion.circle
        cx="12"
        cy="13"
        r="4"
        fill="currentColor"
        stroke="none"
        opacity="0.14"
        animate={reduce ? undefined : { opacity: [0, 0.45, 0] }}
        transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 2.4, ease: "easeOut" }}
      />
    </svg>
  );
}

function FoodVisual({ size, className }: any) {
  const reduce = useReducedMotion();
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
      {[0, 1, 2].map((i) => (
        <motion.path
          key={i}
          d={i === 0 ? "M7 1q2 1.6 0 3.2" : i === 1 ? "M10.4 0.6q2 1.6 0 3.2" : "M13.8 1q2 1.6 0 3.2"}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.5"
          animate={reduce ? undefined : { opacity: [0, 0.55, 0], y: [0, -3] }}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 0.6, delay: i * 0.55, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}

function VideoVisual({ size, className }: any) {
  const reduce = useReducedMotion();
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="8 5.5 19 12 8 18.5 8 5.5" fill="currentColor" stroke="none" />
      <motion.rect
        x="2"
        y="3.5"
        width="2"
        height="17"
        rx="1"
        fill="currentColor"
        stroke="none"
        opacity="0.25"
        animate={reduce ? undefined : { height: [6, 17, 6] }}
        transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.4, ease: "easeInOut" }}
      />
      <motion.rect
        x="20"
        y="3.5"
        width="2"
        height="17"
        rx="1"
        fill="currentColor"
        stroke="none"
        opacity="0.25"
        animate={reduce ? undefined : { height: [17, 6, 17] }}
        transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.4, ease: "easeInOut" }}
      />
    </svg>
  );
}

function BrandingVisual({ size, className }: any) {
  const reduce = useReducedMotion();
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a7 7 0 000 14 7 7 0 010-14z" />
      <motion.circle
        cx="12"
        cy="6"
        r="1.6"
        fill="currentColor"
        stroke="none"
        animate={reduce ? undefined : { cx: [12, 15, 12, 9, 12], cy: [6, 9.5, 13, 9.5, 6] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function SocialVisual({ size, className }: any) {
  const reduce = useReducedMotion();
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      {[0, 1, 2].map((i) => (
        <motion.path
          key={i}
          d={`M8 ${12 + i * 0.6}c${2 + i * 1.5},${-1.6 - i * 1.2} ${2 + i * 1.5},${1.6 + i * 1.2} 0,0`}
          fill="none"
          opacity="0.4"
          animate={reduce ? undefined : { opacity: [0, 0.5, 0], scale: [0.9, 1.15, 0.9] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.3, delay: i * 0.5, ease: "easeOut" }}
          style={{ transformOrigin: "8px 12px" }}
        />
      ))}
    </svg>
  );
}

function WebVisual({ size, className }: any) {
  const reduce = useReducedMotion();
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 6l-6 6 6 6M16 6l6 6-6 6" />
      <motion.rect
        x="11.5"
        y="5"
        width="1.6"
        height="14"
        rx="0.8"
        fill="currentColor"
        stroke="none"
        animate={reduce ? undefined : { opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      />
    </svg>
  );
}

function ServiceVisual({ kind, size, className }: { kind: string; size: number; className?: string }) {
  switch (kind) {
    case "camera": return <CameraVisual size={size} className={className} />;
    case "food": return <FoodVisual size={size} className={className} />;
    case "video": return <VideoVisual size={size} className={className} />;
    case "branding": return <BrandingVisual size={size} className={className} />;
    case "social": return <SocialVisual size={size} className={className} />;
    case "web": return <WebVisual size={size} className={className} />;
    default: return <Camera size={size} className={className} />;
  }
}

function ServiceCard({ s, i }: { s: (typeof services)[number]; i: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const iconY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const iconRotate = useTransform(scrollYProgress, [0, 1], [0, -8]);

  const waLink = `https://wa.me/message/N3PW46LKUALOK1?text=${encodeURIComponent(`Hola Biyum, me interesa el servicio de ${s.title}.`)}`;

  return (
    <motion.a
      ref={ref}
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      initial={!reduce ? { opacity: 0, y: 32 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={!reduce ? { y: -6 } : undefined}
      transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={`bg-surface-elevated rounded-2xl md:rounded-3xl p-8 md:p-10 group relative overflow-hidden ring-1 ring-gold/10 hover:ring-gold/30 shadow-[0_10px_40px_-20px_rgba(28,20,99,0.18)] transition-shadow duration-500 ${s.size === "large" ? "md:col-span-2" : "md:col-span-1"}`}
    >
      <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-gold/0 via-gold to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <span
        className="absolute -right-2 -top-8 text-[140px] leading-none font-bold text-gold/[0.05] group-hover:text-gold/[0.1] transition-colors duration-500 tabular-nums select-none"
        aria-hidden
      >
        {String(i + 1).padStart(2, "0")}
      </span>

      <div
        className="absolute -left-16 top-1/3 w-64 h-64 rounded-full bg-gold/[0.05] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        aria-hidden
      />

      <motion.div
        style={{ y: iconY, rotate: iconRotate }}
        className="absolute -right-6 -bottom-8 text-[160px] text-gold/[0.05] transition-colors duration-500 group-hover:text-gold/[0.12]"
        aria-hidden
      >
        <ServiceVisual kind={s.kind} size={160} />
      </motion.div>

      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="w-8 h-px bg-gold/25" />
            <span className="text-gold text-[10px] tracking-[0.2em] uppercase">{s.title}</span>
          </div>
          <motion.span
            initial={!reduce ? { opacity: 0, x: 12 } : false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 + i * 0.06 }}
            className="text-gold text-[10px] tracking-[0.15em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 inline-flex items-center gap-1.5 md:inline-flex hidden"
          >
            Cotizar
            <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-300" />
          </motion.span>
        </div>

        <div className="w-12 h-12 flex items-center justify-center mb-6 text-gold/70 group-hover:text-gold transition-colors duration-500">
          <ServiceVisual kind={s.kind} size={22} />
        </div>

        <motion.p
          initial={!reduce ? { opacity: 0 } : false}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 + i * 0.06 }}
          className="text-secondary text-sm leading-relaxed max-w-md mt-6"
        >
          {s.desc}
        </motion.p>
      </div>
    </motion.a>
  );
}

export default function ServicesSection() {
  const reduce = useReducedMotion();
  const anim = !reduce;

  return (
    <section id="servicios" className="py-24 md:py-32 bg-section-alt">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <motion.div
          initial={anim ? { clipPath: "inset(0 100% 0 0)" } : false}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="w-8 h-px bg-gradient-to-r from-gold/60 to-transparent" />
              <p className="text-muted text-[10px] tracking-[0.2em] uppercase">Servicios</p>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gold tracking-[-0.04em] leading-[0.92] overflow-hidden">
              <motion.span
                initial={anim ? { y: "110%" } : false}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block pb-[0.18em] mb-[-0.18em]"
              >
                Qué ofrecemos
              </motion.span>
            </h2>
            <motion.p
              initial={anim ? { opacity: 0 } : false}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-secondary text-sm md:text-base leading-relaxed mt-5 max-w-md"
            >
              Todo lo que tu marca necesita para destacar: del disparo a la pantalla, de la idea a la identidad.
            </motion.p>
          </div>
          <motion.a
            initial={anim ? { opacity: 0, y: 12 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            href="https://wa.me/message/N3PW46LKUALOK1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-on-gold bg-gold hover:bg-gold-light rounded-full px-7 py-3 font-medium transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
          >
            Cotizar un proyecto
            <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-300" />
          </motion.a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {services.map((s, i) => (
            <ServiceCard key={s.title} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}