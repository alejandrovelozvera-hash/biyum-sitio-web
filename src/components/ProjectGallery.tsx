"use client";

import { Project } from "@/types";
import { useState } from "react";
import { X } from "./Icons";

export default function ProjectGallery({ project }: { project: Project }) {
  const [selected, setSelected] = useState<string | null>(null);
  const allImages = [
    ...(project.cover_image_url ? [{ url: project.cover_image_url, alt: project.title }] : []),
    ...project.images,
  ];

  if (allImages.length === 0) return <div className="h-64 bg-surface" />;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {allImages.map((img, i) => (
          <button key={i} onClick={() => setSelected(img.url)} className="group relative overflow-hidden rounded-2xl bg-surface">
            <div className="aspect-[4/3]">
              <img src={img.url} alt={img.alt || project.title} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" />
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-[100] bg-[#0A0A0A]/90 flex items-center justify-center p-4 cursor-pointer" onClick={() => setSelected(null)}>
          <button onClick={() => setSelected(null)} className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors z-10"><X size={20} /></button>
          <img src={selected} alt={project.title} className="max-w-full max-h-[90vh] object-contain" />
        </div>
      )}
    </>
  );
}
