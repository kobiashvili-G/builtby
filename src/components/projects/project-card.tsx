"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import type { Project } from "@/lib/projects";
import { getProjectUrl } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  rotate?: number;
}

const blobGradients = [
  "from-pink-500 via-red-500 to-yellow-500",
  "from-violet-500 via-purple-500 to-blue-500",
  "from-emerald-400 via-cyan-500 to-blue-500",
  "from-amber-400 via-orange-500 to-rose-500",
  "from-sky-400 via-indigo-500 to-violet-500",
] as const;

const sizeClasses = {
  large: "w-full md:w-[380px] h-[280px]",
  medium: "w-full md:w-[360px] h-[270px]",
  small: "w-full md:w-[340px] h-[250px]",
} as const;

export function ProjectCard({ project, index, rotate = 0 }: ProjectCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const blobGradient = blobGradients[index % blobGradients.length];

  return (
    <motion.a
      ref={ref}
      href={getProjectUrl(project)}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 50, rotate: rotate + (index % 2 === 0 ? -4 : 4), scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, rotate, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      whileHover={{ scale: 1.05, rotate: 0, y: -8 }}
      className={`group block ${sizeClasses[project.size]}`}
    >
      <div className="relative h-full w-full rounded-[14px] overflow-hidden shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff]">
        {/* Glassy background */}
        <div className="absolute inset-[5px] bg-white/95 backdrop-blur-[24px] rounded-[10px] outline outline-2 outline-white z-10" />

        {/* Animated gradient blob */}
        <div
          className={`absolute top-1/2 left-1/2 w-[200px] h-[200px] rounded-full opacity-100 blur-[20px] z-0 animate-blob bg-gradient-to-r ${blobGradient}`}
          style={{ animationDelay: `${index * -1.5}s` }}
        />

        {/* Card content */}
        <div className="relative z-20 flex h-full flex-col justify-between p-7 md:p-8">
          {/* Top: category */}
          <span className="font-body text-[10px] font-medium uppercase tracking-[2px] text-secondary">
            {project.category}
          </span>

          {/* Middle: project name */}
          <div>
            <span className="block font-display text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
              {project.name}
            </span>
            {project.nameAccent && (
              <span className="block font-display text-3xl font-extrabold tracking-tight text-accent md:text-4xl">
                {project.nameAccent}
              </span>
            )}
            <p className="mt-2 max-w-[280px] font-body text-[13px] leading-relaxed text-secondary">
              {project.description}
            </p>
          </div>

          {/* Bottom: link */}
          <div className="flex items-center justify-between">
            <span className="font-body text-[13px] font-medium text-tertiary transition-colors group-hover:text-accent">
              {project.subdomain}.builtby.pro
            </span>
            <span className="text-lg text-tertiary transition-all group-hover:translate-x-1 group-hover:text-accent">
              →
            </span>
          </div>
        </div>
      </div>
    </motion.a>
  );
}
