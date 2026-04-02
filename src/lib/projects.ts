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
    name: "IMAGE",
    nameAccent: "APPROVER",
    subdomain: "image",
    category: "VISUAL QA",
    year: 2024,
    description:
      "Collect approve or reject votes on images. Fast visual feedback from your team.",
    image: "/projects/image-approver.jpg",
    size: "large",
  },
  {
    name: "AI PROMPT",
    nameAccent: "TESTER",
    subdomain: "prompt",
    category: "PROMPT OPS",
    year: 2025,
    description:
      "Run prompts against multiple AI models side by side. Compare results, pick the winner.",
    image: "/projects/prompt-tester.jpg",
    size: "medium",
  },
  {
    name: "CLARIFY",
    nameAccent: "AI",
    subdomain: "product",
    category: "PRODUCT AI",
    year: 2025,
    description:
      "Describe your idea, answer AI's questions, get a structured spec. From concept to Jira-ready in one session.",
    image: "/projects/po-helper.jpg",
    size: "medium",
  },
];

export function getProjectUrl(subdomain: string): string {
  return `https://${subdomain}.builtby.pro`;
}
