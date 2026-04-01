"use client";

import { motion } from "motion/react";

const line1Words = ["BUILDING", "IDEAS", "INTO"];
const line2Words = ["REAL", "THINGS."];

function RevealWord({ word, index, accent }: { word: string; index: number; accent?: boolean }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className={`inline-block ${accent ? "text-accent" : "text-primary"}`}
    >
      {word}
    </motion.span>
  );
}

export function ClosingStatement() {
  return (
    <section className="relative z-10 px-8 py-24 md:px-16 md:py-32">
      <div className="flex flex-wrap gap-x-[0.3em] font-display text-[10vw] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] md:text-[5vw]">
        {line1Words.map((word, i) => (
          <RevealWord key={word} word={word} index={i} />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-[0.3em] font-display text-[10vw] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] md:text-[5vw]">
        {line2Words.map((word, i) => (
          <RevealWord key={word} word={word} index={i + line1Words.length} accent />
        ))}
      </div>
    </section>
  );
}
