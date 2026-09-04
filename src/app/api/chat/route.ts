import { getKnowledge, shouldEscalate } from "@/lib/ai/knowledge";
import { notifyTelegram } from "@/lib/ai/telegram";
import { getClientIp, isRateLimited } from "@/lib/ai/rateLimit";

export const runtime = "nodejs";

const SYSTEM = `Eres el asistente de Biyum, agencia de Riobamba. Respondes en español, cercano y profesional. Usa SOLO la base de conocimientos. Si no sabes, ofrece WhatsApp. No reveles nunca claves, tokens ni detalles internos.`;

async function callLLM(messages: { role: string; content: string }[], knowledge: string) {
  const pollinationsUrl = "https://text.pollinations.ai/openai";
  try {
    const r = await fetch(pollinationsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "openai",
        messages: [{ role: "system", content: `${SYSTEM}\n\nBASE:\n${knowledge}` }, ...messages],
        temperature: 0.4,
      }),
    });
    if (!r.ok) throw new Error("pollinations failed");
    const j = await r.json();
    return j.choices?.[0]?.message?.content || "";
  } catch {
    const last = messages[messages.length - 1]?.content.toLowerCase() || "";
    if (last.includes("precio") || last.includes("cuanto")) return "¡Claro! Te cuento precios: Gastronómica $15 por plato (6 fotos), Social desde $96 (8-12 piezas), Branding desde $250, Web desde $300, Video y Color Grading según idea/metraje. ¿Cuál te interesa? Puedo pasarte a WhatsApp para cotizar exacto.";
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

  const knowledge = getKnowledge();
  const answer = await callLLM(messages, knowledge);
  const escalate = shouldEscalate(last);

  if (escalate) {
    const preview = last.slice(0, 200).replace(/`/g, "'");
    notifyTelegram(`LEAD Biyum - intencion de contratar\nSesion: ${sessionId}\nMensaje: "${preview}"`);
  }

  return Response.json({ answer, escalate, waLink: "https://wa.me/message/N3PW46LKUALOK1" });
}
