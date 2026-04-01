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
