"use client";

import { useState, memo } from "react";
import { Project } from "@/types";

interface Props {
  project: Project;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  onSelect: (project: Project) => void;
  isSelected: boolean;
}

function ProjectNode({ project, x, y, scale, rotation, onSelect, isSelected }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onSelect(project);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="absolute block cursor-pointer text-left"
      style={{
        width: 280 * scale,
        left: x - 140 * scale,
        top: y - (200 * scale) / 2,
        transform: `rotate(${rotation}deg)`,
        zIndex: isSelected ? 50 : hovered ? 10 : 1,
        filter: isSelected ? "brightness(1.2)" : hovered ? "brightness(1.15)" : "brightness(0.85)",
        transition: "filter 0.5s ease, z-index 0s",
      }}
    >
      <div
        className="overflow-hidden rounded-xl transition-all duration-500"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: `1px solid rgba(255,255,255,${isSelected ? 0.12 : hovered ? 0.1 : 0.04})`,
          boxShadow: isSelected
            ? "0 0 40px rgba(201, 168, 76, 0.15)"
            : hovered
              ? "0 0 30px rgba(255,255,255,0.05)"
              : "none",
        }}
      >
        <div style={{ aspectRatio: "4/3" }}>
          {project.cover_image_url && (
            <img
              src={project.cover_image_url}
              alt={project.title}
              className="w-full h-full object-cover transition-all duration-700"
              style={{
                transform: hovered ? "scale(1.08)" : "scale(1)",
                opacity: hovered ? 1 : 0.85,
                transition: "transform 0.7s ease, opacity 0.5s ease",
              }}
            />
          )}
        </div>
        <div className="p-4" style={{ opacity: hovered ? 1 : 0.7, transition: "opacity 0.5s" }}>
          <p className="text-[#737373] text-xs tracking-wider mb-1">{project.category}</p>
          <h3 className="text-white font-medium text-sm tracking-tight truncate">{project.title}</h3>
        </div>
      </div>
    </button>
  );
}

export default memo(ProjectNode);
