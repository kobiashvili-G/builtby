# BuiltBy.pro Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page editorial portfolio site at builtby.pro that serves as a project directory and showcase, featuring immersive animations and a scattered editorial layout.

**Architecture:** Next.js App Router with a single page composed of 4 sections (Nav, Hero, Projects, Footer). Animation layer uses motion/react for scroll-driven reveals and a custom canvas for the hero background. Lenis provides smooth scrolling. Project data is a static TypeScript array.

**Tech Stack:** Next.js 15 (App Router), Tailwind CSS v4, shadcn/ui, motion/react, Lenis, TypeScript

**Design Spec:** `docs/superpowers/specs/2026-04-02-builtby-pro-design.md`

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `src/lib/utils.ts`, `components.json`

- [ ] **Step 1: Initialize Next.js project with shadcn**

```bash
cd /Users/kobi/Documents/Dev/builtby
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

Select defaults when prompted. If directory is non-empty, it will ask — say yes to overwrite.

- [ ] **Step 2: Initialize shadcn/ui**

```bash
npx shadcn@latest init
```

Choose: New York style, Zinc base color, CSS variables yes.

- [ ] **Step 3: Install animation and scroll dependencies**

```bash
npm install motion lenis
```

- [ ] **Step 4: Install fonts**

```bash
npm install @fontsource/plus-jakarta-sans @fontsource/inter
```

- [ ] **Step 5: Set up globals.css with the color system**

Replace `src/app/globals.css` with:

```css
@import "tailwindcss";
@import "@fontsource/plus-jakarta-sans/800.css";
@import "@fontsource/inter/400.css";
@import "@fontsource/inter/500.css";
@import "@fontsource/inter/600.css";
@import "@fontsource/inter/400-italic.css";

@theme {
  --color-cream: #F5F0EB;
  --color-primary: #1A1A1A;
  --color-secondary: #71717A;
  --color-tertiary: #A1A1AA;
  --color-subtle: #D4CBC2;
  --color-accent: #3A7D00;
  --color-accent-bg: #BFFF00;

  --font-display: "Plus Jakarta Sans", sans-serif;
  --font-body: "Inter", sans-serif;
}

body {
  background-color: var(--color-cream);
  color: var(--color-primary);
  font-family: var(--font-body);
}
```

- [ ] **Step 6: Set up root layout**

Replace `src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BuiltBy.pro — Projects by Kobi",
  description:
    "A collection of live projects, experiments & tools — crafted with curiosity.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 7: Create minimal page.tsx**

Replace `src/app/page.tsx` with:

```tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <h1 className="font-display text-[8vw] font-extrabold text-primary">
        BUILTBY.PRO
      </h1>
    </main>
  );
}
```

- [ ] **Step 8: Verify it runs**

```bash
npm run dev
```

Open http://localhost:3000 — should see "BUILTBY.PRO" in bold Plus Jakarta Sans on cream background.

- [ ] **Step 9: Initialize git and commit**

```bash
git init
echo "node_modules\n.next\n.superpowers" > .gitignore
git add -A
git commit -m "feat: scaffold Next.js project with Tailwind v4, shadcn, motion, Lenis"
```

---

### Task 2: Smooth Scroll Provider (Lenis)

**Files:**
- Create: `src/components/shared/smooth-scroll.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create the Lenis smooth scroll provider**

Create `src/components/shared/smooth-scroll.tsx`:

```tsx
"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
```

- [ ] **Step 2: Wrap layout with SmoothScroll**

Update `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { SmoothScroll } from "@/components/shared/smooth-scroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "BuiltBy.pro — Projects by Kobi",
  description:
    "A collection of live projects, experiments & tools — crafted with curiosity.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify smooth scroll works**

```bash
npm run dev
```

Add enough content to page.tsx to make it scrollable. Scroll should feel smooth and buttery. Remove extra content after verifying.

- [ ] **Step 4: Commit**

```bash
git add src/components/shared/smooth-scroll.tsx src/app/layout.tsx
git commit -m "feat: add Lenis smooth scroll provider"
```

---

### Task 3: Project Data

**Files:**
- Create: `src/lib/projects.ts`

- [ ] **Step 1: Create the project data file**

Create `src/lib/projects.ts`:

```tsx
export interface Project {
  name: string;
  nameAccent?: string;
  subdomain: string;
  category: string;
  year: number;
  description: string;
  image: string;
  size: "large" | "medium" | "small";
}

export const projects: Project[] = [
  {
    name: "ANALYTICS",
    nameAccent: "DASHBOARD",
    subdomain: "analytics",
    category: "ANALYTICS DASHBOARD",
    year: 2024,
    description:
      "A real-time dashboard for tracking analytics and user engagement metrics.",
    image: "/projects/analytics.png",
    size: "large",
  },
  {
    name: "AI",
    nameAccent: "WRITER",
    subdomain: "writer",
    category: "AI WRITING TOOL",
    year: 2025,
    description:
      "An AI-powered writing assistant that helps create better content faster.",
    image: "/projects/writer.png",
    size: "medium",
  },
  {
    name: "DESIGN",
    nameAccent: "COLLAB",
    subdomain: "collab",
    category: "DESIGN COLLABORATION",
    year: 2025,
    description:
      "A collaborative design tool for remote teams to brainstorm and create together.",
    image: "/projects/collab.png",
    size: "medium",
  },
  {
    name: "DEV TOOLKIT",
    subdomain: "tools",
    category: "DEVELOPER TOOLS",
    year: 2024,
    description:
      "A developer toolkit with CLI utilities and automation scripts for daily workflows.",
    image: "/projects/tools.png",
    size: "small",
  },
];

export function getProjectUrl(subdomain: string): string {
  return `https://${subdomain}.builtby.pro`;
}
```

- [ ] **Step 2: Add placeholder images directory**

```bash
mkdir -p public/projects
```

Add placeholder images (or empty files to be replaced later):

```bash
touch public/projects/analytics.png public/projects/writer.png public/projects/collab.png public/projects/tools.png
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/projects.ts public/projects/
git commit -m "feat: add project data model and placeholder images"
```

---

### Task 4: Organic SVG Background Lines

**Files:**
- Create: `src/components/shared/organic-lines.tsx`

- [ ] **Step 1: Create the organic lines component**

Create `src/components/shared/organic-lines.tsx`:

```tsx
"use client";

export function OrganicLines() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <svg
        viewBox="0 0 1440 2400"
        fill="none"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M -100 500 C 200 300, 400 700, 700 450 S 1100 200, 1300 500 S 1500 700, 1600 400"
          stroke="#D4CBC2"
          strokeWidth="1.5"
          className="animate-line-flow-1"
        />
        <path
          d="M -50 800 C 300 1000, 500 600, 800 900 S 1100 1200, 1300 800 S 1500 600, 1600 1000"
          stroke="#D4CBC2"
          strokeWidth="1.2"
          className="animate-line-flow-2"
        />
        <path
          d="M 0 1200 C 200 1000, 500 1400, 700 1150 S 1000 950, 1200 1250 S 1400 1400, 1500 1100"
          stroke="#DDD6CD"
          strokeWidth="1"
          className="animate-line-flow-3"
        />
        <path
          d="M -80 1600 C 250 1400, 450 1800, 700 1550 S 1050 1350, 1300 1650 S 1500 1800, 1600 1500"
          stroke="#D4CBC2"
          strokeWidth="1.3"
          className="animate-line-flow-1"
        />
        <path
          d="M 0 2000 C 300 2200, 600 1800, 900 2100 S 1200 2300, 1500 2000"
          stroke="#DDD6CD"
          strokeWidth="1"
          className="animate-line-flow-2"
        />
      </svg>
    </div>
  );
}
```

- [ ] **Step 2: Add the CSS animations to globals.css**

Append to `src/app/globals.css`:

```css
@keyframes line-flow-1 {
  0%, 100% { stroke-dashoffset: 0; }
  50% { stroke-dashoffset: 40; }
}
@keyframes line-flow-2 {
  0%, 100% { stroke-dashoffset: 0; }
  50% { stroke-dashoffset: -30; }
}
@keyframes line-flow-3 {
  0%, 100% { stroke-dashoffset: 0; }
  50% { stroke-dashoffset: 50; }
}

.animate-line-flow-1 {
  stroke-dasharray: 20 10;
  animation: line-flow-1 12s ease-in-out infinite;
}
.animate-line-flow-2 {
  stroke-dasharray: 15 12;
  animation: line-flow-2 16s ease-in-out infinite;
}
.animate-line-flow-3 {
  stroke-dasharray: 25 8;
  animation: line-flow-3 20s ease-in-out infinite;
}
```

- [ ] **Step 3: Add OrganicLines to page.tsx temporarily to verify**

```tsx
import { OrganicLines } from "@/components/shared/organic-lines";

export default function Home() {
  return (
    <main className="relative min-h-[200vh] bg-cream">
      <OrganicLines />
      <h1 className="relative z-10 font-display text-[8vw] font-extrabold text-primary p-16">
        BUILTBY.PRO
      </h1>
    </main>
  );
}
```

Verify: subtle flowing lines visible in the background behind the text.

- [ ] **Step 4: Commit**

```bash
git add src/components/shared/organic-lines.tsx src/app/globals.css
git commit -m "feat: add organic SVG background lines with CSS dash animation"
```

---

### Task 5: Navigation Bar

**Files:**
- Create: `src/components/nav/navbar.tsx`

- [ ] **Step 1: Create the navbar component**

Create `src/components/nav/navbar.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Menu } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 flex h-20 w-full items-center justify-between px-8 transition-all duration-300 md:px-16 ${
        scrolled ? "bg-cream/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <span className="font-display text-[22px] font-extrabold tracking-[2px] text-primary">
        BUILTBY
      </span>

      <div className="flex items-center gap-4">
        <a
          href="#projects"
          className="flex items-center gap-2 rounded-lg bg-accent-bg px-5 py-2.5 font-body text-xs font-semibold uppercase tracking-[1.5px] text-primary transition-transform hover:scale-105"
        >
          <ExternalLink size={16} />
          PROJECTS
        </a>
        <button
          className="rounded-lg border border-subtle bg-white p-2.5 transition-colors hover:bg-cream"
          aria-label="Menu"
        >
          <Menu size={20} className="text-primary" />
        </button>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Install lucide-react**

```bash
npm install lucide-react
```

- [ ] **Step 3: Add Navbar to page.tsx**

Update `src/app/page.tsx`:

```tsx
import { OrganicLines } from "@/components/shared/organic-lines";
import { Navbar } from "@/components/nav/navbar";

export default function Home() {
  return (
    <main className="relative min-h-[200vh] bg-cream">
      <OrganicLines />
      <Navbar />
      <div className="relative z-10 pt-20 p-16">
        <h1 className="font-display text-[8vw] font-extrabold text-primary">
          BUILTBY.PRO
        </h1>
      </div>
    </main>
  );
}
```

Verify: nav is sticky, blur appears on scroll, neon green button visible.

- [ ] **Step 4: Commit**

```bash
git add src/components/nav/navbar.tsx src/app/page.tsx
git commit -m "feat: add sticky navbar with scroll-aware blur"
```

---

### Task 6: Glowy Waves Canvas Background

**Files:**
- Create: `src/components/hero/glowy-waves.tsx`

- [ ] **Step 1: Create the canvas background component**

Create `src/components/hero/glowy-waves.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";

interface WaveConfig {
  offset: number;
  amplitude: number;
  frequency: number;
  color: string;
  opacity: number;
}

const WAVE_PALETTE: WaveConfig[] = [
  { offset: 0, amplitude: 70, frequency: 0.003, color: "rgba(58, 125, 0, 0.6)", opacity: 0.4 },
  { offset: Math.PI / 2, amplitude: 90, frequency: 0.0026, color: "rgba(191, 255, 0, 0.4)", opacity: 0.3 },
  { offset: Math.PI, amplitude: 60, frequency: 0.0034, color: "rgba(212, 203, 194, 0.5)", opacity: 0.25 },
  { offset: Math.PI * 1.5, amplitude: 80, frequency: 0.0022, color: "rgba(26, 26, 26, 0.15)", opacity: 0.2 },
  { offset: Math.PI * 2, amplitude: 55, frequency: 0.004, color: "rgba(113, 113, 122, 0.2)", opacity: 0.15 },
];

export function GlowyWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouseInfluence = prefersReduced ? 10 : 70;
    const influenceRadius = prefersReduced ? 160 : 320;
    const smoothing = prefersReduced ? 0.04 : 0.1;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      mouseRef.current = { x: canvas.width / 2, y: canvas.height / 2 };
      targetMouseRef.current = { x: canvas.width / 2, y: canvas.height / 2 };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleMouseLeave = () => {
      targetMouseRef.current = { x: canvas.width / 2, y: canvas.height / 2 };
    };

    const drawWave = (wave: WaveConfig) => {
      ctx.save();
      ctx.beginPath();
      for (let x = 0; x <= canvas.width; x += 4) {
        const dx = x - mouseRef.current.x;
        const dy = canvas.height / 2 - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - distance / influenceRadius);
        const mouseEffect = influence * mouseInfluence * Math.sin(time * 0.001 + x * 0.01 + wave.offset);

        const y =
          canvas.height / 2 +
          Math.sin(x * wave.frequency + time * 0.002 + wave.offset) * wave.amplitude +
          Math.sin(x * wave.frequency * 0.4 + time * 0.003) * (wave.amplitude * 0.45) +
          mouseEffect;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = wave.color;
      ctx.globalAlpha = wave.opacity;
      ctx.shadowBlur = 35;
      ctx.shadowColor = wave.color;
      ctx.stroke();
      ctx.restore();
    };

    const animate = () => {
      time += 1;
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * smoothing;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * smoothing;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#F5F0EB");
      gradient.addColorStop(1, "#EDE7DF");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      WAVE_PALETTE.forEach(drawWave);
      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
```

- [ ] **Step 2: Verify canvas renders**

Temporarily add to page.tsx inside a full-height div:

```tsx
<div className="relative h-screen">
  <GlowyWaves />
</div>
```

Verify: waves animate, react to mouse movement, warm cream gradient background.

- [ ] **Step 3: Commit**

```bash
git add src/components/hero/glowy-waves.tsx
git commit -m "feat: add glowy waves canvas with mouse-reactive animation"
```

---

### Task 7: Hero Section

**Files:**
- Create: `src/components/hero/hero-text.tsx`, `src/components/hero/hero-section.tsx`

- [ ] **Step 1: Create the hero text component with mix-blend-difference**

Create `src/components/hero/hero-text.tsx`:

```tsx
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
```

- [ ] **Step 2: Create the hero section composition**

Create `src/components/hero/hero-section.tsx`:

```tsx
"use client";

import { motion } from "motion/react";
import { GlowyWaves } from "./glowy-waves";
import { HeroText } from "./hero-text";
import { projects } from "@/lib/projects";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden pb-16 pl-8 md:pl-16">
      <GlowyWaves />

      {/* Hero image — MUST blend seamlessly, no hard edges */}
      <div
        className="absolute left-1/2 top-1/2 h-[70vh] w-[45vw] -translate-x-1/2 -translate-y-1/2"
        style={{
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        }}
      >
        {/* Replace with artist-sourced image */}
        <div className="h-full w-full bg-gradient-to-br from-accent/20 via-accent-bg/30 to-subtle/20" />
      </div>

      {/* Info box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute left-8 top-28 z-20 border border-subtle p-4 md:left-16"
      >
        <span className="font-body text-[9px] font-semibold uppercase tracking-[2px] text-tertiary">
          ACTIVE PROJECTS
        </span>
        <p className="font-display text-5xl font-extrabold text-primary">
          {String(projects.length).padStart(2, "0")}
        </p>
        <div className="my-3 h-px w-full bg-subtle" />
        <span className="font-body text-[9px] font-medium uppercase tracking-[1.5px] text-secondary leading-relaxed">
          VERCEL
          <br />
          SINCE 2024
        </span>
      </motion.div>

      {/* Quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute right-8 top-[55%] z-20 max-w-[300px] md:right-16"
      >
        <p className="font-body text-2xl italic leading-relaxed text-secondary">
          Things I built
          <br />
          with love &amp; code.
        </p>
        <p className="mt-2 font-body text-lg italic text-accent">— Kobi</p>
      </motion.div>

      {/* Hero text */}
      <div className="relative z-10 pb-8">
        <HeroText />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 max-w-[340px] font-body text-base text-secondary"
        >
          A collection of live projects, experiments
          <br />
          &amp; tools — crafted with curiosity.
        </motion.p>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Wire hero into page.tsx**

Update `src/app/page.tsx`:

```tsx
import { OrganicLines } from "@/components/shared/organic-lines";
import { Navbar } from "@/components/nav/navbar";
import { HeroSection } from "@/components/hero/hero-section";

export default function Home() {
  return (
    <main className="relative bg-cream">
      <OrganicLines />
      <Navbar />
      <HeroSection />
      {/* Spacer for scroll testing */}
      <div className="h-screen" />
    </main>
  );
}
```

- [ ] **Step 4: Verify hero**

```bash
npm run dev
```

Verify:
- Waves animate behind everything
- "BUILT BY .PRO" text uses mix-blend-difference (inverts over background)
- Hero image area fades with radial gradient mask (no hard edges)
- Info box shows "04" with fade-in
- Quote appears on right
- Parallax effect on scroll (hero text moves slower)

- [ ] **Step 5: Commit**

```bash
git add src/components/hero/hero-text.tsx src/components/hero/hero-section.tsx src/app/page.tsx
git commit -m "feat: add hero section with mix-blend-difference text and parallax"
```

---

### Task 8: Project Card Component

**Files:**
- Create: `src/components/projects/project-card.tsx`

- [ ] **Step 1: Create the project card component**

Create `src/components/projects/project-card.tsx`:

```tsx
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
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <motion.a
      ref={ref}
      href={getProjectUrl(project.subdomain)}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40, rotate: index % 2 === 0 ? -2 : 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      whileHover={{ scale: 1.02 }}
      className="group block"
    >
      <span className="font-body text-[10px] font-medium uppercase tracking-[1px] text-tertiary">
        {project.category}, {project.year}
      </span>

      <div className={`mt-1 overflow-hidden ${sizeClasses[project.size]}`}>
        <motion.div className="relative h-full w-full" style={{ y: imageY }}>
          <Image
            src={project.image}
            alt={project.description}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes={project.size === "large" ? "480px" : project.size === "medium" ? "520px" : "280px"}
          />
        </motion.div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className={`font-display font-extrabold tracking-[1px] text-primary ${titleSizes[project.size]}`}>
          {project.name}
        </span>
        {project.nameAccent && (
          <span className={`font-display font-extrabold tracking-[1px] text-accent ${titleSizes[project.size]}`}>
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/projects/project-card.tsx
git commit -m "feat: add project card with parallax image and scroll reveal"
```

---

### Task 9: Projects Section (Editorial Scatter Layout)

**Files:**
- Create: `src/components/projects/projects-section.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create the editorial scatter layout**

Create `src/components/projects/projects-section.tsx`:

```tsx
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
  "md:col-start-1 md:row-start-1 md:justify-self-start",       // large — top left
  "md:col-start-2 md:row-start-1 md:justify-self-end md:mt-12", // medium — top right, offset down
  "md:col-start-1 md:row-start-2 md:justify-self-start",       // small — bottom left
  "md:col-start-2 md:row-start-2 md:justify-self-center md:-mt-8", // medium — bottom center-right, offset up
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
```

- [ ] **Step 2: Add ProjectsSection to page.tsx**

Update `src/app/page.tsx`:

```tsx
import { OrganicLines } from "@/components/shared/organic-lines";
import { Navbar } from "@/components/nav/navbar";
import { HeroSection } from "@/components/hero/hero-section";
import { ProjectsSection } from "@/components/projects/projects-section";

export default function Home() {
  return (
    <main className="relative bg-cream">
      <OrganicLines />
      <Navbar />
      <HeroSection />
      <ProjectsSection />
    </main>
  );
}
```

- [ ] **Step 3: Verify scatter layout**

```bash
npm run dev
```

Verify:
- Section divider with "PROJECTS" label and counter
- Cards appear at staggered positions (not a uniform grid)
- Cards fade in with slight rotation correction on scroll
- Parallax on images
- Hover: scale + link color change
- Mobile: single column stack

- [ ] **Step 4: Commit**

```bash
git add src/components/projects/projects-section.tsx src/app/page.tsx
git commit -m "feat: add editorial scatter projects section"
```

---

### Task 10: Closing Statement with Word-by-Word Reveal

**Files:**
- Create: `src/components/footer/closing-statement.tsx`

- [ ] **Step 1: Create the closing statement component**

Create `src/components/footer/closing-statement.tsx`:

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/footer/closing-statement.tsx
git commit -m "feat: add closing statement with word-by-word scroll reveal"
```

---

### Task 11: Footer

**Files:**
- Create: `src/components/footer/footer.tsx`

- [ ] **Step 1: Create the footer component**

Create `src/components/footer/footer.tsx`:

```tsx
export function Footer() {
  return (
    <footer className="relative z-10 px-8 pb-12 pt-4 md:px-16">
      <div className="h-px w-full bg-subtle" />
      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <span className="font-body text-xs text-tertiary">
          ©2026, BuiltBy.pro
        </span>
        <div className="flex gap-6">
          {[
            { name: "GitHub", href: "#" },
            { name: "Twitter", href: "#" },
            { name: "LinkedIn", href: "#" },
          ].map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-tertiary transition-colors hover:text-accent"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
      <p className="mt-4 font-body text-[11px] text-subtle">
        Crafted with curiosity and code
      </p>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/footer/footer.tsx
git commit -m "feat: add minimal footer with social links"
```

---

### Task 12: Final Page Assembly & Polish

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Assemble all sections in page.tsx**

Update `src/app/page.tsx`:

```tsx
import { OrganicLines } from "@/components/shared/organic-lines";
import { Navbar } from "@/components/nav/navbar";
import { HeroSection } from "@/components/hero/hero-section";
import { ProjectsSection } from "@/components/projects/projects-section";
import { ClosingStatement } from "@/components/footer/closing-statement";
import { Footer } from "@/components/footer/footer";

export default function Home() {
  return (
    <main className="relative bg-cream">
      <OrganicLines />
      <Navbar />
      <HeroSection />
      <ProjectsSection />
      <ClosingStatement />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Full visual QA**

```bash
npm run dev
```

Walk through the entire page and verify:
- [ ] Nav: sticky, blur on scroll, neon PROJECTS button
- [ ] Hero: waves animate, mix-blend-difference text, image area blends (no hard edges), info box, quote, parallax on scroll
- [ ] Projects: scatter layout, staggered reveal, parallax images, hover states, links work
- [ ] Closing: word-by-word reveal on scroll
- [ ] Footer: clean, links styled
- [ ] Organic lines: visible behind all sections
- [ ] Smooth scroll: Lenis working throughout
- [ ] Mobile: check at 375px — single column, text scales, nothing overflows

- [ ] **Step 3: Build check**

```bash
npm run build
```

Fix any TypeScript or build errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: assemble complete page with all sections"
```

---

### Task 13: Vercel Deployment Setup

**Files:**
- Modify: `package.json` (verify scripts)

- [ ] **Step 1: Verify build works cleanly**

```bash
npm run build && npm run start
```

Open http://localhost:3000 and do a final check.

- [ ] **Step 2: Deploy to Vercel**

```bash
npx vercel --prod
```

Or connect the GitHub repo to Vercel dashboard and set the domain to `builtby.pro`.

- [ ] **Step 3: Configure custom domain**

In Vercel dashboard:
1. Go to project settings → Domains
2. Add `builtby.pro`
3. Follow DNS configuration instructions (A record or CNAME)
4. Verify SSL certificate is issued

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: finalize for Vercel deployment"
```
