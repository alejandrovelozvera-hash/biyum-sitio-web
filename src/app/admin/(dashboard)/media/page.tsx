"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Trash2, Spinner, Copy } from "@/components/Icons";
import { WpMediaItem } from "@/types";

export default function AdminMediaPage() {
  const [images, setImages] = useState<WpMediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState<string | null>(null);
  const [msg, setMsg] = useState("");

  const load = useCallback(async () => {
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
  }, [page, search]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { load(); }, [load]);

  function toggleSelect(id: string | number) {
    const sid = String(id);
    setSelected((prev) => {
      const n = new Set(prev);
      if (n.has(sid)) n.delete(sid);
      else n.add(sid);
      return n;
    });
  }

  function copyLink(url: string) {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(url);
      setTimeout(() => setCopied(null), 1500);
    });
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
      setSelected((prev) => { const n = new Set(prev); n.delete(sid); return n; });
      setTotal((t) => Math.max(0, t - 1));
      setMsg("Imagen eliminada ✓");
      setTimeout(() => setMsg(""), 2000);
    } catch { setMsg("Error de conexión"); }
    finally { setDeletingIds((p) => { const n = new Set(p); n.delete(sid); return n; }); }
  }

  async function handleBulkDelete() {
    if (selected.size === 0) return;
    if (!confirm(`¿Eliminar ${selected.size} imágenes seleccionadas? No se puede deshacer.`)) return;
    const ids = Array.from(selected);
    setMsg(`Eliminando ${ids.length}...`);
    let ok = 0;
    for (const sid of ids) {
      setDeletingIds((p) => new Set(p).add(sid));
      try {
        const res = await fetch(`/api/wordpress/media?id=${sid}`, { method: "DELETE" });
        if (res.ok) {
          ok++;
          setImages((prev) => prev.filter((i) => String(i.id) !== sid));
        }
      } catch {}
      setDeletingIds((p) => { const n = new Set(p); n.delete(sid); return n; });
    }
    setSelected(new Set());
    setTotal((t) => Math.max(0, t - ok));
    setMsg(`${ok} imágenes eliminadas ✓`);
    setTimeout(() => setMsg(""), 2500);
  }

  const allSelected = images.length > 0 && images.every((img) => selected.has(String(img.id)));

  return (
    <div className="p-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">WordPress Media</h1>
          <p className="text-muted text-sm mt-1">Gestiona y elimina fotos de la biblioteca. {total} imágenes en total.</p>
        </div>
        {selected.size > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-white text-sm">{selected.size} seleccionadas</span>
            <button onClick={() => setSelected(new Set())} className="text-xs text-muted hover:text-white px-3 py-1">Limpiar</button>
            <button onClick={handleBulkDelete} className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm">
              <Trash2 size={14} /> Eliminar seleccionadas
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Buscar por nombre..." className="w-full bg-[#141414] ring-1 ring-white/5 rounded-2xl pl-10 pr-4 py-2.5 text-white text-sm placeholder:text-[#6B7280] focus:outline-none focus:border-gold/50" />
        </div>
        <label className="flex items-center gap-2 text-sm text-white cursor-pointer select-none">
          <input type="checkbox" checked={allSelected} onChange={(e) => {
            if (e.target.checked) setSelected(new Set(images.map((i) => String(i.id))));
            else setSelected(new Set());
          }} className="rounded border-white/20 bg-[#141414]" />
          Seleccionar todo en esta página
        </label>
      </div>

      {msg && <p className="text-sm text-muted mb-4">{msg}</p>}

      {loading ? (
        <div className="flex items-center justify-center py-16 text-muted"><Spinner size={20} className="mr-2" /> Cargando...</div>
      ) : images.length === 0 ? (
        <p className="text-muted text-sm py-16 text-center">{search ? "Sin resultados" : "No hay imágenes."}</p>
      ) : (
        <>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
            {images.map((img) => {
              const sid = String(img.id);
              const isSelected = selected.has(sid);
              const isDeleting = deletingIds.has(sid);
              return (
                <div key={img.id} className={`relative group aspect-square bg-[#1A1A1A] overflow-hidden border transition-all ${isSelected ? "border-gold ring-1 ring-gold/40" : "border-white/10 hover:border-white/20"}`}>
                  <img src={img.thumb} alt={img.alt || img.title} className="w-full h-full object-cover" />
                  <button
                    onClick={() => toggleSelect(img.id)}
                    className={`absolute top-1.5 left-1.5 w-5 h-5 rounded border flex items-center justify-center text-[10px] transition-all ${isSelected ? "bg-gold border-gold text-[#0A0A0A]" : "bg-black/60 border-white/20 text-white/60 hover:border-white/40"}`}
                    title={isSelected ? "Quitar de selección" : "Seleccionar"}
                  >
                    {isSelected ? "✓" : ""}
                  </button>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 p-1">
                    <p className="text-[9px] text-white/70 truncate w-full text-center px-1">{img.filename || img.title}</p>
                    <div className="flex gap-1">
                      <button onClick={() => copyLink(img.url)} className="bg-white/15 hover:bg-white/25 text-white px-2 py-1 text-[10px] flex items-center gap-1">
                        <Copy size={10} /> {copied === img.url ? "¡Copiado!" : "Link"}
                      </button>
                      <button onClick={() => handleDelete(img.id)} disabled={isDeleting} className="bg-red-500/90 hover:bg-red-500 text-white px-2 py-1 text-[10px] disabled:opacity-50">
                        {isDeleting ? "..." : <Trash2 size={10} />}
                      </button>
                    </div>
                  </div>
                  <span className="absolute bottom-1 left-1 text-[8px] bg-black/60 text-white/70 px-1">{sid}</span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center items-center gap-2 mt-8">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="text-xs text-muted hover:text-white disabled:opacity-30 px-4 py-2 bg-[#141414] ring-1 ring-white/5 rounded-2xl">Anterior</button>
            <span className="text-xs text-muted px-4 py-2">Página {page} de {Math.ceil(total / 100)} · {total} imágenes{selected.size > 0 ? ` · ${selected.size} seleccionadas` : ""}</span>
            <button onClick={() => setPage((p) => p + 1)} disabled={page >= Math.ceil(total / 100)} className="text-xs text-muted hover:text-white disabled:opacity-30 px-4 py-2 bg-[#141414] ring-1 ring-white/5 rounded-2xl">Siguiente</button>
          </div>
        </>
      )}
    </div>
  );
}
