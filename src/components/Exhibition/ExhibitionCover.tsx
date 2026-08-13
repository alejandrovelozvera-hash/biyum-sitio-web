"use client";

import { motion } from "motion/react";
import { Project } from "@/types";

export default function ExhibitionCover({ project }: { project: Project }) {
  return (
    <section className="relative h-dvh w-full overflow-hidden bg-[#0A0A0A]">
      {project?.cover_image_url && (
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <img
            src={project.cover_image_url}
            alt=""
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/40 to-transparent" />

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="glass rounded-3xl px-10 py-8 md:px-16 md:py-10 text-center"
        >
          <h1 className="text-[clamp(4rem,15vw,12rem)] font-bold text-white tracking-[-0.04em] leading-[0.85]">
            Biyum
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-4 mt-4"
          >
            <span className="w-8 h-px bg-white/30" />
            <span className="text-xs text-[#737373] tracking-[0.2em] uppercase">
              Galería de Diseño
            </span>
            <span className="w-8 h-px bg-white/30" />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent mx-auto"
        />
        <p className="text-[#525252] text-[10px] tracking-[0.15em] uppercase mt-2">
          Desplázate
        </p>
      </motion.div>
    </section>
  );
}
