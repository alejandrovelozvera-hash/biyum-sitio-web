"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion, useSpring, useTransform, motion } from "motion/react";

export default function AnimatedCounter({
  value,
  suffix = "",
  duration = 2,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const spring = useSpring(0, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (inView && !reduce) spring.set(value);
    else spring.set(value);
  }, [inView, value, reduce, spring]);

  return <motion.span ref={ref} style={{ display: "inline-block" }}>{display}</motion.span>;
}