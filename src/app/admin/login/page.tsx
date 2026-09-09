"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LogIn } from "@/components/Icons";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("logout") === "true") {
      fetch("/api/auth/logout", { method: "POST" }).then(() =>
        router.replace("/admin/login")
      );
    }
  }, [searchParams, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    if (res.ok) { router.push("/admin"); }
    else { const data = await res.json(); setError(data.error || "Contraseña incorrecta"); }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0F0F0F] to-[#141414] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="w-full max-w-sm relative">
        <div className="text-center mb-10">
          <div className="inline-flex items-baseline gap-2">
            <span className="text-[28px] font-bold tracking-[-0.03em] text-white">Biyum</span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-gold">Studio</span>
          </div>
          <p className="text-[#525252] text-sm mt-2">Panel de Administración</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-[#141414] ring-1 ring-white/5 rounded-2xl p-8 space-y-5 shadow-2xl">
          <div>
            <label className="text-muted text-xs block mb-2 tracking-wide">Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#0A0A0A] ring-1 ring-white/5 rounded-2xl px-4 py-3 text-white text-sm placeholder:text-muted focus:outline-none focus:ring-white/20" placeholder="Ingresa la contraseña" autoFocus />
          </div>
          {error && <p className="text-red-400 text-xs bg-red-500/10 ring-1 ring-red-500/20 rounded-xl px-3 py-2">{error}</p>}
          <button type="submit" disabled={loading || !password} className="w-full flex items-center justify-center gap-2 bg-gold text-on-gold px-6 py-3.5 rounded-2xl text-sm font-medium hover:bg-gold-light transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 shadow-lg">
            <LogIn size={16} /> {loading ? "Ingresando..." : "Ingresar"}
          </button>
          <p className="text-center text-muted text-[11px]">Acceso restringido · Biyum Studio</p>
        </form>
      </div>
    </div>
  );
}

export default function AdminLogin() {
  return <Suspense><LoginForm /></Suspense>;
}
