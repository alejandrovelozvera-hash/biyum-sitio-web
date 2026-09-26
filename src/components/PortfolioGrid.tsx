"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { Project } from "@/types";
import ExhibitionDetail from "./Exhibition/ExhibitionDetail";

const categoryLabels: Record<string, string> = {
  fotografia: "Fotografía",
  branding: "Branding",
  video: "Video",
  "social-media": "Social Media",
  "web-design": "Diseño Web",
};

function SkeletonLoader() {
  return (
    <div className="w-full h-full bg-gradient-to-r from-surface via-muted to-surface animate-pulse" />
  );
}

function TiltCard({ project, index, reduce, onSelect }: {
  project: Project;
  index: number;
  reduce: boolean | null;
  onSelect: (p: Project) => void;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    
    // Si la imagen ya está cargada (cache), marcarla como loaded
    if (img.complete && img.naturalWidth !== 0) {
      setImageLoaded(true);
      return;
    }
    
    const handleLoad = () => setImageLoaded(true);
    const handleError = () => setImageError(true);
    
    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);
    
    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        onClick={() => onSelect(project)}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(project); } }}
        tabIndex={0}
        role="button"
        aria-label={`Ver proyecto: ${project.title}`}
        className="group block relative overflow-hidden bg-surface cursor-pointer rounded-2xl ring-1 ring-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-background"
      >
        <div className="aspect-[4/3] relative overflow-hidden">
          {!imageLoaded && !imageError && <SkeletonLoader />}
          {project.cover_image_url && (
            <img
              ref={imgRef}
              src={project.cover_image_url}
              alt={project.title}
              loading="lazy"
              className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${!imageLoaded && !imageError ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
            />
          )}
          {imageError && project.cover_image_url && (
            <div className="w-full h-full flex items-center justify-center bg-surface text-muted text-xs">
              No disponible
            </div>
          )}
          {project.featured && (
            <span className="absolute top-4 left-4 z-20 bg-gold text-on-gold text-[9px] tracking-[0.14em] uppercase font-medium px-3 py-1.5 rounded-full shadow-sm">
              Destacado
            </span>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-90 group-hover:from-black/85 transition-colors duration-500" />
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 flex items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="text-white/60 text-[10px] tracking-[0.16em] uppercase mb-1.5">
                {categoryLabels[project.category] || project.category}
              </p>
              <h3 className="text-white text-[15px] md:text-[16px] font-semibold leading-tight break-words tracking-[-0.01em]">
                {project.title}
              </h3>
              {project.client && (
                <p className="text-white/50 text-[11px] mt-1 truncate">{project.client} · {project.year}</p>
              )}
            </div>
            <span className="shrink-0 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 18l6-6-6-6" /></svg>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category));
    return Array.from(cats);
  }, [projects]);

  const filtered = useMemo(() => {
    const list = (filter ? projects.filter((p) => p.category === filter) : projects);
    return [...list].sort(
      (a, b) => Number(b.featured) - Number(a.featured)
    );
  }, [projects, filter]);

  const visibleProjects = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const loadMore = () => setVisibleCount((prev) => Math.min(prev + 4, filtered.length));

  if (projects.length === 0) return null;

  return (
    <section id="portafolio" className="bg-background py-20 md:py-24">
      <div className="px-6 md:px-16 max-w-[1400px] mx-auto mb-12 md:mb-16">
        <motion.div
          initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-3">
            <span className="w-8 h-px bg-gradient-to-r from-border to-transparent" />
            <p className="text-muted text-[10px] tracking-[0.2em] uppercase">Diseño y Logos</p>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gold tracking-[-0.04em] leading-[0.92] pb-[0.18em] mb-[-0.18em]">
            Proyectos
          </h2>
        </motion.div>

        <div className="flex flex-wrap gap-2 md:gap-3 mt-8" role="group" aria-label="Filtrar por categoría">
          <button
            onClick={() => setFilter(null)}
            aria-pressed={filter === null}
            className={`text-[11px] tracking-wider uppercase rounded-full px-4 py-2 border transition-all hover:scale-[1.02] active:scale-[0.98] ${
              filter === null
                ? "text-on-gold bg-gold border-gold"
                : "text-muted bg-surface border-border hover:text-foreground hover:border-foreground/20"
            }`}
          >
            Todos <span className="opacity-60 tabular-nums">({projects.length})</span>
          </button>
          {categories.map((cat) => {
            const count = projects.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setFilter(filter === cat ? null : cat)}
                aria-pressed={filter === cat}
                className={`text-[11px] tracking-wider uppercase rounded-full px-4 py-2 border transition-all hover:scale-[1.02] active:scale-[0.98] ${
                  filter === cat
                    ? "text-on-gold bg-gold border-gold"
                    : "text-muted bg-surface border-border hover:text-foreground hover:border-foreground/20"
                }`}
              >
                {categoryLabels[cat] || cat} <span className="opacity-60 tabular-nums">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {visibleProjects.map((project, i) => (
            <TiltCard
              key={project.id}
              project={project}
              index={i}
              reduce={reduce}
              onSelect={setSelected}
            />
          ))}
        </div>
      </AnimatePresence>

      {hasMore && (
        <div className="text-center mt-10 md:mt-12">
          <motion.button
            onClick={loadMore}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light border border-gold/30 hover:border-gold/50 rounded-full px-8 py-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Ver más proyectos
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="transition-transform group-hover:translate-x-1">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
            <span className="opacity-60">({visibleProjects.length} de {filtered.length})</span>
          </motion.button>
        </div>
      )}

      <AnimatePresence>
        {selected && (
          <ExhibitionDetail
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
