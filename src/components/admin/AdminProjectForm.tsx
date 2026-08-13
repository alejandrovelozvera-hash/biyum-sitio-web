"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Project, Category, WpMediaItem } from "@/types";
import { Save, ArrowLeft } from "../Icons";
import ImageSelector from "./ImageSelector";
import Link from "next/link";

interface Props {
  project?: Project;
  categories: Category[];
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
      if (res.ok) { router.push("/admin/proyectos"); router.refresh(); }
      else { const data = await res.json(); setError(data.error || "Error al guardar"); }
    } catch { setError("Error de conexión"); }
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-[#525252] text-xs block mb-2">Título *</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-[#141414] border border-[#1F1F1F] px-4 py-3 text-white text-sm focus:outline-none focus:border-white/20" placeholder="Nombre del proyecto" />
        </div>
        <div>
          <label className="text-[#525252] text-xs block mb-2">Categoría</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-[#141414] border border-[#1F1F1F] px-4 py-3 text-white text-sm focus:outline-none focus:border-white/20">
            <option value="">Sin categoría</option>
            {categories.map((cat) => (<option key={cat.slug} value={cat.slug}>{cat.name}</option>))}
          </select>
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
