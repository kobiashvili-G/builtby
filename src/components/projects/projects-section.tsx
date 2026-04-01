"use client";

import { motion } from "motion/react";
import { projects } from "@/lib/projects";
import { ProjectCard } from "./project-card";

/*
 * Editorial scatter layout — NOT a grid.
 * Each project is positioned at a specific location for an intentional
 * asymmetric magazine-like feel. Positions are defined as Tailwind classes
 * per breakpoint. On mobile, falls back to a single-column stack.
 */
const scatterPositions = [
  "md:col-start-1 md:row-start-1 md:justify-self-start",        // large — top left
  "md:col-start-2 md:row-start-1 md:justify-self-end md:mt-16",  // medium — top right, offset down
  "md:col-start-1 md:col-span-2 md:row-start-2 md:justify-self-center md:mt-8", // medium — centered below
] as const;

export function ProjectsSection() {
  return (
    <section id="projects" className="relative z-10 px-8 py-16 md:px-16">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="h-px w-full bg-subtle" />
        <div className="mt-4 flex items-center justify-between">
          <span className="font-body text-[10px] font-semibold uppercase tracking-[3px] text-tertiary">
            PROJECTS
          </span>
          <span className="font-body text-[11px] font-medium tracking-[1px] text-tertiary">
            01 / {String(projects.length).padStart(2, "0")}
          </span>
        </div>
      </motion.div>

      {/* Editorial scatter */}
      <div className="grid gap-12 md:grid-cols-2 md:gap-x-16 md:gap-y-20">
        {projects.map((project, index) => (
          <div
            key={project.subdomain}
            className={scatterPositions[index] ?? ""}
          >
            <ProjectCard project={project} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}
