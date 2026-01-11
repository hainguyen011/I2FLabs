export interface EcosystemCategory {
  title: string;
  description: string;
  icon: string;
  items: string[];
}

export const vietnamAIEcosystem: EcosystemCategory[] = [
  {
    title: 'AI Research Institutions',
    description: 'Leading universities and research centers advancing AI in Vietnam',
    icon: '🎓',
    items: [
      'VinAI Research',
      'FPT AI Center',
      'VNUHCM - University of Science',
      'Hanoi University of Science and Technology',
      'VNU University of Engineering and Technology',
      'Posts and Telecommunications Institute of Technology',
    ]
  },
  {
    title: 'AI Startups & Labs',
    description: 'Innovative AI companies and tech labs building the future',
    icon: '🚀',
    items: [
      'I2FLabs Vietnam',
      'Zalo AI',
      'VietAI',
      'Aimesoft',
      'Bizfly AI',
      'AI4Life',
    ]
  },
  {
    title: 'Tech Giants & Corporations',
    description: 'Major companies investing in AI development',
    icon: '🏢',
    items: [
      'VinGroup (VinAI)',
      'FPT Corporation',
      'Viettel Group',
      'VNPT',
      'Momo',
      'Tiki',
    ]
  },
  {
    title: 'AI Communities & Events',
    description: 'Communities fostering AI knowledge sharing and collaboration',
    icon: '👥',
    items: [
      'Vietnam AI Community',
      'AI Vietnam',
      'Data Science Vietnam',
      'Machine Learning Vietnam',
      'AI Saturdays Hanoi/HCMC',
      'Vietnam AI Summit',
    ]
  },
  {
    title: 'Government Initiatives',
    description: 'National programs supporting AI development',
    icon: '🏛️',
    items: [
      'National AI Strategy 2030',
      'Ministry of Science and Technology',
      'National Innovation Center (NIC)',
      'Vietnam Silicon Valley Project',
      'AI Research & Development Fund',
      'Digital Transformation Program',
    ]
  },
  {
    title: 'AI Application Areas',
    description: 'Key sectors adopting AI technology in Vietnam',
    icon: '💡',
    items: [
      'E-commerce & Retail',
      'Fintech & Banking',
      'Healthcare & Medical',
      'Agriculture & Farming',
      'Education & EdTech',
      'Smart Cities & IoT',
    ]
  },
];

export const ecosystemStats = {
  aiCompanies: '200+',
  researchers: '5000+',
  aiProjects: '1000+',
  investment: '$500M+',
};
