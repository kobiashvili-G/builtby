"use client";

import { motion } from "motion/react";
import { projects } from "@/lib/projects";
import { ProjectCard } from "./project-card";

/**
 * Each card gets a hand-placed position + rotation on desktop.
 * Coordinates are percentages of the container so it scales with viewport.
 * Rotations are subtle (±1.5°) — enough to break the grid feel.
 */
const scatterLayout = [
  { top: "0%", left: "0%", rotate: -1.2 },
  { top: "2%", left: "52%", rotate: 1 },
  { top: "52%", left: "4%", rotate: 0.8 },
  { top: "48%", left: "56%", rotate: -0.6 },
] as const;

export function ProjectsSection() {
  return (
    <section id="projects" className="relative z-10 px-8 py-10 md:px-16">
      {/* Section transition — animated line draw + label */}
      <div className="mb-10 overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-px w-full origin-left bg-gradient-to-r from-subtle via-tertiary to-subtle"
        />
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-4 inline-block font-body text-[10px] font-semibold uppercase tracking-[3px] text-tertiary"
        >
          PROJECTS
        </motion.span>
      </div>

      {/* Editorial scatter — absolute on desktop, stacked on mobile */}
      <div className="flex flex-col gap-8 md:relative md:h-[640px]">
        {projects.map((project, index) => {
          const pos = scatterLayout[index];
          return (
            <div
              key={project.subdomain}
              className="md:absolute"
              style={
                pos
                  ? {
                      top: pos.top,
                      left: pos.left,
                    }
                  : undefined
              }
            >
              <ProjectCard
                project={project}
                index={index}
                rotate={pos?.rotate ?? 0}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
