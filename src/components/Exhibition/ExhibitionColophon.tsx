"use client";

import { motion } from "motion/react";
import { Mail, MapPin } from "../Icons";

export default function ExhibitionColophon() {
  return (
    <section className="min-h-dvh w-full bg-[#0A0A0A] flex items-center px-6 md:px-16 py-24">
      <div className="max-w-[1400px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass rounded-2xl md:rounded-3xl p-8 md:p-16"
        >
          <p className="text-[#525252] text-[10px] tracking-[0.2em] uppercase mb-8">
            Colofón
          </p>

          <h2 className="text-5xl md:text-8xl lg:text-9xl font-bold text-white tracking-[-0.04em] leading-[0.85] mb-16 md:mb-24">
            Biyum
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 max-w-4xl">
            <div>
              <p className="text-[#525252] text-[10px] tracking-[0.15em] uppercase mb-4">Contacto</p>
              <a
                href="mailto:biyumdis@gmail.com"
                className="flex items-center gap-2 text-[#737373] hover:text-white text-sm transition-colors"
              >
                <Mail size={14} />
                biyumdis@gmail.com
              </a>
            </div>

            <div>
              <p className="text-[#525252] text-[10px] tracking-[0.15em] uppercase mb-4">Redes</p>
              <div className="flex flex-col gap-2 text-sm">
                <a href="https://www.facebook.com/biyumec" target="_blank" rel="noopener noreferrer" className="text-[#737373] hover:text-white transition-colors">Facebook</a>
                <a href="https://www.instagram.com/biyumecu/" target="_blank" rel="noopener noreferrer" className="text-[#737373] hover:text-white transition-colors">Instagram</a>
                <a href="https://wa.me/message/N3PW46LKUALOK1" target="_blank" rel="noopener noreferrer" className="text-[#737373] hover:text-white transition-colors">WhatsApp</a>
              </div>
            </div>

            <div>
              <p className="text-[#525252] text-[10px] tracking-[0.15em] uppercase mb-4">Ubicación</p>
              <div className="flex items-start gap-2 text-[#737373] text-sm">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                <span>Riobamba, Ecuador</span>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/5 text-[#525252] text-[10px] tracking-wider">
            &copy; {new Date().getFullYear()} Biyum &mdash; Diseño, Fotografía &amp; Branding
          </div>
        </motion.div>
      </div>
    </section>
  );
}
