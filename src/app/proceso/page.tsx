import Header from "@/components/Header";
import BrandingProcess from "@/components/BrandingProcess";
import Footer from "@/components/Footer";
import AmbientGlow from "@/components/AmbientGlow";
import BackToTop from "@/components/BackToTop";

export const metadata = {
  title: "Proceso de Branding | Biyum",
  description: "Conoce el proceso de branding de Biyum: contacto, briefing y propuestas en 7 dÃ­as.",
};

export default function ProcesoPage() {
  return (
    <main className="relative bg-background">
      <AmbientGlow />
      <div className="relative z-10">
        <Header />
        <div className="pt-20">
          <BrandingProcess />
          <div className="max-w-[1400px] mx-auto px-6 md:px-16 pb-16 flex justify-center">
            <a
              href="https://wa.me/message/N3PW46LKUALOK1?text=Hola%20Biyum,%20quiero%20ver%20todos%20los%20planes%20de%20branding"
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
