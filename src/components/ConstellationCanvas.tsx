"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { Project } from "@/types";
import ProjectNode from "./ProjectNode";
import ProjectDetail from "./ProjectDetail";

interface Props {
  projects: Project[];
}

function seeded(i: number, offset: number): number {
  const x = Math.sin(i * 127.1 + offset * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export default function ConstellationCanvas({ projects }: Props) {
  const [view, setView] = useState({ x: 0, y: 0, zoom: 0.6 });
  const [selected, setSelected] = useState<Project | null>(null);
  const [dragging, setDragging] = useState(false);
  const [size, setSize] = useState({ w: 1200, h: 800 });
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ startX: 0, startY: 0, viewX: 0, viewY: 0 });

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setSize({
          w: containerRef.current.offsetWidth,
          h: containerRef.current.offsetHeight,
        });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setDragging(true);
    dragRef.current = { startX: e.clientX, startY: e.clientY, viewX: view.x, viewY: view.y };
  }, [view]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setView((prev) => ({
      ...prev,
      x: dragRef.current.viewX + dx,
      y: dragRef.current.viewY + dy,
    }));
  }, [dragging]);

  const onMouseUp = useCallback(() => setDragging(false), []);

  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const delta = -e.deltaY * 0.0015;
    const newZoom = Math.max(0.2, Math.min(4, view.zoom * (1 + delta)));
    const scale = newZoom / view.zoom;
    setView((prev) => ({
      x: (cx - size.w / 2) * (1 - scale) + prev.x * scale,
      y: (cy - size.h / 2) * (1 - scale) + prev.y * scale,
      zoom: newZoom,
    }));
  }, [view.zoom, size]);

  const nodes = useMemo(() => {
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    return projects.map((p, i) => {
      const angle = i * goldenAngle;
      const radius = Math.sqrt(i + 1) * 280;
      return {
        project: p,
        x: radius * Math.cos(angle) + (seeded(i, 0) - 0.5) * 80,
        y: radius * Math.sin(angle) + (seeded(i, 1) - 0.5) * 80,
        scale: p.featured ? 1.3 : 0.7 + seeded(i, 2) * 0.4,
        rotation: (seeded(i, 3) - 0.5) * 8,
      };
    });
  }, [projects]);

  const connections = useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
    const groups: Record<string, typeof nodes> = {};
    for (const n of nodes) {
      const cat = n.project.category;
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(n);
    }
    for (const cat of Object.keys(groups)) {
      const g = groups[cat];
      for (let i = 0; i < g.length - 1; i++) {
        const a = g[i];
        const b = g[i + 1];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 800) {
          lines.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y });
        }
      }
    }
    return lines;
  }, [nodes]);

  const hintRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (hintRef.current) hintRef.current.style.opacity = "0";
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-dvh bg-[#0A0A0A]">
        <p className="text-[#525252] text-sm">Próximamente</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-dvh w-full overflow-hidden bg-[#0A0A0A] select-none"
      style={{ cursor: dragging ? "grabbing" : "grab" }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onWheel={onWheel}
    >
      <div
        style={{
          transform: `translate(${size.w / 2 + view.x}px, ${size.h / 2 + view.y}px) scale(${view.zoom})`,
          transformOrigin: "0 0",
        }}
      >
        <svg
          className="absolute inset-0 pointer-events-none"
          style={{ width: 1, height: 1, overflow: "visible" }}
        >
          {connections.map((l, i) => (
            <line
              key={i}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="0.5"
            />
          ))}
        </svg>

        {nodes.map((n) => (
          <ProjectNode
            key={n.project.id}
            project={n.project}
            x={n.x}
            y={n.y}
            scale={n.scale}
            rotation={n.rotation}
            onSelect={setSelected}
            isSelected={selected?.id === n.project.id}
          />
        ))}
      </div>

      <div
        ref={hintRef}
        className="fixed bottom-12 left-1/2 -translate-x-1/2 text-[#525252] text-xs tracking-wider transition-opacity duration-1000 pointer-events-none"
        style={{ textShadow: "0 0 20px rgba(0,0,0,0.8)" }}
      >
        Arrastra para explorar &middot; Rueda para zoom &middot; Toca un proyecto
      </div>

      <div className="fixed top-6 left-8 z-40 pointer-events-none">
        <p className="text-white text-lg font-semibold tracking-tight">Biyum</p>
      </div>

      {selected && <ProjectDetail project={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
