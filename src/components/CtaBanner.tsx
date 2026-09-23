"use client";

import { getWhatsAppUrl } from "@/lib/whatsapp";

export default function CtaBanner() {
  return (
    <section className="py-32 md:py-40 bg-[#0A0A0A]">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="glass rounded-3xl p-12 md:p-20 text-center max-w-4xl mx-auto">
          <p className="text-[#525252] text-sm mb-4 tracking-wide">Contacto</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter leading-[0.95] max-w-2xl mx-auto">
            ¿Listo para llevar tu marca al siguiente nivel?
          </h2>
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-12 text-sm text-[#737373] hover:text-white transition-colors group min-h-[44px] flex items-center justify-center"
          >
            <span className="w-12 h-px bg-white/20 group-hover:bg-white transition-colors" />
            Escríbenos
          </a>
        </div>
      </div>
    </section>
  );
}
