"use client";

import { useState, useEffect } from "react";
import { WpMediaItem } from "@/types";
import { Search, X, Spinner } from "../Icons";

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

  function toggleImage(img: WpMediaItem) {
    const exists = selected.find((s) => s.id === img.id);
    if (exists) {
      onSelect(selected.filter((s) => s.id !== img.id));
    } else {
      if (selected.length >= maxImages) return;
      onSelect([...selected, { ...img, isCover: selected.length === 0 }]);
    }
  }

  return (
    <div className="space-y-6">
      {selected.length > 0 && (
        <div>
          <p className="text-[#525252] text-xs mb-3">Seleccionadas ({selected.length})</p>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {selected.map((img) => (
              <div key={img.id} className={`relative group aspect-square bg-[#1A1A1A] overflow-hidden border ${img.isCover ? "border-gold" : "border-transparent"}`}>
                <img src={img.thumb} alt={img.alt || img.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                  {!img.isCover && (
                    <button onClick={() => onSelect(selected.map((s) => ({ ...s, isCover: s.id === img.id })))} className="text-[10px] bg-gold text-[#0A0A0A] px-2 py-0.5">Portada</button>
                  )}
                  <button onClick={() => onSelect(selected.filter((s) => s.id !== img.id))} className="text-white/80 hover:text-red-400"><X size={14} /></button>
                </div>
                {img.isCover && <span className="absolute top-1 left-1 text-[8px] bg-gold text-[#0A0A0A] px-1 py-0.5">Cover</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="text-[#525252] text-xs mb-3">WordPress Media</p>
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#525252]" />
          <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Buscar..." className="w-full bg-[#141414] border border-[#1F1F1F] pl-10 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-white/20" />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12 text-[#525252]"><Spinner size={20} className="mr-2" /> Cargando...</div>
        ) : images.length === 0 ? (
          <p className="text-[#525252] text-sm py-12 text-center">{search ? "Sin resultados" : "No hay imágenes. Verifica WordPress."}</p>
        ) : (
          <>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 max-h-[400px] overflow-y-auto">
              {images.map((img) => (
                <button key={img.id} onClick={() => toggleImage(img)}
                  className={`aspect-square bg-[#1A1A1A] overflow-hidden border transition-all ${selected.find((s) => s.id === img.id) ? "border-gold opacity-80" : "border-transparent hover:border-white/20"}`}>
                  <img src={img.thumb} alt={img.alt || img.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            {total > images.length && (
              <div className="flex justify-center gap-2 mt-4">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="text-xs text-[#525252] hover:text-white disabled:opacity-30 px-3 py-1 bg-[#141414] border border-[#1F1F1F]">Anterior</button>
                <span className="text-xs text-[#525252] px-3 py-1">{page} / {Math.ceil(total / 50)}</span>
                <button onClick={() => setPage((p) => p + 1)} disabled={page >= Math.ceil(total / 50)} className="text-xs text-[#525252] hover:text-white disabled:opacity-30 px-3 py-1 bg-[#141414] border border-[#1F1F1F]">Siguiente</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
