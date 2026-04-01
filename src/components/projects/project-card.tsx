"use client";

import { motion, useMotionValue } from "motion/react";
import { useLenis } from "lenis/react";
import { useRef, useCallback } from "react";
import type { Project } from "@/lib/projects";
import { getProjectUrl } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const cardStyles = [
  {
    bg: "from-slate-900 via-slate-800 to-slate-900",
    text: "text-white",
    accent: "text-amber-400",
    label: "text-slate-400",
    link: "text-amber-400/70 group-hover:text-amber-300",
    border: "border-slate-700/50",
    glow: "bg-amber-500/10",
  },
  {
    bg: "from-indigo-950 via-violet-900 to-indigo-950",
    text: "text-white",
    accent: "text-violet-300",
    label: "text-violet-400/70",
    link: "text-violet-300/70 group-hover:text-violet-200",
    border: "border-violet-700/30",
    glow: "bg-violet-500/10",
  },
  {
    bg: "from-emerald-950 via-teal-900 to-emerald-950",
    text: "text-white",
    accent: "text-emerald-300",
    label: "text-emerald-400/70",
    link: "text-emerald-300/70 group-hover:text-emerald-200",
    border: "border-emerald-700/30",
    glow: "bg-emerald-500/10",
  },
] as const;

const sizeClasses = {
  large: "w-full md:w-[520px]",
  medium: "w-full md:w-[480px]",
  small: "w-full md:w-[380px]",
} as const;

export function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const cardY = useMotionValue("0%");
  const style = cardStyles[index % cardStyles.length];

  useLenis(
    useCallback(
      ({ scroll }: { scroll: number }) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const progress =
            1 - (rect.top + rect.height) / (windowHeight + rect.height);
          const clampedProgress = Math.max(0, Math.min(1, progress));
          const yValue = (clampedProgress - 0.5) * 10;
          cardY.set(`${yValue}%`);
        }
      },
      [cardY]
    )
  );

  return (
    <motion.a
      ref={ref}
      href={getProjectUrl(project.subdomain)}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 60, rotate: index % 2 === 0 ? -3 : 3, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      whileHover={{ scale: 1.03, y: -8 }}
      className={`group block ${sizeClasses[project.size]}`}
    >
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${style.bg} border ${style.border} p-8 md:p-10 transition-shadow duration-500 group-hover:shadow-2xl group-hover:shadow-black/20`}
      >
        {/* Subtle glow accents */}
        <div
          className={`absolute -right-12 -top-12 h-48 w-48 rounded-full ${style.glow} blur-3xl`}
        />
        <div
          className={`absolute -bottom-8 -left-8 h-32 w-32 rounded-full ${style.glow} blur-2xl opacity-50`}
        />

        {/* Category */}
        <span
          className={`relative font-body text-[10px] font-medium uppercase tracking-[2px] ${style.label}`}
        >
          {project.category}
        </span>

        {/* Project name — massive typography */}
        <div className="relative mt-4">
          <span
            className={`block font-display text-4xl font-extrabold tracking-tight ${style.text} md:text-5xl`}
          >
            {project.name}
          </span>
          {project.nameAccent && (
            <span
              className={`block font-display text-4xl font-extrabold tracking-tight ${style.accent} md:text-5xl`}
            >
              {project.nameAccent}
            </span>
          )}
        </div>

        {/* Description */}
        <p
          className={`relative mt-4 max-w-[320px] font-body text-sm leading-relaxed ${style.text} opacity-60`}
        >
          {project.description}
        </p>

        {/* Link */}
        <div className="relative mt-6 flex items-center justify-between">
          <span
            className={`font-body text-[13px] font-medium ${style.link} transition-colors`}
          >
            {project.subdomain}.builtby.pro
          </span>
          <span
            className={`font-body text-lg ${style.link} transition-all group-hover:translate-x-1`}
          >
            →
          </span>
        </div>
      </div>
    </motion.a>
  );
}
