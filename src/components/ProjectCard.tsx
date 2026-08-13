"use client";

import { Project } from "@/types";
import Link from "next/link";
import { useState } from "react";

export default function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Link
      href={`/proyecto/${project.slug}`}
      className="group relative block overflow-hidden rounded-2xl bg-[#141414]"
    >
      <div className={`relative overflow-hidden ${featured ? "aspect-[3/2]" : "aspect-[4/5]"}`}>
        <div
          className={`absolute inset-0 bg-[#1A1A1A] transition-opacity duration-500 ${
            loaded ? "opacity-0" : "opacity-100"
          }`}
        />
        {project.cover_image_url && (
          <img
            src={project.cover_image_url}
            alt={project.title}
            onLoad={() => setLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="absolute inset-0 glass opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 translate-y-6 group-hover:translate-y-0 transition-transform duration-500 z-10">
        {project.category && (
          <p className="text-[#737373] text-xs tracking-wider mb-2">
            {project.category}
          </p>
        )}
        <h3 className="text-white text-lg md:text-xl font-medium tracking-tight">
          {project.title}
        </h3>
      </div>
    </Link>
  );
}
