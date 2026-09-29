"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Chat } from "./Icons";

type Msg = { role: "user" | "assistant"; content: string };

export default function AiChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "¡Hola! Soy el asistente de Biyum. Pregúntame por precios, servicios o proceso. ¿En qué te ayudo?" },
  ]);
  const [loading, setLoading] = useState(false);
  const [showWa, setShowWa] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [quickReplies, setQuickReplies] = useState<string[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef<string>("");
  const openAt = useRef<number>(0);
  const lastSendAt = useRef<number>(0);
  const hintTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Initialize sessionId once
  useEffect(() => {
    sessionId.current = Math.random().toString(36).slice(2, 8);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  // Show hint after 2.5s
  useEffect(() => {
    hintTimeout.current = setTimeout(() => setShowHint(true), 2500);
    return () => { if (hintTimeout.current) clearTimeout(hintTimeout.current); };
  }, []);

  // Hide hint when chat opens
  useEffect(() => {
    if (open) setShowHint(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const send = useCallback(async (text = input) => {
    if (!text.trim() || loading) return;
    if (text.length > 1000) return;
    const now = Date.now();
    if (now - lastSendAt.current < 900) return;
    lastSendAt.current = now;
    const userMsg: Msg = { role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    setShowWa(false);
    setQuickReplies([]);
    const placeholder: Msg = { role: "assistant", content: "" };
    setMessages((m) => [...m, placeholder]);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { Accept: "text/event-stream", "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
          sessionId: sessionId.current,
          honeypot: (document.getElementById("ai-hp") as HTMLInputElement)?.value || "",
          ts: openAt.current,
        }),
      });
      const ct = r.headers.get("content-type") || "";
      if (ct.includes("text/event-stream") && r.body) {
        const reader = r.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          for (const line of chunk.split("\n")) {
            if (!line.startsWith("data: ")) continue;
            const d = line.slice(6).trim();
            if (d === "[DONE]") break;
            try {
              const j = JSON.parse(d);
              const delta = j.choices?.[0]?.delta?.content || "";
              if (delta) {
                acc += delta;
                setMessages((m) => {
                  const copy = [...m];
                  copy[copy.length - 1] = { role: "assistant", content: acc };
                  return copy;
                });
              }
              if (j.choices?.[0]?.finish_reason) setShowWa(true);
            } catch {}
          }
        }
        if (!acc) {
          const j = await r.json().catch(() => null);
          if (j?.answer) setMessages((m) => { const c = [...m]; c[c.length - 1] = { role: "assistant", content: j.answer }; return c; });
          if (j?.quickReplies?.length) setQuickReplies(j.quickReplies);
          if (j?.escalate) setShowWa(true);
        }
      } else {
        const j = await r.json();
        setMessages((m) => { const c = [...m]; c[c.length - 1] = { role: "assistant", content: j.answer }; return c; });
        if (j.escalate) setShowWa(true);
        if (j?.quickReplies?.length) setQuickReplies(j.quickReplies);
      }
    } catch {
      setMessages((m) => { const c = [...m]; c[c.length - 1] = { role: "assistant", content: "Hubo un error. Escríbenos por WhatsApp y te ayudamos." }; return c; });
      setShowWa(true);
    }
    setLoading(false);
  }, [input, loading, messages, openAt]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {!open && (showHint || isHovering) && (
        <div className="fixed bottom-36 right-6 z-30 max-w-[220px] bg-surface-elevated border border-gold/15 rounded-2xl rounded-br-sm shadow-xl p-3 pr-8 animate-[fadeIn_0.4s_ease]">
          <button onClick={() => setShowHint(false)} aria-label="Cerrar aviso" className="absolute top-2 right-2 text-muted hover:text-gold text-xs">×</button>
          <p className="text-gold-dark text-sm font-medium leading-tight">¿Quieres algún servicio?</p>
          <p className="text-muted text-xs mt-1">Pregunta por tu servicio aquí →</p>
        </div>
      )}
      <button
        onClick={() => {
          const n = !open;
          setOpen(n);
          if (n) openAt.current = Date.now();
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        aria-label={open ? "Cerrar chat" : "Abrir chat de Biyum"}
        className="fixed bottom-20 right-6 z-30 w-14 h-14 rounded-full bg-gold text-on-gold shadow-xl flex items-center justify-center hover:bg-gold-light transition-all hover:scale-105 ring-4 ring-gold/20"
      >
        <span className="absolute inset-0 rounded-full bg-gold/30 animate-ping pointer-events-none" aria-hidden />
        <span className="relative">
          {open ? <span className="text-xl leading-none">×</span> : <Chat size={22} className="text-on-gold" />}
        </span>
      </button>
      {open && (
        <div className="fixed bottom-36 right-6 z-30 w-[92vw] max-w-[360px] h-[480px] bg-surface-elevated rounded-2xl shadow-2xl ring-1 ring-gold/10 flex flex-col overflow-hidden">
          <div className="px-4 py-3 bg-gold text-on-gold flex items-center justify-between">
            <span className="text-sm font-medium">Biyum Asistente</span>
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" aria-hidden title="Conectado" />
          </div>
          <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${m.role === "user" ? "bg-gold text-on-gold ml-auto" : "bg-surface border border-gold/10 text-gold-dark"}`}>
                {m.content}
              </div>
            ))}
            {loading && messages[messages.length - 1]?.content === "" && <div className="flex items-center gap-1 text-muted text-xs"><span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" /><span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce [animation-delay:0.15s]" /><span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce [animation-delay:0.3s]" /></div>}
            {showWa && (
              <a href="https://wa.me/message/N3PW46LKUALOK1" target="_blank" rel="noopener noreferrer" className="block text-center text-sm bg-gold text-on-gold rounded-full px-4 py-2 mt-2">
                Escríbenos por WhatsApp →
              </a>
            )}
            {quickReplies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((q) => (
                  <button key={q} onClick={() => send(q)} className="text-[11px] bg-gold/10 border border-gold/20 rounded-full px-3 py-1.5 hover:bg-gold/20 text-gold-dark">
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="p-3 border-t border-gold/10 flex gap-2">
            <input id="ai-hp" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Escribe tu pregunta…" maxLength={1000} className="flex-1 bg-surface border border-gold/15 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-gold/40" />
            <button onClick={() => send()} disabled={loading} className="bg-gold text-on-gold rounded-full px-4 py-2 text-sm disabled:opacity-50">Enviar</button>
          </div>
          <div className="px-3 pb-2 flex gap-2 flex-wrap">
            {["¿Cuánto cuesta un logo?", "¿Qué incluye social media?", "Quiero contratar video"].map((q) => (
              <button key={q} onClick={() => send(q)} className="text-[11px] bg-surface border border-gold/15 rounded-full px-3 py-1 hover:border-gold/30">
                {q}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}