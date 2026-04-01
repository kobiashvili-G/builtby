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
    category: "IMAGE REVIEW TOOL",
    year: 2024,
    description:
      "A web app for collecting approve/reject feedback on images — streamlined visual content moderation.",
    image: "/projects/image-approver.jpg",
    size: "large",
  },
  {
    name: "AI PROMPT",
    nameAccent: "TESTER",
    subdomain: "prompt",
    category: "AI TESTING TOOL",
    year: 2025,
    description:
      "A web tool for testing and comparing AI prompts against multiple models — find what works best.",
    image: "/projects/prompt-tester.jpg",
    size: "medium",
  },
  {
    name: "PO",
    nameAccent: "HELPER",
    subdomain: "pohelper",
    category: "PRODUCTIVITY TOOL",
    year: 2025,
    description:
      "A smart assistant for product owners — helps manage backlogs, write stories, and track priorities.",
    image: "/projects/po-helper.jpg",
    size: "medium",
  },
];

export function getProjectUrl(subdomain: string): string {
  return `https://${subdomain}.builtby.pro`;
}
