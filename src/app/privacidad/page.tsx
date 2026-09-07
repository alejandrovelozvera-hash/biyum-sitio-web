import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Política de Privacidad | Biyum",
  description: "Cómo Biyum recopila, usa y protege tus datos personales.",
};

export default function PrivacidadPage() {
  return (
    <main className="bg-background min-h-screen">
      <Header />
      <div className="max-w-[800px] mx-auto px-6 md:px-8 pt-28 pb-16">
        <p className="text-muted text-[10px] tracking-[0.2em] uppercase mb-3">Legal</p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gold">Política de Privacidad</h1>
        <p className="text-muted text-xs mt-2">Actualizado: 4 de septiembre de 2026</p>
        <div className="mt-10 space-y-8 text-[14px] leading-relaxed text-secondary">
          <p className="text-muted text-xs bg-gold/5 ring-1 ring-gold/10 rounded-xl px-4 py-3">Este texto es informativo y no constituye asesoría legal. Adapta con tu abogado.</p>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">1. Responsable</h2>
            <p>Biyum — Riobamba, Ecuador. Contacto: WhatsApp https://wa.me/message/N3PW46LKUALOK1</p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">2. Qué datos recogemos</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Datos que nos envías por WhatsApp, formulario o chat (nombre, teléfono, mensaje).</li>
              <li>Datos técnicos: IP, navegador, páginas visitadas (analytics anónimo).</li>
              <li>No recogemos datos sensibles ni hacemos perfilado automatizado.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">3. Finalidad</h2>
            <p>Responder consultas, cotizar servicios, mejorar la web y, si aceptas, enviarte novedades. No vendemos tus datos.</p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">4. Base legal y conservación</h2>
            <p>Consentimiento y ejecución de medidas precontractuales (LOPDP Ecuador). Conservamos los datos el tiempo necesario para la finalidad y obligaciones legales, luego se eliminan o anonimizan.</p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">5. Compartición</h2>
            <p>Solo con proveedores necesarios: hosting (Vercel), WordPress (wp.biyum.agency), WhatsApp/Meta y analytics. Todos con acuerdos de confidencialidad.</p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">6. Cookies</h2>
            <p>Usamos cookies técnicas y, si aceptas, de analítica (medir visitas). Puedes rechazarlas en tu navegador. No usamos publicidad de terceros.</p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">7. Tus derechos</h2>
            <p>Puedes solicitar acceso, rectificación, eliminación y oposición escribiendo por WhatsApp. Respondemos en 15 días.</p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">8. Contacto</h2>
            <p>Para ejercer derechos o dudas: WhatsApp https://wa.me/message/N3PW46LKUALOK1</p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
