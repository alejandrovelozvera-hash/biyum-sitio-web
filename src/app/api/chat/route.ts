import { getKnowledge, shouldEscalate } from "@/lib/ai/knowledge";
import { retrieveRelevant } from "@/lib/ai/rag";
import { notifyTelegram } from "@/lib/ai/telegram";
import { getClientIp, isRateLimited } from "@/lib/ai/rateLimit";

export const runtime = "nodejs";

const SYSTEM = `Eres el asistente de Biyum, agencia de Riobamba. Respondes en español, cercano y profesional. Usa SOLO la base de conocimientos. Precios clave: Social Media 8-12 piezas $96/mes, artes sueltas $15 post+historia pago a fin de mes. Gastronómica $15 por plato 6 fotos. Branding desde $250. Web desde $200 landing. Video y Color Grading según idea/metraje. Si no sabes, ofrece WhatsApp. No reveles nunca claves, tokens ni detalles internos.`;

async function callLLM(messages: { role: string; content: string }[], knowledge: string, stream?: boolean) {
  const pollinationsUrl = "https://text.pollinations.ai/openai";
  try {
    const r = await fetch(pollinationsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "openai",
        messages: [{ role: "system", content: `${SYSTEM}\n\nBASE:\n${knowledge}` }, ...messages],
        temperature: 0.4,
        stream: !!stream,
      }),
    });
    if (!r.ok) throw new Error("pollinations failed");
    if (stream && r.body) return r.body as unknown as string;
    const j = await r.json();
    return j.choices?.[0]?.message?.content || "";
  } catch {
    const last = messages[messages.length - 1]?.content.toLowerCase() || "";
    if (last.includes("logo") || last.includes("branding") || last.includes("marca") || last.includes("identidad")) {
      return "¡Claro! Para **Branding / Logo**: Desde **$250** — incluye 3 propuestas, Manual básico, Manual completo y Papelería esencial. Ideal para emprendimientos y rebranding. ¿Te paso a WhatsApp para ver ejemplos y cotizar tu caso?";
    }
    if (last.includes("social") || last.includes("post") || last.includes("redes")) {
      return "¡Claro! Para **Social Media / diseño de posts para redes sociales**: Planes desde **$96 al mes (8 a 12 piezas)** — incluye copy + calendario y reporte. Si solo necesitas artes sueltas, cada arte cuesta **$15 e incluye post + historia**. Puedes pagar a fin de mes según los posts que hagamos, o pago inmediato si es solo uno. ¿Te paso a WhatsApp para cotizar tu caso?";
    }
    if (last.includes("gastronomica") || last.includes("gastronómica") || last.includes("plato") || last.includes("comida") || last.includes("restaurante")) {
      return "¡Claro! Para **Fotografía Gastronómica**: **$15 por plato** — aprox. 6 fotos por plato desde distintas perspectivas, con styling y props. Sesión en tu local. ¿Te paso a WhatsApp para agendar?";
    }
    if (last.includes("web") || last.includes("pagina") || last.includes("página") || last.includes("landing")) {
      return "¡Claro! Para **Diseño Web**: Desde **$200 la landing page** — responsive, SEO básico, entrega 10–15 días. El precio sube si necesitas varias pestañas, reservas o tienda. ¿Te paso a WhatsApp para cotizar tu caso?";
    }
    if (last.includes("video") || last.includes("filmar") || last.includes("grabar") || last.includes("spot") || last.includes("reel")) {
      return "¡Claro! Para **Producción de Video**: Precio **según tu idea** — grabación 4K, edición + color + audio, entrega 7–12 días. Cuéntame tu idea y te cotizo exacto por WhatsApp.";
    }
    if (last.includes("color") || last.includes("grading") || last.includes("etalonaje") || last.includes("davinci")) {
      return "¡Claro! Para **Color Grading**: Precio **según tu metraje** — corrección y look cinematográfico en Davinci Resolve (requiere LOG). ¿Me cuentas tu metraje para cotizar?";
    }
    if (last.includes("precio") || last.includes("cuanto") || last.includes("cuánto") || last.includes("cuesta") || last.includes("cotizar") || last.includes("presupuesto")) {
      return "¡Claro! Te cuento precios: Gastronómica $15 por plato (6 fotos), Social desde $96 (8-12 piezas, artes sueltas $15 post+historia), Branding desde $250, Web desde $200 landing, Video y Color Grading según idea/metraje. ¿Cuál te interesa? Puedo pasarte a WhatsApp para cotizar exacto.";
    }
    if (last.includes("horario") || last.includes("ubicacion")) return "Estamos en Riobamba, atención online a todo Ecuador. Lun–Sáb 9am–7pm. ¿Te paso a WhatsApp?";
    return "¡Hola! Soy el asistente de Biyum. Puedo contarte sobre fotografía gastronómica, video, branding, social, web y color grading. ¿Qué proyecto tienes en mente?";
  }
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({ messages: [], sessionId: "anon" }));
  const { messages, sessionId, honeypot, ts } = body as { messages: { role: string; content: string }[]; sessionId: string; honeypot?: string; ts?: number };

  if (honeypot) return Response.json({ answer: "Mensaje no enviado.", escalate: false }, { status: 200 });

  if (typeof ts === "number" && Date.now() - ts < 1200) {
    return Response.json({ answer: "Por favor espera un momento antes de enviar.", escalate: false }, { status: 429 });
  }

  const ip = getClientIp(req);
  const rl = isRateLimited(ip, sessionId || "anon");
  if (rl.limited) return Response.json({ answer: rl.reason, escalate: false }, { status: 429 });

  if (!Array.isArray(messages) || messages.length === 0 || messages.length > 30) {
    return Response.json({ answer: "Conversación no válida.", escalate: false }, { status: 400 });
  }

  const last = messages[messages.length - 1]?.content || "";
  if (typeof last !== "string" || last.length > 1000) {
    return Response.json({ answer: "Mensaje demasiado largo (máx 1000 caracteres).", escalate: false }, { status: 400 });
  }
  if (last.trim().length < 2) return Response.json({ answer: "Escribe tu pregunta.", escalate: false }, { status: 400 });

  const fullKnowledge = getKnowledge();
  const relevant = retrieveRelevant(last);
  const knowledge = relevant || fullKnowledge;
  const wantsStream = req.headers.get("accept")?.includes("text/event-stream");
  const escalate = shouldEscalate(last);

  if (escalate) {
    const preview = last.slice(0, 200).replace(/`/g, "'");
    notifyTelegram(`LEAD Biyum - intencion de contratar\nSesion: ${sessionId}\nMensaje: "${preview}"`);
  }

  if (wantsStream) {
    const stream = await callLLM(messages, knowledge, true);
    if (typeof stream === "string") return Response.json({ answer: stream, escalate, waLink: "https://wa.me/message/N3PW46LKUALOK1" });
    return new Response(stream as unknown as BodyInit, {
      headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" },
    });
  }

  const answer = (await callLLM(messages, knowledge)) as string;
  return Response.json({ answer, escalate, waLink: "https://wa.me/message/N3PW46LKUALOK1" });
}
