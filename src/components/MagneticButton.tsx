"use client";

import { useRef, useCallback } from "react";
import { motion } from "motion/react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function MagneticButton({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.3;
    const y = (e.clientY - r.top - r.height / 2) * 0.3;
    el.style.transform = `translate(${x}px, ${y}px)`;
  }, []);

  const reset = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  }, []);

  return (
    <div className={className}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        className="inline-block transition-transform duration-200 ease-out"
      >
        {children}
      </motion.div>
    </div>
  );
}
