"use client";

import { useState, useEffect, useRef } from "react";
import { WpMediaItem } from "@/types";
import { Search, X, Spinner, Upload, Copy } from "../Icons";

interface Props {
  selected: (WpMediaItem & { isCover?: boolean })[];
  onSelect: (images: (WpMediaItem & { isCover?: boolean })[]) => void;
  maxImages?: number;
}

export default function ImageSelector({ selected, onSelect, maxImages = 50 }: Props) {
  const [images, setImages] = useState<WpMediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { loadImages(); }, [page, search]);

  async function loadImages() {
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

  async function handleUpload(file: File) {
    if (!file.type.startsWith("image/")) { setUploadError("Solo imágenes (JPG, PNG, etc.)"); return; }
    setUploading(true);
    setUploadError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/wordpress/media", { method: "POST", body: fd });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setUploadError(data?.error || "Error al subir");
        return;
      }
      const item: WpMediaItem = await res.json();
      onSelect([...selected, { ...item, isCover: selected.length === 0 }]);
      setPage(1);
      await loadImages();
    } catch {
      setUploadError("Error de conexión al subir");
    } finally {
      setUploading(false);
    }
  }

  function toggleImage(img: WpMediaItem) {
    const exists = selected.find((s) => s.id === img.id);
    if (exists) {
      onSelect(selected.filter((s) => s.id !== img.id));
    } else {
      if (selected.length >= maxImages) return;
      onSelect([...selected, { ...img, isCover: selected.length === 0 }]);
    }
  }

  function copyLink(url: string) {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(url);
      setTimeout(() => setCopied(null), 1500);
    });
  }

  function reorder(from: number, to: number) {
    if (to < 0 || to >= selected.length) return;
    const next = [...selected];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onSelect(next);
  }

  return (
    <div className="space-y-6">
      {selected.length > 0 && (
        <div>
          <p className="text-[#9CA3AF] text-xs mb-2">
            Seleccionadas ({selected.length})
            {selected.find((s) => s.isCover) ? " — la destacada será la portada" : " — marca una como portada"}
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {selected.map((img, i) => (
              <div
                key={img.id}
                draggable
                onDragStart={() => setDragIndex(i)}
                onDragOver={(e) => { e.preventDefault(); }}
                onDrop={() => { if (dragIndex !== null && dragIndex !== i) reorder(dragIndex, i); setDragIndex(null); }}
                onDragEnd={() => setDragIndex(null)}
                className={`relative group aspect-square bg-[#1A1A1A] overflow-hidden border cursor-grab active:cursor-grabbing transition-all ${
                  img.isCover ? "border-gold ring-1 ring-gold/40" : "border-white/10"
                } ${dragIndex === i ? "opacity-40" : ""}`}
                title="Arrastra para reordenar"
              >
                <img src={img.thumb} alt={img.alt || img.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                  {!img.isCover && (
                    <button onClick={() => onSelect(selected.map((s) => ({ ...s, isCover: s.id === img.id })))} className="text-[10px] bg-gold text-[#0A0A0A] px-2 py-0.5">Portada</button>
                  )}
                  <button onClick={() => copyLink(img.url)} className="mt-1 flex items-center gap-1 text-[10px] bg-white/15 text-white px-2 py-0.5"><Copy size={10} /> Link</button>
                  <button onClick={() => onSelect(selected.filter((s) => s.id !== img.id))} className="mt-1 text-white/80 hover:text-red-400"><X size={14} /></button>
                </div>
                {img.isCover && <span className="absolute top-1 left-1 text-[8px] bg-gold text-[#0A0A0A] px-1 py-0.5">Cover</span>}
                <span className="absolute bottom-1 right-1 text-[8px] text-white/40">{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {uploadError && <p className="text-red-400 text-sm">{uploadError}</p>}

      <div className="border border-dashed border-white/20 p-4 flex flex-wrap items-center gap-4">
        <div>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 text-sm transition-colors disabled:opacity-50"
          >
            {uploading ? <Spinner size={16} className="mr-1" /> : <Upload size={16} />}
            {uploading ? "Subiendo..." : "Subir imagen"}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              files.forEach((f) => handleUpload(f));
              e.target.value = "";
            }}
          />
        </div>
        <p className="text-[#9CA3AF] text-xs">
          Se sube a WordPress y se añade a este proyecto. La primera será la portada (puedes cambiarla luego).
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[#9CA3AF] text-xs">WordPress Media</p>
          <p className="text-[#525252] text-xs">Haz clic en una imagen para añadirla. Pasa el cursor y toca "Link" para copiar su URL.</p>
        </div>
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Buscar..." className="w-full bg-white/[0.03] border border-white/10 pl-10 pr-4 py-2.5 text-white text-sm placeholder:text-[#6B7280] focus:outline-none focus:border-gold/50" />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12 text-[#9CA3AF]"><Spinner size={20} className="mr-2" /> Cargando...</div>
        ) : images.length === 0 ? (
          <p className="text-[#9CA3AF] text-sm py-12 text-center">{search ? "Sin resultados" : "No hay imágenes. Sube una con el botón de arriba."}</p>
        ) : (
          <>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-10 lg:grid-cols-12 gap-2 max-h-[70vh] overflow-y-auto pr-1">
              {images.map((img) => (
                <div key={img.id} className="relative group aspect-square bg-[#1A1A1A] overflow-hidden border border-white/10 transition-all">
                  <button onClick={() => toggleImage(img)} className={`w-full h-full ${selected.find((s) => s.id === img.id) ? "opacity-80" : ""}`}>
                    <img src={img.thumb} alt={img.alt || img.title} className="w-full h-full object-cover" />
                  </button>
                  {selected.find((s) => s.id === img.id) && (
                    <span className="absolute top-1 left-1 text-[8px] bg-gold text-[#0A0A0A] px-1 py-0.5">✓</span>
                  )}
                  <button
                    onClick={() => copyLink(img.url)}
                    className="absolute bottom-1 right-1 bg-black/70 hover:bg-gold text-white hover:text-[#0A0A0A] px-2 py-1 text-[9px] flex items-center gap-1 transition-colors"
                    title="Copiar link"
                  >
                    {copied === img.url ? "¡Copiado!" : <><Copy size={9} /> Link</>}
                  </button>
                </div>
              ))}
            </div>
            {total > images.length && (
              <div className="flex justify-center gap-2 mt-4">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="text-xs text-[#9CA3AF] hover:text-white disabled:opacity-30 px-3 py-1 bg-white/[0.03] border border-white/10">Anterior</button>
                <span className="text-xs text-[#9CA3AF] px-3 py-1">Página {page} de {Math.ceil(total / 100)} · {total} imágenes</span>
                <button onClick={() => setPage((p) => p + 1)} disabled={page >= Math.ceil(total / 100)} className="text-xs text-[#9CA3AF] hover:text-white disabled:opacity-30 px-3 py-1 bg-white/[0.03] border border-white/10">Siguiente</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}