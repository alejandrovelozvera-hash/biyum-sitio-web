"use client";

import { useEffect, useState } from "react";
import { Project } from "@/types";
import { X, ChevronLeft, ChevronRight } from "./Icons";

interface Props {
  project: Project;
  onClose: () => void;
}

export default function ProjectDetail({ project, onClose }: Props) {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setImageIndex((i) => Math.max(0, i - 1));
      if (e.key === "ArrowRight") setImageIndex((i) => Math.min(allImages.length - 1, i + 1));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const allImages = [
    ...(project.cover_image_url ? [{ url: project.cover_image_url, alt: project.title }] : []),
    ...project.images.map((img) => ({ url: img.url, alt: img.alt })),
  ];

  const currentImage = allImages[imageIndex];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-5xl mx-4 max-h-[90dvh] overflow-y-auto rounded-2xl"
        style={{
          background: "rgba(20,20,20,0.85)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 25px 80px rgba(0,0,0,0.6)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-[#737373] hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-5">
          <div className="md:col-span-3 relative">
            {currentImage && (
              <div className="aspect-[4/3]">
                <img
                  src={currentImage.url}
                  alt={currentImage.alt || project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {allImages.length > 1 && (
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <button
                  onClick={() => setImageIndex((i) => Math.max(0, i - 1))}
                  disabled={imageIndex === 0}
                  className="text-white/60 hover:text-white disabled:opacity-30 transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="text-white/40 text-xs">
                  {imageIndex + 1} / {allImages.length}
                </span>
                <button
                  onClick={() => setImageIndex((i) => Math.min(allImages.length - 1, i + 1))}
                  disabled={imageIndex === allImages.length - 1}
                  className="text-white/60 hover:text-white disabled:opacity-30 transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>

          <div className="md:col-span-2 p-8 md:p-10 flex flex-col justify-center">
            {project.category && (
              <p className="text-[#737373] text-xs tracking-widest uppercase mb-3">
                {project.category}
              </p>
            )}
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tighter leading-[0.92] mb-6">
              {project.title}
            </h2>
            <p className="text-[#737373] text-sm leading-relaxed mb-8">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-8 mb-6">
              {project.client && (
                <div>
                  <p className="text-[#525252] text-[10px] tracking-widest uppercase mb-1.5">Cliente</p>
                  <p className="text-white text-sm">{project.client}</p>
                </div>
              )}
              {project.year && (
                <div>
                  <p className="text-[#525252] text-[10px] tracking-widest uppercase mb-1.5">Año</p>
                  <p className="text-white text-sm">{project.year}</p>
                </div>
              )}
            </div>

            {project.services && project.services.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {project.services.map((s) => (
                  <span
                    key={s}
                    className="text-white/70 text-[11px] px-3 py-1.5 rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}

            {project.video_url && (
              <a
                href={project.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-light transition-colors mt-2"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Ver Video
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
