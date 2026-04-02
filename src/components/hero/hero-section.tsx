"use client";

import { motion } from "motion/react";
import { GlowyWaves } from "./glowy-waves";
import { HeroText } from "./hero-text";
import { projects } from "@/lib/projects";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden pb-16 pl-8 md:pl-16">
      <GlowyWaves />

      {/* Glow element */}
      <div className="absolute left-1/2 top-1/2 h-[50vh] w-[35vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-bg/20 blur-[100px]" />
      <div
        className="absolute left-1/2 top-1/2 h-[70vh] w-[45vw] -translate-x-1/2 -translate-y-1/2"
        style={{
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        }}
      >
        <div className="h-full w-full bg-gradient-to-br from-emerald-400/40 via-lime-300/50 to-amber-200/30" />
      </div>

      {/* Info box */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute left-8 top-28 z-20 border border-subtle p-4 md:left-16"
      >
        <span className="font-body text-[9px] font-semibold uppercase tracking-[2px] text-tertiary">
          LIVE
        </span>
        <p className="font-display text-5xl font-extrabold text-primary">
          {String(projects.length).padStart(2, "0")}
        </p>
        <div className="my-3 h-px w-full bg-subtle" />
        <span className="font-body text-[9px] font-medium uppercase tracking-[1.5px] text-secondary leading-relaxed">
          PROJECTS
          <br />
          ON AIR
        </span>
      </motion.div>

      {/* Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute right-8 top-[55%] z-20 max-w-[300px] md:right-16"
      >
        <p className="font-body text-2xl italic leading-relaxed text-secondary">
          Scroll down to explore
          <br />
          what&apos;s live.
        </p>
      </motion.div>

      {/* Hero text */}
      <div className="relative z-10 pb-8">
        <HeroText />
        <motion.p
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-6 max-w-[340px] font-body text-base text-secondary"
        >
          Everything hosted on builtby.pro
          <br />
          — tap any project to open it.
        </motion.p>
      </div>
    </section>
  );
}
