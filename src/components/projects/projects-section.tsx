"use client";

import { motion } from "motion/react";
import { projects } from "@/lib/projects";
import { ProjectCard } from "./project-card";

const scatterPositions = [
  "md:col-start-1 md:row-start-1 md:justify-self-start",
  "md:col-start-2 md:row-start-1 md:justify-self-end md:mt-16",
  "md:col-start-1 md:row-start-2 md:justify-self-start md:mt-8",
  "md:col-start-2 md:row-start-2 md:justify-self-end md:mt-24",
] as const;

export function ProjectsSection() {
  return (
    <section id="projects" className="relative z-10 px-8 py-16 md:px-16">
      {/* Section transition — animated line draw + label */}
      <div className="mb-16 overflow-hidden">
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
