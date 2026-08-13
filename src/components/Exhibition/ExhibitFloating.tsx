"use client";

import { motion } from "motion/react";
import { Project } from "@/types";

interface Props {
  project: Project;
  index: number;
  onSelect: (p: Project) => void;
}

export default function ExhibitFloating({ project, index, onSelect }: Props) {
  const panelRight = index % 2 === 0;

  return (
    <section className="relative h-dvh w-full overflow-hidden bg-[#0A0A0A] cursor-pointer" onClick={() => onSelect(project)}>
      <motion.div
        initial={{ opacity: 0, scale: 1.08 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        {project.cover_image_url && (
          <img src={project.cover_image_url} alt="" className="w-full h-full object-cover" />
        )}
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/10 via-transparent to-[#0A0A0A]/60" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`absolute bottom-12 md:bottom-20 ${panelRight ? "right-6 md:right-16" : "left-6 md:left-16"} max-w-sm glass rounded-2xl md:rounded-3xl`}
      >
        <div className="p-6 md:p-8">
          <p className="text-[#737373] text-[10px] tracking-[0.15em] uppercase mb-3">
            {project.category}
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-white tracking-[-0.03em] leading-[0.92] mb-4">
            {project.title}
          </h2>
          <p className="text-[#737373] text-xs md:text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>
          <span className="inline-flex items-center gap-2 text-[10px] text-[#737373] tracking-[0.15em] uppercase mt-5 group">
            <span className="w-6 h-px bg-white/20 group-hover:w-10 transition-all duration-500" />
            Ver
          </span>
        </div>
      </motion.div>
    </section>
  );
}
