"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Project, Category, WpMediaItem } from "@/types";
import { Save, ArrowLeft, Plus, X } from "../Icons";
import ImageSelector from "./ImageSelector";
import Link from "next/link";

interface Props {
  project?: Project;
  categories: Category[];
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

export default function AdminProjectForm({ project, categories }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState(project?.title || "");
  const [description, setDescription] = useState(project?.description || "");
  const [category, setCategory] = useState(project?.category || "");
  const [client, setClient] = useState(project?.client || "");
  const [year, setYear] = useState(project?.year || "");
  const [servicesStr, setServicesStr] = useState(project?.services?.join(", ") || "");
  const [featured, setFeatured] = useState(project?.featured || false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [localCategories, setLocalCategories] = useState<Category[]>(categories);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryBusy, setCategoryBusy] = useState(false);

  const initialImages: (WpMediaItem & { isCover?: boolean })[] = [
    ...(project?.cover_image_url
      ? [{ id: project?.cover_image_id || 0, url: project.cover_image_url, thumb: project.cover_image_url, medium: project.cover_image_url, title: project.title, alt: "", width: 0, height: 0, isCover: true } as WpMediaItem & { isCover?: boolean }]
      : []),
    ...(project?.images?.map((img: any) => ({ id: img.id || 0, url: img.url || "", thumb: img.thumb || img.url || "", medium: img.medium || img.url || "", title: img.alt || "", alt: img.alt || "", width: img.width || 0, height: img.height || 0 })) || []),
  ];

  const [selectedImages, setSelectedImages] = useState<(WpMediaItem & { isCover?: boolean })[]>(initialImages);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaved(false);
    setSaving(true);
    if (!title.trim()) { setError("El título es obligatorio"); setSaving(false); return; }

    const coverImage = selectedImages.find((i) => i.isCover);
    const otherImages = selectedImages.filter((i) => !i.isCover).map((i) => ({ id: i.id, url: i.url, thumb: i.thumb || i.url, medium: i.medium || i.url, alt: i.alt || i.title, width: i.width, height: i.height }));

    const body = {
      id: project?.id, title, description, category,
cover_image_url: coverImage?.url || otherImages[0]?.url || "",
    cover_image_id: coverImage?.id || null,
    images: otherImages, client: client || null, year: year || null,
    services: servicesStr.split(",").map((s) => s.trim()).filter(Boolean), featured,
  };

    try {
      const res = await fetch("/api/proyectos", { method: project ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (res.ok) {
        const data = await res.json();
        if (!project) {
          router.push(`/admin/proyectos/${data.id}`);
          router.refresh();
        } else {
          setSaved(true);
          setSaving(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
          setTimeout(() => setSaved(false), 3000);
          router.refresh();
        }
      }
      else { const data = await res.json(); setError(data.error || "Error al guardar"); setSaving(false); }
    } catch (err) {
      console.error("Error guardando proyecto", err);
      setError("Error de conexión. Revisa que WordPress responda.");
      setSaving(false);
    }
  }

  async function createCategory() {
    const name = newCategoryName.trim();
    if (!name) return;
    if (slugify(name) === "") { setError("Nombre de categoría no válido"); return; }
    setCategoryBusy(true);
    setError("");
    try {
      const cfgRes = await fetch("/api/config", { method: "GET" });
      const cfg = await cfgRes.json();
      const slides = cfg?.hero_slides || cfg?.slides || [];
      const current: Category[] = cfg?.categories || [];
      const slug = slugify(name);
      if (current.some((c) => c.slug === slug)) {
        setLocalCategories(current);
        setCategory(slug);
        setShowNewCategory(false);
        setNewCategoryName("");
        setCategoryBusy(false);
        return;
      }
      const newCat: Category = { id: `cat-${Date.now()}`, name, slug, order_index: current.length };
      const updated = [...current, newCat];
      const res = await fetch("/api/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slides, categories: updated }),
      });
      if (!res.ok) { setError("Error al crear la categoría"); setCategoryBusy(false); return; }
      setLocalCategories(updated);
      setCategory(slug);
      setShowNewCategory(false);
      setNewCategoryName("");
    } catch {
      setError("Error de conexión creando la categoría");
    }
    setCategoryBusy(false);
  }

  const categoryLabel = localCategories.find((c) => c.slug === category)?.name || category;
  const previewCover = selectedImages.find((i) => i.isCover)?.url || selectedImages[0]?.url;

  const missingWarnings: string[] = [];
  if (!previewCover) missingWarnings.push("No hay portada: el proyecto se verá sin imagen en el portafolio");
  if (!description.trim()) missingWarnings.push("Sin descripción");
  if (!client.trim()) missingWarnings.push("Sin cliente");
  if (!selectedImages.length) missingWarnings.push("Sin imágenes: añade al menos una");

  function showWarnings() {
    setWarnings(missingWarnings);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-10">
      {saved && (
        <div className="flex items-center gap-2 border border-green-500/40 bg-green-500/10 text-green-400 px-4 py-3 text-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
          Guardado correctamente
        </div>
      )}

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {warnings.length > 0 && (
        <div className="border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm">
          <p className="text-amber-400 font-medium mb-1">Te falta completar:</p>
          <ul className="list-disc list-inside text-amber-300/80 space-y-0.5 text-xs">
            {warnings.map((w) => <li key={w}>{w}</li>)}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-[#525252] text-xs block mb-2">Título *</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-[#141414] border border-[#1F1F1F] px-4 py-3 text-white text-sm focus:outline-none focus:border-white/20" placeholder="Nombre del proyecto" />
        </div>
        <div>
          <label className="text-[#525252] text-xs block mb-2">Categoría</label>
          {showNewCategory ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); createCategory(); } }}
                placeholder="Nueva categoría"
                autoFocus
                className="flex-1 bg-[#141414] border border-[#1F1F1F] px-4 py-3 text-white text-sm focus:outline-none focus:border-white/20"
              />
              <button type="button" onClick={createCategory} disabled={categoryBusy} className="bg-gold text-[#0A0A0A] px-3 py-3 text-sm font-medium hover:bg-gold-light disabled:opacity-50">
                {categoryBusy ? "…" : "Crear"}
              </button>
              <button type="button" onClick={() => setShowNewCategory(false)} className="p-3 text-[#525252] hover:text-white"><X size={15} /></button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="flex-1 bg-[#141414] border border-[#1F1F1F] px-4 py-3 text-white text-sm focus:outline-none focus:border-white/20">
                <option value="">Sin categoría</option>
                {localCategories.map((cat) => (<option key={cat.slug} value={cat.slug}>{cat.name}</option>))}
              </select>
              <button type="button" onClick={() => setShowNewCategory(true)} title="Nueva categoría" className="p-3 text-[#525252] hover:text-white"><Plus size={16} /></button>
            </div>
          )}
        </div>
        <div className="md:col-span-2">
          <label className="text-[#525252] text-xs block mb-2">Descripción</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="w-full bg-[#141414] border border-[#1F1F1F] px-4 py-3 text-white text-sm focus:outline-none focus:border-white/20 resize-none" placeholder="Describe el proyecto..." />
        </div>
        <div>
          <label className="text-[#525252] text-xs block mb-2">Cliente</label>
          <input type="text" value={client} onChange={(e) => setClient(e.target.value)} className="w-full bg-[#141414] border border-[#1F1F1F] px-4 py-3 text-white text-sm focus:outline-none focus:border-white/20" placeholder="Nombre del cliente" />
        </div>
        <div>
          <label className="text-[#525252] text-xs block mb-2">Año</label>
          <input type="text" value={year} onChange={(e) => setYear(e.target.value)} className="w-full bg-[#141414] border border-[#1F1F1F] px-4 py-3 text-white text-sm focus:outline-none focus:border-white/20" placeholder="2024" />
        </div>
        <div className="md:col-span-2">
          <label className="text-[#525252] text-xs block mb-2">Servicios (separados por coma)</label>
          <input type="text" value={servicesStr} onChange={(e) => setServicesStr(e.target.value)} className="w-full bg-[#141414] border border-[#1F1F1F] px-4 py-3 text-white text-sm focus:outline-none focus:border-white/20" placeholder="Fotografía, Branding, Video" />
        </div>
        <div className="md:col-span-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="w-4 h-4 accent-gold" />
            <span className="text-[#737373] text-sm">Proyecto destacado</span>
          </label>
        </div>
        </div>

        <div className="lg:col-span-1">
          <p className="text-[#525252] text-xs mb-3">Vista previa</p>
          <div className="bg-[#1A1A1A] border border-[#1F1F1F] overflow-hidden">
            <div className="aspect-[4/5] relative">
              {previewCover ? (
                <img src={previewCover} alt={title || "preview"} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#525252] text-xs">Sin imagen</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-[#737373] text-[10px] tracking-[0.15em] uppercase mb-1">{categoryLabel || "Categoría"}</p>
                <p className="text-white text-sm font-bold truncate">{title || "Título del proyecto"}</p>
              </div>
            </div>
          </div>
          <button type="button" onClick={showWarnings} className="mt-4 w-full text-xs text-[#525252] hover:text-white border border-[#1F1F1F] px-4 py-2.5 transition-colors">
            Verificar antes de publicar
          </button>
        </div>
      </div>

      <div className="border-t border-[#1F1F1F] pt-10">
        <ImageSelector selected={selectedImages} onSelect={setSelectedImages} />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex items-center gap-4 pt-4 border-t border-[#1F1F1F]">
        <Link href="/admin/proyectos" className="flex items-center gap-2 text-[#525252] hover:text-white text-sm transition-colors">
          <ArrowLeft size={14} /> Cancelar
        </Link>
        <button type="submit" disabled={saving || !title.trim()} className="flex items-center gap-2 bg-gold text-[#0A0A0A] px-6 py-3 text-sm font-medium hover:bg-gold-light transition-colors disabled:opacity-50 ml-auto">
          <Save size={16} /> {saving ? "Guardando..." : project ? "Actualizar" : "Publicar"}
        </button>
      </div>
    </form>
  );
}
