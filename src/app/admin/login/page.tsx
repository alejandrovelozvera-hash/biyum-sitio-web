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
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <span className="text-2xl font-semibold tracking-tight text-white">Biyum</span>
          <p className="text-[#525252] text-sm mt-2">Panel de Administración</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[#525252] text-xs block mb-2">Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#141414] border border-[#1F1F1F] px-4 py-3 text-white text-sm focus:outline-none focus:border-white/20" placeholder="Ingresa la contraseña" autoFocus />
          </div>
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button type="submit" disabled={loading || !password} className="w-full flex items-center justify-center gap-2 bg-gold text-[#0A0A0A] px-6 py-3 text-sm font-medium hover:bg-gold-light transition-colors disabled:opacity-50">
            <LogIn size={16} /> {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLogin() {
  return <Suspense><LoginForm /></Suspense>;
}
