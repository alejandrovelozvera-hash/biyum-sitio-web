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
  const router = useRouter();

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

  return (
    <div className="bg-[#141414] border border-[#1F1F1F] overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#1F1F1F] text-left">
            <th className="p-4 text-[#525252] text-xs font-medium w-16"></th>
            <th className="p-4 text-[#525252] text-xs font-medium">Proyecto</th>
            <th className="p-4 text-[#525252] text-xs font-medium hidden md:table-cell">Categoría</th>
            <th className="p-4 text-[#525252] text-xs font-medium hidden md:table-cell">Cliente</th>
            <th className="p-4 text-[#525252] text-xs font-medium">Imágenes</th>
            <th className="p-4 text-[#525252] text-xs font-medium w-28">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={project.id} className="border-b border-[#1F1F1F] hover:bg-white/[0.01] transition-colors">
              <td className="p-2 text-center">
                <div className="flex flex-col items-center gap-0.5">
                  <button
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className="text-[#525252] hover:text-white disabled:opacity-20 disabled:cursor-not-allowed"
                  >
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor"><path d="M5 0L10 6H0z" /></svg>
                  </button>
                  <span className="text-[#525252] text-[10px]">{index + 1}</span>
                  <button
                    onClick={() => moveDown(index)}
                    disabled={index === projects.length - 1}
                    className="text-[#525252] hover:text-white disabled:opacity-20 disabled:cursor-not-allowed"
                  >
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor"><path d="M5 6L0 0h10z" /></svg>
                  </button>
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-3">
                  {project.cover_image_url && (
                    <img src={project.cover_image_url} alt={project.title} className="w-10 h-10 object-cover bg-[#1A1A1A]" />
                  )}
                  <div>
                    <p className="text-white text-sm">{project.title}</p>
                    <p className="text-[#525252] text-xs">/proyecto/{project.slug}</p>
                  </div>
                </div>
              </td>
              <td className="p-4 text-[#737373] text-sm hidden md:table-cell">{project.category || "—"}</td>
              <td className="p-4 text-[#737373] text-sm hidden md:table-cell">{project.client || "—"}</td>
              <td className="p-4 text-[#737373] text-sm">{project.images?.length || 0}</td>
              <td className="p-4">
                <div className="flex items-center gap-1">
                  <Link href={`/admin/proyectos/${project.id}`} className="p-2 text-[#525252] hover:text-white transition-colors">
                    <Pencil size={15} />
                  </Link>
                  <Link href={`/proyecto/${project.slug}`} target="_blank" className="p-2 text-[#525252] hover:text-white transition-colors">
                    <Eye size={15} />
                  </Link>
                  <button onClick={() => handleDelete(project.id)} disabled={deleting === project.id} className="p-2 text-[#525252] hover:text-red-400 transition-colors disabled:opacity-30">
                    <Trash size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
