"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function HeroText() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <motion.div
      ref={ref}
      className="pointer-events-none relative z-10 mix-blend-difference"
      style={{ y }}
    >
      <h1 className="font-display text-[12vw] font-extrabold uppercase leading-[0.9] tracking-[-0.04em] text-white md:text-[10vw]">
        BUILT
      </h1>
      <h1 className="font-display text-[12vw] font-extrabold uppercase leading-[0.9] tracking-[-0.04em] text-white md:text-[10vw]">
        BY<span className="ml-[2vw]">.PRO</span>
      </h1>
    </motion.div>
  );
}
