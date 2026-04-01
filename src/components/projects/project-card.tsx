"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import type { Project } from "@/lib/projects";
import { getProjectUrl } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const gradientBgs = [
  "bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900",
  "bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-800",
  "bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800",
  "bg-gradient-to-br from-amber-600 via-orange-700 to-red-800",
] as const;

const sizeClasses = {
  large: "w-full md:w-[480px] h-[360px]",
  medium: "w-full md:w-[520px] h-[400px]",
  small: "w-full md:w-[280px] h-[280px]",
} as const;

const titleSizes = {
  large: "text-3xl md:text-4xl",
  medium: "text-2xl md:text-3xl",
  small: "text-xl md:text-2xl",
} as const;

export function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.a
      ref={ref}
      href={getProjectUrl(project.subdomain)}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 60, rotate: index % 2 === 0 ? -4 : 4, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      whileHover={{ scale: 1.02 }}
      className="group block"
    >
      <span className="font-body text-[10px] font-medium uppercase tracking-[1px] text-tertiary">
        {project.category}, {project.year}
      </span>

      <div className={`mt-1 overflow-hidden ${sizeClasses[project.size]} ${gradientBgs[index % gradientBgs.length]}`}>
        <motion.div className="relative h-full w-full" style={{ y: imageY }}>
          <Image
            src={project.image}
            alt={project.description}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes={
              project.size === "large"
                ? "480px"
                : project.size === "medium"
                  ? "520px"
                  : "280px"
            }
          />
        </motion.div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span
          className={`font-display font-extrabold tracking-[1px] text-primary ${titleSizes[project.size]}`}
        >
          {project.name}
        </span>
        {project.nameAccent && (
          <span
            className={`font-display font-extrabold tracking-[1px] text-accent ${titleSizes[project.size]}`}
          >
            {project.nameAccent}
          </span>
        )}
      </div>

      <span className="mt-1 inline-block font-body text-[13px] font-medium text-secondary transition-colors group-hover:text-accent">
        {project.subdomain}.builtby.pro →
      </span>
    </motion.a>
  );
}
