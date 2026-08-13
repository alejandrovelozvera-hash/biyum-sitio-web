"use client";

import { useState, useEffect, useRef } from "react";
import { WpMediaItem } from "@/types";
import { Search, X, Spinner, Upload } from "../Icons";

interface Props {
  value: string;
  onPick: (url: string) => void;
  label?: string;
}

export default function MediaPicker({ value, onPick, label = "Elegir de WordPress Media" }: Props) {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<WpMediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) loadImages();
  }, [open, page, search]);

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
      onPick(item.url);
      setOpen(false);
      setPage(1);
      await loadImages();
    } catch { setUploadError("Error de conexión"); }
    setUploading(false);
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.12] text-white px-4 py-2.5 text-sm transition-colors"
      >
        <Search size={15} />
        {label}
      </button>

      {open && (
        <div className="border border-[#1F1F1F] bg-[#121212] p-4 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-white text-sm">WordPress Media</p>
            <button type="button" onClick={() => setOpen(false)} className="text-[#525252] hover:text-red-400"><X size={16} /></button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 bg-gold text-[#0A0A0A] px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
            >
              {uploading ? <Spinner size={15} className="mr-0.5" /> : <Upload size={15} />}
              {uploading ? "Subiendo..." : "Subir imagen"}
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file);
              e.target.value = "";
            }} />
            <p className="text-[#525252] text-xs">Sube a WordPress y se asigna como imagen de esta portada.</p>
          </div>

          {uploadError && <p className="text-red-400 text-sm">{uploadError}</p>}

          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Buscar..."
              className="w-full bg-black/30 border border-[#1F1F1F] pl-10 pr-4 py-2.5 text-white text-sm placeholder:text-[#6B7280] focus:outline-none focus:border-gold/40"
            />
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-10 text-[#9CA3AF]"><Spinner size={18} className="mr-2" /> Cargando...</div>
          ) : images.length === 0 ? (
            <p className="text-[#9CA3AF] text-sm py-10 text-center">{search ? "Sin resultados" : "No hay imágenes. Sube una con el botón de arriba."}</p>
          ) : (
            <>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 max-h-[40vh] overflow-y-auto pr-1">
                {images.map((img) => (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => { onPick(img.url); setOpen(false); }}
                    className={`relative group aspect-square bg-[#1A1A1A] overflow-hidden border transition-all ${value === img.url ? "border-gold ring-1 ring-gold/40" : "border-white/10 hover:border-white/30"}`}
                    title={img.title}
                  >
                    <img src={img.thumb} alt={img.alt || img.title} className="w-full h-full object-cover" />
                    {value === img.url && <span className="absolute top-1 left-1 text-[8px] bg-gold text-[#0A0A0A] px-1 py-0.5">✓</span>}
                  </button>
                ))}
              </div>
              {total > images.length && (
                <div className="flex justify-center gap-2">
                  <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="text-xs text-[#9CA3AF] hover:text-white disabled:opacity-30 px-3 py-1 bg-white/[0.03] border border-white/10">Anterior</button>
                  <span className="text-xs text-[#9CA3AF] px-3 py-1">Página {page} de {Math.ceil(total / 100)} · {total} imágenes</span>
                  <button type="button" onClick={() => setPage((p) => p + 1)} disabled={page >= Math.ceil(total / 100)} className="text-xs text-[#9CA3AF] hover:text-white disabled:opacity-30 px-3 py-1 bg-white/[0.03] border border-white/10">Siguiente</button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}