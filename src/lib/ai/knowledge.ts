import fs from "fs";
import path from "path";

const FALLBACK_KB = `
Fotografía Gastronómica — $15 por plato: Aprox. 6 fotos por plato, distintas perspectivas. Sesión en el lugar, set básico en mesa. Ideal: Restaurantes, cafés.
Producción de Video — Precio según tu idea: Grabación 4K, edición + color + audio. Entrega según proyecto. Ideal: Lanzamientos, redes.
Branding — Desde $250: 3 propuestas, Manual básico, Manual completo, Papelería esencial.
Social Media o diseño de posts para redes sociales — Planes desde $96 (8 a 12 piezas/mes): Copy + calendario, Reporte mensual. Artes individuales $15 — incluye post + historia. Pago a fin de mes según posts realizados. Ideal: Negocios locales.
Diseño Web — Desde $200 landing page, incrementa con pestañas/reservas/compras. Diseño responsive, SEO básico.
Color Grading — Precio según tu metraje: Corrección color, Look cinematográfico, requiere LOG, en Davinci Resolve.
Flujo: 1 llamada · 1 encuesta · 1 propuesta en 7 días. Contacto: biyumdis@gmail.com, Riobamba, WhatsApp https://wa.me/message/N3PW46LKUALOK1
`;

export function getKnowledge(): string {
  try {
    const p = path.join(process.cwd(), "kb", "biyum.md");
    const c = fs.readFileSync(p, "utf-8");
    if (c.length > 100) return c;
  } catch {}
  try {
    const tmp = path.join("/tmp", "kb", "biyum.md");
    const c2 = fs.readFileSync(tmp, "utf-8");
    if (c2.length > 100) return c2;
  } catch {}
  return FALLBACK_KB;
}

export function shouldEscalate(text: string): boolean {
  const t = text.toLowerCase();
  return [
    "contratar",
    "quiero",
    "precio",
    "presupuesto",
    "cotizar",
    "planes",
    "cuanto cuesta",
    "cuánto cuesta",
    "contratarte",
    "servicio",
  ].some((k) => t.includes(k));
}
