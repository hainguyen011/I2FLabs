export interface Repository {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
  topics: string[];
}

export const openSourceProjects: Repository[] = [
  {
    name: 'PiperFlow',
    description: 'Multi-Agent Platform for workflow automation and AI orchestration',
    language: 'Python',
    stars: 0,
    forks: 0,
    url: 'https://github.com/hainguyen011/piperflow',
    topics: ['ai', 'agents', 'automation', 'llm', 'workflow']
  },
  {
    name: 'I2FLabs Portfolio',
    description: 'Modern portfolio website for AI Tech Lab with animations',
    language: 'TypeScript',
    stars: 0,
    forks: 0,
    url: 'https://github.com/hainguyen011/I2FLabs',
    topics: ['portfolio', 'react', 'typescript', 'framer-motion']
  },
  // Add more repos as they become available
];

export interface Contribution {
  project: string;
  type: string;
  description: string;
  url?: string;
}

export const contributions: Contribution[] = [
  {
    project: 'Open Source Community',
    type: 'Active Contributor',
    description: 'Contributing to AI/ML open source projects and sharing knowledge with the community',
  },
];
