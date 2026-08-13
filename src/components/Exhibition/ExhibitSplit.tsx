"use client";

import { motion } from "motion/react";
import { Project } from "@/types";

interface Props {
  project: Project;
  index: number;
  onSelect: (p: Project) => void;
}

export default function ExhibitSplit({ project, index, onSelect }: Props) {
  const imgLeft = index % 2 === 0;

  return (
    <section className="min-h-dvh w-full bg-[#0A0A0A] flex flex-col md:flex-row cursor-pointer" onClick={() => onSelect(project)}>
      <motion.div
        initial={{ opacity: 0, x: imgLeft ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`md:w-[55%] h-[50dvh] md:h-dvh overflow-hidden ${imgLeft ? "" : "md:order-2"}`}
      >
        {project.cover_image_url && (
          <img src={project.cover_image_url} alt="" className="w-full h-full object-cover" />
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: imgLeft ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`md:w-[45%] flex items-center px-6 md:px-10 py-16 md:py-0 ${imgLeft ? "" : "md:order-1"}`}
      >
        <div className="glass rounded-2xl md:rounded-3xl p-6 md:p-10 w-full max-w-lg">
          <p className="text-[#525252] text-[10px] tracking-[0.15em] uppercase mb-4">
            {project.category}
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-[-0.03em] leading-[0.92] mb-6">
            {project.title}
          </h2>
          <p className="text-[#737373] text-sm leading-relaxed mb-8 line-clamp-4">
            {project.description}
          </p>
          <span className="inline-flex items-center gap-2 text-[10px] text-[#737373] tracking-[0.15em] uppercase group">
            <span className="w-8 h-px bg-white/20 group-hover:w-12 transition-all duration-500" />
            Ver proyecto
          </span>
        </div>
      </motion.div>
    </section>
  );
}
