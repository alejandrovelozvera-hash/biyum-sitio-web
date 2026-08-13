"use client";

import { motion } from "motion/react";
import { Project } from "@/types";

interface Props {
  project: Project;
  index: number;
  onSelect: (p: Project) => void;
}

export default function ExhibitFull({ project, index, onSelect }: Props) {
  const dir = index % 2 === 0 ? "left" : "right";

  return (
    <section className="relative h-dvh w-full overflow-hidden bg-[#0A0A0A] cursor-pointer" onClick={() => onSelect(project)}>
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        {project.cover_image_url && (
          <img src={project.cover_image_url} alt="" className="w-full h-full object-cover" />
        )}
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-[#0A0A0A]/10 to-transparent" />

      <motion.div
        initial={{ opacity: 0, x: dir === "left" ? -40 : 40, y: -20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-12 md:bottom-20 left-6 md:left-16 right-6 md:right-16"
      >
        <div className="glass rounded-2xl md:rounded-3xl p-6 md:p-10 max-w-xl">
          <p className="text-[#737373] text-[10px] tracking-[0.15em] uppercase mb-3">
            {project.category}
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-[-0.03em] leading-[0.92]">
            {project.title}
          </h2>
          <p className="text-[#737373] text-sm md:text-base mt-4 max-w-md leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
