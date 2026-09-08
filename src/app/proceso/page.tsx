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
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3"><span className="w-8 h-px bg-gold" /><h3 className="text-gold font-bold text-[12px] tracking-[0.16em] uppercase">Antes de diseñar — Briefing obligatorio</h3></div>
              <p className="text-foreground text-[14px] leading-relaxed font-semibold">Es un documento con preguntas que debes responder con tus propias palabras, sin IA.</p>
              <p className="text-secondary text-[13px] leading-relaxed mt-2">Nos da el concepto, tono y referencias exactas para que tu logo nazca con dirección correcta. <span className="text-foreground font-medium">Una respuesta mal contestada desvía todo el rumbo de tu marca.</span></p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="glass rounded-2xl p-6 flex flex-col ring-1 ring-gold/10"><p className="text-muted text-[11px] tracking-[0.16em] uppercase font-semibold mb-1">Emprendedor</p><p className="text-foreground font-extrabold text-2xl tracking-tight">$150</p><p className="text-muted text-[11px] mb-3">Briefing previo incluido</p><ul className="space-y-2 text-[13px] leading-relaxed text-secondary font-medium"><li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Diseño de Logo</li><li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Manual básico</li><li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Concepto, Color, Tipografía</li><li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Logo color, blanco y negro</li></ul><a href="https://wa.me/message/N3PW46LKUALOK1?text=Hola%20Biyum,%20quiero%20contratar%20el%20Paquete%20Emprendedor%20%24150" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center justify-center gap-2 text-sm font-bold text-gold bg-white ring-1 ring-gold/15 hover:bg-gold hover:text-white rounded-full px-6 py-3 transition-all">Contratar plan</a></div>
              <div className="glass rounded-2xl p-6 flex flex-col ring-1 ring-gold/20 shadow-md"><div className="flex items-center justify-between mb-1"><p className="text-gold text-[11px] tracking-[0.16em] uppercase font-bold">Emprendedor Plus</p><span className="text-[10px] font-bold tracking-[0.1em] uppercase bg-gold text-white px-2.5 py-1 rounded-full">Recomendado</span></div><p className="text-foreground font-extrabold text-2xl tracking-tight">$250</p><p className="text-muted text-[11px] mb-3">Briefing previo incluido</p><ul className="space-y-2 text-[13px] leading-relaxed text-secondary font-medium"><li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Diseño de Logo</li><li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Manual básico</li><li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Concepto, Color, Tipografía</li><li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Logo color, blanco y negro</li><li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Tarjeta + Hoja tipo</li></ul><a href="https://wa.me/message/N3PW46LKUALOK1?text=Hola%20Biyum,%20quiero%20contratar%20el%20Paquete%20Emprendedor%20Plus%20%24250" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center justify-center gap-2 text-sm font-bold text-white bg-gold hover:bg-gold-light rounded-full px-6 py-3 transition-all shadow-md">Contratar plan</a></div>
              <div className="glass rounded-2xl p-6 flex flex-col ring-1 ring-gold/10"><div className="flex items-center justify-between mb-1"><p className="text-gold text-[11px] tracking-[0.16em] uppercase font-bold">Profesional</p><span className="text-[10px] tracking-[0.12em] uppercase bg-foreground text-white font-bold px-2.5 py-1 rounded-full">Más completo</span></div><p className="text-foreground font-extrabold text-2xl tracking-tight">$400</p><p className="text-muted text-[11px] mb-3">Briefing previo incluido</p><ul className="space-y-2 text-[13px] leading-relaxed text-secondary font-medium"><li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Diseño de Logo</li><li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Manual de Identidad completo</li><li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Concepto, Construcción, Color, Tipografía, Ubicación Relativa</li><li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Logo color, blanco y negro</li><li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Papelería: hoja, tarjetas, carta</li><li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Línea gráfica redes</li><li className="flex gap-2"><span className="text-gold mt-0.5">•</span> Animación claqueta intro</li></ul><a href="https://wa.me/message/N3PW46LKUALOK1?text=Hola%20Biyum,%20quiero%20contratar%20el%20Paquete%20Profesional%20de%20Branding%20%24400" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center justify-center gap-2 text-sm font-bold text-white bg-gold hover:bg-gold-light rounded-full px-6 py-3 transition-all">Contratar plan</a></div>
            </div>
            <div className="flex justify-center pt-2">
              <a href="https://wa.me/message/N3PW46LKUALOK1?text=Hola%20Biyum,%20quiero%20mas%20informacion%20sobre%20branding" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light border border-gold/20 hover:border-gold/40 rounded-full px-7 py-3 transition-all">Pide más información</a>
            </div>
          </div>
          <div className="max-w-[1400px] mx-auto px-6 md:px-16 pb-16 flex justify-center">
            <a href="https://wa.me/message/N3PW46LKUALOK1?text=Hola%20Biyum,%20quiero%20consultar%20todos%20los%20planes%20de%20branding" target="_blank" rel="noopener noreferrer" className="hidden">.</a>
          </div>
        </div>
        <Footer />
      </div>
      <BackToTop />
    </main>
  );
}
