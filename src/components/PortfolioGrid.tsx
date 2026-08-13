"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import { motion, useReducedMotion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Project } from "@/types";
import ExhibitionDetail from "./Exhibition/ExhibitionDetail";

const categoryLabels: Record<string, string> = {
  fotografia: "Fotografía",
  branding: "Branding",
  video: "Video",
  "social-media": "Social Media",
};

function TiltCard({ project, index, reduce, onSelect }: {
  project: Project;
  index: number;
  reduce: boolean | null;
  onSelect: (p: Project) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    setTilt({
      x: ((e.clientX - cx) / r.width) * 6,
      y: ((e.clientY - cy) / r.height) * -6,
    });
  }, []);

  const reset = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  return (
    <motion.div
      layout
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={ref}
        onClick={() => onSelect(project)}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        className="group block relative overflow-hidden bg-surface cursor-pointer rounded-2xl"
        style={{
          perspective: "1200px",
        }}
      >
<div
            className="aspect-[4/3] transition-transform duration-200 ease-out"
            style={{
              transform: reduce ? "none" : `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
            }}
          >
          <motion.div className="absolute inset-0 -top-[12%] h-[124%]" style={{ y: reduce ? 0 : parallaxY }}>
            {project.cover_image_url && (
              <img
                src={project.cover_image_url}
                alt={project.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
            )}
            {project.images && project.images.length > 0 && (
              <img
                src={project.images[0].url}
                alt={`${project.title} - detalle`}
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            )}
          </motion.div>
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
            style={{
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            <span className="text-gold-dark text-xs tracking-widest uppercase border border-gold/20 rounded-full px-5 py-2.5 bg-surface/80">
              Ver proyecto
            </span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 z-10">
          <p className="text-muted text-[10px] tracking-[0.15em] uppercase mb-1 [text-shadow:0_1px_3px_rgba(0,0,0,0.8)]">
            {categoryLabels[project.category] || project.category}
          </p>
          <h3 className="text-gold-dark text-sm md:text-base font-bold leading-tight break-words [text-shadow:0_1px_4px_rgba(0,0,0,0.9)]">
            {project.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category));
    return Array.from(cats);
  }, [projects]);

  const filtered = useMemo(
    () => (filter ? projects.filter((p) => p.category === filter) : projects),
    [projects, filter]
  );

  if (projects.length === 0) return null;

  return (
    <section id="portafolio" className="bg-background pt-20 md:pt-28">
      <div className="px-6 md:px-16 max-w-[1400px] mx-auto mb-12 md:mb-16">
        <motion.div
          initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-3">
            <span className="w-8 h-px bg-gradient-to-r from-gold/60 to-transparent" />
            <p className="text-muted text-[10px] tracking-[0.2em] uppercase">Portafolio</p>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gold tracking-[-0.04em] leading-[0.92]">
            Proyectos
          </h2>
        </motion.div>

        <div className="flex flex-wrap gap-2 md:gap-3 mt-8">
          <button
            onClick={() => setFilter(null)}
            className={`text-[11px] tracking-wider uppercase rounded-full px-4 py-2 transition-all hover:scale-[1.02] active:scale-[0.98] ${
              filter === null
                ? "text-on-gold bg-gold"
                : "text-muted hover:text-gold glass"
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
                className={`text-[11px] tracking-wider uppercase rounded-full px-4 py-2 transition-all hover:scale-[1.02] active:scale-[0.98] ${
                  filter === cat
                    ? "text-on-gold bg-gold"
                    : "text-muted hover:text-gold glass"
                }`}
              >
                {categoryLabels[cat] || cat} <span className="opacity-60 tabular-nums">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1">
          {filtered.map((project, i) => (
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
