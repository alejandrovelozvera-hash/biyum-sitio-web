"use client";
import { useEffect, useState } from "react";

export default function KbEditor() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [testQ, setTestQ] = useState("¿Cuánto cuesta un diseño para post de redes sociales?");
  const [testA, setTestA] = useState("");

  const [loadErr, setLoadErr] = useState("");
  useEffect(() => {
    fetch("/api/admin/kb")
      .then(async (r) => {
        const j = await r.json();
        if (!r.ok) throw new Error(j.error || "No autorizado");
        setContent(j.content || "");
      })
      .catch((e) => setLoadErr(e.message))
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    setMsg("");
    try {
      const r = await fetch("/api/admin/kb", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content }) });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "Error");
      setMsg(j.warning ? `Guardado ✓ — ${j.warning}` : "Guardado ✓ — la IA ya usa lo nuevo");
    } catch (e: any) {
      setMsg(`Error: ${e.message}`);
    }
    setSaving(false);
    setTimeout(() => setMsg(""), 4000);
  };

  const test = async () => {
    setTestA("Probando…");
    const r = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: [{ role: "user", content: testQ }], sessionId: "test-admin" }) });
    const j = await r.json();
    setTestA(j.answer);
  };

  if (loading) return <p className="text-[#525252] text-sm">Cargando base…</p>;
  return (
    <div className="space-y-6">
      {loadErr && <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">Error al cargar: {loadErr} — Re-inicia sesión en /admin/login</p>}
      <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-4">
        <p className="text-[11px] tracking-[0.14em] uppercase text-white/40 mb-2">Contenido actual de kb/biyum.md — {content.length} caracteres</p>
        <pre className="text-xs text-white/80 whitespace-pre-wrap max-h-[160px] overflow-auto font-mono">{content.slice(0, 1200)}{content.length > 1200 ? "\n… (ver abajo para editar completo)" : ""}</pre>
      </div>
      <div>
        <label className="text-white text-sm font-medium">Editar base completa</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={20} className="w-full bg-[#111] border border-[#222] rounded-xl p-4 text-sm text-white font-mono focus:outline-none focus:border-white/20 mt-2" placeholder="Escribe aquí servicios, precios, FAQs..." />
        <div className="flex items-center gap-3 mt-3">
          <button onClick={save} disabled={saving} className="bg-white text-black rounded-full px-6 py-2 text-sm font-medium disabled:opacity-50">{saving ? "Guardando…" : "Guardar"}</button>
          {msg && <span className={`text-sm ${msg.startsWith("Error") ? "text-red-400" : "text-green-400"}`}>{msg}</span>}
        </div>
      </div>
      <div className="border-t border-[#222] pt-6">
        <h3 className="text-white font-medium mb-3">Probar pregunta</h3>
        <div className="flex gap-2">
          <input value={testQ} onChange={(e) => setTestQ(e.target.value)} className="flex-1 bg-[#111] border border-[#222] rounded-full px-4 py-2 text-sm text-white" />
          <button onClick={test} className="bg-white/10 text-white rounded-full px-5 py-2 text-sm border border-white/10">Probar</button>
        </div>
        {testA && <div className="mt-3 bg-[#111] border border-[#222] rounded-xl p-4 text-sm text-white whitespace-pre-wrap">{testA}</div>}
      </div>
    </div>
  );
}
