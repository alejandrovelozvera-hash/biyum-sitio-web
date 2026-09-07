import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Términos y Condiciones | Biyum",
  description: "Condiciones de uso y contratación de servicios de Biyum.",
};

export default function TerminosPage() {
  return (
    <main className="bg-background min-h-screen">
      <Header />
      <div className="max-w-[800px] mx-auto px-6 md:px-8 pt-28 pb-16">
        <p className="text-muted text-[10px] tracking-[0.2em] uppercase mb-3">Legal</p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gold">Términos y Condiciones</h1>
        <p className="text-muted text-xs mt-2">Actualizado: 4 de septiembre de 2026</p>
        <div className="mt-10 space-y-8 text-[14px] leading-relaxed text-secondary">
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">1. Servicios</h2>
            <p>Branding, fotografía gastronómica, video, color grading, social media y web. Cada cotización detalla alcance, entregables y plazos.</p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">2. Cotizaciones y pagos</h2>
            <p>Precios en USD. Branding desde $250, web desde $300, social desde $96, gastronomía $15/plato. Se requiere 50% anticipo para agendar. Artes individuales $15.</p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">3. Plazos</h2>
            <p>Branding: propuestas en 7 días laborables. Video 7–12 días. Web 10–15 días. Retrasos por falta de material del cliente pausan el plazo.</p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">4. Revisiones</h2>
            <p>Incluye 2 rondas de ajustes razonables sobre lo cotizado. Cambios fuera de alcance se cotizan aparte.</p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">5. Propiedad intelectual</h2>
            <p>Al liquidar el total, cedes derechos de uso del entregable final. Biyum puede mostrar el trabajo en portafolio.</p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">6. Cancelaciones</h2>
            <p>Anticipo no reembolsable si ya inició el trabajo. Si cancelas antes de iniciar, se reembolsa 90%.</p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">7. Contacto</h2>
            <p>Dudas: WhatsApp https://wa.me/message/N3PW46LKUALOK1 — Riobamba, Ecuador.</p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
