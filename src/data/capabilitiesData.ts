export interface Capability {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  useCases: string[];
}

export const capabilities: Capability[] = [
  {
    id: 'chatbots',
    title: 'Intelligent Chatbots & Assistants',
    description: 'Build conversational AI systems powered by advanced LLMs with context awareness and natural interactions.',
    icon: '💬',
    features: ['Multi-turn Conversations', 'Context Memory', 'Intent Recognition', 'Multi-language Support'],
    useCases: ['Customer Support', 'Virtual Assistants', 'Internal Help Desks']
  },
  {
    id: 'rag',
    title: 'RAG-based Knowledge Systems',
    description: 'Deploy intelligent knowledge bases that retrieve and generate accurate answers from your documents.',
    icon: '📚',
    features: ['Semantic Search', 'Document Indexing', 'Real-time Updates', 'Source Attribution'],
    useCases: ['Enterprise Search', 'Documentation Q&A', 'Research Assistance']
  },
  {
    id: 'agents',
    title: 'Multi-Agent Automation',
    description: 'Orchestrate autonomous AI agents that collaborate to automate complex workflows and tasks.',
    icon: '🤖',
    features: ['Task Delegation', 'Agent Coordination', 'Workflow Automation', 'Error Handling'],
    useCases: ['Process Automation', 'Data Processing', 'Content Generation']
  },
  {
    id: 'finetuning',
    title: 'Custom LLM Fine-tuning',
    description: 'Adapt and optimize language models for your specific domain and use case requirements.',
    icon: '🎯',
    features: ['Domain Adaptation', 'Performance Optimization', 'Model Evaluation', 'Deployment Support'],
    useCases: ['Specialized Chatbots', 'Industry-specific AI', 'Proprietary Models']
  },
  {
    id: 'analytics',
    title: 'AI-Powered Analytics',
    description: 'Extract insights from data using machine learning and natural language processing techniques.',
    icon: '📊',
    features: ['Sentiment Analysis', 'Trend Detection', 'Predictive Modeling', 'Anomaly Detection'],
    useCases: ['Business Intelligence', 'Market Analysis', 'Risk Assessment']
  },
  {
    id: 'vision',
    title: 'Computer Vision Solutions',
    description: 'Implement visual AI for object detection, recognition, and scene understanding applications.',
    icon: '👁️',
    features: ['Object Detection', 'Image Classification', 'OCR', 'Video Analysis'],
    useCases: ['Quality Control', 'Security Systems', 'Medical Imaging']
  },
];
