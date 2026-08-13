"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Plus, Trash } from "../Icons";
import { Category } from "@/types";

interface Slide { image_url: string; title: string; subtitle: string; cta_text: string; cta_link: string; }
interface CategoryInput { id: string; name: string; slug: string; order_index: number; }
interface Props {
  initialSlides: Slide[] | null;
  initialCategories?: Category[] | null;
}

const defaultSlide: Slide = { image_url: "", title: "", subtitle: "", cta_text: "Escríbenos", cta_link: "https://wa.me/message/N3PW46LKUALOK1" };

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

export default function AdminConfigForm({ initialSlides, initialCategories }: Props) {
  const router = useRouter();
  const [slides, setSlides] = useState<Slide[]>(initialSlides && initialSlides.length > 0 ? initialSlides : [defaultSlide]);
  const [categories, setCategories] = useState<CategoryInput[]>(initialCategories && initialCategories.length > 0
    ? initialCategories.map((c, i) => ({ id: c.id, name: c.name, slug: c.slug, order_index: c.order_index ?? i }))
    : []);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function updateSlide(index: number, field: keyof Slide, value: string) {
    setSlides((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  }

  function addSlide() { setSlides((prev) => [...prev, { ...defaultSlide }]); }
  function removeSlide(index: number) { setSlides((prev) => prev.filter((_, i) => i !== index)); }

  function updateCategory(index: number, field: keyof CategoryInput, value: string) {
    setCategories((prev) => prev.map((c, i) => {
      if (i !== index) return c;
      const updated = { ...c, [field]: value };
      if (field === "name") updated.slug = slugify(value) || c.slug;
      return updated;
    }));
  }

  function addCategory() {
    setCategories((prev) => [...prev, { id: `cat-${Date.now()}`, name: "", slug: "", order_index: prev.length }]);
  }
  function removeCategory(index: number) {
    setCategories((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slides,
          categories: categories.map((c, i) => ({ ...c, order_index: c.order_index ?? i })),
        }),
      });
      if (res.ok) { setMessage("Configuración guardada"); router.refresh(); } else { setMessage("Error al guardar"); }
    } catch { setMessage("Error de conexión"); }
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-10">
      {slides.map((slide, index) => (
        <div key={index} className="bg-[#141414] border border-[#1F1F1F] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-white text-sm">Slide {index + 1}</p>
            {slides.length > 1 && <button type="button" onClick={() => removeSlide(index)} className="text-[#525252] hover:text-red-400"><Trash size={15} /></button>}
          </div>
          <div>
            <label className="text-[#525252] text-xs block mb-2">URL de imagen</label>
            <input type="text" value={slide.image_url} onChange={(e) => updateSlide(index, "image_url", e.target.value)} className="w-full bg-black/30 border border-[#1F1F1F] px-4 py-3 text-white text-sm focus:outline-none focus:border-white/20" placeholder="https://biyum.agency/wp-content/uploads/..." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[#525252] text-xs block mb-2">Título</label>
              <input type="text" value={slide.title} onChange={(e) => updateSlide(index, "title", e.target.value)} className="w-full bg-black/30 border border-[#1F1F1F] px-4 py-3 text-white text-sm focus:outline-none focus:border-white/20" />
            </div>
            <div>
              <label className="text-[#525252] text-xs block mb-2">Subtítulo</label>
              <input type="text" value={slide.subtitle} onChange={(e) => updateSlide(index, "subtitle", e.target.value)} className="w-full bg-black/30 border border-[#1F1F1F] px-4 py-3 text-white text-sm focus:outline-none focus:border-white/20" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[#525252] text-xs block mb-2">Texto botón</label>
              <input type="text" value={slide.cta_text} onChange={(e) => updateSlide(index, "cta_text", e.target.value)} className="w-full bg-black/30 border border-[#1F1F1F] px-4 py-3 text-white text-sm focus:outline-none focus:border-white/20" />
            </div>
            <div>
              <label className="text-[#525252] text-xs block mb-2">Link botón</label>
              <input type="text" value={slide.cta_link} onChange={(e) => updateSlide(index, "cta_link", e.target.value)} className="w-full bg-black/30 border border-[#1F1F1F] px-4 py-3 text-white text-sm focus:outline-none focus:border-white/20" />
            </div>
          </div>
        </div>
      ))}

      <button type="button" onClick={addSlide} className="flex items-center gap-2 text-[#525252] hover:text-white text-sm"><Plus size={16} /> Añadir slide</button>

      <div className="border-t border-[#1F1F1F] pt-10">
        <p className="text-white font-medium mb-1">Categorías de proyectos</p>
        <p className="text-[#525252] text-xs mb-4">Usadas por el filtro del portafolio y el selector de categoría.</p>
        {categories.length === 0 && (
          <p className="text-[#525252] text-sm mb-3">Sin categorías aún.</p>
        )}
        {categories.map((cat, index) => (
          <div key={cat.id} className="flex items-center gap-3 mb-3">
            <input
              type="text"
              value={cat.name}
              onChange={(e) => updateCategory(index, "name", e.target.value)}
              placeholder="Nombre (ej. Fotografía)"
              className="flex-1 bg-[#141414] border border-[#1F1F1F] px-4 py-2.5 text-white text-sm focus:outline-none focus:border-white/20"
            />
            <input
              type="text"
              value={cat.slug}
              onChange={(e) => updateCategory(index, "slug", e.target.value)}
              placeholder="slug"
              className="w-40 bg-black/30 border border-[#1F1F1F] px-4 py-2.5 text-white text-sm focus:outline-none focus:border-white/20"
            />
            <button type="button" onClick={() => removeCategory(index)} className="text-[#525252] hover:text-red-400 shrink-0"><Trash size={15} /></button>
          </div>
        ))}
        <button type="button" onClick={addCategory} className="flex items-center gap-2 text-[#525252] hover:text-white text-sm"><Plus size={16} /> Añadir categoría</button>
      </div>

      {message && <p className={`text-sm ${message.includes("Error") ? "text-red-400" : "text-green-400"}`}>{message}</p>}
      <button type="submit" disabled={saving} className="flex items-center gap-2 bg-gold text-[#0A0A0A] px-6 py-3 text-sm font-medium hover:bg-gold-light transition-colors disabled:opacity-50"><Save size={16} /> {saving ? "Guardando..." : "Guardar"}</button>
    </form>
  );
}