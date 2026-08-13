"use client";

import { motion, useReducedMotion } from "motion/react";
import { Project } from "@/types";
import Link from "next/link";

export default function Showcase({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion();
  const items = projects.filter((p) => p.featured).slice(0, 4);
  if (items.length < 2) return null;

  return (
    <section id="portafolio" className="py-24 md:py-32 bg-[#0A0A0A]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <p className="text-[#525252] text-[10px] tracking-[0.2em] uppercase mb-3">Selección</p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-[-0.04em] leading-[0.92]">
            Proyectos
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {items.map((project, i) => (
            <motion.div
              key={project.id}
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={i === 0 ? "md:col-span-2 md:row-span-2" : ""}
            >
              <Link
                href={`/proyecto/${project.slug}`}
                className="group block relative overflow-hidden rounded-2xl md:rounded-3xl bg-[#141414] h-full"
              >
                <div className={i === 0 ? "aspect-[4/3] md:aspect-auto md:h-full" : "aspect-[4/5] md:aspect-auto md:h-full"}>
                  {project.cover_image_url && (
                    <img
                      src={project.cover_image_url}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                  <div className="absolute inset-0 glass opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl md:rounded-3xl" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                  <p className="text-[#737373] text-[10px] tracking-[0.15em] uppercase mb-1.5">{project.category}</p>
                  <h3 className="text-white text-xl md:text-2xl font-bold tracking-[-0.02em]">{project.title}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
