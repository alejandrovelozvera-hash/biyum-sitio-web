"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "./Icons";

interface Slide {
  url: string;
  alt: string;
}

export default function GallerySlider({ images }: { images: Slide[] }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);

  if (images.length === 0) return null;

  const go = (i: number) => {
    setDir(i > idx ? 1 : -1);
    setIdx(i);
  };

  const next = () => go(Math.min(images.length - 1, idx + 1));
  const prev = () => go(Math.max(0, idx - 1));

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="glass-strong rounded-3xl overflow-hidden">
      <div className="relative">
        <div className="aspect-[16/10] md:aspect-[16/9] bg-[#141414]">
          <AnimatePresence custom={dir} mode="wait">
            <motion.img
              key={images[idx].url}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              src={images[idx].url}
              alt={images[idx].alt}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>

        {images.length > 1 && (
          <>
            <div className="absolute inset-y-0 left-0 flex items-center pl-4">
              <button
                onClick={prev}
                disabled={idx === 0}
                className="glass rounded-full w-10 h-10 flex items-center justify-center text-white/60 hover:text-white disabled:opacity-20 transition-all hover:scale-105 active:scale-95"
              >
                <ChevronLeft size={16} />
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <button
                onClick={next}
                disabled={idx === images.length - 1}
                className="glass rounded-full w-10 h-10 flex items-center justify-center text-white/60 hover:text-white disabled:opacity-20 transition-all hover:scale-105 active:scale-95"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex items-center justify-center gap-2 px-6 py-4">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`rounded-full transition-all duration-500 ${
                i === idx
                  ? "w-8 h-1.5 bg-white/60"
                  : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
          <span className="ml-auto text-[10px] text-white/30 tracking-wider">
            {idx + 1} / {images.length}
          </span>
        </div>
      )}
    </div>
  );
}
