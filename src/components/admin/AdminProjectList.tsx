"use client";

import { Project } from "@/types";
import Link from "next/link";
import { Pencil, Trash, Eye } from "../Icons";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminProjectList({
  projects: initial,
}: {
  projects: Project[];
}) {
  const [projects, setProjects] = useState(initial);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState<string>("todos");
  const router = useRouter();

  const categories = Array.from(new Set(initial.map((p) => p.category).filter(Boolean))) as string[];
  const filtered = projects.filter((p) => {
    const mSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.client?.toLowerCase().includes(search.toLowerCase());
    const mCat = filterCat === "todos" || p.category === filterCat;
    return mSearch && mCat;
  });

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este proyecto?")) return;
    setDeleting(id);
    await fetch(`/api/proyectos?id=${id}`, { method: "DELETE" });
    setProjects((p) => p.filter((proj) => proj.id !== id));
    setDeleting(null);
    router.refresh();
  }

  async function moveUp(index: number) {
    if (index === 0) return;
    const updated = [...projects];
    [updated[index], updated[index - 1]] = [updated[index - 1], updated[index]];
    setProjects(updated);
    await Promise.all(
      updated.map((p, i) =>
        fetch("/api/proyectos", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: p.id, order_index: i }),
        })
      )
    );
  }

  async function moveDown(index: number) {
    if (index === projects.length - 1) return;
    const updated = [...projects];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    setProjects(updated);
    await Promise.all(
      updated.map((p, i) =>
        fetch("/api/proyectos", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: p.id, order_index: i }),
        })
      )
    );
  }

  const toggleFeatured = async (p: Project) => {
    const updated = { ...p, featured: !p.featured };
    setProjects((prev) => prev.map((x) => (x.id === p.id ? updated : x)));
    await fetch("/api/proyectos", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: p.id, featured: updated.featured }) });
    router.refresh();
  };

  return (
    <div className="space-y-4">
      <div className="sticky top-0 z-10 bg-[#0D0D0D]/80 backdrop-blur-xl -mx-1 px-1 py-2 flex flex-col sm:flex-row gap-3">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por título o cliente..." className="flex-1 bg-[#141414] ring-1 ring-white/5 rounded-2xl px-4 py-2.5 text-white text-sm placeholder:text-muted focus:outline-none focus:ring-white/20" />
        <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} className="bg-[#141414] ring-1 ring-white/5 rounded-2xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-white/20">
          <option value="todos">Todas las categorías</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="bg-[#141414] ring-1 ring-white/5 rounded-2xl overflow-hidden">
      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-muted text-sm">No hay proyectos todavía</p>
          <Link href="/admin/proyectos/nuevo" className="inline-block mt-4 bg-gold text-on-gold px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gold-light transition-colors">
            Crear el primero
          </Link>
        </div>
      ) : (
        <>
          <div className="grid md:hidden gap-3 p-3">
            {filtered.map((p) => (
              <div key={p.id} className="flex gap-3 p-3 rounded-2xl bg-white/[0.02] ring-1 ring-white/5">
                {p.cover_image_url ? <img src={p.cover_image_url} alt={p.title} className="w-14 h-14 rounded-xl object-cover shrink-0" /> : <div className="w-14 h-14 rounded-xl bg-white/5 shrink-0" />}
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm truncate">{p.title}</p>
                  <p className="text-muted text-xs">{p.category} · {p.client || "—"}</p>
                  <div className="flex gap-1 mt-2">
                    <Link href={`/admin/proyectos/${p.id}`} className="text-xs bg-white/5 px-2 py-1 rounded-full text-white">Editar</Link>
                    <button onClick={() => toggleFeatured(p)} className={`text-xs px-2 py-1 rounded-full ring-1 ${p.featured ? "bg-gold text-on-gold ring-gold" : "ring-white/10 text-muted"}`}>{p.featured ? "Destacado" : "No destacado"}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
        <thead>
          <tr className="border-b border-[#1F1F1F] text-left">
            <th className="p-4 text-[#525252] text-xs font-medium w-16"></th>
            <th className="p-4 text-[#525252] text-xs font-medium">Proyecto</th>
            <th className="p-4 text-[#525252] text-xs font-medium hidden md:table-cell">Categoría</th>
            <th className="p-4 text-[#525252] text-xs font-medium hidden md:table-cell">Cliente</th>
            <th className="p-4 text-[#525252] text-xs font-medium">Imágenes</th>
            <th className="p-4 text-[#525252] text-xs font-medium w-20">Destacado</th>
            <th className="p-4 text-[#525252] text-xs font-medium w-28">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((project, index) => {
            const realIndex = projects.findIndex((p) => p.id === project.id);
            return (
            <tr key={project.id} className="border-b border-[#1F1F1F] hover:bg-white/[0.02] transition-colors">
              <td className="p-2 text-center">
                <div className="flex flex-col items-center gap-1">
                  <button
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 text-muted hover:text-white disabled:opacity-20 flex items-center justify-center"
                    aria-label="Mover arriba"
                  >
                    <svg width="8" height="5" viewBox="0 0 10 6" fill="currentColor"><path d="M5 0L10 6H0z" /></svg>
                  </button>
                  <span className="text-muted text-[11px] font-medium">{index + 1}</span>
                  <button
                    onClick={() => moveDown(index)}
                    disabled={index === projects.length - 1}
                    className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 text-muted hover:text-white disabled:opacity-20 flex items-center justify-center"
                    aria-label="Mover abajo"
                  >
                    <svg width="8" height="5" viewBox="0 0 10 6" fill="currentColor"><path d="M5 6L0 0h10z" /></svg>
                  </button>
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-3">
                  {project.cover_image_url ? (
                    <img src={project.cover_image_url} alt={project.title} className="w-10 h-10 rounded-xl object-cover bg-[#1A1A1A] ring-1 ring-white/5" />
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-white/5 ring-1 ring-white/5 flex items-center justify-center text-muted text-xs">—</div>
                  )}
                  <div className="min-w-0">
                    <p className="text-white text-sm truncate max-w-[180px]">{project.title}</p>
                    <p className="text-muted text-xs truncate">/proyecto/{project.slug}</p>
                  </div>
                </div>
              </td>
              <td className="p-4 text-[#9CA3AF] text-sm hidden md:table-cell">{project.category || "—"}</td>
              <td className="p-4 text-[#9CA3AF] text-sm hidden md:table-cell">{project.client || "—"}</td>
              <td className="p-4 text-[#9CA3AF] text-sm">{project.images?.length || 0}</td>
              <td className="p-4">
                <button
                  onClick={() => toggleFeatured(project)}
                  role="switch"
                  aria-checked={project.featured}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${project.featured ? "bg-gold" : "bg-white/10"}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${project.featured ? "translate-x-4" : "translate-x-1"}`} />
                </button>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-1">
                  <Link href={`/admin/proyectos/${project.id}`} title="Editar" className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-muted hover:text-white flex items-center justify-center transition-colors">
                    <Pencil size={14} />
                  </Link>
                  <Link href={`/proyecto/${project.slug}`} target="_blank" title="Ver" className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-muted hover:text-white flex items-center justify-center transition-colors">
                    <Eye size={14} />
                  </Link>
                  <button onClick={() => handleDelete(project.id)} disabled={deleting === project.id} title="Eliminar" className="w-8 h-8 rounded-full bg-red-500/10 hover:bg-red-500/20 text-muted hover:text-red-400 flex items-center justify-center transition-colors disabled:opacity-30">
                    <Trash size={14} />
                  </button>
                </div>
              </td>
            </tr>
          );
          })}
        </tbody>
      </table>
      </div>
      </>
      )}
      </div>
    </div>
  );
}
