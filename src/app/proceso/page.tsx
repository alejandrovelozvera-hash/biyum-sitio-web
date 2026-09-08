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
              <h3 className="text-foreground font-semibold mb-2">Detalles del Briefing</h3>
              <p className="text-secondary text-[14px] leading-relaxed">Es un documento que se envía al cliente con una serie de preguntas que debe contestar con la mayor seriedad posible, sin uso de IA, sino con sus palabras. Este documento proporcionará la información adecuada para que su marca lleve el rumbo correcto. Una pregunta mal contestada podría llevar a que tu logo no tenga el rumbo correcto.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl ring-1 ring-gold/10 p-6"><p className="text-gold text-[11px] tracking-[0.14em] uppercase font-semibold mb-1">Profesional</p><p className="text-[#1C1463] font-bold text-xl">$400</p><ul className="mt-3 space-y-1.5 text-[13px] text-secondary"><li>• Diseño de Logo</li><li>• Manual de Identidad</li><li>• Concepto / Construcción, Color, Tipografía, Ubicación Relativa</li><li>• Logo color, blanco y negro</li><li>• Papelería: hoja tipo, tarjetas, carta</li><li>• Línea gráfica redes</li><li>• Animación básica (claqueta)</li></ul></div>
              <div className="bg-white rounded-2xl ring-1 ring-gold/10 p-6"><p className="text-gold text-[11px] tracking-[0.14em] uppercase font-semibold mb-1">Emprendedor Plus</p><p className="text-[#1C1463] font-bold text-xl">$250</p><ul className="mt-3 space-y-1.5 text-[13px] text-secondary"><li>• Diseño de Logo</li><li>• Manual básico</li><li>• Concepto, Color, Tipografía</li><li>• Logo color, blanco y negro</li><li>• Tarjeta + Hoja tipo</li></ul></div>
              <div className="bg-white rounded-2xl ring-1 ring-gold/10 p-6"><p className="text-gold text-[11px] tracking-[0.14em] uppercase font-semibold mb-1">Emprendedor</p><p className="text-[#1C1463] font-bold text-xl">$150</p><ul className="mt-3 space-y-1.5 text-[13px] text-secondary"><li>• Diseño de Logo</li><li>• Manual básico</li><li>• Concepto, Color, Tipografía</li><li>• Logo color, blanco y negro</li></ul></div>
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
