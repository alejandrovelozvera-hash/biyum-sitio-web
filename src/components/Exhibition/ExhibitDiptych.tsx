"use client";

import { motion } from "motion/react";
import { Project } from "@/types";

interface Props {
  project: Project;
  index: number;
  onSelect: (p: Project) => void;
}

export default function ExhibitDiptych({ project, index, onSelect }: Props) {
  const secondImage = project.images?.[0]?.url || project.cover_image_url;
  const doubleWidth = index % 6 === 2;

  return (
    <section className="min-h-dvh w-full bg-[#0A0A0A] flex flex-col items-center justify-center px-6 md:px-16 py-20 cursor-pointer" onClick={() => onSelect(project)}>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full max-w-[1400px]"
        style={doubleWidth ? { gridTemplateColumns: "2fr 1fr" } : undefined}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
          style={{ aspectRatio: doubleWidth ? "16/10" : "4/5" }}
        >
          {project.cover_image_url && (
            <img src={project.cover_image_url} alt="" className="w-full h-full object-cover" />
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
          style={{ aspectRatio: "4/5" }}
        >
          {secondImage && (
            <img src={secondImage} alt="" className="w-full h-full object-cover" />
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-6 md:mt-8"
      >
        <div className="glass rounded-2xl md:rounded-3xl px-6 py-4 md:px-10 md:py-6 inline-block text-center">
          <p className="text-[#525252] text-[10px] tracking-[0.15em] uppercase mb-1">{project.category}</p>
          <h3 className="text-2xl md:text-4xl font-bold text-white tracking-[-0.02em]">{project.title}</h3>
        </div>
      </motion.div>
    </section>
  );
}
