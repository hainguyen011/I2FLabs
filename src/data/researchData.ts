export interface ResearchArea {
  id: string;
  title: string;
  description: string;
  icon: string;
  applications: string[];
  relatedProjects?: string[];
}

export const researchAreas: ResearchArea[] = [
  {
    id: 'nlp',
    title: 'Natural Language Processing',
    description: 'Advanced text understanding and generation using state-of-the-art NLP techniques for multilingual applications.',
    icon: '💬',
    applications: ['Text Analysis', 'Sentiment Detection', 'Language Translation', 'Named Entity Recognition'],
    relatedProjects: ['Chatbot Systems', 'Content Moderation']
  },
  {
    id: 'llm',
    title: 'Large Language Models',
    description: 'Research and development with cutting-edge LLMs including GPT, Claude, Gemini for intelligent applications.',
    icon: '🤖',
    applications: ['Conversational AI', 'Code Generation', 'Content Creation', 'Question Answering'],
    relatedProjects: ['AI Assistants', 'Documentation Tools']
  },
  {
    id: 'rag',
    title: 'Retrieval-Augmented Generation',
    description: 'Building intelligent systems that combine vector search with LLMs for accurate, context-aware responses.',
    icon: '🔍',
    applications: ['Knowledge Bases', 'Document Q&A', 'Semantic Search', 'Information Retrieval'],
    relatedProjects: ['Enterprise Search', 'Customer Support AI']
  },
  {
    id: 'mas',
    title: 'Multi-Agent Systems',
    description: 'Developing autonomous agent frameworks that collaborate to solve complex tasks and automate workflows.',
    icon: '🤝',
    applications: ['Workflow Automation', 'Task Orchestration', 'Collaborative AI', 'Process Optimization'],
    relatedProjects: ['PiperFlow Platform', 'Agent Networks']
  },
  {
    id: 'cv',
    title: 'Computer Vision',
    description: 'Image and video analysis using deep learning for object detection, recognition, and scene understanding.',
    icon: '👁️',
    applications: ['Object Detection', 'Image Classification', 'Face Recognition', 'Video Analytics'],
    relatedProjects: ['Visual Inspection', 'Security Systems']
  },
  {
    id: 'mlops',
    title: 'MLOps & Deployment',
    description: 'Production-ready ML pipelines with monitoring, versioning, and continuous integration for AI systems.',
    icon: '⚙️',
    applications: ['Model Deployment', 'Performance Monitoring', 'A/B Testing', 'CI/CD for ML'],
    relatedProjects: ['ML Infrastructure', 'Model Registry']
  }
];
