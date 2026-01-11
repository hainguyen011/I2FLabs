export interface Technology {
  name: string;
  category: string;
  icon?: string;
}

export interface TechCategory {
  title: string;
  technologies: Technology[];
}

export const techStack: TechCategory[] = [
  {
    title: 'Languages',
    technologies: [
      { name: 'Python', category: 'language' },
      { name: 'JavaScript', category: 'language' },
      { name: 'TypeScript', category: 'language' },
      { name: 'Lua', category: 'language' },
      { name: 'C#', category: 'language' },
    ]
  },
  {
    title: 'AI/ML Frameworks',
    technologies: [
      { name: 'TensorFlow', category: 'framework' },
      { name: 'PyTorch', category: 'framework' },
      { name: 'LangChain', category: 'framework' },
      { name: 'Hugging Face', category: 'framework' },
      { name: 'Scikit-learn', category: 'framework' },
    ]
  },
  {
    title: 'LLM APIs',
    technologies: [
      { name: 'OpenAI GPT', category: 'llm' },
      { name: 'Google Gemini', category: 'llm' },
      { name: 'Anthropic Claude', category: 'llm' },
      { name: 'Meta Llama', category: 'llm' },
      { name: 'Mistral AI', category: 'llm' },
    ]
  },
  {
    title: 'Vector Databases',
    technologies: [
      { name: 'Qdrant', category: 'database' },
      { name: 'Pinecone', category: 'database' },
      { name: 'Weaviate', category: 'database' },
      { name: 'ChromaDB', category: 'database' },
      { name: 'FAISS', category: 'database' },
    ]
  },
  {
    title: 'Web & Backend',
    technologies: [
      { name: 'Node.js', category: 'backend' },
      { name: 'React', category: 'frontend' },
      { name: 'Next.js', category: 'frontend' },
      { name: 'FastAPI', category: 'backend' },
      { name: 'Express', category: 'backend' },
    ]
  },
  {
    title: 'Tools & Platforms',
    technologies: [
      { name: 'Docker', category: 'tool' },
      { name: 'Git', category: 'tool' },
      { name: 'Jupyter', category: 'tool' },
      { name: 'MCP', category: 'tool' },
      { name: 'Playwright', category: 'tool' },
    ]
  },
];
