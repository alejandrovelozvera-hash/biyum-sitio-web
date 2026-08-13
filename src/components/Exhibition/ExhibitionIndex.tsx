"use client";

import { motion } from "motion/react";

export default function ExhibitionIndex({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  if (total === 0) return null;

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 pointer-events-none hidden md:block"
    >
      <div className="flex flex-col items-center gap-2">
        <span className="text-white/80 text-xs font-medium tracking-wider">
          {pad(current)}
        </span>
        <span className="w-px h-12 bg-white/10" />
        <span className="text-[#525252] text-[10px] tracking-wider">
          {pad(total)}
        </span>
      </div>
    </motion.div>
  );
}
