"use client";
import { useState, useRef, useEffect } from "react";
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
  const listRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef(Math.random().toString(36).slice(2, 8));

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 2500);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (open) setShowHint(false);
  }, [open]);

  const send = async (text = input) => {
    if (!text.trim() || loading) return;
    const userMsg: Msg = { role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })), sessionId: sessionId.current }),
      });
      const j = await r.json();
      setMessages((m) => [...m, { role: "assistant", content: j.answer }]);
      if (j.escalate) setShowWa(true);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "Hubo un error. Escríbenos directo por WhatsApp y te ayudamos." }]);
      setShowWa(true);
    }
    setLoading(false);
  };

  return (
    <>
      {!open && showHint && (
        <div className="fixed bottom-6 right-20 z-50 max-w-[220px] bg-surface-elevated border border-gold/15 rounded-2xl rounded-br-sm shadow-xl p-3 pr-8 animate-[fadeIn_0.4s_ease]">
          <button onClick={() => setShowHint(false)} aria-label="Cerrar aviso" className="absolute top-2 right-2 text-muted hover:text-gold text-xs">×</button>
          <p className="text-gold-dark text-sm font-medium leading-tight">¿Quieres algún servicio?</p>
          <p className="text-muted text-xs mt-1">Pregunta por tu servicio aquí →</p>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Cerrar chat" : "Abrir chat de Biyum"}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gold text-on-gold shadow-xl flex items-center justify-center hover:bg-gold-light transition-all hover:scale-105 ring-4 ring-gold/20"
      >
        <span className="absolute inset-0 rounded-full bg-gold/30 animate-ping pointer-events-none" aria-hidden />
        <span className="relative">
          {open ? <span className="text-xl leading-none">×</span> : <Chat size={22} className="text-on-gold" />}
        </span>
      </button>
      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-[92vw] max-w-[360px] h-[480px] bg-surface-elevated rounded-2xl shadow-2xl ring-1 ring-gold/10 flex flex-col overflow-hidden">
          <div className="px-4 py-3 bg-gold text-on-gold flex items-center justify-between">
            <span className="text-sm font-medium">Biyum Asistente</span>
            <span className="text-[10px] opacity-80">Entrenable · kb/biyum.md</span>
          </div>
          <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${m.role === "user" ? "bg-gold text-on-gold ml-auto" : "bg-surface border border-gold/10 text-gold-dark"}`}>
                {m.content}
              </div>
            ))}
            {loading && <div className="text-xs text-muted">Escribiendo…</div>}
            {showWa && (
              <a href="https://wa.me/message/N3PW46LKUALOK1" target="_blank" rel="noopener noreferrer" className="block text-center text-sm bg-gold text-on-gold rounded-full px-4 py-2 mt-2">
                Continuar por WhatsApp →
              </a>
            )}
          </div>
          <div className="p-3 border-t border-gold/10 flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Escribe tu pregunta…" className="flex-1 bg-surface border border-gold/15 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-gold/40" />
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
