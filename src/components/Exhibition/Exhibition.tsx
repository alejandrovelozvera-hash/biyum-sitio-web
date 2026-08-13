"use client";

import { useState, useRef, useEffect } from "react";
import { Project } from "@/types";
import { AnimatePresence } from "motion/react";
import ExhibitionCover from "./ExhibitionCover";
import ExhibitPiece from "./ExhibitPiece";
import ExhibitionColophon from "./ExhibitionColophon";
import ExhibitionDetail from "./ExhibitionDetail";
import ExhibitionIndex from "./ExhibitionIndex";

export default function Exhibition({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  const all = projects.length;

  useEffect(() => {
    const els = sectionsRef.current.filter(Boolean) as HTMLElement[];
    const observers = els.map((el, i) => {
      const o = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i);
        },
        { threshold: 0.4 }
      );
      o.observe(el);
      return o;
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [all]);

  if (all === 0) {
    return (
      <main className="h-dvh flex items-center justify-center bg-[#0A0A0A]">
        <p className="text-[#525252] text-sm">Próximamente</p>
      </main>
    );
  }

  return (
    <main className="bg-[#0A0A0A]">
      <ExhibitionCover project={projects[0]} />
      {projects.map((project, i) => (
        <div
          key={project.id}
          ref={(el) => { sectionsRef.current[i] = el; }}
        >
          <ExhibitPiece
            project={project}
            index={i}
            onSelect={setSelected}
          />
        </div>
      ))}
      <div ref={(el) => { sectionsRef.current[all] = el; }}>
        <ExhibitionColophon />
      </div>
      <ExhibitionIndex current={activeIndex + 1} total={all + 1} />
      <AnimatePresence>
        {selected && (
          <ExhibitionDetail
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
