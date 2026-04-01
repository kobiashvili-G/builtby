# BuiltBy.pro — Design Spec

## Overview

A single-page website hosted on the main domain **builtby.pro** (Vercel) that serves as:

1. **Project directory** (primary) — helps people find and navigate to live projects hosted on builtby.pro subdomains
2. **Portfolio/showcase** (secondary) — presents projects in a visually distinctive way for professional sharing

Currently 4 active projects, expected to grow to 5-7 max.

## Design Direction

**Editorial scatter + immersive animations.** Inspired by:

- **landonorris.com** — scattered editorial photo layout, organic flowing SVG lines, bold condensed typography, neon accent color, cream/warm background
- **fluid.glass** — smooth scroll experience, immersive full-viewport sections, organic line patterns tying sections together
- **Parallax Hero component** — `mix-blend-difference` text, parallax scrolling, viewport-relative type
- **Glowy Waves component** — canvas-based animated background reactive to mouse movement

The result is a page that feels like a curated editorial experience, NOT a typical developer portfolio grid.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **Animation:** motion/react (Framer Motion)
- **Smooth Scroll:** Lenis
- **Hosting:** Vercel
- **TypeScript:** Yes

## Color System

### Background

- Page background: `#F5F0EB` (warm cream, like landonorris.com)

### Text

- Primary text: `#1A1A1A` (near-black)
- Secondary text: `#71717A` (muted gray)
- Tertiary/labels: `#A1A1AA` (light gray, uppercase labels)
- Subtle/decorative: `#D4CBC2` (organic lines, dividers)

### Accent

- **Text accent on cream background:** `#3A7D00` (rich green, 4.5:1 contrast ratio — WCAG AA compliant for all text sizes)
- **Button/badge background:** `#BFFF00` (neon green, used ONLY as background with `#1A1A1A` dark text on top — passes AA easily)
- Never use `#BFFF00` as text color on the cream background (1.05:1 ratio, fails all WCAG levels)

### Usage Rules

- Accent text on cream → always `#3A7D00`
- Accent as background (buttons, badges) → `#BFFF00` with dark text
- Large decorative headings → `#3A7D00` for accent words, `#1A1A1A` for primary words

## Typography

- **Display/Headlines:** Plus Jakarta Sans, 800 weight (extrabold), tight letter-spacing (-2 to -4)
- **Body/Labels:** Inter, weights 400-600
- **Italic quotes:** Inter italic
- **Sizing:** Viewport-relative for hero (`text-[8vw]` or similar), fixed sizes elsewhere
- **Style:** ALL CAPS for headlines, section labels, and project names. Sentence case for body text.

## Page Structure

### 1. Navigation Bar

- **Left:** "BUILTBY" wordmark in bold condensed type (Plus Jakarta Sans 800)
- **Center:** Logo mark / monogram
- **Right:** Neon green "PROJECTS" pill button (`#BFFF00` bg) + hamburger menu icon
- Sticky on scroll, minimal height (~80px)
- On scroll: subtle background blur/tint appears

### 2. Hero Section (full viewport height)

- **Background:** Glowy waves canvas animation (from Glowy Waves component)
  - Reactive to mouse movement
  - Wave colors derived from the page's color system (warm tones, green accents)
  - Fills the entire hero viewport area

- **Hero image/visual:** An artistic image or generative visual positioned center
  - **CRITICAL:** The image must blend seamlessly into the background — NO hard edges, NO visible borders
  - Use CSS techniques: gradient mask/fade on edges (`mask-image` with radial or linear gradient), or the image should have a transparent/matching background
  - The image should feel like it's floating IN the page, not placed ON the page
  - Image choice: artist-sourced imagery related to creative building (to be selected later)

- **Hero text:** Massive bold "BUILT BY .PRO"
  - Uses `mix-blend-difference` to invert over the background/image
  - Viewport-scaled sizing for impact
  - Text overlaps the image — the blend mode creates the visual interaction
  - When using `mix-blend-difference`, all hero text should be a single base color (`#1A1A1A`) — the blend mode dynamically creates contrast against the background/image. Do NOT apply the green accent to hero text, as blend-difference would distort it unpredictably
  - The green accent color (`#3A7D00`) is used in OTHER sections (project names, closing statement) where blend mode is NOT active

- **Info box** (top-left): Small bordered box showing:
  - "ACTIVE PROJECTS" label
  - "04" large number
  - Divider
  - "VERCEL / SINCE 2024"

- **Quote** (right side): Italic text "Things I built with love & code. — Kobi"

- **Subtitle** (below hero text): "A collection of live projects, experiments & tools — crafted with curiosity."

### 3. Projects Section (editorial scatter layout)

- **Section header:** Horizontal divider line + "PROJECTS" label left + "01 / 04" counter right

- **Layout:** Editorial scatter — NOT a grid. Projects are placed at intentionally different:
  - Sizes (large, medium, small)
  - Positions (staggered left/right/center)
  - This creates visual hierarchy — most important project gets the biggest card

- **Each project card contains:**
  - Date/category label (e.g., "ANALYTICS DASHBOARD, 2024") — small uppercase
  - Screenshot/preview image
  - Project name in bold condensed type (some words in accent color)
  - Subdomain link (e.g., "analytics.builtby.pro →")

- **Project data structure:**
  ```typescript
  interface Project {
    name: string;           // Display name, can be multi-word
    nameAccent?: string;    // Word(s) to highlight in accent color
    subdomain: string;      // e.g., "analytics" → analytics.builtby.pro
    category: string;       // e.g., "ANALYTICS DASHBOARD"
    year: number;           // e.g., 2024
    description: string;    // Short description for meta/accessibility
    image: string;          // Path to screenshot or art
    size: 'large' | 'medium' | 'small';  // Layout size hint
  }
  ```

- **Navigation:** Each project card is a direct link to its subdomain. All projects are visible at once — no carousel, no pagination. Users can immediately spot and click any project.

### 4. Closing Statement

- Large bold text: "BUILDING IDEAS INTO" (primary) + "REAL THINGS." (accent `#3A7D00`)
- Scroll-triggered word-by-word reveal animation

### 5. Footer

- Horizontal divider
- Left: "©2026, BuiltBy.pro"
- Right: Social links (GitHub, Twitter, LinkedIn)
- Below: "Crafted with curiosity and code"

## Animations & Interactions

### Hero

| Element | Animation | Implementation |
|---------|-----------|----------------|
| Waves background | Canvas animation reactive to mouse position | Custom canvas with requestAnimationFrame, wave math from Glowy Waves component |
| Hero text | `mix-blend-difference` over waves/image | CSS `mix-blend-mode: difference` |
| Hero image | Subtle parallax on scroll (moves slower than content) | `useScroll` + `useTransform` from motion/react |
| Info box | Fade in on load | motion/react initial/animate |

### Scroll

| Element | Animation | Implementation |
|---------|-----------|----------------|
| Smooth scroll | Buttery smooth, not scroll-jacked | Lenis smooth scroll library |
| Section dividers | Fade in as they enter viewport | Intersection Observer or motion/react `whileInView` |

### Projects

| Element | Animation | Implementation |
|---------|-----------|----------------|
| Project images | Parallax Y offset on scroll (each at slightly different speed) | `useScroll` + `useTransform` per card |
| Project cards | Staggered fade-in + slight rotation correction on scroll entry | motion/react `whileInView` with stagger |
| Card hover | Subtle scale (1.02) + shadow lift | CSS transition or motion/react `whileHover` |
| Subdomain links | Accent color underline animation on hover | CSS transition |

### Background

| Element | Animation | Implementation |
|---------|-----------|----------------|
| Organic SVG lines | Subtle flowing animation (path morphing or dash offset) | CSS animation or SVG animate |
| Lines span full page | Multiple curved paths at different opacities | Static SVG paths layered behind content |

### Closing Statement

| Element | Animation | Implementation |
|---------|-----------|----------------|
| "BUILDING IDEAS INTO REAL THINGS." | Word-by-word reveal on scroll | motion/react `whileInView` with per-word stagger |

## Responsive Behavior

- **Desktop (1440px):** Full editorial scatter layout as designed
- **Tablet (768px):** Scatter becomes 2-column stagger, reduced image sizes
- **Mobile (375px):** Single column stack, projects in order (large first), hero text scales down via `clamp()`, waves canvas simplified for performance

## File Structure (expected)

```
src/
  app/
    page.tsx              # Main page composition
    layout.tsx            # Root layout with Lenis provider
    globals.css           # Tailwind + custom styles
  components/
    ui/                   # shadcn components
    hero/
      hero-section.tsx    # Hero composition
      glowy-waves.tsx     # Canvas background
      hero-text.tsx       # Mix-blend-difference text
    projects/
      projects-section.tsx  # Editorial scatter layout
      project-card.tsx      # Individual project card
    footer/
      footer.tsx
    shared/
      organic-lines.tsx   # SVG background lines
      smooth-scroll.tsx   # Lenis provider
  lib/
    utils.ts              # cn() helper
    projects.ts           # Project data
  hooks/
    use-outside-click.ts  # If needed
```

## Data Management

Projects are defined as a static TypeScript array in `src/lib/projects.ts`. No CMS or database needed for 5-7 projects. To add a new project, add an entry to the array and a screenshot image.

## Performance Considerations

- Canvas animation: Use `requestAnimationFrame`, throttle on mobile, respect `prefers-reduced-motion`
- Images: Next.js `<Image>` with proper `sizes` and lazy loading for project screenshots
- Lenis: Only initialize on client side
- SVG lines: Static paths, CSS-only animation (no JS overhead)
- Font loading: Preload Plus Jakarta Sans 800 and Inter 400/500/600

## Out of Scope

- CMS integration
- Dark mode (single theme: warm cream)
- Blog or writing section
- Contact form
- Analytics/tracking
- Project detail pages (cards link directly to subdomains)
