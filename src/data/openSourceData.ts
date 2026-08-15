export interface OnlineResource {
  type: "github" | "browser" | "docs" | "npm" | "unikorn";
  label: string;
  url: string;
  icon: string;
  iconUrl?: string; // Optional custom icon URL for unique resources
}

export interface Repository {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  links: OnlineResource[];
  topics: string[];
}

export const openSourceProjects: Repository[] = [
  {
    name: "PiperFlow",
    description:
      "Multi-Agent Platform for workflow automation and AI orchestration",
    language: "JavaScript",
    stars: 0,
    forks: 0,
    links: [
      {
        type: "unikorn",
        label: "PiperFlow at Unikorn",
        url: "https://unikorn.vn/p/piperflow",
        icon: "github",
        iconUrl: "https://res.cloudinary.com/piperflow-cloud/image/upload/q_auto/f_auto/v1775366962/660955103_2354658361710639_5102364199747630608_n_yzieqw.png",
      },
    ],
    topics: ["ai", "agents", "automation", "llm", "workflow"],
  },

  {
    name: "PiperSphere",
    description:
      "Unified platform for AI model deployment and orchestration across environments",
    language: "JavaScript",
    stars: 0,
    forks: 0,
    links: [
      {
        type: "github",
        label: "In Labs Only",
        url: "",
        icon: "github",
        iconUrl: "https://res.cloudinary.com/piperflow-cloud/image/upload/q_auto/f_auto/v1775367250/p3_m2rls2.png",
      },
    ],
    topics: ["ai", "deployment", "orchestration", "platform"],
  },

  {
    name: "PiperSandbox",
    description:
      "Safe testing environment for AI workflows and experimental agents",
    language: "Python",
    stars: 0,
    forks: 0,
    links: [
      {
        type: "github",
        label: "In Labs Only",
        url: "",
        icon: "github",
        iconUrl: "https://res.cloudinary.com/piperflow-cloud/image/upload/q_auto/f_auto/v1775367250/p3_m2rls2.png",
      },
    ],
    topics: ["ai", "sandbox", "testing", "agents"],
  },

  {
    name: "Aevum",
    description:
      "Framework for building distributed AI systems and collaborative agents",
    language: "JavaScript",
    stars: 0,
    forks: 0,
    links: [
      {
        type: "unikorn",
        label: "Aevum at Unikorn",
        url: "https://unikorn.vn/p/aevum",
        icon: "github",
        iconUrl: "https://res.cloudinary.com/piperflow-cloud/image/upload/q_auto/f_auto/v1775366962/660955103_2354658361710639_5102364199747630608_n_yzieqw.png",
      },
    ],
    topics: [ "MCP", "multi-agent", "collaboration", "Extension"],
  },

  {
    name: "PiperNet",
    description:
      "Networking library for connecting and coordinating AI agents in real-time",
    language: "TypeScript",
    stars: 0,
    forks: 0,
    links: [
      {
        type: "github",
        label: "In Labs Only",
        url: "",
        icon: "github",
        iconUrl: "https://res.cloudinary.com/piperflow-cloud/image/upload/q_auto/f_auto/v1775367250/p3_m2rls2.png",
      },
    ],
    topics: ["ai", "network", "agents", "real-time", "agent graph"],
  },
];

export interface Contribution {
  project: string;
  type: string;
  description: string;
  links?: OnlineResource[];
}

export const contributions: Contribution[] = [
  {
    project: "Open Source Community",
    type: "Active Contributor",
    description:
      "Contributing to AI/ML open source projects and sharing knowledge with the community",
    links: [
      {
        type: "github",
        label: "GitHub Profile",
        url: "https://github.com/hainguyen011",
        icon: "github",
      },
    ],
  },
];