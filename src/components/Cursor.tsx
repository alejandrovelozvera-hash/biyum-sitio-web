"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function Cursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 25 });

  useEffect(() => {
    const isFine = window.matchMedia("(pointer:fine)").matches;
    if (!isFine) return;
    setVisible(true);
    document.body.style.cursor = "none";

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [role=button], input, textarea, select, label")) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: springX, y: springY }}
      >
        <motion.div
          animate={{
            width: hovering ? 8 : 4,
            height: hovering ? 8 : 4,
          }}
          className="bg-gold rounded-full -translate-x-1/2 -translate-y-1/2"
        />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: mouseX, y: mouseY }}
      >
        <motion.div
          animate={{
            width: hovering ? 48 : 32,
            height: hovering ? 48 : 32,
            borderColor: hovering ? "var(--cursor-ring-strong)" : "var(--cursor-ring)",
          }}
          transition={{ duration: 0.2 }}
          className="border rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        >
          {hovering && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[8px] text-gold/50 tracking-widest"
            >
              VER
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
