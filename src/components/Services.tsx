"use client";

import { motion, useReducedMotion } from "motion/react";
import { Camera, Video, Palette, Megaphone } from "./Icons";

const services = [
  { icon: Camera, title: "Fotografía", description: "Imágenes de alta calidad que potencian tu marca.", size: "large" },
  { icon: Video, title: "Producción de Video", description: "Contenido audiovisual moderno e impactante.", size: "small" },
  { icon: Palette, title: "Branding", description: "Identidad visual estratégica para tu negocio.", size: "small" },
  { icon: Megaphone, title: "Social Media", description: "Estrategias personalizadas para tus redes.", size: "large" },
];

export default function Services() {
  const reduce = useReducedMotion();

  return (
    <section id="servicios" className="py-32 md:py-40 bg-[#0A0A0A]">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="mb-20">
          <p className="text-[#525252] text-sm mb-3 tracking-wide">Servicios</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter leading-[0.95] max-w-2xl">
            Lo que hacemos
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`glass-hover rounded-2xl p-10 md:p-14 group cursor-default ${
                s.size === "large" ? "md:col-span-2" : "md:col-span-1"
              }`}
            >
              <s.icon size={24} className="text-[#525252] mb-8 group-hover:text-gold transition-colors duration-500" />
              <h3 className="text-white text-2xl font-medium mb-3 tracking-tight">
                {s.title}
              </h3>
              <p className="text-[#737373] text-sm leading-relaxed max-w-xs">
                {s.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
