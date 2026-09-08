import Header from "@/components/Header";
import BrandingProcess from "@/components/BrandingProcess";
import Footer from "@/components/Footer";
import AmbientGlow from "@/components/AmbientGlow";
import BackToTop from "@/components/BackToTop";

export const metadata = {
  title: "Proceso de Branding | Biyum",
  description: "Conoce el proceso de branding de Biyum: contacto, briefing y propuestas en 7 días.",
};

export default function ProcesoPage() {
  return (
    <main className="relative bg-background">
      <AmbientGlow />
      <div className="relative z-10">
        <Header />
        <div className="pt-20">
          <BrandingProcess />
          <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-8 space-y-6">
            <div className="bg-white rounded-2xl ring-1 ring-gold/15 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-2"><span className="w-6 h-px bg-gold/30" /><h3 className="text-[#1C1463] font-bold text-[13px] tracking-[0.14em] uppercase">Antes de diseñar — Briefing obligatorio</h3></div>
              <p className="text-[#16161A] text-[14px] leading-relaxed font-medium">Es un documento con preguntas que debes responder con tus propias palabras, sin IA. Una respuesta mal contestada desvía todo el rumbo de tu marca.</p>
              <p className="text-zinc-600 text-[12px] leading-relaxed mt-2">Nos da el concepto, tono y referencias exactas para que el logo nazca con dirección correcta.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl ring-1 ring-gold/15 shadow-[0_8px_30px_-12px_rgba(28,20,99,0.15)] p-6 flex flex-col"><div className="flex items-center justify-between mb-2"><p className="text-gold text-[11px] tracking-[0.16em] uppercase font-bold">Profesional</p><span className="text-[10px] tracking-[0.12em] uppercase bg-gold text-white font-bold px-2.5 py-1 rounded-full">Más completo</span></div><p className="text-[#1C1463] font-extrabold text-2xl tracking-tight">$400</p><p className="text-muted text-[11px] mb-3">Briefing previo incluido</p><ul className="space-y-2 text-[13px] leading-relaxed text-[#1A1A1A] font-medium"><li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Diseño de Logo</li><li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Manual de Identidad completo</li><li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Concepto, Construcción, Color, Tipografía, Ubicación Relativa</li><li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Logo color, blanco y negro</li><li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Papelería: hoja, tarjetas, carta</li><li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Línea gráfica redes</li><li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Animación claqueta intro</li></ul><a href="https://wa.me/message/N3PW46LKUALOK1?text=Hola%20Biyum,%20quiero%20contratar%20el%20Paquete%20Profesional%20de%20Branding%20%24400" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-gold hover:bg-gold-light rounded-full px-6 py-3 transition-all">Contratar plan</a></div>
              <div className="bg-white rounded-2xl ring-1 ring-gold/15 shadow-[0_8px_30px_-12px_rgba(28,20,99,0.15)] p-6 flex flex-col"><p className="text-gold text-[11px] tracking-[0.16em] uppercase font-bold mb-1">Emprendedor Plus</p><p className="text-[#1C1463] font-extrabold text-2xl tracking-tight">$250</p><p className="text-muted text-[11px] mb-3">Briefing previo incluido</p><ul className="space-y-2 text-[13px] leading-relaxed text-[#1A1A1A] font-medium"><li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Diseño de Logo</li><li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Manual básico</li><li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Concepto, Color, Tipografía</li><li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Logo color, blanco y negro</li><li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Tarjeta + Hoja tipo</li></ul><a href="https://wa.me/message/N3PW46LKUALOK1?text=Hola%20Biyum,%20quiero%20contratar%20el%20Paquete%20Emprendedor%20Plus%20%24250" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center justify-center gap-2 text-sm font-semibold text-gold bg-white ring-1 ring-gold/20 hover:bg-gold/5 rounded-full px-6 py-3 transition-all">Contratar plan</a></div>
              <div className="bg-white rounded-2xl ring-1 ring-gold/15 shadow-[0_8px_30px_-12px_rgba(28,20,99,0.15)] p-6 flex flex-col"><p className="text-gold text-[11px] tracking-[0.16em] uppercase font-bold mb-1">Emprendedor</p><p className="text-[#1C1463] font-extrabold text-2xl tracking-tight">$150</p><p className="text-muted text-[11px] mb-3">Briefing previo incluido</p><ul className="space-y-2 text-[13px] leading-relaxed text-[#1A1A1A] font-medium"><li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Diseño de Logo</li><li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Manual básico</li><li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Concepto, Color, Tipografía</li><li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Logo color, blanco y negro</li></ul><a href="https://wa.me/message/N3PW46LKUALOK1?text=Hola%20Biyum,%20quiero%20contratar%20el%20Paquete%20Emprendedor%20%24150" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center justify-center gap-2 text-sm font-semibold text-gold bg-white ring-1 ring-gold/20 hover:bg-gold/5 rounded-full px-6 py-3 transition-all">Contratar plan</a></div>
            </div>
          </div>
          <div className="max-w-[1400px] mx-auto px-6 md:px-16 pb-16 flex justify-center">
            <a
              href="https://wa.me/message/N3PW46LKUALOK1?text=Hola%20Biyum,%20quiero%20consultar%20todos%20los%20planes%20de%20branding"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-base text-on-gold bg-gold hover:bg-gold-light rounded-full px-8 py-4 font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Consulta todos los planes
            </a>
          </div>
        </div>
        <Footer />
      </div>
      <BackToTop />
    </main>
  );
}
