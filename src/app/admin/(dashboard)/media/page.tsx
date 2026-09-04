"use client";

import { useState, useEffect } from "react";
import { Search, Trash2, Spinner } from "@/components/Icons";
import { WpMediaItem } from "@/types";

export default function AdminMediaPage() {
  const [images, setImages] = useState<WpMediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
  const [msg, setMsg] = useState("");

  useEffect(() => { load(); }, [page, search]);

  async function load() {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page) });
      if (search) params.set("search", search);
      const res = await fetch(`/api/wordpress/media?${params}`);
      const data = await res.json();
      setImages(data.items || []);
      setTotal(data.total || 0);
    } catch { setImages([]); }
    setLoading(false);
  }

  async function handleDelete(id: string | number) {
    if (!confirm("¿Eliminar esta imagen de WordPress Media? No se puede deshacer.")) return;
    const sid = String(id);
    setDeletingIds((p) => new Set(p).add(sid));
    setMsg("");
    try {
      const res = await fetch(`/api/wordpress/media?id=${sid}`, { method: "DELETE" });
      if (!res.ok) {
        const d = await res.json().catch(() => null);
        setMsg(d?.error || "No se pudo eliminar");
        return;
      }
      setImages((prev) => prev.filter((i) => String(i.id) !== sid));
      setTotal((t) => Math.max(0, t - 1));
      setMsg("Imagen eliminada ✓");
      setTimeout(() => setMsg(""), 2000);
    } catch { setMsg("Error de conexión"); }
    finally { setDeletingIds((p) => { const n = new Set(p); n.delete(sid); return n; }); }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">WordPress Media</h1>
        <p className="text-[#525252] text-sm mt-1">Gestiona y elimina fotos de la biblioteca de WordPress. {total} imágenes en total.</p>
      </div>

      <div className="relative mb-6 max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
        <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Buscar por nombre..." className="w-full bg-white/[0.03] border border-white/10 pl-10 pr-4 py-2.5 text-white text-sm placeholder:text-[#6B7280] focus:outline-none focus:border-gold/50" />
      </div>

      {msg && <p className="text-sm text-[#9CA3AF] mb-4">{msg}</p>}

      {loading ? (
        <div className="flex items-center justify-center py-16 text-[#9CA3AF]"><Spinner size={20} className="mr-2" /> Cargando...</div>
      ) : images.length === 0 ? (
        <p className="text-[#9CA3AF] text-sm py-16 text-center">{search ? "Sin resultados" : "No hay imágenes."}</p>
      ) : (
        <>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
            {images.map((img) => (
              <div key={img.id} className="relative group aspect-square bg-[#1A1A1A] overflow-hidden border border-white/10 hover:border-white/20">
                <img src={img.thumb} alt={img.alt || img.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 p-1">
                  <p className="text-[9px] text-white/70 truncate w-full text-center px-1">{img.filename || img.title}</p>
                  <button onClick={() => handleDelete(img.id)} disabled={deletingIds.has(String(img.id))} className="flex items-center gap-1 bg-red-500/90 hover:bg-red-500 text-white px-2 py-1 text-[10px] disabled:opacity-50">
                    <Trash2 size={10} /> {deletingIds.has(String(img.id)) ? "..." : "Eliminar"}
                  </button>
                </div>
                <span className="absolute bottom-1 left-1 text-[8px] bg-black/60 text-white/70 px-1">{String(img.id)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center gap-2 mt-8">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="text-xs text-[#9CA3AF] hover:text-white disabled:opacity-30 px-4 py-2 bg-white/[0.03] border border-white/10">Anterior</button>
            <span className="text-xs text-[#9CA3AF] px-4 py-2">Página {page} de {Math.ceil(total / 100)} · {total} imágenes</span>
            <button onClick={() => setPage((p) => p + 1)} disabled={page >= Math.ceil(total / 100)} className="text-xs text-[#9CA3AF] hover:text-white disabled:opacity-30 px-4 py-2 bg-white/[0.03] border border-white/10">Siguiente</button>
          </div>
        </>
      )}
    </div>
  );
}
