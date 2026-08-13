"use client";

import { useEffect, useRef, useState } from "react";

export default function AmbientGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{
        background: `radial-gradient(800px circle at ${mouse.x * 100}% ${mouse.y * 100}%, var(--glow) 0%, transparent 60%)`,
        transition: "background 0.15s ease-out",
      }}
    />
  );
}
