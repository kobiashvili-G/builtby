"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import { useLenis } from "lenis/react";
import { useRef, useCallback } from "react";

export function HeroText() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollProgress = useMotionValue(0);
  const y = useTransform(scrollProgress, [0, 1], ["0%", "50%"]);

  useLenis(useCallback(({ scroll, limit }: { scroll: number; limit: number }) => {
    scrollProgress.set(Math.min(scroll / (limit * 0.5), 1));
  }, [scrollProgress]));

  return (
    <motion.div
      ref={ref}
      className="pointer-events-none relative z-10 mix-blend-difference"
      style={{ y }}
    >
      <h1 className="font-display text-[12vw] font-extrabold uppercase leading-[0.9] tracking-[-0.04em] text-white md:text-[10vw]">
        <span className="block">BUILT</span>
        <span className="block">
          BY<span className="ml-[2vw]">.PRO</span>
        </span>
      </h1>
    </motion.div>
  );
}
